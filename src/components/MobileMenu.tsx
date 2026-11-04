"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { MENU, menuItemClass, type NavItem } from "@/lib/nav";

// Same body classes the June theme toggles; its CSS drives the slide-in animation.
const OPENED = "body--flo-mobile-menu-popup-opened";
const CLOSED = "body--flo-mobile-menu-popup-closed";

function setOpen(open: boolean) {
  document.body.classList.toggle(OPENED, open);
  document.body.classList.toggle(CLOSED, !open);
}

export function MobileMenuTrigger() {
  return (
    <button type="button" className="flo-header-mobile__menu-trigger" aria-label="Menü öffnen" onClick={() => setOpen(true)}>
      <i className="flo-icon-menu-left"></i>
    </button>
  );
}

/** Animates the sub menu like jQuery's slideToggle("slow"). */
function SubMenu({ items, open, current }: { items: NavItem[]; open: boolean; current: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const first = useRef(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (first.current) {
      first.current = false;
      return;
    }
    const full = el.scrollHeight;
    el.style.display = "block";
    const anim = el.animate(
      open ? [{ height: "0px", overflow: "hidden" }, { height: `${full}px`, overflow: "hidden" }] : [{ height: `${full}px`, overflow: "hidden" }, { height: "0px", overflow: "hidden" }],
      { duration: 600, easing: "ease-in-out" },
    );
    anim.onfinish = () => {
      el.style.display = open ? "block" : "";
    };
    return () => anim.cancel();
  }, [open]);
  return (
    <ul ref={ref} className="sub-menu dropdown-menu">
      {items.map((child) => (
        <li key={child.href} className={menuItemClass(child, current)}>
          <Link prefetch={false} href={child.href} data-font="third_level/caption">
            {child.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function MobileMenu({ page, current, children }: { page: string; current: string; children: ReactNode }) {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<string[]>([]);

  // close the popup after navigating
  useEffect(() => {
    setOpen(false);
    return () => setOpen(false);
  }, [pathname]);

  return (
    <div className={`flo-mobile-menu flo-mobile-menu--logo-center flo-mobile-menu--${page}`}>
      <div className="flo-mobile-menu__top-area">
        <div className="flo-mobile-menu__spacer"></div>
        {children}
        <button type="button" className="flo-mobile-menu__close" aria-label="Menü schließen" onClick={() => setOpen(false)}>
          <i className="flo-icon-close"></i>
        </button>
      </div>
      <ul className="flo-mobile-menu__menu">
        {MENU.map((item) => {
          const open = openItems.includes(item.href);
          return (
            <li key={item.href} className={menuItemClass(item, current) + (open ? " children-visible" : "")}>
              <Link prefetch={false} href={item.href} data-font="third_level/navigation" onClick={() => setOpen(false)}>
                {item.label}
                {item.children && (
                  <span
                    className="flo-mobile-menu__menu-dropdown-toggle"
                    role="button"
                    aria-label="Untermenü"
                    aria-expanded={open}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpenItems((s) => (s.includes(item.href) ? s.filter((h) => h !== item.href) : [...s, item.href]));
                    }}
                  >
                    <i className="flo-icon-arrow-small-right"></i>
                  </span>
                )}
              </Link>
              {item.children && <SubMenu items={item.children} open={open} current={current} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
