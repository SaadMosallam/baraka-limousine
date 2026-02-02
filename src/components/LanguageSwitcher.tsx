"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
  // pathname is e.g. /ar/blog/airport-limo-tips or /en — replace first segment (locale) with nextLocale
  const pathWithoutLocale = pathname.replace(/^\/[^/]+/, "") || "/";
  const href = pathWithoutLocale === "/" ? `/${nextLocale}` : `/${nextLocale}${pathWithoutLocale}`;

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
