/** Embeds schema.org structured data (see src/lib/structured-data.ts). */
export function JsonLd({ data }: { data: object }) {
  // "<" is escaped so that text in the data can never close the script tag
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
