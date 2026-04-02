import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoLandingArticle } from "@/components/SeoLandingArticle";
import { cairoAirportAr } from "@/data/seoLandingPages";
import { buildSeoLandingMetadata } from "@/lib/seo-landing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "ar") notFound();
  return buildSeoLandingMetadata({
    locale: "ar",
    canonicalPath: cairoAirportAr.canonicalPath,
    title: cairoAirportAr.metaTitle,
    description: cairoAirportAr.metaDescription,
  });
}

export default async function CairoAirportArPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ar") notFound();
  return <SeoLandingArticle content={cairoAirportAr} />;
}
