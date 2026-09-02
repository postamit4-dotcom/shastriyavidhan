import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import PanditJiPicture, { panditJiImage } from "@/components/PanditJiPicture";
import { contact, site } from "@/lib/site-data";
import { basePageMetadata } from "@/lib/seo";

export const metadata = basePageMetadata({
  title: "About Shastriya Vidhan",
  description:
    "Learn about Shastriya Vidhan's request-first puja booking model, service areas, formats, support process, and standards-first approach.",
  path: "/about",
});

const facts = [
  ["Business identity", site.legalName],
  ["Support phone", contact.displayPhone],
  ["Service areas", contact.serviceArea],
  ["Booking model", "Manual request review before payment"],
  ["Puja formats", "Home puja, online guidance, and temple-linked requests subject to availability"],
];

export default function AboutPage() {
  return (
    <>
      <section className="section-apple" style={{ backgroundColor: "var(--apple-gray-bg)", paddingBottom: "48px" }}>
        <div className="container">
          <nav aria-label="Breadcrumb" className="service-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>About</span>
          </nav>

          <div className="service-apple-hero-grid">
            <div>
              <span className="apple-eyebrow">About Shastriya Vidhan</span>
              <h1>Request-first puja booking with clear coordination.</h1>
              <p>
                Shastriya Vidhan helps families request Pandit Ji services for home puja, online guidance,
                and selected temple-linked rituals. The site now avoids unsupported ranking claims and focuses
                on verified-at-booking information.
              </p>
              <div className="service-hero-actions">
                <Link href="/how-it-works" className="apple-btn-pill apple-btn-primary">
                  How It Works
                </Link>
                <Link href="/pandit-standards" className="apple-btn-pill apple-btn-secondary">
                  Pandit Standards
                </Link>
              </div>
            </div>

            <div className="service-hero-visual-card">
              <img
                src="/images/diwali-puja.webp"
                alt="Traditional puja setup arranged for a family ceremony"
                width="736"
                height="552"
              />
              <div className="service-hero-floating-card">
                <span>Support desk</span>
                <strong>{contact.displayPhone}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-apple">
        <div className="container">
          <article className="about-pandit-card" aria-labelledby="about-pandit-heading">
            <div className="about-pandit-media">
              <PanditJiPicture
                alt="Acharya Sursain Brijwasi of Shastriya Vidhan"
                className="about-pandit-picture"
                imgClassName="about-pandit-image"
                sizes="(max-width: 760px) min(84vw, 380px), 260px"
              />
            </div>
            <div>
              <span className="apple-product-tag">Public Pandit Ji profile</span>
              <h2 id="about-pandit-heading">Acharya Sursain Brijwasi</h2>
              <p>
                Shastriya Vidhan lists Acharya Sursain Brijwasi for Ghaziabad puja enquiries
                with a request-first process, clear availability review, and no unsupported
                promises before booking.
              </p>
              <div className="about-pandit-actions">
                <Link href="/pandit-ji/acharya-sursain-brijwasi-ghaziabad" className="apple-btn-pill apple-btn-secondary">
                  View Profile
                  <ChevronRight size={15} aria-hidden="true" />
                </Link>
                <span>{panditJiImage.caption}</span>
              </div>
            </div>
          </article>

          <div className="apple-section-header">
            <span className="apple-eyebrow">Operating facts</span>
            <h2>What the customer should know.</h2>
          </div>

          <div className="service-inclusion-grid">
            {facts.map(([label, value]) => (
              <article key={label} className="apple-product-card" style={{ textAlign: "left" }}>
                <span className="apple-product-tag">{label}</span>
                <p className="apple-product-desc" style={{ marginBottom: 0 }}>
                  {value}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-apple" style={{ backgroundColor: "var(--apple-gray-bg)" }}>
        <div className="container">
          <div className="apple-product-card" style={{ maxWidth: "880px", margin: "0 auto", textAlign: "left" }}>
            <h2 className="apple-product-title">Trust repair principles</h2>
            <ul style={{ display: "grid", gap: "12px", listStyle: "none" }}>
              {[
                "No placeholder email, foreign address, or unrelated map.",
                "No unsupported satisfaction rates, project counts, or indefinite sale claims.",
                "No named testimonials or individual priest credentials without consent and documentation.",
                "Policy pages and support routes remain visible from the footer and booking flow.",
              ].map((item) => (
                <li key={item} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <Check size={17} aria-hidden="true" style={{ color: "var(--apple-green)", marginTop: "3px" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
