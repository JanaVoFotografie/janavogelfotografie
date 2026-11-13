// Isolated visual fixture. This file is never imported by the application.
// Bundle with esbuild into /tmp; see docs/instagram-feed.md.
import { createRoot } from "react-dom/client";
import { InstagramFeedGrid } from "../../src/components/InstagramFeedGrid";

createRoot(document.getElementById("root")!).render(
  <>
    <p style={{ margin: 20, fontFamily: "sans-serif" }}>Nur Layout-Test: sechs Testbeiträge, keine Live-Instagram-Daten.</p>
    <InstagramFeedGrid
      posts={Array.from({ length: 6 }, (_, index) => ({
        id: String(index),
        type: index === 1 ? "VIDEO" : index === 2 ? "CAROUSEL_ALBUM" : "IMAGE",
        permalink: `https://www.instagram.com/p/test${index}/`,
        imageUrl: `/photo-${index}.webp`,
        alt: `Layout-Testfoto ${index + 1}`,
      }))}
    />
  </>,
);
