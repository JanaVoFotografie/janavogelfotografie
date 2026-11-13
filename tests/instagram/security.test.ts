import test from "node:test";
import assert from "node:assert/strict";
import { isAuthorized, privateJson } from "../../src/lib/instagram/auth";
import { downloadPreview, fetchLatestMedia, selectLatestMedia, validateMediaUrl } from "../../src/lib/instagram/meta";
import type { InstagramConfig } from "../../src/lib/instagram/config";
import { parseSnapshot } from "../../src/lib/instagram/model";

test("cron/status authorization fails closed for absent, short, malformed and incorrect credentials", async () => {
  const secret = "a-long-test-secret-at-least-32-characters";
  const request = (header?: string) =>
    new Request("https://example.test/api/instagram/sync/", { headers: header ? { authorization: header } : {} });
  for (const header of [undefined, "Bearer undefined", `Basic ${secret}`, `Bearer ${secret}x`])
    assert.equal(isAuthorized(request(header), secret), false);
  assert.equal(isAuthorized(request("Bearer short"), "short"), false);
  assert.equal(isAuthorized(request(`Bearer ${secret}`), secret), true);
  assert.equal(privateJson({ ok: true }).headers.get("cache-control"), "private, no-store");
});

test("newest six are chronological rather than pinned/API order, with video thumbnails instead of video files", () => {
  const records = Array.from({ length: 9 }, (_, i) => ({
    id: String(i + 1),
    media_type: i === 8 ? "VIDEO" : "IMAGE",
    media_url: `https://scontent.cdninstagram.com/${i}.jpg`,
    thumbnail_url: `https://scontent.fbcdn.net/${i}-cover.jpg`,
    timestamp: `2026-11-${String(i + 1).padStart(2, "0")}T12:00:00Z`,
    permalink: `https://www.instagram.com/p/test${i}/`,
    caption: "Ein Tag voller Freude #hochzeit",
  }));
  const selected = selectLatestMedia({
    data: [records[0], records[4], records[8], records[2], records[7], records[6], records[1], records[5], records[3]],
  });
  assert.deepEqual(
    selected.map((item) => item.id),
    ["9", "8", "7", "6", "5", "4"],
  );
  assert.equal(selected[0].sourceUrl, "https://scontent.fbcdn.net/8-cover.jpg");
  assert.equal(selected[0].alt, "Ein Tag voller Freude");
});

test("newest unrenderable post causes failure instead of quietly showing an older curated selection", () => {
  assert.throws(
    () =>
      selectLatestMedia({
        data: [
          {
            id: "1",
            media_type: "VIDEO",
            media_url: "https://video.cdninstagram.com/reel.mp4",
            permalink: "https://www.instagram.com/reel/test/",
            timestamp: "2026-11-12T00:00:00Z",
          },
        ],
      }),
    /missing_media_preview/,
  );
});

test("media downloader rejects private targets, lookalike domains, credentials, redirects and oversized bodies", async () => {
  for (const url of [
    "http://scontent.cdninstagram.com/image.jpg",
    "https://127.0.0.1/x",
    "https://cdninstagram.com.evil.test/x",
    "https://evilcdninstagram.com/x",
    "https://user:pass@scontent.cdninstagram.com/x",
    "https://scontent.cdninstagram.com:444/x",
  ])
    assert.throws(() => validateMediaUrl(url));
  let options: RequestInit | undefined;
  const fetcher = (async (_url, init) => {
    options = init;
    return new Response("small body", { headers: { "content-type": "image/jpeg", "content-length": String(11 * 1024 * 1024) } });
  }) as typeof fetch;
  await assert.rejects(downloadPreview("https://scontent.cdninstagram.com/x", fetcher), /preview_download_failed/);
  assert.equal(options?.redirect, "error");
  assert.equal(options?.headers, undefined);
});

test("one authenticated request verifies the intended account and includes media; wrong account is rejected", async () => {
  const config = { accountId: "123", graphVersion: "v27.0", authMode: "instagram-login" } as InstagramConfig;
  let count = 0;
  const fetcher = (async (input, options) => {
    count++;
    const url = new URL(String(input));
    assert.equal(url.hostname, "graph.instagram.com");
    assert.ok(url.searchParams.get("fields")?.includes("media.limit(25)"));
    assert.equal(url.searchParams.has("access_token"), false);
    assert.equal(new Headers(options?.headers).get("authorization"), "Bearer test-secret");
    return Response.json({ username: "janazuenkeler", media: { data: [] } });
  }) as typeof fetch;
  assert.deepEqual(await fetchLatestMedia(config, "test-secret", fetcher), []);
  assert.equal(count, 1);
  await assert.rejects(
    fetchLatestMedia(config, "test-secret", (async () => Response.json({ username: "someone_else", media: { data: [] } })) as typeof fetch),
    /instagram_account_mismatch/,
  );
});

test("snapshot validation refuses Meta image sources and non-Instagram click targets", () => {
  const snapshot = {
    version: 1,
    accountId: "123",
    syncedAt: new Date().toISOString(),
    retiredImages: [],
    posts: [
      {
        id: "1",
        type: "IMAGE",
        timestamp: new Date().toISOString(),
        alt: "photo",
        sourceKey: "/photo",
        imageUrl: "https://scontent.cdninstagram.com/photo.jpg",
        permalink: "https://www.instagram.com/p/test/",
      },
    ],
  };
  assert.throws(() => parseSnapshot(snapshot, "123"), /invalid_snapshot/);
  snapshot.posts[0].imageUrl = "https://test.public.blob.vercel-storage.com/photo.webp";
  snapshot.posts[0].permalink = "javascript:alert(1)";
  assert.throws(() => parseSnapshot(snapshot, "123"), /invalid_snapshot/);
});
