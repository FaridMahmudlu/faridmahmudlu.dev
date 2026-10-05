import type { APIRoute } from 'astro';
import { t } from '../i18n';

export const GET: APIRoute = () => {
  const d = t('en');
  const manifest = {
    name: `Farid Mahmudlu — ${d.meta.jobTitle}`,
    short_name: 'Farid Mahmudlu',
    description: d.meta.homeDescription,
    lang: 'en',
    dir: 'ltr',
    start_url: '/',
    scope: '/',
    display: 'browser',
    background_color: '#0a0b0d',
    theme_color: '#0a0b0d',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
  });
};
