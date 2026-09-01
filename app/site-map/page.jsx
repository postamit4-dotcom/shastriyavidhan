import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { basePageMetadata } from "@/lib/seo";
import { sitemapNodes } from "@/lib/site-registry";

export const metadata = basePageMetadata({
  title: "Site Map",
  description:
    "Browse the published Shastriya Vidhan site structure, including services, guides, trust pages, help pages, and policies.",
  path: "/site-map",
});

function groupRoutes(routes) {
  return routes.reduce((groups, route) => {
    const key = route.pageType;
    if (!groups[key]) groups[key] = [];
    groups[key].push(route);
    return groups;
  }, {});
}

const groupLabels = {
  home: "Home",
  commercial_hub: "Puja Services",
  mode_hub: "Service Modes",
  service_category: "Service Categories",
  service: "Individual Pujas",
  locations_hub: "Locations",
  guides_hub: "Guides",
  about: "About",
  trust: "Trust",
  help: "Help",
  contact: "Contact",
  booking: "Booking",
  policy: "Policies",
  html_sitemap: "Site Structure",
};

export default function SiteMapPage() {
  const groupedRoutes = groupRoutes(sitemapNodes());

  return (
    <>
      <section className="section-apple" style={{ backgroundColor: "var(--apple-gray-bg)", paddingBottom: "48px" }}>
        <div className="container">
          <nav aria-label="Breadcrumb" className="service-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Site Map</span>
          </nav>

          <div className="apple-section-header" style={{ marginBottom: "24px" }}>
            <span className="apple-eyebrow">Published routes</span>
            <h1>Site Map</h1>
            <p>
              This page lists live, indexable routes from the central registry. Conditional city pages,
              draft content, and internal migration notes are intentionally excluded.
            </p>
          </div>
        </div>
      </section>

      <section className="section-apple">
        <div className="container">
          <div className="service-inclusion-grid">
            {Object.entries(groupedRoutes).map(([type, routes]) => (
              <article className="apple-product-card" key={type} style={{ textAlign: "left" }}>
                <span className="apple-product-tag">{groupLabels[type] || type}</span>
                <h2>{groupLabels[type] || type}</h2>
                <ul>
                  {routes.map((route) => (
                    <li key={route.href}>
                      <span className="plus-marker">+</span>
                      <Link href={route.href}>{route.label}</Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
