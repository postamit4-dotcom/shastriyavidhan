import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site-data";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.productionUrl,
  };
}
