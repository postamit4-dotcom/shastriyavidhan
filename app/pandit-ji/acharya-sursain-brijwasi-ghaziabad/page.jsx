import Link from "next/link";
import {
  Check,
  ChevronRight,
  ClipboardList,
  MapPin,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import PanditJiPicture, { panditJiImage } from "@/components/PanditJiPicture";
import { contact } from "@/lib/site-data";
import { absoluteUrl, basePageMetadata, breadcrumbJsonLd } from "@/lib/seo";

const profilePath = "/pandit-ji/acharya-sursain-brijwasi-ghaziabad";
const profileUrl = absoluteUrl(profilePath);
const profileImage = panditJiImage.schema;
const profileOgImage = panditJiImage.og;
const profileImageAlt = panditJiImage.alt;
const title = "Acharya Sursain Brijwasi | Pandit Ji in Ghaziabad";
const description =
  "Meet Acharya Sursain Brijwasi, a Brijwasi Pandit Ji in Ghaziabad. Contact Shastriya Vidhan for puja enquiries, availability and booking guidance.";
const whatsappMessage =
  "Namaste, I would like to enquire about booking Acharya Sursain Brijwasi for a puja in Ghaziabad. Please share availability, process and quote.";
const profileWhatsAppLink = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

const baseMetadata = basePageMetadata({
  title,
  description,
  path: profilePath,
  image: profileOgImage,
  imageAlt: profileImageAlt,
  type: "profile",
});

export const metadata = {
  ...baseMetadata,
  keywords: [
    "Pandit Ji in Ghaziabad",
    "Acharya Sursain Brijwasi",
    "Sursain Brijwasi Pandit Ji",
    "Brijwasi Pandit Ji Ghaziabad",
    "Book Pandit Ji in Ghaziabad",
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title,
    description,
    url: profileUrl,
    type: "profile",
    images: [
      {
        url: profileOgImage,
        width: 1200,
        height: 630,
        alt: profileImageAlt,
      },
    ],
  },
  twitter: {
    ...baseMetadata.twitter,
    title,
    description,
    images: [profileOgImage],
  },
};

const quickFacts = [
  ["Name", "Acharya Sursain Brijwasi"],
  ["Also known as", "Sursain Brijwasi"],
  ["Role", "Brijwasi Pandit Ji"],
  ["Service enquiry area", "Ghaziabad"],
  ["Contact", contact.displayPhone],
  ["Booking status", "Subject to availability confirmation"],
];

const bookingSteps = [
  "Contact through WhatsApp or phone.",
  "Share the puja or ceremony name.",
  "Share the Ghaziabad locality and complete service location.",
  "Share the preferred date and time.",
  "Mention whether samagri support is required.",
  "Wait for availability, scope, duration, and quote confirmation.",
  "Complete payment only after the service details and booking terms are clear.",
];

const bookingChecklist = [
  "Puja or ceremony name",
  "Preferred date",
  "Preferred time",
  "Ghaziabad locality",
  "Number of participating family members, if relevant",
  "Home, temple, or online preference",
  "Language or family tradition preference, if applicable",
  "Samagri requirement",
  "Any special Sankalp details",
  "Accessibility or timing constraints",
];

const transparencyItems = [
  "Availability is not guaranteed instantly.",
  "No spiritual, financial, health, marriage, legal, career, or material outcome is guaranteed.",
  "Final quote depends on puja scope, location, timing, travel, and samagri.",
  "Customers should confirm inclusions and booking terms before payment.",
  "Muhurat and ritual details may depend on family tradition and location.",
];

const faqs = [
  {
    question: "Who is Acharya Sursain Brijwasi?",
    answer:
      "Acharya Sursain Brijwasi is listed here as a Brijwasi Pandit Ji for Ghaziabad puja enquiries. The page uses only the verified public details currently available.",
  },
  {
    question: "How can I contact Pandit Ji in Ghaziabad?",
    answer: `You can call ${contact.displayPhone} or send a WhatsApp enquiry to share your puja requirement and preferred date.`,
  },
  {
    question: "How do I request a puja booking?",
    answer:
      "Share the puja name, Ghaziabad locality, preferred date, time, samagri needs, and any family tradition preference. The team reviews the request before confirmation.",
  },
  {
    question: "Which Ghaziabad areas are covered?",
    answer:
      "This page is for Ghaziabad enquiries. Exact locality coverage is confirmed after you share the complete service location.",
  },
  {
    question: "Which pujas can I request?",
    answer:
      "You can share the ceremony you need and also browse the Shastriya Vidhan puja service pages. Suitability and Pandit Ji availability are confirmed after enquiry.",
  },
  {
    question: "Is puja samagri included?",
    answer:
      "Samagri inclusion depends on the selected puja, location, timing, and final quote. Confirm the checklist and responsibility before payment.",
  },
  {
    question: "Is the booking confirmed immediately?",
    answer:
      "No. Availability, ritual scope, samagri, duration, and quote are reviewed manually before a booking is confirmed.",
  },
  {
    question: "What details should I send on WhatsApp?",
    answer:
      "Send the puja name, preferred date and time, Ghaziabad locality, service mode, family participation details, and whether samagri guidance is needed.",
  },
  {
    question: "Can I request a specific date and time?",
    answer:
      "Yes, you can request a preferred date and time. Final timing depends on Pandit Ji availability, muhurat considerations, and location feasibility.",
  },
  {
    question: "Is the final price shown on the profile page?",
    answer:
      "No. The final quote is shared after the required puja, location, timing, samagri needs, and scope are reviewed.",
  },
];

function profileJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${profileUrl}#webpage`,
        url: profileUrl,
        name: title,
        description,
        inLanguage: "en-IN",
        isPartOf: {
          "@id": `${absoluteUrl("/")}#website`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          "@id": `${profileUrl}#primaryimage`,
          url: absoluteUrl(profileImage),
          contentUrl: absoluteUrl(profileImage),
          width: panditJiImage.width,
          height: panditJiImage.height,
          encodingFormat: "image/webp",
          caption: panditJiImage.caption,
        },
        breadcrumb: {
          "@id": `${profileUrl}#breadcrumb`,
        },
        mainEntity: {
          "@id": `${profileUrl}#person`,
        },
      },
      {
        "@type": "Person",
        "@id": `${profileUrl}#person`,
        name: "Acharya Sursain Brijwasi",
        alternateName: "Sursain Brijwasi",
        jobTitle: "Pandit Ji",
        telephone: contact.phone,
        url: profileUrl,
        image: absoluteUrl(profileImage),
      },
      breadcrumbJsonLd(
        [
          { name: "Home", path: "/" },
          { name: "Acharya Sursain Brijwasi", path: profilePath },
        ],
        profilePath,
      ),
    ],
  };
}

