import type { Metadata } from "next";
import Image from "next/image";
import type React from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactActions } from "@/components/ContactActions";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AirplaneTakeoff,
  Briefcase,
  Bus,
  Car,
  CheckCircle,
  ClipboardText,
  Crown,
  CurrencyCircleDollar,
  Heart,
  MapTrifold,
  Van,
} from "@phosphor-icons/react/dist/ssr";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  image: string;
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

const serviceIcons: Record<string, React.ElementType> = {
  airport: AirplaneTakeoff,
  business: Briefcase,
  wedding: Heart,
  trips: MapTrifold,
  vip: Crown,
  sedan: Car,
  suv: Car,
  van: Van,
  coaster: Bus,
  bus: Bus,
};

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
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle size={16} weight="duotone" className="text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">{t("servicesProcessTitle")}</h2>
            <ol className="mt-3 space-y-2 text-sm text-zinc-600">
              {processSteps.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <ClipboardText size={16} weight="duotone" className="text-emerald-600" />
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">{t("servicesRoutesTitle")}</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              {routes.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <MapTrifold size={16} weight="duotone" className="text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">{t("servicesPricingTitle")}</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              {pricingNotes.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CurrencyCircleDollar size={16} weight="duotone" className="text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((service) => {
            const Icon = serviceIcons[service.id] ?? Car;
            return (
              <Card key={service.id} className="overflow-hidden gap-0 py-0">
                <div className="relative h-44 w-full bg-zinc-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
                <CardHeader className="px-5 pb-2 pt-5">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Icon size={18} weight="duotone" />
                    </span>
                    <CardTitle className="text-base">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="px-5 pb-4 pt-0">
                  <p className="text-sm text-zinc-600">{service.description}</p>
                </CardContent>
                <CardFooter className="flex flex-col items-stretch gap-3 border-t border-zinc-100 px-5 py-4">
                  <Button asChild variant="secondary" className="rounded-full">
                    <Link href={`/${locale}/services/${service.id}`}>
                      {t("serviceDetails")}
                    </Link>
                  </Button>
                  <ContactActions locale={locale} size="sm" />
                </CardFooter>
              </Card>
            );
          })}
          <div className="flex items-center justify-center md:col-span-2 lg:col-span-1">
            <Button asChild variant="secondary" className="w-fit rounded-full">
              <Link href={`/${locale}`}>
                {t("backToHome")}
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
