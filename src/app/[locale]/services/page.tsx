import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
};

type ServicesPageProps = {
  params: { locale: "ar" | "en" };
};

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("metaServicesTitle"),
    description: t("metaServicesDescription"),
  };
}

export default async function ServicesPage({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const items = t.raw("servicesItems") as ServiceItem[];

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Header locale={locale} />
      <main className="mx-auto w-full max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold">{t("servicesTitle")}</h1>
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
