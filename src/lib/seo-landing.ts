import type { Metadata } from "next";
import { siteInfo } from "@/data/siteInfo";
import { buildOpenGraph, buildTwitter, getBaseUrl } from "@/lib/seo";

/** Locale-relative SEO slugs (use with `/en` or `/ar` prefix for public URLs). */
export const SEO_PATH_LIMOUSINE_CAIRO_EN = "/limousine-cairo";
export const SEO_PATH_AIRPORT_TRANSFER_EN = "/cairo-airport-transfer";
export const SEO_PATH_LIMOUSINE_CAIRO_AR = "/ليموزين-القاهرة";
export const SEO_PATH_AIRPORT_CAIRO_AR = "/ليموزين-مطار-القاهرة";

function addEncodedPathVariant(set: Set<string>, path: string) {
  set.add(path);
  const encoded = encodeURI(path);
  if (encoded !== path) set.add(encoded);
}

/** Includes percent-encoded variants — middleware sees encoded URLs from many clients. */
export const SEO_LANDING_PUBLIC_PATHS = new Set<string>();
addEncodedPathVariant(SEO_LANDING_PUBLIC_PATHS, SEO_PATH_LIMOUSINE_CAIRO_EN);
addEncodedPathVariant(SEO_LANDING_PUBLIC_PATHS, SEO_PATH_AIRPORT_TRANSFER_EN);
addEncodedPathVariant(SEO_LANDING_PUBLIC_PATHS, SEO_PATH_LIMOUSINE_CAIRO_AR);
addEncodedPathVariant(SEO_LANDING_PUBLIC_PATHS, SEO_PATH_AIRPORT_CAIRO_AR);

export type SeoLandingPair = {
  en: string;
  ar: string;
};

export const SEO_LANDING_PAIRS: SeoLandingPair[] = [
  { en: SEO_PATH_LIMOUSINE_CAIRO_EN, ar: SEO_PATH_LIMOUSINE_CAIRO_AR },
  { en: SEO_PATH_AIRPORT_TRANSFER_EN, ar: SEO_PATH_AIRPORT_CAIRO_AR },
];

/** App Router segments for Arabic pages only — must match `next.config.ts` rewrite destinations (not public URLs). */
const SEO_INTERNAL_SEGMENT_LIMOUSINE_AR = "limousine-cairo-ar";
const SEO_INTERNAL_SEGMENT_AIRPORT_AR = "cairo-airport-ar";

/** Use in `<Link href>` — matches `localePrefix: "always"` (`/en/…`, `/ar/…`). */
export function getSeoLandingHref(segment: string): string {
  if (
    segment === SEO_PATH_LIMOUSINE_CAIRO_AR ||
    segment === SEO_PATH_AIRPORT_CAIRO_AR
  ) {
    return `/ar${segment}`;
  }
  if (
    segment === SEO_PATH_LIMOUSINE_CAIRO_EN ||
    segment === SEO_PATH_AIRPORT_TRANSFER_EN
  ) {
    return `/en${segment}`;
  }
  return segment;
}

/** Public URL path after domain (for canonicals, JSON-LD, sitemap). */
export function getSeoLandingPublicPath(
  locale: "en" | "ar",
  segment: string
): string {
  if (locale === "ar") return `/ar${segment}`;
  return `/en${segment}`;
}

function pathWithoutLocalePrefix(pathname: string): string {
  if (pathname === "/ar" || pathname === "/en") return "/";
  if (pathname.startsWith("/ar/")) return pathname.slice(3);
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}

export function getSeoLandingAlternatePath(
  pathname: string,
  targetLocale: "en" | "ar"
): string | null {
  let normalized = pathname.replace(/\/$/, "") || "/";
  try {
    normalized = decodeURIComponent(normalized);
  } catch {
    /* keep pathname as-is */
  }
  const pathPart = pathWithoutLocalePrefix(normalized);
  for (const pair of SEO_LANDING_PAIRS) {
    if (pathPart === pair.en || pathPart === pair.ar) {
      if (targetLocale === "en") return `/en${pair.en}`;
      return `/ar${pair.ar}`;
    }
  }
  if (pathPart === `/${SEO_INTERNAL_SEGMENT_LIMOUSINE_AR}`) {
    if (targetLocale === "en") return `/en${SEO_PATH_LIMOUSINE_CAIRO_EN}`;
    return `/ar${SEO_PATH_LIMOUSINE_CAIRO_AR}`;
  }
  if (pathPart === `/${SEO_INTERNAL_SEGMENT_AIRPORT_AR}`) {
    if (targetLocale === "en") return `/en${SEO_PATH_AIRPORT_TRANSFER_EN}`;
    return `/ar${SEO_PATH_AIRPORT_CAIRO_AR}`;
  }
  return null;
}

type BuildSeoLandingMetadataArgs = {
  locale: "en" | "ar";
  canonicalPath: string;
  title: string;
  description: string;
};

export function buildSeoLandingMetadata({
  locale,
  canonicalPath,
  title,
  description,
}: BuildSeoLandingMetadataArgs): Metadata {
  const baseUrl = getBaseUrl();
  const publicPath = getSeoLandingPublicPath(locale, canonicalPath);
  const canonical = `${baseUrl}${publicPath}`;
  const pair = SEO_LANDING_PAIRS.find(
    (p) => p.en === canonicalPath || p.ar === canonicalPath
  );

  const languages: Record<string, string> = {};
  if (pair) {
    languages.en = `${baseUrl}/en${pair.en}`;
    languages.ar = `${baseUrl}/ar${pair.ar}`;
  } else {
    languages[locale] = canonical;
  }

  return {
    title: { absolute: title },
    description,
    alternates: { canonical, languages },
    openGraph: {
      ...buildOpenGraph(locale, publicPath, title, description),
      url: canonical,
    },
    twitter: buildTwitter(title, description),
    robots: { index: true, follow: true },
  };
}

type FAQ = { question: string; answer: string };

export function buildSeoLandingJsonLd(args: {
  locale: "en" | "ar";
  canonicalPath: string;
  name: string;
  description: string;
  serviceName: string;
  serviceType: string[];
  faqs: FAQ[];
}) {
  const baseUrl = getBaseUrl();
  const publicPath = getSeoLandingPublicPath(args.locale, args.canonicalPath);
  const url = `${baseUrl}${publicPath}`;

  const localBusiness = {
    "@type": "LocalBusiness",
    "@id": `${url}#business`,
    name: args.name,
    description: args.description,
    url: baseUrl,
    telephone: [siteInfo.phoneE164, siteInfo.phoneE1642],
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Cairo",
      containedInPlace: {
        "@type": "Country",
        name: "Egypt",
      },
    },
  };

  const service = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: args.serviceName,
    serviceType: args.serviceType,
    provider: { "@id": `${url}#business` },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Cairo",
      containedInPlace: { "@type": "Country", name: "Egypt" },
    },
    url,
  };

  const faq =
    args.faqs.length > 0
      ? {
          "@type": "FAQPage",
          "@id": `${url}#faq`,
          mainEntity: args.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  return {
    "@context": "https://schema.org",
    "@graph": [localBusiness, service, ...(faq ? [faq] : [])],
  };
}
