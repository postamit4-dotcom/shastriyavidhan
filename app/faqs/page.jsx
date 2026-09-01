import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import { basePageMetadata } from "@/lib/seo";

export const metadata = basePageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common Shastriya Vidhan puja booking questions about availability, samagri, locations, online puja, confirmation, and cancellations.",
  path: "/faqs",
});

export default function FaqsPage() {
  return (
    <>
      <section className="section-apple" style={{ backgroundColor: "var(--apple-gray-bg)", paddingBottom: "48px" }}>
        <div className="container">
          <nav aria-label="Breadcrumb" className="service-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Frequently Asked Questions</span>
          </nav>

          <div className="apple-section-header" style={{ marginBottom: "24px" }}>
            <span className="apple-eyebrow">FAQ</span>
            <h1>Frequently Asked Questions</h1>
            <p>
              Answers are written for a request-first booking process. Final availability, quote, and samagri
              responsibility are confirmed manually.
            </p>
          </div>
        </div>
      </section>

      <section className="section-apple">
        <div className="container">
          <FaqAccordion />
        </div>
      </section>
    </>
  );
}
