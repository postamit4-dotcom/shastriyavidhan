import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { contact } from "@/lib/site-data";
import { basePageMetadata } from "@/lib/seo";

export const metadata = basePageMetadata({
  title: "Pricing & Inclusions",
  description:
    "Learn what affects Shastriya Vidhan puja pricing, including Pandit Ji dakshina, duration, samagri, travel, temple charges, taxes, and cancellation terms.",
  path: "/pricing-and-inclusions",
});

const pricingFactors = [
  "Puja type, ritual scope, duration, and number of Pandit Jis",
  "Home, online, temple-linked, or community format",
  "Samagri included, excluded, or arranged separately",
  "Travel, parking, city, temple, tax, or payment charges where applicable",
  "Festival dates, lead time, and muhurat availability",
  "Rescheduling, refund, and cancellation terms",
];

const confirmationItems = [
  "Exact puja selected",
  "City, address, or online platform",
  "Preferred date and time window",
  "Language or regional tradition preference",
  "Inclusions and exclusions",
  "Final quote and payment step",
];

export default function PricingInclusionsPage() {
  return (
    <>
      <section className="section-apple" style={{ backgroundColor: "var(--apple-gray-bg)", paddingBottom: "48px" }}>
        <div className="container">
          <nav aria-label="Breadcrumb" className="service-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Pricing &amp; Inclusions</span>
          </nav>

          <div className="apple-section-header" style={{ marginBottom: "24px" }}>
            <span className="apple-eyebrow">Quote clarity</span>
            <h1>Pricing &amp; Inclusions</h1>
            <p>
              Prices are confirmed after the team reviews the puja, city, mode, samagri responsibility,
              travel needs, and timing. Do not pay until the final scope is clear.
            </p>
          </div>
        </div>
      </section>

      <section className="section-apple">
        <div className="container">
          <div className="service-inclusion-grid">
            <div className="apple-product-card">
              <h2>What affects price</h2>
              <ul>
                {pricingFactors.map((item) => (
                  <li key={item}>
                    <Check size={16} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="apple-product-card">
              <h2>Confirm before payment</h2>
              <ul>
                {confirmationItems.map((item) => (
                  <li key={item}>
                    <Check size={16} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="apple-product-card ethical-card">
              <h2>Policy basics</h2>
              <ul>
                {[
                  "Cancellation and refund terms should be shared before payment.",
                  "Temple and travel charges should be separated from dakshina where applicable.",
                  "No promotion should run without dates, terms, and eligibility.",
                ].map((item) => (
                  <li key={item}>
                    <span className="minus-marker">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <a href={contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="apple-btn-pill apple-btn-primary">
              Ask for a Quote
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
