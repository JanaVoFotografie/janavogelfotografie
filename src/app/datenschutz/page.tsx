import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { pageGraph } from "@/lib/structured-data";
import "./page.css";

export const metadata = pageMetadata("datenschutz");

export default function Page() {
  return (
    <main className="flo_page_wrap">
      <div className="flo_page">
        <SiteHeader page="datenschutz" current="/datenschutz/" />
        <article className="privacy-policy" aria-labelledby="privacy-policy-title">
          <h1 id="privacy-policy-title">DATENSCHUTZERKLÄRUNG</h1>
          <p>
            Ich freue mich, dass Sie meine Webseite besuchen und bedanke mich für Ihr Interesse an meiner Arbeit. Mir ist es sehr wichtig,
            verantwortungsvoll mit Ihren persönlichen Daten umzugehen. Die Beachtung der Datenschutzbestimmungen bei der Verwendung Ihrer
            personenbezogenen Daten ist für mich daher eine Selbstverständlichkeit. Ich möchte, dass Ihr Besuch auf dieser Website sicher
            ist und Sie sich wohl fühlen.
          </p>
          <h2>VERANTWORTLICHER</h2>
          <p>Jana Vogel</p>
          <p>Holthauser Straße 31</p>
          <p>58093 Hagen</p>
          <p>Deutschland</p>
          <p>info@janavogelfotografie.de</p>
          <p>Impressum: http://janavogelfotografie.de/impressum</p>
          <h2>DATENSCHUTZ</h2>
          <p>
            Die Nutzung meiner Seite ist ohne eine Angabe von personenbezogenen Daten möglich. Für die Nutzung einzelner Services meiner
            Seite können sich hierfür abweichende Regelungen ergeben, die in diesem Falle nachstehend gesondert erläutert werden. Ihre
            personenbezogenen Daten (z.B. Name, Anschrift, E-Mail, Telefonnummer, u.ä.) werden von mir nur gemäß den Bestimmungen des
            deutschen Datenschutzrechts verarbeitet. Daten sind dann personenbezogen, wenn sie eindeutig einer bestimmten natürlichen Person
            zugeordnet werden können. Die rechtlichen Grundlagen des Datenschutzes finden Sie im Bundesdatenschutzgesetz (BDSG) und dem
            Telemediengesetz (TMG). Nachstehende Regelungen informieren Sie insoweit über die Art, den Umfang und Zweck der Erhebung, die
            Nutzung und die Verarbeitung von personenbezogenen Daten durch den Anbieter.
          </p>
          <h2>KONTAKT</h2>
          <p>
            Auf meiner Website biete ich Ihnen die Möglichkeit, mit mir per E-Mail in Verbindung zu treten. In diesem Fall werden die vom
            Nutzer gemachten Angaben zum Zwecke der Bearbeitung seiner Kontaktaufnahme gespeichert. Eine Weitergabe an Dritte erfolgt nicht.
            Ein Abgleich der so erhobenen Daten mit Daten, die möglicherweise durch andere Komponenten meiner Seite erhoben werden, erfolgt
            ebenfalls nicht.
          </p>
          <h2>EINBINDUNG VON DIENSTEN UND INHALTEN DRITTER</h2>
          <p>
            Die verwendeten Schriftarten werden zusammen mit dieser Website ausgeliefert. Es werden keine Schriftarten von Google Fonts und
            keine externen Social-Media-Widgets geladen.
          </p>
          <h2>INSTAGRAM</h2>
          <p>
            Auf dieser Website finden Sie Links zu meinem Instagram-Profil und zu einzelnen Instagram-Beiträgen. Die Vorschaubilder werden
            auf dem von mir genutzten Hosting zwischengespeichert und von dort geladen; beim Anzeigen dieser Vorschau stellt Ihr Browser
            keine Verbindung zu Instagram her. Ein Instagram-Widget ist nicht eingebunden. Wenn Sie einen Instagram-Link öffnen, verlassen
            Sie diese Website. Für die dortige Verarbeitung Ihrer Daten gelten die Datenschutzhinweise von Instagram:
            https://help.instagram.com/155833707900388.
          </p>
          <h2>PINTEREST</h2>
          <p>
            Diese Website enthält einen Link zu meinem Pinterest-Profil. Ein Pinterest-Widget ist nicht eingebunden. Wenn Sie den Link
            öffnen, verlassen Sie diese Website. Für die dortige Verarbeitung Ihrer Daten gelten die Datenschutzhinweise von Pinterest:
            https://about.pinterest.com/de/privacy-policy.
          </p>
          <h2>COOKIES UND WEBANALYSE</h2>
          <p>Auf dieser Website werden keine Cookies zu Analyse- oder Werbezwecken gesetzt. Google Analytics wird nicht eingesetzt.</p>
          <h2>AUSKUNFT/WIDERRUF/LÖSCHUNG</h2>
          <p>
            Sie können sich aufgrund des Bundesdatenschutzgesetzes bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer
            personenbezogenen Daten und deren Berichtigung, Sperrung, Löschung oder einem Widerruf einer erteilten Einwilligung
            unentgeltlich an mich wenden. Ich weise darauf hin, dass Ihnen ein Recht auf Berichtigung falscher Daten oder Löschung
            personenbezogener Daten zusteht, sollte diesem Anspruch keine gesetzliche Aufbewahrungspflicht entgegenstehen.
          </p>
          <p>
            Ich behalte mir das Recht vor, diese Datenschutzbestimmungen jederzeit unter Beachtung der jeweils geltenden
            datenschutzrechtlichen Bestimmungen zu ändern.
          </p>
        </article>
        <SiteFooter />
      </div>
      <JsonLd data={pageGraph("datenschutz")} />
    </main>
  );
}
