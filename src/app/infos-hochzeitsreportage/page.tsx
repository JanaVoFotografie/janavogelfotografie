import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FlexImg } from "@/components/FlexImg";
import { TabsProvider, Tabs2, Tabs2Arrow, TabsSwitcher } from "@/components/Tabs";
import bilder from "@content/seiten/info.json";
import { FAQ } from "@/data/faq";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { pageGraph } from "@/lib/structured-data";
import "./page.css";

export const metadata = pageMetadata("infos-hochzeitsreportage");

export default function Page() {
  return (
    <main className="flo_page_wrap">
      <div className="flo_page">
        <SiteHeader page="infos-hochzeitsreportage" current="/infos-hochzeitsreportage/" />
        <div className="flo-block flex-block-root flo-block--infos-hochzeitsreportage-1">
          <div className="flo-block__container">
            <div className="alignfull flex-block flex-block--blockID--55f852932ec2" data-block-id="blockID--55f852932ec2">
              <div className="flex-block__main-container">
                <div className="flex-block__element flex-block__element--element_id_67875 flex-block__element--image flex-block__element--block-blockID--55f852932ec2">
                  <FlexImg className="flex-img-tag" image={bilder.bild01} priority box={{ d: [100, 43.8], m: [100, 88] }} />
                </div>
                <div className="flex-block__element flex-block__element--element_id_91920 flex-block__element--shape flex-block__element--block-blockID--55f852932ec2"></div>
                <div
                  className="flex-block__element flex-block__element--element_id_28460 flex-block__element--text flex-block__element--block-blockID--55f852932ec2 flex-block__element--editorTagsFix"
                  data-only-device="desktop"
                >
                  <div data-font="5366bb815584" className="flex-block__text-content height-auto">
                    <h1>
                      <span style={{ color: "var(--scheme_1--button--background--hover)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "NewYork" }}>
                          Hochzeitsreportage
                        </span>
                      </span>
                    </h1>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_28460 flex-block__element--text flex-block__element--block-blockID--55f852932ec2 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "1.625rem", "--line-height": "1em", "--letter-spacing": "0em" }}
                  data-only-device="mobile"
                >
                  <div className="flex-block__text-content height-auto">
                    <h1>
                      <span style={{ color: "var(--scheme_1--button--background--hover)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "NewYork" }}>
                          Hochzeitsreportage
                        </span>
                      </span>
                    </h1>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_10805 flex-block__element--text flex-block__element--block-blockID--55f852932ec2 flex-block__element--editorTagsFix"
                  data-only-device="desktop"
                >
                  <div data-font="3114d2aa8c46" className="flex-block__text-content height-auto">
                    <p>
                      Eure Hochzeit ist ein Tag voller einzigartiger Momente, großer Emotionen und unvergesslicher Augenblicke – und genau
                      diese halte ich für euch in authentischen Bildern fest. Als Hochzeitsfotografin ist es meine Leidenschaft, eure
                      Geschichte so einzufangen, dass ihr euch noch Jahre später in diese magischen Stunden zurückversetzen könnt. Ich
                      erinnere mich noch genau daran, wie es sich angefühlt hat, meine eigenen Hochzeitsfotos zum ersten Mal zu sehen – all
                      die Liebe, die Freude, das pure Glück. Dieses Gefühl möchte ich auch euch schenken. Meine Bilder sollen euch ein
                      Lächeln ins Gesicht zaubern, wenn ihr sie anschaut, und euch immer wieder an die wundervollen Emotionen eures
                      besonderen Tages erinnern.
                    </p>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_10805 flex-block__element--text flex-block__element--block-blockID--55f852932ec2 flex-block__element--editorTagsFix"
                  data-only-device="mobile"
                >
                  <div data-font="3114d2aa8c46" className="flex-block__text-content height-auto">
                    <p>
                      Eure Hochzeit ist ein Tag voller einzigartiger Momente, großer Emotionen und unvergesslicher Augenblicke – und genau
                      diese halte ich für euch in authentischen Bildern fest. Als Hochzeitsfotografin ist es meine Leidenschaft, eure
                      Geschichte so einzufangen, dass ihr euch noch Jahre später in diese magischen Stunden zurückversetzen könnt. Ich
                      erinnere mich noch genau daran, wie es sich angefühlt hat, meine eigenen Hochzeitsfotos zum ersten Mal zu sehen – all
                      die Liebe, die Freude, das pure Glück. Dieses Gefühl möchte ich auch euch schenken. Meine Bilder sollen euch ein
                      Lächeln ins Gesicht zaubern, wenn ihr sie anschaut, und euch immer wieder an die wundervollen Emotionen eures
                      besonderen Tages erinnern.
                    </p>
                  </div>
                </div>
                <Link
                  href="/hochzeiten/"
                  className="flex-block__element flex-block__element--element_id_22966 flex-block__element--button flex-block__element--block-blockID--55f852932ec2 flex-block__element--editorTagsFix"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ "--font-size": "0.65625em", "--line-height": "1.05em", "--letter-spacing": "0.15em" }}
                  data-only-device="desktop"
                  prefetch={false}
                >
                  <span className="flex-block__element--button__content flex-block__element--button__content--hoverEffect-default">
                    <span className="flex-block__text-content">
                      <p>PORTFOLIO</p>
                    </span>
                  </span>
                </Link>
                <Link
                  href="/hochzeiten/"
                  className="flex-block__element flex-block__element--element_id_22966 flex-block__element--button flex-block__element--block-blockID--55f852932ec2 flex-block__element--editorTagsFix"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ "--font-size": "0.65625em", "--line-height": "1.05em", "--letter-spacing": "0.15em" }}
                  data-only-device="mobile"
                  prefetch={false}
                >
                  <span className="flex-block__element--button__content flex-block__element--button__content--hoverEffect-default">
                    <span className="flex-block__text-content">
                      <p>PORTFOLIO</p>
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flo-block flex-block-root flo-block--infos-hochzeitsreportage-2">
          <div className="flo-block__container">
            <div className="alignfull flex-block flex-block--blockID--99c71a6dc050" data-block-id="blockID--99c71a6dc050">
              <div className="flex-block__main-container">
                <div className="flex-block__element flex-block__element--element_id_c2dac5d2c619 flex-block__element--image flex-block__element--block-blockID--99c71a6dc050">
                  <FlexImg className="flex-img-tag" image={bilder.bild02} box={{ d: [43.9, 31.4], m: [59.2, 39.7] }} />
                </div>
                <div className="flex-block__element flex-block__element--element_id_31e223cda11a flex-block__element--shape flex-block__element--block-blockID--99c71a6dc050"></div>
                <div className="flex-block__element flex-block__element--element_id_2716a7ceda86 flex-block__element--image flex-block__element--block-blockID--99c71a6dc050">
                  <FlexImg className="flex-img-tag" image={bilder.bild03} box={{ d: [27.9, 37], m: [36.3, 50.5] }} />
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_fb05b1bf765d flex-block__element--text flex-block__element--block-blockID--99c71a6dc050 flex-block__element--editorTagsFix"
                  data-only-device="desktop"
                  lang="en"
                >
                  <div data-font="ebfa9acd266d" className="flex-block__text-content height-auto">
                    <p>
                      <span style={{ color: "var(--scheme_1--overline--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          Let&apos;s create
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_fb05b1bf765d flex-block__element--text flex-block__element--block-blockID--99c71a6dc050 flex-block__element--editorTagsFix"
                  data-only-device="mobile"
                  lang="en"
                >
                  <div data-font="3114d2aa8c46" className="flex-block__text-content height-auto">
                    <p>
                      <span style={{ color: "var(--scheme_1--overline--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          Let&apos;s create
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_88524df2005b flex-block__element--text flex-block__element--block-blockID--99c71a6dc050 flex-block__element--editorTagsFix"
                  data-only-device="desktop"
                  lang="en"
                >
                  <div data-font="5366bb815584" className="flex-block__text-content height-auto">
                    <h2>
                      <span style={{ color: "var(--scheme_1--overline--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "NewYork" }}>
                          beautiful memories
                        </span>
                      </span>
                    </h2>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_88524df2005b flex-block__element--text flex-block__element--block-blockID--99c71a6dc050 flex-block__element--editorTagsFix"
                  style={{ "--font-size": "1.875rem", "--line-height": "1em", "--letter-spacing": "0em" }}
                  data-only-device="mobile"
                  lang="en"
                >
                  <div className="flex-block__text-content height-auto">
                    <h2>
                      <span style={{ color: "var(--scheme_1--overline--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "NewYork" }}>
                          beautiful memories
                        </span>
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flo-block flex-block-root flo-block--infos-hochzeitsreportage-3">
          <div className="flo-block__container">
            <div className="alignfull flex-block flex-block--blockID--741251cd8b5b" data-block-id="blockID--741251cd8b5b">
              <div className="flex-block__main-container">
                <TabsProvider>
                  <div
                    className="flex-block__element flex-block__element--element_id_ad4be17d99c6 flex-block__element--shape flex-block__element--block-blockID--741251cd8b5b flex-block__element--horizontal-line"
                    data-only-device="desktop"
                  ></div>
                  <div
                    className="flex-block__element flex-block__element--element_id_ad4be17d99c6 flex-block__element--shape flex-block__element--block-blockID--741251cd8b5b flex-block__element--horizontal-line"
                    data-only-device="mobile"
                  ></div>
                  <div
                    className="flex-block__element flex-block__element--element_id_3650f824ec8a flex-block__element--tabs-switcher flex-block__element--block-blockID--741251cd8b5b"
                    data-only-device="desktop"
                  >
                    <TabsSwitcher
                      id="f94a881ba70a"
                      className="flex-element-type-tabs-switcher flex-element-type-tabs-switcher--horizontal flex-element-type-tabs-switcher--type-text flex-element-type-tabs-switcher--useSwipeOnMobile flex-element-type-tabs-switcher--imageGrayscaleWhenInactive"
                      style={{
                        "--textColor": "var(--scheme_1--text--default)",
                        "--activeTextColor": "var(--scheme_1--overline--default)",
                        "--lineColor": "var(--scheme_1--overline--default)",
                        "--activeBgTextColor": "var(--scheme_1--background--default)",
                        "--activeBgColor": "var(--scheme_1--overline--default)",
                        "--itemsGap": "3.4375rem",
                        "--horizontalAlign": "center",
                        "--verticalAlign": "flex-start",
                      }}
                      itemStyle={{ fontFamily: "NewYork", fontSize: "1.3125rem", letterSpacing: "0em", lineHeight: "1" }}
                      items={["KENNENLERNGESPRÄCH", "EUER TAG", "SO GEHT ES WEITER"]}
                    />
                  </div>
                  <div
                    className="flex-block__element flex-block__element--element_id_3650f824ec8a flex-block__element--tabs-switcher flex-block__element--block-blockID--741251cd8b5b"
                    data-only-device="mobile"
                  >
                    <TabsSwitcher
                      id="f94a881ba70a"
                      className="flex-element-type-tabs-switcher flex-element-type-tabs-switcher--vertical flex-element-type-tabs-switcher--type-text flex-element-type-tabs-switcher--useSwipeOnMobile flex-element-type-tabs-switcher--imageGrayscaleWhenInactive"
                      style={{
                        "--textColor": "var(--scheme_1--text--default)",
                        "--activeTextColor": "var(--scheme_1--overline--default)",
                        "--lineColor": "var(--scheme_1--overline--default)",
                        "--activeBgTextColor": "var(--scheme_1--background--default)",
                        "--activeBgColor": "var(--scheme_1--overline--default)",
                        "--itemsGap": "1.0625rem",
                        "--horizontalAlign": "center",
                        "--verticalAlign": "center",
                      }}
                      itemStyle={{ fontFamily: "NewYork", fontSize: "1.3125rem", letterSpacing: "0em", lineHeight: "1" }}
                      items={["KENNENLERNGESPRÄCH", "EUER TAG", "SO GEHT ES WEITER"]}
                    />
                  </div>
                  <div
                    className="flex-block__element flex-block__element--element_id_f94a881ba70a flex-block__element--tabs2 flex-block__element--block-blockID--741251cd8b5b"
                    data-only-device="desktop"
                  >
                    <Tabs2
                      id="f94a881ba70a"
                      className="flex-element-type-tabs2 flex-element-type-tabs2--elementRole-tabs flex-element-type-tabs2--layout-text flex-element-type-tabs2--layout-orientation-vertical flex-element-type-tabs2--slideType-oneSlide flex-element-type-tabs2--slideAnimation-normal flex-element-type-tabs2--imageSize-fill flex-element-type-tabs2--textAlign-left"
                      style={{
                        "--slideWidth": "19.375rem",
                        "--slideGap": "3.75rem",
                        "--slideSpeed": "200ms",
                        "--slideAnimationAmount": "100",
                        "--imageGap": "1.875rem",
                        "--titleGap": "1.125rem",
                        "--textGap": "1.125rem",
                        "--lowerTitleGap": "1.125rem",
                        "--imagePosition": "0%",
                        "--imageBorderRadius": "0rem",
                        "--imageWidth": "12.5rem",
                        "--imageHeight": "12.5rem",
                        "--titleColor": "#000000",
                        "--textColor": "var(--scheme_1--text--default)",
                        "--lowerTitleColor": "var(--scheme_1--text--default)",
                        "--textPaddings": "0rem",
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
                      speed={200}
                      slides={[
                        <div key="0" className="flex-element-type-tabs2__slide-text-content">
                          <h4 className="flex-element-type-tabs2__slide-title" data-font="title_3/xsmall"></h4>
                          <h5 className="flex-element-type-tabs2__slide-text" data-font="3114d2aa8c46">
                            {
                              "Eure Hochzeit ist nicht nur für euch ein besonderer Tag – auch für mich ist es wichtig, euch von Anfang an bestmöglich zu begleiten. Deshalb stehe ich euch nicht nur als Fotografin zur Seite, sondern auch als Unterstützung in der Planung. Vom ersten Kontakt bis zur finalen Übergabe eurer Bilder lege ich großen Wert darauf, eine vertrauensvolle und entspannte Atmosphäre zu schaffen.\u00a0"
                            }
                            <br />
                            <br />
                            Ein persönliches Kennenlerngespräch ist mir besonders wichtig, denn so können wir nicht nur offene Fragen
                            klären, sondern auch gemeinsam euren Tagesablauf durchgehen. Ich gebe euch wertvolle Tipps mit auf den Weg, die
                            euch helfen, eure Hochzeit entspannt zu genießen. Und egal, was euch bewegt – ihr könnt euch jederzeit bei mir
                            melden!
                            <br />
                          </h5>
                          <h6 className="flex-element-type-tabs2__slide-lower-title" data-font=""></h6>
                        </div>,
                        <div key="1" className="flex-element-type-tabs2__slide-text-content">
                          <h4 className="flex-element-type-tabs2__slide-title" data-font="title_3/xsmall"></h4>
                          <h5 className="flex-element-type-tabs2__slide-text" data-font="3114d2aa8c46">
                            Mit viel Leidenschaft und einem Gespür für die richtigen Momente bin ich an eurem großen Tag stets an eurer
                            Seite. Mir ist es wichtig, dass ihr euch in meiner Gegenwart wohlfühlt – denn nur so entstehen authentische
                            Aufnahmen, die eure Liebe und all die kleinen, bedeutungsvollen Augenblicke für immer festhalten.
                            <br />
                          </h5>
                          <h6 className="flex-element-type-tabs2__slide-lower-title" data-font=""></h6>
                        </div>,
                        <div key="2" className="flex-element-type-tabs2__slide-text-content">
                          <h4 className="flex-element-type-tabs2__slide-title" data-font="title_3/xsmall"></h4>
                          <h5 className="flex-element-type-tabs2__slide-text" data-font="3114d2aa8c46">
                            Bei jeder Hochzeitsreportage erhaltet ihr immer alle Bilder, die gut geworden sind. Die Anzahl ist abhängig von
                            der Länge der fotografischen Begleitung, aber in der Regel könnt ihr mit circa 50-70 Bildern pro Stunde rechnen.
                            Diese sind alle in höchster Qualität sowie in meinem typischen Bildstil bearbeitet.
                            <br />
                            <br />
                            <br />
                            Eure Bilder bekommt ihr von mir nach der Hochzeit meist innerhalb von vier Wochen bis maximal sechs Wochen per
                            Post zu euch nach Hause geschickt. In meiner liebevoll verpackten Wedding-Box befindet sich euer USB-Stick mit
                            allen guten Bildern, die ich auf eurer Hochzeit erstellt haben.
                            <br />
                            <br />
                            <br />
                            {
                              "Zusätzlich zu dem USB-Stick lasse ich auch ein paar erste Bilder von eurer Hochzeit auf mattem Papier entwickeln. So habt ihr direkt etwas in der Hand zum Hinstellen oder weiter verschenken.\u00a0"
                            }
                            <br />
                            <br />
                            Für eure Hochzeit erstelle ich euch zudem eine eigene passwortgeschützte Online-Galerie mit allen guten Bildern
                            eurer Hochzeit. Diese könnt ihr bequem an eure Gäste weiter schicken, sodass diese ihre Lieblingsbilder ganz
                            einfach downloaden können.
                            <br />
                          </h5>
                          <h6 className="flex-element-type-tabs2__slide-lower-title" data-font=""></h6>
                        </div>,
                      ]}
                      slideAttrs={[
                        { "data-alt-title": "KENNENLERNGESPRÄCH" },
                        { "data-alt-title": "EUER TAG" },
                        { "data-alt-title": "SO GEHT ES WEITER" },
                      ]}
                    />
                  </div>
                  <div
                    className="flex-block__element flex-block__element--element_id_f94a881ba70a flex-block__element--tabs2 flex-block__element--block-blockID--741251cd8b5b"
                    data-only-device="mobile"
                  >
                    <Tabs2
                      id="f94a881ba70a"
                      className="flex-element-type-tabs2 flex-element-type-tabs2--elementRole-tabs flex-element-type-tabs2--layout-text flex-element-type-tabs2--layout-orientation-vertical flex-element-type-tabs2--slideType-oneSlide flex-element-type-tabs2--slideAnimation-normal flex-element-type-tabs2--imageSize-fill flex-element-type-tabs2--textAlign-center"
                      style={{
                        "--slideWidth": "19.375rem",
                        "--slideGap": "3.75rem",
                        "--slideSpeed": "200ms",
                        "--slideAnimationAmount": "100",
                        "--imageGap": "1.875rem",
                        "--titleGap": "1.125rem",
                        "--textGap": "1.125rem",
                        "--lowerTitleGap": "1.125rem",
                        "--imagePosition": "0%",
                        "--imageBorderRadius": "0rem",
                        "--imageWidth": "12.5rem",
                        "--imageHeight": "12.5rem",
                        "--titleColor": "#000000",
                        "--textColor": "var(--scheme_1--text--default)",
                        "--lowerTitleColor": "var(--scheme_1--text--default)",
                        "--textPaddings": "0rem",
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
                      speed={200}
                      slides={[
                        <div key="0" className="flex-element-type-tabs2__slide-text-content">
                          <h4 className="flex-element-type-tabs2__slide-title" data-font="title_3/xsmall"></h4>
                          <h5 className="flex-element-type-tabs2__slide-text" data-font="3114d2aa8c46">
                            {
                              "Eure Hochzeit ist nicht nur für euch ein besonderer Tag – auch für mich ist es wichtig, euch von Anfang an bestmöglich zu begleiten. Deshalb stehe ich euch nicht nur als Fotografin zur Seite, sondern auch als Unterstützung in der Planung. Vom ersten Kontakt bis zur finalen Übergabe eurer Bilder lege ich großen Wert darauf, eine vertrauensvolle und entspannte Atmosphäre zu schaffen.\u00a0"
                            }
                            <br />
                            <br />
                            Ein persönliches Kennenlerngespräch ist mir besonders wichtig, denn so können wir nicht nur offene Fragen
                            klären, sondern auch gemeinsam euren Tagesablauf durchgehen. Ich gebe euch wertvolle Tipps mit auf den Weg, die
                            euch helfen, eure Hochzeit entspannt zu genießen. Und egal, was euch bewegt – ihr könnt euch jederzeit bei mir
                            melden!
                            <br />
                          </h5>
                          <h6 className="flex-element-type-tabs2__slide-lower-title" data-font=""></h6>
                        </div>,
                        <div key="1" className="flex-element-type-tabs2__slide-text-content">
                          <h4 className="flex-element-type-tabs2__slide-title" data-font="title_3/xsmall"></h4>
                          <h5 className="flex-element-type-tabs2__slide-text" data-font="3114d2aa8c46">
                            Mit viel Leidenschaft und einem Gespür für die richtigen Momente bin ich an eurem großen Tag stets an eurer
                            Seite. Mir ist es wichtig, dass ihr euch in meiner Gegenwart wohlfühlt – denn nur so entstehen authentische
                            Aufnahmen, die eure Liebe und all die kleinen, bedeutungsvollen Augenblicke für immer festhalten.
                            <br />
                          </h5>
                          <h6 className="flex-element-type-tabs2__slide-lower-title" data-font=""></h6>
                        </div>,
                        <div key="2" className="flex-element-type-tabs2__slide-text-content">
                          <h4 className="flex-element-type-tabs2__slide-title" data-font="title_3/xsmall"></h4>
                          <h5 className="flex-element-type-tabs2__slide-text" data-font="3114d2aa8c46">
                            Bei jeder Hochzeitsreportage erhaltet ihr immer alle Bilder, die gut geworden sind. Die Anzahl ist abhängig von
                            der Länge der fotografischen Begleitung, aber in der Regel könnt ihr mit circa 50-70 Bildern pro Stunde rechnen.
                            Diese sind alle in höchster Qualität sowie in meinem typischen Bildstil bearbeitet.
                            <br />
                            <br />
                            <br />
                            Eure Bilder bekommt ihr von mir nach der Hochzeit meist innerhalb von vier Wochen bis maximal sechs Wochen per
                            Post zu euch nach Hause geschickt. In meiner liebevoll verpackten Wedding-Box befindet sich euer USB-Stick mit
                            allen guten Bildern, die ich auf eurer Hochzeit erstellt haben.
                            <br />
                            <br />
                            <br />
                            {
                              "Zusätzlich zu dem USB-Stick lasse ich auch ein paar erste Bilder von eurer Hochzeit auf mattem Papier entwickeln. So habt ihr direkt etwas in der Hand zum Hinstellen oder weiter verschenken.\u00a0"
                            }
                            <br />
                            <br />
                            Für eure Hochzeit erstelle ich euch zudem eine eigene passwortgeschützte Online-Galerie mit allen guten Bildern
                            eurer Hochzeit. Diese könnt ihr bequem an eure Gäste weiter schicken, sodass diese ihre Lieblingsbilder ganz
                            einfach downloaden können.
                            <br />
                          </h5>
                          <h6 className="flex-element-type-tabs2__slide-lower-title" data-font=""></h6>
                        </div>,
                      ]}
                      slideAttrs={[
                        { "data-alt-title": "KENNENLERNGESPRÄCH" },
                        { "data-alt-title": "EUER TAG" },
                        { "data-alt-title": "SO GEHT ES WEITER" },
                      ]}
                    />
                  </div>
                </TabsProvider>
              </div>
            </div>
          </div>
        </div>
        <div className="flo-block flex-block-root flo-block--infos-hochzeitsreportage-4">
          <div className="flo-block__container">
            <div className="alignfull flex-block flex-block--blockID--5fb4f7b7018b" data-block-id="blockID--5fb4f7b7018b">
              <div className="flex-block__main-container">
                <div
                  className="flex-block__element flex-block__element--element_id_93859 flex-block__element--image flex-block__element--block-blockID--5fb4f7b7018b"
                  data-only-device="desktop"
                >
                  <div style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }} className="flex-block__overlay"></div>
                  <FlexImg className="flex-img-tag" image={bilder.bild04} box={{ d: [100.2, 35.9], m: [100, 176] }} device="desktop" />
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_93859 flex-block__element--image flex-block__element--block-blockID--5fb4f7b7018b"
                  data-only-device="mobile"
                >
                  <div style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }} className="flex-block__overlay"></div>
                  <FlexImg className="flex-img-tag" image={bilder.bild04} box={{ d: [100.2, 35.9], m: [100, 176] }} device="mobile" />
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_72326 flex-block__element--text flex-block__element--block-blockID--5fb4f7b7018b flex-block__element--editorTagsFix"
                  data-only-device="desktop"
                >
                  <div data-font="ebfa9acd266d" className="flex-block__text-content height-auto">
                    <p>
                      <span style={{ color: "rgb(255, 255, 255)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          Unser gemeinsames Abenteuer
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_72326 flex-block__element--text flex-block__element--block-blockID--5fb4f7b7018b flex-block__element--editorTagsFix"
                  data-only-device="mobile"
                >
                  <div data-font="3114d2aa8c46" className="flex-block__text-content height-auto">
                    <p>
                      <span style={{ color: "rgb(255, 255, 255)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                          Unser gemeinsames Abenteuer
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_39633 flex-block__element--text flex-block__element--block-blockID--5fb4f7b7018b flex-block__element--editorTagsFix"
                  data-only-device="desktop"
                >
                  <div data-font="5366bb815584" className="flex-block__text-content height-auto">
                    <h2>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "NewYork" }}>
                          After Wedding Shooting
                        </span>
                      </span>
                    </h2>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_39633 flex-block__element--text flex-block__element--block-blockID--5fb4f7b7018b flex-block__element--editorTagsFix"
                  style={{ "--font-size": "2.5rem", "--line-height": "1em", "--letter-spacing": "0em" }}
                  data-only-device="mobile"
                >
                  <div className="flex-block__text-content height-auto">
                    <h2>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>
                        <span className="has-inline-font" style={{ fontFamily: "NewYork" }}>
                          After Wedding Shooting
                        </span>
                      </span>
                    </h2>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_30066 flex-block__element--text flex-block__element--block-blockID--5fb4f7b7018b flex-block__element--editorTagsFix"
                  data-only-device="desktop"
                >
                  <div data-font="3114d2aa8c46" className="flex-block__text-content height-auto">
                    <p>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>
                        Eine ganz tolle Möglichkeit, um an einem besonderen Ort Fotos in euren Hochzeitsoutfits zu machen oder um euren
                        Jahrestag mal auf eine unvergessliche Art zu feiern! Lasst mich super gern an euren Plänen teilhaben.
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  className="flex-block__element flex-block__element--element_id_30066 flex-block__element--text flex-block__element--block-blockID--5fb4f7b7018b flex-block__element--editorTagsFix"
                  data-only-device="mobile"
                >
                  <div data-font="3114d2aa8c46" className="flex-block__text-content height-auto">
                    <p>
                      <span style={{ color: "var(--scheme_1--background--default)" }}>
                        Eine ganz tolle Möglichkeit, um an einem besonderen Ort Fotos in euren Hochzeitsoutfits zu machen oder um euren
                        Jahrestag mal auf eine unvergessliche Art zu feiern! Lasst mich super gern an euren Plänen teilhaben.
                      </span>
                    </p>
                  </div>
                </div>
                <Link
                  href="/kontakt/"
                  className="flex-block__element flex-block__element--element_id_17723 flex-block__element--button flex-block__element--block-blockID--5fb4f7b7018b flex-block__element--editorTagsFix"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ "--font-size": "0.65625em", "--line-height": "1.05em", "--letter-spacing": "0.15em" }}
                  data-only-device="desktop"
                  prefetch={false}
                >
                  <span className="flex-block__element--button__content flex-block__element--button__content--hoverEffect-default">
                    <span className="flex-block__text-content">
                      <p>JETZT ANFRAGEN!</p>
                    </span>
                  </span>
                </Link>
                <Link
                  href="/kontakt/"
                  className="flex-block__element flex-block__element--element_id_17723 flex-block__element--button flex-block__element--block-blockID--5fb4f7b7018b flex-block__element--editorTagsFix"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ "--font-size": "0.65625em", "--line-height": "1.05em", "--letter-spacing": "0.15em" }}
                  data-only-device="mobile"
                  prefetch={false}
                >
                  <span className="flex-block__element--button__content flex-block__element--button__content--hoverEffect-default">
                    <span className="flex-block__text-content">
                      <p>JETZT ANFRAGEN!</p>
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flo-block flex-block-root flo-block--infos-hochzeitsreportage-5">
          <div className="flo-block__container">
            <div className="alignfull flex-block flex-block--blockID--30cd9a66d4a7" data-block-id="blockID--30cd9a66d4a7">
              <div className="flex-block__main-container">
                <TabsProvider>
                  <div
                    className="flex-block__element flex-block__element--element_id_368816ca9aec flex-block__element--tabs2 flex-block__element--block-blockID--30cd9a66d4a7"
                    data-only-device="desktop"
                  >
                    <Tabs2
                      id="368816ca9aec"
                      className="flex-element-type-tabs2 flex-element-type-tabs2--elementRole-tabs flex-element-type-tabs2--layout-text flex-element-type-tabs2--layout-orientation-vertical flex-element-type-tabs2--slideType-visibleNearby flex-element-type-tabs2--slideAnimation-normal flex-element-type-tabs2--imageSize-fill flex-element-type-tabs2--textAlign-left"
                      style={{
                        "--slideWidth": "21.25rem",
                        "--slideGap": "2.5rem",
                        "--slideSpeed": "600ms",
                        "--slideAnimationAmount": "100",
                        "--imageGap": "4.4375rem",
                        "--titleGap": "1rem",
                        "--textGap": "3.625rem",
                        "--lowerTitleGap": "1.125rem",
                        "--imagePosition": "0%",
                        "--imageBorderRadius": "0rem",
                        "--imageWidth": "12.5rem",
                        "--imageHeight": "7.375rem",
                        "--titleColor": "var(--scheme_1--text--default)",
                        "--textColor": "var(--scheme_1--text--default)",
                        "--lowerTitleColor": "var(--scheme_1--text--default)",
                        "--textPaddings": "0rem",
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
                      slides={FAQ.map((f, i) => (
                        <div key={i} className="flex-element-type-tabs2__slide-text-content">
                          <h4 className="flex-element-type-tabs2__slide-title" data-font="49e23bd1e31e">
                            {f.frage}
                          </h4>
                          <h5 className="flex-element-type-tabs2__slide-text" data-font="3114d2aa8c46">
                            {f.antwort}
                            <br />
                          </h5>
                          <h6 className="flex-element-type-tabs2__slide-lower-title" data-font="third_level/caption"></h6>
                        </div>
                      ))}
                      slideAttrs={FAQ.map(() => ({ "data-alt-title": "Tab" }))}
                    />
                  </div>
                  <div
                    className="flex-block__element flex-block__element--element_id_368816ca9aec flex-block__element--tabs2 flex-block__element--block-blockID--30cd9a66d4a7"
                    data-only-device="mobile"
                  >
                    <Tabs2
                      id="368816ca9aec"
                      className="flex-element-type-tabs2 flex-element-type-tabs2--elementRole-tabs flex-element-type-tabs2--layout-text flex-element-type-tabs2--layout-orientation-vertical flex-element-type-tabs2--slideType-visibleNearby flex-element-type-tabs2--slideAnimation-normal flex-element-type-tabs2--imageSize-fill flex-element-type-tabs2--textAlign-center"
                      style={{
                        "--slideWidth": "21.25rem",
                        "--slideGap": "2.5rem",
                        "--slideSpeed": "600ms",
                        "--slideAnimationAmount": "100",
                        "--imageGap": "4.4375rem",
                        "--titleGap": "1rem",
                        "--textGap": "3.625rem",
                        "--lowerTitleGap": "1.125rem",
                        "--imagePosition": "0%",
                        "--imageBorderRadius": "0rem",
                        "--imageWidth": "12.5rem",
                        "--imageHeight": "7.375rem",
                        "--titleColor": "var(--scheme_1--text--default)",
                        "--textColor": "var(--scheme_1--text--default)",
                        "--lowerTitleColor": "var(--scheme_1--text--default)",
                        "--textPaddings": "0rem",
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
                      slides={FAQ.map((f, i) => (
                        <div key={i} className="flex-element-type-tabs2__slide-text-content">
                          <h4 className="flex-element-type-tabs2__slide-title" data-font="49e23bd1e31e">
                            {f.frage}
                          </h4>
                          <h5 className="flex-element-type-tabs2__slide-text" data-font="3114d2aa8c46">
                            {f.antwort}
                            <br />
                          </h5>
                          <h6 className="flex-element-type-tabs2__slide-lower-title" data-font="third_level/caption"></h6>
                        </div>
                      ))}
                      slideAttrs={FAQ.map(() => ({ "data-alt-title": "Tab" }))}
                    />
                  </div>
                  <div
                    className="flex-block__element flex-block__element--element_id_a04ce6610564 flex-block__element--text flex-block__element--block-blockID--30cd9a66d4a7 flex-block__element--editorTagsFix"
                    data-only-device="desktop"
                  >
                    <div data-font="5366bb815584" className="flex-block__text-content height-auto">
                      <h2>
                        <span style={{ color: "var(--scheme_1--overline--default)" }}>
                          <span className="has-inline-font" style={{ fontFamily: "NewYork" }}>
                            FAQ
                          </span>
                        </span>
                      </h2>
                    </div>
                  </div>
                  <div
                    className="flex-block__element flex-block__element--element_id_a04ce6610564 flex-block__element--text flex-block__element--block-blockID--30cd9a66d4a7 flex-block__element--editorTagsFix"
                    data-only-device="mobile"
                  >
                    <div data-font="5366bb815584" className="flex-block__text-content height-auto">
                      <h2>
                        <span style={{ color: "var(--scheme_1--overline--default)" }}>
                          <span className="has-inline-font" style={{ fontFamily: "NewYork" }}>
                            FAQ
                          </span>
                        </span>
                      </h2>
                    </div>
                  </div>
                  <div className="flex-block__element flex-block__element--element_id_17bc6f5fd45b flex-block__element--tabs2-arrow flex-block__element--block-blockID--30cd9a66d4a7">
                    <Tabs2Arrow
                      id="368816ca9aec"
                      role="next"
                      style={{
                        "--color": "var(--scheme_1--text--default)",
                        "--color-hover": "var(--scheme_1--text--default)",
                        "--icon-size": "0.9375rem",
                        justifyContent: "center",
                      }}
                      icon="flo-flex-icon-next"
                    />
                  </div>
                  <div className="flex-block__element flex-block__element--element_id_cda38db27dd4 flex-block__element--tabs2-arrow flex-block__element--block-blockID--30cd9a66d4a7">
                    <Tabs2Arrow
                      id="368816ca9aec"
                      role="prev"
                      style={{
                        "--color": "var(--scheme_1--text--default)",
                        "--color-hover": "var(--scheme_1--text--default)",
                        "--icon-size": "0.9375rem",
                        justifyContent: "center",
                      }}
                      icon="flo-flex-icon-previous"
                    />
                  </div>
                </TabsProvider>
              </div>
            </div>
          </div>
        </div>
        <div className="flo-block flex-block-root flo-block--infos-hochzeitsreportage-6">
          <div className="flo-block__container"></div>
        </div>
        <SiteFooter />
      </div>
      <JsonLd data={pageGraph("infos-hochzeitsreportage")} />
    </main>
  );
}
