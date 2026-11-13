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
            Es kann vorkommen, dass innerhalb dieses Onlineangebotes Inhalte Dritter, wie zum Beispiel Videos von YouTube, Kartenmaterial
            von Google-Maps, Google Fonts, RSS-Feeds oder Grafiken von anderen Webseiten eingebunden werden. Dies setzt immer voraus, dass
            die Anbieter dieser Inhalte (nachfolgend bezeichnet als „Dritt-Anbieter“) die IP-Adresse der Nutzer wahrnehmen. Denn ohne die
            IP-Adresse, könnten sie die Inhalte nicht an den Browser des jeweiligen Nutzers senden. Die IP-Adresse ist damit für die
            Darstellung dieser Inhalte erforderlich. Ich bemühe mich nur solche Inhalte zu verwenden, deren jeweilige Anbieter die
            IP-Adresse lediglich zur Auslieferung der Inhalte verwenden. Jedoch habe ich keinen Einfluss darauf, falls die Dritt-Anbieter
            die IP-Adresse z.B. für statistische Zwecke speichern. Soweit dies mir bekannt ist, kläre ich die Nutzer darüber auf.
          </p>
          <h2>INSTAGRAM</h2>
          <p>
            Ich setze auf meiner Website den Dienst Instagram ein. Instagram ist ein Service der Instagram Inc. Durch den eingebundenen
            „Insta“-Button auf meiner Seite erhält Instagram die Information, dass Sie die entsprechende Seite meines Internetauftritts
            aufgerufen haben. Sind Sie bei Instagram eingeloggt, kann Instagram diesen Besuch auf meiner Seite Ihrem Instagram -Konto
            zuordnen und die Daten somit verknüpfen. Die durch Anklicken des „Insta“-Buttons übermittelten Daten werden von Instagram
            gespeichert. Zu Zweck und Umfang der Datenerhebung, deren Verarbeitung und Nutzung sowie Ihren diesbezüglichen Rechten und
            Einstellungsmöglichkeiten zum Schutz Ihrer Privatsphäre erhalten Sie weitere Informationen in den Instagram
            -Datenschutzhinweisen, die Sie
          </p>
          <p>
            über&nbsp;https://help.instagram.com/155833707900388&nbsp;abrufen können. Um zu verhindern, dass Instagram den Besuch meiner
            Seite Ihrem Instagram-Konto zuordnen kann, müssen Sie sich vor dem Besuch meiner Seite von Ihrem Instagram-Account abmelden.
          </p>
          <h2>PINTEREST</h2>
          <p>
            Innerhalb meines Onlineangebotes können Funktionen und Inhalte des Dienstes Pinterest, angeboten durch die Pinterest Inc., 635
            High Street, Palo Alto, CA, 94301, USA, eingebunden werden. Hierzu können z.B. Inhalte wie Bilder, Videos oder Texte und
            Schaltflächen gehören, mit denen Nutzer Inhalte dieses Onlineangebotes innerhalb von Pinterest teilen können. Sofern die Nutzer
            Mitglieder der Plattform Pinterest sind, kann Pinterest den Aufruf der o.g. Inhalte und Funktionen den dortigen Profilen der
            Nutzer zuordnen. Datenschutzerklärung von Pinterest:&nbsp;https://about.pinterest.com/de/privacy-policy.
          </p>
          <h2>GOOGLE ANALYTICS</h2>
          <p>
            Ich setze auf Grundlage meiner berechtigten Interessen (d.h. Interesse an der Analyse, Optimierung und wirtschaftlichem Betrieb
            meines Onlineangebotes im Sinne des Art. 6 Abs. 1 lit. f. DSGVO) Google Analytics, einen Webanalysedienst der Google LLC
            („Google“) ein. Google verwendet Cookies. Die durch das Cookie erzeugten Informationen über Benutzung des Onlineangebotes durch
            die Nutzer werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
          </p>
          <p>
            Google ist unter dem Privacy-Shield-Abkommen zertifiziert und bietet hierdurch eine Garantie, das europäische Datenschutzrecht
            einzuhalten (https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&status=Active).
          </p>
          <p>
            Google wird diese Informationen in meinem Auftrag benutzen, um die Nutzung meines Onlineangebotes durch die Nutzer auszuwerten,
            um Reports über die Aktivitäten innerhalb dieses Onlineangebotes zusammenzustellen und um weitere, mit der Nutzung dieses
            Onlineangebotes und der Internetnutzung verbundene Dienstleistungen, mir gegenüber zu erbringen. Dabei können aus den
            verarbeiteten Daten pseudonyme Nutzungsprofile der Nutzer erstellt werden.
          </p>
          <p>
            Ich setze Google Analytics nur mit aktivierter IP-Anonymisierung ein. Das bedeutet, die IP-Adresse der Nutzer wird von Google
            innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen
            Wirtschaftsraum gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und
            dort gekürzt.
          </p>
          <p>
            Die von dem Browser des Nutzers übermittelte IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt. Die Nutzer
            können die Speicherung der Cookies durch eine entsprechende Einstellung ihrer Browser-Software verhindern; die Nutzer können
            darüber hinaus die Erfassung der durch das Cookie erzeugten und auf ihre Nutzung des Onlineangebotes bezogenen Daten an Google
            sowie die Verarbeitung dieser Daten durch Google verhindern, indem sie das unter folgendem Link verfügbare Browser-Plugin
            herunterladen und installieren:&nbsp;http://tools.google.com/dlpage/gaoptout?hl=de.
          </p>
          <p>
            Weitere Informationen zur Datennutzung durch Google, Einstellungs- und Widerspruchsmöglichkeiten, erfahren Sie in der
            Datenschutzerklärung von Google (https://policies.google.com/technologies/ads) sowie in den Einstellungen für die Darstellung
            von Werbeeinblendungen durch Google (https://adssettings.google.com/authenticated).Die personenbezogenen Daten der Nutzer werden
            nach 14 Monaten gelöscht oder anonymisiert.
          </p>
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
