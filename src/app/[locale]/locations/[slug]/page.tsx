import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactActions } from "@/components/ContactActions";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import {
  getLocationBySlug,
  locations,
  type SupportedLocale,
} from "@/data/locations";
import { locationServices } from "@/data/locationServices";

type LocationPageProps = {
  params: Promise<{ locale: SupportedLocale; slug: string }>;
};

export async function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};

  const title = location.metaTitle[locale];
  const description = location.metaDescription[locale];
  return {
    title,
    description,
    alternates: buildAlternates(locale, `/locations/${slug}`),
    openGraph: buildOpenGraph(locale, `/locations/${slug}`, title, description),
    twitter: buildTwitter(title, description),
  };
}

export default async function LocationPage({
  params,
}: LocationPageProps) {
  const { locale, slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header locale={locale} />
      <main className="mx-auto w-full max-w-5xl px-6 py-12">
        <header className="space-y-3 rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            {locale === "ar" ? "منطقة الخدمة" : "Service Area"}
          </p>
          <h1 className="text-3xl font-bold">{location.heroTitle[locale]}</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {location.heroSubtitle[locale]}
          </p>
          <div className="pt-2">
            <ContactActions locale={locale} />
          </div>
        </header>

        <section className="mt-8 space-y-4">
          {location.intro.map((paragraph) => (
            <p key={paragraph[locale]} className="text-sm text-zinc-600 dark:text-zinc-400">
              {paragraph[locale]}
            </p>
          ))}
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">
            {locale === "ar" ? "الخدمات المتاحة" : "Available Services"}
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {location.services.map((service) => (
              <div
                key={service.title[locale]}
                className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="font-semibold">{service.title[locale]}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {service.description[locale]}
                </p>
                <a
                  href={`/${locale}/locations/${location.slug}/${service.slug}`}
                  className="mt-3 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400"
                >
                  {locale === "ar" ? "تفاصيل الخدمة" : "Service details"}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">
            {locale === "ar" ? "خدمات بحسب المدينة" : "Services by City"}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {locationServices.map((service) => (
              <a
                key={service.slug}
                href={`/${locale}/locations/${location.slug}/${service.slug}`}
                className="rounded-2xl border border-zinc-100 bg-white p-4 text-sm text-zinc-700 shadow-sm hover:border-emerald-300 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
              >
                {service.title[locale]}
              </a>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-emerald-100 bg-emerald-50 p-6 dark:border-emerald-900/40 dark:bg-emerald-950/30">
          <h2 className="text-xl font-semibold">
            {locale === "ar" ? "لماذا بركة ليموزين؟" : "Why Baraka Limousine?"}
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-emerald-900 dark:text-emerald-200">
            {location.highlights.map((item) => (
              <li key={item[locale]}>• {item[locale]}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">
            {locale === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </h2>
          <div className="mt-4 space-y-3">
            {location.faqs.map((faq) => (
              <div
                key={faq.q[locale]}
                className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <p className="font-semibold">{faq.q[locale]}</p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {faq.a[locale]}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold">
            {locale === "ar"
              ? "احجز الآن لخدمة سريعة"
              : "Book Now for Fast Service"}
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {locale === "ar"
              ? "تواصل معنا لحجز توصيل المطار، سيارة بسائق، أو أتوبيس رحلات في هذه المدينة."
              : "Contact us to book airport transfers, private driver service, or bus trips in this city."}
          </p>
          <div className="mt-4">
            <ContactActions locale={locale} />
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
