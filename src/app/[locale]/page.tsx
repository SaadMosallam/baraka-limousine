import type { Metadata } from "next";
import Image from "next/image";
import type React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ContactActions } from "@/components/ContactActions";
import { siteInfo } from "@/data/siteInfo";
import { isServiceExcludedFromNav } from "@/data/serviceFilters";
import { getTranslations } from "next-intl/server";
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
  Crown,
  CurrencyCircleDollar,
  Heart,
  Lightning,
  MapPinLine,
  MapTrifold,
  PhoneCall,
  ShieldCheck,
  Star,
  Van,
  WhatsappLogo,
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
  /** Optional: path to avatar image (e.g. "/avatars/ahmed.webp"). Omit or leave empty to use placeholder. */
  avatar?: string;
};

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  image: string;
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
  const localeTyped = locale === "ar" || locale === "en" ? locale : "ar";
  const t = await getTranslations({ locale });

  const highlights = t.raw("homeHighlights") as Highlight[];
  const allServices = t.raw("servicesItems") as ServiceItem[];
  const serviceItems = allServices.filter(
    (service) => !isServiceExcludedFromNav(service.id)
  );
  const heroSlides = allServices
    .filter((service) =>
      ["airport", "business", "wedding", "vip", "trips"].includes(service.id)
    )
    .map((service) => ({
      id: service.id,
      title: service.title,
      description: service.description,
      image: service.image,
    }));

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
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header locale={locale} />

      {/* HERO */}
      <HeroCarousel
        slides={heroSlides}
        locale={localeTyped}
        whatsappLabel={t("ctaWhatsapp")}
        callLabel={t("ctaCallNow")}
      />

      <main className="mx-auto w-full max-w-6xl px-6 pb-16">


        {/* HIGHLIGHTS */}
        <section className="mt-12 rounded-3xl bg-emerald-50 p-8 dark:bg-emerald-950/30 dark:border dark:border-emerald-900/30">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, index) => {
              const Icon = highlightIcons[index] ?? Star;
              return (
                <div key={item.title} className="rounded-xl bg-white p-4 dark:bg-zinc-900 dark:border dark:border-zinc-800">
                  <div className="flex items-start gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                      <Icon size={18} weight="duotone" />
                    </span>
                    <div>
                      <p className="font-semibold dark:text-zinc-100">{item.title}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.subtitle}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* SERVICES */}
        <section className="mt-16 space-y-8">
          <h2 className="text-2xl font-bold dark:text-zinc-100">
            {t("servicesTitle")}
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceItems.map((service) => {
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
              )
            })}
            <div className="flex items-center justify-center md:col-span-2 lg:col-span-1">
              <Button asChild variant="secondary" className="w-fit rounded-full">
                <Link href={`/${locale}/services`}>
                  {t("homeServicesCta")}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold dark:text-zinc-100">{t("homeIntroTitle")}</h2>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm text-zinc-600">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-lg font-semibold dark:text-zinc-100">{t("homeCapacityTitle")}</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{t("homeCapacityText")}</p>
            <div className="mt-4 space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
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
        <section className="mt-16 space-y-6 rounded-3xl border border-emerald-100 bg-emerald-50 p-8 dark:border-emerald-900/40 dark:bg-emerald-950/30">
          <div>
            <h2 className="text-2xl font-bold dark:text-zinc-100">{t("homeFleetTitle")}</h2>
            <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-400">{t("homeFleetSubtitle")}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {fleetItems.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-4 dark:bg-zinc-900 dark:border dark:border-zinc-800">
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
              <div key={item.name} className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-start gap-3">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-zinc-100">
                    <Image
                      src={item.avatar && item.avatar.trim() !== "" ? item.avatar : "/avatar-placeholder.svg"}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-xs text-zinc-500 dark:text-zinc-400">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</p>
                    <p>{item.role}</p>
                    <p>{item.location}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">&ldquo;{item.quote}&rdquo;</p>
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
          <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold dark:text-zinc-100">{t("homeRoutesTitle")}</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              {routesItems.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <MapTrifold size={16} weight="duotone" className="text-emerald-600 dark:text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold dark:text-zinc-100">{t("homeTrustTitle")}</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              {trustItems.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <ShieldCheck size={16} weight="duotone" className="text-emerald-600 dark:text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FLEET SPECS */}
        <section className="mt-16 rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-2xl font-bold dark:text-zinc-100">{t("homeFleetSpecsTitle")}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {fleetSpecs.map((item) => (
              <div key={item} className="rounded-xl bg-zinc-50 p-4 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 dark:border dark:border-zinc-700">
                <span className="flex items-center gap-2">
                  <Car size={16} weight="duotone" className="text-emerald-600 dark:text-emerald-400" />
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section className="mt-16 rounded-3xl border border-emerald-100 bg-emerald-50 p-8 dark:border-emerald-900/40 dark:bg-emerald-950/30">
          <h2 className="text-2xl font-bold dark:text-zinc-100">{t("homePricingTitle")}</h2>
          <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-400">{t("homePricingSubtitle")}</p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            {pricingNotes.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CurrencyCircleDollar size={16} weight="duotone" className="text-emerald-600 dark:text-emerald-400" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="mt-16 flex flex-col gap-8 rounded-3xl bg-emerald-600 p-10 text-white dark:bg-emerald-900 dark:border dark:border-emerald-800 md:flex-row md:items-center md:justify-between">
          <div className="flex w-fit items-center justify-center">
            <Image
              src="/book-now.svg"
              alt={t("homeCtaTitle")}
              width={120}
              height={120}
              className="h-[120px] w-auto opacity-90 dark:opacity-95"
            />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold dark:text-white">
              {t("homeCtaTitle")}
            </h2>
            <p className="text-sm text-emerald-100 dark:text-emerald-200">
              {t("homeCtaSubtitle")}
            </p>
          </div>
          <div className="w-full shrink-0 rounded-2xl bg-white px-6 py-4 shadow-lg dark:bg-zinc-800 dark:border dark:border-zinc-700 sm:w-auto">
            <ContactActions locale={locale} variant="primary" fullWidthOnMobile />
          </div>
        </section>

        {/* CONTACT */}
        <section className="mt-16 flex flex-col gap-8 rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-900 dark:border dark:border-zinc-800 md:flex-row md:items-center">
          <div className="flex w-fit items-center justify-center">
            <Image
              src="/phone-call-location-pin.webp"
              alt={t("contactTitle")}
              width={120}
              height={120}
              className="h-20 w-auto"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold dark:text-zinc-100">
              {t("contactTitle")}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {t("contactHours")}
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{siteInfo.phoneDisplay}</span>
                <a className="inline-flex items-center gap-1 rounded-full border border-[#25D366] bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1f8f4a] hover:border-[#1f8f4a] dark:bg-[#25D366] dark:text-white dark:hover:bg-[#1f8f4a]" href={`https://wa.me/${siteInfo.whatsappE164}`} target="_blank" rel="noopener noreferrer">
                  <WhatsappLogo size={14} weight="duotone" />
                  {t("ctaWhatsapp")}
                </a>
                <a className="inline-flex items-center gap-1 rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800" href={`tel:${siteInfo.phoneE164}`}>
                  <PhoneCall size={14} weight="duotone" />
                  {t("ctaCallNow")}
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{siteInfo.phoneDisplay2}</span>
                <a className="inline-flex items-center gap-1 rounded-full border border-[#25D366] bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1f8f4a] hover:border-[#1f8f4a] dark:bg-[#25D366] dark:text-white dark:hover:bg-[#1f8f4a]" href={`https://wa.me/${siteInfo.whatsappE1642}`} target="_blank" rel="noopener noreferrer">
                  <WhatsappLogo size={14} weight="duotone" />
                  {t("ctaWhatsapp")}
                </a>
                <a className="inline-flex items-center gap-1 rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800" href={`tel:${siteInfo.phoneE1642}`}>
                  <PhoneCall size={14} weight="duotone" />
                  {t("ctaCallNow")}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
