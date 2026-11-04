// schema.org data (JSON-LD) – tells search engines who Jana is, what she offers and where.
// Test: https://search.google.com/test/rich-results and https://validator.schema.org
import { BUSINESS, SERVICES, SITE_URL } from "./business";
import { getImage, largestOf } from "./images";
import { PAGE_SEO, absoluteUrl, type PageKey } from "./seo";
import { FAQ } from "@/data/faq";
import startseite from "@content/seiten/startseite.json";
import ueberMich from "@content/seiten/ueber-mich.json";

const ref = (fragment: string) => ({ "@id": `${SITE_URL}/#${fragment}` });
const imageUrl = (src: string | undefined) => {
  const info = getImage(src);
  return info ? absoluteUrl(largestOf(info)) : undefined;
};

/** Site-wide entities: website, business (local photographer) and the person behind it. */
export function siteGraph() {
  const photos = startseite.slideshow.map((s) => imageUrl(typeof s === "string" ? s : s.bild)).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        ...ref("website"),
        url: `${SITE_URL}/`,
        name: BUSINESS.name,
        alternateName: ["Jana Vogel", "Jana Vogel Hochzeitsfotografie"],
        description: BUSINESS.slogan,
        inLanguage: "de-DE",
        publisher: ref("business"),
      },
      {
        "@type": "ProfessionalService",
        ...ref("business"),
        name: BUSINESS.name,
        description: BUSINESS.description,
        slogan: BUSINESS.slogan,
        url: `${SITE_URL}/`,
        logo: { "@type": "ImageObject", url: absoluteUrl("/brand/logo-schwarz.png"), width: 300, height: 163 },
        image: photos,
        email: BUSINESS.email,
        telephone: BUSINESS.telephone,
        priceRange: "ab 2.200 € (Hochzeitsreportage)",
        address: { "@type": "PostalAddress", ...BUSINESS.address },
        areaServed: BUSINESS.areaServed.map((name) => ({
          "@type": /Nordrhein-Westfalen|Ruhrgebiet|Sauerland/.test(name) ? "AdministrativeArea" : "City",
          name,
        })),
        knowsLanguage: BUSINESS.languages,
        founder: ref("jana"),
        sameAs: BUSINESS.sameAs,
        knowsAbout: ["Hochzeitsfotografie", "Hochzeitsreportage", "Paarfotografie", "Familienfotografie", "Babybauchfotografie", "Newbornfotografie"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Fotografie-Leistungen",
          itemListElement: SERVICES.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.name, description: s.description, url: absoluteUrl(s.path) },
            ...(s.name === "Hochzeitsreportage" && {
              priceSpecification: { "@type": "PriceSpecification", minPrice: 2200, priceCurrency: "EUR" },
            }),
          })),
        },
      },
      {
        "@type": "Person",
        ...ref("jana"),
        name: BUSINESS.owner,
        jobTitle: BUSINESS.jobTitle,
        worksFor: ref("business"),
        url: absoluteUrl("/ueber-mich/"),
        image: imageUrl(ueberMich.bild01.bild),
        knowsAbout: ["Hochzeitsfotografie", "Familienfotografie", "Paarfotografie"],
        sameAs: BUSINESS.sameAs,
      },
    ],
  };
}

const BREADCRUMB_PARENT: Partial<Record<PageKey, PageKey>> = {
  hochzeiten: "portfolio",
  paare: "portfolio",
  familien: "portfolio",
};

/** Service shown on a category page. */
const PAGE_SERVICE: Partial<Record<PageKey, string>> = {
  hochzeiten: "Hochzeitsreportage",
  paare: "Paarshooting",
  familien: "Familienshooting",
  "infos-hochzeitsreportage": "Hochzeitsreportage",
};

/** Per-page entities: the page itself, its breadcrumb, the service it presents and (Info) the FAQ. */
export function pageGraph(key: PageKey) {
  const page = PAGE_SEO[key];
  const url = absoluteUrl(page.path);
  const image = "image" in page && page.image ? imageUrl(typeof page.image === "string" ? page.image : page.image.bild) : undefined;

  const crumbs: { name: string; path: string }[] = [{ name: PAGE_SEO.home.name, path: "/" }];
  const parent = BREADCRUMB_PARENT[key];
  if (parent) crumbs.push({ name: PAGE_SEO[parent].name, path: PAGE_SEO[parent].path });
  if (key !== "home") crumbs.push({ name: page.name, path: page.path });

  const graph: Record<string, unknown>[] = [
    {
      "@type": page.type,
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      inLanguage: "de-DE",
      isPartOf: ref("website"),
      about: ref("business"),
      ...(image && { primaryImageOfPage: { "@type": "ImageObject", url: image } }),
      breadcrumb: { "@id": `${url}#breadcrumb` },
      ...(key === "ueber-mich" && { mainEntity: ref("jana") }),
      ...(key === "infos-hochzeitsreportage" && {
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.frage,
          acceptedAnswer: { "@type": "Answer", text: f.antwort },
        })),
      }),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absoluteUrl(c.path) })),
    },
  ];

  const serviceName = PAGE_SERVICE[key];
  const service = SERVICES.find((s) => s.name === serviceName);
  if (service) {
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: `${service.name} in Hagen & NRW`,
      serviceType: service.name,
      description: service.description,
      url,
      ...(image && { image }),
      provider: ref("business"),
      areaServed: BUSINESS.areaServed.map((name) => ({ "@type": "Place", name })),
      ...(service.name === "Hochzeitsreportage" && {
        offers: { "@type": "Offer", priceSpecification: { "@type": "PriceSpecification", minPrice: 2200, priceCurrency: "EUR" } },
      }),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
