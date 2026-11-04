"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/*
 * Re-implementation of the Flex Builder "tabs2" family without jQuery/slick:
 *   Tabs2         – the slider itself (images or texts), slick-compatible DOM
 *   Tabs2Text     – shows title/text of the current slide somewhere else in the block
 *   Tabs2Arrow    – prev/next buttons
 *   TabsSwitcher  – clickable tab labels
 * Elements that belong together share the id of the tabs2 element via TabsProvider.
 */

type Group = { pos: number; count: number };
type Ctx = { groups: Record<string, Group>; register: (id: string, count: number) => void; step: (id: string, d: number) => void; select: (id: string, i: number) => void };

const TabsContext = createContext<Ctx | null>(null);
const mod = (a: number, n: number) => ((a % n) + n) % n;

export function TabsProvider({ children }: { children: ReactNode }) {
  const [groups, setGroups] = useState<Record<string, Group>>({});
  const register = useCallback((id: string, count: number) => setGroups((g) => (g[id] ? g : { ...g, [id]: { pos: 0, count } })), []);
  const step = useCallback((id: string, d: number) => setGroups((g) => (g[id] ? { ...g, [id]: { ...g[id], pos: g[id].pos + d } } : g)), []);
  const select = useCallback(
    (id: string, i: number) => setGroups((g) => (g[id] ? { ...g, [id]: { ...g[id], pos: g[id].pos + (i - mod(g[id].pos, g[id].count)) } } : g)),
    [],
  );
  return <TabsContext.Provider value={{ groups, register, step, select }}>{children}</TabsContext.Provider>;
}

function useTabs(id: string, count?: number) {
  const ctx = useContext(TabsContext)!;
  const { register } = ctx;
  useEffect(() => {
    if (count) register(id, count);
  }, [id, count, register]);
  const group = ctx.groups[id];
  return { ctx, pos: group?.pos ?? 0, index: group ? mod(group.pos, group.count) : 0 };
}

