import type { CSSProperties } from "react";
import { getImage, srcOf, srcSetOf, type ImageSlot } from "@/lib/images";

/** Slide image of a tabs2 slider (e.g. the "Love letters" testimonials). */
export function TabsImg({ image, className, style }: { image: ImageSlot; className: string; style?: CSSProperties }) {
  const info = getImage(image?.bild);
  if (!info) return null;
  return (
    <img
      className={className}
      src={srcOf(info)}
      srcSet={srcSetOf(info)}
      sizes="(max-width: 767px) 90vw, 45vw"
      width={info.w}
      height={info.h}
      alt={image.alt}
      style={style}
      loading="lazy"
      decoding="async"
      suppressHydrationWarning
    />
  );
}
