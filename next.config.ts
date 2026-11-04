import type { NextConfig } from "next";

// WordPress page IDs (old "?page_id=…" links) → new URLs
const WP_PAGE_IDS: Record<string, string> = {
  "107": "/",
  "111": "/kontakt/",
  "109": "/ueber-mich/",
  "170": "/hochzeiten/",
  "172": "/paare/",
  "174": "/familien/",
  "682": "/portfolio/",
  "2608": "/infos-hochzeitsreportage/",
  "310": "/impressum/",
  "342": "/datenschutz/",
};

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Same URLs as the old WordPress site (with trailing slash)
  trailingSlash: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        // optimised photos have a content hash in their name and never change
        source: "/_img/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:dir(fonts|brand)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
  async redirects() {
    return [
      // leftover WordPress pages
      { source: "/gallery/hochzeiten/", destination: "/hochzeiten/", permanent: true },
      { source: "/gallery/familien/", destination: "/familien/", permanent: true },
      { source: "/gallery/paare/", destination: "/paare/", permanent: true },
      { source: "/entry_form/:path*", destination: "/kontakt/", permanent: true },
      { source: "/feed/", destination: "/", permanent: true },
      { source: "/home/", destination: "/", permanent: true },
      // old Yoast sitemaps (still known to Google Search Console)
      { source: "/:file(sitemap_index|page-sitemap|gallery-sitemap|entry_form-sitemap|post-sitemap)\\.xml", destination: "/sitemap.xml", permanent: true },
      // "?page_id=123" links
      ...Object.entries(WP_PAGE_IDS)
        .filter(([, to]) => to !== "/")
        .map(([id, destination]) => ({ source: "/", has: [{ type: "query" as const, key: "page_id", value: id }], destination, permanent: true })),
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      // everything that is neither a page nor a file: old WordPress URLs, old image links, typos
      // → src/app/api/redirect answers with a 301 to the best matching page
      fallback: [{ source: "/:path*", destination: "/api/redirect/:path*" }],
    };
  },
};

export default nextConfig;
