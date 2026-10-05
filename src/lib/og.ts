import fs from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { mulberry32 } from '../scripts/signal/formations';
import { SITE_HOST, profile } from '../data/profile';

const FONT_DIR = path.resolve('src/assets/og-fonts');

type Font = { name: string; data: Buffer; weight: 400 | 600; style: 'normal' };
let fontsPromise: Promise<Font[]> | null = null;

function loadFonts() {
  fontsPromise ??= (async () => {
    const read = (f: string) => fs.readFile(path.join(FONT_DIR, f));
    const entries: [string, string, 400 | 600][] = [
      ['Archivo', 'Archivo-Display', 600],
      ['Archivo', 'Archivo-Text', 400],
      ['Martian', 'MartianMono', 400],
    ];
    return Promise.all(
      entries.map(async ([name, file, weight]) => ({ name, data: await read(`${file}.ttf`), weight, style: 'normal' as const })),
    );
  })();
  return fontsPromise;
}

/** A projected particle "core" — the same motif as the hero formation. */
function particleSvg(seed: number) {
  const r = mulberry32(seed);
  const size = 520;
  const c = size / 2;
  const dots: string[] = [];
  const tilt = 0.45;
  const project = (x: number, y: number, z: number) => {
    const yy = y * Math.cos(tilt) - z * Math.sin(tilt);
    const zz = y * Math.sin(tilt) + z * Math.cos(tilt);
    const s = 1 / (1 - zz * 0.18);
    return { px: c + x * 150 * s, py: c + yy * 150 * s, depth: zz };
  };
  for (let i = 0; i < 1500; i++) {
    const u = r() * 2 - 1;
    const th = r() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    const { px, py, depth } = project(s * Math.cos(th), u, s * Math.sin(th));
    const a = (0.18 + (depth + 1) * 0.3).toFixed(2);
    dots.push(`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(1 + (depth + 1) * 0.5).toFixed(2)}" fill="#ece9e2" fill-opacity="${a}"/>`);
  }
  for (let i = 0; i < 420; i++) {
    const t = r() * Math.PI * 2;
    const R = 1.45;
    const x = Math.cos(t) * R;
    const z = Math.sin(t) * R;
    const { px, py, depth } = project(x, z * 0.18, z);
    dots.push(`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(1.1 + (depth + 1.5) * 0.4).toFixed(2)}" fill="#ff5a1f" fill-opacity="0.85"/>`);
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${dots.join('')}</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): Node => ({
  type,
  props: { style, children, ...extra },
});

export interface OgInput {
  kicker: string;
  title: string;
  subtitle: string;
  seed: number;
}

export async function renderOg({ kicker, title, subtitle, seed }: OgInput): Promise<Buffer> {
  const fonts = await loadFonts();
  const titleSize = title.length > 30 ? 64 : title.length > 20 ? 80 : 104;

  const tree = h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      position: 'relative',
      backgroundColor: '#0a0b0d',
      color: '#ece9e2',
      fontFamily: 'Archivo',
      padding: '56px 64px',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    [
      h('img', { position: 'absolute', right: '-150px', top: '40px', width: '560px', height: '560px', opacity: 0.85 }, undefined, {
        src: particleSvg(seed),
        width: 560,
        height: 560,
      }),
      h(
        'div',
        { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Martian', fontSize: '20px', letterSpacing: '0.02em' },
        [
          h('div', { display: 'flex', alignItems: 'center' }, [
            h('div', { width: '14px', height: '14px', backgroundColor: '#ff5a1f', marginRight: '16px' }),
            h('div', { display: 'flex' }, profile.name.toUpperCase()),
          ]),
          h('div', { display: 'flex', color: '#a3a09a' }, SITE_HOST),
        ],
      ),
      h('div', { display: 'flex', flexDirection: 'column', maxWidth: '820px' }, [
        h('div', { display: 'flex', fontFamily: 'Martian', fontSize: '20px', color: '#ff5a1f', marginBottom: '22px', letterSpacing: '0.04em' }, kicker.toUpperCase()),
        h('div', { display: 'flex', fontSize: `${titleSize}px`, fontWeight: 600, letterSpacing: '-0.045em', lineHeight: 0.95 }, title),
        h('div', { display: 'flex', fontSize: '28px', color: '#a3a09a', marginTop: '28px', lineHeight: 1.35, maxWidth: '700px' }, subtitle),
      ]),
      h('div', { display: 'flex', alignItems: 'center' }, [
        h('div', { display: 'flex', height: '2px', width: '180px', backgroundColor: '#ff5a1f' }),
        h('div', { display: 'flex', height: '1px', flexGrow: 1, backgroundColor: 'rgba(236,233,226,0.2)' }),
      ]),
    ],
  );

  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], { width: 1200, height: 630, fonts });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: false }).toBuffer();
}
