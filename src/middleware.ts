import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { locales } from "@/i18n/config";
import { SEO_LANDING_PUBLIC_PATHS } from "@/lib/seo-landing";

const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: "ar",
  localePrefix: "always", // 🔴 VERY IMPORTANT
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
