# Automatischer Instagram-Feed

Der Footer zeigt bis zu sechs **echte, neueste zugängliche Beiträge** von
[@janazuenkeler](https://www.instagram.com/janazuenkeler/). Das Konto ist laut Jana
professionell. Die Live-Aktivierung setzt Meta-Autorisierung, zwei konfigurierte
Vercel-Blob-Stores und vollständige Production-Umgebungsvariablen voraus. Im
verwendeten Vercel-Team bleibt **Hobby** auf ausdrücklichen Wunsch bestehen.
Ein Upgrade ist für diese Umsetzung nicht vorgesehen.

Ohne vollständige Konfiguration oder erfolgreichen Erstabruf erscheint kein
Raster. Der bestehende Instagram-Profillink bleibt bestehen. Es gibt keine
statischen Ersatzbilder und keine öffentlich zugängliche Test-Route.

## Datenfluss und Aktualisierung

- `vercel.json` plant `/api/instagram/sync/` täglich um **04:17 UTC**. Der abschließende
  Slash ist wegen `trailingSlash: true` wichtig: Cron verfolgt keine Redirects.
  Auf Hobby erfolgt der Aufruf innerhalb der geplanten Stunde; es ist keine
  minutengenaue Aktualitätsgarantie.
- Eine serverseitige Meta-Abfrage liest den Benutzernamen und bis zu 25 Beiträge
  mit Field Expansion. Der Benutzername muss `janazuenkeler` sein. Anschließend
  werden die sechs neuesten nach Veröffentlichungsdatum ausgewählt. Angeheftete
  Profilreihenfolge wird nicht übernommen; von anderen Konten veröffentlichte
  Collaboration-Posts sind unter Umständen nicht in dieser API verfügbar.
- Neue/geänderte Vorschaubilder werden nur von den Meta-CDNs geladen, auf 640×640
  WebP zugeschnitten und ohne EXIF im **öffentlichen** Blob-Store gespeichert.
  Videos verwenden ausschließlich ihr Vorschaubild, Karussells ihr Titelbild.
  Originalvideos und Musik werden nicht übernommen.
- Der **private** Store enthält `instagram/<account-id>/snapshot.json`,
  `token.json`, `status.json` und eine kurzlebige `sync-lock.json`.
  Das Manifest wird erst ersetzt, wenn alle sechs Bilder erfolgreich gespeichert
  wurden. Ein Fehler belässt den letzten vollständigen Stand. Ein leerer,
  erfolgreich gelesener Account entfernt das sichtbare Raster.
- Eine Sperre mit ETag-Vergleich verhindert konkurrierende Aufrufe. Weitere
  Aufrufe innerhalb einer Stunde nach Erfolg benötigen keinen Meta-Request.
- Beim normalen Betrieb entstehen ungefähr 30 Meta-Abfragen pro Monat, zusätzlich
  Token-Erneuerungen und Bilddownloads bei Änderungen. Keine Meta-Abfragen bei
  Besucheraufrufen. Die Website liest ausschließlich ihren gespeicherten Stand.
- Die Server-Komponente cached den gelesenen Stand sechs Stunden, spätestens nach
  zwölf Stunden wird synchron neu gelesen. Erfolgreicher Sync invalidiert den Cache
  unmittelbar; neue Beiträge müssen nicht sechs Stunden warten. Diese zusätzliche
  Cache-Frist begrenzt Blob-Lesezugriffe, nicht die täglichen Meta-Abfragen.
  Es ist kein Redeploy für neue Beiträge nötig.
- Bei Fehlern wird ein neutraler Fehlercode geloggt und ein privater Status
  gespeichert. Nach **26 Stunden** ist der Status überfällig. Ab **72 Stunden**
  ohne erfolgreichen Abruf wird das Raster beim nächsten Cache-Refresh verborgen
  (spätestens zwölf Stunden später), bis ein Sync wieder gelingt.
  Der letzte gute Snapshot wird dabei nicht gelöscht.
- Ersetzte Bilder werden nach einem Tag entfernt, damit noch gecachte Seiten
  weiter funktionieren. Fehlgeschlagene Löschungen werden beim nächsten Sync erneut
  versucht. Bildkopien landen nicht im Git-Repository.

Browser laden nur Bilder aus dem eigenen Vercel-Blob-Store. Es gibt keine
Instagram-Embeds, Meta-Skripte, Cookies oder Browseraufrufe zu Meta. Erst der Klick
auf einen Beitrag öffnet Instagram. Bildtexte werden als normaler JSX-Text/`alt`
ausgegeben. Quell-URLs mit Signaturen und Zugangsdaten gelangen nicht ins HTML.

## Einmalige Einrichtung

1. **Bestehendes Vercel-Hobby-Projekt verwenden.** Blob und täglicher Cron sind
   auf Hobby möglich; ein Upgrade ist für diese Umsetzung nicht vorgesehen.
   Enthalten sind derzeit insgesamt 1 GB Blob-Speicher, 10.000 einfache, 2.000
   erweiterte Operationen und 10 GB Blob-Transfer. Öffentliche und private Stores
   teilen sich die Kontingente; zwei Stores verdoppeln sie nicht. Bei Überschreitung
   stoppt der Blob-Zugriff, es entstehen auf Hobby keine Zusatzgebühren. Vercel
   verschickt Warnungen vor dem Limit; Verbrauch im Dashboard kontrollieren.
   Sechs kleine Vorschaubilder, täglicher Sync und der sechsstündige Seiten-Cache
   sind hierfür sparsam ausgelegt. Browser-/CDN-Bildzugriffe und andere Projekte
   verbrauchen ebenfalls Kontingente; keine feste Besucherzahl ist garantiert.
2. **Die zwei vorhandenen Blob-Stores verwenden:** `jana-instagram-media` (`public`)
   für Fotos und `jana-instagram-state` (`private`) für Manifest, Zugang und Status.
   Beide liegen wie das Projekt in `fra1` und werden ausschließlich mit **Production** verbunden.
   Keine Produktions-Schreibrechte für beliebige Preview-Deployments freigeben.
   Bevorzugte Authentifizierung: Projektverknüpfung und Vercel OIDC, mit den beiden
   Store-IDs in den unten genannten Variablen. Die Connect-Präfixe lauten
   `INSTAGRAM_PUBLIC` beziehungsweise `INSTAGRAM_PRIVATE`; dadurch erzeugt Vercel
   die passenden `*_BLOB_STORE_ID`-Variablen. Statische Read-write-Tokens bleiben
   deaktiviert. Die automatisch zusätzlich erzeugten Webhook-Public-Keys werden
   für diesen Feed nicht benötigt. Die SDK-Aufrufe setzen die
   Zugriffsart ausdrücklich; ein falsch öffentlicher Token-Store soll fehlschlagen.
3. **Meta-App und Instagram-Zugriff unter Janas Kontrolle einrichten.** Für den
   implementierten `instagram-login`-Modus nur `instagram_business_basic`
   anfordern. Jana autorisiert ihr eigenes Konto; keine Passwortweitergabe.
   Standard Access ist für eigene/verwaltete Konten mit passender App-Rolle
   dokumentiert. Aus dem autorisierten Konto die numerische Account-ID und einen
   **langfristigen 60-Tage-Token** samt tatsächlichem Ablaufdatum beziehen.
   Kein einstündiges Token einsetzen. App-Secret gehört nicht in den Browser.
4. **Production-Umgebungsvariablen setzen** (Werte ausschließlich im Vercel-Dashboard
   beziehungsweise Secret-Manager, niemals Git oder Chat):
   - `CRON_SECRET`: zufällige mindestens 32 Zeichen; Vercel schickt diesen Wert im
     `Authorization: Bearer …`-Header. Beide Verwaltungsendpunkte prüfen ihn.
   - `INSTAGRAM_ACCOUNT_ID`: numerische ID von Janas Konto.
   - `INSTAGRAM_ACCESS_TOKEN`: initialer Langzeit-Token.
   - `INSTAGRAM_TOKEN_EXPIRES_AT`: dessen tatsächliches Ablaufdatum als ISO-8601 UTC.
   - `INSTAGRAM_AUTH_MODE=instagram-login`.
   - `INSTAGRAM_GRAPH_VERSION=v27.0` (bei späteren API-Upgrades gezielt prüfen).
   - `INSTAGRAM_PUBLIC_BLOB_STORE_ID`: ID des öffentlichen Foto-Stores.
   - `INSTAGRAM_PRIVATE_BLOB_STORE_ID`: ID des privaten Zustands-Stores.
5. **Deployen, dann den Cron einmal manuell im Vercel-Dashboard auslösen.** Die
   Variablen werden erst durch ein neues Deployment übernommen. Der Sync muss
   `outcome: updated` und die tatsächliche Anzahl Beiträge liefern. Anschließend
   Raster mobil/desktop, sechs richtige Postlinks und den nächsten täglichen
   automatischen Lauf prüfen. Cron läuft nur auf Production, nicht auf Previews.

Das SDK bevorzugt OIDC anhand der Store-ID. Nur wenn lokale Entwicklung oder eine
bestehende Einrichtung Read-write-Tokens benötigt, können zusätzlich die beiden
serverseitigen Variablen `INSTAGRAM_PUBLIC_BLOB_READ_WRITE_TOKEN` und
`INSTAGRAM_PRIVATE_BLOB_READ_WRITE_TOKEN` gesetzt werden. Sie dürfen ausschließlich zum jeweils
passenden Store gehören. Lokale Secrets nur in gitignorierten `.env.local`-Dateien.

Meta empfiehlt für neue Integrationen inzwischen auch **Unified Login**. Falls
die konkrete Meta-App diesen Weg verwendet, unterstützt der Code
`INSTAGRAM_AUTH_MODE=system-user` mit `graph.facebook.com`, passendem
`instagram_basic`-Lesezugriff und einem für dieses Konto autorisierten
System-User-Token. Dessen Laufzeit wird im Meta-App-Dashboard festgelegt; das
Instagram-Refresh-Verfahren ist dafür nicht gültig. Ein Token ohne Ablaufdatum
kann mit leerem `INSTAGRAM_TOKEN_EXPIRES_AT` verwendet werden; bei einem befristeten
Token dessen Datum setzen und rechtzeitig neu autorisieren. Vor Aktivierung den
tatsächlichen App-/Token-Typ bestätigen, nicht die beiden Login-Flows mischen.

## Token-Erneuerung und Fehlerprüfung

Im `instagram-login`-Modus wird bei weniger als 30 verbleibenden Tagen erneuert.
Der zurückgegebene Token samt Ablaufdatum wird sofort **privat und dauerhaft**
gespeichert, bevor Bilder abgerufen werden. Spätere Aufrufe und Deployments nutzen
diesen Stand. Die ursprüngliche Env-Variable muss nicht alle 60 Tage geändert
werden. Ist ein Token bereits abgelaufen oder widerrufen, ist Janas erneute
Autorisierung nötig; ein abgelaufener Token lässt sich nicht refreshen.

Nach bewusster Neuautorisierung den neuen initialen Token und sein Ablaufdatum in
Vercel setzen und neu deployen. Eine geänderte Bootstrap-Token-Prüfsumme aktiviert
den neuen Zugang beim nächsten Sync, ohne den zuletzt angezeigten Feed vorab zu
löschen. Token-Werte, API-Antworttexte und signierte URLs werden nicht geloggt.

`GET /api/instagram/status/` mit demselben Bearer-Header ist rein lesend und liefert
`lastSuccessfulSync`, `postCount`, `ageHours`, `overdue`, `visible`, `lastAttempt`.
Es gibt keine öffentlichen Status- oder Secret-Antworten. Status- und Sync-Antworten
haben `Cache-Control: private, no-store`.

Zur Betriebsabnahme gehören ein erfolgreicher automatischer Folgelauf und die
Kontrolle der Vercel-Logs auf `[instagram]`. Für dauerhaften Betrieb sollte ein
verantwortlicher Maintainer den privaten Status beziehungsweise Fehlermeldungen
überwachen. Im Rahmen dieser Änderung wurde kein externer Alarmdienst angelegt.

## Tests ohne Kontozugang

`npm run test:instagram` prüft Neueste-Auswahl, Videocover, erlaubte Downloadziele,
geschützte Endpunkte, atomare Veröffentlichung, Fehlerbeibehaltung, persistierte
Token-Erneuerung, doppelte Aufrufe und wiederholte Bildbereinigung. Die Tests nutzen
ausschließlich lokale Testdaten und benötigen keine Netzwerkzugänge.

`tests/instagram/preview.tsx` ist ein isolierter visueller Test der echten
`InstagramFeedGrid`-Komponente. Beispiel für einen **temporären** Ausgabeordner:

```sh
mkdir -p /tmp/jana-instagram-preview
./node_modules/.bin/esbuild tests/instagram/preview.tsx --bundle --outfile=/tmp/jana-instagram-preview/preview.js --loader:.module.css=local-css
```

Eine temporäre `index.html` lädt `preview.js` und `preview.css` und enthält
`<div id="root"></div>`. Sechs vorhandene Projektfotos als `photo-0.webp` bis
`photo-5.webp` in diesen Ordner kopieren; mit einem lokalen HTTP-Server prüfen.
Der Test ist ausdrücklich als Layout-Test gekennzeichnet. Bei 390 px müssen drei
Spalten und zwei Zeilen, bei 1440 px sechs Spalten und eine Zeile sichtbar sein.
Nichts davon wird in `src/app` oder `public` abgelegt. Zusätzlich den normalen
Production-Build ohne Instagram-Variablen prüfen: kein Raster, keine Platzhalter.

## Quellen

- [Meta Instagram Login](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login)
- [Meta Token-Erneuerung](https://developers.facebook.com/documentation/instagram-platform/reference/refresh_access_token)
- [Meta Unified Login](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-unified-login/authentication)
- [Vercel Blob SDK: OIDC, private Reads und bedingte Writes](https://vercel.com/docs/vercel-blob/using-blob-sdk)
- [Vercel Cron: Authentifizierung, Duplikate und Redirects](https://vercel.com/docs/schedules/cron-jobs/manage-cron-jobs)
- [Vercel Blob Preise](https://vercel.com/docs/vercel-blob/usage-and-pricing)

Nur Fotos verwenden, deren Veröffentlichung auf der Website freigegeben ist.
Die Instagram-Veröffentlichung allein ersetzt diese Freigabe nicht.
