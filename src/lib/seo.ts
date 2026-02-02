export const baseUrl = "https://baraka-limousine.com";
export const ogImageUrl = `${baseUrl}/og.webp`;

export const buildAlternates = (locale: string, path: string) => ({
  canonical: `${baseUrl}/${locale}${path}`,
  languages: {
    ar: `${baseUrl}/ar${path}`,
    en: `${baseUrl}/en${path}`,
  },
});

export const buildOpenGraph = (
  locale: string,
  path: string,
  title: string,
  description: string
) => ({
  title,
  description,
  url: `${baseUrl}/${locale}${path}`,
  type: "website",
  locale: locale === "ar" ? "ar_EG" : "en_US",
  images: [
    {
      url: ogImageUrl,
      width: 1200,
      height: 630,
      alt: title,
    },
  ],
});

export const buildTwitter = (title: string, description: string) => ({
  card: "summary_large_image",
  title,
  description,
  images: [ogImageUrl],
});
