// Site-wide image optimization for the static export.
// - JPEGs: re-encode (mozjpeg-style) q80, resized in place, same filename.
// - Large project PNG photographs: converted to WebP q82 and the old .png removed.
//   (Code/content references must be updated separately from .png -> .webp.)
// Every output must end up <= 300 KB.
import { readdir, stat, unlink, writeFile } from 'node:fs/promises';
import { join, extname, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const IMAGES_DIR = join(ROOT, 'public/images');
const MAX_BYTES = 300 * 1024;

// Project PNG photographs to convert to WebP.
const PNG_TO_WEBP = new Set([
  'projects/carbon-market-carba.png',
  'projects/carbon-market-ceres.png',
  'projects/cea-project.png',
  'projects/energy-water-management.png',
  'projects/microgrid.png',
  'projects/water-system-modernization.png',
]);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

function longestEdge(rel) {
  // Team portraits get a smaller cap; everything else 1600.
  return rel.startsWith('team/') ? 800 : 1600;
}

// Encode a jpeg, retrying at lower quality then smaller dimensions until <= MAX_BYTES.
async function encodeJpeg(input, outPath, edge) {
  for (const e of [edge, Math.round(edge * 0.85), Math.round(edge * 0.7)]) {
    for (const q of [80, 72, 65, 58, 50, 44]) {
      const buf = await sharp(input)
        .resize({ width: e, height: e, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: q, mozjpeg: true })
        .toBuffer();
      const last = e === Math.round(edge * 0.7) && q === 44;
      if (buf.byteLength <= MAX_BYTES || last) {
        await sharp(buf).toFile(outPath);
        return { bytes: buf.byteLength, q, edge: e };
      }
    }
  }
}

async function encodeWebp(input, outPath, edge) {
  for (const q of [82, 74, 66, 58, 50]) {
    const buf = await sharp(input)
      .resize({ width: edge, height: edge, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: q, effort: 6 })
      .toBuffer();
    if (buf.byteLength <= MAX_BYTES || q === 50) {
      await sharp(buf).toFile(outPath);
      return { bytes: buf.byteLength, q };
    }
  }
}

const files = await walk(IMAGES_DIR);
for (const abs of files) {
  const rel = abs.slice(IMAGES_DIR.length + 1);
  const ext = extname(abs).toLowerCase();
  const before = (await stat(abs)).size;
  const edge = longestEdge(rel);

  if (PNG_TO_WEBP.has(rel)) {
    const outPath = join(dirname(abs), basename(abs, '.png') + '.webp');
    const input = await sharp(abs).toBuffer();
    const r = await encodeWebp(input, outPath, edge);
    await unlink(abs);
    console.log(`WEBP  ${rel} -> ${basename(outPath)}  ${(before / 1024).toFixed(0)}K -> ${(r.bytes / 1024).toFixed(0)}K (q${r.q})`);
    continue;
  }

  if (ext === '.jpg' || ext === '.jpeg') {
    if (before <= MAX_BYTES) {
      console.log(`SKIP  ${rel}  ${(before / 1024).toFixed(0)}K (already small)`);
      continue;
    }
    const input = await sharp(abs).toBuffer();
    const r = await encodeJpeg(input, abs, edge);
    console.log(`JPEG  ${rel}  ${(before / 1024).toFixed(0)}K -> ${(r.bytes / 1024).toFixed(0)}K (q${r.q})`);
    continue;
  }

  // Charts / graphic PNGs: leave untouched (all already < 300K).
  console.log(`KEEP  ${rel}  ${(before / 1024).toFixed(0)}K`);
}
