// Facts about the business – single source for structured data, llms.txt and metadata.
// Keep in sync with the Impressum (src/app/impressum/page.tsx).

import { INSTAGRAM_PROFILE_URL } from "./instagram/model";

export const SITE_URL = "https://janavogelfotografie.de";

export const BUSINESS = {
  name: "Jana Vogel Fotografie",
  owner: "Jana Vogel",
  jobTitle: "Hochzeits- und Familienfotografin",
  slogan: "Hochzeitsfotografin aus Hagen – für euch in ganz NRW unterwegs",
  description:
    "Jana Vogel ist Hochzeits-, Paar- und Familienfotografin aus Hagen. Sie begleitet Hochzeiten mit natürlichen, emotionalen Reportagen und fotografiert Paar-, Verlobungs-, Babybauch-, Newborn- und Familienshootings in Hagen und ganz NRW.",
  email: "info@janavogelfotografie.de",
  telephone: "+49 157 51127909",
  address: {
    streetAddress: "Holthauser Straße 31",
    postalCode: "58093",
    addressLocality: "Hagen",
    addressRegion: "Nordrhein-Westfalen",
    addressCountry: "DE",
  },
  // Hagen and the surrounding cities/regions (all in NRW, where Jana works)
  areaServed: [
    "Hagen",
    "Dortmund",
    "Bochum",
    "Wuppertal",
    "Witten",
    "Herdecke",
    "Wetter (Ruhr)",
    "Schwerte",
    "Iserlohn",
    "Gevelsberg",
    "Ennepetal",
    "Schwelm",
    "Ruhrgebiet",
    "Sauerland",
    "Nordrhein-Westfalen",
  ],
  sameAs: [INSTAGRAM_PROFILE_URL, "https://www.pinterest.de/janazuenkeler/"],
  languages: ["de"],
};

/** What Jana offers (used for the service catalogue in the structured data). */
export const SERVICES = [
  {
    name: "Hochzeitsreportage",
    path: "/hochzeiten/",
    description:
      "Ungestellte Hochzeitsreportagen vom Getting-Ready über die Trauung bis zur Feier – standesamtlich, kirchlich oder als freie Trauung.",
  },
  {
    name: "After-Wedding-Shooting",
    path: "/infos-hochzeitsreportage/",
    description: "Brautpaarshooting an einem besonderen Ort in euren Hochzeitsoutfits – entspannt und ohne den Zeitdruck des Hochzeitstags.",
  },
  {
    name: "Paarshooting",
    path: "/paare/",
    description: "Natürliche Paarfotos – ob wild-romantisch, klassisch, verspielt oder ein bisschen verrückt.",
  },
  {
    name: "Verlobungsshooting",
    path: "/paare/",
    description: "Ein Shooting zur Verlobung oder als Einstimmung auf eure Hochzeit.",
  },
  {
    name: "Familienshooting",
    path: "/familien/",
    description: "Ungestellte Familienfotos in der Natur oder bei euch zuhause (Homestory).",
  },
  {
    name: "Babybauchshooting",
    path: "/familien/",
    description: "Schwangerschafts- und Babybauchfotos voller Vorfreude.",
  },
  {
    name: "Newbornshooting",
    path: "/familien/",
    description: "Liebevolle Neugeborenenfotos aus den ersten Lebenswochen.",
  },
];
