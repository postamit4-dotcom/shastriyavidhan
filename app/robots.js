import { site } from "@/lib/site-data";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/category/blog", "/migration-notes"],
      },
    ],
    sitemap: `${site.productionUrl}/sitemap.xml`,
  };
}
