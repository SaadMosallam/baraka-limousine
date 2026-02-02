import Link from "next/link";
import Image from "next/image";
import { ContactActions } from "./ContactActions";
import { getTranslations } from "next-intl/server";
import { MobileNav } from "@/components/MobileNav";
import { ServicesDropdown } from "@/components/ServicesDropdown";
import { siteInfo } from "@/data/siteInfo";
import { Suspense } from "react";
import { Translate } from "@phosphor-icons/react/dist/ssr";

export async function Header(props: { locale: string }) {
  const locale = props.locale;
  const t = await getTranslations({ locale });
  const nextLocale = locale === "ar" ? "en" : "ar";
  const localePath = (path: string) =>
    `/${locale}${path === "/" ? "" : path}`;

  const serviceItems = (t.raw("servicesItems") as { id: string; title: string }[])
    .filter((item) => !["sedan", "suv", "van", "coaster", "bus"].includes(item.id))
    .map((item) => ({ id: item.id, title: item.title }));

  const navLinks = [
    { href: "/about", label: t("navAbout") },
    { href: "/blog", label: t("navBlog") },
    { href: "/contact", label: t("navContact") },
  ];

  return (
    <header className="w-full border-b border-zinc-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href={localePath("/")} className="flex items-center">
          <Image
            src="/logo.png"
            alt={t("siteName")}
            width={64}
            height={64}
            priority
            className="h-auto w-auto"
          />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-zinc-700 md:flex">
          <Link href={localePath("/about")} className="hover:text-emerald-600">
            {t("navAbout")}
          </Link>
          <ServicesDropdown
            locale={locale}
            label={t("navServices")}
            items={serviceItems}
          />
          <Link href={localePath("/blog")} className="hover:text-emerald-600">
            {t("navBlog")}
          </Link>
          <Link href={localePath("/contact")} className="hover:text-emerald-600">
            {t("navContact")}
          </Link>
          <Link
            href={`/${nextLocale}`}
            className="inline-flex items-center gap-1 rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-600 hover:border-emerald-600 hover:text-emerald-700"
          >
            <Translate size={14} weight="duotone" />
            {t("navLanguage")}
          </Link>
        </nav>
        <div className="hidden md:block">
          <ContactActions variant="primary" locale={locale} />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <MobileNav
            locale={locale}
            nextLocale={nextLocale}
            languageLabel={t("navLanguage")}
            menuLabel={t("navMenu")}
            closeLabel={t("navClose")}
            servicesLabel={t("navServices")}
            serviceItems={serviceItems}
            links={navLinks}
            callLabel={t("ctaCallNow")}
            whatsappLabel={t("ctaWhatsapp")}
            phone={siteInfo.phone}
            whatsapp={siteInfo.whatsapp}
          />
        </Suspense>
      </div>
    </header>
  );
}
