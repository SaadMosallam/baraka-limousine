import type { MetadataRoute } from "next";
import enMessages from "../../messages/en.json";
import { locations } from "@/data/locations";
import { locationServices } from "@/data/locationServices";

import { getBaseUrl } from "@/lib/seo";
import {
  SEO_PATH_AIRPORT_CAIRO_AR,
  SEO_PATH_AIRPORT_TRANSFER_EN,
  SEO_PATH_LIMOUSINE_CAIRO_AR,
  SEO_PATH_LIMOUSINE_CAIRO_EN,
  getSeoLandingPublicPath,
} from "@/lib/seo-landing";

const baseUrl = getBaseUrl();
const locales = ["ar", "en"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const seoLandingUrls: MetadataRoute.Sitemap = [
    getSeoLandingPublicPath("en", SEO_PATH_LIMOUSINE_CAIRO_EN),
    getSeoLandingPublicPath("en", SEO_PATH_AIRPORT_TRANSFER_EN),
    getSeoLandingPublicPath("ar", SEO_PATH_LIMOUSINE_CAIRO_AR),
    getSeoLandingPublicPath("ar", SEO_PATH_AIRPORT_CAIRO_AR),
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const staticPaths = ["/", "/about", "/services", "/blog", "/contact"];
  const blogPosts = enMessages.blogPosts;
  const serviceItems = enMessages.servicesItems;
  const locationItems = locations;

  const staticRoutes = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${baseUrl}/${locale}${path === "/" ? "" : path}`,
      lastModified: new Date(),
    }))
  );

  const blogRoutes = locales.flatMap((locale) =>
    blogPosts.map((post) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: post.publishedOn,
    }))
  );

  const serviceRoutes = locales.flatMap((locale) =>
    serviceItems.map((service) => ({
      url: `${baseUrl}/${locale}/services/${service.id}`,
      lastModified: new Date(),
    }))
  );

  const locationRoutes = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}/locations`,
      lastModified: new Date(),
    },
    ...locationItems.map((location) => ({
      url: `${baseUrl}/${locale}/locations/${location.slug}`,
      lastModified: new Date(),
    })),
    ...locationItems.flatMap((location) =>
      locationServices.map((service) => ({
        url: `${baseUrl}/${locale}/locations/${location.slug}/${service.slug}`,
        lastModified: new Date(),
      }))
    ),
  ]);

  return [
    ...seoLandingUrls,
    ...staticRoutes,
    ...blogRoutes,
    ...serviceRoutes,
    ...locationRoutes,
  ];
}
