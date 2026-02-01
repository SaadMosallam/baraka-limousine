import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactActions } from "@/components/ContactActions";
import { siteInfo } from "@/data/siteInfo";
import { getTranslations } from "next-intl/server";

type Highlight = {
  title: string;
  subtitle: string;
};

type ServiceItem = {
  id: string;
  title: string;
  description: string;
};

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const highlights = t.raw("homeHighlights") as Highlight[];
  const serviceItems = t.raw("servicesItems") as ServiceItem[];

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Header locale={locale} />

      <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-12">
        {/* HERO */}
        <section className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold md:text-4xl">
              {t("homeHeroTitle")}
            </h1>

            <p className="text-base text-zinc-700">
              {t("siteTagline")}
            </p>

            <p className="text-sm text-zinc-500">
              {t("homeHeroSubtitle")}
            </p>

            <div className="flex flex-col gap-4">
              <ContactActions locale={locale} />
              <div className="text-sm text-zinc-500">
                {t("siteHours")}
              </div>
            </div>
          </div>

          {/* HIGHLIGHTS */}
          <div className="rounded-3xl bg-emerald-50 p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item.title} className="rounded-xl bg-white p-4">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-xs text-zinc-500">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="mt-16 space-y-8">
          <h2 className="text-2xl font-bold">
            {t("servicesTitle")}
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {serviceItems.map((service) => (
              <div key={service.id} className="rounded-xl bg-white p-6">
                <h3 className="font-semibold">{service.title}</h3>
                <p className="text-sm text-zinc-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <Link
            href={`/${locale}/services`}
            className="text-sm font-semibold text-emerald-700"
          >
            {t("homeServicesCta")}
          </Link>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-3xl bg-emerald-600 p-10 text-white">
          <h2 className="text-2xl font-bold">
            {t("homeCtaTitle")}
          </h2>
          <p className="text-sm text-emerald-100">
            {t("homeCtaSubtitle")}
          </p>
        </section>

        {/* CONTACT */}
        <section className="mt-16 rounded-3xl bg-zinc-50 p-8">
          <h2 className="text-2xl font-bold">
            {t("contactTitle")}
          </h2>

          <p className="text-sm text-zinc-600">
            {t("contactAddress")}
          </p>

          <p className="text-xs text-zinc-400">
            {t("homeContactEmailHint", {
              email: siteInfo.email
            })}
          </p>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
