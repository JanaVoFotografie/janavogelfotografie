import { SiteHeader } from "@/components/SiteHeader";
import { Gallery } from "@/components/Gallery";
import { SiteFooter } from "@/components/SiteFooter";
import { FlexImg } from "@/components/FlexImg";
import bilder from "@content/seiten/paare.json";
import galerie from "@content/galerien/paare.json";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { pageGraph } from "@/lib/structured-data";
import "./page.css";

export const metadata = pageMetadata("paare");

export default function Page() {
  return (
    <main className="flo_page_wrap">
      <div className="flo_page">
        <SiteHeader page="paare" current="/paare/" />
        <div className="flo-block flex-block-root flo-block--paare-1">
          <div className="flo-block__container">
            <div className="alignfull flex-block flex-block--blockID--1bce0bce0b53" data-block-id="blockID--1bce0bce0b53">
              <div className="flex-block__main-container">
                <div className="flex-block__element flex-block__element--element_id_88893 flex-block__element--image flex-block__element--block-blockID--1bce0bce0b53">
                  <FlexImg className="flex-img-tag" image={bilder.bild01} priority box={{ d: [100, 38.3], m: [100, 65.3] }} />
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_52020 flex-block__element--text flex-block__element--block-blockID--1bce0bce0b53 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "3.75rem", "--line-height": "1.5em", "--letter-spacing": "0em" }}
                  data-only-device="desktop"
                  lang="en"
                >
                  <div className="flex-block__text-content height-auto">
                    <h1>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>Always better together</span>
                    </h1>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_52020 flex-block__element--text flex-block__element--block-blockID--1bce0bce0b53 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "3.125rem", "--line-height": "1em", "--letter-spacing": "0em" }}
                  data-only-device="mobile"
                  lang="en"
                >
                  <div className="flex-block__text-content height-auto">
                    <h1>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>Always better together</span>
                    </h1>
                  </div>
                </div>
                <div className="flex-block__element flex-block__element--element_id_54752 flex-block__element--shape flex-block__element--block-blockID--1bce0bce0b53"></div>
                <div className="flex-block__element flex-block__element--element_id_3d49d5c977cf flex-block__element--text flex-block__element--block-blockID--1bce0bce0b53 flex-block__element--editorTagsFix">
                  <div data-font="3114d2aa8c46" className="flex-block__text-content height-auto">
                    <p>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          Jede Liebe ist einzigartig – und so ist auch euer Paar-Shooting. Ob wild-romantisch, klassisch, verspielt oder ein
                          bisschen verrückt, ich fange eure ganz persönliche Geschichte bei einem lockeren, entspannten Shooting ein. Nur
                          ihr zwei und eure Liebe stehen im Mittelpunkt. Lasst uns zusammen eure Geschichte schreiben. Ich freue mich auf
                          euch!
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Gallery images={galerie.bilder} alt={galerie.alt} columns={2} mobileColumns={1} />
        <SiteFooter />
      </div>
      <JsonLd data={pageGraph("paare")} />
    </main>
  );
}
