// Generates responsive WebP variants for every image referenced in content/**/*.json.
//
// - Sources live in content/media (managed via Pages CMS, see .pages.yml).
// - Variants are written to public/_img (gitignored) and cached in .next/cache/images,
//   which Vercel restores between builds, so only new or changed photos are processed.
// - A manifest (src/generated/images.json) gives components the intrinsic size and srcset.
//
// Runs automatically before `next dev` and `next build` (see package.json).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import os from 'node:os';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const CONTENT = path.join(ROOT, 'content');
const MEDIA = path.join(CONTENT, 'media');
const PUBLIC_OUT = path.join(ROOT, 'public', '_img');
const CACHE = path.join(ROOT, '.next', 'cache', 'images');
const MANIFEST = path.join(ROOT, 'src', 'generated', 'images.json');

const WIDTHS = [640, 1080, 1600, 2048, 2560];
const QUALITY = 76;
const VERSION = 'v4'; // bump to force regeneration of all variants

// Photographer credit embedded as XMP (shown by Google Images as "Credit"/"Copyright").
const XMP = `<?xpacket begin="" id="W5M0MpCehiHzreSzNTczkc9d"?><x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/" xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/" xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/"><dc:creator><rdf:Seq><rdf:li>Jana Vogel</rdf:li></rdf:Seq></dc:creator><dc:rights><rdf:Alt><rdf:li xml:lang="x-default">© Jana Vogel Fotografie – janavogelfotografie.de</rdf:li></rdf:Alt></dc:rights><photoshop:Credit>Jana Vogel Fotografie</photoshop:Credit><photoshop:City>Hagen</photoshop:City><photoshop:Country>Deutschland</photoshop:Country><xmpRights:Marked>True</xmpRights:Marked><xmpRights:WebStatement>https://janavogelfotografie.de/impressum/</xmpRights:WebStatement><Iptc4xmpCore:CreatorContactInfo rdf:parseType="Resource"><Iptc4xmpCore:CiUrlWork>https://janavogelfotografie.de/</Iptc4xmpCore:CiUrlWork><Iptc4xmpCore:CiEmailWork>info@janavogelfotografie.de</Iptc4xmpCore:CiEmailWork></Iptc4xmpCore:CreatorContactInfo></rdf:Description></rdf:RDF></x:xmpmeta><?xpacket end="w"?>`;

sharp.concurrency(1);

/** Collect every "/media/..." image path referenced in the content JSON files. */
function referencedImages() {
  const found = new Set();
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) { if (p !== MEDIA) walk(p); continue; }
      if (!entry.name.endsWith('.json')) continue;
      const visit = (v) => {
        if (typeof v === 'string' && /^\/media\/.+\.(jpe?g|png|webp|avif)$/i.test(v)) found.add(v);
        else if (Array.isArray(v)) v.forEach(visit);
        else if (v && typeof v === 'object') Object.values(v).forEach(visit);
      };
      visit(JSON.parse(fs.readFileSync(p, 'utf8')));
    }
  };
  walk(CONTENT);
  return [...found].sort();
}

const slug = (s) => s.normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-+|-+$/g, '');

