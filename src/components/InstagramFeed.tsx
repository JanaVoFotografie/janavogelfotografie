import { getInstagramFeed } from "@/lib/instagram/feed";
import { InstagramFeedGrid } from "./InstagramFeedGrid";

/** Server-rendered photographs; no Instagram embed, client script or tracking. */
export async function InstagramFeed() {
  const posts = await getInstagramFeed();
  if (!posts) return null;

  return <InstagramFeedGrid posts={posts} />;
}
