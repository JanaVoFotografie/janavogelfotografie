# Jana Vogel Fotografie – janavogelfotografie.de

1:1-Nachbau der bisherigen WordPress-Website (Theme „June“ von Flothemes + Flex Builder) als schlanke
**Next.js 16**-Seite. Aussehen und Funktionen sind identisch, aber ohne WordPress, PHP, Datenbank,
jQuery & Co.:

|                         | WordPress (alt)          | Next.js (neu)                     |
| ----------------------- | ------------------------ | --------------------------------- |
| Lighthouse Performance  | 31–56                    | 90–100                            |
| Largest Contentful Paint (Mobil) | 12–16 s          | ~3 s                              |
| Startseite (Übertragung) | 3,2 MB, HTML ungezippt 340 KB | 0,9 MB, HTML 19 KB            |
| Auslieferung            | 1 Server bei Strato      | statisch über das Vercel-CDN      |
| Bilder                  | JPEG bis 3.200 px        | WebP in 4–5 Größen, automatisch   |
| Schriften               | Google Fonts (extern)    | selbst gehostet (DSGVO-freundlich) |

## Inhalt

- [Lokal starten](#lokal-starten)
- [Deployment auf Vercel](#deployment-auf-vercel)
- [Kontaktformular einrichten (SMTP)](#kontaktformular-einrichten-smtp)
- [Für Jana: Fotos verwalten](#für-jana-fotos-verwalten)
- [SEO](#seo)
- [Wie das Projekt aufgebaut ist](#wie-das-projekt-aufgebaut-ist)
- [Offene Punkte](#offene-punkte)

## Lokal starten

Voraussetzung: Node.js ≥ 20.9

```bash
npm install
npm run dev        # http://localhost:3000
```

`npm run dev` und `npm run build` erzeugen vorher automatisch die optimierten Bilder (`scripts/images.mjs`).
Beim ersten Mal dauert das ca. 30 Sekunden, danach kommen die Bilder aus dem Cache.

```bash
npm run build && npm start    # Produktions-Build lokal testen
```

## Deployment auf Vercel

Das Repository liegt öffentlich unter
[github.com/JanaVoFotografie/janavogelfotografie](https://github.com/JanaVoFotografie/janavogelfotografie).
Jana ist die Besitzerin, Moritz ist Mitarbeiter (Collaborator).

> **Das Repository muss öffentlich bleiben, solange Vercel im kostenlosen Hobby-Plan läuft.** Bei privaten Repos
> deployt Vercel dort nur Commits der Kontoinhaberin, Commits von Mitarbeitern werden blockiert. Öffentlich ist hier
> unbedenklich: Im Code stehen keine Passwörter (die SMTP-Zugangsdaten liegen nur in Vercel), und die Fotos im Repo
> sind bei den empfohlenen ~2.500 px nicht größer als die, die die Website ohnehin ausliefert.

1. Mit Janas GitHub-Konto auf [vercel.com/signup](https://vercel.com/signup) über **„Continue with GitHub“** ein
   Vercel-Konto anlegen.
2. Auf [vercel.com/new](https://vercel.com/new) das Repository importieren. Das Framework „Next.js“ wird erkannt,
   weitere Einstellungen sind nicht nötig. Die Serverless-Funktion fürs Kontaktformular läuft in Frankfurt (`vercel.json`).
3. Umgebungsvariablen fürs Kontaktformular eintragen (siehe unten).
4. Domain verbinden: In Vercel ist `janavogelfotografie.de` schon als Hauptdomain eingetragen, `www.` leitet per 308
   dorthin um. Bei Strato diese DNS-Einträge setzen (sie stehen auch in Vercel unter *Settings → Domains*):

   | Typ   | Name | Wert                                   |
   | ----- | ---- | -------------------------------------- |
   | A     | @    | `216.198.79.1`                         |
   | CNAME | www  | `6c212f6a3068a6bf.vercel-dns-017.com.` |

   Den **AAAA-Eintrag (IPv6)** bei Strato entfernen, sonst landen manche Besucher weiter auf dem alten Server.
   **Die MX-Einträge (E-Mail) bei Strato nicht anfassen**, sonst funktioniert das Postfach nicht mehr.

> ⚠️ **Vercel „Hobby“ (kostenlos) ist laut Vercel-Nutzungsbedingungen nur für nicht-kommerzielle Projekte erlaubt.**
> Eine Website, die Fotografie-Leistungen bewirbt, gilt dort als kommerziell
> ([Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage)).
> Sauber ist der Pro-Plan (20 $/Monat). Kostenlose Alternativen mit erlaubter kommerzieller Nutzung sind z. B.
> Netlify oder Cloudflare – dafür müsste nur das Kontaktformular angepasst werden, der Rest ist statisch.

Alte WordPress-URLs bleiben gleich (inkl. Schrägstrich am Ende). Alles andere aus der WordPress-Zeit wird
umgeleitet – siehe [SEO](#seo).

## Kontaktformular einrichten (SMTP)

Das Formular (`/kontakt/`) schickt die Anfragen per E-Mail über das bestehende Postfach – es gibt keinen
Drittanbieter und keine Datenbank. In Vercel unter *Project → Settings → Environment Variables*:

| Variable       | Wert (Beispiel Strato)            |
| -------------- | --------------------------------- |
| `SMTP_HOST`    | `smtp.strato.de`                  |
| `SMTP_PORT`    | `465`                             |
| `SMTP_USER`    | `info@janavogelfotografie.de`     |
| `SMTP_PASS`    | Passwort des Postfachs            |
| `CONTACT_TO`   | optional, Empfänger (Standard: info@…) |

Danach einmal neu deployen. Antworten auf eine Anfrage gehen direkt an die E-Mail-Adresse aus dem Formular.
Spam wird über ein unsichtbares Feld (Honeypot) abgefangen. Lokal ohne SMTP-Daten werden Anfragen nur in der
Konsole ausgegeben (Vorlage: `.env.example` → `.env.local`).

## Für Jana: Fotos verwalten

Fotos werden mit **[Pages CMS](https://pagescms.org)** verwaltet. Das ist kostenlos (Open Source, kein Abo), läuft im
Browser und braucht keine Programmierkenntnisse.

**Einmalig einrichten (mit Janas GitHub-Konto `JanaVoFotografie`), am 4. November 2026 erledigt**

1. Auf [app.pagescms.org](https://app.pagescms.org) mit **„Sign in with GitHub“** anmelden.
2. Pages CMS bittet darum, seine GitHub-App zu installieren. GitHub zeigt dabei eine Art Bestellseite
   („Plans and pricing – *100% free plan* – **$0** – Install it for free“). Das ist **kein Abo**, sondern
   GitHubs Standard-Ablauf für kostenlose Apps. Einfach bestätigen und als Zugriff nur das Repository
   `janavogelfotografie` auswählen.

**Anmelden**: Danach genügt auf [app.pagescms.org](https://app.pagescms.org) **„Sign in with GitHub“**. Die $0-Seite
kommt nur bei der ersten Installation.

**Galerie bearbeiten** (*Galerie: Hochzeiten / Paare / Familien*)

- *Fotos hinzufügen*: Bilder hochladen (mehrere gleichzeitig möglich) und auswählen.
- *Fotos entfernen*: beim jeweiligen Foto auf Entfernen klicken.
- *Reihenfolge ändern*: Fotos per Drag & Drop verschieben.
- **Speichern** – nach 1–2 Minuten ist die Änderung live. Die Spalten der Galerie ordnen sich automatisch neu.

**Einzelne Seitenbilder tauschen** (*Seitenbilder: …*): Jedes Foto der Seiten (Slideshow, Titelbilder, Leistungen,
„Love letters“ usw.) hat ein eigenes Feld. Das Foto wird automatisch auf den Ausschnitt zugeschnitten.
Bitte immer auch die **Bildbeschreibung** ausfüllen (was ist zu sehen?) – das hilft bei Google.

**Tipps**

- Am besten JPGs exportieren mit ca. 2.500 px an der langen Kante und ~80 % Qualität (z. B. aus Lightroom).
  Größere Dateien funktionieren auch, machen das Projekt aber unnötig groß.
- Nur Fotos hochladen, die auch auf die Website dürfen, und keine Originale in voller Kamera-Auflösung: Das
  Repository ist öffentlich, alle hochgeladenen Dateien sind dort einsehbar, auch wenn sie nirgends verwendet werden.
- Die Bildbeschreibung (Alt-Text) hilft bei Google – ein kurzer Satz reicht.
- Galerie-Fotos mit sprechenden Dateinamen hochladen, z. B. `hochzeit-hagen-freie-trauung-1.jpg` statt `DSC01234.jpg` –
  daraus entsteht automatisch der Bildtext für Google.
- Ein Foto aus der Mediathek löschen, das noch irgendwo verwendet wird? Kein Problem – es wird dann einfach
  ausgelassen; die Website bleibt online.

## SEO

Was die Seite für Google & Co. mitbringt (ohne sichtbare Änderungen am Design):

- **Titel & Beschreibungen** pro Seite mit lokalen Suchbegriffen („Hochzeitsfotografin Hagen & NRW“, „Paarshooting“,
  „Familienfotografin“ …) – zentral in `src/lib/seo.ts`.
- **Überschriften-Struktur**: genau eine H1 pro Seite (Startseite: Logo mit beschreibendem Text), darunter H2/H3 –
  der Flex Builder hatte alles als normalen Absatz ausgegeben. Englische Überschriften sind als `lang="en"` markiert.
- **Strukturierte Daten** (JSON-LD, `src/lib/structured-data.ts`): lokales Unternehmen mit Adresse, Einsatzgebiet
  (Hagen, Dortmund, Bochum, Wuppertal, Ruhrgebiet, Sauerland …), Leistungen inkl. „Hochzeitsreportage ab 2.200 €“,
  Person (Jana), Breadcrumbs pro Seite und die FAQ der Info-Seite (`src/data/faq.ts` – dort ändern, gilt für Seite und Google).
- **Bilder**: beschreibende Alt-Texte; Galerie-Fotos bekommen ihren Text automatisch aus dem Dateinamen
  (z. B. „…Getting-Ready…“ → „Getting Ready am Hochzeitsmorgen – …“). Alle großen Bildvarianten enthalten
  Urheber-Angaben (XMP), die Google Bilder als „Credit/Copyright: Jana Vogel Fotografie“ anzeigt.
- **Sitemap mit Bildern** (`/sitemap.xml`), `robots.txt`, `llms.txt` (Kurzprofil für KI-Suchen wie ChatGPT/Perplexity).
- **Vorschaubilder** für WhatsApp, Facebook & Pinterest: pro Seite ein 1200×630-JPEG, automatisch auf das Motiv zugeschnitten.
- **Weiterleitungen** für alles aus der WordPress-Zeit (`src/lib/old-urls.ts`): alte Seiten, Sitemaps, `?page_id=…`
  und alle alten Bild-Adressen (`/wp-content/uploads/…`) zeigen per 301 auf den neuen Ort. Unbekannte Adressen
  landen auf der thematisch passendsten Seite (z. B. alles mit „hochzeit“ → `/hochzeiten/`), sonst auf der Startseite.
- **Ladezeit/Core Web Vitals**: Lighthouse 90–100 (siehe oben) – ein direkter Ranking-Faktor.

**Nach dem Umzug (wichtig!)**

1. Die Search Console für `janavogelfotografie.de` öffnen (bzw. als Domain-Property per DNS bestätigen) und
   `https://janavogelfotografie.de/sitemap.xml` einreichen.
2. Unter „Seiten“ / „Crawling-Statistiken“ in den ersten Wochen auf 404-Fehler achten – Bedarf für weitere
   Weiterleitungen in `src/lib/old-urls.ts` ergänzen.
3. Falls die alte Seite in der Search Console oder bei Pinterest per Meta-Tag/HTML-Datei bestätigt wurde: den Code unter
   `metadata.verification` in `src/app/layout.tsx` eintragen bzw. die Datei nach `public/` legen
   (Pinterest: „Website beanspruchen“).

**Was außerhalb der Website am meisten bringt**

- **Google-Unternehmensprofil** (Google Maps) anlegen/pflegen: Kategorie „Hochzeitsfotograf“ + „Fotograf“, Fotos,
  Leistungen – und vor allem Bewertungen von Brautpaaren sammeln. Das ist für „Hochzeitsfotograf Hagen“ der wichtigste
  Hebel. Name, Adresse und Telefon exakt wie im Impressum schreiben.
- **Einträge/Backlinks**: Hochzeitsportale und Dienstleister-Verzeichnisse (z. B. WeddyPlace, Hochzeitsportal24,
  Hochzeitslocations aus der Region, mit denen Jana gearbeitet hat).
- **Inhalte**: Echte Hochzeiten als eigene Seiten/Blogbeiträge mit Location-Namen („Hochzeit auf Schloss Hohenlimburg“)
  und eigene Seiten für Nachbarstädte – dafür kann die Seite später leicht erweitert werden.

## Wie das Projekt aufgebaut ist

```
content/
  media/                 Original-Fotos (über Pages CMS verwaltet)
  galerien/*.json        Fotos der drei Galerien
  seiten/*.json          Fotos der einzelnen Seiten
scripts/images.mjs       erzeugt beim Build WebP-Varianten (640–2560 px) → public/_img (nicht im Git)
src/app/                 eine Datei pro Seite (page.tsx + page.css mit den Positionen aus dem Flex Builder)
src/components/          Header, Mobilmenü, Slideshow, Galerie + Lightbox, Tabs/Karussells, Kontaktformular, Footer
src/styles/wp.css        das Original-CSS des Themes – automatisch auf die tatsächlich genutzten Regeln reduziert
src/styles/site.css      Ersatz für die früheren jQuery-Plugins (Slider, Lightbox, Masonry, Lazy Loading)
.pages.yml               Konfiguration des CMS
```

Ein paar Hintergründe:

- Der Flex Builder positioniert jedes Element absolut in `em`, wobei `1em = 1,25vw` (Desktop) bzw. `4,27vw` (Mobil).
  Diese Positionen stehen unverändert in den `page.css`-Dateien – deshalb ist das Layout pixelgenau gleich.
- Elemente, die es nur auf Desktop oder Mobil gibt, werden mit `data-only-device` per CSS ein-/ausgeblendet
  (früher per JavaScript).
- Die Masonry-Galerie berechnet die Spalten beim Build (wie Masonry.js bei 1440 px Breite) – kein JavaScript, kein Springen.
- Alle Seiten werden beim Build statisch erzeugt (`ensureStatic = "navigation"` im Layout), nur `/api/kontakt` ist eine Funktion.
- Texte stehen direkt in den `page.tsx`-Dateien; Änderungen dort brauchen einen Entwickler (bzw. Claude).
  Ausnahme: die FAQ (`src/data/faq.ts`) und die SEO-Texte (`src/lib/seo.ts`, `src/lib/business.ts`).

## Offene Punkte

- **Datenschutzerklärung aktualisieren** (bitte rechtlich prüfen lassen): Hosting ist jetzt Vercel (statt Strato),
  das Kontaktformular verschickt per E-Mail, Google Analytics/Google Fonts werden nicht mehr genutzt, es werden keine
  Cookies gesetzt. Der Cookie-Hinweis ist aus optischen Gründen noch drin, technisch aber nicht mehr nötig –
  entfernen: `<CookieNotice />` in `src/app/layout.tsx` löschen.
- `wp-backup/` enthält alle Original-Uploads der alten Seite (≈ 300 MB, nicht im Git) – bitte sichern,
  bevor die WordPress-Seite abgeschaltet wird.
