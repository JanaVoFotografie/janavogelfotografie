"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Photo = { src: string; srcSet: string; w: number; h: number; alt: string; thumb: string };

const SLIDESHOW_SPEED = 3000; // fancybox default

/**
 * Lightweight replacement for fancybox 3 with the same markup/classes (so the original styling
 * applies): counter, zoom, slideshow, thumbnails, close, arrows, keyboard and swipe.
 * Photos are read from the gallery links inside it (`[data-lightbox-index]`), so no image data
 * has to be shipped to the browser a second time.
 */
export function Lightbox({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [thumbs, setThumbs] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const stage = useRef<HTMLDivElement>(null);

  const collect = useCallback(() => {
    const links = [...(root.current?.querySelectorAll<HTMLAnchorElement>("[data-lightbox-index]") ?? [])];
    return links
      .sort((a, b) => Number(a.dataset.lightboxIndex) - Number(b.dataset.lightboxIndex))
      .map((a) => {
        const img = a.querySelector("img")!;
        return {
          src: a.getAttribute("href")!,
          srcSet: img.srcset,
          w: Number(img.getAttribute("width")),
          h: Number(img.getAttribute("height")),
          alt: img.alt,
          thumb: img.getAttribute("src")!,
        };
      });
  }, []);

  const close = useCallback(() => {
    setClosing(true);
    setPlaying(false);
    setTimeout(() => {
      setIndex(null);
      setClosing(false);
      setZoomed(false);
    }, 330);
  }, []);
  const go = useCallback(
    (d: number) => {
      setZoomed(false);
      setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length));
    },
    [photos.length],
  );

  // keyboard + scroll lock
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("fancybox-active");
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("fancybox-active");
      document.body.style.overflow = "";
    };
  }, [index, close, go]);

  // slideshow
  useEffect(() => {
    if (!playing || index === null) return;
    const t = setTimeout(() => go(1), SLIDESHOW_SPEED);
    return () => clearTimeout(t);
  }, [playing, index, go]);

  // preload neighbours
  useEffect(() => {
    if (index === null || !photos.length) return;
    for (const d of [1, -1]) {
      const n = photos[(index + d + photos.length) % photos.length];
      const pre = new Image();
      pre.sizes = "100vw";
      pre.srcset = n.srcSet;
    }
  }, [index, photos]);

  // keep the active thumbnail in view
  useEffect(() => {
    if (thumbs) document.querySelector(".fancybox-thumbs-active")?.scrollIntoView({ block: "nearest" });
  }, [thumbs, index]);

  // zoom: scroll to the clicked/centre point of the full-size image
  useEffect(() => {
    const el = stage.current?.querySelector<HTMLElement>(".jv-lightbox-slide");
    if (zoomed && el) {
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
      el.scrollTop = (el.scrollHeight - el.clientHeight) / 2;
    }
  }, [zoomed, index]);

  const current = index !== null ? photos[index] : null;
  const canZoom = !!current && typeof window !== "undefined" && (current.w > window.innerWidth - 88 || current.h > window.innerHeight - 88);

  const containerClass = [
    "fancybox-container fancybox-is-open fancybox-can-swipe fancybox-show-infobar fancybox-show-toolbar fancybox-show-nav",
    canZoom && "fancybox-is-zoomable",
    canZoom && (zoomed ? "fancybox-can-zoomOut" : "fancybox-can-zoomIn"),
    thumbs && "fancybox-show-thumbs",
    closing && "fancybox-is-closing",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={root}
      onClick={(e) => {
        const link = (e.target as HTMLElement).closest<HTMLAnchorElement>("[data-lightbox-index]");
        if (!link || e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        setPhotos(collect());
        setClosing(false);
        setIndex(Number(link.dataset.lightboxIndex));
      }}
    >
      {children}
      {current &&
        createPortal(
          <div
            className={containerClass}
            role="dialog"
            aria-modal="true"
            aria-label="Bildergalerie"
            tabIndex={-1}
            style={{ transitionDuration: "366ms" }}
            onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
            onTouchEnd={(e) => {
              if (!touch.current || zoomed) return;
              const dx = e.changedTouches[0].clientX - touch.current.x;
              const dy = e.changedTouches[0].clientY - touch.current.y;
              touch.current = null;
              if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
              else if (Math.abs(dy) > 80) close();
            }}
          >
            <div className="fancybox-bg"></div>
            <div className="fancybox-inner">
              <div className="fancybox-infobar">
                <span>{index! + 1}</span>&nbsp;/&nbsp;<span>{photos.length}</span>
              </div>
              <div className="fancybox-toolbar">
                <button
                  type="button"
                  className="fancybox-button fancybox-button--zoom"
                  title="Zoom"
                  disabled={!canZoom}
                  onClick={() => setZoomed((z) => !z)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`fancybox-button ${playing ? "fancybox-button--pause" : "fancybox-button--play"}`}
                  title={playing ? "Diashow anhalten" : "Diashow starten"}
                  onClick={() => setPlaying((p) => !p)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M6.5 5.4v13.2l11-6.6z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z" />
                  </svg>
                </button>
                <button type="button" className="fancybox-button fancybox-button--thumbs" title="Vorschaubilder" onClick={() => setThumbs((t) => !t)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z" />
                  </svg>
                </button>
                <button type="button" className="fancybox-button fancybox-button--close" title="Schließen" onClick={close}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z" />
                  </svg>
                </button>
              </div>
              <div className="fancybox-navigation">
                <button type="button" className="fancybox-button fancybox-button--arrow_left" title="Zurück" onClick={() => go(-1)}>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z" />
                    </svg>
                  </div>
                </button>
                <button type="button" className="fancybox-button fancybox-button--arrow_right" title="Weiter" onClick={() => go(1)}>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z" />
                    </svg>
                  </div>
                </button>
              </div>
              <div
                ref={stage}
                className="fancybox-stage"
                onClick={(e) => {
                  const t = e.target as HTMLElement;
                  if (t.classList.contains("fancybox-image") && canZoom) setZoomed((z) => !z);
                  else if (t === e.currentTarget || t.classList.contains("fancybox-slide")) close();
                }}
              >
                <div key={index} className={`fancybox-slide fancybox-slide--image fancybox-slide--current fancybox-slide--complete jv-lightbox-slide${zoomed ? " jv-lightbox-slide--zoomed" : ""}`}>
                  <div className="fancybox-content jv-lightbox-content" style={zoomed ? undefined : { aspectRatio: `${current.w} / ${current.h}` }}>
                    <img
                      className="fancybox-image"
                      src={current.src}
                      srcSet={zoomed ? undefined : current.srcSet}
                      sizes={`min(100vw, calc((100vh - 88px) * ${(current.w / current.h).toFixed(3)}))`}
                      width={current.w}
                      height={current.h}
                      alt={current.alt}
                    />
                  </div>
                </div>
              </div>
              {playing && <div key={`p${index}`} className="fancybox-progress jv-lightbox-progress" style={{ animationDuration: `${SLIDESHOW_SPEED}ms` }}></div>}
            </div>
            {thumbs && (
              <div className="fancybox-thumbs fancybox-thumbs-y">
                <div className="fancybox-thumbs__list">
                  {photos.map((p, i) => (
                    <a
                      key={p.src}
                      href={p.src}
                      className={i === index ? "fancybox-thumbs-active" : undefined}
                      style={{ backgroundImage: `url(${p.thumb})` }}
                      aria-label={`Bild ${i + 1}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setZoomed(false);
                        setIndex(i);
                      }}
                    ></a>
                  ))}
                </div>
              </div>
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}
