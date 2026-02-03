
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteInfo } from "@/data/siteInfo";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { FacebookLogo, PhoneCall, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const title = t("metaContactTitle");
  const description = t("metaContactDescription");
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/contact"),
    openGraph: buildOpenGraph(locale, "/contact", title, description),
    twitter: buildTwitter(title, description),
  };
}

export default async function ContactPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale });

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header locale={locale} />
      <main className="mx-auto w-full max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold dark:text-zinc-100">{t("contactTitle")}</h1>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{t("contactSubtitle")}</p>
        <div className="mt-8 flex flex-col gap-8 rounded-3xl border border-zinc-100 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900 md:flex-row md:items-center md:justify-between">
          <div className="space-y-6">
            <p className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <PhoneCall size={16} weight="duotone" className="text-emerald-600 dark:text-emerald-400" />
              {t("contactHours")}
            </p>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <a className="inline-flex min-w-32 items-center justify-center gap-2 rounded-full border border-[#25D366] bg-[#25D366] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1f8f4a] hover:border-[#1f8f4a] dark:bg-[#25D366] dark:text-white dark:hover:bg-[#1f8f4a] sm:min-w-36" href={`https://wa.me/${siteInfo.whatsappE164}`} target="_blank" rel="noopener noreferrer">
                  <WhatsappLogo size={18} weight="duotone" />
                  {t("ctaWhatsapp")}
                </a>
                <a className="inline-flex min-w-32 items-center justify-center gap-2 rounded-full border border-zinc-200 px-5 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800 sm:min-w-36" href={`tel:${siteInfo.phoneE164}`}>
                  <PhoneCall size={18} weight="duotone" />
                  {t("ctaCallNow")}
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a className="inline-flex min-w-32 items-center justify-center gap-2 rounded-full border border-[#25D366] bg-[#25D366] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1f8f4a] hover:border-[#1f8f4a] dark:bg-[#25D366] dark:text-white dark:hover:bg-[#1f8f4a] sm:min-w-36" href={`https://wa.me/${siteInfo.whatsappE1642}`} target="_blank" rel="noopener noreferrer">
                  <WhatsappLogo size={18} weight="duotone" />
                  {t("ctaWhatsapp")}
                </a>
                <a className="inline-flex min-w-32 items-center justify-center gap-2 rounded-full border border-zinc-200 px-5 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800 sm:min-w-36" href={`tel:${siteInfo.phoneE1642}`}>
                  <PhoneCall size={18} weight="duotone" />
                  {t("ctaCallNow")}
                </a>
              </div>
            </div>
            <div>
              <a
                className="inline-flex min-w-32 items-center justify-center gap-2 rounded-full border border-[#1877F2] bg-[#1877F2] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#166fe5] hover:border-[#166fe5] sm:min-w-36"
                href={siteInfo.facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookLogo size={18} weight="duotone" className="text-white" />
                {t("ctaFacebook")}
              </a>
            </div>
          </div>
          <div className="flex w-full items-end justify-center md:ms-auto md:w-auto md:justify-end">
            <Image
              src="/contact-us-illustration.svg"
              alt={t("contactTitle")}
              width={260}
              height={260}
              className="h-56 w-auto sm:h-64 md:h-72"
            />
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
