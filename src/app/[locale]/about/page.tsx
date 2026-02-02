import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { Globe, Star } from "@phosphor-icons/react/dist/ssr";

type AboutPageProps = {
  params: Promise<{ locale: "ar" | "en" }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const title = t("metaAboutTitle");
  const description = t("metaAboutDescription");
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/about"),
    openGraph: buildOpenGraph(locale, "/about", title, description),
    twitter: buildTwitter(title, description),
  };
}

export default async function AboutPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale });
  const values = t.raw("aboutValuesItems") as string[];
  const areas = t.raw("aboutServiceAreasItems") as string[];

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Header locale={locale} />
      <main className="mx-auto w-full max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold">{t("aboutTitle")}</h1>
        <div className="mt-8 space-y-6 text-sm text-zinc-600">
          {(t.raw("aboutParagraphs") as string[]).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {(t.raw("aboutSections") as { title: string; paragraphs: string[] }[]).map(
            (section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm"
              >
                <h2 className="text-lg font-semibold">{section.title}</h2>
                <div className="mt-3 space-y-2 text-sm text-zinc-600">
                  {section.paragraphs.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">{t("aboutValuesTitle")}</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              {values.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Star size={16} weight="duotone" className="text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">{t("aboutServiceAreasTitle")}</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              {areas.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Globe size={16} weight="duotone" className="text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
