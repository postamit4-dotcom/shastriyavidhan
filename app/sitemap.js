import { absoluteUrl } from "@/lib/seo";
import { priorityNumber, sitemapNodes } from "@/lib/site-registry";

export default function sitemap() {
  return sitemapNodes().map((route) => ({
    url: absoluteUrl(route.href),
    lastModified: route.lastModified,
    changeFrequency: route.pageType === "service" ? "monthly" : "weekly",
    priority: priorityNumber(route.priority),
    images: route.image ? [absoluteUrl(route.image)] : undefined,
  }));
}
