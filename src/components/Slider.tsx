"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Minimal infinite slider that renders the same DOM as slick.js
 * (slick-list > slick-track > slick-slide incl. clones), so the original theme CSS applies.
 * Used for the home page slideshow.
 */
export function Slider({
  children,
  className,
  speed = 1000,
  autoplay = 6000,
  prev,
  next,
  onChange,
}: {
  children: ReactNode;
  className: string;
  speed?: number;
  autoplay?: number;
  prev?: string;
  next?: string;
  onChange?: (index: number) => void;
}) {
  const slides = Children.toArray(children);
  const n = slides.length;
  const [pos, setPos] = useState(1); // position in the track incl. leading clone
  const [animate, setAnimate] = useState(true);
  const busy = useRef(false);
  const root = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  const current = (((pos - 1) % n) + n) % n;

  const goTo = useCallback(
    (p: number) => {
      if (busy.current) return;
      busy.current = true;
      setAnimate(true);
      setPos(p);
    },
    [],
  );
  const step = useCallback((d: number) => goTo(pos + d), [goTo, pos]);

  useEffect(() => onChange?.(current), [current, onChange]);

  // autoplay (slick: pauseOnHover false)
  useEffect(() => {
    if (!autoplay || n < 2) return;
    timer.current = setInterval(() => step(1), autoplay);
    return () => clearInterval(timer.current);
  }, [autoplay, step, n]);

  // jump from clone to the real slide without animation
  const onTransitionEnd = () => {
    busy.current = false;
    if (pos === 0 || pos === n + 1) {
      setAnimate(false);
      setPos(pos === 0 ? n : 1);
    }
  };

  // external arrows (rendered by the server component outside of the slider)
  useEffect(() => {
    const block = root.current?.closest(".flo-block");
    const onClick = (e: Event) => {
      const t = e.target as HTMLElement;
      if (prev && t.closest(prev)) step(-1);
      if (next && t.closest(next)) step(1);
    };
    block?.addEventListener("click", onClick);
    return () => block?.removeEventListener("click", onClick);
  }, [prev, next, step]);

  // keyboard arrows like the theme
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest("input,textarea,select,[contenteditable]")) return;
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [step]);

  // load the remaining slides once the page (incl. the first photo) has loaded
  useEffect(() => {
    const load = () => {
      root.current?.querySelectorAll<HTMLImageElement>("img[data-srcset]").forEach((img) => {
        img.srcset = img.dataset.srcset!;
        img.src = img.dataset.src!;
        img.removeAttribute("data-srcset");
      });
    };
    if (document.readyState === "complete") {
      const t = setTimeout(load, 300);
      return () => clearTimeout(t);
    }
    window.addEventListener("load", load, { once: true });
    return () => window.removeEventListener("load", load);
  }, []);

  // swipe
  const touch = useRef<number | null>(null);

  const track = [slides[n - 1], ...slides, slides[0]];
  return (
    <div className={`${className} slick-initialized slick-slider`} ref={root}>
      <div
        className="slick-list draggable"
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touch.current === null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          touch.current = null;
          if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
        }}
      >
        <div
          className="slick-track"
          style={{
            opacity: 1,
            display: "flex",
            transform: `translate3d(${-pos * 100}%, 0, 0)`,
            transition: animate ? `transform ${speed}ms ease` : "none",
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {track.map((slide, i) => {
            const real = i - 1;
            const isClone = i === 0 || i === n + 1;
            const active = i === pos;
            return (
              <div
                key={i}
                className={`slick-slide${isClone ? " slick-cloned" : ""}${active ? " slick-current slick-active" : ""}`}
                data-slick-index={isClone ? (i === 0 ? -1 : n) : real}
                aria-hidden={!active}
                style={{ flex: "0 0 100%", width: "100%" }}
              >
                {slide}
              </div>
            );
          })}
        </div>
      </div>
      <SlideCounter current={current} total={n} />
    </div>
  );
}

/** Updates the theme's counter element (rendered by the server) with the current slide number. */
function SlideCounter({ current, total }: { current: number; total: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const block = ref.current?.closest(".flo-block");
    const el = block?.querySelector(".flo-block-slideshow-1__current-index");
    const tot = block?.querySelector(".flo-block-slideshow-1__total-index");
    if (el) el.textContent = String(current + 1);
    if (tot) tot.textContent = String(total);
  }, [current, total]);
  return <span ref={ref} hidden />;
}
