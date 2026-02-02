import Link from "next/link";
import Image from "next/image";
import { ContactActions } from "./ContactActions";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { getTranslations } from "next-intl/server";
import { MobileNav } from "@/components/MobileNav";
import { ServicesDropdown } from "@/components/ServicesDropdown";
import { siteInfo } from "@/data/siteInfo";
import { isServiceExcludedFromNav } from "@/data/serviceFilters";
import { Suspense } from "react";
import { Translate } from "@phosphor-icons/react/dist/ssr";

export async function Header(props: { locale: string }) {
  const locale = props.locale;
  const t = await getTranslations({ locale });
  const nextLocale = locale === "ar" ? "en" : "ar";
  const localePath = (path: string) =>
    `/${locale}${path === "/" ? "" : path}`;

  const serviceItems = (t.raw("servicesItems") as { id: string; title: string }[])
    .filter((item) => !isServiceExcludedFromNav(item.id))
    .map((item) => ({ id: item.id, title: item.title }));

  const navLinks = [
    { href: "/about", label: t("navAbout") },
    { href: "/blog", label: t("navBlog") },
    { href: "/contact", label: t("navContact") },
  ];

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-zinc-100 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90">
      <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between gap-6 px-6">
        <Link href={localePath("/")} className="flex items-center">
          <Image
            src="/logo.svg"
            alt={t("siteName")}
            width={40}
            height={40}
            priority
            className="h-10 w-10 md:h-16 md:w-16 object-contain"
          />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-zinc-700 dark:text-zinc-300 md:flex">
          <Link href={localePath("/about")} className="hover:text-emerald-600 dark:hover:text-emerald-400">
            {t("navAbout")}
          </Link>
          <ServicesDropdown
            locale={locale}
            label={t("navServices")}
            items={serviceItems}
          />
          <Link href={localePath("/blog")} className="hover:text-emerald-600 dark:hover:text-emerald-400">
            {t("navBlog")}
          </Link>
          <Link href={localePath("/contact")} className="hover:text-emerald-600 dark:hover:text-emerald-400">
            {t("navContact")}
          </Link>
          <ThemeToggle />
          <LanguageSwitcher
            nextLocale={nextLocale}
            className="inline-flex items-center gap-1 rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-600 hover:border-emerald-600 hover:text-emerald-700 dark:border-zinc-600 dark:text-zinc-400 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
          >
            <Translate size={14} weight="duotone" />
            {t("navLanguage")}
          </LanguageSwitcher>
        </nav>
        <div className="hidden md:block">
          <ContactActions variant="primary" locale={locale} />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <LanguageSwitcher
            nextLocale={nextLocale}
            className="inline-flex items-center gap-1 rounded-full border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-600 hover:border-emerald-600 hover:text-emerald-700 dark:border-zinc-600 dark:text-zinc-400 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
          >
            <Translate size={14} weight="duotone" />
            {t("navLanguage")}
          </LanguageSwitcher>
          <Suspense fallback={<div>Loading...</div>}>
            <MobileNav
              locale={locale}
              menuLabel={t("navMenu")}
              closeLabel={t("navClose")}
              servicesLabel={t("navServices")}
              serviceItems={serviceItems}
              links={navLinks}
              callLabel={t("ctaCallNow")}
              whatsappLabel={t("ctaWhatsapp")}
              phone={siteInfo.phoneE164}
              whatsapp={siteInfo.whatsappE164}
            />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
