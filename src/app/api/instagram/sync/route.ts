import { revalidateTag } from "next/cache";
import { isAuthorized, privateJson } from "@/lib/instagram/auth";
import { BlobInstagramStore } from "@/lib/instagram/blob";
import { readInstagramConfig } from "@/lib/instagram/config";
import { fetchLatestMedia, refreshInstagramToken } from "@/lib/instagram/meta";
import { INSTAGRAM_CACHE_TAG, InstagramError } from "@/lib/instagram/model";
import { syncInstagram } from "@/lib/instagram/sync";

export const maxDuration = 120;

export async function GET(request: Request) {
  if (!isAuthorized(request)) return privateJson({ error: "unauthorized" }, 401);
  try {
    const config = readInstagramConfig();
    if (!config) return privateJson({ error: "instagram_not_configured" }, 503);
    const result = await syncInstagram({
      config,
      store: new BlobInstagramStore(config),
      fetchMedia: (token) => fetchLatestMedia(config, token),
      refreshToken: refreshInstagramToken,
    });
    if (result.outcome === "updated") revalidateTag(INSTAGRAM_CACHE_TAG, { expire: 0 });
    console.info("[instagram] sync", result);
    return privateJson(result);
  } catch (error) {
    const code = error instanceof InstagramError ? error.code : "instagram_sync_failed";
    console.error("[instagram]", code);
    return privateJson({ error: code }, 502);
  }
}
