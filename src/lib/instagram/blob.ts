import "server-only";
import { randomUUID } from "node:crypto";
import { BlobPreconditionFailedError, del, get, put } from "@vercel/blob";
import sharp from "sharp";
import type { InstagramConfig } from "./config";
import { downloadPreview } from "./meta";
import { InstagramError, isRecord, parseSnapshot, type Media, type Snapshot, type SyncStatus, type TokenState } from "./model";
import type { InstagramStore } from "./sync";

export class BlobInstagramStore implements InstagramStore {
  private prefix: string;
  private privateAuth;
  private publicAuth;

  constructor(config: InstagramConfig) {
    this.config = config;
    this.prefix = `instagram/${config.accountId}/`;
    this.privateAuth = { storeId: config.privateStoreId, token: config.privateBlobToken };
    this.publicAuth = { storeId: config.publicStoreId, token: config.publicBlobToken };
  }
  private config: InstagramConfig;

  private async readJson(name: string) {
    const result = await get(this.prefix + name, {
      ...this.privateAuth,
      access: "private",
      useCache: false,
      abortSignal: AbortSignal.timeout(10_000),
    });
    if (!result) return null;
    if (result.statusCode !== 200) throw new InstagramError("blob_read_failed");
    return { value: (await new Response(result.stream).json()) as unknown, etag: result.blob.etag };
  }

  private async writeJson(name: string, value: unknown) {
    return put(this.prefix + name, JSON.stringify(value), {
      ...this.privateAuth,
      access: "private",
      allowOverwrite: true,
      addRandomSuffix: false,
      cacheControlMaxAge: 60,
      contentType: "application/json",
      abortSignal: AbortSignal.timeout(10_000),
    });
  }

  async acquireLock(now: number): Promise<(() => Promise<void>) | null> {
    const current = await this.readJson("sync-lock.json");
    if (current && (!isRecord(current.value) || typeof current.value.until !== "number")) throw new InstagramError("invalid_sync_lock");
    if (current && (current.value as { until: number }).until > now) return null;
    // The lease outlives the 120-second function timeout. Conditional writes
    // prevent two duplicate cron deliveries from acquiring the same lease.
    let lock;
    try {
      lock = await put(this.prefix + "sync-lock.json", JSON.stringify({ until: now + 180_000, owner: randomUUID() }), {
        ...this.privateAuth,
        access: "private",
        addRandomSuffix: false,
        allowOverwrite: Boolean(current),
        ...(current ? { ifMatch: current.etag } : {}),
        cacheControlMaxAge: 60,
        contentType: "application/json",
        abortSignal: AbortSignal.timeout(10_000),
      });
    } catch (error) {
      if (error instanceof BlobPreconditionFailedError) return null;
      // A concurrent first creation has no ETag to compare yet.
      if (!current && (await this.readJson("sync-lock.json"))) return null;
      throw error;
    }
    const etag = lock.etag;
    return async () => {
      await del(this.prefix + "sync-lock.json", { ...this.privateAuth, ifMatch: etag });
    };
  }

  async readSnapshot(): Promise<Snapshot | null> {
    const result = await this.readJson("snapshot.json");
    return result ? parseSnapshot(result.value, this.config.accountId) : null;
  }
  async publishSnapshot(snapshot: Snapshot) {
    await this.writeJson("snapshot.json", snapshot);
  }

  async readToken(): Promise<TokenState | null> {
    const result = await this.readJson("token.json");
    if (!result) return null;
    const value = result.value;
    if (
      !isRecord(value) ||
      typeof value.bootstrapHash !== "string" ||
      typeof value.accessToken !== "string" ||
      !value.accessToken ||
      (value.expiresAt !== null && (typeof value.expiresAt !== "string" || !Number.isFinite(Date.parse(value.expiresAt))))
    )
      throw new InstagramError("invalid_token_state");
    return { bootstrapHash: value.bootstrapHash, accessToken: value.accessToken, expiresAt: value.expiresAt as string | null };
  }
  async saveToken(token: TokenState) {
    await this.writeJson("token.json", token);
  }
  async saveStatus(status: SyncStatus) {
    await this.writeJson("status.json", status);
  }
  async readStatus(): Promise<unknown> {
    return (await this.readJson("status.json"))?.value || null;
  }

  async savePreview(media: Media): Promise<string> {
    const original = await downloadPreview(media.sourceUrl);
    // Process once per changed post, never once per visitor. Also strips EXIF.
    const preview = await sharp(original, { limitInputPixels: 40_000_000 })
      .rotate()
      .resize(640, 640, { fit: "cover" })
      .webp({ quality: 82 })
      .toBuffer();
    const result = await put(`${this.prefix}images/${media.id}.webp`, preview, {
      ...this.publicAuth,
      access: "public",
      addRandomSuffix: true,
      contentType: "image/webp",
      cacheControlMaxAge: 86_400,
      abortSignal: AbortSignal.timeout(10_000),
    });
    return result.url;
  }
  async deleteImages(urls: string[]) {
    if (urls.length) await del(urls, { ...this.publicAuth, abortSignal: AbortSignal.timeout(10_000) });
  }
}