export function Tabs2({
  id,
  className,
  style,
  slideType,
  speed,
  allowScroll = false,
  slides,
  slideAttrs,
}: {
  id: string;
  className: string;
  style: CSSProperties;
  slideType: "visibleNearby" | "oneSlide";
  speed: number;
  allowScroll?: boolean;
  slides: ReactNode[];
  slideAttrs: Record<string, string>[];
}) {
  const n = slides.length;
  const { ctx, pos } = useTabs(id, n);
  const touch = useRef<number | null>(null);

  // visibleNearby: all slides cloned on both sides; the "real" slides start at track position n
  const [track, setTrack] = useState({ p: n, animate: false });
  const lastPos = useRef(pos);
  useEffect(() => {
    const d = pos - lastPos.current;
    lastPos.current = pos;
    if (d) setTrack((t) => ({ p: t.p + d, animate: true }));
  }, [pos]);
  const onTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget) return;
    setTrack((t) => (t.p < n || t.p >= 2 * n ? { p: n + mod(t.p - n, n), animate: false } : t));
  };

  const swipe = {
    onTouchStart: (e: React.TouchEvent) => (touch.current = e.touches[0].clientX),
    onTouchEnd: (e: React.TouchEvent) => {
      if (touch.current === null) return;
      const dx = e.changedTouches[0].clientX - touch.current;
      touch.current = null;
      if (Math.abs(dx) > 40) ctx.step(id, dx < 0 ? 1 : -1);
    },
  };

  const index = mod(pos, n);
  const slideEl = (content: ReactNode, i: number, key: string, clone: boolean, extraStyle?: CSSProperties, active = false) => (
    <div
      key={key}
      className={`flex-element-type-tabs2__slide slick-slide${clone ? " slick-cloned" : ""}${active ? " slick-current slick-active" : ""}`}
      {...slideAttrs[i]}
      aria-hidden={!active}
      style={extraStyle}
    >
      {content}
      {allowScroll && <ScrollButton />}
    </div>
  );

  return (
    <div className={className} style={style} data-slide-type={slideType} data-slide-speed={speed}>
      <div className={`flex-element-type-tabs2__slider slick-initialized slick-slider${allowScroll ? " flex-element-type-tabs2__slider--allow-scroll" : ""}`}>
        <div className="slick-list draggable" {...swipe}>
          {slideType === "visibleNearby" ? (
            <div
              className="slick-track"
              style={{
                opacity: 1,
                display: "flex",
                width: "max-content",
                transform: `translate3d(calc(${-track.p} * (var(--slideWidth) + var(--slideGap))), 0, 0)`,
                transition: track.animate ? `transform ${speed}ms ease` : "none",
              }}
              onTransitionEnd={onTransitionEnd}
            >
              {[0, 1, 2].flatMap((copy) =>
                slides.map((s, i) => slideEl(s, i, `${copy}-${i}`, copy !== 1, undefined, copy * n + i === track.p)),
              )}
            </div>
          ) : (
            <div className="slick-track" style={{ opacity: 1, display: "flex" }}>
              {slides.map((s, i) =>
                slideEl(s, i, String(i), false, {
                  flex: "0 0 100%",
                  width: "100%",
                  position: "relative",
                  left: `${-i * 100}%`,
                  top: 0,
                  zIndex: i === index ? 999 : 998,
                  opacity: i === index ? 1 : 0,
                  transition: `opacity ${speed}ms ease`,
                }, i === index),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Mobile "allow scroll" button: scrolls long texts inside a fixed-height slide. */
function ScrollButton() {
  return (
    <button
      type="button"
      className="flex-element-type-tabs2__slide-scroll-button"
      aria-label="Weiterlesen"
      onClick={(e) => {
        const content = (e.currentTarget.parentElement?.querySelector(".flex-element-type-tabs2__slide-text-content") as HTMLElement) ?? null;
        content?.scrollBy({ top: content.clientHeight * 0.8, behavior: "smooth" });
      }}
    >
      <i className="flo-flex-icon-arrow-down-2"></i>
    </button>
  );
}

export function Tabs2Text({
  id,
  style,
  titleFont,
  textFont,
  items,
}: {
  id: string;
  style: CSSProperties;
  titleFont: string;
  textFont: string;
  items: { title: ReactNode; text: ReactNode }[];
}) {
  const { index } = useTabs(id);
  const item = items[index] ?? items[0];
  return (
    <div className="flex-element-type-tabs2-text" style={style}>
      <h4 key={`t${index}`} className="flex-element-type-tabs2-text__title jv-tabs-text" data-font={titleFont}>
        {item?.title}
      </h4>
      <h5 key={`x${index}`} className="flex-element-type-tabs2-text__text jv-tabs-text" data-font={textFont}>
        {item?.text}
      </h5>
    </div>
  );
}

export function Tabs2Arrow({ id, role, style, icon }: { id: string; role: "next" | "prev"; style: CSSProperties; icon: string }) {
  const { ctx } = useTabs(id);
  return (
    <button
      type="button"
      className="flex-element-type-tabs2-arrow"
      style={style}
      data-role={role}
      aria-label={role === "next" ? "Weiter" : "Zurück"}
      onClick={() => ctx.step(id, role === "next" ? 1 : -1)}
    >
      <i className={icon}></i>
    </button>
  );
}

export function TabsSwitcher({
  id,
  className,
  style,
  itemStyle,
  items,
}: {
  id: string;
  className: string;
  style: CSSProperties;
  itemStyle: CSSProperties;
  items: string[];
}) {
  const { ctx, index } = useTabs(id);
  return (
    <div className={className} style={style} role="tablist">
      {items.map((label, i) => (
        <button
          type="button"
          role="tab"
          aria-selected={i === index}
          key={label}
          className={`flex-element-type-tabs-switcher__item flex-element-type-tabs-switcher__item--background${i === index ? " flex-element-type-tabs-switcher__item--active" : ""}`}
          data-index={i}
          onClick={() => ctx.select(id, i)}
        >
          <span style={itemStyle} data-font="">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
