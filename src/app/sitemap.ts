import type { MetadataRoute } from "next";
import enMessages from "../../messages/en.json";

const baseUrl = "https://baraka-limousine.com";
const locales = ["ar", "en"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/about", "/services", "/blog", "/contact"];
  const blogPosts = enMessages.blogPosts;
  const serviceItems = enMessages.servicesItems;

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

  return [...staticRoutes, ...blogRoutes, ...serviceRoutes];
}