function ContactActions({ compact = false }) {
  return (
    <div className="service-hero-actions">
      <a
        href={profileWhatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        className="apple-btn-pill apple-btn-primary"
        id={compact ? "profile-final-whatsapp-cta" : "profile-hero-whatsapp-cta"}
        aria-label={`WhatsApp Acharya Sursain Brijwasi enquiry at ${contact.displayPhone}`}
      >
        <MessageCircle size={17} aria-hidden="true" />
        {compact ? `WhatsApp ${contact.displayPhone}` : "WhatsApp Pandit Ji"}
      </a>
      <a
        href={`tel:${contact.phone}`}
        className="apple-btn-pill apple-btn-secondary"
        id={compact ? "profile-final-call-cta" : "profile-hero-call-cta"}
        aria-label={`Call Acharya Sursain Brijwasi at ${contact.displayPhone}`}
      >
        <PhoneCall size={17} aria-hidden="true" />
        {compact ? "Call Pandit Ji" : `Call ${contact.displayPhone}`}
      </a>
    </div>
  );
}

export default function AcharyaSursainBrijwasiPage() {
  const jsonLd = profileJsonLd();

  return (
    <>
      <section className="section-apple service-premium-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="service-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Acharya Sursain Brijwasi</span>
          </nav>

          <div className="service-apple-hero-grid">
            <div>
              <span className="apple-eyebrow">Pandit Ji in Ghaziabad</span>
              <h1>Acharya Sursain Brijwasi &ndash; Pandit Ji in Ghaziabad</h1>
              <p>
                Contact Acharya Sursain Brijwasi for puja enquiries in Ghaziabad. Share your
                required puja, preferred date and location to confirm availability, ritual scope,
                samagri guidance and quote before booking.
              </p>
              <ContactActions />
              <p className="service-hero-note">Availability and booking details are confirmed manually before payment.</p>
              <div className="service-authority-grid" aria-label="Booking clarity">
                <div>
                  <Check size={16} aria-hidden="true" />
                  <span>Request first</span>
                  <strong>Send details before any booking confirmation.</strong>
                </div>
                <div>
                  <ShieldCheck size={16} aria-hidden="true" />
                  <span>Clear scope</span>
                  <strong>Ritual, samagri, duration, and quote are reviewed.</strong>
                </div>
                <div>
                  <MapPin size={16} aria-hidden="true" />
                  <span>Ghaziabad enquiry</span>
                  <strong>Locality coverage is confirmed during coordination.</strong>
                </div>
              </div>
            </div>

            <figure className="service-hero-visual-card profile-hero-visual-card">
              <PanditJiPicture
                alt={profileImageAlt}
                className="profile-hero-picture"
                imgClassName="profile-hero-image"
                sizes="(max-width: 900px) min(88vw, 520px), 420px"
                loading="eager"
                fetchPriority="high"
              />
              <figcaption className="service-hero-floating-card">
                <span>Acharya Sursain Brijwasi</span>
                <strong>Shastriya Vidhan</strong>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="service-specs-bar" aria-label="Quick profile information">
        <div className="container service-specs-grid">
          <div>
            <ClipboardList size={18} aria-hidden="true" />
            <span>Name</span>
            <strong>Acharya Sursain Brijwasi</strong>
          </div>
          <div>
            <Check size={18} aria-hidden="true" />
            <span>Also known as</span>
            <strong>Sursain Brijwasi</strong>
          </div>
          <div>
            <MapPin size={18} aria-hidden="true" />
            <span>Area</span>
            <strong>Ghaziabad, Uttar Pradesh</strong>
          </div>
          <div>
            <PhoneCall size={18} aria-hidden="true" />
            <span>Contact</span>
            <strong>
              <a href={`tel:${contact.phone}`}>{contact.displayPhone}</a>
            </strong>
          </div>
        </div>
      </section>

      <section className="section-apple">
        <div className="container">
          <article className="apple-product-card" style={{ maxWidth: "940px", margin: "0 auto", textAlign: "left" }}>
            <span className="apple-product-tag">Quick profile</span>
            <h2 className="apple-product-title">Confirmed public information</h2>
            <div className="apple-product-specs" style={{ textAlign: "left" }}>
              {quickFacts.map(([label, value]) => (
                <div key={label}>
                  <strong>{label}:</strong>{" "}
                  {label === "Contact" ? <a href={`tel:${contact.phone}`}>{value}</a> : value}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-apple service-longform-section">
        <div className="container service-content-shell">
          <aside className="service-toc-card" aria-label="Profile page sections">
            <span className="apple-eyebrow">On this page</span>
            <nav>
              <a href="#about-acharya">About Acharya</a>
              <a href="#puja-enquiry">Puja enquiry support</a>
              <a href="#booking-steps">How to request</a>
              <a href="#ghaziabad-service">Ghaziabad service info</a>
              <a href="#booking-clarity">Booking transparency</a>
              <a href="#profile-faqs">FAQs</a>
            </nav>
          </aside>

          <div className="service-article-stack">
            <article id="about-acharya">
              <span>01</span>
              <h2>About Acharya Sursain Brijwasi</h2>
              <p>
                Acharya Sursain Brijwasi is presented on this page for people looking for a
                Brijwasi Pandit Ji in Ghaziabad. Visitors can contact Shastriya Vidhan to submit
                a puja request and receive manual confirmation of availability, ritual
                requirements, samagri expectations, and booking details. The page avoids adding
                unverified biography, credentials, pricing, or outcome claims.
              </p>
            </article>

            <article id="puja-enquiry">
              <span>02</span>
              <h2>Puja enquiry support in Ghaziabad</h2>
              <p>
                Share the puja or ceremony you need. The team will review the request and confirm
                whether Acharya Sursain Brijwasi is available and suitable for the required ritual.
                You can also browse the <Link href="/puja-services">Puja Services</Link> directory,
                review <Link href="/how-it-works">how booking works</Link>, and read the{" "}
                <Link href="/pandit-standards">Pandit Ji standards</Link> before sending details.
              </p>
            </article>

            <article id="ghaziabad-service">
              <span>03</span>
              <h2>Ghaziabad service information</h2>
              <p>
                This profile serves Ghaziabad puja enquiries. Exact locality coverage is confirmed
                after the customer shares the address or venue details. Travel, samagri, timing,
                ritual scope, and family participation may affect the final quote, so customers
                should wait for confirmation before making payment.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-apple" id="booking-steps">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">How to request a booking</span>
            <h2>Send a clear puja enquiry first.</h2>
            <p>
              A request does not confirm a booking. It starts the review of date, locality,
              ritual scope, samagri, duration, and quote.
            </p>
          </div>
          <ol className="booking-guide-list" style={{ listStyle: "none" }}>
            {bookingSteps.map((step, index) => (
              <li key={step} className="apple-step-item">
                <span className="apple-step-num">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="apple-step-title">{step}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-apple service-detail-section">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Before booking</span>
            <h2>Information to share before booking.</h2>
            <p>
              These details help the team review the request properly. Preferences can be shared,
              but they are not guaranteed until confirmed.
            </p>
          </div>
          <div className="service-samagri-grid">
            {bookingChecklist.map((item) => (
              <div className="service-detail-card" key={item}>
                <h3>{item}</h3>
                <p>Share this detail only as needed for coordination and ritual planning.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-apple booking-guide-section" id="booking-clarity">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Booking transparency</span>
            <h2>Confirm the essentials before payment.</h2>
            <p>
              The page is designed for careful enquiries, not instant or exaggerated promises.
            </p>
          </div>
          <div className="service-inclusion-grid">
            {transparencyItems.map((item) => (
              <article className="apple-product-card" key={item} style={{ textAlign: "left" }}>
                <Check size={18} aria-hidden="true" style={{ color: "var(--apple-green)", marginBottom: "10px" }} />
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-apple service-faq-section" id="profile-faqs">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">FAQ</span>
            <h2>Questions about Pandit Ji in Ghaziabad.</h2>
          </div>
          <div className="apple-accordion-list">
            {faqs.map((faq) => (
              <details className="service-faq-item" key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-apple" id="booking-section">
        <div className="container">
          <div className="apple-product-card" style={{ maxWidth: "920px", margin: "0 auto", textAlign: "left" }}>
            <span className="apple-product-tag">Ghaziabad puja enquiry</span>
            <h2 className="apple-product-title">Request Pandit Ji for Puja in Ghaziabad</h2>
            <p className="apple-product-desc">
              Send your puja name, preferred date and Ghaziabad locality. The team will review
              availability and share the next steps, preparation guidance and quote.
            </p>
            <ContactActions compact />
            <p className="service-hero-note">
              You can also use the <Link href="/book-puja">booking request form</Link> or contact the{" "}
              <Link href="/contact">Shastriya Vidhan booking desk</Link>.
            </p>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
