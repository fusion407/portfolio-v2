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
  // A new isolated project can also have a "production" environment. Require
  // the explicit flag and intended domain, and never let legacy context values
  // override Vercel's preview/development environment.
  const productionContext = env.VERCEL_ENV
    ? env.VERCEL_ENV === "production"
    : env.CONTEXT === "production";
  const indexable =
    env.PORTFOLIO_INDEXING === "enabled" && productionContext && approvedHost;
  const origin = indexable
    ? configured!
    : (vercelOrigin(env.VERCEL_URL) ??
      vercelOrigin(env.VERCEL_BRANCH_URL) ??
      httpsOrigin(env.DEPLOY_PRIME_URL) ??
      httpsOrigin(env.DEPLOY_URL) ??
      httpsOrigin(env.URL) ??
      "http://127.0.0.1:3000");
  return { indexable, origin, canonicalOrigin: indexable ? configured : null };
}

function vercelOrigin(value?: string) {
  return value && /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.vercel\.app$/i.test(value)
    ? httpsOrigin(`https://${value}`)
    : null;
}
