"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

const KEY = "cookie_notice_accepted";

/**
 * The notice bar of the old "Cookie Notice" plugin (same look and texts).
 * The new site itself sets no cookies; the choice is remembered in localStorage.
 * To remove the bar completely, delete <CookieNotice /> from src/app/layout.tsx.
 */
const listeners = new Set<() => void>();
function accepted() {
  try {
    return localStorage.getItem(KEY) === "true";
  } catch {
    return false;
  }
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export function CookieNotice() {
  // hidden during prerendering, shown in the browser until accepted
  const visible = useSyncExternalStore(subscribe, () => !accepted(), () => false);
  if (!visible) return null;
  const accept = () => {
    try {
      localStorage.setItem(KEY, "true");
    } catch {}
    listeners.forEach((l) => l());
  };
  return (
    <div id="cookie-notice" role="dialog" aria-label="Cookie-Hinweis" className="cookie-notice-visible cn-position-bottom" style={{ backgroundColor: "rgba(135,89,64,1)" }}>
      <div className="cookie-notice-container" style={{ color: "#fff" }}>
        <span id="cn-notice-text" className="cn-text-container">
          Diese Website benutzt Cookies. Wenn du die Website weiter nutzt, gehen wir von deinem Einverständnis aus.
        </span>
        <span id="cn-notice-buttons" className="cn-buttons-container">
          <button type="button" id="cn-accept-cookie" className="cn-set-cookie cn-button" aria-label="OK" style={{ backgroundColor: "#00a99d" }} onClick={accept}>
            OK
          </button>
          <Link prefetch={false} href="/datenschutz/" target="_blank" id="cn-more-info" className="cn-more-info cn-button" style={{ backgroundColor: "#00a99d" }}>
            Datenschutzerklärung
          </Link>
        </span>
        <button type="button" id="cn-close-notice" className="cn-close-icon" aria-label="Nein" onClick={accept}></button>
      </div>
    </div>
  );
}
