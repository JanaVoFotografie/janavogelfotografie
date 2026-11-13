import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { BlobInstagramStore } from "./blob";
import { readInstagramConfig } from "./config";
import { INSTAGRAM_CACHE_TAG, isFresh } from "./model";

export async function getInstagramFeed() {
  "use cache";
  // A successful daily sync invalidates this tag immediately. The longer backup
  // lifetime keeps Hobby Blob reads low even across separately rendered routes.
  cacheLife({ stale: 300, revalidate: 21_600, expire: 43_200 });
  cacheTag(INSTAGRAM_CACHE_TAG);
  try {
    const config = readInstagramConfig();
    if (!config) return null;
    const snapshot = await new BlobInstagramStore(config).readSnapshot();
    if (!snapshot || !isFresh(snapshot, Date.now()) || !snapshot.posts.length) return null;
    // Only public display fields cross into rendering. Never expose source URLs,
    // signed query strings, token state or storage credentials in the RSC payload.
    return snapshot.posts.map(({ id, type, permalink, imageUrl, alt }) => ({ id, type, permalink, imageUrl, alt }));
  } catch {
    console.error("[instagram] feed_read_failed");
    return null;
  }
}
