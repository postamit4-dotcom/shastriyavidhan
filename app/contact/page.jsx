import Link from "next/link";
import { ChevronRight, MapPin, MessageCircle, PhoneCall } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import PanditJiPicture from "@/components/PanditJiPicture";
import { contact } from "@/lib/site-data";
import { basePageMetadata, contactPageJsonLd } from "@/lib/seo";

const title = "Contact & Pandit Ji Booking Desk";
const description =
  "Contact Shastriya Vidhan for Pandit Ji booking assistance in Ghaziabad, Noida, Delhi, Gurugram, Ujjain, and Online Video Puja coordination.";

export const metadata = basePageMetadata({
  title,
  description,
  path: "/contact",
  imageAlt: "Contact Shastriya Vidhan Pandit Ji booking desk",
});

export default function ContactPage() {
  const jsonLd = contactPageJsonLd();

  return (
    <>
      <section className="section-wrapper bg-sand-light" style={{ paddingBottom: "48px" }}>
        <div className="container">
          <nav aria-label="Breadcrumb" className="service-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Contact</span>
          </nav>

          <div className="section-head-center">
            <span className="badge-pill badge-saffron" style={{ marginBottom: "12px" }}>
              Booking Desk
            </span>
            <h1>Contact Shastriya Vidhan</h1>
            <p>
              Have questions about muhurat, samagri requirements, or Pandit Ji availability? Share your request and the booking desk will review the details before confirmation.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginTop: "36px" }}>
            {/* Phone */}
            <div style={{ backgroundColor: "var(--white)", borderRadius: "var(--radius-lg)", padding: "24px", border: "1px solid var(--line-soft)", textAlign: "center" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", backgroundColor: "var(--sand-light)", color: "var(--deep-ink)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                <PhoneCall size={22} />
              </div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "4px" }}>Call Booking Desk</h2>
              <p style={{ fontSize: "0.88rem", color: "var(--muted-text)", marginBottom: "12px" }}>Response window is confirmed by the booking desk</p>
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
              <p style={{ fontSize: "0.88rem", color: "var(--muted-text)", marginBottom: "12px" }}>Manual response and samagri guidance</p>
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
              <p style={{ fontSize: "0.88rem", color: "var(--muted-text)", marginBottom: "12px" }}>Ghaziabad, Noida, Delhi, Gurugram, Ujjain &amp; Global Online</p>
              <span className="badge-pill badge-saffron" style={{ display: "inline-block" }}>
                Request areas listed
              </span>
            </div>

            <div style={{ backgroundColor: "var(--white)", borderRadius: "var(--radius-lg)", padding: "24px", border: "1px solid var(--line-soft)", textAlign: "center" }}>
              <div className="contact-pandit-avatar">
                <PanditJiPicture
                  alt="Acharya Sursain Brijwasi of Shastriya Vidhan"
                  className="contact-pandit-picture"
                  imgClassName="contact-pandit-image"
                  sizes="72px"
                />
              </div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "4px" }}>Pandit Ji in Ghaziabad</h2>
              <p style={{ fontSize: "0.88rem", color: "var(--muted-text)", marginBottom: "12px" }}>View the profile for Acharya Sursain Brijwasi before sending a puja enquiry.</p>
              <Link href="/pandit-ji/acharya-sursain-brijwasi-ghaziabad" className="btn-pill btn-sm btn-outline" style={{ width: "100%" }}>
                View Pandit Ji Profile
              </Link>
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
