import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { acharyaSursainProfile, bookingSteps, contact } from "@/lib/site-data";
import { basePageMetadata } from "@/lib/seo";

export const metadata = basePageMetadata({
  title: "How Puja Booking Works",
  description:
    "Understand the Shastriya Vidhan request-first puja booking process, from service selection to availability, samagri, quote, and completion.",
  path: "/how-it-works",
});

const detailedSteps = [
  "Select a puja or request guidance.",
  "Submit city, date, language, mode, and puja requirements.",
  "Receive availability and package confirmation.",
  "Confirm inclusions, exclusions, travel charges, taxes, and cancellation terms.",
  "Complete Pandit Ji assignment and pre-puja coordination.",
  "Confirm puja preparation and samagri responsibility.",
  "Complete the puja at home, online, or at a suitable temple.",
  "Receive support, invoice details, and feedback follow-up where applicable.",
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="section-apple" style={{ backgroundColor: "var(--apple-gray-bg)", paddingBottom: "48px" }}>
        <div className="container">
          <nav aria-label="Breadcrumb" className="service-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>How It Works</span>
          </nav>

          <div className="apple-section-header" style={{ marginBottom: "24px" }}>
            <span className="apple-eyebrow">Request-first booking</span>
            <h1>How puja booking works.</h1>
            <p>{contact.responsePromise}</p>
          </div>
        </div>
      </section>

      <section className="section-apple">
        <div className="container">
          <div className="apple-steps-row">
            {bookingSteps.map((step) => (
              <article key={step.step} className="apple-step-item">
                <span className="apple-step-num">{step.step}</span>
                <h2 className="apple-step-title">{step.title}</h2>
                <p className="apple-step-body">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-apple" style={{ backgroundColor: "var(--apple-gray-bg)" }}>
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Full journey</span>
            <h2>What should be confirmed before payment.</h2>
          </div>

          <div className="service-inclusion-grid">
            {detailedSteps.map((step, index) => (
              <article key={step} className="apple-product-card" style={{ textAlign: "left" }}>
                <span className="apple-product-tag">{String(index + 1).padStart(2, "0")}</span>
                <p className="apple-product-desc" style={{ marginBottom: 0 }}>
                  {step}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-apple">
        <div className="container">
          <div className="apple-product-card" style={{ maxWidth: "840px", margin: "0 auto", textAlign: "left" }}>
            <h2 className="apple-product-title">Booking acceptance checklist</h2>
            <ul style={{ display: "grid", gap: "12px", listStyle: "none" }}>
              {[
                "Pandit Ji availability is manually reviewed.",
                "Samagri responsibility is clear.",
                "Travel, temple, tax, and payment charges are explained where applicable.",
                "No instant confirmation or guaranteed outcome is promised.",
              ].map((item) => (
                <li key={item} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <Check size={17} aria-hidden="true" style={{ color: "var(--apple-green)", marginTop: "3px" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="apple-product-desc" style={{ marginTop: "18px", marginBottom: 0 }}>
              If the ceremony is planned in Ghaziabad, you may review{" "}
              <Link href={acharyaSursainProfile.path}>Acharya Sursain Brijwasi&apos;s profile</Link> and then submit
              the puja, date, location, and samagri details for manual confirmation.
            </p>
            <div style={{ marginTop: "24px" }}>
              <Link href="/book-puja" className="apple-btn-pill apple-btn-primary">
                Start a Booking Request
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
