import { locationPages, servicePages, site } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap() {
  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/locations", priority: 0.85 },
    { path: "/contact", priority: 0.7 },
  ].map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: site.exportedAt,
    changeFrequency: "weekly",
    priority: route.priority,
  }));

  const serviceRoutes = servicePages.map((service) => ({
    url: absoluteUrl(`/${service.slug}`),
    lastModified: service.updated,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [absoluteUrl(service.image.local)],
  }));

  const locationRoutes = locationPages.map((location) => ({
    url: absoluteUrl(location.href),
    lastModified: site.exportedAt,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...locationRoutes, ...serviceRoutes];
}
