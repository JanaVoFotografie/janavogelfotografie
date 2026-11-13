import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FlexImg } from "@/components/FlexImg";
import bilder from "@content/seiten/ueber-mich.json";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { pageGraph } from "@/lib/structured-data";
import "./page.css";

export const metadata = pageMetadata("ueber-mich");

const FACTS = [
  ["Die erste Regel, wenn ich nach Hause komme, lautet: Klamotten aus und Jogginghose an."],
  ["Einfach mal abhängen und entspannen? Das ist leider nichts für mich. Ich muss immer etwas unternehmen."],
  ["Nah am Wasser gebaut? Oh ja, das bin ich. Traurige Tränen, Freudentränen – ich bin sofort mit dabei."],
  ["Holland ist mein absolutes Lieblingsland. Von den Menschen über die tollen Cafés bis hin zum Interiordesign – ich liebe alles hier."],
  ["Mein größter Traum dreht sich trotzdem um ein anderes Land: Norwegen. Eine Rundreise mit dem Camper... das wär's."],
  ["Ich mag keine Schokolade. Nie. Ohne Ausnahmen.", "Dafür liebe ich meine Familie. Immer. Ohne Ausnahmen."],
  ["Ich bin ein kleines Murmeltier – um spätestens 22 Uhr ist bei mir deswegen Nachtruhe angesagt. Auch am Wochenende."],
  ["Ich bin überhaupt keine Shopping Queen. Wieso auch? Alles, was ich brauche, gibt es schließlich auch im Internet."],
  ["Und last but not least: Ich bin ein Freak. Genau gesagt, ein Ordnungs-Freak. Aber lieber das, als das totale Chaos, oder?"],
];

