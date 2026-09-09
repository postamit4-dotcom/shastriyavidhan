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
import TrackedContactLink from "@/components/TrackedContactLink";
import { contact } from "@/lib/site-data";
import { absoluteUrl, basePageMetadata, breadcrumbJsonLd } from "@/lib/seo";

const profilePath = "/pandit-ji/acharya-sursain-brijwasi-raj-nagar-extension-ghaziabad";
const parentProfilePath = "/pandit-ji/acharya-sursain-brijwasi-ghaziabad";
const profileUrl = absoluteUrl(profilePath);
const profileOgImage = "/images/acharya-sursain-brijwasi-pandit-ji-raj-nagar-extension-ghaziabad-og.jpg";
const profileImage = "/images/acharya-sursain-brijwasi-pandit-ji-raj-nagar-extension-ghaziabad-640.webp";
const profileImageAlt = "Acharya Sursain Brijwasi, Pandit Ji in Raj Nagar Extension, Ghaziabad";
const title = "Acharya Sursain Brijwasi | Pandit Ji in Raj Nagar Extension, Ghaziabad";
const description =
  "Meet Acharya Sursain Brijwasi, a Brijwasi Pandit Ji serving Raj Nagar Extension, Ghaziabad. Contact Shastriya Vidhan for puja enquiries, availability and booking guidance.";
const whatsappMessage =
  "Namaste, I would like to enquire about booking Acharya Sursain Brijwasi for a puja in Raj Nagar Extension, Ghaziabad. Please share availability, process and quote.";
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
    "Pandit Ji Raj Nagar Extension Ghaziabad",
    "Pandit Ji in Raj Nagar Extension",
    "Acharya Sursain Brijwasi",
    "Sursain Brijwasi Pandit Ji Raj Nagar Extension",
    "Brijwasi Pandit Ji Raj Nagar Extension",
    "Book Pandit Ji Raj Nagar Extension Ghaziabad",
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
  ["Service enquiry area", "Raj Nagar Extension, Ghaziabad"],
  ["Contact", contact.displayPhone],
  ["Booking status", "Subject to availability confirmation"],
];

const bookingSteps = [
  "Contact through WhatsApp or phone.",
  "Share the puja or ceremony name.",
  "Share the Raj Nagar Extension society, block, or complete service location.",
  "Share the preferred date and time.",
  "Mention whether samagri support is required.",
  "Wait for availability, scope, duration, and quote confirmation.",
  "Complete payment only after the service details and booking terms are clear.",
];

const bookingChecklist = [
  "Puja or ceremony name",
  "Preferred date",
  "Preferred time",
  "Raj Nagar Extension society, block, or locality",
  "Number of participating family members, if relevant",
  "Home, temple, or online preference",
  "Language or family tradition preference, if applicable",
  "Samagri requirement",
  "Any special sankalp details",
  "Accessibility, parking, or timing constraints",
];

const serviceAreaNotes = [
  "Raj Nagar Extension society, tower, block, or complete service location",
  "RNE sectors and nearby localities such as Krishna Vihar, Morta, Sehani Khurd, and Meerut Road by request",
  "Parking, lift, gate pass, entry timing, seating, sound, and venue rules where relevant",
  "Home, temple, society hall, office, or online preference, subject to suitability and availability",
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
      "Acharya Sursain Brijwasi is listed here as a Brijwasi Pandit Ji for Raj Nagar Extension, Ghaziabad puja enquiries. The page uses only the confirmed public details currently available.",
  },
  {
    question: "How can I contact Pandit Ji in Raj Nagar Extension?",
    answer: `You can call ${contact.displayPhone} or send a WhatsApp enquiry to share your puja requirement, society or block, and preferred date.`,
  },
  {
    question: "How do I request a puja booking in Raj Nagar Extension?",
    answer:
      "Share the puja name, Raj Nagar Extension society or block, preferred date, time, samagri needs, and any family tradition preference. The team reviews the request before confirmation.",
  },
  {
    question: "Which Raj Nagar Extension areas are covered?",
    answer:
      "This page is for Raj Nagar Extension enquiries, including nearby stretches such as RNE sectors, Krishna Vihar, Morta, Sehani Khurd, and Meerut Road. Exact coverage is confirmed after you share the complete service location.",
  },
  {
    question: "Which pujas can I request in Raj Nagar Extension?",
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
      "Send the puja name, preferred date and time, Raj Nagar Extension society or block, service mode, family participation details, and whether samagri guidance is needed.",
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
          caption: profileImageAlt,
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
        areaServed: {
          "@type": "Place",
          name: "Raj Nagar Extension, Ghaziabad, Uttar Pradesh",
        },
      },
      breadcrumbJsonLd(
        [
          { name: "Home", path: "/" },
          { name: "Pandit Ji in Ghaziabad", path: parentProfilePath },
          { name: "Pandit Ji in Raj Nagar Extension", path: profilePath },
        ],
        profilePath,
      ),
    ],
  };
}

