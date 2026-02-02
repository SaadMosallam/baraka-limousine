import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactActions } from "@/components/ContactActions";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
};

type ServiceDetailSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets: string[];
};

type ServiceFaq = {
  id: string;
  faqs: { q: string; a: string }[];
};

type ServicePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const messages = (await import("../../../../../messages/en.json")).default as {
    servicesItems: ServiceItem[];
  };

  return messages.servicesItems.map((service) => ({ slug: service.id }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const services = t.raw("servicesItems") as ServiceItem[];
  const service = services.find((item) => item.id === slug);

  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: service.description,
    alternates: buildAlternates(locale, `/services/${slug}`),
    openGraph: buildOpenGraph(
      locale,
      `/services/${slug}`,
      service.title,
      service.description
    ),
    twitter: buildTwitter(service.title, service.description),
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const services = t.raw("servicesItems") as ServiceItem[];
  const detailSections = t.raw("serviceDetailSections") as ServiceDetailSection[];
  const faqSections = t.raw("serviceFaqs") as ServiceFaq[];
  const service = services.find((item) => item.id === slug);
  const detail = detailSections.find((item) => item.id === slug);
  const faq = faqSections.find((item) => item.id === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header locale={locale} />
      <main className="mx-auto w-full max-w-4xl px-6 py-12">
        <div className="space-y-6 rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">{service.title}</h1>
          <p className="text-base text-zinc-600">{service.description}</p>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Service",
                serviceType: service.title,
                description: service.description,
                areaServed: "Egypt",
                provider: {
                  "@type": "LocalBusiness",
                  name: t("metaSiteTitle"),
                },
              }),
            }}
          />
          {faq && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: faq.faqs.map((item) => ({
                    "@type": "Question",
                    name: item.q,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: item.a,
                    },
                  })),
                }),
              }}
            />
          )}
          {detail && (
            <div className="space-y-4 text-sm text-zinc-600">
              <h2 className="text-lg font-semibold text-zinc-900">{detail.title}</h2>
              {detail.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
              <ul className="space-y-2">
                {detail.bullets.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          )}
          {faq && (
            <div className="space-y-4 text-sm text-zinc-600">
              <h2 className="text-lg font-semibold text-zinc-900">
                {t("serviceFaqTitle")}
              </h2>
              <div className="space-y-3">
                {faq.faqs.map((item) => (
                  <div key={item.q} className="rounded-xl border border-zinc-100 p-4">
                    <p className="font-semibold text-zinc-900">{item.q}</p>
                    <p className="mt-2 text-sm text-zinc-600">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="pt-2">
            <ContactActions variant="primary" locale={locale} />
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
