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
const parentProfileUrl = absoluteUrl(parentProfilePath);
const profileOgImage = "/images/acharya-sursain-brijwasi-pandit-ji-raj-nagar-extension-ghaziabad-og.jpg";
const profileImage = panditJiImage.schema;
const profileImageAlt = "Acharya Sursain Brijwasi, Pandit Ji in Raj Nagar Extension, Ghaziabad";
const title = "Pandit Ji in Raj Nagar Extension, Ghaziabad | Shastriya Vidhan";
const description =
  "Contact Acharya Sursain Brijwasi for Pandit Ji enquiries in Raj Nagar Extension, Ghaziabad. Share puja, date, society, samagri needs, and quote details before booking.";
const whatsappMessage = `Namaste, I need a Pandit Ji in Raj Nagar Extension, Ghaziabad.

Puja:
Preferred date:
Preferred time:
Society/locality:
Samagri assistance needed:

Please confirm Acharya Sursain Brijwasi's availability and the quote.`;
const profileWhatsAppLink = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

const baseMetadata = basePageMetadata({
  title,
  description,
  path: profilePath,
  image: profileOgImage,
  imageAlt: profileImageAlt,
  type: "website",
});

export const metadata = {
  ...baseMetadata,
  keywords: [
    "Pandit Ji in Raj Nagar Extension Ghaziabad",
    "Pandit Ji Raj Nagar Extension",
    "Book Pandit Ji Raj Nagar Extension Ghaziabad",
    "Acharya Sursain Brijwasi",
    "Sursain Brijwasi Pandit Ji Raj Nagar Extension",
    "Griha Pravesh Pandit Raj Nagar Extension",
    "Rudrabhishek Pandit Raj Nagar Extension",
    "Sundarkand Path Raj Nagar Extension",
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title,
    description,
    url: profileUrl,
    type: "website",
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
  ["Practitioner", "Acharya Sursain Brijwasi"],
  ["Also known as", "Sursain Brijwasi"],
  ["Local page role", "Raj Nagar Extension booking enquiries"],
  ["Service area", "Raj Nagar Extension, Ghaziabad"],
  ["Contact", contact.displayPhone],
  ["Booking status", "Confirmed only after availability and quote review"],
];

const serviceRequests = [
  {
    title: "Griha Pravesh and Vastu Puja requests",
    href: "/book-puja",
    linkLabel: "Start a Griha Pravesh request",
    body:
      "Share the housewarming date, society or tower, whether havan is requested, and any family-tradition preference. The booking desk confirms ritual scope, venue suitability, samagri, and quote before booking.",
    details: [
      "Useful for new flat or home entry enquiries",
      "Havan and Vastu scope checked before quote",
      "Samagri responsibility confirmed after review",
    ],
  },
  {
    title: "Satyanarayan Puja or Katha requests",
    href: "/book-puja",
    linkLabel: "Request Satyanarayan Puja",
    body:
      "Send the preferred date, family participation details, prasad planning, and home or society-hall setting. Availability and the exact puja sequence are confirmed before payment.",
    details: [
      "Suitable for family prayer and milestone occasions",
      "Prasad and preparation details reviewed",
      "Final format depends on tradition and schedule",
    ],
  },
  {
    title: "Rudrabhishek Puja",
    href: "/book-pandit-ji-for-rudrabhishek-puja-noida",
    linkLabel: "Review Rudrabhishek details",
    body:
      "Use the detailed Rudrabhishek page for format and samagri planning, then mention Raj Nagar Extension in your request so local travel, setup, and timing can be reviewed honestly.",
    details: [
      "Home, temple-linked, or online format review",
      "Shivling setup and abhishek samagri clarified",
      "Havan or extended chanting checked separately",
    ],
  },
  {
    title: "Sundarkand Path",
    href: "/book-pandit-ji-for-sundar-kand-path",
    linkLabel: "Review Sundarkand Path options",
    body:
      "For a family Path, society gathering, office prayer, or musical request, share the venue type, participant count, sound needs, prasad plan, and whether havan is requested.",
    details: [
      "Home, society, office, or online requests",
      "Group and sound arrangements reviewed",
      "Tuesday, Saturday, or family date requests possible",
    ],
  },
  {
    title: "Havan, Namkaran, shop, or office puja",
    href: "/book-puja",
    linkLabel: "Submit a custom puja request",
    body:
      "For ceremonies without a dedicated page, send the purpose, date, venue, expected participants, and samagri requirement. The team checks whether Acharya Sursain Brijwasi or another suitable arrangement can be confirmed.",
    details: [
      "Custom scope reviewed before quote",
      "Additional Pandit Ji requirement checked",
      "Venue rules and timing clarified first",
    ],
  },
];

const preparationItems = [
  {
    title: "Society entry and tower access",
    body:
      "Share the society name, gate process, lift access, parking notes, and expected reporting time. Apartment number can be shared privately after the booking is being coordinated.",
  },
  {
    title: "Havan permission and ventilation",
    body:
      "If havan is requested, confirm society or hall rules, smoke alarms, ventilation, fire-safety expectations, and whether a suitable havan kund is available.",
  },
  {
    title: "Puja space and seating",
    body:
      "Keep a clean area for the chowki, family seating, aarti movement, and samagri. Mention if elderly family members need ground-level or chair seating.",
  },
  {
    title: "Sound and group participation",
    body:
      "For Sundarkand, Katha, or society-hall programs, share participant count, sound restrictions, mic availability, and prasad or volunteer arrangements.",
  },
  {
    title: "Samagri responsibility",
    body:
      "Tell the booking desk whether the family will arrange samagri, needs only a checklist, or wants assistance where available. Do not buy final items until the list is confirmed.",
  },
  {
    title: "Timing and arrival buffer",
    body:
      "Share the preferred start time and any venue time limits. The desk reviews arrival, setup, ritual duration, and travel feasibility before confirming the schedule.",
  },
];

const quoteComponents = [
  {
    title: "Pandit Ji service",
    body: "The ceremony name, ritual scope, and expected participation decide the base service discussion.",
  },
  {
    title: "Puja duration",
    body: "Duration is reviewed from the selected vidhi, additions, family participation, and venue rules.",
  },
  {
    title: "Samagri",
    body: "The quote should clarify what the family arranges, what may be assisted, and what is excluded.",
  },
  {
    title: "Travel and local access",
    body: "Route, parking, gate entry, lift access, and timing can affect feasibility and final quote.",
  },
  {
    title: "Additional Pandit Ji or team",
    body: "Group recitations, larger ceremonies, or complex schedules may require extra support after review.",
  },
  {
    title: "Sound, prasad, or venue needs",
    body: "Mandali, sound equipment, prasad, seating, and hall requirements are confirmed separately where relevant.",
  },
  {
    title: "Payment and dakshina clarity",
    body: "Confirm whether the quoted amount includes service charge, additions, travel, and any separate dakshina expectations.",
  },
  {
    title: "Rescheduling or cancellation",
    body: "Review booking terms before payment, especially when society access or muhurat timing may change.",
  },
];

const localEvidenceStandards = [
  {
    title: "Named practitioner identity",
    body:
      "This page uses Acharya Sursain Brijwasi's public profile, portrait, and Shastriya Vidhan contact details so residents know who the enquiry is about.",
  },
  {
    title: "Local work examples need permission",
    body:
      "Raj Nagar Extension ceremony photos, month/year, society/locality, and feedback should be added only after the family or venue has approved public use.",
  },
  {
    title: "Private home details stay private",
    body:
      "Public content should not expose apartment numbers, full residential addresses, personal family details, or sensitive reasons for the ceremony.",
  },
];

const bookingSteps = [
  "Share ceremony, date, time, and Raj Nagar Extension society or locality.",
  "Confirm Acharya Sursain Brijwasi's availability, ritual scope, and whether extra support is needed.",
  "Receive samagri guidance, quote components, and booking terms.",
  "Confirm the booking only after inclusions, timing, and payment terms are clear.",
];

const bookingChecklist = [
  "Puja or ceremony name",
  "Preferred date and time window",
  "Raj Nagar Extension society or locality",
  "Venue type: home, society hall, temple, office, or online",
  "Whether havan, Katha, Path, or extra Pandit Ji support is expected",
  "Samagri assistance needed, checklist needed, or family-arranged items",
  "Participant count and language or family-tradition preference",
  "Gate pass, parking, lift, sound, seating, or venue restrictions",
];

const coverageNotes = [
  "Raj Nagar Extension societies, towers, blocks, and nearby RNE sectors can be reviewed after exact locality details are shared.",
  "Nearby places such as Krishna Vihar, Morta, Sehani Khurd, and Meerut Road should be treated as request details until the desk confirms availability.",
  "Home, temple, society hall, office, and online requests are reviewed for suitability, schedule, travel, and practical setup.",
];

const transparencyItems = [
  "Availability is not guaranteed instantly.",
  "No spiritual, financial, health, marriage, legal, career, or material outcome is guaranteed.",
  "Final quote depends on puja scope, location, timing, travel, venue needs, and samagri.",
  "Customers should confirm inclusions, exclusions, and booking terms before payment.",
  "Muhurat and ritual details may depend on family tradition, date, and location.",
];

const faqs = [
  {
    question: "Who is the Pandit Ji for Raj Nagar Extension enquiries?",
    answer:
      "This page is for enquiries about Acharya Sursain Brijwasi through Shastriya Vidhan. Availability is confirmed after you share the puja, date, time, and Raj Nagar Extension locality.",
  },
  {
    question: "Can Acharya Sursain Brijwasi visit my society in Raj Nagar Extension?",
    answer:
      "You can request a society visit, but coverage is confirmed only after the desk reviews the exact locality, date, arrival timing, parking, gate entry, lift access, and ritual scope.",
  },
  {
    question: "Which pujas can I request from this page?",
    answer:
      "You can request Griha Pravesh, Satyanarayan Puja or Katha, Rudrabhishek, Sundarkand Path, Havan, Namkaran, shop or office puja, and other home puja needs. The team confirms suitability and availability before booking.",
  },
  {
    question: "Is puja samagri included?",
    answer:
      "Samagri inclusion depends on the ceremony, location, timing, and final quote. Confirm whether the family arranges items, receives a checklist, or needs assistance before payment.",
  },
  {
    question: "Will I get a fixed price immediately?",
    answer:
      "No. The quote is shared after the puja type, date, locality, venue access, duration, samagri needs, travel, and any additional support are reviewed.",
  },
  {
    question: "What should I send on WhatsApp first?",
    answer:
      "Send the puja name, preferred date, preferred time, society or locality, venue type, participant count, and whether samagri assistance is needed. You do not need to share a full residential address in the first message.",
  },
  {
    question: "How is this page different from the Ghaziabad profile?",
    answer:
      "The Ghaziabad profile is the broader practitioner page. This page is focused on Raj Nagar Extension residents who need local venue, society, access, samagri, and availability review.",
  },
  {
    question: "Can I request a review or photo from a previous local ceremony?",
    answer:
      "You can ask the booking desk whether approved recent examples are available. Public photos or feedback should be shared only with consent and without private family details.",
  },
];

function profileJsonLd() {
  const personId = `${parentProfileUrl}#person`;
  const serviceId = `${profileUrl}#service`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${profileUrl}#webpage`,
        url: profileUrl,
        name: "Pandit Ji in Raj Nagar Extension, Ghaziabad",
        description,
        dateModified: "2026-09-10",
        inLanguage: "en-IN",
        isPartOf: {
          "@id": `${absoluteUrl("/")}#website`,
        },
        about: {
          "@id": personId,
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
          "@id": serviceId,
        },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: "Acharya Sursain Brijwasi",
        alternateName: "Sursain Brijwasi",
        jobTitle: "Pandit Ji",
        telephone: contact.phone,
        url: parentProfileUrl,
        image: absoluteUrl(profileImage),
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: "Pandit Ji booking support in Raj Nagar Extension, Ghaziabad",
        serviceType: "Hindu puja booking assistance",
        description:
          "Request-first puja booking support for Raj Nagar Extension residents, with availability, ritual scope, samagri, quote, and venue details reviewed before confirmation.",
        url: profileUrl,
        provider: {
          "@id": `${absoluteUrl("/")}#organization`,
        },
        performer: {
          "@id": personId,
        },
        areaServed: {
          "@type": "Place",
          name: "Raj Nagar Extension, Ghaziabad, Uttar Pradesh",
        },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: profileUrl,
          name: "WhatsApp and phone enquiry",
        },
        audience: {
          "@type": "Audience",
          audienceType: "Families and residents requesting Hindu puja services in Raj Nagar Extension",
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
        {compact ? `WhatsApp ${contact.displayPhone}` : "Check Availability on WhatsApp"}
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
              <span className="apple-eyebrow">Raj Nagar Extension puja enquiries</span>
              <h1>Pandit Ji in Raj Nagar Extension, Ghaziabad</h1>
              <p className="service-hero-note">
                <strong>Acharya Sursain Brijwasi</strong> is the named practitioner for this local
                Shastriya Vidhan enquiry page.
              </p>
              <p>
                Share your puja, preferred date, preferred time, and society or locality to check
                whether Acharya Sursain Brijwasi is available for Raj Nagar Extension. The booking
                desk confirms ritual scope, samagri responsibility, venue needs, and quote before
                any booking is finalized.
              </p>
              <ContactActions />
              <p className="service-hero-note">Availability and quote are confirmed manually before payment.</p>
              <div className="service-authority-grid" aria-label="Booking clarity">
                <div>
                  <Check size={16} aria-hidden="true" />
                  <span>Services to review</span>
                  <strong>Griha Pravesh, Satyanarayan Puja, Rudrabhishek, Sundarkand, Havan.</strong>
                </div>
                <div>
                  <ShieldCheck size={16} aria-hidden="true" />
                  <span>Quote clarity</span>
                  <strong>Ritual, samagri, travel, duration, and additions are checked first.</strong>
                </div>
                <div>
                  <MapPin size={16} aria-hidden="true" />
                  <span>Local coordination</span>
                  <strong>Society entry, parking, lift, sound, and havan rules can be reviewed.</strong>
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
            <span>Practitioner</span>
            <strong>Acharya Sursain Brijwasi</strong>
          </div>
          <div>
            <Check size={18} aria-hidden="true" />
            <span>Page purpose</span>
            <strong>Local puja booking enquiries</strong>
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

      <section className="section-apple service-detail-section" id="services-available">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Services available for review</span>
            <h2>Common Raj Nagar Extension puja requests.</h2>
            <p>
              Choose the closest ceremony and share the details. Final suitability, duration,
              samagri, Pandit Ji availability, and quote are confirmed after review.
            </p>
          </div>
          <div className="service-detail-card-grid">
            {serviceRequests.map((service) => (
              <article className="service-detail-card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <ul className="service-detail-list">
                  {service.details.map((item) => (
                    <li key={item}>
                      <Check size={15} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href={service.href} className="apple-link">
                  {service.linkLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-apple service-longform-section">
        <div className="container service-content-shell">
          <aside className="service-toc-card" aria-label="Profile page sections">
            <span className="apple-eyebrow">On this page</span>
            <nav>
              <a href="#services-available">Services</a>
              <a href="#about-acharya">About Acharya</a>
              <a href="#local-evidence">Local proof</a>
              <a href="#charges-inclusions">Charges and inclusions</a>
              <a href="#society-preparation">Society preparation</a>
              <a href="#booking-steps">How to request</a>
              <a href="#profile-faqs">FAQs</a>
            </nav>
          </aside>

          <div className="service-article-stack">
            <article id="about-acharya">
              <span>01</span>
              <h2>About Acharya Sursain Brijwasi</h2>
              <p>
                Acharya Sursain Brijwasi is listed through Shastriya Vidhan for Raj Nagar
                Extension puja enquiries. This local page is for residents who need a named Pandit
                Ji enquiry with clear review of ceremony scope, society access, samagri, timing,
                and quote.
              </p>
              <p>
                For the broader city profile, visit{" "}
                <Link href={parentProfilePath}>Acharya Sursain Brijwasi - Pandit Ji in Ghaziabad</Link>.
                Use this page when the venue is in Raj Nagar Extension or nearby RNE areas.
              </p>
            </article>

            <article id="local-evidence">
              <span>02</span>
              <h2>Local experience and privacy standard</h2>
              <p>
                Real work evidence matters most when choosing a Pandit Ji. Shastriya Vidhan should
                add Raj Nagar Extension ceremony examples, customer words, and photos only when the
                details are approved for public use.
              </p>
              <p>
                Until a local example is approved, the booking desk can still review your request
                and explain whether recent suitable experience or reference material is available
                privately during coordination.
              </p>
            </article>

            <article id="puja-enquiry">
              <span>03</span>
              <h2>Puja enquiry support in Raj Nagar Extension</h2>
              <p>
                Share the puja or ceremony you need, then review the relevant{" "}
                <Link href="/puja-services">Puja Services</Link>,{" "}
                <Link href="/pricing-and-inclusions">Pricing and Inclusions</Link>,{" "}
                <Link href="/guides#samagri-guidance">Samagri Guidance</Link>, and{" "}
                <Link href="/how-it-works">How It Works</Link> pages. These links help you prepare
                a clearer request before the desk confirms availability.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-apple service-detail-section" id="charges-inclusions">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Charges and inclusions</span>
            <h2>What affects the final quote?</h2>
            <p>
              No public fixed price is shown here until the business confirms current approved
              ranges. Use these items to understand what the booking desk reviews before quoting.
            </p>
          </div>
          <div className="service-samagri-grid">
            {quoteComponents.map((item) => (
              <article className="service-detail-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <p className="service-hero-note" style={{ maxWidth: "900px", margin: "24px auto 0", textAlign: "center" }}>
            Read the fuller <Link href="/pricing-and-inclusions">pricing and inclusions guide</Link> and{" "}
            <Link href="/cancellation-refund-policy">cancellation policy</Link> before payment.
          </p>
        </div>
      </section>

      <section className="section-apple service-detail-section" id="society-preparation">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Home and society preparation</span>
            <h2>Details Raj Nagar Extension residents should check.</h2>
            <p>
              These practical details help the desk confirm route feasibility, arrival timing,
              samagri responsibility, and venue needs before confirming the puja.
            </p>
          </div>
          <div className="service-samagri-grid">
            {preparationItems.map((item) => (
              <article className="service-detail-card" key={item.title}>
                <Check size={18} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-apple service-detail-section" id="coverage">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Local coverage</span>
            <h2>Share exact society or block details.</h2>
            <p>
              Raj Nagar Extension availability is reviewed by actual date, venue, and access
              details. This avoids unsupported blanket coverage claims.
            </p>
          </div>
          <div className="service-samagri-grid">
            {coverageNotes.map((item) => (
              <article className="service-detail-card" key={item}>
                <MapPin size={18} aria-hidden="true" />
                <h3>{item}</h3>
                <p>Coverage and practical requirements are confirmed during coordination.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-apple booking-guide-section" id="local-evidence-standards">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Trust evidence</span>
            <h2>How local proof should be handled.</h2>
            <p>
              Authentic proof is stronger than repeated keywords. Public examples should be
              specific, permission-based, and respectful of household privacy.
            </p>
          </div>
          <div className="service-inclusion-grid">
            {localEvidenceStandards.map((item) => (
              <article className="apple-product-card" key={item.title} style={{ textAlign: "left" }}>
                <ShieldCheck size={18} aria-hidden="true" style={{ color: "var(--apple-green)", marginBottom: "10px" }} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-apple" id="booking-steps">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">How to request a booking</span>
            <h2>Four clear steps before confirmation.</h2>
            <p>
              A request does not confirm a booking. It starts the review of date, society,
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
            <h2>Information to share in the enquiry.</h2>
            <p>
              These details help the team review the request properly. Keep private residential
              details for later coordination unless the desk specifically needs them.
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
            <h2>Questions about Pandit Ji in Raj Nagar Extension.</h2>
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
              Send your puja name, preferred date, preferred time, and Raj Nagar Extension society
              or locality. The team will review availability and share preparation guidance, quote
              details, and next steps.
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
