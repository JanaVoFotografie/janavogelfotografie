import test from "node:test";
import assert from "node:assert/strict";
import type { InstagramConfig } from "../../src/lib/instagram/config";
import { DAY, InstagramError, isFresh, type Media, type Snapshot, type SyncStatus, type TokenState } from "../../src/lib/instagram/model";
import { syncInstagram, type InstagramStore } from "../../src/lib/instagram/sync";

const now = Date.parse("2026-11-13T04:17:00Z");
const config: InstagramConfig = {
  accountId: "123",
  authMode: "instagram-login",
  graphVersion: "v27.0",
  bootstrapToken: "test-token-not-a-real-secret",
  bootstrapExpiresAt: new Date(now + 40 * DAY).toISOString(),
  publicStoreId: "public-test",
  privateStoreId: "private-test",
};
const media = (id: number): Media => ({
  id: String(id),
  type: "IMAGE",
  permalink: `https://www.instagram.com/p/test${id}/`,
  timestamp: new Date(now - id * DAY).toISOString(),
  alt: `Photograph ${id}`,
  sourceUrl: `https://scontent.cdninstagram.com/${id}.jpg?signature=one`,
  sourceKey: `/${id}.jpg`,
});
const imageUrl = (id: string) => `https://test.public.blob.vercel-storage.com/instagram/${id}.webp`;

class MemoryStore implements InstagramStore {
  snapshot: Snapshot | null = null;
  token: TokenState | null = null;
  status: SyncStatus | null = null;
  locked = false;
  uploaded: string[] = [];
  deleted: string[] = [];
  failImage: string | null = null;
  failPublish = false;
  failTokenSave = false;
  failDelete = false;
  async acquireLock() {
    if (this.locked) return null;
    this.locked = true;
    return async () => {
      this.locked = false;
    };
  }
  async readSnapshot() {
    return this.snapshot;
  }
  async publishSnapshot(snapshot: Snapshot) {
    if (this.failPublish) throw Error("storage unavailable");
    this.snapshot = structuredClone(snapshot);
  }
  async readToken() {
    return this.token;
  }
  async saveToken(token: TokenState) {
    if (this.failTokenSave) throw Error("no storage");
    this.token = structuredClone(token);
  }
  async savePreview(item: Media) {
    if (item.id === this.failImage) throw new InstagramError("preview_download_failed");
    const url = imageUrl(item.id);
    this.uploaded.push(url);
    return url;
  }
  async deleteImages(urls: string[]) {
    if (this.failDelete && urls.length) throw Error("storage unavailable");
    this.deleted.push(...urls);
  }
  async saveStatus(status: SyncStatus) {
    this.status = status;
  }
}

const deps = (store: MemoryStore, items = [media(1), media(2)]) => ({
  config,
  store,
  now: () => now,
  fetchMedia: async () => items,
  refreshToken: async () => ({ accessToken: "renewed-test-token", expiresIn: (60 * DAY) / 1000 }),
});

test("first sync publishes real posts only after all images are durable; no signed source URLs in manifest", async () => {
  const store = new MemoryStore();
  const result = await syncInstagram(deps(store));
  assert.equal(result.outcome, "updated");
  assert.equal(store.snapshot?.posts.length, 2);
  assert.deepEqual(
    store.snapshot?.posts.map((post) => post.id),
    ["1", "2"],
  );
  assert.equal(JSON.stringify(store.snapshot).includes("signature="), false);
  assert.equal(JSON.stringify(store.snapshot).includes("accessToken"), false);
  assert.equal(store.status?.outcome, "success");
  assert.equal(store.locked, false);
});

test("a newer post with a failed preview leaves the complete previous feed intact", async () => {
  const store = new MemoryStore();
  await syncInstagram({ ...deps(store), now: () => now - DAY });
  const before = structuredClone(store.snapshot);
  store.failImage = "4";
  await assert.rejects(syncInstagram(deps(store, [media(3), media(4)])), /preview_download_failed/);
  assert.deepEqual(store.snapshot, before);
  assert.ok(store.deleted.includes(imageUrl("3")));
  assert.equal(store.status?.outcome, "failed");
  assert.equal(store.locked, false);
});

