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
          <p>Impressum: https://janavogelfotografie.de/impressum/</p>
          <h2>DATENSCHUTZ</h2>
          <p>
            Sie können diese Website besuchen, ohne aktiv Kontaktangaben zu übermitteln. Technische Anfragedaten werden dabei wie im
            Abschnitt zum Hosting beschrieben verarbeitet. Wenn Sie Kontakt mit mir aufnehmen, verarbeite ich außerdem die von Ihnen
            übermittelten Angaben. Die Verarbeitung personenbezogener Daten richtet sich nach der Datenschutz-Grundverordnung (DSGVO) und
            den ergänzenden deutschen Datenschutzbestimmungen.
          </p>
          <h2>HOSTING</h2>
          <p>
            Diese Website wird über Vercel bereitgestellt. Für die Auslieferung und den Betrieb der Website verarbeitet der Hostinganbieter
            technische Anfragedaten, insbesondere Ihre IP-Adresse, die aufgerufene Adresse und die von Ihrem Browser übermittelten
            HTTP-Header. Auch Anfragen über das Kontaktformular werden auf der Hosting-Plattform verarbeitet.
          </p>
          <h2>KONTAKT</h2>
          <p>
            Sie können mich über das Kontaktformular oder per E-Mail erreichen. Die Angaben aus dem Kontaktformular werden serverseitig
            verarbeitet und per E-Mail an mein Postfach weitergeleitet. Ich verwende Ihre Angaben, um Ihre Anfrage zu bearbeiten und Ihnen
            zu antworten. Für die technische Verarbeitung und Übermittlung werden Vercel als Hostinganbieter und STRATO als Anbieter meines
            E-Mail-Postfachs eingesetzt.
          </p>
          <h2>EINBINDUNG VON DIENSTEN UND INHALTEN DRITTER</h2>
          <p>
            Die verwendeten Schriftarten werden zusammen mit dieser Website ausgeliefert. Es werden keine Schriftarten von Google Fonts und
            keine externen Social-Media-Widgets geladen.
          </p>
          <h2>INSTAGRAM</h2>
          <p>
            Auf dieser Website finden Sie einen Link zu meinem Instagram-Profil. Wenn Vorschaubilder von Instagram-Beiträgen angezeigt
            werden, sind diese mit dem jeweiligen Beitrag verlinkt. Die Vorschaubilder werden auf dem von mir genutzten Hosting
            zwischengespeichert und von dort geladen; beim Anzeigen dieser Vorschau stellt Ihr Browser keine Verbindung zu Instagram her.
            Ein Instagram-Widget ist nicht eingebunden. Wenn Sie einen Instagram-Link öffnen, verlassen Sie diese Website. Für die dortige
            Verarbeitung Ihrer Daten gelten die Datenschutzhinweise von Instagram: https://help.instagram.com/155833707900388.
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
