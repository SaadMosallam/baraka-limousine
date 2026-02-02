import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { locations, type SupportedLocale } from "@/data/locations";

type LocationsPageProps = {
  params: Promise<{ locale: SupportedLocale }>;
};

export async function generateMetadata({
  params,
}: LocationsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const title =
    locale === "ar" ? "مناطق الخدمة في مصر" : "Service Areas in Egypt";
  const description =
    locale === "ar"
      ? "خدمة ليموزين وتوصيل المطار في القاهرة والإسكندرية والغردقة وشرم الشيخ ومطروح والسويس."
      : "Limousine and airport transfer services in Cairo, Alexandria, Hurghada, Sharm El Sheikh, Matrouh, and Suez.";
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/locations"),
    openGraph: buildOpenGraph(locale, "/locations", title, description),
    twitter: buildTwitter(title, description),
  };
}

export default async function LocationsPage({
  params,
}: LocationsPageProps) {
  const { locale } = await params;
  const title =
    locale === "ar" ? "مناطق الخدمة" : "Service Areas";
  const subtitle =
    locale === "ar"
      ? "نغطي المدن الرئيسية في مصر مع خدمة توصيل المطار وسيارة بسائق."
      : "We cover key cities in Egypt with airport transfers and private driver service.";
  const cta =
    locale === "ar" ? "اعرف التفاصيل" : "View details";

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header locale={locale} />
      <main className="mx-auto w-full max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          {subtitle}
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <Link
              key={location.slug}
              href={`/${locale}/locations/${location.slug}`}
              className="group rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h2 className="text-lg font-semibold">
                {location.name[locale]}
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {location.heroSubtitle[locale]}
              </p>
              <span className="mt-4 inline-flex text-sm font-semibold text-emerald-700 group-hover:text-emerald-800 dark:text-emerald-400">
                {cta}
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
