// Rasterises public/favicon.svg into the PNG/ICO icons referenced by the
// layout and the web manifest. Run after changing the SVG:
//   node scripts/generate-icons.mjs
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const svg = await readFile(new URL('../public/favicon.svg', import.meta.url));
const out = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url));
const png = (size, density = 72 * (size / 64)) => sharp(svg, { density }).resize(size, size).png({ compressionLevel: 9 });

await png(180).flatten({ background: '#0a0b0d' }).toFile(out('apple-touch-icon.png'));
await png(192).toFile(out('icon-192.png'));
await png(512).toFile(out('icon-512.png'));

// Maskable: keep the mark inside the 80% safe zone on a full-bleed background.
const inner = await png(384).toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: '#0a0b0d' } })
  .composite([{ input: inner, left: 64, top: 64 }])
  .png({ compressionLevel: 9 })
  .toFile(out('icon-maskable-512.png'));

// favicon.ico containing a 32x32 and a 16x16 PNG (ICO allows embedded PNG data).
const images = await Promise.all([32, 16].map((s) => png(s).toBuffer()));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = 6 + 16 * images.length;
const entries = images.map((img, i) => {
  const size = [32, 16][i];
  const e = Buffer.alloc(16);
  e.writeUInt8(size, 0);
  e.writeUInt8(size, 1);
  e.writeUInt8(0, 2);
  e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(img.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += img.length;
  return e;
});
await writeFile(out('favicon.ico'), Buffer.concat([header, ...entries, ...images]));
console.log('icons written to public/');
