import Link from "next/link";
import { HomeSlideshow } from "@/components/HomeSlideshow";
import { SiteFooter } from "@/components/SiteFooter";
import { FlexImg } from "@/components/FlexImg";
import { TabsProvider, Tabs2, Tabs2Text, Tabs2Arrow } from "@/components/Tabs";
import { TabsImg } from "@/components/TabsImg";
import bilder from "@content/seiten/startseite.json";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { pageGraph } from "@/lib/structured-data";
import "./page.css";

export const metadata = pageMetadata("home");

export default function Page() {
  return (
    <main className="flo_page_wrap">
      <div className="flo_page">
        <HomeSlideshow images={bilder.slideshow} />
        <div className="flo-block flex-block-root flo-block--home-1">
          <div className="flo-block__container">
            <div className="alignfull flex-block flex-block--blockID--4b05ee17d1e8" data-block-id="blockID--4b05ee17d1e8">
              <div className="flex-block__main-container">
                <div className="flex-block__element flex-block__element--element_id_86111 flex-block__element--image flex-block__element--block-blockID--4b05ee17d1e8">
                  <FlexImg className="flex-img-tag" image={bilder.bild01} box={{ d: [20.8, 27.2], m: [70.9, 92.7] }} />
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_92087 flex-block__element--text flex-block__element--block-blockID--4b05ee17d1e8 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "2.1875rem", "--line-height": "1.3em", "--letter-spacing": "0.01em" }}
                  data-only-device="desktop"
                >
                  <div className="flex-block__text-content height-auto">
                    <h2>
                      <span style={{ color: "var(--scheme_1--text--default)" }}>
                        Du findest, Liebe ist das schönste aller Gefühle? Und du möchtest es für die Ewigkeit festhalten?
                      </span>
                    </h2>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_92087 flex-block__element--text flex-block__element--block-blockID--4b05ee17d1e8 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "1.875rem", "--line-height": "1.3em", "--letter-spacing": "0.01em" }}
                  data-only-device="mobile"
                >
                  <div className="flex-block__text-content height-auto">
                    <h2>
                      <span style={{ color: "var(--scheme_1--text--default)" }}>
                        Du findest, Liebe ist das schönste aller Gefühle? Und du möchtest es für die Ewigkeit festhalten?
                      </span>
                    </h2>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_85457 flex-block__element--text flex-block__element--block-blockID--4b05ee17d1e8 flex-block__element--editorTagsFix"
                  data-only-device="desktop"
                >
                  <div data-font="3114d2aa8c46" className="flex-block__text-content height-auto">
                    <p>
                      <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                        Dann geht es dir wie mir. Denn ich finde, dass Liebe in all ihren Formen einfach wunderschön ist. Ob auf Hochzeiten,
                        in Familien oder bei Paaren, Liebe ist einfach überall und beschert uns so viele tolle Momente. Und ich finde, genau
                        das sollte man für immer einfangen – mit gefühlvollen, ungestellten und einzigartigen Fotos.
                      </span>
                    </p>
                    <div className="spacer"></div>
                    <p>
                      <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                        Genau das, was du suchst? Dann schau dich gerne auf meiner Seite um!
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_85457 flex-block__element--text flex-block__element--block-blockID--4b05ee17d1e8 flex-block__element--editorTagsFix"
                  data-only-device="mobile"
                >
                  <div data-font="3114d2aa8c46" className="flex-block__text-content height-auto">
                    <p>
                      <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                        Dann geht es dir wie mir. Denn ich finde, dass Liebe in all ihren Formen einfach wunderschön ist. Ob auf Hochzeiten,
                        in Familien oder bei Paaren, Liebe ist einfach überall und beschert uns so viele tolle Momente. Und ich finde, genau
                        das sollte man für immer einfangen – mit gefühlvollen, ungestellten und einzigartigen Fotos.
                      </span>
                    </p>
                    <div className="spacer"></div>
                    <p>
                      <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                        Genau das, was du suchst? Dann schau dich gerne auf meiner Seite um!
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex-block__element flex-block__element--element_id_72895 flex-block__element--image flex-block__element--block-blockID--4b05ee17d1e8">
                  <FlexImg className="flex-img-tag" image={bilder.bild02} box={{ d: [23, 17], m: [78.5, 57.8] }} />
                </div>
                <Link
                  href="/kontakt/"
                  className="flex-block__element flex-block__element--element_id_11722 flex-block__element--button flex-block__element--block-blockID--4b05ee17d1e8 flex-block__element--editorTagsFix"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ "--font-size": "0.66666666666667em", "--line-height": "1.05em", "--letter-spacing": "0.15em" }}
                  data-only-device="desktop"
                  prefetch={false}
                >
                  <span className="flex-block__element--button__content flex-block__element--button__content--hoverEffect-default">
                    <span className="flex-block__text-content">
                      <p>ODER SCHREIB MIR DIREKT</p>
                    </span>
                  </span>
                </Link>
                <Link
                  href="/kontakt/"
                  className="flex-block__element flex-block__element--element_id_11722 flex-block__element--button flex-block__element--block-blockID--4b05ee17d1e8 flex-block__element--editorTagsFix"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ "--font-size": "0.66666666666667em", "--line-height": "1.05em", "--letter-spacing": "0.15em" }}
                  data-only-device="mobile"
                  prefetch={false}
                >
                  <span className="flex-block__element--button__content flex-block__element--button__content--hoverEffect-default">
                    <span className="flex-block__text-content">
                      <p>ODER SCHREIB MIR DIREKT</p>
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flo-block flex-block-root flo-block--home-2">
          <div className="flo-block__container">
            <div className="alignfull flex-block flex-block--blockID--9bf7589dd6b1" data-block-id="blockID--9bf7589dd6b1">
              <div className="flex-block__main-container">
                <div className="flex-block__element flex-block__element--element_id_88893 flex-block__element--image flex-block__element--block-blockID--9bf7589dd6b1">
                  <FlexImg className="flex-img-tag" image={bilder.bild03} box={{ d: [100, 38.3], m: [100, 65.3] }} />
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_b460e7966626 flex-block__element--text flex-block__element--block-blockID--9bf7589dd6b1 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "2.1875rem", "--line-height": "1.65em", "--letter-spacing": "0em" }}
                  data-only-device="desktop"
                >
                  <div className="flex-block__text-content height-auto">
                    <h2>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>Hi, ich bin Jana!</span>
                    </h2>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_b460e7966626 flex-block__element--text flex-block__element--block-blockID--9bf7589dd6b1 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "1.875rem", "--line-height": "1.65em", "--letter-spacing": "0em" }}
                  data-only-device="mobile"
                >
                  <div className="flex-block__text-content height-auto">
                    <h2>
                      <span style={{ color: "var(--scheme_1--text--default)" }}>Hi, ich bin Jana!</span>
                    </h2>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_183a211a216b flex-block__element--text flex-block__element--block-blockID--9bf7589dd6b1 flex-block__element--editorTagsFix"
                  data-only-device="desktop"
                >
                  <div data-font="d310db289235" className="flex-block__text-content height-auto">
                    <p>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          Ich halte deine Lieblingsmomente nicht nur mit der Kamera, sondern auch mit dem Herzen fest.
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_183a211a216b flex-block__element--text flex-block__element--block-blockID--9bf7589dd6b1 flex-block__element--editorTagsFix"
                  data-only-device="mobile"
                >
                  <div data-font="d310db289235" className="flex-block__text-content height-auto">
                    <p>
                      <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                        <span style={{ color: "var(--scheme_1--text--default)" }}>
                          Ich halte deine Lieblingsmomente nicht nur mit der Kamera, sondern auch mit dem Herzen fest.
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
                <Link
                  href="/ueber-mich/"
                  className="flex-block__element flex-block__element--element_id_cb00a52fc206 flex-block__element--button flex-block__element--block-blockID--9bf7589dd6b1 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "0.65625em", "--line-height": "1.05em", "--letter-spacing": "0.15em" }}
                  data-only-device="desktop"
                  prefetch={false}
                >
                  <span className="flex-block__element--button__content flex-block__element--button__content--hoverEffect-default">
                    <span className="flex-block__text-content">
                      <p>LERN MICH BESSER KENNEN</p>
                    </span>
                  </span>
                </Link>
                <Link
                  href="/ueber-mich/"
                  className="flex-block__element flex-block__element--element_id_cb00a52fc206 flex-block__element--button flex-block__element--block-blockID--9bf7589dd6b1 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "0.65625em", "--line-height": "1.05em", "--letter-spacing": "0.15em" }}
                  data-only-device="mobile"
                  prefetch={false}
                >
                  <span className="flex-block__element--button__content flex-block__element--button__content--hoverEffect-default">
                    <span className="flex-block__text-content">
                      <p>LERN MICH BESSER KENNEN</p>
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flo-block flex-block-root flo-block--home-3">
          <div className="flo-block__container">
            <div className="alignfull flex-block flex-block--blockID--9027be38f4f4" data-block-id="blockID--9027be38f4f4">
              <div className="flex-block__main-container">
                <div
                  className="flex-block__element flex-block__element--element_id_20adc1894456 flex-block__element--text flex-block__element--block-blockID--9027be38f4f4 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "2.1875rem", "--line-height": "1.28em", "--letter-spacing": "0.01em" }}
                  data-only-device="desktop"
                >
                  <div className="flex-block__text-content height-auto">
                    <h2>
                      <span style={{ color: "var(--scheme_1--text--default)" }}>Meine Leistungen</span>
                    </h2>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_20adc1894456 flex-block__element--text flex-block__element--block-blockID--9027be38f4f4 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "1.875rem", "--line-height": "1.28em", "--letter-spacing": "0.01em" }}
                  data-only-device="mobile"
                >
                  <div className="flex-block__text-content height-auto">
                    <h2>
                      <span style={{ color: "var(--scheme_1--text--default)" }}>Meine Leistungen</span>
                    </h2>
                  </div>
                </div>
                <div className="flex-block__element flex-block__element--element_id_f0d3e0845bb1 flex-block__element--image flex-block__element--block-blockID--9027be38f4f4">
                  <div style={{ backgroundColor: "rgba(0,0,0,0.23)" }} className="flex-block__overlay"></div>
                  <FlexImg className="flex-img-tag" image={bilder.bild04} box={{ d: [24.9, 33.9], m: [84.9, 115.7] }} />{" "}
                  <Link className="flex-block__element--image-link" href="/paare/" aria-label="Paare" prefetch={false}></Link>
                </div>
                <div className="flex-block__element flex-block__element--element_id_3c7eee7ed3a3 flex-block__element--image flex-block__element--block-blockID--9027be38f4f4">
                  <div style={{ backgroundColor: "rgba(0,0,0,0.23)" }} className="flex-block__overlay"></div>
                  <FlexImg className="flex-img-tag" image={bilder.bild05} box={{ d: [25, 33.9], m: [85.1, 115.7] }} />{" "}
                  <Link className="flex-block__element--image-link" href="/familien/" aria-label="Familien" prefetch={false}></Link>
                </div>
                <div className="flex-block__element flex-block__element--element_id_75157 flex-block__element--image flex-block__element--block-blockID--9027be38f4f4">
                  <div style={{ backgroundColor: "rgba(0,0,0,0.23)" }} className="flex-block__overlay"></div>
                  <FlexImg className="flex-img-tag" image={bilder.bild06} box={{ d: [24.9, 33.9], m: [84.9, 115.7] }} />{" "}
                  <Link className="flex-block__element--image-link" href="/hochzeiten/" aria-label="Hochzeiten" prefetch={false}></Link>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_36385 flex-block__element--text flex-block__element--block-blockID--9027be38f4f4 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "2.1875rem", "--line-height": "1.65em", "--letter-spacing": "0em" }}
                  data-only-device="desktop"
                >
                  <div className="flex-block__text-content height-auto">
                    <h3>
                      <span style={{ color: "rgb(255, 255, 255)" }}>Hochzeiten</span>
                    </h3>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_36385 flex-block__element--text flex-block__element--block-blockID--9027be38f4f4 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "1.875rem", "--line-height": "1.65em", "--letter-spacing": "0em" }}
                  data-only-device="mobile"
                >
                  <div className="flex-block__text-content height-auto">
                    <h3>
                      <span style={{ color: "rgb(255, 255, 255)" }}>Hochzeiten</span>
                    </h3>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_0b917f671fba flex-block__element--text flex-block__element--block-blockID--9027be38f4f4 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "1.875rem", "--line-height": "1.65em", "--letter-spacing": "0em" }}
                  data-only-device="desktop"
                >
                  <div className="flex-block__text-content height-auto">
                    <h3>
                      <span style={{ color: "rgb(255, 255, 255)" }}>Familien</span>
                    </h3>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_0b917f671fba flex-block__element--text flex-block__element--block-blockID--9027be38f4f4 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "1.875rem", "--line-height": "1.65em", "--letter-spacing": "0em" }}
                  data-only-device="mobile"
                >
                  <div className="flex-block__text-content height-auto">
                    <h3>
                      <span style={{ color: "rgb(255, 255, 255)" }}>Familien</span>
                    </h3>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_08919cef568d flex-block__element--text flex-block__element--block-blockID--9027be38f4f4 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "2.1875rem", "--line-height": "1.1em", "--letter-spacing": "0em" }}
                  data-only-device="desktop"
                >
                  <div className="flex-block__text-content height-auto">
                    <h3>
                      <span style={{ color: "rgb(255, 255, 255)" }}>Paare</span>
                    </h3>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_08919cef568d flex-block__element--text flex-block__element--block-blockID--9027be38f4f4 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "1.875rem", "--line-height": "1.1em", "--letter-spacing": "0em" }}
                  data-only-device="mobile"
                >
                  <div className="flex-block__text-content height-auto">
                    <h3>
                      <span style={{ color: "rgb(255, 255, 255)" }}>Paare</span>
                    </h3>
                  </div>
                </div>
                <div className="flex-block__element flex-block__element--element_id_31514 flex-block__element--text flex-block__element--block-blockID--9027be38f4f4 flex-block__element--editorTagsFix">
                  <div data-font="3114d2aa8c46" className="flex-block__text-content height-auto">
                    <p>
                      <span style={{ color: "var(--scheme_1--button--text--hover)" }}>
                        <span style={{ textTransform: "uppercase" }}>
                          <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                            Eure Liebe, eure Hochzeit, euer Tag – wir halten eure Liebe für immer fest.
                          </span>
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex-block__element flex-block__element--element_id_a49d419f0839 flex-block__element--text flex-block__element--block-blockID--9027be38f4f4 flex-block__element--editorTagsFix">
                  <div data-font="3114d2aa8c46" className="flex-block__text-content height-auto">
                    <p>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>
                        <span style={{ textTransform: "uppercase" }}>
                          <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                            Eine Familie zu haben, ist ein einziges Abenteuer – lasst es uns gemeinsam einfangen.
                          </span>
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex-block__element flex-block__element--element_id_795778e60df8 flex-block__element--text flex-block__element--block-blockID--9027be38f4f4 flex-block__element--editorTagsFix">
                  <div data-font="3114d2aa8c46" className="flex-block__text-content height-auto">
                    <p>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>
                        <span style={{ textTransform: "uppercase" }}>
                          <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                            Jede Liebe ist einzigartig – wir machen die Einzigartigkeit gemeinsam sichtbar.
                          </span>
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flo-block flex-block-root flo-block--home-4">
          <div className="flo-block__container">
            <div className="alignfull flex-block flex-block--blockID--4d156e25f94e" data-block-id="blockID--4d156e25f94e">
              <div className="flex-block__main-container">
                <TabsProvider>
                  <div
                    className="flex-block__element flex-block__element--element_id_80adddb73621 flex-block__element--tabs2 flex-block__element--block-blockID--4d156e25f94e"
                    data-only-device="desktop"
                  >
                    <Tabs2
                      id="80adddb73621"
                      className="flex-element-type-tabs2 flex-element-type-tabs2--elementRole-slideshow flex-element-type-tabs2--layout-image flex-element-type-tabs2--layout-orientation-vertical flex-element-type-tabs2--slideType-visibleNearby flex-element-type-tabs2--slideAnimation-normal flex-element-type-tabs2--imageSize-fill flex-element-type-tabs2--textAlign-left"
                      style={{
                        "--slideWidth": "33.125rem",
                        "--slideGap": "3.625rem",
                        "--slideSpeed": "600ms",
                        "--slideAnimationAmount": "100",
                        "--imageGap": "1.875rem",
                        "--titleGap": "1.125rem",
                        "--textGap": "1.125rem",
                        "--lowerTitleGap": "1.125rem",
                        "--imagePosition": "0%",
                        "--imageBorderRadius": "0rem",
                        "--imageWidth": "12.5rem",
                        "--imageHeight": "12.5rem",
                        "--titleColor": "var(--scheme_1--text--default)",
                        "--textColor": "var(--scheme_1--text--default)",
                        "--lowerTitleColor": "var(--scheme_1--text--default)",
                        "--textPaddings": "3.75rem",
                        "--textTopPadding": "0rem",
                        "--textSidePadding": "1.875rem",
                        "--buttonLabelColor": "var(--scheme_1--button--text--default)",
                        "--buttonBackgroundColor": "var(--scheme_1--button--background--default)",
                        "--buttonBorderColor": "var(--scheme_1--button--background--default)",
                        "--buttonHoverLabelColor": "var(--scheme_1--button--text--hover)",
                        "--buttonHoverBackgroundColor": "var(--scheme_1--button--background--hover)",
                        "--buttonHoverBorderColor": "var(--scheme_1--button--background--hover)",
                        "--buttonCornerRadius": "0rem",
                        "--buttonBorderWidth": "1px",
                      }}
                      slideType="visibleNearby"
                      speed={600}
                      slides={[
                        <TabsImg
                          key="0"
                          className="flex-element-type-tabs2__slide-image"
                          image={bilder.bild07}
                          style={{ "--backgroundPosition": "0% 16.184197749318%" }}
                        />,
                        <TabsImg
                          key="1"
                          className="flex-element-type-tabs2__slide-image"
                          image={bilder.bild08}
                          style={{ "--backgroundPosition": "44.000555458156% 0%" }}
                        />,
                        <TabsImg
                          key="2"
                          className="flex-element-type-tabs2__slide-image"
                          image={bilder.bild09}
                          style={{ "--backgroundPosition": "0% 48.498626166021%" }}
                        />,
                      ]}
                      slideAttrs={[{ "data-alt-title": "Tab 2" }, { "data-alt-title": "Tab 1" }, { "data-alt-title": "Tab" }]}
                    />
                  </div>
                  <div
                    className="flex-block__element flex-block__element--element_id_80adddb73621 flex-block__element--tabs2 flex-block__element--block-blockID--4d156e25f94e"
                    data-only-device="mobile"
                  >
                    <Tabs2
                      id="80adddb73621"
                      className="flex-element-type-tabs2 flex-element-type-tabs2--elementRole-slideshow flex-element-type-tabs2--layout-image flex-element-type-tabs2--layout-orientation-vertical flex-element-type-tabs2--slideType-oneSlide flex-element-type-tabs2--slideAnimation-normal flex-element-type-tabs2--imageSize-fill flex-element-type-tabs2--textAlign-left"
                      style={{
                        "--slideWidth": "33.125rem",
                        "--slideGap": "3.625rem",
                        "--slideSpeed": "600ms",
                        "--slideAnimationAmount": "100",
                        "--imageGap": "1.875rem",
                        "--titleGap": "1.125rem",
                        "--textGap": "1.125rem",
                        "--lowerTitleGap": "1.125rem",
                        "--imagePosition": "0%",
                        "--imageBorderRadius": "0rem",
                        "--imageWidth": "12.5rem",
                        "--imageHeight": "12.5rem",
                        "--titleColor": "var(--scheme_1--text--default)",
                        "--textColor": "var(--scheme_1--text--default)",
                        "--lowerTitleColor": "var(--scheme_1--text--default)",
                        "--textPaddings": "3.75rem",
                        "--textTopPadding": "0rem",
                        "--textSidePadding": "1.875rem",
                        "--buttonLabelColor": "var(--scheme_1--button--text--default)",
                        "--buttonBackgroundColor": "var(--scheme_1--button--background--default)",
                        "--buttonBorderColor": "var(--scheme_1--button--background--default)",
                        "--buttonHoverLabelColor": "var(--scheme_1--button--text--hover)",
                        "--buttonHoverBackgroundColor": "var(--scheme_1--button--background--hover)",
                        "--buttonHoverBorderColor": "var(--scheme_1--button--background--hover)",
                        "--buttonCornerRadius": "0rem",
                        "--buttonBorderWidth": "1px",
                      }}
                      slideType="oneSlide"
                      speed={600}
                      slides={[
                        <TabsImg
                          key="0"
                          className="flex-element-type-tabs2__slide-image"
                          image={bilder.bild07}
                          style={{ "--backgroundPosition": "0% 16.184197749318%" }}
                        />,
                        <TabsImg
                          key="1"
                          className="flex-element-type-tabs2__slide-image"
                          image={bilder.bild08}
                          style={{ "--backgroundPosition": "44.000555458156% 0%" }}
                        />,
                        <TabsImg
                          key="2"
                          className="flex-element-type-tabs2__slide-image"
                          image={bilder.bild09}
                          style={{ "--backgroundPosition": "0% 48.498626166021%" }}
                        />,
                      ]}
                      slideAttrs={[{ "data-alt-title": "Tab 2" }, { "data-alt-title": "Tab 1" }, { "data-alt-title": "Tab" }]}
                    />
                  </div>
                  <div
                    className="flex-block__element flex-block__element--element_id_3b9249afd14e flex-block__element--text flex-block__element--block-blockID--4d156e25f94e flex-block__element--editorTagsFix"
                    style={{ "--font-size": "3.75rem", "--line-height": "1.5em", "--letter-spacing": "0em" }}
                    data-only-device="desktop"
                    lang="en"
                  >
                    <div className="flex-block__text-content height-auto">
                      <h2>
                        <span style={{ color: "var(--scheme_1--text--default)" }}>Love letters</span>
                      </h2>
                    </div>
                  </div>
                  <div
                    className="flex-block__element flex-block__element--element_id_3b9249afd14e flex-block__element--text flex-block__element--block-blockID--4d156e25f94e flex-block__element--editorTagsFix"
                    style={{ "--font-size": "3.125rem", "--line-height": "1.5em", "--letter-spacing": "0em" }}
                    data-only-device="mobile"
                    lang="en"
                  >
                    <div className="flex-block__text-content height-auto">
                      <h2>
                        <span style={{ color: "var(--scheme_1--text--default)" }}>Love letters</span>
                      </h2>
                    </div>
                  </div>
                  <div className="flex-block__element flex-block__element--element_id_14bce7557520 flex-block__element--close-block flex-block__element--block-blockID--4d156e25f94e">
                    <Tabs2Text
                      id="80adddb73621"
                      style={{
                        "--textAlign": "left",
                        "--titleGap": "2.0625rem",
                        "--textGap": "1.125rem",
                        "--lowerTitleGap": "1.125rem",
                        "--titleColor": "var(--scheme_1--text--default)",
                        "--textColor": "var(--scheme_1--text--default)",
                        "--lowerTitleColor": "var(--scheme_1--text--default)",
                        "--buttonLabelColor": "var(--scheme_1--button--text--default)",
                        "--buttonBackgroundColor": "var(--scheme_1--button--background--default)",
                        "--buttonBorderColor": "var(--scheme_1--button--background--default)",
                        "--buttonHoverLabelColor": "var(--scheme_1--button--text--hover)",
                        "--buttonHoverBackgroundColor": "var(--scheme_1--button--background--hover)",
                        "--buttonHoverBorderColor": "var(--scheme_1--button--background--hover)",
                        "--buttonCornerRadius": "0rem",
                        "--buttonBorderWidth": "1px",
                      }}
                      titleFont="ad6153ce31e6"
                      textFont="3114d2aa8c46"
                      items={[
                        {
                          title: null,
                          text: (
                            <>
                              Wenn wir nach einer Empfehlung für Paarshootings gefragt werden würden, wäre Jana unsere erste Empfehlung. Es
                              fühlt sich nicht nach Shooting und Posieren an, sondern ganz natürlich. Sie hat super gute Anregungen gegeben,
                              wie wir uns bewegen können und wir konnten als Paar ganz unseren Moment genießen. Gerade für Menschen, die
                              sich nicht so sicher vor der Linse fühlen, ist das wirklich Gold wert. Besonders toll fanden wir es, wie wir
                              unsere Shooting-Ideen gemeinsam weiter entwickeln konnten, Jana Locations und Outfit-Ideen vorgeschlagen hat
                              und wir wirklich das Gefühl hatten, dass ihr unsere Zufriedenheit sehr auf dem Herzen liegt. Auch für
                              Unsicherheiten hat sie viel Verständnis und findet die richtigen Worte. Zuletzt hat sie die Fotos in
                              Rekordzeit bearbeitet und war immer schnell erreichbar. Vielen lieben Dank nochmal dafür!
                              <br />
                              <br />– &nbsp;Simone & Ruven // Paarshooting
                            </>
                          ),
                        },
                        {
                          title: null,
                          text: (
                            <>
                              Dass Jana eine tolle Fotografin ist, brauche ich nicht zu erzählen – das kann man anhand ihres Portfolios
                              sehen. Was man aber bestimmt noch nicht weiß, ist, dass die Frau hinter der Linse eine unwahrscheinlich
                              aufgeschlossene, offene und warmherzige Person ist, die es einem so leicht wie möglich macht, sich während des
                              Shootings wohl zu fühlen. Jana hat einfach einen unglaublich guten Blick für&apos;s Detail und den Moment. Sie
                              sieht Dinge, die man selbst vielleicht gar nicht gesehen hätte. Wir sind immer wieder so begeistert von ihrer
                              Arbeit!
                              <br />
                              <br />– &nbsp;Laura // Familienshooting
                            </>
                          ),
                        },
                        {
                          title: null,
                          text: (
                            <>
                              Herzlich, einfühlsam und entspannt – das trifft auf Jana und ihre Arbeiten sehr gut zu. Sie arbeitet
                              unglaublich professionell und weiß ganz genau, wie die emotionalsten Momente perfekt einzufangen sind. Jana
                              durfte schon so einige schöne Momente für uns festhalten und im September wird sie unsere Hochzeit
                              fotografieren. Darauf freuen wir uns sehr. Während des Shootings gibt sie einem das Gefühl, alles richtig zu
                              machen, deshalb vertrauen wir ihr voll und ganz und wurden auch noch nicht enttäuscht. Eine große und absolut
                              ehrliche Herzensempfehlung von uns an alle, die ihre schönsten Momente festhalten möchten.
                              <br />
                              <br />– &nbsp;Sarah & Nils // Paarshooting
                            </>
                          ),
                        },
                      ]}
                    />
                  </div>
                  <div className="flex-block__element flex-block__element--element_id_cd7e9a8491aa flex-block__element--tabs2-arrow flex-block__element--block-blockID--4d156e25f94e">
                    <Tabs2Arrow
                      id="80adddb73621"
                      role="next"
                      style={{
                        "--color": "var(--scheme_1--overline--default)",
                        "--color-hover": "var(--scheme_1--overline--accent)",
                        "--icon-size": "0.9375rem",
                        justifyContent: "flex-end",
                      }}
                      icon="flo-flex-icon-next-1"
                    />
                  </div>
                  <div className="flex-block__element flex-block__element--element_id_c455a82ba8eb flex-block__element--tabs2-arrow flex-block__element--block-blockID--4d156e25f94e">
                    <Tabs2Arrow
                      id="80adddb73621"
                      role="prev"
                      style={{
                        "--color": "var(--scheme_1--overline--default)",
                        "--color-hover": "var(--scheme_1--overline--accent)",
                        "--icon-size": "0.9375rem",
                        justifyContent: "flex-start",
                      }}
                      icon="flo-flex-icon-previous-1"
                    />
                  </div>
                  <div className="flex-block__element flex-block__element--element_id_c662d4e3d504 flex-block__element--shape flex-block__element--block-blockID--4d156e25f94e flex-block__element--horizontal-line"></div>
                </TabsProvider>
              </div>
            </div>
          </div>
        </div>
        <div className="flo-block flex-block-root flo-block--home-5">
          <div className="flo-block__container">
            <div className="alignfull flex-block flex-block--blockID--f57a673350ec" data-block-id="blockID--f57a673350ec">
              <div className="flex-block__main-container">
                <div
                  className="flex-block__element flex-block__element--element_id_1ebf9a601b09 flex-block__element--text flex-block__element--block-blockID--f57a673350ec flex-block__element--editorTagsFix"
                  style={{ "--font-size": "2.1875rem", "--line-height": "1.3em", "--letter-spacing": "0em" }}
                  data-only-device="desktop"
                >
                  <div className="flex-block__text-content height-auto">
                    <p>
                      <span style={{ color: "var(--scheme_1--overline--default)" }}>
                        Das Leben ist voller schöner Momente und jeder einzelne ist es wert, verewigt zu werden.
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_1ebf9a601b09 flex-block__element--text flex-block__element--block-blockID--f57a673350ec flex-block__element--editorTagsFix"
                  style={{ "--font-size": "1.875rem", "--line-height": "1.3em", "--letter-spacing": "0em" }}
                  data-only-device="mobile"
                >
                  <div className="flex-block__text-content height-auto">
                    <p>
                      <span style={{ color: "var(--scheme_1--overline--default)" }}>
                        Das Leben ist voller schöner Momente und jeder einzelne ist es wert, verewigt zu werden.
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex-block__element flex-block__element--element_id_934f30b4b967 flex-block__element--text flex-block__element--block-blockID--f57a673350ec flex-block__element--editorTagsFix">
                  <div data-font="3114d2aa8c46" className="flex-block__text-content height-auto">
                    <p>
                      <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                        <span style={{ color: "var(--scheme_1--overline--accent)" }}>- Jana Vogel</span>
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
      <JsonLd data={pageGraph("home")} />
    </main>
  );
}
