import { servicePages, site } from "@/lib/site-data";

export default function sitemap() {
  const staticRoutes = ["", "services", "contact"].map((path) => ({
    url: path ? `${site.productionUrl}/${path}/` : `${site.productionUrl}/`,
    lastModified: site.exportedAt,
  }));

  const serviceRoutes = servicePages.map((service) => ({
    url: `${site.productionUrl}/${service.slug}/`,
    lastModified: service.updated,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
