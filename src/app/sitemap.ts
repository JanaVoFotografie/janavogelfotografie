import type { MetadataRoute } from "next";
import { PAGE_SEO, absoluteUrl, type PageKey } from "@/lib/seo";
import { getImage, largestOf } from "@/lib/images";
import startseite from "@content/seiten/startseite.json";
import hochzeiten from "@content/seiten/hochzeiten.json";
import paare from "@content/seiten/paare.json";
import familien from "@content/seiten/familien.json";
import portfolio from "@content/seiten/portfolio.json";
import info from "@content/seiten/info.json";
import ueberMich from "@content/seiten/ueber-mich.json";
import kontakt from "@content/seiten/kontakt.json";
import galerieHochzeiten from "@content/galerien/hochzeiten.json";
import galeriePaare from "@content/galerien/paare.json";
import galerieFamilien from "@content/galerien/familien.json";

/** Photos shown on each page (listed in the sitemap for Google Images). */
const PAGE_CONTENT: Partial<Record<PageKey, unknown[]>> = {
  home: [startseite],
  hochzeiten: [hochzeiten, galerieHochzeiten],
  paare: [paare, galeriePaare],
  familien: [familien, galerieFamilien],
  portfolio: [portfolio],
  "infos-hochzeitsreportage": [info],
  "ueber-mich": [ueberMich],
  kontakt: [kontakt],
};

function mediaPaths(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string" && value.startsWith("/media/")) out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => mediaPaths(v, out));
  else if (value && typeof value === "object") Object.values(value).forEach((v) => mediaPaths(v, out));
  return out;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(PAGE_SEO) as PageKey[]).map((key) => {
    const page = PAGE_SEO[key];
    const images = [...new Set(mediaPaths(PAGE_CONTENT[key] ?? []))]
      .map((src) => getImage(src))
      .filter((i) => i !== null)
      .map((i) => absoluteUrl(largestOf(i)));
    return { url: absoluteUrl(page.path), priority: page.priority, ...(images.length && { images }) };
  });
}
