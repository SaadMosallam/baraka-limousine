import type { MetadataRoute } from "next";
import enMessages from "../../messages/en.json";
import { locations } from "@/data/locations";
import { locationServices } from "@/data/locationServices";

import { getBaseUrl } from "@/lib/seo";

const baseUrl = getBaseUrl();
const locales = ["ar", "en"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
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

  return [...staticRoutes, ...blogRoutes, ...serviceRoutes, ...locationRoutes];
}