function Facts({ start, items }: { start: number; items: string[][] }) {
  return (
    <ol className={`jv-facts jv-facts--${start === 1 ? "first" : "second"}`} start={start} role="list">
      {items.map((paragraphs, index) => (
        <li className="jv-fact" key={start + index}>
          <span className="jv-fact__number" aria-hidden="true">
            {start + index}.
          </span>
          <div className="jv-fact__text" data-font="3114d2aa8c46">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function Page() {
  return (
    <main className="flo_page_wrap">
      <div className="flo_page">
        <SiteHeader page="ueber-mich" current="/ueber-mich/" />
        <div className="flo-block flex-block-root flo-block--ueber-mich-1">
          <div className="flo-block__container">
            <div className="alignfull flex-block flex-block--blockID--dcd9ad5bbdc6" data-block-id="blockID--dcd9ad5bbdc6">
              <div className="flex-block__main-container">
                <div className="flex-block__element flex-block__element--element_id_80765 flex-block__element--shape flex-block__element--block-blockID--dcd9ad5bbdc6"></div>
                <div className="flex-block__element flex-block__element--element_id_97284 flex-block__element--image flex-block__element--block-blockID--dcd9ad5bbdc6">
                  <img
                    className="flex-img-tag"
                    src="/brand/tape_1.webp"
                    width={360}
                    height={148}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    suppressHydrationWarning
                  />
                </div>
                <div className="flex-block__element flex-block__element--element_id_50704 flex-block__element--image flex-block__element--block-blockID--dcd9ad5bbdc6">
                  <FlexImg className="flex-img-tag" image={bilder.bild01} priority box={{ d: [31.2, 45.8], m: [66.9, 93.3] }} />
                </div>
                <div className="flex-block__element flex-block__element--element_id_c7ffbfd98dfd flex-block__element--text flex-block__element--block-blockID--dcd9ad5bbdc6 flex-block__element--editorTagsFix">
                  <div data-font="3114d2aa8c46" className="flex-block__text-content height-auto">
                    <p>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          Hallo ihr Lieben,
                        </span>
                      </span>
                    </p>
                    <div className="spacer"></div>
                    <p>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          ich bin Jana, Naturliebhaberin und Fotografin mit Leidenschaft. Auf dieser Seite erzähle ich euch ein bisschen
                          mehr über mich. Denn schließlich geht es bei Hochzeits-, Paar- oder Familienshootings nicht nur um große Gefühle,
                          sondern auch um großes Vertrauen. Und dafür ist es wichtig, dass ich euch ein bisschen besser kenne, aber ihr auch
                          mich.
                        </span>
                      </span>
                    </p>
                    <div className="spacer"></div>
                    <p>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          Besonders am Herzen liegt mir, dass ihr euch vor der Kamera richtig wohl fühlt. Und das geht natürlich um einiges
                          einfacher, wenn man sich ein bisschen besser kennt. Damit ihr also wisst, wer hinter dieser Linse steckt, die euch
                          das ganze Shooting über begleitet, verrate ich euch hier neun lustige, ehrliche und vielleicht auch ein bisschen
                          verrückte Fakten über mich.
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_308b7fd5dfff flex-block__element--text flex-block__element--block-blockID--dcd9ad5bbdc6 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "2.1875rem", "--line-height": "1.65em", "--letter-spacing": "0em" }}
                  data-only-device="desktop"
                >
                  <div className="flex-block__text-content height-auto">
                    <p>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>Eure Jana</span>
                    </p>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_308b7fd5dfff flex-block__element--text flex-block__element--block-blockID--dcd9ad5bbdc6 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "1.875rem", "--line-height": "1.65em", "--letter-spacing": "0em" }}
                  data-only-device="mobile"
                >
                  <div className="flex-block__text-content height-auto">
                    <p>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>Eure Jana</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flo-block flex-block-root flo-block--ueber-mich-2">
          <div className="flo-block__container">
            <div className="alignfull flex-block flex-block--blockID--add29d5ea2d4" data-block-id="blockID--add29d5ea2d4">
              <div className="flex-block__main-container">
                <div className="flex-block__element flex-block__element--element_id_10152 flex-block__element--image flex-block__element--block-blockID--add29d5ea2d4">
                  <FlexImg className="flex-img-tag" image={bilder.bild02} box={{ d: [23, 33.1], m: [60.4, 85.3] }} />
                </div>
                <div className="flex-block__element flex-block__element--element_id_d22c0b221d16 flex-block__element--shape flex-block__element--block-blockID--add29d5ea2d4"></div>
                <Facts start={1} items={FACTS.slice(0, 5)} />
                <Facts start={6} items={FACTS.slice(5)} />
                <div className="flex-block__element flex-block__element--element_id_188172d7e469 flex-block__element--text flex-block__element--block-blockID--add29d5ea2d4 flex-block__element--editorTagsFix">
                  <div data-font="3114d2aa8c46" className="flex-block__text-content height-auto">
                    <p>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          <strong>Das war&apos;s in aller Kürze – aber länger geht es auch.</strong>
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_19306 flex-block__element--text flex-block__element--block-blockID--add29d5ea2d4 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "2.1875rem", "--line-height": "1.2em", "--letter-spacing": "0em" }}
                  data-only-device="desktop"
                  lang="en"
                >
                  <div className="flex-block__text-content height-auto">
                    <h1>
                      <span style={{ color: "rgb(171, 127, 86)" }}>Some stuff you need to know about me!</span>
                    </h1>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_19306 flex-block__element--text flex-block__element--block-blockID--add29d5ea2d4 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "1.875rem", "--line-height": "1.2em", "--letter-spacing": "0em" }}
                  data-only-device="mobile"
                  lang="en"
                >
                  <div className="flex-block__text-content height-auto">
                    <h1>
                      <span style={{ color: "rgb(171, 127, 86)" }}>Some stuff you need to know about me!</span>
                    </h1>
                  </div>
                </div>
                <div className="flex-block__element flex-block__element--element_id_64157 flex-block__element--image flex-block__element--block-blockID--add29d5ea2d4">
                  <FlexImg className="flex-img-tag" image={bilder.bild03} box={{ d: [24.6, 17.9], m: [60.4, 40.7] }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flo-block flex-block-root flo-block--ueber-mich-3">
          <div className="flo-block__container">
            <div className="alignfull flex-block flex-block--blockID--07563b82d170" data-block-id="blockID--07563b82d170">
              <div className="flex-block__main-container">
                <div
                  className="flex-block__element flex-block__element--element_id_43727 flex-block__element--text flex-block__element--block-blockID--07563b82d170 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "2.1875rem", "--line-height": "1.3em", "--letter-spacing": "0.01em" }}
                  data-only-device="desktop"
                >
                  <div className="flex-block__text-content height-auto">
                    <h2>
                      <span style={{ color: "var(--scheme_1--text--default)" }}>
                        Darum verrate ich euch jetzt noch ein bisschen mehr aus meinem Leben.
                      </span>
                    </h2>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_43727 flex-block__element--text flex-block__element--block-blockID--07563b82d170 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "1.875rem", "--line-height": "1.3em", "--letter-spacing": "0.01em" }}
                  data-only-device="mobile"
                >
                  <div className="flex-block__text-content height-auto">
                    <h2>
                      <span style={{ color: "var(--scheme_1--text--default)" }}>
                        Darum verrate ich euch jetzt noch ein bisschen mehr aus meinem Leben.
                      </span>
                    </h2>
                  </div>
                </div>
                <div className="flex-block__element flex-block__element--element_id_95386 flex-block__element--text flex-block__element--block-blockID--07563b82d170 flex-block__element--editorTagsFix">
                  <div data-font="3114d2aa8c46" className="flex-block__text-content height-auto">
                    <p>
                      <span style={{ color: "var(--scheme_1--text--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          Dabei liebe ich es, verschiedene Lichtverhältnisse, das Umfeld, die Natur und vor allem aber die unterschiedlichen
                          Emotionen einzufangen und für immer auf Bildern zu verewigen. Wichtig ist mir, dass diese Emotionen echt und
                          authentisch sind und während des ganzen Shootings eine entspannte und harmonische Atmosphäre herrscht, in der
                          diese echten Emotionen Platz haben und zum Ausdruck kommen können.
                        </span>
                      </span>
                    </p>
                    <div className="spacer"></div>
                    <p>
                      <span style={{ color: "var(--scheme_1--text--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          Wenn ich nicht gerade fotografiere oder eure Bilder nach einem Shooting bearbeite, verbringe ich viel Zeit mit
                          meiner Familie und Freunden und versuche jeden Moment davon zu genießen. Aufgewachsen in einem kleinen Dörfchen im
                          Weserbergland bin ich eine absolute Naturliebhaberin. Ob es nun ein Tag an der holländischen Nordsee ist oder
                          einfach ein langer Spaziergang in der Natur, um neue und schöne Orte zu erkunden. Mein Traum ist es, irgendwann
                          mit meinem Mann und unseren Kindern auf dem Land zu leben und das Leben dort zu genießen.
                        </span>
                      </span>
                    </p>
                    <div className="spacer"></div>
                    <p>
                      <span style={{ color: "var(--scheme_1--text--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          Wenn ihr also eine Fotografin mit Herz sucht, die sich euch, euren Wünschen und Emotionen widmet, dann bin ich
                          gerne für euch da!
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex-block__element flex-block__element--element_id_63137 flex-block__element--text flex-block__element--block-blockID--07563b82d170 flex-block__element--editorTagsFix">
                  <div data-font="3114d2aa8c46" className="flex-block__text-content height-auto">
                    <p>
                      <span style={{ color: "var(--scheme_1--text--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          Vor einigen Jahren bin ich nach Hagen gezogen, wo ich mich zusammen mit meinem Mann in einer kleinen gemütlichen
                          Wohnung eingerichtet habe. Zuvor habe ich für mein Studium vier Jahre in Dortmund gelebt. Dort ging ich meiner
                          Leidenschaft – der Fotografie – nach und machte sie durch mein Studium auch beruflich zu einem großen und
                          wichtigen Teil meines Lebens.
                        </span>
                      </span>
                    </p>
                    <div className="spacer"></div>
                    <p>
                      <span style={{ color: "var(--scheme_1--text--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          Während meines Studiums beschäftigte ich mich eher mit der künstlerischen Dokumentarfotografie, ging aber schnell
                          in eine andere, persönlichere Richtung über. Und somit durfte ich bisher schon Familien, Babybäuche, Neugeborene,
                          Paare, Junggesellenabschiede, Hochzeiten und vieles mehr fotografieren.
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex-block__element flex-block__element--element_id_a8787a14c334 flex-block__element--text flex-block__element--block-blockID--07563b82d170 flex-block__element--editorTagsFix">
                  <div data-font="second_level/subtitle_2" className="flex-block__text-content height-auto">
                    <p>
                      <span style={{ color: "var(--scheme_1--text--default)" }}>Eben das, was ihr euch wünscht.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SiteFooter />
      </div>
      <JsonLd data={pageGraph("ueber-mich")} />
    </main>
  );
}
