type BuildEnvironment = Record<string, string | undefined>;
function httpsOrigin(value?: string) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      url.pathname === "/" &&
      !url.search &&
      !url.hash
      ? url.origin
      : null;
  } catch {
    return null;
  }
}
export function getSitePolicy(env: BuildEnvironment = process.env) {
  const configured = httpsOrigin(env.SITE_URL);
  const approvedHost =
    configured === "https://www.bradydorsey.dev" ||
    configured === "https://bradydorsey.dev";
  // A new Netlify preview site also calls its main-branch context "production".
  // Require an explicit flag and the intended domain as well before indexing.
  const indexable =
    env.PORTFOLIO_INDEXING === "enabled" &&
    env.CONTEXT === "production" &&
    approvedHost;
  const origin = indexable
    ? configured!
    : (httpsOrigin(env.DEPLOY_PRIME_URL) ??
      httpsOrigin(env.DEPLOY_URL) ??
      httpsOrigin(env.URL) ??
      "http://127.0.0.1:3000");
  return { indexable, origin, canonicalOrigin: indexable ? configured : null };
}