async function processImage(src) {
  const file = path.join(CONTENT, src);
  if (!fs.existsSync(file)) return [src, null];
  const buf = fs.readFileSync(file);
  const hash = crypto.createHash('sha1').update(VERSION).update(buf).digest('hex').slice(0, 10);
  const rel = path.dirname(src.replace(/^\/media\//, ''));
  const base = slug(path.basename(src).replace(/\.\w+$/, ''));
  const cacheMeta = path.join(CACHE, rel, `${base}.${hash}.json`);

  let meta;
  if (fs.existsSync(cacheMeta)) {
    meta = JSON.parse(fs.readFileSync(cacheMeta, 'utf8'));
  } else {
    const image = sharp(buf, { failOn: 'none' }).rotate();
    const { width, height } = await image.metadata().then((m) => (m.autoOrient ? m.autoOrient : m));
    const longest = Math.max(width, height);
    const widths = WIDTHS.filter((w) => w < width);
    if (!widths.length || width - widths[widths.length - 1] > 200) widths.push(Math.min(width, 2560));
    const variants = [];
    for (const w of [...new Set(widths)]) {
      const name = `${base}.${hash}-${w}.webp`;
      const out = path.join(CACHE, rel, name);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      let pipeline = sharp(buf, { failOn: 'none' }).rotate().resize({ width: w }).webp({ quality: QUALITY, effort: 5 });
      if (w >= 1080) pipeline = pipeline.withXmp(XMP); // large variants are the ones search engines index
      await pipeline.toFile(out);
      variants.push([w, `/_img/${rel}/${name}`]);
    }
    meta = { w: width, h: height, v: variants };
    if (rel === 'seiten') {
      // share image for WhatsApp/Facebook/Pinterest previews: 1200×630 JPEG, cropped around the subject
      const name = `${base}.${hash}-og.jpg`;
      await sharp(buf, { failOn: 'none' })
        .rotate()
        // portraits: keep the top (faces), landscapes: crop around the most interesting area
        .resize(1200, 630, { fit: 'cover', position: height > width * 1.2 ? 'north' : sharp.strategy.attention })
        .jpeg({ quality: 82, mozjpeg: true })
        .withXmp(XMP)
        .toFile(path.join(CACHE, rel, name));
      meta.og = `/_img/${rel}/${name}`;
    }
    fs.writeFileSync(cacheMeta, JSON.stringify(meta));
  }
  // copy cached variants into public/
  for (const url of [...meta.v.map(([, u]) => u), ...(meta.og ? [meta.og] : [])]) {
    const from = path.join(CACHE, url.replace(/^\/_img\//, ''));
    const to = path.join(PUBLIC_OUT, url.replace(/^\/_img\//, ''));
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(from, to);
  }
  return [src, { w: meta.w, h: meta.h, v: meta.v, ...(meta.og && { og: meta.og }) }];
}

const started = Date.now();
const images = referencedImages();
fs.rmSync(PUBLIC_OUT, { recursive: true, force: true });
fs.mkdirSync(CACHE, { recursive: true });

const queue = [...images];
const manifest = {};
const errors = [];
const missing = [];
let processed = 0;
async function worker() {
  while (queue.length) {
    const src = queue.shift();
    try {
      const [k, v] = await processImage(src);
      if (v) manifest[k] = v;
      else missing.push(src);
    } catch (e) {
      errors.push(`${src}: ${e.message}`);
    }
    if (++processed % 50 === 0) console.log(`  … ${processed}/${images.length} Bilder`);
  }
}
await Promise.all(Array.from({ length: Math.max(2, os.availableParallelism()) }, worker));

if (missing.length) {
  // e.g. a photo was deleted in the CMS but is still referenced somewhere: the site is built without it
  console.warn('\n⚠ Diese Bilder werden verwendet, existieren aber nicht (werden ausgelassen):\n  content' + missing.join('\n  content'));
}
if (errors.length) {
  console.error('\nFehler bei Bildern:\n  ' + errors.join('\n  '));
  process.exit(1);
}
// drop cached variants of photos that were replaced or deleted (keeps the build cache small)
const keep = new Set(Object.values(manifest).flatMap((m) => [...m.v.map(([, url]) => url), ...(m.og ? [m.og] : [])].map((u) => u.replace(/^\/_img\//, ''))));
const keepMeta = new Set([...keep].map((f) => f.replace(/-(\d+\.webp|og\.jpg)$/, '.json')));
(function prune(dir, rel = '') {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const r = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) prune(path.join(dir, entry.name), r);
    else if (!keep.has(r) && !keepMeta.has(r)) fs.rmSync(path.join(dir, entry.name));
  }
})(CACHE);

fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
fs.writeFileSync(MANIFEST, JSON.stringify(sorted, null, 1) + '\n');
console.log(`✓ ${images.length} Bilder optimiert in ${((Date.now() - started) / 1000).toFixed(1)}s`);
