import Link from "next/link";
import { ChevronRight, MessageCircle } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import { contact, pathForCategory, serviceCategories, servicesForCategorySlug } from "@/lib/site-data";
import { basePageMetadata, servicesDirectoryJsonLd } from "@/lib/seo";

const title = "Puja Services Directory";
const description =
  "Explore Shastriya Vidhan puja services by occasion, deity, family need, and specialist category with request-first booking guidance.";

export const metadata = basePageMetadata({
  title,
  description,
  path: "/puja-services",
  image: "/images/rudrabhishek-puja.webp",
  imageAlt: "Shastriya Vidhan Vedic puja services directory",
});

export default function PujaServicesPage() {
  const jsonLd = servicesDirectoryJsonLd();

  return (
    <>
      <section className="section-apple" style={{ backgroundColor: "var(--apple-gray-bg)", paddingBottom: "48px" }}>
        <div className="container">
          <nav aria-label="Breadcrumb" className="service-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Puja Services</span>
          </nav>

          <div className="apple-section-header" style={{ marginBottom: "24px" }}>
            <span className="apple-eyebrow">Directory</span>
            <h1>All Puja Services</h1>
            <p>
              Browse service pages by category while the full mega-menu rollout remains gated behind content quality,
              evidence, accessibility, and broken-link checks.
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
            {serviceCategories.slice(0, 5).map((category) => (
              <Link key={category.slug} href={pathForCategory(category)} className="apple-btn-pill apple-btn-secondary">
                {category.name}
              </Link>
            ))}
            <a
              href={contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-btn-pill apple-btn-primary"
            >
              <MessageCircle size={15} aria-hidden="true" />
              Ask Booking Desk
            </a>
          </div>
        </div>
      </section>

      {serviceCategories.map((category) => {
        const services = servicesForCategorySlug(category.slug);
        if (services.length === 0) return null;

        return (
          <section className="section-apple" id={category.slug} key={category.slug}>
            <div className="container">
              <div style={{ marginBottom: "32px" }}>
                <span className="apple-eyebrow">
                  {category.megaMenuEligible ? "Directory ready" : "Not mega-menu gated yet"}
                </span>
                <h2 style={{ fontSize: "var(--font-h2)", margin: "4px 0 8px" }}>{category.name}</h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>{category.description}</p>
                <Link href={pathForCategory(category)} className="apple-link apple-link-sm" style={{ marginTop: "12px" }}>
                  <span>Open {category.name}</span>
                  <ChevronRight size={13} className="apple-link-chevron" aria-hidden="true" />
                </Link>
              </div>

              <div className="apple-products-grid">
                {services.map((service) => (
                  <ServiceCard key={service.slug} service={service} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
