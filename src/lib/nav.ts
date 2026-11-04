export type NavItem = { label: string; href: string; children?: NavItem[] };

export const MENU: NavItem[] = [
  { label: "HOME", href: "/" },
  {
    label: "PORTFOLIO",
    href: "/portfolio/",
    children: [
      { label: "HOCHZEITEN", href: "/hochzeiten/" },
      { label: "FAMILIEN", href: "/familien/" },
      { label: "PAARE", href: "/paare/" },
    ],
  },
  { label: "INFO", href: "/infos-hochzeitsreportage/" },
  { label: "ÜBER MICH", href: "/ueber-mich/" },
  { label: "KONTAKT", href: "/kontakt/" },
];

/** The desktop header shows the first three items left of the logo, the rest on the right. */
export const MENU_LEFT = MENU.slice(0, 3);
export const MENU_RIGHT = MENU.slice(3);

/** WordPress menu classes for the current page and its parent (the theme CSS styles these). */
export function menuItemClass(item: NavItem, current: string) {
  const classes = ["menu-item"];
  if (item.children) classes.push("menu-item-has-children");
  if (item.href === current) classes.push("current-menu-item", "active");
  if (item.children?.some((c) => c.href === current)) classes.push("current-menu-ancestor", "current-menu-parent");
  return classes.join(" ");
}