test("atomic manifest write failure never replaces last good feed and cleans new uploads", async () => {
  const store = new MemoryStore();
  await syncInstagram({ ...deps(store), now: () => now - DAY });
  const before = structuredClone(store.snapshot);
  store.failPublish = true;
  await assert.rejects(syncInstagram(deps(store, [media(9)])), /instagram_sync_failed/);
  assert.deepEqual(store.snapshot, before);
  assert.ok(store.deleted.includes(imageUrl("9")));
});

test("rotated credentials survive a later Meta/image error and are used by the next invocation", async () => {
  const store = new MemoryStore();
  const expiringConfig = { ...config, bootstrapExpiresAt: new Date(now + 2 * DAY).toISOString() };
  let refreshes = 0;
  await assert.rejects(
    syncInstagram({
      ...deps(store),
      config: expiringConfig,
      refreshToken: async () => {
        refreshes++;
        return { accessToken: "rotated", expiresIn: (60 * DAY) / 1000 };
      },
      fetchMedia: async (token) => {
        assert.equal(token, "rotated");
        throw Error("upstream error contains secret");
      },
    }),
    /instagram_sync_failed/,
  );
  assert.equal(store.token?.accessToken, "rotated");
  await syncInstagram({
    ...deps(store),
    config: expiringConfig,
    refreshToken: async () => {
      throw Error("should not refresh twice");
    },
    fetchMedia: async (token) => {
      assert.equal(token, "rotated");
      return [media(1)];
    },
  });
  assert.equal(refreshes, 1);
});

test("failed token persistence aborts before media lookup or snapshot publication", async () => {
  const store = new MemoryStore();
  store.failTokenSave = true;
  let mediaRequests = 0;
  await assert.rejects(
    syncInstagram({
      ...deps(store),
      fetchMedia: async () => {
        mediaRequests++;
        return [];
      },
    }),
  );
  assert.equal(mediaRequests, 0);
  assert.equal(store.snapshot, null);
});

test("duplicate/concurrent cron deliveries use no extra Meta request", async () => {
  const store = new MemoryStore();
  let calls = 0;
  const run = {
    ...deps(store),
    fetchMedia: async () => {
      calls++;
      return [media(1)];
    },
  };
  const outcomes = await Promise.all([syncInstagram(run), syncInstagram(run)]);
  assert.equal(calls, 1);
  assert.ok(outcomes.some((result) => result.outcome === "busy"));
  assert.equal((await syncInstagram(run)).outcome, "recent");
  assert.equal(calls, 1);
});

test("unchanged media is reused despite new CDN signatures, with a fresh successful-sync timestamp", async () => {
  const store = new MemoryStore();
  await syncInstagram({ ...deps(store), now: () => now - DAY });
  const uploaded = store.uploaded.length;
  await syncInstagram(
    deps(
      store,
      [1, 2].map((id) => ({ ...media(id), sourceUrl: media(id).sourceUrl.replace("one", "two") })),
    ),
  );
  assert.equal(store.uploaded.length, uploaded);
  assert.equal(store.snapshot?.syncedAt, new Date(now).toISOString());
});

test("retired image cleanup failures remain queued and are retried next day", async () => {
  const store = new MemoryStore();
  await syncInstagram({ ...deps(store, [media(1)]), now: () => now - 3 * DAY });
  await syncInstagram({ ...deps(store, [media(2)]), now: () => now - 2 * DAY });
  store.failDelete = true;
  await syncInstagram(deps(store, [media(2)]));
  assert.equal(store.snapshot?.retiredImages[0].url, imageUrl("1"));
  store.failDelete = false;
  await syncInstagram({ ...deps(store, [media(2)]), now: () => now + DAY });
  assert.ok(store.deleted.includes(imageUrl("1")));
  assert.equal(store.snapshot?.retiredImages.length, 0);
});

test("an authenticated empty account clears the feed; a long outage hides but preserves last good data", async () => {
  const store = new MemoryStore();
  await syncInstagram({ ...deps(store), now: () => now - DAY });
  assert.equal(isFresh(store.snapshot!, now), true);
  assert.equal(isFresh(store.snapshot!, now + 3 * DAY), false);
  await syncInstagram(deps(store, []));
  assert.deepEqual(store.snapshot?.posts, []);
});
