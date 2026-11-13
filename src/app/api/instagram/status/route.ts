import { isAuthorized, privateJson } from "@/lib/instagram/auth";
import { BlobInstagramStore } from "@/lib/instagram/blob";
import { readInstagramConfig } from "@/lib/instagram/config";
import { isFresh } from "@/lib/instagram/model";

export async function GET(request: Request) {
  if (!isAuthorized(request)) return privateJson({ error: "unauthorized" }, 401);
  try {
    const config = readInstagramConfig();
    if (!config) return privateJson({ configured: false, visible: false }, 503);
    const store = new BlobInstagramStore(config);
    const [snapshot, lastAttempt] = await Promise.all([store.readSnapshot(), store.readStatus()]);
    const ageHours = snapshot ? Math.max(0, (Date.now() - Date.parse(snapshot.syncedAt)) / 3_600_000) : null;
    return privateJson({
      configured: true,
      lastSuccessfulSync: snapshot?.syncedAt || null,
      postCount: snapshot?.posts.length || 0,
      ageHours,
      overdue: ageHours === null || ageHours > 26,
      visible: Boolean(snapshot?.posts.length && isFresh(snapshot, Date.now())),
      lastAttempt,
    });
  } catch {
    return privateJson({ error: "instagram_status_unavailable" }, 503);
  }
}
