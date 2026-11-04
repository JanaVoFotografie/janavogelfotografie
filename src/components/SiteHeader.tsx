import Link from "next/link";
import { MENU_LEFT, MENU_RIGHT, menuItemClass, type NavItem } from "@/lib/nav";
import { MobileMenu, MobileMenuTrigger } from "./MobileMenu";

type Variant = "home" | "solid";

const LOGO = {
  home: "/brand/logo-weiss.png",
  solid: "/brand/logo-schwarz.png",
};

function MenuList({ items, current }: { items: NavItem[]; current: string }) {
  return (
    <ul className="flo-header__menu-items">
      {items.map((item) => (
        <li key={item.href} className={menuItemClass(item, current)}>
          <Link prefetch={false} href={item.href} data-font="7172010c80d0">
            {item.label}
          </Link>
          {item.children && (
            <ul className="sub-menu dropdown-menu" role="menubar">
              {item.children.map((child) => (
                <li key={child.href} className={menuItemClass(child, current)} role="none">
                  <Link prefetch={false} href={child.href} data-font="7172010c80d0" role="menuitem">
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Logo({ variant, className, alt = "Jana Vogel Fotografie" }: { variant: Variant; className: string; alt?: string }) {
  return (
    <>
      {["default", "sticky", "light"].map((kind) =>
        className === "flo-header-mobile__logo-image" && kind === "sticky" ? null : (
          <img
            key={kind}
            className={`${className} ${className}--${kind}`}
            width={150}
            height={81.5}
            src={LOGO[variant]}
            // only the visible logo gets a text; the theme's hidden duplicates are decorative
            alt={kind === "default" ? alt : ""}
          />
        ),
      )}
    </>
  );
}

/** On the home page the logo is the main heading (with a descriptive text for search engines). */
const HOME_LOGO_ALT = "Jana Vogel Fotografie – Hochzeitsfotografin in Hagen & NRW";
const MaybeHeading = ({ heading, children }: { heading: boolean; children: React.ReactNode }) =>
  heading ? <h1 className="jv-logo-heading">{children}</h1> : <>{children}</>;

/** Desktop header + mobile header bar + mobile menu, exactly as rendered by the June theme. */
export function HeaderBar({ page, current }: { page: string; current: string }) {
  const variant: Variant = page === "home" ? "home" : "solid";
  return (
    <>
      <header className={variant === "home" ? "is-custom" : "flo-header--static is-custom"}>
        <div className={`flo-header flo-header--${page} flo-header--type-a is-not-sticky`}>
          <div className="flo-header__menu flo-header__menu--left">
            <div className="flo-header__menu-wrap">
              <MenuList items={MENU_LEFT} current={current} />
            </div>
          </div>
          <div className="flo-header__logo-wrap">
            <MaybeHeading heading={variant === "home"}>
              <Link prefetch={false} href="/" className="flo-header__logo">
                <Logo variant={variant} className="flo-header__logo-image" alt={variant === "home" ? HOME_LOGO_ALT : undefined} />
              </Link>
            </MaybeHeading>
          </div>
          <div className="flo-header__menu flo-header__menu--right">
            <div className="flo-header__menu-wrap">
              <MenuList items={MENU_RIGHT} current={current} />
            </div>
          </div>
        </div>
        <div className={`flo-header-mobile flo-header-mobile--logo-center flo-header-mobile--${page} not-sticky`} style={{ visibility: "visible" }}>
          <div className="flo-header-mobile__spacer"></div>
          <MaybeHeading heading={variant === "home"}>
            <Link prefetch={false} href="/" className="flo-header-mobile__logo">
              <Logo variant={variant} className="flo-header-mobile__logo-image" alt={variant === "home" ? HOME_LOGO_ALT : undefined} />
            </Link>
          </MaybeHeading>
          <MobileMenuTrigger />
        </div>
      </header>
      <MobileMenu page={page} current={current}>
        <Link prefetch={false} href="/" className="flo-header-mobile__logo">
          <Logo variant={variant} className="flo-header-mobile__logo-image" />
        </Link>
      </MobileMenu>
    </>
  );
}

/**
 * Header block used on all pages except the home page (where it sits on the slideshow).
 * `page` selects the page-specific header colours (defined in each page's page.css).
 */
export function SiteHeader({ page, current }: { page: string; current: string }) {
  return (
    <div className="flo-block flo-block--full-width flo-block--header">
      <div className="flo-block__container">
        <HeaderBar page={page} current={current} />
      </div>
    </div>
  );
}
