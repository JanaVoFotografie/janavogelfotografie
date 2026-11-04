// Field definitions of the contact form, taken 1:1 from the old flo-forms configuration.
// Shared by the form component (rendering + client validation) and the API route (validation + email).

export type Field =
  | { id: string; name: string; label: string; type: "text"; required?: boolean; defaultValue?: string; hint?: string; email?: boolean }
  | { id: string; name: string; label: string; type: "textarea"; required?: boolean; rows: number }
  | { id: string; name: string; label: string; type: "select"; required?: boolean; options: string[]; defaultValue: string }
  | { id: string; name: string; label: string; type: "checklist"; required?: boolean; options: string[] };

export const FIELDS: Field[] = [
  { id: "9019296", name: "name", label: "NAME:", type: "text", required: true },
  { id: "6507926", name: "e-mail", label: "E-MAIL:", type: "text", required: true, email: true },
  {
    id: "6349579",
    name: "fr-was-interessiert-ihr-euch",
    label: "FÜR WAS INTERESSIERT IHR EUCH?",
    type: "select",
    required: true,
    defaultValue: "Hochzeitsreportage",
    options: [
      "Hochzeitsreportage",
      "Paarshooting",
      "Neugeborenenshooting",
      "Schwangerschaftsshooting",
      "After-Wedding-Shooting",
      "Verlobungsshooting",
      "Familienshooting",
      "Sonstiges",
    ],
  },
  {
    id: "1733042",
    name: "wie-seid-ihr-auf-mich-aufmerksam-geworden",
    label: "WIE SEID IHR AUF MICH AUFMERKSAM GEWORDEN?",
    type: "checklist",
    required: true,
    options: ["INSTAGRAM", "GOOGLE", "PINTEREST", "EMPFEHLUNG"],
  },
  { id: "6063843", name: "empfehlung-von", label: "EMPFEHLUNG VON:", type: "text" },
  { id: "7328251", name: "euer-instagram-account", label: "EUER INSTAGRAM ACCOUNT: ", type: "text", defaultValue: "@" },
  { id: "4385488", name: "euer-hochzeitsdatum", label: "EUER HOCHZEITSDATUM:", type: "text" },
  { id: "2633274", name: "stil-eurer-hochzeit", label: "STIL EURER HOCHZEIT", type: "text", hint: "z.B. Boho/Hippie/Vintage/Klassisch/Familiär" },
  {
    id: "3261261",
    name: "art-der-trauung",
    label: "ART DER TRAUUNG:",
    type: "checklist",
    options: ["FREIE TRAUUNG", "KIRCHLICHE TRAUUNG", "STANDESAMT", "SONSTIGES"],
  },
  { id: "4851700", name: "ort-und-location-eurer-hochzeit", label: "ORT UND LOCATION EURER HOCHZEIT:", type: "text" },
  { id: "4824902", name: "ungefhre-anzahl-der-hochzeitsgste", label: "UNGEFÄHRE ANZAHL DER HOCHZEITSGÄSTE:", type: "text" },
  {
    id: "5439804",
    name: "nachricht",
    label: "EURE NACHRICHT – ERZÄHLT MIR VON EUCH UND EUREN PLÄNEN:",
    type: "textarea",
    required: true,
    rows: 6,
  },
];

/** The old form only enforced these fields (the checklist was marked required but never validated). */
export const ENFORCED = new Set(["name", "e-mail", "nachricht"]);

/** Hidden field that only bots fill in. */
export const HONEYPOT = "flo-contact-phone";

export const MESSAGES = {
  required: "Dieses Feld ist ein Pflichtfeld!",
  email: "Bitte gebt eine gültige E-Mail-Adresse ein!",
  success: "Vielen Dank für eure Nachricht! Ich melde mich innerhalb der nächsten 48 Stunden bei euch.",
  error: "Leider ist beim Senden etwas schiefgelaufen. Bitte versucht es später noch einmal oder schreibt mir direkt an info@janavogelfotografie.de.",
};

export type Values = Record<string, string | string[]>;

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export function validate(values: Values) {
  const errors: Record<string, string> = {};
  for (const f of FIELDS) {
    const v = values[f.name];
    const str = Array.isArray(v) ? v.join("") : (v ?? "").toString();
    if (ENFORCED.has(f.name) && !str.trim()) errors[f.name] = MESSAGES.required;
    else if (f.type === "text" && f.email && str.trim() && !isEmail(str)) errors[f.name] = MESSAGES.email;
  }
  return errors;
}
