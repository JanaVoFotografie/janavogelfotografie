import type { Metadata } from "next";
import { preload } from "react-dom";
import { CookieNotice } from "@/components/CookieNotice";
import { JsonLd } from "@/components/JsonLd";
import { BUSINESS, SITE_URL } from "@/lib/business";
import { siteGraph } from "@/lib/structured-data";
import "@/styles/fonts.css";
import "@/styles/wp.css";
import "@/styles/footer.css";
import "@/styles/site.css";

// Every page is prerendered at build time and served from the CDN.
export const ensureStatic = "navigation";

// Defaults; every page sets its own title, description, canonical URL and share image (src/lib/seo.ts).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hochzeitsfotografin Hagen & NRW | Jana Vogel Fotografie",
    template: "%s | Jana Vogel Fotografie",
  },
  description: BUSINESS.description,
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.owner, url: `${SITE_URL}/ueber-mich/` }],
  creator: BUSINESS.owner,
  publisher: BUSINESS.name,
  category: "Fotografie",
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: { type: "website", locale: "de_DE", siteName: BUSINESS.name },
  // Site verification for Search Console / Pinterest, if needed:
  // verification: { google: "…", other: { "p:domain_verify": "…" } },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

// Adds "is-loaded" to images once they are loaded; the CSS fades them in like the old lazy loader.
const imageLoadScript = `document.addEventListener("load",function(e){var t=e.target;t&&t.tagName==="IMG"&&/flex-img-tag|slideshow-1__slide-img|gallery-view-2__image-thumb/.test(t.className)&&t.classList.add("is-loaded")},true);`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  preload("/fonts/Lato-300.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/fonts/Lato-400.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/fonts/NewYork.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  return (
    <html lang="de-DE">
      <head>
        <script dangerouslySetInnerHTML={{ __html: imageLoadScript }} />
        <noscript>
          <style>{`img.flex-img-tag,.flo-block-slideshow-1__slide-img,.flo-block-gallery-view-2__image-thumb{opacity:1!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <JsonLd data={siteGraph()} />
        {children}
        <CookieNotice />
      </body>
    </html>
  );
}
