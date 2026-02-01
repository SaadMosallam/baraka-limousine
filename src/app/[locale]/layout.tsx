import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, Locale } from "@/i18n/config";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { siteInfo } from "@/data/siteInfo";
import "../../app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const title = t("metaSiteTitle");
  const description = t("metaSiteDescription");
  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    keywords: t.raw("metaKeywords") as string[],
    alternates: buildAlternates(locale, ""),
    openGraph: buildOpenGraph(locale, "", title, description),
    twitter: buildTwitter(title, description),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = await getTranslations({ locale });


  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: t("metaSiteTitle"),
              description: t("metaSiteDescription"),
              telephone: siteInfo.phone,
              email: siteInfo.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: t("contactAddress"),
                addressCountry: "EG",
              },
              areaServed: "Egypt",
            }),
          }}
        />
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
