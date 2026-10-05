/** ISO date (YYYY-MM-DD) of the current build, used for dateModified/lastmod. */
export const BUILD_DATE = new Date().toISOString().slice(0, 10);

/**
 * RFC 9116 recommends an Expires value less than a year ahead.
 * 330 days after the build; any redeploy refreshes it.
 */
export const SECURITY_TXT_EXPIRES = (() => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + 330);
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString().replace('.000Z', 'Z');
})();
