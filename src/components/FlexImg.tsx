import { getImage, srcOf, srcSetOf, type ImageSlot } from "@/lib/images";

type Box = { d: [number | null, number | null]; m: [number | null, number | null] };

/**
 * Image inside a Flex Builder element. The element box is positioned by CSS; the image
 * covers it (object-fit). `box` holds the box size in vw (desktop / mobile) so the browser
 * can pick the smallest sufficient variant.
 */
export function FlexImg({
  image,
  box,
  device,
  priority = false,
  className = "flex-img-tag",
}: {
  image: ImageSlot;
  box?: Box;
  device?: "desktop" | "mobile";
  priority?: boolean;
  className?: string;
}) {
  const info = getImage(image?.bild);
  if (!info) return null;
  const ratio = info.w / info.h;
  const need = ([w, h]: [number | null, number | null]) => Math.min(Math.ceil(Math.max(w ?? 100, (h ?? 0) * ratio)), 200);
  const sizes = box ? `(max-width: 767px) ${need(box.m)}vw, ${need(box.d)}vw` : "100vw";
  return (
    <img
      // "no-lazy" (a Flex Builder class) shows above-the-fold photos immediately instead of fading them in
      className={priority ? `${className} no-lazy` : className}
      src={srcOf(info)}
      srcSet={srcSetOf(info)}
      sizes={sizes}
      width={info.w}
      height={info.h}
      alt={image.alt}
      loading={priority && !device ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      suppressHydrationWarning
    />
  );
}
