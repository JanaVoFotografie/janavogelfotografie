export const INSTAGRAM_HANDLE = "janazuenkeler";
export const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;
export const INSTAGRAM_CACHE_TAG = "instagram-feed";
export const DAY = 86_400_000;
// Keep the last good snapshot through a short outage, but never leave a broken
// integration looking like an indefinitely current feed.
export const MAX_DISPLAY_AGE = 3 * DAY;

export type MediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
export type Media = {
  id: string;
  type: MediaType;
  permalink: string;
  timestamp: string;
  alt: string;
  sourceUrl: string;
  sourceKey: string;
};
export type Post = Omit<Media, "sourceUrl"> & { imageUrl: string };
export type Snapshot = {
  version: 1;
  accountId: string;
  syncedAt: string;
  posts: Post[];
  // Delete replaced images only after old cached pages have stopped using them.
  retiredImages: { url: string; deleteAfter: string }[];
};
export type TokenState = {
  bootstrapHash: string;
  accessToken: string;
  expiresAt: string | null;
};
export type SyncStatus = {
  attemptedAt: string;
  outcome: "success" | "failed";
  errorCode?: string;
};

export class InstagramError extends Error {
  constructor(public readonly code: string) {
    super(code);
    this.name = "InstagramError";
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isPublicImageUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" && /^[a-z0-9-]+\.public\.blob\.vercel-storage\.com$/.test(url.hostname) && !url.username && !url.password
    );
  } catch {
    return false;
  }
}

export function isInstagramPermalink(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      ["www.instagram.com", "instagram.com"].includes(url.hostname) &&
      /^\/(p|reel|tv)\/[A-Za-z0-9_-]+\/?$/.test(url.pathname) &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}

export function parseSnapshot(value: unknown, accountId: string): Snapshot {
  if (
    !isRecord(value) ||
    value.version !== 1 ||
    value.accountId !== accountId ||
    typeof value.syncedAt !== "string" ||
    !Number.isFinite(Date.parse(value.syncedAt)) ||
    !Array.isArray(value.posts) ||
    value.posts.length > 6 ||
    !Array.isArray(value.retiredImages)
  ) {
    throw new InstagramError("invalid_snapshot");
  }
  for (const post of value.posts) {
    if (
      !isRecord(post) ||
      typeof post.id !== "string" ||
      !/^\d+$/.test(post.id) ||
      !["IMAGE", "VIDEO", "CAROUSEL_ALBUM"].includes(String(post.type)) ||
      typeof post.imageUrl !== "string" ||
      !isPublicImageUrl(post.imageUrl) ||
      typeof post.permalink !== "string" ||
      !isInstagramPermalink(post.permalink) ||
      typeof post.alt !== "string" ||
      typeof post.timestamp !== "string" ||
      !Number.isFinite(Date.parse(post.timestamp)) ||
      typeof post.sourceKey !== "string"
    ) {
      throw new InstagramError("invalid_snapshot");
    }
  }
  for (const retired of value.retiredImages) {
    if (
      !isRecord(retired) ||
      typeof retired.url !== "string" ||
      !isPublicImageUrl(retired.url) ||
      typeof retired.deleteAfter !== "string" ||
      !Number.isFinite(Date.parse(retired.deleteAfter))
    )
      throw new InstagramError("invalid_snapshot");
  }
  return value as Snapshot;
}

export function isFresh(snapshot: Snapshot, now: number): boolean {
  const age = now - Date.parse(snapshot.syncedAt);
  return age >= 0 && age <= MAX_DISPLAY_AGE;
}
