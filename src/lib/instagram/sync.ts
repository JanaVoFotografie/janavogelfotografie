import "server-only";
import { createHash } from "node:crypto";
import type { InstagramConfig } from "./config";
import { DAY, InstagramError, type Media, type Post, type Snapshot, type SyncStatus, type TokenState } from "./model";

export interface InstagramStore {
  acquireLock(now: number): Promise<(() => Promise<void>) | null>;
  readSnapshot(): Promise<Snapshot | null>;
  publishSnapshot(snapshot: Snapshot): Promise<void>;
  readToken(): Promise<TokenState | null>;
  saveToken(token: TokenState): Promise<void>;
  savePreview(media: Media): Promise<string>;
  deleteImages(urls: string[]): Promise<void>;
  saveStatus(status: SyncStatus): Promise<void>;
}

type SyncDependencies = {
  config: InstagramConfig;
  store: InstagramStore;
  fetchMedia: (token: string) => Promise<Media[]>;
  refreshToken: (token: string) => Promise<{ accessToken: string; expiresIn: number }>;
  now?: () => number;
};

export async function syncInstagram({ config, store, fetchMedia, refreshToken, now = Date.now }: SyncDependencies) {
  const started = now();
  const release = await store.acquireLock(started);
  if (!release) return { outcome: "busy" as const };
  const uploaded: string[] = [];
  let published = false;
  try {
    const previous = await store.readSnapshot();
    // Vercel can deliver a scheduled request more than once. A duplicate should
    // not use Meta quota, rotate a token twice, or replace a newer snapshot.
    if (previous && started - Date.parse(previous.syncedAt) < 60 * 60 * 1000)
      return { outcome: "recent" as const, syncedAt: previous.syncedAt, count: previous.posts.length };

    const bootstrapHash = createHash("sha256").update(`${config.authMode}:${config.accountId}:${config.bootstrapToken}`).digest("hex");
    const savedToken = await store.readToken();
    let token: TokenState =
      savedToken?.bootstrapHash === bootstrapHash
        ? savedToken
        : { bootstrapHash, accessToken: config.bootstrapToken, expiresAt: config.bootstrapExpiresAt };
    if (token.expiresAt && Date.parse(token.expiresAt) <= started) throw new InstagramError("instagram_token_expired");
    if (config.authMode === "instagram-login" && token.expiresAt && Date.parse(token.expiresAt) - started < 30 * DAY) {
      const renewed = await refreshToken(token.accessToken);
      token = { ...token, accessToken: renewed.accessToken, expiresAt: new Date(started + renewed.expiresIn * 1000).toISOString() };
    }
    // Persist renewal BEFORE fetching images. A failed image sync must not lose
    // the newly issued token in a stateless function or on the next deployment.
    if (token !== savedToken) await store.saveToken(token);

    const media = await fetchMedia(token.accessToken);
    const posts: Post[] = [];
    for (const item of media) {
      const old = previous?.posts.find((post) => post.id === item.id && post.sourceKey === item.sourceKey);
      const imageUrl = old?.imageUrl || (await store.savePreview(item));
      if (!old) uploaded.push(imageUrl);
      const { sourceUrl: _sourceUrl, ...metadata } = item;
      void _sourceUrl;
      posts.push({ ...metadata, imageUrl });
    }
    const currentUrls = new Set(posts.map((post) => post.imageUrl));
    const retiredImages = [
      ...(previous?.retiredImages || []),
      ...(previous?.posts
        .filter((post) => !currentUrls.has(post.imageUrl))
        .map((post) => ({ url: post.imageUrl, deleteAfter: new Date(started + DAY).toISOString() })) || []),
    ].filter((image) => !currentUrls.has(image.url));
    let pendingRetirements = retiredImages;
    try {
      // These images stopped appearing in the feed at least a day ago. If
      // deletion fails, keep their URLs in the manifest so the next run retries.
      await store.deleteImages(retiredImages.filter((image) => Date.parse(image.deleteAfter) <= started).map((image) => image.url));
      pendingRetirements = retiredImages.filter((image) => Date.parse(image.deleteAfter) > started);
    } catch {
      console.warn("[instagram] image_cleanup_failed");
    }
    const snapshot: Snapshot = {
      version: 1,
      accountId: config.accountId,
      syncedAt: new Date(started).toISOString(),
      posts,
      retiredImages: pendingRetirements,
    };
    // One atomic object replacement, only after every preview is ready.
    await store.publishSnapshot(snapshot);
    published = true;
    await store
      .saveStatus({ attemptedAt: snapshot.syncedAt, outcome: "success" })
      .catch(() => console.warn("[instagram] status_write_failed"));
    return { outcome: "updated" as const, syncedAt: snapshot.syncedAt, count: posts.length };
  } catch (error) {
    if (!published) await store.deleteImages(uploaded).catch(() => undefined);
    const code = error instanceof InstagramError ? error.code : "instagram_sync_failed";
    await store.saveStatus({ attemptedAt: new Date(started).toISOString(), outcome: "failed", errorCode: code }).catch(() => undefined);
    // Deliberately discard upstream error text: it can contain signed URLs or tokens.
    throw new InstagramError(code);
  } finally {
    await release().catch(() => console.warn("[instagram] lock_release_failed"));
  }
}
