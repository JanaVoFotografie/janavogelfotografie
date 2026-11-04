import { getImage, srcOf, srcSetOf, type ImageSlot } from "@/lib/images";
import { HeaderBar } from "./SiteHeader";
import { Slider } from "./Slider";

/** Full-screen slideshow with the transparent header on top (June theme "slideshow 1"). */
export function HomeSlideshow({ images }: { images: ImageSlot[] }) {
  return (
    <div className="flo-block flo-block--full-width flo-block--no-padding flo-block--home-slideshow">
      <div className="flo-block__container">
        <div className="flo-block-slideshow-1 flo-block-slideshow-1--home">
          <div className="flo-block-slideshow-1__header-area">
            <HeaderBar page="home" current="/" />
          </div>
          <Slider className="flo-block-slideshow-1__slides" speed={1000} autoplay={6000} prev=".flo-block-slideshow-1__arrow--prev" next=".flo-block-slideshow-1__arrow--next">
            {images.flatMap((slot) => {
              const info = getImage(slot?.bild);
              return info ? [{ info, alt: slot.alt }] : [];
            }).map(({ info, alt }, i) => {
              const src = info.v[0][1];
              return (
                <div key={src} className="flo-block-slideshow-1__slide flo-block-slideshow-1__slide--image">
                  <div className="flo-block-slideshow-1__slide-content" data-color="#FFFFFF">
                    <div className="flo-block-slideshow-1__slide-img--wrapper" style={{ "--object-position": "50%" }}>
                      {i === 0 ? (
                        <img
                          className="flo-block-slideshow-1__slide-img no-lazy"
                          src={srcOf(info, 1600)}
                          srcSet={srcSetOf(info)}
                          sizes="100vw"
                          width={info.w}
                          height={info.h}
                          alt={alt}
                          fetchPriority="high"
                          suppressHydrationWarning
                        />
                      ) : (
                        // loaded by <Slider> after the page has finished loading, so the first photo gets the full bandwidth
                        <img
                          className="flo-block-slideshow-1__slide-img"
                          data-src={srcOf(info, 1600)}
                          data-srcset={srcSetOf(info)}
                          sizes="100vw"
                          width={info.w}
                          height={info.h}
                          alt={alt}
                          decoding="async"
                          suppressHydrationWarning
                        />
                      )}
                    </div>
                    <div className="flo-block-slideshow-1__text-area flo-block-slideshow-1__text-area--type-b">
                      <div className="flo-block-slideshow-1__top-side"></div>
                      <div className="flo-block-slideshow-1__bottom-side"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
          <div className="flo-block-slideshow-1__decorative-line flo-block-slideshow-1__decorative-line--type-b"></div>
          <div className="flo-block-slideshow-1__navigation flo-block-slideshow-1__navigation--type-b">
            <button type="button" className="flo-block-slideshow-1__arrow flo-block-slideshow-1__arrow--prev" aria-label="Vorheriges Bild">
              <i className="flo-icon-arrow-left"></i>
            </button>
            <button type="button" className="flo-block-slideshow-1__arrow flo-block-slideshow-1__arrow--next" aria-label="Nächstes Bild">
              <i className="flo-icon-arrow-right"></i>
            </button>
          </div>
          <div className="flo-block-slideshow-1__counter flo-block-slideshow-1__counter--type-b" data-font="third_level/caption">
            <span className="flo-block-slideshow-1__current-index">1</span>
            <span className="flo-block-slideshow-1__counter-delimiter"></span>
            <span className="flo-block-slideshow-1__total-index">{images.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
