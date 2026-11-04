// Alt texts for gallery photos, derived from the file name.
// Descriptive file names (e.g. "Hochzeit_Hagen_Getting-Ready_12.jpg") automatically become
// descriptive alt texts – good for Google Images and screen readers.

/** Keyword in the file name → description (first match wins). */
const TOPICS: [RegExp, string][] = [
  [/getting[-_ ]?ready/i, "Getting Ready am Hochzeitsmorgen"],
  [/first[-_ ]?look/i, "First Look des Brautpaars"],
  [/kirchlich/i, "Kirchliche Trauung"],
  [/freie[-_ ]?trauung/i, "Freie Trauung"],
  [/standesamt/i, "Standesamtliche Trauung"],
  [/hochzeitsdekoration|deko/i, "Boho-Hochzeitsdekoration"],
  [/hochzeitsrede|rede/i, "Hochzeitsrede auf der Hochzeitsfeier"],
  [/hochzeitsessen|barbecue/i, "Hochzeitsessen mit Barbecue"],
  [/hochzeitsfeier|party|feier/i, "Hochzeitsfeier"],
  [/gruppenfoto|familenfoto/i, "Gruppen- und Familienfotos auf der Hochzeit"],
  [/brautpaar|paarshooting|paarfoto/i, "Brautpaarshooting"],
  [/boho/i, "Boho-Hochzeit"],
  [/newborn|neugeboren/i, "Newbornshooting"],
  [/schwanger|babybauch/i, "Babybauch-Shooting"],
  [/verlobung|engagement/i, "Verlobungsshooting"],
  [/after[-_ ]?wedding/i, "After-Wedding-Shooting"],
  [/familienfoto|familienshooting/i, "Familienshooting"],
];

export function galleryAlt(src: string, galleryAlt: string, index: number) {
  const name = src.split("/").pop() ?? "";
  const topic = TOPICS.find(([re]) => re.test(name))?.[1];
  return topic ? `${topic} – ${galleryAlt}` : `${galleryAlt} – Foto ${index + 1}`;
}
