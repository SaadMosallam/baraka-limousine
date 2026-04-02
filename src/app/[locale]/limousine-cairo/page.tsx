import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoLandingArticle } from "@/components/SeoLandingArticle";
import { limousineCairoEn } from "@/data/seoLandingPages";
import { buildSeoLandingMetadata } from "@/lib/seo-landing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") notFound();
  return buildSeoLandingMetadata({
    locale: "en",
    canonicalPath: limousineCairoEn.canonicalPath,
    title: limousineCairoEn.metaTitle,
    description: limousineCairoEn.metaDescription,
  });
}

export default async function LimousineCairoPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  return <SeoLandingArticle content={limousineCairoEn} />;
}
