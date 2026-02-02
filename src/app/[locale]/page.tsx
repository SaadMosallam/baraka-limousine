import type { Metadata } from "next";
import Image from "next/image";
import type React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactActions } from "@/components/ContactActions";
import { siteInfo } from "@/data/siteInfo";
import { getTranslations } from "next-intl/server";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import {
  AirplaneTakeoff,
  Briefcase,
  Bus,
  Car,
  Crown,
  Clock,
  CurrencyCircleDollar,
  Heart,
  Lightning,
  MapPinLine,
  MapTrifold,
  ShieldCheck,
  Star,
  Van,
} from "@phosphor-icons/react/dist/ssr";

type Highlight = {
  title: string;
  subtitle: string;
};

type FleetItem = {
  title: string;
  subtitle: string;
};

type TestimonialItem = {
  name: string;
  role: string;
  quote: string;
  location: string;
};

type ServiceItem = {
  id: string;
  title: string;
  description: string;
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const title = t("metaSiteTitle");
  const description = t("metaSiteDescription");
  return {
    title,
    description,
    alternates: buildAlternates(locale, ""),
    openGraph: buildOpenGraph(locale, "", title, description),
    twitter: buildTwitter(title, description),
  };
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const highlights = t.raw("homeHighlights") as Highlight[];
  const serviceItems = (t.raw("servicesItems") as ServiceItem[]).filter(
    (service) =>
      !["sedan", "suv", "van", "coaster", "bus"].includes(service.id)
  );
  const introParagraphs = t.raw("homeIntroParagraphs") as string[];
  const fleetItems = t.raw("homeFleetItems") as FleetItem[];
  const coverageItems = t.raw("homeCoverageItems") as string[];
  const testimonials = t.raw("homeTestimonialsItems") as TestimonialItem[];
  const pricingNotes = t.raw("homePricingNotes") as string[];
  const trustItems = t.raw("homeTrustItems") as string[];
  const routesItems = t.raw("homeRoutesItems") as string[];
  const fleetSpecs = t.raw("homeFleetSpecsItems") as string[];

  const highlightIcons = [
    ShieldCheck,
    Briefcase,
    CurrencyCircleDollar,
    Lightning,
  ];

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
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <Clock size={16} weight="duotone" className="text-emerald-600" />
                {t("siteHours")}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-zinc-100">
            <Image
              src="/hero-image.png"
              alt={t("homeHeroTitle")}
              width={720}
              height={540}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section className="mt-12 rounded-3xl bg-emerald-50 p-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, index) => {
              const Icon = highlightIcons[index] ?? Star;
              return (
                <div key={item.title} className="rounded-xl bg-white p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Icon size={18} weight="duotone" />
                    </span>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-xs text-zinc-500">{item.subtitle}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* SERVICES */}
        <section className="mt-16 space-y-8">
          <h2 className="text-2xl font-bold">
            {t("servicesTitle")}
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {serviceItems.map((service) => {
              const Icon = serviceIcons[service.id] ?? Car;
              return (
                <div key={service.id} className="rounded-xl bg-white p-6">
                  <div className="flex items-start gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Icon size={18} weight="duotone" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{service.title}</h3>
                      <p className="text-sm text-zinc-600">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <Link
            href={`/${locale}/services`}
            className="text-sm font-semibold text-emerald-700"
          >
            {t("homeServicesCta")}
          </Link>
        </section>

        {/* INTRO */}
        <section className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{t("homeIntroTitle")}</h2>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm text-zinc-600">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">{t("homeCapacityTitle")}</h3>
            <p className="mt-2 text-sm text-zinc-600">{t("homeCapacityText")}</p>
            <div className="mt-4 space-y-2 text-xs text-zinc-500">
              {coverageItems.map((item) => (
                <p key={item} className="flex items-center gap-2">
                  <MapPinLine size={14} weight="duotone" className="text-emerald-600" />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* FLEET */}
        <section className="mt-16 space-y-6 rounded-3xl border border-emerald-100 bg-emerald-50 p-8">
          <div>
            <h2 className="text-2xl font-bold">{t("homeFleetTitle")}</h2>
            <p className="mt-2 text-sm text-emerald-700">{t("homeFleetSubtitle")}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {fleetItems.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-4">
                <div className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Bus size={18} weight="duotone" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{item.title}</p>
                    <p className="text-xs text-zinc-500">{item.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mt-16 space-y-6">
          <div>
            <h2 className="text-2xl font-bold">{t("homeTestimonialsTitle")}</h2>
            <p className="mt-2 text-sm text-zinc-600">{t("homeTestimonialsSubtitle")}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
                <p className="text-sm text-zinc-600">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-4 text-xs text-zinc-500">
                  <p className="font-semibold text-zinc-900">{item.name}</p>
                  <p>{item.role}</p>
                  <p>{item.location}</p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-emerald-600">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} size={14} weight="fill" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ROUTES & TRUST */}
        <section className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">{t("homeRoutesTitle")}</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              {routesItems.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <MapTrifold size={16} weight="duotone" className="text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">{t("homeTrustTitle")}</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              {trustItems.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <ShieldCheck size={16} weight="duotone" className="text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FLEET SPECS */}
        <section className="mt-16 rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">{t("homeFleetSpecsTitle")}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {fleetSpecs.map((item) => (
              <div key={item} className="rounded-xl bg-zinc-50 p-4 text-sm text-zinc-600">
                <span className="flex items-center gap-2">
                  <Car size={16} weight="duotone" className="text-emerald-600" />
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section className="mt-16 rounded-3xl border border-emerald-100 bg-emerald-50 p-8">
          <h2 className="text-2xl font-bold">{t("homePricingTitle")}</h2>
          <p className="mt-2 text-sm text-emerald-700">{t("homePricingSubtitle")}</p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600">
            {pricingNotes.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CurrencyCircleDollar size={16} weight="duotone" className="text-emerald-600" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="mt-16 flex flex-col gap-8 rounded-3xl bg-emerald-600 p-10 text-white md:flex-row md:items-center">
          <div className="flex w-fit items-center justify-center">
            <Image
              src="/book-now.svg"
              alt={t("homeCtaTitle")}
              width={120}
              height={120}
              className="h-[120px] w-auto"
            />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">
              {t("homeCtaTitle")}
            </h2>
            <p className="text-sm text-emerald-100">
              {t("homeCtaSubtitle")}
            </p>
          </div>
        </section>

        {/* CONTACT */}
        <section className="mt-16 flex flex-col gap-8 rounded-3xl bg-zinc-50 p-8 md:flex-row md:items-center">
          <div className="flex w-fit items-center justify-center">
            <Image
              src="/phone-call-location-pin.png"
              alt={t("contactTitle")}
              width={120}
              height={120}
              className="h-20 w-auto"
            />
          </div>
          <div className="space-y-3">
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
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
