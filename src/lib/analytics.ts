/**
 * Cloudflare Web Analytics (cookieless, no fingerprinting). The site token is
 * public by design — it ships in every page. Documented in the privacy policy;
 * allowed in the CSP via static.cloudflareinsights.com / cloudflareinsights.com.
 * Manual snippet because automatic injection does not apply to Worker responses.
 */
export const CF_WEB_ANALYTICS_TOKEN = '309c965b67e642e3baf2b42a1ab3382a';
export const CF_BEACON_SRC = 'https://static.cloudflareinsights.com/beacon.min.js';
