import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
};

type ServicesPageProps = {
  params: Promise<{ locale: "ar" | "en" }>;
};

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const title = t("metaServicesTitle");
  const description = t("metaServicesDescription");
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/services"),
    openGraph: buildOpenGraph(locale, "/services", title, description),
    twitter: buildTwitter(title, description),
  };
}

export default async function ServicesPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale });
  const items = t.raw("servicesItems") as ServiceItem[];
  const introParagraphs = t.raw("servicesIntroParagraphs") as string[];
  const benefits = t.raw("servicesBenefits") as string[];
  const processSteps = t.raw("servicesProcess") as string[];
  const routes = t.raw("servicesRoutesItems") as string[];
  const pricingNotes = t.raw("servicesPricingNotes") as string[];

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Header locale={locale} />
      <main className="mx-auto w-full max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold">{t("servicesTitle")}</h1>
        <div className="mt-6 space-y-3 text-sm text-zinc-600">
          {introParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">{t("servicesBenefitsTitle")}</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              {benefits.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">{t("servicesProcessTitle")}</h2>
            <ol className="mt-3 space-y-2 text-sm text-zinc-600">
              {processSteps.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ol>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">{t("servicesRoutesTitle")}</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              {routes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">{t("servicesPricingTitle")}</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              {pricingNotes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold">{service.title}</h2>
              <p className="mt-3 text-sm text-zinc-600">{service.description}</p>
              <Link
                href={`/${locale}/services/${service.id}`}
                className="mt-4 inline-flex text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                {t("serviceDetails")}
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
