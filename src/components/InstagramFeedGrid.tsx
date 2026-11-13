import type { Post } from "@/lib/instagram/model";
import styles from "./InstagramFeed.module.css";

type DisplayPost = Pick<Post, "id" | "type" | "permalink" | "imageUrl" | "alt">;

/** Presentation only, shared with the isolated test harness. */
export function InstagramFeedGrid({ posts }: { posts: DisplayPost[] }) {
  return (
    <section className={styles.feed} aria-label="Aktuelle Beiträge von Jana Vogel auf Instagram">
      <div className={styles.grid}>
        {posts.map((post) => (
          <a key={post.id} className={styles.post} href={post.permalink} target="_blank" rel="noopener noreferrer">
            <img
              className={styles.image}
              src={post.imageUrl}
              alt={post.alt}
              width={640}
              height={640}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            <span className={styles.srOnly}> – Beitrag auf Instagram öffnen (neuer Tab)</span>
            {post.type !== "IMAGE" && (
              <svg className={styles.mediaIcon} width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                {post.type === "VIDEO" ? (
                  <path d="M7 3.5v17l14-8.5z" fill="currentColor" />
                ) : (
                  <>
                    <rect x="7" y="3" width="14" height="14" rx="2" fill="currentColor" />
                    <path d="M3 7v12a2 2 0 0 0 2 2h12" fill="none" stroke="currentColor" strokeWidth="2" />
                  </>
                )}
              </svg>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
