import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import {
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Languages,
  MapPin,
  MessageCircle,
  PhoneCall,
} from "lucide-react";
import BookingOptionButton from "@/components/BookingOptionButton";
import ContactForm from "@/components/ContactForm";
import ServiceCard from "@/components/ServiceCard";
import TrackedContactLink from "@/components/TrackedContactLink";
import {
  contact,
  getCategoryBySlug,
  getServiceBySlug,
  pathForCategory,
  serviceCategoryAssignments,
  servicePages,
  site,
} from "@/lib/site-data";
import {
  absoluteUrl,
  basePageMetadata,
  breadcrumbJsonLd,
  canonicalPath,
  servicePageJsonLd,
} from "@/lib/seo";
import {
  getModePageBySlug,
  getPolicyBySlug,
  getSupportPageBySlug,
  modePages,
  policyPages,
  supportCtaLinks,
  supportPages,
} from "@/lib/page-content";

export function generateStaticParams() {
  return [
    ...servicePages.map((service) => ({ slug: service.slug })),
    ...policyPages.map((page) => ({ slug: page.slug })),
    ...modePages.map((page) => ({ slug: page.slug })),
    ...supportPages.map((page) => ({ slug: page.slug })),
  ];
}

function uniqueKeywords(service) {
  return Array.from(
    new Set([
      service.focusKeyword,
      service.title,
      service.navTitle,
      "book pandit ji online",
      "vedic puja",
      "puja at home",
      "online puja",
    ].filter(Boolean)),
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    const policy = getPolicyBySlug(slug);
    if (policy) {
      return basePageMetadata({
        title: policy.title,
        description: policy.description,
        path: policy.href,
      });
    }

    const modePage = getModePageBySlug(slug);
    if (modePage) {
      return basePageMetadata({
        title: modePage.title,
        description: modePage.description,
        path: modePage.href,
        image: modePage.services[0]?.image.local || "/images/diwali-puja.webp",
        imageAlt: `${modePage.title} Shastriya Vidhan service mode`,
      });
    }

    const supportPage = getSupportPageBySlug(slug);
    if (supportPage) {
      return basePageMetadata({
        title: supportPage.title,
        description: supportPage.description,
        path: supportPage.href,
      });
    }

    return {};
  }

  const pageTitle = service.seoTitle || `${service.pageH1 || service.title} | ${site.name}`;

  return {
    title: pageTitle,
    description: service.description,
    keywords: uniqueKeywords(service),
    alternates: {
      canonical: absoluteUrl(canonicalPath(`/${service.slug}`)),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: pageTitle,
      description: service.description,
      url: absoluteUrl(`/${service.slug}`),
      siteName: site.name,
      images: [
        {
          url: service.image.local,
          alt: service.image.alt,
        },
      ],
      locale: "en_IN",
      type: "article",
      modifiedTime: service.updated,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: service.description,
      images: [service.image.local],
    },
  };
}

function genericPageJsonLd(page, parent = "Help") {
  const url = absoluteUrl(page.href);
  const breadcrumbItems =
    page.href === "/help"
      ? [
          { name: "Home", path: "/" },
          { name: page.title, path: page.href },
        ]
      : [
          { name: "Home", path: "/" },
          { name: parent, path: parent === "Puja Services" ? "/puja-services" : "/help" },
          { name: page.title, path: page.href },
        ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        inLanguage: "en-IN",
        isPartOf: {
          "@id": `${absoluteUrl("/")}#website`,
        },
        breadcrumb: {
          "@id": `${url}#breadcrumb`,
        },
      },
      breadcrumbJsonLd(breadcrumbItems, page.href),
    ],
  };
}

function renderListItem(item) {
  if (typeof item === "string") {
    return <span>{item}</span>;
  }

  return <Link href={item.href}>{item.label}</Link>;
}

