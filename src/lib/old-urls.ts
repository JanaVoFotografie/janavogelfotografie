import wpImages from "@/data/wp-images.json";
import { getImage, largestOf } from "./images";

/*
 * Old URLs (from the WordPress era or typos) that no longer exist are redirected
 * permanently (301) to the most relevant page instead of showing a 404.
 * Google transfers the old signals to the new target and updates its index.
 *
 * A blanket redirect of everything to the home page would be treated by Google as
 * "soft 404"; matching by topic keeps the redirects meaningful.
 */

/** Topic keywords in an old URL → best matching page (first match wins). */
const TOPICS: [RegExp, string][] = [
  [/impressum|imprint/, "/impressum/"],
  [/datenschutz|privacy|dsgvo/, "/datenschutz/"],
  [/kontakt|contact|anfrage|buchen|booking/, "/kontakt/"],
  [/ueber-?mich|uber-?mich|about|jana(?!.*hochzeit)/, "/ueber-mich/"],
  [/info|preis|price|ablauf|faq|leistung|after-?wedding/, "/infos-hochzeitsreportage/"],
  [/famil|baby|newborn|neugeboren|schwanger|babybauch|kind|homestory/, "/familien/"],
  [/paar|couple|verlob|engagement|love/, "/paare/"],
  [/hochzeit|wedding|braut|bride|trauung|standesamt/, "/hochzeiten/"],
  [/portfolio|galerie|gallery|bilder|fotos/, "/portfolio/"],
];

/** Requests that are not pages: answer with a plain 404 (no redirect). */
const NOT_A_PAGE = /^\/(_next|_img|fonts|brand|api)\/|^\/wp-(admin|includes|json|login)|xmlrpc|\.(php|js|css|map|json|txt|xml|ico|svg|woff2?|env|ini|log|sql|zip)$/i;

const normaliseUpload = (path: string) =>
  path
    .replace(/^\/wp-content\/uploads\//, "")
    .replace(/-\d+x\d+(?=\.\w+$)/, "")
    .replace(/(\.jpg)?-scaled(?=\.jpg$)/i, "")
    .replace(/\.jpe?g\.jpg$/i, ".jpg");

/** Where an unknown path should go: a URL (redirect) or null (404). */
export function redirectTarget(rawPath: string): string | null {
  let decoded = rawPath;
  try {
    decoded = decodeURIComponent(rawPath);
  } catch {}
  const path = decoded.toLowerCase();

  // old image URLs (Google Images, Pinterest, other websites) → the same photo in its new location
  if (path.startsWith("/wp-content/uploads/")) {
    const media = (wpImages as Record<string, string>)[normaliseUpload(decoded)];
    const info = getImage(media);
    return info ? largestOf(info) : null;
  }
  if (NOT_A_PAGE.test(path)) return null;

  const words = path.replace(/[_\s]+/g, "-");
  for (const [re, target] of TOPICS) if (re.test(words)) return target;
  return "/";
}
