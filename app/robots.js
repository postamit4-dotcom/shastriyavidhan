import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site-data";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/migration-notes", "/category/blog", "/policies/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.productionUrl,
  };
}
