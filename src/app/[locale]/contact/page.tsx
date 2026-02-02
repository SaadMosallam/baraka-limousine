
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactActions } from "@/components/ContactActions";
import { siteInfo } from "@/data/siteInfo";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";

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
    <div className="min-h-screen bg-white text-zinc-900">
      <Header locale={locale} />
      <main className="mx-auto w-full max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold">{t("contactTitle")}</h1>
        <p className="mt-3 text-sm text-zinc-600">{t("contactSubtitle")}</p>
        <div className="mt-8 grid gap-8 rounded-3xl border border-zinc-100 bg-zinc-50 p-8 md:grid-cols-[2fr,1fr]">
          <div className="space-y-4 text-sm text-zinc-600">
            <p>{t("contactAddress")}</p>
            <p>{t("contactHours")}</p>
            <a className="block text-emerald-700" href={`tel:${siteInfo.phoneE164}`}>
              {siteInfo.phoneDisplay}
            </a>
            <a className="block text-emerald-700" href={`mailto:${siteInfo.email}`}>
              {siteInfo.email}
            </a>
          </div>
          <div className="space-y-4">
            <ContactActions locale={locale} />
            <a
              href={`https://wa.me/${siteInfo.whatsappE164}`}
              className="inline-flex items-center justify-center rounded-full border border-emerald-600 px-5 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("contactWhatsappAction")}
            </a>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
