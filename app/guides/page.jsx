import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { pujaGuides } from "@/lib/site-data";
import { basePageMetadata } from "@/lib/seo";

export const metadata = basePageMetadata({
  title: "Puja Guides & Samagri",
  description:
    "Browse Shastriya Vidhan puja preparation, samagri, festival, sanskar, deity, and booking guidance with reviewer status.",
  path: "/guides",
});

const guideSections = [
  {
    id: "puja-preparation",
    title: "Puja Preparation",
    body: "Practical guidance for puja space, family participation, language preference, timing, and what to confirm before payment.",
  },
  {
    id: "samagri-guidance",
    title: "Samagri Guidance",
    body: "Separate what the family prepares from what may be included in a quote. Samagri should never be assumed until city and package are confirmed.",
  },
  {
    id: "festival-guides",
    title: "Festival Guides",
    body: "Festival pages need annual date, city, tithi, and reviewer checks before they are promoted in navigation.",
  },
  {
    id: "booking-guidance",
    title: "Booking Guidance",
    body: "Request-first booking protects families from unclear pricing, unavailable time slots, and unsupported instant-confirmation claims.",
  },
];

export default function GuidesPage() {
  return (
    <>
      <section className="section-apple" style={{ backgroundColor: "var(--apple-gray-bg)", paddingBottom: "48px" }}>
        <div className="container">
          <nav aria-label="Breadcrumb" className="service-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Guides</span>
          </nav>

          <div className="apple-section-header" style={{ marginBottom: "24px" }}>
            <span className="apple-eyebrow">Preparation library</span>
            <h1>Puja Guides &amp; Samagri</h1>
            <p>
              Guides are grouped by preparation need and should carry reviewer status, last reviewed date,
              related services, and sources where appropriate before standalone promotion.
            </p>
          </div>
        </div>
      </section>

      <section className="section-apple">
        <div className="container">
          <div className="apple-products-grid">
            {pujaGuides.map((guide) => (
              <article key={guide.id} className="apple-product-card" style={{ textAlign: "left", padding: "20px" }}>
                <div style={{ aspectRatio: "16/10", borderRadius: "var(--radius-inner)", overflow: "hidden", marginBottom: "16px" }}>
                  <img src={guide.image} alt={guide.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                </div>
                <span className="apple-product-tag">{guide.category} - {guide.readTime}</span>
                <h2 style={{ fontSize: "1.08rem", fontWeight: 700, margin: "6px 0 8px", lineHeight: 1.3 }}>{guide.title}</h2>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "14px", lineHeight: 1.45 }}>{guide.summary}</p>
                <p style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", marginBottom: "14px" }}>
                  {guide.reviewer} - Last updated {guide.updated}
                </p>
                <Link href="/book-puja" className="apple-link apple-link-sm">
                  <span>Request related puja</span>
                  <ChevronRight size={13} className="apple-link-chevron" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {guideSections.map((section) => (
        <section
          className="section-apple"
          id={section.id}
          key={section.id}
          style={{ backgroundColor: section.id === "samagri-guidance" ? "var(--apple-gray-bg)" : undefined }}
        >
          <div className="container">
            <div className="apple-product-card" style={{ maxWidth: "860px", margin: "0 auto", textAlign: "left" }}>
              <span className="apple-eyebrow">{section.title}</span>
              <h2 className="apple-product-title">{section.title}</h2>
              <p className="apple-product-desc" style={{ marginBottom: 0 }}>
                {section.body}
              </p>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
