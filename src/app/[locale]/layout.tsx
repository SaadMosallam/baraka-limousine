import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, Locale } from "@/i18n/config";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { siteInfo } from "@/data/siteInfo";
import "../../app/globals.css";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";

const cairo = localFont({
  src: [
    {
      path: "../../fonts/Cairo[slnt,wght].ttf",
      weight: "400 700",
      style: "normal",
    },
  ],
  variable: "--font-cairo",
  display: "swap",
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
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
        { url: "/favicon.png", sizes: "64x64", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
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
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`${cairo.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: t("metaSiteTitle"),
              description: t("metaSiteDescription"),
              telephone: [siteInfo.phoneE164, siteInfo.phoneE1642],
              areaServed: "Egypt",
            }),
          }}
        />
        <ThemeProvider>
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
          >
            <div className="pb-4 md:pb-0">
              {children}
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <StickyCtaBar locale={locale} />
            </Suspense>
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html >
  );
}
