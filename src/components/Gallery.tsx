import { getImage, largestOf, srcOf, srcSetOf } from "@/lib/images";
import { Lightbox } from "./Lightbox";
import { galleryAlt } from "@/lib/alt-text";

/**
 * Masonry gallery (June theme "gallery view 2").
 * The column of every photo is computed at build time (shortest column first, like Masonry.js),
 * so the layout needs no JavaScript and never jumps while images load.
 * On phones the photos are shown in a single column in their original order.
 */
export function Gallery({ images, alt, columns, mobileColumns = 1 }: { images: string[]; alt?: string; columns: number; mobileColumns?: number }) {
  const items = images
    .flatMap((src) => {
      const info = getImage(src);
      return info ? [{ src, info }] : [];
    })
    .map(({ src, info }, index) => ({ src, index, info, alt: alt ? galleryAlt(src, alt, index) : "" }));

  // Same placement as Masonry.js on a 1440px wide screen: 1248px content width, 2 × 0.3125rem
  // (= 5.625px) padding per photo, integer item heights, shortest (then leftmost) column first.
  const colWidth = 1248 / columns;
  const padding = 11.25;
  const heights = new Array(columns).fill(0);
  const cols: (typeof items)[] = Array.from({ length: columns }, () => []);
  for (const item of items) {
    const target = heights.indexOf(Math.min(...heights));
    cols[target].push(item);
    heights[target] += Math.round((colWidth - padding) * (item.info.h / item.info.w) + padding);
  }

  const sizes = `(max-width: 767px) 100vw, ${Math.ceil(100 / columns)}vw`;
  return (
    <div className="flo-block flo-block--no-top-padding flo-block--masonry-parent-wrap flo-block--gallery">
      <div className="flo-block__container">
        <div
          className={`flo-block-gallery-view-2 flo-block-gallery-view-2--main flo-block-gallery-view-2--columns-${columns}`}
          data-mobile-cols={mobileColumns}
          style={{
            "--img-width": `calc(100% / ${columns})`,
            "--img-gap": "0.3125rem",
            "--mob-img-width": `calc(100% / ${mobileColumns})`,
            "--mob-img-gap": "0.3125rem",
          }}
        >
          <Lightbox>
            <div className="jv-masonry">
              {cols.map((col, c) => (
                <div className="jv-masonry__col" key={c}>
                  {col.map(({ index, info, alt }) => (
                    <a
                      key={index}
                      className="flo-block-gallery-view-2__image"
                      href={largestOf(info)}
                      data-lightbox-index={index}
                      style={{ "--i": index }}
                    >
                      <img
                        className="flo-block-gallery-view-2__image-thumb"
                        src={srcOf(info, 640)}
                        srcSet={srcSetOf(info)}
                        sizes={sizes}
                        width={info.w}
                        height={info.h}
                        alt={alt}
                        loading="lazy"
                        decoding="async"
                        suppressHydrationWarning
                      />
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </Lightbox>
        </div>
      </div>
    </div>
  );
}
