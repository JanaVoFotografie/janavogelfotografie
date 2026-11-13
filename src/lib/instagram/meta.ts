import "server-only";
import type { InstagramConfig } from "./config";
import { INSTAGRAM_HANDLE, InstagramError, isInstagramPermalink, isRecord, type Media } from "./model";

type Fetch = typeof fetch;

// The only remote media sources accepted are Meta's image CDNs. Never fetch a
// URL supplied in a public request, follow redirects, or forward the API token.
export function validateMediaUrl(value: unknown): URL {
  if (typeof value !== "string") throw new InstagramError("missing_media_preview");
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new InstagramError("invalid_media_url");
  }
  if (
    url.protocol !== "https:" ||
    url.port ||
    url.username ||
    url.password ||
    !["cdninstagram.com", "fbcdn.net"].some((host) => url.hostname.endsWith(`.${host}`))
  )
    throw new InstagramError("invalid_media_url");
  return url;
}

export function selectLatestMedia(payload: unknown): Media[] {
  if (!isRecord(payload) || !Array.isArray(payload.data)) throw new InstagramError("invalid_media_response");
  const seen = new Set<string>();
  const records = payload.data
    .filter((entry): entry is Record<string, unknown> => {
      if (
        !isRecord(entry) ||
        typeof entry.id !== "string" ||
        !/^\d+$/.test(entry.id) ||
        typeof entry.timestamp !== "string" ||
        !Number.isFinite(Date.parse(entry.timestamp))
      )
        throw new InstagramError("invalid_media_response");
      if (seen.has(entry.id)) return false;
      seen.add(entry.id);
      return true;
    })
    .sort((a, b) => Date.parse(String(b.timestamp)) - Date.parse(String(a.timestamp)))
    .slice(0, 6);

  return records.map((entry) => {
    if (
      !["IMAGE", "VIDEO", "CAROUSEL_ALBUM"].includes(String(entry.media_type)) ||
      typeof entry.permalink !== "string" ||
      !isInstagramPermalink(entry.permalink)
    )
      throw new InstagramError("invalid_media_response");
    const source = validateMediaUrl(entry.media_type === "VIDEO" ? entry.thumbnail_url : entry.media_url);
    const description =
      typeof entry.caption === "string"
        ? entry.caption
            .replace(/#[^\s#]+/g, "")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 220)
        : "";
    return {
      id: String(entry.id),
      type: entry.media_type as Media["type"],
      permalink: new URL(entry.permalink).origin + new URL(entry.permalink).pathname,
      timestamp: new Date(String(entry.timestamp)).toISOString(),
      alt:
        description ||
        `Instagram-Beitrag von Jana Vogel vom ${new Date(String(entry.timestamp)).toLocaleDateString("de-DE", { timeZone: "Europe/Berlin" })}`,
      sourceUrl: source.href,
      // Signed query parameters expire; they are not evidence of a changed photo.
      sourceKey: source.pathname,
    };
  });
}

async function jsonRequest(url: URL, accessToken: string, fetcher: Fetch): Promise<unknown> {
  const response = await fetcher(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok)
    throw new InstagramError(response.status === 401 || response.status === 403 ? "meta_authorization_failed" : "meta_request_failed");
  return response.json();
}

export async function fetchLatestMedia(config: InstagramConfig, accessToken: string, fetcher: Fetch = fetch): Promise<Media[]> {
  const host = config.authMode === "instagram-login" ? "graph.instagram.com" : "graph.facebook.com";
  const url = new URL(`https://${host}/${config.graphVersion}/${config.accountId}`);
  // One field-expanded request verifies the account and gets its newest media.
  // Sorting ignores pinned-profile order; no discovery, scraping or browser SDK.
  url.searchParams.set("fields", "username,media.limit(25){id,media_type,media_url,thumbnail_url,permalink,timestamp,caption}");
  const payload = await jsonRequest(url, accessToken, fetcher);
  if (!isRecord(payload) || typeof payload.username !== "string" || payload.username.toLowerCase() !== INSTAGRAM_HANDLE)
    throw new InstagramError("instagram_account_mismatch");
  return selectLatestMedia(payload.media);
}

export async function refreshInstagramToken(
  accessToken: string,
  fetcher: Fetch = fetch,
): Promise<{ accessToken: string; expiresIn: number }> {
  const url = new URL("https://graph.instagram.com/refresh_access_token");
  url.searchParams.set("grant_type", "ig_refresh_token");
  // Meta documents access_token as a required parameter for this exchange.
  // Never log this request URL or raw upstream error objects.
  url.searchParams.set("access_token", accessToken);
  const payload = await jsonRequest(url, accessToken, fetcher);
  if (
    !isRecord(payload) ||
    typeof payload.access_token !== "string" ||
    !payload.access_token ||
    typeof payload.expires_in !== "number" ||
    payload.expires_in < 86_400
  )
    throw new InstagramError("invalid_token_response");
  return { accessToken: payload.access_token, expiresIn: payload.expires_in };
}

export async function downloadPreview(sourceUrl: string, fetcher: Fetch = fetch): Promise<Buffer> {
  const response = await fetcher(validateMediaUrl(sourceUrl), {
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(15_000),
  });
  const maxBytes = 10 * 1024 * 1024;
  if (
    !response.ok ||
    !/^image\/(jpeg|png|webp)(;|$)/i.test(response.headers.get("content-type") || "") ||
    Number(response.headers.get("content-length")) > maxBytes ||
    !response.body
  )
    throw new InstagramError("preview_download_failed");
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      throw new InstagramError("preview_too_large");
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}
