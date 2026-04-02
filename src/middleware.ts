import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { locales } from "@/i18n/config";
import { SEO_LANDING_PUBLIC_PATHS } from "@/lib/seo-landing";

const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: "ar",
  localePrefix: "always", // 🔴 VERY IMPORTANT
  /** SEO landings use different slugs per locale; next-intl's Link header would emit wrong hreflang (e.g. `/en/…` + Arabic slug). Alternates come from `generateMetadata` instead. */
  alternateLinks: false,
});

export default function middleware(request: NextRequest) {
  if (SEO_LANDING_PUBLIC_PATHS.has(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
