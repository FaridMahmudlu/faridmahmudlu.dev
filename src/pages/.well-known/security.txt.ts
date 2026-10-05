import type { APIRoute } from 'astro';
import { SITE_URL } from '../../data/profile';
import { SECURITY_TXT_EXPIRES } from '../../lib/build';

// RFC 9116. The contact is a URL (not a mailto:) so the address stays out of
// plain-text files; the policy page reveals it to humans.
export const GET: APIRoute = () =>
  new Response(
    [
      `Contact: ${SITE_URL}/security/`,
      `Expires: ${SECURITY_TXT_EXPIRES}`,
      'Preferred-Languages: en, az, hu',
      `Canonical: ${SITE_URL}/.well-known/security.txt`,
      `Policy: ${SITE_URL}/security/`,
      '',
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
