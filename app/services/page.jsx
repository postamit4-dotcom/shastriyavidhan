import Link from "next/link";
import { ChevronRight, MessageCircle } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import { contact, serviceCategories, servicesByCategory, site } from "@/lib/site-data";

export const metadata = {
  title: "All Vedic Pujas — Directory & Comparison",
  description:
    "Explore authentic Shastriya Vidhan puja services by category: festival pujas, Lord Shiva rituals, path and jaap, and temple coordination.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <section className="section-apple" style={{ backgroundColor: "var(--apple-gray-bg)", paddingBottom: "48px" }}>
        <div className="container">
          <div className="apple-section-header" style={{ marginBottom: "24px" }}>
            <span className="apple-eyebrow">Directory</span>
            <h1>All Vedic Puja Services</h1>
            <p>
              Compare authentic Vedic ceremonies for home, temple, or live HD video guidance with verified Acharyas.
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
            <a href="#festival-pujas" className="apple-btn-pill apple-btn-secondary">
              Festivals
            </a>
            <a href="#lord-shiva-pujas" className="apple-btn-pill apple-btn-secondary">
              Lord Shiva
            </a>
            <a href="#path-jaap-services" className="apple-btn-pill apple-btn-secondary">
              Path &amp; Jaap
            </a>
            <a
              href={contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-btn-pill apple-btn-primary"
            >
              <MessageCircle size={15} />
              WhatsApp Coordinator
            </a>
          </div>
        </div>
      </section>

      {serviceCategories.map((category) => {
        const services = servicesByCategory(category.name);
        if (services.length === 0) return null;

        return (
          <section className="section-apple" id={category.slug} key={category.slug}>
            <div className="container">
              <div style={{ marginBottom: "32px" }}>
                <span className="apple-eyebrow">{category.name}</span>
                <h2 style={{ fontSize: "var(--font-h2)", margin: "4px 0 8px" }}>{category.name}</h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>{category.description}</p>
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
    </>
  );
}
