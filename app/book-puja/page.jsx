import Link from "next/link";
import { ChevronRight, MessageCircle, PhoneCall } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { contact } from "@/lib/site-data";
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
          <ContactForm />
        </div>
      </section>
    </>
  );
}
