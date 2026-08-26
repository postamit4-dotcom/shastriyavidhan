import { CalendarCheck, MapPin, MessageCircle, PhoneCall, ShieldCheck, Mail, Sparkles } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { contact, site } from "@/lib/site-data";

export const metadata = {
  title: "Contact & Pandit Ji Booking Desk",
  description:
    "Contact Shastriya Vidhan for Pandit Ji booking assistance in Noida, Delhi, Gurugram, and Online Video Puja coordination.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="section-wrapper bg-sand-light" style={{ paddingBottom: "48px" }}>
        <div className="container">
          <div className="section-head-center">
            <span className="badge-pill badge-saffron" style={{ marginBottom: "12px" }}>
              24/7 Spiritual Booking Desk
            </span>
            <h1>Contact Shastriya Vidhan</h1>
            <p>
              Have questions about auspicious muhurat, samagri requirements, or Pandit Ji availability? Our Vedic coordination team is here to assist your family.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginTop: "36px" }}>
            {/* Phone */}
            <div style={{ backgroundColor: "var(--white)", borderRadius: "var(--radius-lg)", padding: "24px", border: "1px solid var(--line-soft)", textAlign: "center" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", backgroundColor: "var(--sand-light)", color: "var(--deep-ink)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                <PhoneCall size={22} />
              </div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "4px" }}>Call Booking Desk</h2>
              <p style={{ fontSize: "0.88rem", color: "var(--muted-text)", marginBottom: "12px" }}>Mon - Sun (7:00 AM - 9:00 PM)</p>
              <a href={`tel:${contact.phone}`} className="btn-pill btn-sm btn-outline" style={{ width: "100%" }}>
                {contact.displayPhone}
              </a>
            </div>

            {/* WhatsApp */}
            <div style={{ backgroundColor: "var(--white)", borderRadius: "var(--radius-lg)", padding: "24px", border: "1px solid var(--line-soft)", textAlign: "center" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", backgroundColor: "var(--green-light)", color: "var(--tulsi-green)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                <MessageCircle size={22} />
              </div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "4px" }}>WhatsApp Assistance</h2>
              <p style={{ fontSize: "0.88rem", color: "var(--muted-text)", marginBottom: "12px" }}>Instant responses &amp; samagri lists</p>
              <a href={contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-pill btn-sm btn-whatsapp" style={{ width: "100%" }}>
                Chat on WhatsApp
              </a>
            </div>

            {/* Service Hubs */}
            <div style={{ backgroundColor: "var(--white)", borderRadius: "var(--radius-lg)", padding: "24px", border: "1px solid var(--line-soft)", textAlign: "center" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", backgroundColor: "var(--saffron-surface)", color: "var(--saffron-dark)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                <MapPin size={22} />
              </div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "4px" }}>Coverage Areas</h2>
              <p style={{ fontSize: "0.88rem", color: "var(--muted-text)", marginBottom: "12px" }}>Noida, Delhi, Gurugram, Ujjain &amp; Global Online</p>
              <span className="badge-pill badge-saffron" style={{ display: "inline-block" }}>
                Full NCR Coverage
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Form on Contact Page */}
      <section className="section-wrapper">
        <div className="container">
          <div className="section-head-center">
            <span className="badge-pill badge-saffron" style={{ marginBottom: "12px" }}>
              Send Request
            </span>
            <h2>Tell us about your puja requirement</h2>
            <p>{contact.responsePromise}</p>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
