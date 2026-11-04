import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { pageGraph } from "@/lib/structured-data";
import "./page.css";

export const metadata = pageMetadata("impressum");

export default function Page() {
  return (
    <main className="flo_page_wrap">
      <div className="flo_page">
        <SiteHeader page="impressum" current="/impressum/" />
        <div className="flo-block flex-block-root flo-block--impressum-1">
          <div className="flo-block__container">
            <div className="alignfull flex-block flex-block--blockID--da380119f35f" data-block-id="blockID--da380119f35f">
              <div className="flex-block__main-container">
                <div className="flex-block__element flex-block__element--element_id_60ae78f12d5d flex-block__element--text flex-block__element--block-blockID--da380119f35f flex-block__element--editorTagsFix">
                  <div data-font="808232a3ffb2" className="flex-block__text-content height-auto">
                    <h1>
                      <span style={{ color: "var(--scheme_1--button--background--default)" }}>
                        <strong>
                          <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                            IMPRESSUM
                          </span>
                        </strong>
                      </span>
                    </h1>
                  </div>
                </div>
                <div className="flex-block__element flex-block__element--element_id_48063 flex-block__element--text flex-block__element--block-blockID--da380119f35f flex-block__element--editorTagsFix">
                  <div data-font="c9edf0695ef8" className="flex-block__text-content height-auto">
                    <p>
                      <span style={{ color: "var(--scheme_1--button--background--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          Pflichtangaben gemäß § 5 TMG
                        </span>
                      </span>
                    </p>
                    <p>
                      <span style={{ color: "var(--scheme_1--button--background--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          Jana Vogel
                        </span>
                      </span>
                    </p>
                    <p>
                      <span style={{ color: "var(--scheme_1--button--background--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          Holthauser Straße 31
                        </span>
                      </span>
                    </p>
                    <p>
                      <span style={{ color: "var(--scheme_1--button--background--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          58093 Hagen
                        </span>
                      </span>
                    </p>
                    <p>
                      <span style={{ color: "var(--scheme_1--button--background--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          0157 / 51127909
                        </span>
                      </span>
                    </p>
                    <p>
                      <span style={{ color: "var(--scheme_1--button--background--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          info@janavogelfotografie.de
                        </span>
                      </span>
                    </p>
                    <p>
                      <span style={{ color: "var(--scheme_1--button--background--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          www.janavogelfotografie.de
                        </span>
                      </span>
                    </p>
                    <div className="spacer"></div>
                    <p>
                      <span style={{ color: "var(--scheme_1--button--background--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          Verantwortlich für den Inhalt nach § 55 ABS. 2 RSTV:
                        </span>
                      </span>
                    </p>
                    <p>
                      <span style={{ color: "var(--scheme_1--button--background--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          Jana Vogel  (Adresse wie oben)
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex-block__element flex-block__element--element_id_d5679085515e flex-block__element--text flex-block__element--block-blockID--da380119f35f flex-block__element--editorTagsFix">
                  <div data-font="7172010c80d0" className="flex-block__text-content height-auto">
                    <h2>
                      <strong>
                        <span style={{ color: "var(--scheme_1--button--background--default)" }}>
                          <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                            HAFTUNG FÜR INHALTE
                          </span>
                        </span>
                      </strong>
                    </h2>
                  </div>
                </div>
                <div className="flex-block__element flex-block__element--element_id_e2cd709d0ec4 flex-block__element--text flex-block__element--block-blockID--da380119f35f flex-block__element--editorTagsFix">
                  <div data-font="c9edf0695ef8" className="flex-block__text-content height-auto">
                    <p>
                      <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                        <span style={{ color: "var(--scheme_1--button--background--default)" }}>
                          Die Inhalte meiner Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und
                          Aktualität der Inhalte kann ich jedoch keine Gewähr übernehmen. Als Diensteanbieter bin ich gemäß § 7 Abs.1 TMG
                          für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich
                          als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
                          oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung
                          oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine
                          diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
                          Bekanntwerden von entsprechenden Rechtsverletzungen werde ich diese Inhalte umgehend entfernen.
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex-block__element flex-block__element--element_id_53d6cec847d0 flex-block__element--text flex-block__element--block-blockID--da380119f35f flex-block__element--editorTagsFix">
                  <div data-font="7172010c80d0" className="flex-block__text-content height-auto">
                    <h2>
                      <strong>
                        <span style={{ color: "var(--scheme_1--button--background--default)" }}>
                          <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                            URHEBERRECHT
                          </span>
                        </span>
                      </strong>
                    </h2>
                  </div>
                </div>
                <div className="flex-block__element flex-block__element--element_id_4da8a5ce91be flex-block__element--text flex-block__element--block-blockID--da380119f35f flex-block__element--editorTagsFix">
                  <div data-font="c9edf0695ef8" className="flex-block__text-content height-auto">
                    <p>
                      <span style={{ color: "var(--scheme_1--button--background--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                          Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
                          Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien
                          dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser
                          Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte
                          Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten
                          wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte
                          umgehend entfernen.
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SiteFooter />
      </div>
      <JsonLd data={pageGraph("impressum")} />
    </main>
  );
}
