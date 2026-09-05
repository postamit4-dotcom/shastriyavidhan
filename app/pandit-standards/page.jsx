import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { acharyaSursainProfile, panditStandards } from "@/lib/site-data";
import { basePageMetadata } from "@/lib/seo";

export const metadata = basePageMetadata({
  title: "Pandit Standards",
  description:
    "Review the Shastriya Vidhan Pandit Ji standards for identity, ritual fit, language preference, conduct, privacy, replacement, and complaints.",
  path: "/pandit-standards",
});

const standards = [
  "Identity and contact details",
  "Ritual knowledge and suitability for the requested puja",
  "Experience with the requested format, city, and tradition",
  "Language and regional tradition preference",
  "Code of conduct, punctuality, and preparation expectations",
  "Samagri responsibility and privacy standards",
  "Replacement, rescheduling, complaint, and review process",
];

export default function PanditStandardsPage() {
  return (
    <>
      <section className="section-apple" style={{ backgroundColor: "var(--apple-gray-bg)", paddingBottom: "48px" }}>
        <div className="container">
          <nav aria-label="Breadcrumb" className="service-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Pandit Standards</span>
          </nav>

          <div className="apple-section-header" style={{ marginBottom: "24px" }}>
            <span className="apple-eyebrow">Assignment standards</span>
            <h1>Pandit Standards</h1>
            <p>
              These are the checks customers should expect before a Pandit Ji is assigned.
              Public pages avoid the word certified unless a named certification process exists.
            </p>
          </div>
        </div>
      </section>

      <section className="section-apple">
        <div className="container">
          <div className="apple-profiles-grid">
            {panditStandards.map((standard) => (
              <article key={standard.title} className="apple-profile-card">
                <div className="apple-profile-photo-wrap">
                  <img src={standard.image} alt="" className="apple-profile-photo" loading="lazy" />
                </div>
                <div className="apple-profile-body">
                  <h2 className="apple-profile-name">{standard.title}</h2>
                  <p className="apple-profile-bio">{standard.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-apple" style={{ backgroundColor: "var(--apple-gray-bg)" }}>
        <div className="container">
          <div className="apple-product-card" style={{ maxWidth: "900px", margin: "0 auto", textAlign: "left" }}>
            <h2 className="apple-product-title">Minimum checklist</h2>
            <ul style={{ display: "grid", gap: "12px", listStyle: "none" }}>
              {standards.map((item) => (
                <li key={item} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <Check size={17} aria-hidden="true" style={{ color: "var(--apple-green)", marginTop: "3px" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "24px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <Link href="/book-puja" className="apple-btn-pill apple-btn-primary">
                Request a Pandit Ji
              </Link>
              <Link
                href={acharyaSursainProfile.path}
                className="apple-btn-pill apple-btn-secondary"
              >
                Acharya Sursain Brijwasi&apos;s profile
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
