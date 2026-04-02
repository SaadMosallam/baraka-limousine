"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSeoLandingAlternatePath } from "@/lib/seo-landing";

type LanguageSwitcherProps = {
  nextLocale: string;
  className?: string;
  children: React.ReactNode;
};

export function LanguageSwitcher({
  nextLocale,
  className,
  children,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const normalized =
    pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;

  const seoHref = getSeoLandingAlternatePath(
    normalized,
    nextLocale === "en" || nextLocale === "ar" ? nextLocale : "en"
  );

  if (seoHref) {
    return (
      <Link href={seoHref} className={className}>
        {children}
      </Link>
    );
  }

  // pathname is e.g. /ar/blog/airport-limo-tips or /en — replace first segment (locale) with nextLocale
  const pathWithoutLocale = pathname.replace(/^\/[^/]+/, "") || "/";
  const href =
    pathWithoutLocale === "/"
      ? `/${nextLocale}`
      : `/${nextLocale}${pathWithoutLocale}`;

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
