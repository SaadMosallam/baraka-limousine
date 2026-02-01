import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactActions } from "@/components/ContactActions";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
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
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const services = t.raw("servicesItems") as ServiceItem[];
  const service = services.find((item) => item.id === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Header locale={locale} />
      <main className="mx-auto w-full max-w-4xl px-6 py-12">
        <div className="space-y-6 rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">{service.title}</h1>
          <p className="text-base text-zinc-600">{service.description}</p>
          <div className="pt-2">
            <ContactActions variant="primary" locale={locale} />
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