function ContactActions({ compact = false }) {
  return (
    <div className="service-hero-actions">
      <TrackedContactLink
        href={profileWhatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        className="apple-btn-pill apple-btn-primary"
        id={compact ? "rne-profile-final-whatsapp-cta" : "rne-profile-hero-whatsapp-cta"}
        aria-label={`WhatsApp Acharya Sursain Brijwasi enquiry at ${contact.displayPhone}`}
        eventName="whatsapp_click"
        params={{ cta_location: compact ? "rne_profile_final" : "rne_profile_hero", page_type: "profile" }}
      >
        <MessageCircle size={17} aria-hidden="true" />
        {compact ? `WhatsApp ${contact.displayPhone}` : "WhatsApp Pandit Ji"}
      </TrackedContactLink>
      <TrackedContactLink
        href={`tel:${contact.phone}`}
        className="apple-btn-pill apple-btn-secondary"
        id={compact ? "rne-profile-final-call-cta" : "rne-profile-hero-call-cta"}
        aria-label={`Call Acharya Sursain Brijwasi at ${contact.displayPhone}`}
        eventName="call_click"
        params={{ cta_location: compact ? "rne_profile_final" : "rne_profile_hero", page_type: "profile" }}
      >
        <PhoneCall size={17} aria-hidden="true" />
        {compact ? "Call Pandit Ji" : `Call ${contact.displayPhone}`}
      </TrackedContactLink>
    </div>
  );
}

export default function AcharyaSursainBrijwasiRajNagarExtensionPage() {
  const jsonLd = profileJsonLd();

  return (
    <>
      <section className="section-apple service-premium-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="service-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href={parentProfilePath}>Pandit Ji in Ghaziabad</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Pandit Ji in Raj Nagar Extension</span>
          </nav>

          <div className="service-apple-hero-grid">
            <div>
              <span className="apple-eyebrow">Pandit Ji in Raj Nagar Extension, Ghaziabad</span>
              <h1>Acharya Sursain Brijwasi - Pandit Ji in Raj Nagar Extension, Ghaziabad</h1>
              <p>
                Contact Acharya Sursain Brijwasi for puja enquiries in Raj Nagar Extension,
                Ghaziabad. Share your required puja, preferred date and society or block location
                to confirm availability, ritual scope, samagri guidance and quote before booking.
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
                  <span>Raj Nagar Extension enquiry</span>
                  <strong>Society and block coverage is confirmed during coordination.</strong>
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
            <strong>Raj Nagar Extension, Ghaziabad</strong>
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
              <a href="#rne-service">Raj Nagar Extension service info</a>
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
                Brijwasi Pandit Ji in Raj Nagar Extension, Ghaziabad. Visitors can contact
                Shastriya Vidhan to submit a puja request and receive manual confirmation of
                availability, ritual requirements, samagri expectations, and booking details.
                The page avoids adding unverified biography, credentials, pricing, or outcome claims.
              </p>
            </article>

            <article id="puja-enquiry">
              <span>02</span>
              <h2>Puja enquiry support in Raj Nagar Extension</h2>
              <p>
                Share the puja or ceremony you need. The team will review the request and confirm
                whether Acharya Sursain Brijwasi is available and suitable for the required ritual
                at your Raj Nagar Extension address. You can also browse the{" "}
                <Link href="/puja-services">Puja Services</Link> directory, review{" "}
                <Link href="/how-it-works">how booking works</Link>, and read the{" "}
                <Link href="/pandit-standards">Pandit Ji standards</Link> before sending details.
              </p>
            </article>

            <article id="rne-service">
              <span>03</span>
              <h2>Raj Nagar Extension service information</h2>
              <p>
                This profile serves puja enquiries from Raj Nagar Extension, Ghaziabad. Exact
                society, tower, or block coverage is confirmed after the customer shares the
                address or venue details. Travel, samagri, timing, ritual scope, and family
                participation may affect the final quote, so customers should wait for confirmation
                before making payment.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-apple service-detail-section">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Raj Nagar Extension service info</span>
            <h2>Share exact society or block details.</h2>
            <p>
              These details help the booking desk review route feasibility, arrival timing,
              samagri responsibility, and venue needs before confirming the puja.
            </p>
          </div>
          <div className="service-samagri-grid">
            {serviceAreaNotes.map((item) => (
              <article className="service-detail-card" key={item}>
                <Check size={18} aria-hidden="true" />
                <h3>{item}</h3>
                <p>Coverage and practical requirements are confirmed during coordination.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-apple" id="booking-steps">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">How to request a booking</span>
            <h2>Send a clear puja enquiry first.</h2>
            <p>
              A request does not confirm a booking. It starts the review of date, society or
              block, ritual scope, samagri, duration, and quote.
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
              <article className="service-detail-card" key={item}>
                <h3>{item}</h3>
                <p>Share this detail only as needed for coordination and ritual planning.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-apple booking-guide-section" id="booking-clarity">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Booking transparency</span>
            <h2>Confirm the essentials before payment.</h2>
            <p>The page is designed for careful enquiries, not instant or exaggerated promises.</p>
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
            <h2>Questions about Pandit Ji in Raj Nagar Extension, Ghaziabad.</h2>
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
            <span className="apple-product-tag">Raj Nagar Extension puja enquiry</span>
            <h2 className="apple-product-title">Request Pandit Ji for Puja in Raj Nagar Extension, Ghaziabad</h2>
            <p className="apple-product-desc">
              Send your puja name, preferred date and Raj Nagar Extension society or block. The team will review
              availability and share the next steps, preparation guidance and quote.
            </p>
            <ContactActions compact />
            <p className="service-hero-note">
              You can also use the <Link href="/book-puja">booking request form</Link> or contact the{" "}
              <Link href="/contact">Shastriya Vidhan booking desk</Link>.
            </p>
            <p className="service-hero-note">
              Service availability is subject to Pandit Ji schedule, date review, travel feasibility,
              ritual scope, and samagri confirmation. Puja services are devotional practices.
              Shastriya Vidhan does not promise medical, legal, financial, relationship, or guaranteed
              material outcomes.
            </p>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
