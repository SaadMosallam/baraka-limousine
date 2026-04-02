import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

/** Keep in sync with `src/lib/seo-landing.ts` — inlined here so next.config can load without `@/` imports. */
const SEO_PATH_LIMOUSINE_CAIRO_EN = "/limousine-cairo";
const SEO_PATH_AIRPORT_TRANSFER_EN = "/cairo-airport-transfer";
const SEO_PATH_LIMOUSINE_CAIRO_AR = "/ليموزين-القاهرة";
const SEO_PATH_AIRPORT_CAIRO_AR = "/ليموزين-مطار-القاهرة";

/** ASCII app-router segments — public URLs stay Arabic via rewrites (Turbopack dev 404s on Unicode segments). */
const SEO_INTERNAL_LIMOUSINE_CAIRO_AR = "/limousine-cairo-ar";
const SEO_INTERNAL_AIRPORT_CAIRO_AR = "/cairo-airport-ar";

/** Browsers send percent-encoded paths; Next must match both forms for rewrites/redirects. */
function pathSourcesForRewrite(canonicalPath: string): string[] {
  const encoded = encodeURI(canonicalPath);
  return canonicalPath === encoded
    ? [canonicalPath]
    : [canonicalPath, encoded];
}

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const seoRewrites = [
  ...pathSourcesForRewrite(SEO_PATH_LIMOUSINE_CAIRO_AR).map((source) => ({
    source,
    destination: `/ar${SEO_INTERNAL_LIMOUSINE_CAIRO_AR}`,
  })),
  ...pathSourcesForRewrite(SEO_PATH_AIRPORT_CAIRO_AR).map((source) => ({
    source,
    destination: `/ar${SEO_INTERNAL_AIRPORT_CAIRO_AR}`,
  })),
  ...pathSourcesForRewrite(`/ar${SEO_PATH_LIMOUSINE_CAIRO_AR}`).map(
    (source) => ({
      source,
      destination: `/ar${SEO_INTERNAL_LIMOUSINE_CAIRO_AR}`,
    })
  ),
  ...pathSourcesForRewrite(`/ar${SEO_PATH_AIRPORT_CAIRO_AR}`).map(
    (source) => ({
      source,
      destination: `/ar${SEO_INTERNAL_AIRPORT_CAIRO_AR}`,
    })
  ),
];

/** Naked English SEO paths → `/en/…` (locale prefix always). Arabic unchanged. */
const seoRedirects = [
  ...pathSourcesForRewrite(SEO_PATH_LIMOUSINE_CAIRO_EN).map((source) => ({
    source,
    destination: `/en${SEO_PATH_LIMOUSINE_CAIRO_EN}`,
    permanent: true as const,
  })),
  ...pathSourcesForRewrite(SEO_PATH_AIRPORT_TRANSFER_EN).map((source) => ({
    source,
    destination: `/en${SEO_PATH_AIRPORT_TRANSFER_EN}`,
    permanent: true as const,
  })),
];

const nextConfig: NextConfig = {
  async rewrites() {
    return seoRewrites;
  },
  async redirects() {
    return seoRedirects;
  },
};

export default withNextIntl(nextConfig);
