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
import {
  getServiceBySlug,
  locationServices,
  type ServiceSlug,
} from "@/data/locationServices";

type LocationServicePageProps = {
  params: Promise<{ locale: SupportedLocale; slug: string; service: ServiceSlug }>;
};

export async function generateStaticParams() {
  return locations.flatMap((location) =>
    locationServices.map((service) => ({
      slug: location.slug,
      service: service.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: LocationServicePageProps): Promise<Metadata> {
  const { locale, slug, service: serviceSlug } = await params;
  const location = getLocationBySlug(slug);
  const service = getServiceBySlug(serviceSlug);
  if (!location || !service) return {};

  const title =
    locale === "ar"
      ? `${service.title.ar} في ${location.name.ar} | بركة ليموزين`
      : `${location.name.en} ${service.title.en} | Baraka Limousine`;
  const description =
    locale === "ar"
      ? `${service.seoDescription.ar} في ${location.name.ar}. احجز الآن بخدمة سريعة وسيارات متعددة.`
      : `${service.seoDescription.en} in ${location.name.en}. Book now with fast service and multiple vehicle options.`;

  return {
    title,
    description,
    alternates: buildAlternates(locale, `/locations/${slug}/${serviceSlug}`),
    openGraph: buildOpenGraph(locale, `/locations/${slug}/${serviceSlug}`, title, description),
    twitter: buildTwitter(title, description),
  };
}

export default async function LocationServicePage({
  params,
}: LocationServicePageProps) {
  const { locale, slug, service: serviceSlug } = await params;
  const location = getLocationBySlug(slug);
  const service = getServiceBySlug(serviceSlug);

  if (!location || !service) {
    notFound();
  }

  const heading =
    locale === "ar"
      ? `${service.title.ar} في ${location.name.ar}`
      : `${service.title.en} in ${location.name.en}`;
  const introPrimary =
    locale === "ar"
      ? `نوفر ${service.title.ar} في ${location.name.ar} بسيارات حديثة وسائقين محترفين.`
      : `We provide ${service.title.en} in ${location.name.en} with modern vehicles and professional drivers.`;
  const introSecondary =
    locale === "ar"
      ? `${service.seoDescription.ar} مع خيارات متعددة تناسب الأفراد والعائلات والمجموعات.`
      : `${service.seoDescription.en} with options that fit individuals, families, and groups.`;
  const ctaLabel =
    locale === "ar" ? "احجز الآن" : "Book now";
  const backLabel =
    locale === "ar" ? "العودة لصفحة المدينة" : "Back to city page";

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header locale={locale} />
      <main className="mx-auto w-full max-w-5xl px-6 py-12">
        <header className="space-y-3 rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            {location.name[locale]}
          </p>
          <h1 className="text-3xl font-bold">{heading}</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {service.shortDescription[locale]}
          </p>
          <div className="pt-2">
            <ContactActions locale={locale} />
          </div>
        </header>

        <section className="mt-8 space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
          <p>{introPrimary}</p>
          <p>{introSecondary}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">
            {locale === "ar" ? "مميزات الخدمة" : "Service Highlights"}
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            {service.highlights.map((item) => (
              <li key={item[locale]}>• {item[locale]}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">
            {locale === "ar" ? "أسئلة شائعة" : "FAQs"}
          </h2>
          <div className="mt-4 space-y-3">
            {service.faqs.map((faq) => (
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

        <section className="mt-10 rounded-3xl border border-emerald-100 bg-emerald-50 p-6 dark:border-emerald-900/40 dark:bg-emerald-950/30">
          <h2 className="text-xl font-semibold">
            {locale === "ar"
              ? "تواصل معنا للحجز السريع"
              : "Contact us for fast booking"}
          </h2>
          <p className="mt-2 text-sm text-emerald-900 dark:text-emerald-200">
            {locale === "ar"
              ? "اختر الوقت المناسب وسننسق معك كل التفاصيل."
              : "Choose your time and we will coordinate the details with you."}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <ContactActions locale={locale} />
            <a
              href={`/${locale}/locations/${location.slug}`}
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300"
            >
              {backLabel}
            </a>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
