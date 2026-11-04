import { SiteHeader } from "@/components/SiteHeader";
import { Gallery } from "@/components/Gallery";
import { SiteFooter } from "@/components/SiteFooter";
import { FlexImg } from "@/components/FlexImg";
import bilder from "@content/seiten/familien.json";
import galerie from "@content/galerien/familien.json";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { pageGraph } from "@/lib/structured-data";
import "./page.css";

export const metadata = pageMetadata("familien");

export default function Page() {
  return (
    <main className="flo_page_wrap">
      <div className="flo_page">
        <SiteHeader page="familien" current="/familien/" />
        <div className="flo-block flex-block-root flo-block--familien-1">
          <div className="flo-block__container">
            <div className="alignfull flex-block flex-block--blockID--71567" data-block-id="blockID--71567">
              <div className="flex-block__main-container">
                <div className="flex-block__element flex-block__element--element_id_88893 flex-block__element--image flex-block__element--block-blockID--71567">
                  <FlexImg className="flex-img-tag" image={bilder.bild01} priority box={{ d: [100, 38.3], m: [100, 65.3] }} />
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_52020 flex-block__element--text flex-block__element--block-blockID--71567 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "3.75rem", "--line-height": "1.5em", "--letter-spacing": "0em" }}
                  data-only-device="desktop"
                  lang="en"
                >
                  <div className="flex-block__text-content height-auto">
                    <h1>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>Where life begins and love grows</span>
                    </h1>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_52020 flex-block__element--text flex-block__element--block-blockID--71567 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "3.125rem", "--line-height": "1em", "--letter-spacing": "0em" }}
                  data-only-device="mobile"
                  lang="en"
                >
                  <div className="flex-block__text-content height-auto">
                    <h1>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>Where life begins and love grows</span>
                    </h1>
                  </div>
                </div>
                <div className="flex-block__element flex-block__element--element_id_54752 flex-block__element--shape flex-block__element--block-blockID--71567"></div>
                <div className="flex-block__element flex-block__element--element_id_3d49d5c977cf flex-block__element--text flex-block__element--block-blockID--71567 flex-block__element--editorTagsFix">
                  <div data-font="3114d2aa8c46" className="flex-block__text-content height-auto">
                    <p>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>
                        Wenn Liebe sich findet, kann daraus Großes wachsen – zum Beispiel eine Familie. Und mal ehrlich, gibt es ein
                        schöneres Abenteuer als die Familiengründung? So viele tolle Momente gestalten hier das Leben und jeder einzelne ist
                        es wert, für die Ewigkeit festgehalten zu werden.   Ob Babybauch- oder Newborn-Shooting, Homestory oder
                        Familien-Shooting – gemeinsam fangen wir eure Momente in ganz entspannter, ungezwungener Atmosphäre und ohne Druck
                        fotografisch ein und machen sie für immer haltbar. So bleiben eure Glücksmomente nicht nur in euren Herzen, sondern
                        ihr könnt sie immer wieder erleben.
                      </span>
                    </p>
                    <div className="spacer"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Gallery images={galerie.bilder} alt={galerie.alt} columns={2} mobileColumns={1} />
        <SiteFooter />
      </div>
      <JsonLd data={pageGraph("familien")} />
    </main>
  );
}
