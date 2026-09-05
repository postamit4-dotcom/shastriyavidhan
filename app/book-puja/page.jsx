import Link from "next/link";
import { ChevronRight, MessageCircle, PhoneCall } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { acharyaSursainProfile, contact } from "@/lib/site-data";
import { basePageMetadata } from "@/lib/seo";

export const metadata = basePageMetadata({
  title: "Book Puja",
  description:
    "Submit a Shastriya Vidhan puja booking request for home puja, online guidance, or temple-linked coordination with manual availability and quote review.",
  path: "/book-puja",
});

export default function BookPujaPage() {
  return (
    <>
      <section className="section-apple" style={{ backgroundColor: "var(--apple-gray-bg)", paddingBottom: "48px" }}>
        <div className="container">
          <nav aria-label="Breadcrumb" className="service-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Book Puja</span>
          </nav>

          <div className="apple-section-header" style={{ marginBottom: "24px" }}>
            <span className="apple-eyebrow">Booking request</span>
            <h1>Book Puja</h1>
            <p>{contact.responsePromise}</p>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <a href={contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="apple-btn-pill apple-btn-secondary">
              <MessageCircle size={17} aria-hidden="true" />
              WhatsApp Booking Desk
            </a>
            <a href={`tel:${contact.phone}`} className="apple-btn-pill apple-btn-secondary">
              <PhoneCall size={17} aria-hidden="true" />
              Call {contact.displayPhone}
            </a>
          </div>
        </div>
      </section>

      <section className="section-apple" id="booking-section">
        <div className="container">
          <article className="apple-product-card" style={{ maxWidth: "900px", margin: "0 auto 28px", textAlign: "left" }}>
            <span className="apple-product-tag">Ghaziabad puja enquiry</span>
            <h2 className="apple-product-title">Review the local profile before submitting details.</h2>
            <p className="apple-product-desc" style={{ marginBottom: 0 }}>
              For a Ghaziabad puja enquiry, review{" "}
              <Link href={acharyaSursainProfile.path}>Acharya Sursain Brijwasi&apos;s profile</Link> and share the
              ceremony name, locality, preferred date, and samagri requirement for manual confirmation.
            </p>
          </article>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
