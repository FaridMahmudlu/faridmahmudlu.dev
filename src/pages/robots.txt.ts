import type { APIRoute } from 'astro';
import { SITE_URL } from '../data/profile';

// AI search and answer engines are explicitly welcome, so they can cite this
// site accurately (GEO / AEO). Groups follow RFC 9309.
const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Amazonbot',
  'DuckAssistBot',
  'MistralAI-User',
  'meta-externalagent',
  'CCBot',
];

export const GET: APIRoute = () =>
  new Response(
    [
      '# faridmahmudlu.dev',
      '# All crawlers are welcome, including AI search and answer engines.',
      '# A structured summary for language models lives at /llms.txt',
      '',
      'User-agent: *',
      'Allow: /',
      'Disallow: /cdn-cgi/',
      '',
      ...AI_AGENTS.map((a) => `User-agent: ${a}`),
      'Allow: /',
      'Disallow: /cdn-cgi/',
      '',
      `Sitemap: ${SITE_URL}/sitemap.xml`,
      '',
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
