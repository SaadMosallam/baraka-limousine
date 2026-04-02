import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactActions } from "@/components/ContactActions";
import type { SeoLandingPageContent } from "@/data/seoLandingPages";
import { getTranslations } from "next-intl/server";
import {
  SEO_PATH_AIRPORT_CAIRO_AR,
  SEO_PATH_AIRPORT_TRANSFER_EN,
  SEO_PATH_LIMOUSINE_CAIRO_AR,
  SEO_PATH_LIMOUSINE_CAIRO_EN,
  buildSeoLandingJsonLd,
  getSeoLandingHref,
} from "@/lib/seo-landing";

type SeoLandingArticleProps = {
  content: SeoLandingPageContent;
};

const relatedLinksEn = [
  { segment: SEO_PATH_AIRPORT_TRANSFER_EN, label: "Cairo airport transfer service" },
  { segment: SEO_PATH_LIMOUSINE_CAIRO_EN, label: "Best limousine service in Cairo" },
];

const relatedLinksAr = [
  { segment: SEO_PATH_AIRPORT_CAIRO_AR, label: "ليموزين مطار القاهرة" },
  { segment: SEO_PATH_LIMOUSINE_CAIRO_AR, label: "ليموزين في القاهرة" },
];

export async function SeoLandingArticle({ content }: SeoLandingArticleProps) {
  const locale = content.locale;
  const t = await getTranslations({ locale });
  const jsonLd = buildSeoLandingJsonLd({
    locale,
    canonicalPath: content.canonicalPath,
    name: t("siteName"),
    description: content.metaDescription,
    serviceName: content.schema.serviceName,
    serviceType: content.schema.serviceType,
    faqs: content.faqs,
  });

  const cross = content.locale === "en" ? relatedLinksEn : relatedLinksAr;

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header locale={locale} />
      <main className="mx-auto w-full max-w-3xl px-6 pb-20 pt-8">
        <article className="text-[0.95rem] leading-relaxed text-zinc-700 dark:text-zinc-300 [&_h2]:scroll-mt-24">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
            {content.h1}
          </h1>

          <section aria-labelledby="seo-intro">
            <h2 id="seo-intro" className="sr-only">
              {locale === "ar" ? "مقدمة" : "Introduction"}
            </h2>
            {content.intro.paragraphs.map((p) => (
              <p key={p} className="mt-4 first:mt-0">
                {p}
              </p>
            ))}
          </section>

          <section aria-labelledby="seo-services" className="mt-10">
            <h2 id="seo-services" className="text-2xl font-semibold dark:text-zinc-100">
              {content.services.title}
            </h2>
            <ul className="mt-4 list-none space-y-6 ps-0">
              {content.services.items.map((item) => (
                <li key={item.title}>
                  <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-zinc-600 dark:text-zinc-400">{item.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="seo-why" className="mt-10">
            <h2 id="seo-why" className="text-2xl font-semibold dark:text-zinc-100">
              {content.why.title}
            </h2>
            {content.why.paragraphs.map((p) => (
              <p key={p} className="mt-4 first:mt-0">
                {p}
              </p>
            ))}
          </section>

          <section aria-labelledby="seo-coverage" className="mt-10">
            <h2 id="seo-coverage" className="text-2xl font-semibold dark:text-zinc-100">
              {content.coverage.title}
            </h2>
            <p>{content.coverage.intro}</p>
            <ul className="list-disc ps-5">
              {content.coverage.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="seo-faq" className="mt-10">
            <h2 id="seo-faq" className="text-2xl font-semibold dark:text-zinc-100">
              {locale === "ar" ? "أسئلة شائعة" : "Frequently asked questions"}
            </h2>
            <dl className="mt-4 space-y-6">
              {content.faqs.map((f) => (
                <div key={f.question}>
                  <dt className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {f.question}
                  </dt>
                  <dd className="mt-1 text-zinc-600 dark:text-zinc-400">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section
            aria-labelledby="seo-related"
            className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/40"
          >
            <h2 id="seo-related" className="mt-0 text-xl font-semibold dark:text-zinc-100">
              {locale === "ar" ? "صفحات ذات صلة" : "Related guides"}
            </h2>
            <ul className="mt-3 list-none space-y-2 ps-0">
              {cross
                .filter((l) => l.segment !== content.canonicalPath)
                .map((l) => (
                  <li key={l.segment}>
                    <Link
                      href={getSeoLandingHref(l.segment)}
                      prefetch={false}
                      className="font-medium text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </section>

          <section
            aria-labelledby="seo-cta"
            className="mt-12 rounded-2xl bg-emerald-600 p-8 text-white dark:bg-emerald-900"
          >
            <h2 id="seo-cta" className="mt-0 text-2xl font-bold text-white">
              {content.cta.title}
            </h2>
            <p className="text-emerald-50">{content.cta.body}</p>
            <div className="mt-6 max-w-md rounded-xl bg-white p-4 dark:border dark:border-emerald-800 dark:bg-zinc-900">
              <ContactActions locale={locale} variant="primary" fullWidthOnMobile />
            </div>
          </section>
        </article>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
