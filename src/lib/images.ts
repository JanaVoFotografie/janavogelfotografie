import manifest from "@/generated/images.json";

/** Intrinsic size and responsive WebP variants of a CMS image (see scripts/images.mjs). */
export type ImageInfo = { w: number; h: number; v: [number, string][]; og?: string };

/** Image slot as stored in content/seiten/*.json. */
export type ImageSlot = { bild: string; alt: string };

const images = manifest as unknown as Record<string, ImageInfo>;

/** Returns null for missing photos (e.g. deleted in the CMS) – components then simply leave them out. */
export function getImage(src: string | undefined | null): ImageInfo | null {
  return (src && images[src]) || null;
}

export const srcSetOf = (info: ImageInfo) => info.v.map(([w, url]) => `${url} ${w}w`).join(", ");

/** Variant used as plain `src` (for browsers without srcset support and for the lightbox fallback). */
export function srcOf(info: ImageInfo, target = 1080) {
  return (info.v.find(([w]) => w >= target) ?? info.v[info.v.length - 1])[1];
}

/** Largest variant, e.g. for the lightbox or Open Graph images. */
export const largestOf = (info: ImageInfo) => info.v[info.v.length - 1][1];