function PolicyPage({ policy }) {
  const jsonLd = genericPageJsonLd(policy);

  return (
    <>
      <section className="section-apple" style={{ backgroundColor: "var(--apple-gray-bg)", paddingBottom: "48px" }}>
        <div className="container">
          <nav aria-label="Breadcrumb" className="service-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href="/help">Help</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>{policy.title}</span>
          </nav>

          <div className="apple-section-header" style={{ marginBottom: "24px" }}>
            <span className="apple-eyebrow">{site.name}</span>
            <h1>{policy.title}</h1>
            <p>{policy.description}</p>
          </div>
        </div>
      </section>

      <section className="section-apple">
        <div className="container">
          <div className="apple-product-card" style={{ maxWidth: "900px", margin: "0 auto", textAlign: "left" }}>
            <ul style={{ display: "grid", gap: "14px", listStyle: "none" }}>
              {policy.items.map((item) => (
                <li key={item} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <Check size={17} aria-hidden="true" style={{ color: "var(--apple-green)", marginTop: "3px" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p style={{ color: "var(--text-tertiary)", marginTop: "24px" }}>
              For booking support, contact {contact.displayPhone} or use the booking form.
            </p>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

function SupportPage({ page }) {
  const jsonLd = genericPageJsonLd(page);
  const ctaLinks = supportCtaLinks();
  const isHelpRoot = page.href === "/help";

  return (
    <>
      <section className="section-apple" style={{ backgroundColor: "var(--apple-gray-bg)", paddingBottom: "48px" }}>
        <div className="container">
          <nav aria-label="Breadcrumb" className="service-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            {isHelpRoot ? null : (
              <>
                <Link href="/help">Help</Link>
                <ChevronRight size={14} aria-hidden="true" />
              </>
            )}
            <span>{page.title}</span>
          </nav>

          <div className="apple-section-header" style={{ marginBottom: "24px" }}>
            <span className="apple-eyebrow">{page.eyebrow}</span>
            <h1>{page.title}</h1>
            <p>{page.description}</p>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            {ctaLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="apple-btn-pill apple-btn-secondary"
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className="apple-btn-pill apple-btn-primary">
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="section-apple">
        <div className="container">
          <div className="service-inclusion-grid">
            {page.sections.map((section) => (
              <article key={section.title} className="apple-product-card" style={{ textAlign: "left" }}>
                <span className="apple-product-tag">{section.title}</span>
                <h2>{section.title}</h2>
                <p className="apple-product-desc">{section.body}</p>
                <ul>
                  {section.items.map((item) => (
                    <li key={typeof item === "string" ? item : item.href}>
                      <Check size={16} aria-hidden="true" />
                      {renderListItem(item)}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

function ModePage({ page }) {
  const jsonLd = genericPageJsonLd(page, "Puja Services");

  return (
    <>
      <section className="section-apple service-premium-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="service-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href="/puja-services">Puja Services</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>{page.title}</span>
          </nav>

          <div className="service-apple-hero-grid">
            <div>
              <span className="apple-eyebrow">{page.eyebrow}</span>
              <h1>{page.h1}</h1>
              <p>{page.description}</p>
              <div className="service-hero-actions">
                <Link href="/book-puja" className="apple-btn-pill apple-btn-primary">
                  Request {page.title}
                </Link>
                <a
                  href={contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-btn-pill apple-btn-secondary"
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  Ask Booking Desk
                </a>
              </div>
              <p className="service-hero-note">
                Request first. Final availability, quote, samagri, and booking terms are confirmed before payment.
              </p>
            </div>

            <div className="service-hero-visual-card">
              <img
                src={page.services[0]?.image.local || "/images/diwali-puja.webp"}
                alt={page.services[0]?.image.alt || page.title}
                width="736"
                height="552"
              />
              <div className="service-hero-floating-card">
                <span>{page.mode?.badge || "Request mode"}</span>
                <strong>{page.mode?.tagline || "Reviewed before confirmation"}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-apple">
        <div className="container">
          <div className="apple-product-card" style={{ maxWidth: "900px", margin: "0 auto", textAlign: "left" }}>
            <h2 className="apple-product-title">How this mode works</h2>
            <p className="apple-product-desc">{page.intro}</p>
            <div className="apple-product-specs" style={{ textAlign: "left" }}>
              <div>
                <strong>Best for:</strong> {page.mode?.bestFor}
              </div>
              <div>
                <strong>Prepare:</strong> {page.mode?.prepare}
              </div>
              <div>
                <strong>Includes:</strong> {page.mode?.includes}
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedPanditProfileSection profile={page.relatedPanditProfile} />

      {page.relatedLinks?.length ? (
        <section className="section-apple service-detail-section" id="mode-related-links">
          <div className="container">
            <div className="apple-section-header">
              <span className="apple-eyebrow">Related booking pages</span>
              <h2>Useful next steps for {page.title.toLowerCase()}.</h2>
            </div>
            <div className="service-related-link-row">
              {page.relatedLinks.map((link) => (
                <Link key={link.href} href={link.href} className="apple-btn-pill apple-btn-secondary">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-apple" style={{ backgroundColor: "var(--apple-gray-bg)" }}>
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Matching services</span>
            <h2>Pujas that currently support {page.serviceMode.toLowerCase()} requests.</h2>
          </div>

          <div className="apple-products-grid">
            {page.services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

const defaultBookingAssurances = [
  {
    title: "Request-first booking",
    body: "Confirm timing, quote, and fit before payment.",
  },
  {
    title: "Clear preparation",
    body: "Samagri and puja mode details are reviewed upfront.",
  },
  {
    title: "Family-ready support",
    body: "Coordinate home, online, or temple puja with guidance.",
  },
];

const ghaziabadVerifiedAreas = [
  "Indirapuram",
  "Vaishali",
  "Vasundhara",
  "Raj Nagar",
  "Raj Nagar Extension",
  "Crossings Republik",
  "Kaushambi",
  "Sahibabad",
  "Vijay Nagar",
  "Wave City",
];

const priceFactorRows = [
  ["City and travel", "Distance, timing, parking, lift access, and local transport can affect the final quote."],
  ["Date and timing", "Festival days, muhurat windows, early morning requests, or late-night rituals may change availability."],
  ["Pandit count", "Some formats can be handled by one Pandit Ji; extended path, jaap, or community rituals may need more."],
  ["Duration", "Longer vidhi, path count, havan, katha, or family participation naturally changes the service scope."],
  ["Samagri", "Family-arranged items, complete samagri support, or specialist havan material are confirmed separately."],
  ["Venue", "Home, shop, office, temple, society hall, or online mode each has different preparation needs."],
  ["Add-ons", "Havan, bhajan, temple coordination, extra Pandit Ji, prasad, or travel beyond the core area are reviewed first."],
];

function joinValues(values, fallback = "Confirmed during booking") {
  return values?.length ? values.join(", ") : fallback;
}

function formatUpdatedDate(value) {
  if (!value) return "Confirmed during content review";

  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function getQuickAnswer(service) {
  return (
    service.quickAnswer ||
    service.intro ||
    service.sections?.find((section) => /^what is|^about/i.test(section.heading))?.body ||
    service.description
  );
}

function getSuitableFor(service) {
  if (service.suitableFor?.length) return service.suitableFor.join(", ");
  if (service.highlights?.length) return service.highlights.join(", ");
  return "Families and devotees requesting a confirmed puja, path, jaap, katha, or sanskar service";
}

function getPanditCount(service) {
  const counts = Array.from(new Set(service.packageOptions?.map((option) => option.panditCount).filter(Boolean)));
  if (counts.length === 1) return counts[0];
  if (counts.length > 1) return "Depends on the selected format";
  return "Confirmed by ritual scope";
}

function getHavanStatus(service) {
  const included = joinValues(service.included, "").toLowerCase();
  const optional = joinValues(service.optional, "").toLowerCase();
  const combined = [service.description, service.samagri, service.duration, included, optional].join(" ").toLowerCase();

  if (optional.match(/\bhav[ao]n\b/)) return "Optional; confirmed by format and venue safety";
  if (included.match(/\bhav[ao]n\b/)) return "Included only when listed in the selected format";
  if (combined.match(/\bhav[ao]n\b/)) return "Confirmed by ritual scope";
  return "Not assumed; confirmed during booking";
}

function getBookingNotice(service) {
  const text = [service.category, service.title, service.description, service.duration].join(" ").toLowerCase();
  if (service.dateNote || text.includes("festival")) {
    return "Book early for festival or muhurat slots; exact availability is reviewed before payment.";
  }
  if (text.includes("temple") || text.includes("ujjain")) {
    return "Share date, travel plan, temple preference, and participant details in advance.";
  }
  return "Share your preferred date, city, locality, mode, language, and samagri needs for review.";
}

function buildQuickFacts(service) {
  return [
    { label: "Service", value: service.title },
    { label: "Suitable for", value: getSuitableFor(service) },
    { label: "Modes", value: joinValues(service.modes), icon: CalendarDays },
    { label: "Duration", value: service.duration, icon: Clock },
    { label: "Pandit count", value: getPanditCount(service) },
    { label: "Languages", value: joinValues(service.languages), icon: Languages },
    { label: "Havan", value: getHavanStatus(service) },
    { label: "Samagri", value: service.samagri },
    { label: "Locations", value: joinValues(service.locations), icon: MapPin },
    { label: "Price", value: service.priceLabel },
    { label: "Booking notice", value: getBookingNotice(service) },
  ];
}

function modeDescription(mode) {
  const lower = mode.toLowerCase();

  if (lower.includes("online")) {
    return "Video participation, device setup, time zone, family-arranged samagri, and ritual suitability are checked before confirmation.";
  }
  if (lower.includes("temple")) {
    return "Temple rules, reporting time, local fees, photography limits, and what the booking covers are reviewed before the visit.";
  }
  if (lower.includes("shop") || lower.includes("office") || lower.includes("workplace")) {
    return "Business-space setup, timing, access, staff participation, samagri, and any account-book or gaddi worship are clarified first.";
  }
  if (lower.includes("community") || lower.includes("venue") || lower.includes("society")) {
    return "Venue permission, seating, sound, fire safety, prasad, timing, and arrival coordination are reviewed before confirmation.";
  }

  return "Pandit Ji travel, puja space, samagri responsibility, havan safety, parking, lift access, and family participation are confirmed first.";
}

function relatedServicesForService(service) {
  const assignment = serviceCategoryAssignments[service.slug];
  const primarySlug = assignment?.primary;

  return servicePages
    .filter((item) => {
      if (item.slug === service.slug) return false;
      if (primarySlug && serviceCategoryAssignments[item.slug]?.primary === primarySlug) return true;
      return item.category === service.category;
    })
    .slice(0, 6);
}

function buildServiceTocItems(service, { hasFaqs, relatedServices }) {
  return [
    { href: "#about", label: "What is it?" },
    { href: "#quick-facts", label: "Quick facts" },
    service.dateNote ? { href: "#when-to-perform", label: "When to perform" } : null,
    service.serviceFormats?.length ? { href: "#formats", label: "Formats" } : null,
    service.packageOptions?.length ? { href: "#packages", label: "Packages" } : null,
    service.comparison?.rows?.length ? { href: "#comparison", label: "Comparison" } : null,
    service.sections?.length ? { href: "#service-details", label: "Puja details" } : null,
    service.leelas?.length ? { href: "#devotional-context", label: "Devotional context" } : null,
    service.samagriGroups?.length ? { href: "#samagri", label: "Samagri" } : null,
    { href: "#inclusions", label: "Inclusions" },
    { href: "#pricing", label: "Pricing" },
    { href: "#locations", label: "Locations" },
    service.relatedPanditProfile ? { href: "#pandit-authority", label: "Pandit Ji" } : null,
    service.bookingGuide?.length ? { href: "#booking-process", label: "Booking process" } : null,
    { href: "#religious-disclaimer", label: "Disclaimer" },
    hasFaqs ? { href: "#faqs", label: "FAQs" } : null,
    relatedServices.length ? { href: "#related-services", label: "Related services" } : null,
    service.relatedLinks?.length ? { href: "#related-guides", label: "Guides" } : null,
    { href: "#practical-review", label: "Practical review" },
    { href: "#booking-section", label: "Request quote" },
  ].filter(Boolean);
}

function ServiceQuickAnswerSection({ service }) {
  const facts = buildQuickFacts(service);

  return (
    <section className="section-apple service-quick-answer-section" id="about">
      <div className="container service-quick-answer-grid">
        <article className="service-answer-card">
          <span className="apple-eyebrow">Quick Answer</span>
          <h2>What Is {service.title}?</h2>
          <p>{getQuickAnswer(service)}</p>
          <p className="service-answer-note">
            The final vidhi, duration, samagri responsibility, Pandit Ji assignment, location feasibility, and quote
            are confirmed after your request is reviewed.
          </p>
        </article>

        <article className="service-facts-card" id="quick-facts" aria-labelledby={`${service.slug}-quick-facts`}>
          <span className="apple-eyebrow">Quick Facts</span>
          <h2 id={`${service.slug}-quick-facts`}>Before You Request</h2>
          <dl className="service-quick-fact-list">
            {facts.map((fact) => {
              const Icon = fact.icon;
              return (
                <div key={fact.label}>
                  <dt>
                    {Icon ? <Icon size={15} aria-hidden="true" /> : null}
                    {fact.label}
                  </dt>
                  <dd>{fact.value}</dd>
                </div>
              );
            })}
          </dl>
        </article>
      </div>
    </section>
  );
}

function ServicePageToc({ items }) {
  if (!items.length) return null;

  return (
    <section className="service-page-toc-section" aria-label="Service page contents">
      <div className="container">
        <nav className="service-page-toc">
          {items.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}

function ServicePricingSection({ service }) {
  return (
    <section className="section-apple service-detail-section service-pricing-section" id="pricing">
      <div className="container">
        <div className="apple-section-header">
          <span className="apple-eyebrow">Quote Clarity</span>
          <h2>{service.title} Price and Cost Factors</h2>
          <p>
            {service.priceLabel === "Request exact quote" || service.priceLabel === "Request written quote"
              ? "The final price is shared only after location, date, Pandit count, ritual duration, samagri, havan, travel, and requested additions are reviewed."
              : `${service.priceLabel} is shown as the current public pricing note. Final inclusions, exclusions, travel, samagri, and timing should still be confirmed before payment.`}
          </p>
        </div>

        <div className="service-table-wrap">
          <table className="service-comparison-table">
            <thead>
              <tr>
                <th scope="col">Factor</th>
                <th scope="col">Why it affects the quote</th>
              </tr>
            </thead>
            <tbody>
              {priceFactorRows.map(([factor, reason]) => (
                <tr key={factor}>
                  <th scope="row">{factor}</th>
                  <td>{reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function ServiceLocationsModesSection({ service }) {
  const hasGhaziabad = service.locations.some((location) => /ghaziabad/i.test(location));

  return (
    <section className="section-apple service-detail-section service-location-mode-section" id="locations">
      <div className="container">
        <div className="apple-section-header">
          <span className="apple-eyebrow">Locations and Modes</span>
          <h2>Where Is {service.title} Available?</h2>
          <p>
            Use the listed locations as request areas, not automatic confirmation. Travel, society access, parking,
            temple rules, online suitability, language preference, and local support are reviewed before payment.
          </p>
        </div>

        <div className="service-location-mode-grid">
          <article className="service-location-card">
            <h3>Verified request areas</h3>
            <div className="service-location-chip-grid" aria-label="Service locations">
              {service.locations.map((location) => (
                <span key={location}>{location}</span>
              ))}
            </div>
            {hasGhaziabad ? (
              <div className="service-locality-note">
                <strong>Ghaziabad localities:</strong>
                <span>{ghaziabadVerifiedAreas.join(", ")}.</span>
              </div>
            ) : null}
          </article>

          <article className="service-location-card">
            <h3>Home, temple, venue or online options</h3>
            <div className="service-mode-list">
              {service.modes.map((mode) => (
                <div key={mode}>
                  <strong>{mode}</strong>
                  <p>{modeDescription(mode)}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function ServiceDisclaimerSection({ service }) {
  const isGrahaDoshPage = service.grahaDoshHub || /graha|dosh|shanti|kaal sarp/i.test(service.category);

  return (
    <section className="section-apple service-disclaimer-section" id="religious-disclaimer">
      <div className="container">
        <article className="service-disclaimer-card">
          <span className="apple-eyebrow">Religious and Outcome Clarity</span>
          <h2>{service.title} Is a Devotional Service</h2>
          <p>
            {service.title} is a religious and devotional practice performed according to the confirmed tradition and
            ritual scope. Shastriya Vidhan does not guarantee medical, financial, legal, relationship, career,
            astrological, supernatural, or other material outcomes. A Puja is not a substitute for professional
            medical, legal, financial, or psychological support.
          </p>
          {isGrahaDoshPage ? (
            <p>
              Life circumstances or symptoms do not prove the presence of a Graha Dosh. Kundli-related conclusions
              should be discussed with a suitably qualified expert before choosing a remedial ritual.
            </p>
          ) : null}
        </article>
      </div>
    </section>
  );
}

function ServiceReviewStatusSection({ service }) {
  return (
    <section className="section-apple service-detail-section" id="practical-review">
      <div className="container">
        <article className="service-review-panel">
          <div>
            <span className="apple-eyebrow">Before booking</span>
            <h2>Practical details to confirm</h2>
            <p>
              Ritual sequence, samagri, location coverage, duration, and quote can vary by family tradition,
              city, venue, and selected format. Confirm the final details before payment.
            </p>
          </div>

          <dl className="service-review-list">
            <div>
              <dt>Preparation owner</dt>
              <dd>Booking desk and assigned Pandit Ji</dd>
            </div>
            <div>
              <dt>Ritual confirmation</dt>
              <dd>Final vidhi and samagri are confirmed during booking coordination</dd>
            </div>
            <div>
              <dt>Details to confirm</dt>
              <dd>Vidhi, terminology, samagri, inclusions, exclusions, and practical booking clarity.</dd>
            </div>
            <div>
              <dt>Page updated</dt>
              <dd>{formatUpdatedDate(service.updated)}</dd>
            </div>
          </dl>

          {service.reviewNote ? (
            <div className="service-review-note">
              <h3>{service.reviewNote.heading}</h3>
              <p>{service.reviewNote.body}</p>
              {service.reviewNote.items?.length ? (
                <ul>
                  {service.reviewNote.items.map((item) => (
                    <li key={item}>
                      <Check size={16} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </article>
      </div>
    </section>
  );
}

function ServiceRelatedServicesSection({ service, services }) {
  if (!services.length) return null;

  return (
    <section className="section-apple service-detail-section" id="related-services">
      <div className="container">
        <div className="apple-section-header">
          <span className="apple-eyebrow">Related Puja Services</span>
          <h2>Compare nearby services before booking.</h2>
          <p>
            These links stay close to the same category or religious context so users can choose the right ritual
            instead of jumping through unrelated popular pages.
          </p>
        </div>

        <div className="apple-products-grid">
          {services.map((relatedService) => (
            <ServiceCard key={relatedService.slug} service={relatedService} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceActionLink({ href, children, className, ...props }) {
  if (!href) return null;

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
}

function ServiceSectionList({ items }) {
  if (!items?.length) return null;

  return (
    <ul className="service-detail-list service-section-list">
      {items.map((item) => {
        const label = typeof item === "string" ? item : item.label;
        return (
          <li key={label}>
            <Check size={16} aria-hidden="true" />
            <span>{label}</span>
          </li>
        );
      })}
    </ul>
  );
}

function ServiceSectionCards({ cards }) {
  if (!cards?.length) return null;

  return (
    <div className="service-section-card-grid">
      {cards.map((card) => (
        <div className="service-section-card" key={card.title}>
          <h3>
            {card.href ? (
              <ServiceActionLink href={card.href}>{card.title}</ServiceActionLink>
            ) : (
              card.title
            )}
          </h3>
          <p>{card.body}</p>
        </div>
      ))}
    </div>
  );
}

function ServiceSectionSteps({ steps }) {
  if (!steps?.length) return null;

  return (
    <ol className="booking-guide-list service-section-steps">
      {steps.map((step, index) => (
        <li key={step}>
          <article>
            <span>{index + 1}</span>
            <p>{step}</p>
          </article>
        </li>
      ))}
    </ol>
  );
}

function ServiceSectionLinks({ links }) {
  if (!links?.length) return null;

  return (
    <div className="service-section-links">
      {links.map((link) => (
        <ServiceActionLink key={`${link.href}-${link.label}`} href={link.href} className="apple-link apple-link-sm">
          {link.label}
          <ChevronRight size={13} className="apple-link-chevron" aria-hidden="true" />
        </ServiceActionLink>
      ))}
    </div>
  );
}

function ServiceSectionCta({ cta }) {
  if (!cta) return null;

  return (
    <div className="service-section-action">
      <ServiceActionLink href={cta.href} className="apple-btn-pill apple-btn-primary">
        {cta.label}
      </ServiceActionLink>
      {cta.secondaryHref ? (
        <ServiceActionLink href={cta.secondaryHref} className="apple-btn-pill apple-btn-secondary">
          {cta.secondaryLabel}
        </ServiceActionLink>
      ) : null}
    </div>
  );
}

function ServiceFormatsSection({ service }) {
  if (!service.serviceFormats?.length) return null;

  return (
    <section className="section-apple service-detail-section" id="formats">
      <div className="container">
        <div className="apple-section-header">
          <span className="apple-eyebrow">{service.serviceFormatsEyebrow || "Formats"}</span>
          <h2>{service.serviceFormatsHeading || "Choose how you would like to perform the Path."}</h2>
          {service.serviceFormatsDescription ? <p>{service.serviceFormatsDescription}</p> : null}
        </div>

        <div className="service-detail-card-grid">
          {service.serviceFormats.map((format) => (
            <article className="service-detail-card" key={format.title}>
              {format.tag ? <span className="apple-product-tag">{format.tag}</span> : null}
              <h3>{format.title}</h3>
              <p>{format.body}</p>
              {format.items?.length ? (
                <ul className="service-detail-list">
                  {format.items.map((item) => (
                    <li key={item}>
                      <Check size={16} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <BookingOptionButton
                city={service.prefilledCity}
                formatName={format.title}
                label={format.ctaLabel || "Select format"}
                mode={format.mode || service.prefilledMode}
                note={format.note}
                service={service.formServiceName || service.title}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicePackageSection({ service }) {
  if (!service.packageOptions?.length) return null;

  return (
    <section className="section-apple service-detail-section" id="packages">
      <div className="container">
        <div className="apple-section-header">
          <span className="apple-eyebrow">{service.packageOptionsEyebrow || "Options"}</span>
          <h2>{service.packageOptionsHeading || "Compare puja options."}</h2>
          {service.packageOptionsDescription ? <p>{service.packageOptionsDescription}</p> : null}
        </div>

        <div className="service-detail-card-grid">
          {service.packageOptions.map((option) => (
            <article className="service-detail-card" key={option.id || option.name}>
              <span className="service-detail-meta">{option.estimatedDuration}</span>
              <h3>{option.name}</h3>
              <p>{option.shortDescription}</p>
              <div className="service-detail-facts">
                {option.panditCount ? (
                  <span>
                    <strong>Pandit Ji:</strong> {option.panditCount}
                  </span>
                ) : null}
                <span>
                  <strong>Price:</strong> {option.priceLabel}
                </span>
                {option.suitedFor?.length ? (
                  <span>
                    <strong>Suited for:</strong> {option.suitedFor.join(", ")}
                  </span>
                ) : null}
              </div>
              {option.includes?.length ? (
                <ul className="service-detail-list">
                  {option.includes.map((item) => (
                    <li key={item}>
                      <Check size={16} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {option.optional?.length ? (
                <p className="service-detail-note">Optional: {option.optional.join(", ")}.</p>
              ) : null}
              <BookingOptionButton
                city={service.prefilledCity}
                label={option.ctaLabel || "Select option"}
                mode={option.mode || service.prefilledMode}
                note={option.note}
                packageName={option.name}
                service={service.formServiceName || service.title}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceComparisonSection({ service }) {
  if (!service.comparison?.rows?.length) return null;

  return (
    <section className="section-apple service-detail-section" id="comparison">
      <div className="container">
        <div className="apple-section-header">
          <span className="apple-eyebrow">{service.comparison.eyebrow || "Comparison"}</span>
          <h2>{service.comparison.heading}</h2>
          {service.comparison.description ? <p>{service.comparison.description}</p> : null}
        </div>

        <div className="service-table-wrap">
          <table className="service-comparison-table">
            <thead>
              <tr>
                {service.comparison.columns.map((column) => (
                  <th scope="col" key={column}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {service.comparison.rows.map((row) => (
                <tr key={row[0]}>
                  <th scope="row">{row[0]}</th>
                  {row.slice(1).map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function ServiceSamagriSection({ service }) {
  if (!service.samagriGroups?.length) return null;

  return (
    <section className="section-apple service-detail-section" id="samagri">
      <div className="container">
        <div className="apple-section-header">
          <span className="apple-eyebrow">{service.samagriGroupsEyebrow || "Preparation"}</span>
          <h2>{service.samagriGroupsHeading || "Samagri and home preparation."}</h2>
          {service.samagriGroupsDescription ? <p>{service.samagriGroupsDescription}</p> : null}
        </div>

        <div className="service-samagri-grid">
          {service.samagriGroups.map((group) => (
            <article className="service-detail-card" key={group.title}>
              <h3>{group.title}</h3>
              <ul className="service-detail-list">
                {group.items.map((item) => (
                  <li key={item}>
                    <Check size={16} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRelatedLinksSection({ service }) {
  if (!service.relatedLinks?.length) return null;

  return (
    <section className="section-apple service-detail-section" id="related-guides">
      <div className="container">
        <div className="apple-section-header">
          <span className="apple-eyebrow">Related guidance</span>
          <h2>Preparation Guides for {service.title}.</h2>
        </div>

        <div className="service-related-link-row">
          {service.relatedLinks.map((link) => (
            <Link key={link.href} href={link.href} className="apple-btn-pill apple-btn-secondary">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedPanditProfileSection({ profile }) {
  if (!profile) return null;

  return (
    <section className="section-apple service-detail-section" id="pandit-authority">
      <div className="container">
        <article className="apple-product-card" style={{ maxWidth: "900px", margin: "0 auto", textAlign: "left" }}>
          <span className="apple-product-tag">{profile.eyebrow}</span>
          <h2 className="apple-product-title">{profile.heading}</h2>
          <p className="apple-product-desc" style={{ marginBottom: 0 }}>
            {profile.bodyBefore}
            <Link href={profile.href}>{profile.anchorText}</Link>
            {profile.bodyAfter}
          </p>
        </article>
      </div>
    </section>
  );
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const policy = getPolicyBySlug(slug);
  if (policy) return <PolicyPage policy={policy} />;

  const modePage = getModePageBySlug(slug);
  if (modePage) return <ModePage page={modePage} />;

  const supportPage = getSupportPageBySlug(slug);
  if (supportPage) return <SupportPage page={supportPage} />;

  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const pageH1 = service.pageH1 || service.title;
  const hasFaqs = Array.isArray(service.faqs) && service.faqs.length > 0;
  const jsonLd = servicePageJsonLd(service);
  const assignment = serviceCategoryAssignments[service.slug];
  const primaryCategory = assignment?.primary ? getCategoryBySlug(assignment.primary) : undefined;
  const bookingAssurances = service.bookingAssurances || defaultBookingAssurances;
  const whatsappLink = service.whatsappLink || contact.whatsappLink;
  const relatedServices = relatedServicesForService(service);
  const tocItems = buildServiceTocItems(service, { hasFaqs, relatedServices });

  return (
    <>
      <section className="section-apple service-premium-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="service-breadcrumb">
            {service.breadcrumbItems?.length ? (
              service.breadcrumbItems.map((item, index) => {
                const isLast = index === service.breadcrumbItems.length - 1;
                return (
                  <Fragment key={item.path || item.name}>
                    {index > 0 ? <ChevronRight size={14} aria-hidden="true" /> : null}
                    {isLast ? <span>{item.name}</span> : <Link href={item.path}>{item.name}</Link>}
                  </Fragment>
                );
              })
            ) : (
              <>
                <Link href="/">Home</Link>
                <ChevronRight size={14} aria-hidden="true" />
                <Link href="/puja-services">Puja Services</Link>
                <ChevronRight size={14} aria-hidden="true" />
                {primaryCategory ? (
                  <>
                    <Link href={pathForCategory(primaryCategory)}>{primaryCategory.name}</Link>
                    <ChevronRight size={14} aria-hidden="true" />
                  </>
                ) : null}
                <span>{service.navTitle || service.title}</span>
              </>
            )}
          </nav>

          <div className="service-apple-hero-grid">
            <div>
              <span className="apple-eyebrow">{service.heroEyebrow || service.category}</span>
              <h1>{pageH1}</h1>
              <p>{service.description}</p>
              <div className="service-hero-actions">
                <TrackedContactLink
                  href="#booking-section"
                  className="apple-btn-pill apple-btn-primary"
                  eventName="booking_start"
                  params={{ service_slug: service.slug, cta_location: "service_hero", page_type: "service" }}
                >
                  {service.primaryCtaLabel || "Request Quote"}
                </TrackedContactLink>
                <TrackedContactLink
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-btn-pill apple-btn-secondary"
                  eventName="whatsapp_click"
                  params={{ service_slug: service.slug, cta_location: "service_hero", page_type: "service" }}
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  {service.whatsappCtaLabel || "WhatsApp Assistance"}
                </TrackedContactLink>
                {service.callCtaLabel ? (
                  <TrackedContactLink
                    href={`tel:${contact.phone}`}
                    className="apple-btn-pill apple-btn-secondary"
                    eventName="call_click"
                    params={{ service_slug: service.slug, cta_location: "service_hero", page_type: "service" }}
                  >
                    <PhoneCall size={17} aria-hidden="true" />
                    {service.callCtaLabel}
                  </TrackedContactLink>
                ) : null}
              </div>
              <p className="service-hero-note">
                {service.heroNote ||
                  "Request first. Availability, quote, samagri, and booking terms should be confirmed before payment."}
              </p>
              <div className="service-authority-grid" aria-label="Booking assurances">
                {bookingAssurances.map((item) => (
                  <div key={item.title}>
                    <Check size={16} aria-hidden="true" />
                    <span>{item.title}</span>
                    <strong>{item.body}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="service-hero-visual-card">
              <img src={service.image.local} alt={service.image.alt} width="736" height="552" />
              <div className="service-hero-floating-card">
                <span>{service.priceLabel}</span>
                <strong>{service.duration}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceQuickAnswerSection service={service} />
      <ServicePageToc items={tocItems} />

      {service.dateNote ? (
        <section className="section-apple janmashtami-date-section" id="when-to-perform">
          <div className="container">
            <div className="date-note-card">
              <div>
                <span className="apple-eyebrow">Festival Date</span>
                <h2>{service.dateNote.heading}</h2>
                <p>{service.dateNote.body}</p>
              </div>
              <ul>
                {service.dateNote.details.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      <ServiceFormatsSection service={service} />
      <ServicePackageSection service={service} />
      <ServiceComparisonSection service={service} />

      <section className="section-apple service-longform-section" id="service-details">
        <div className="container service-content-shell">
          <aside className="service-toc-card" aria-label="Service page contents">
            <span className="apple-eyebrow">On this page</span>
            <nav>
              {tocItems.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="service-article-stack">
            {service.sections.map((section, index) => (
              <article id={`section-${index + 1}`} key={section.heading}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
                <ServiceSectionList items={section.items} />
                <ServiceSectionCards cards={section.cards} />
                <ServiceSectionSteps steps={section.steps} />
                <ServiceSectionLinks links={section.links} />
                <ServiceSectionCta cta={section.cta} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {service.leelas?.length ? (
        <section className="section-apple janmashtami-leela-section" id="devotional-context">
          <div className="container">
            <div className="apple-section-header">
              <span className="apple-eyebrow">Krishna Leelas</span>
              <h2>Stories families often remember during Janmashtami.</h2>
              <p>
                These stories are included as devotional and cultural context, not as a
                substitute for expert scriptural review.
              </p>
            </div>
            <div className="leela-grid">
              {service.leelas.map((leela) => (
                <article key={leela.title}>
                  <h3>{leela.title}</h3>
                  <p>{leela.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ServiceSamagriSection service={service} />

      <section className="section-apple" id="inclusions">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Clarity</span>
            <h2>What is included in the ceremony.</h2>
            <p>{service.samagri}</p>
          </div>

          <div className="service-inclusion-grid">
            <div className="apple-product-card">
              <h3>Included in Service</h3>
              <ul>
                {service.included.map((item) => (
                  <li key={item}>
                    <Check size={16} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="apple-product-card">
              <h3>Optional Additions</h3>
              <ul>
                {service.optional.map((item) => (
                  <li key={item}>
                    <span className="plus-marker">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="apple-product-card ethical-card">
              <h3>Ethical Standards</h3>
              <ul>
                {service.notIncluded.map((item) => (
                  <li key={item}>
                    <span className="minus-marker">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ServicePricingSection service={service} />
      <ServiceLocationsModesSection service={service} />
      <RelatedPanditProfileSection profile={service.relatedPanditProfile} />

      {service.bookingGuide?.length ? (
        <section className="section-apple booking-guide-section" id="booking-process">
          <div className="container">
            <div className="apple-section-header">
              <span className="apple-eyebrow">How to Book</span>
              <h2>{service.bookingGuideHeading || `Book ${service.title} in clear steps.`}</h2>
              <p>
                {service.bookingGuideDescription ||
                  "The booking flow is request-first. The final confirmation happens after Pandit Ji availability, quote, and preparation details are reviewed."}
              </p>
            </div>
            <div className="booking-guide-list">
              {service.bookingGuide.map((step, index) => (
                <article key={step}>
                  <span>{index + 1}</span>
                  <p>{step}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ServiceDisclaimerSection service={service} />

      {hasFaqs ? (
        <section className="section-apple service-faq-section" id="faqs">
          <div className="container">
            <div className="apple-section-header">
              <span className="apple-eyebrow">FAQ</span>
              <h2>Questions before booking {service.title}.</h2>
            </div>
            <div className="apple-accordion-list">
              {service.faqs.map((faq) => (
                <details className="service-faq-item" key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ServiceRelatedServicesSection service={service} services={relatedServices} />
      <ServiceRelatedLinksSection service={service} />
      <ServiceReviewStatusSection service={service} />

      <section className="section-apple" id="booking-section" style={{ backgroundColor: "var(--apple-gray-bg)" }}>
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Priority Request</span>
            <h2>Request a quote for {service.title}.</h2>
            <p>{contact.responsePromise}</p>
          </div>

          <ContactForm
            prefilledCity={service.prefilledCity}
            prefilledMode={service.prefilledMode}
            prefilledService={service.formServiceName || service.title}
          />
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
