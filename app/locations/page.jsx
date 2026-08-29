import Link from "next/link";
import { ChevronRight, MapPin, MessageCircle } from "lucide-react";
import { contact, locationPages } from "@/lib/site-data";
import { basePageMetadata, locationsDirectoryJsonLd } from "@/lib/seo";

const title = "Pandit Ji Service Locations";
const description =
  "Book Pandit Ji for home puja in Noida, Delhi, Gurugram, Ujjain temple coordination, and online video puja worldwide.";

export const metadata = basePageMetadata({
  title,
  description,
  path: "/locations",
  imageAlt: "Shastriya Vidhan Pandit Ji service locations",
});

export default function LocationsPage() {
  const jsonLd = locationsDirectoryJsonLd();

  return (
    <>
      <section className="section-apple" style={{ backgroundColor: "var(--apple-gray-bg)", paddingBottom: "48px" }}>
        <div className="container">
          <nav aria-label="Breadcrumb" className="service-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Locations</span>
          </nav>

          <div className="apple-section-header" style={{ marginBottom: "24px" }}>
            <span className="apple-eyebrow">Service Areas</span>
            <h1>Book Pandit Ji by location.</h1>
            <p>
              Choose your city or online puja mode to see relevant Vedic puja services,
              preparation guidance, and booking support.
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
            <Link href="/services" className="apple-btn-pill apple-btn-secondary">
              Browse Pujas
            </Link>
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

      <section className="section-apple">
        <div className="container">
          <div className="apple-products-grid">
            {locationPages.map((location) => (
              <article key={location.slug} className="apple-product-card" style={{ textAlign: "left" }}>
                <span className="apple-product-tag">{location.badge}</span>
                <h2 className="apple-product-title" style={{ fontSize: "1.35rem" }}>
                  <Link href={location.href} style={{ color: "inherit" }}>
                    {location.city}
                  </Link>
                </h2>
                <p className="apple-product-desc">{location.coverage}</p>
                <div className="apple-product-specs">
                  <div>
                    <strong>Status:</strong> {location.status}
                  </div>
                  <div>
                    <strong>Phone:</strong> {location.phone}
                  </div>
                </div>
                <Link href={location.href} className="apple-link apple-link-sm">
                  <MapPin size={13} aria-hidden="true" />
                  <span>View {location.city} options</span>
                  <ChevronRight size={13} className="apple-link-chevron" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
