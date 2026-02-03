const normalizeBaseUrl = (value: string) => value.replace(/\/$/, "");

export const getBaseUrl = () => {
  const explicit =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    process.env.NEXT_PUBLIC_BASE_URL ??
    "";

  if (explicit) {
    return normalizeBaseUrl(
      explicit.startsWith("http") ? explicit : `https://${explicit}`
    );
  }

  if (process.env.VERCEL_URL) {
    return normalizeBaseUrl(`https://${process.env.VERCEL_URL}`);
  }

  return "http://localhost:3000";
};

export const buildAlternates = (locale: string, path: string) => {
  const baseUrl = getBaseUrl();
  return {
    canonical: `${baseUrl}/${locale}${path}`,
    languages: {
      ar: `${baseUrl}/ar${path}`,
      en: `${baseUrl}/en${path}`,
    },
  };
};

export const buildOpenGraph = (
  locale: string,
  path: string,
  title: string,
  description: string
) => {
  const baseUrl = getBaseUrl();
  const ogImageUrl = `${baseUrl}/og.webp`;
  return {
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
  };
};

export const buildTwitter = (title: string, description: string) => {
  const baseUrl = getBaseUrl();
  return {
    card: "summary_large_image",
    title,
    description,
    images: [`${baseUrl}/og.webp`],
  };
};
