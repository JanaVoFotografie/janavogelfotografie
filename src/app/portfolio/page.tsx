import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FlexImg } from "@/components/FlexImg";
import bilder from "@content/seiten/portfolio.json";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { pageGraph } from "@/lib/structured-data";
import "./page.css";

export const metadata = pageMetadata("portfolio");

export default function Page() {
  return (
    <main className="flo_page_wrap">
      <div className="flo_page">
        <SiteHeader page="portfolio" current="/portfolio/" />
        <div className="flo-block flex-block-root flo-block--portfolio-1">
          <div className="flo-block__container">
            <div className="alignfull flex-block flex-block--blockID--cee139319c85" data-block-id="blockID--cee139319c85">
              <div className="flex-block__main-container">
                <div
                  className="flex-block__element flex-block__element--element_id_54503 flex-block__element--text flex-block__element--block-blockID--cee139319c85 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "2.1875rem", "--line-height": "1.28em", "--letter-spacing": "0.01em" }}
                  data-only-device="desktop"
                >
                  <div className="flex-block__text-content height-auto">
                    <h1>
                      <span style={{ color: "var(--scheme_1--text--default)" }}>Meine Leistungen</span>
                    </h1>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_54503 flex-block__element--text flex-block__element--block-blockID--cee139319c85 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "1.875rem", "--line-height": "1.28em", "--letter-spacing": "0.01em" }}
                  data-only-device="mobile"
                >
                  <div className="flex-block__text-content height-auto">
                    <h1>
                      <span style={{ color: "var(--scheme_1--text--default)" }}>Meine Leistungen</span>
                    </h1>
                  </div>
                </div>
                <div className="flex-block__element flex-block__element--element_id_79496 flex-block__element--image flex-block__element--block-blockID--cee139319c85">
                  <FlexImg className="flex-img-tag" image={bilder.bild01} priority box={{ d: [33.4, 22.7], m: [84, 56.3] }} />
                </div>
                <div className="flex-block__element flex-block__element--element_id_15020 flex-block__element--shape flex-block__element--block-blockID--cee139319c85">
                  <Link
                    className="flex-block__element--image-link"
                    href="/hochzeiten/"
                    target="_blank"
                    aria-label="Hochzeiten"
                    prefetch={false}
                  ></Link>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_20552 flex-block__element--text flex-block__element--block-blockID--cee139319c85 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "2.1875rem", "--line-height": "1.65em", "--letter-spacing": "0em" }}
                  data-only-device="desktop"
                >
                  <div className="flex-block__text-content height-auto">
                    <h2>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>Hochzeiten</span>
                    </h2>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_20552 flex-block__element--text flex-block__element--block-blockID--cee139319c85 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "1.875rem", "--line-height": "1.65em", "--letter-spacing": "0em" }}
                  data-only-device="mobile"
                >
                  <div className="flex-block__text-content height-auto">
                    <h2>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>Hochzeiten</span>
                    </h2>
                  </div>
                </div>
                <Link
                  href="/hochzeiten/"
                  className="flex-block__element flex-block__element--element_id_a2b2aa00c3a8 flex-block__element--button flex-block__element--block-blockID--cee139319c85 flex-block__element--editorTagsFix"
                  prefetch={false}
                >
                  <span className="flex-block__element--button__content flex-block__element--button__content--hoverEffect-default">
                    <span data-font="third_level/primary_cta" className="flex-block__text-content">
                      <p>ZUR GALERIE</p>
                    </span>
                  </span>
                </Link>
                <div className="flex-block__element flex-block__element--element_id_12482 flex-block__element--image flex-block__element--block-blockID--cee139319c85">
                  <FlexImg className="flex-img-tag" image={bilder.bild02} priority box={{ d: [33.4, 22.7], m: [84.3, 56.3] }} />
                </div>
                <div className="flex-block__element flex-block__element--element_id_16917 flex-block__element--shape flex-block__element--block-blockID--cee139319c85"></div>
                <div
                  className="flex-block__element flex-block__element--element_id_15619 flex-block__element--text flex-block__element--block-blockID--cee139319c85 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "2.1875rem", "--line-height": "1.65em", "--letter-spacing": "0em" }}
                  data-only-device="desktop"
                >
                  <div className="flex-block__text-content height-auto">
                    <h2>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>Familien</span>
                    </h2>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_15619 flex-block__element--text flex-block__element--block-blockID--cee139319c85 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "1.875rem", "--line-height": "1.65em", "--letter-spacing": "0em" }}
                  data-only-device="mobile"
                >
                  <div className="flex-block__text-content height-auto">
                    <h2>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>Familien</span>
                    </h2>
                  </div>
                </div>
                <Link
                  href="/familien/"
                  className="flex-block__element flex-block__element--element_id_dce61eea0cfd flex-block__element--button flex-block__element--block-blockID--cee139319c85 flex-block__element--editorTagsFix"
                  prefetch={false}
                >
                  <span className="flex-block__element--button__content flex-block__element--button__content--hoverEffect-default">
                    <span data-font="third_level/primary_cta" className="flex-block__text-content">
                      <p>ZUR GALERIE</p>
                    </span>
                  </span>
                </Link>
                <div className="flex-block__element flex-block__element--element_id_cdbfbfeb3cd4 flex-block__element--image flex-block__element--block-blockID--cee139319c85">
                  <FlexImg className="flex-img-tag" image={bilder.bild03} priority box={{ d: [33.4, 22.7], m: [84.1, 56.3] }} />
                </div>
                <div className="flex-block__element flex-block__element--element_id_b17edd45f37d flex-block__element--shape flex-block__element--block-blockID--cee139319c85"></div>
                <div
                  className="flex-block__element flex-block__element--element_id_c51cd3a9c795 flex-block__element--text flex-block__element--block-blockID--cee139319c85 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "2.1875rem", "--line-height": "1.65em", "--letter-spacing": "0em" }}
                  data-only-device="desktop"
                >
                  <div className="flex-block__text-content height-auto">
                    <h2>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>Paare</span>
                    </h2>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_c51cd3a9c795 flex-block__element--text flex-block__element--block-blockID--cee139319c85 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "1.875rem", "--line-height": "1.65em", "--letter-spacing": "0em" }}
                  data-only-device="mobile"
                >
                  <div className="flex-block__text-content height-auto">
                    <h2>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>Paare</span>
                    </h2>
                  </div>
                </div>
                <Link
                  href="/paare/"
                  className="flex-block__element flex-block__element--element_id_c86de20e4c95 flex-block__element--button flex-block__element--block-blockID--cee139319c85 flex-block__element--editorTagsFix"
                  prefetch={false}
                >
                  <span className="flex-block__element--button__content flex-block__element--button__content--hoverEffect-default">
                    <span data-font="third_level/primary_cta" className="flex-block__text-content">
                      <p>ZUR GALERIE</p>
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <SiteFooter />
      </div>
      <JsonLd data={pageGraph("portfolio")} />
    </main>
  );
}
