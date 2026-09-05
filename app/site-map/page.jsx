import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { basePageMetadata } from "@/lib/seo";
import { siteNodes } from "@/lib/site-registry";

export const metadata = basePageMetadata({
  title: "Site Map",
  description:
    "Browse the complete Shastriya Vidhan route registry, including live, conditional, temporary, service, guide, help, location, and policy pages.",
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
  profile: "Pandit Ji Profiles",
  trust: "Trust",
  help: "Help",
  contact: "Contact",
  booking: "Booking",
  policy: "Policies",
  html_sitemap: "Site Structure",
  internal_status: "Internal Status",
  content_review: "Content Review",
  location: "Location Pages",
};

function routeStatusLabel(route) {
  if (route.publicationState === "temporary") return "Temporary";
  if (route.publicationState === "conditional") return "Review gated";
  if (!route.indexable) return "Noindex";
  return "Live";
}

function routeStatusDetail(route) {
  const status = routeStatusLabel(route);
  const indexState = route.indexable && route.publicationState === "live" ? "indexable" : "noindex";
  return `${status} - ${indexState}`;
}

export default function SiteMapPage() {
  const groupedRoutes = groupRoutes(siteNodes);

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
            <span className="apple-eyebrow">Complete route registry</span>
            <h1>Site Map</h1>
            <p>
              This page lists every route currently registered for Shastriya Vidhan, including live pages,
              conditional review pages, noindex support routes, temporary migration pages, and service-category pages.
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
                      <span>
                        <Link href={route.href}>{route.label}</Link>
                        <span
                          style={{
                            display: "block",
                            marginTop: "3px",
                            color: "var(--text-tertiary)",
                            fontSize: "0.78rem",
                            lineHeight: 1.35,
                          }}
                        >
                          {route.href} - {routeStatusDetail(route)}
                        </span>
                      </span>
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
