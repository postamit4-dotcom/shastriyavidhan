import Link from "next/link";
import { ChevronRight, MapPin, MessageCircle } from "lucide-react";
import { acharyaSursainProfile, contact, locationPages } from "@/lib/site-data";
import { basePageMetadata, locationsDirectoryJsonLd } from "@/lib/seo";
import { getNodeById } from "@/lib/site-registry";

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
            <Link href="/puja-services" className="apple-btn-pill apple-btn-secondary">
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
          <article className="apple-product-card" style={{ maxWidth: "900px", margin: "0 auto 28px", textAlign: "left" }}>
            <span className="apple-product-tag">Ghaziabad profile</span>
            <h2 className="apple-product-title">Named local profile for Ghaziabad enquiries.</h2>
            <p className="apple-product-desc" style={{ marginBottom: 0 }}>
              For local puja enquiries, review{" "}
              <Link href={acharyaSursainProfile.path}>Acharya Sursain Brijwasi&apos;s Ghaziabad profile</Link> and
              share your ceremony, date, locality, and samagri requirements for availability confirmation.
            </p>
          </article>
          <div className="apple-products-grid">
            {locationPages.map((location) => (
              <LocationCard key={location.slug} location={location} />
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

function LocationCard({ location }) {
  const node = getNodeById(`location-${location.slug}`);
  const isPublic = location.slug === "online-puja" || Boolean(node?.indexable);
  const gateText =
    location.slug === "online-puja"
      ? "Online puja has a public mode page; each request is still reviewed before confirmation."
      : isPublic
        ? "Public city page is verified."
        : "City page remains hidden from sitemap and navigation until owner verification.";

  return (
    <article className="apple-product-card" style={{ textAlign: "left" }}>
      <span className="apple-product-tag">{location.badge}</span>
      <h2 className="apple-product-title" style={{ fontSize: "1.35rem" }}>
        {isPublic ? (
          <Link href={location.href} style={{ color: "inherit" }}>
            {location.city}
          </Link>
        ) : (
          location.city
        )}
      </h2>
      <p className="apple-product-desc">{location.coverage}</p>
      <div className="apple-product-specs">
        <div>
          <strong>Status:</strong> {location.status}
        </div>
        <div>
          <strong>Evidence gate:</strong>{" "}
          {gateText}
        </div>
      </div>
      {isPublic ? (
        <Link href={location.href} className="apple-link apple-link-sm">
          <MapPin size={13} aria-hidden="true" />
          <span>View {location.city} options</span>
          <ChevronRight size={13} className="apple-link-chevron" aria-hidden="true" />
        </Link>
      ) : (
        <a href={contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="apple-link apple-link-sm">
          <MapPin size={13} aria-hidden="true" />
          <span>Ask about {location.city}</span>
          <ChevronRight size={13} className="apple-link-chevron" aria-hidden="true" />
        </a>
      )}
    </article>
  );
}
