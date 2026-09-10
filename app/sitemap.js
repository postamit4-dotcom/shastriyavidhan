import { absoluteUrl } from "@/lib/seo";
import { sitemapNodes } from "@/lib/site-registry";

export default function sitemap() {
  return sitemapNodes().map((route) => ({
    url: absoluteUrl(route.href),
    lastModified: route.lastModified,
    images: route.image ? [absoluteUrl(route.image)] : undefined,
  }));
}
