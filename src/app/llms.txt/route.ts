import { BUSINESS, SERVICES, SITE_URL } from "@/lib/business";
import { PAGE_SEO } from "@/lib/seo";
import { FAQ } from "@/data/faq";

/** Short, plain-text summary of the business for AI search assistants (https://llmstxt.org). */
export function GET() {
  const pages = Object.values(PAGE_SEO)
    .filter((p) => p.priority >= 0.5)
    .map((p) => `- [${p.name}](${SITE_URL}${p.path}): ${p.description}`)
    .join("\n");
  const text = `# ${BUSINESS.name}

> ${BUSINESS.description}

- Fotografin: ${BUSINESS.owner} (${BUSINESS.jobTitle})
- Standort: ${BUSINESS.address.addressLocality}, ${BUSINESS.address.addressRegion}
- Einsatzgebiet: ${BUSINESS.areaServed.join(", ")}
- Kontakt: ${BUSINESS.email} · ${SITE_URL}/kontakt/
- Instagram: ${BUSINESS.sameAs[0]}

## Leistungen

${SERVICES.map((s) => `- ${s.name}: ${s.description}`).join("\n")}

## Seiten

${pages}

## Häufige Fragen

${FAQ.map((f) => `### ${f.frage}\n${f.antwort}`).join("\n\n")}
`;
  return new Response(text, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
