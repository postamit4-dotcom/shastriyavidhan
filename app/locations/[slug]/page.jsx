import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, MapPin, MessageCircle, PhoneCall } from "lucide-react";
import BookingOptionButton from "@/components/BookingOptionButton";
import ContactForm from "@/components/ContactForm";
import TrackedContactLink from "@/components/TrackedContactLink";
import {
  acharyaSursainProfile,
  buildNoidaWhatsAppMessage,
  buildWhatsAppLink,
  contact,
  getLocationBySlug,
  getServiceBySlug,
  locationPages,
  servicePages,
} from "@/lib/site-data";
import { basePageMetadata, locationPageJsonLd } from "@/lib/seo";
import { getNodeById, robotsForIndexable } from "@/lib/site-registry";

function isOnlineLocation(location) {
  return location.city.toLowerCase().includes("online");
}

function serviceMatchesLocation(service, location) {
  const locationKey = isOnlineLocation(location) ? "Online" : location.city;

  return service.locations.some((serviceLocation) => {
    const normalized = serviceLocation.toLowerCase();
    return isOnlineLocation(location)
      ? normalized.includes("online")
      : normalized === locationKey.toLowerCase();
  });
}

function servicesForLocation(location) {
  if (location.popularServiceSlugs?.length) {
    return location.popularServiceSlugs
      .map((slug) => getServiceBySlug(slug))
      .filter(Boolean)
      .filter((service) => serviceMatchesLocation(service, location));
  }

  return servicePages.filter((service) => serviceMatchesLocation(service, location));
}

function pageTitleForLocation(location) {
  if (location.seoTitle) return location.seoTitle;

  if (isOnlineLocation(location)) {
    return "Book Online Puja with Pandit Ji | Live Video Vedic Puja";
  }

  return `Book Pandit Ji in ${location.city} | Vedic Puja Services`;
}

function pageH1ForLocation(location) {
  if (location.pageH1) return location.pageH1;
  if (isOnlineLocation(location)) return "Book Online Puja with Pandit Ji";
  return `Book Pandit Ji in ${location.city}`;
}

function descriptionForLocation(location) {
  if (location.metaDescription) return location.metaDescription;

  if (isOnlineLocation(location)) {
    return "Book online puja with Pandit Ji through live video guidance for families in India, the US, UK, Canada, Australia, UAE, and worldwide.";
  }

  return `Book Pandit Ji in ${location.city} for authentic Vedic puja with availability review, samagri guidance, quote clarity, and family-friendly coordination.`;
}

function imageForLocation(location) {
  return location.image?.local || "/images/diwali-puja.webp";
}

function imageAltForLocation(location) {
  return location.image?.alt || `${location.city} Pandit Ji puja booking`;
}

function bookingCity(location) {
  return isOnlineLocation(location) ? "Online / Worldwide" : location.city;
}

function whatsappHrefForLocation(location, serviceName = "") {
  if (location.slug === "noida") {
    return buildWhatsAppLink(buildNoidaWhatsAppMessage(serviceName));
  }

  return location.whatsappLink || contact.whatsappLink;
}

function preferredModeForService(service) {
  if (service.prefilledMode) return service.prefilledMode;
  if (service.modes.includes("Home")) return "Home";
  if (service.modes.includes("Shop/Office")) return "Shop/Office";
  if (service.modes.includes("Temple/Community")) return "Temple";
  return service.modes[0] || "Home";
}

function trackedLocationParams(location, ctaPosition, selectedPuja = "") {
  return {
    city_slug: location.slug,
    service_city: bookingCity(location),
    cta_position: ctaPosition,
    selected_puja: selectedPuja,
    page_type: "location",
  };
}

export function generateStaticParams() {
  return locationPages.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return {};
  }

  const routeNode = getNodeById(`location-${location.slug}`);

  return basePageMetadata({
    title: pageTitleForLocation(location),
    description: descriptionForLocation(location),
    path: location.href,
    image: imageForLocation(location),
    imageAlt: imageAltForLocation(location),
    robots: robotsForIndexable(routeNode?.indexable),
  });
}

export default async function LocationPage({ params }) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const availableServices = servicesForLocation(location);
  const jsonLd = locationPageJsonLd(location, availableServices);
  const locationLabel = isOnlineLocation(location) ? "online" : `in ${location.city}`;
  const heroHighlights =
    location.heroHighlights ||
    [
      "Availability reviewed before confirmation",
      "Samagri guidance before payment",
      "Home, temple or online feasibility checked",
    ];
  const contactCity = bookingCity(location);
  const customServiceOptions =
    location.customServiceRequests?.map((request) => ({
      value: request.title,
      label: request.title,
    })) || [];

  return (
    <>
      <section className="section-apple service-premium-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="service-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href="/locations">Locations</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>{location.city}</span>
          </nav>

          <div className="service-apple-hero-grid">
            <div>
              <span className="apple-eyebrow">{location.badge}</span>
              <h1>{pageH1ForLocation(location)}</h1>
              <p>{location.heroIntro || location.status}</p>
              <div className="service-hero-actions">
                <TrackedContactLink
                  href={whatsappHrefForLocation(location)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-btn-pill apple-btn-primary"
                  eventName="whatsapp_click"
                  params={trackedLocationParams(location, "location_hero")}
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  Check Availability on WhatsApp
                </TrackedContactLink>
                <TrackedContactLink
                  href={`tel:${contact.phone}`}
                  className="apple-btn-pill apple-btn-secondary"
                  eventName="call_click"
                  params={trackedLocationParams(location, "location_hero_call")}
                  ariaLabel={`Call Shastriya Vidhan booking desk at ${contact.displayPhone}`}
                >
                  <PhoneCall size={17} aria-hidden="true" />
                  Call {contact.displayPhone}
                </TrackedContactLink>
              </div>
              <p className="service-hero-note">
                {location.status}
              </p>
              <div className="service-authority-grid" aria-label={`${location.city} booking checks`}>
                {heroHighlights.map((item) => (
                  <div key={item}>
                    <Check size={16} aria-hidden="true" />
                    <span>Booking check</span>
                    <strong>{item}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="service-hero-visual-card">
              <img src={imageForLocation(location)} alt={imageAltForLocation(location)} width="736" height="552" />
              <div className="service-hero-floating-card">
                <span>{location.city}</span>
                <strong>Puja availability and quote are confirmed before payment.</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-apple service-detail-section" id="popular-puja-services">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Available services</span>
            <h2>{location.popularServicesHeading || `Puja requests ${locationLabel}.`}</h2>
            <p>
              {location.popularServicesDescription ||
                "Choose a relevant puja page, then share your date, locality, service mode, and samagri requirement so the booking desk can review availability."}
            </p>
          </div>

          {availableServices.length > 0 ? (
            <div className="apple-products-grid">
              {availableServices.map((service) => (
                <LocationServiceCard key={service.slug} location={location} service={service} />
              ))}
            </div>
          ) : (
            <div className="apple-product-card" style={{ textAlign: "center" }}>
              <h2 className="apple-product-title">Ask the booking desk.</h2>
              <p className="apple-product-desc">
                This location is reviewed manually. Share your puja requirement and the team will confirm whether service is available.
              </p>
              <TrackedContactLink
                href={whatsappHrefForLocation(location)}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-btn-pill apple-btn-primary"
                eventName="whatsapp_click"
                params={trackedLocationParams(location, "location_empty_services")}
              >
                <MessageCircle size={15} aria-hidden="true" />
                Ask on WhatsApp
              </TrackedContactLink>
            </div>
          )}

          {location.customServiceRequests?.length ? (
            <div style={{ marginTop: "36px" }}>
              <div className="apple-section-header" style={{ marginBottom: "24px" }}>
                <span className="apple-eyebrow">Other requests</span>
                <h2>Other Noida puja enquiries.</h2>
                <p>
                  These requests are not presented as fixed packages. Share the scope first so the team can confirm
                  availability, samagri responsibility, and quote.
                </p>
              </div>
              <div className="service-inclusion-grid">
                {location.customServiceRequests.map((request) => (
                  <CustomRequestCard key={request.title} location={location} request={request} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <PanditGuidanceSection location={location} />

      <QuoteAndInclusionsSection location={location} />

      <CoverageSection location={location} />

      <PreparationSection location={location} />

      <BookingStepsSection location={location} locationLabel={locationLabel} />

      <LocationFaqSection location={location} />

      <RelatedLinksSection location={location} />

      <section className="section-apple" id="booking-section">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Priority request</span>
            <h2>Book Pandit Ji {locationLabel}.</h2>
            <p>{contact.responsePromise}</p>
          </div>

          <ContactForm
            prefilledCity={contactCity}
            prefilledMode={isOnlineLocation(location) ? "Online" : "Home"}
            prefilledService={availableServices[0]?.formServiceName || availableServices[0]?.title || ""}
            serviceOptions={customServiceOptions}
          />
        </div>
      </section>

      <section
        className="section-apple"
        style={{ backgroundColor: "var(--apple-dark)", color: "var(--apple-white)", textAlign: "center" }}
      >
        <div className="container">
          <span className="apple-eyebrow" style={{ color: "var(--sacred-saffron)" }}>
            Final availability check
          </span>
          <h2 style={{ color: "var(--apple-white)", fontSize: "var(--font-h2)", marginBottom: "14px", letterSpacing: 0 }}>
            Share your puja, date and {location.slug === "noida" ? "Noida sector" : "locality"}.
          </h2>
          <p style={{ color: "var(--text-muted-dark)", fontSize: "1.08rem", maxWidth: "660px", margin: "0 auto 28px" }}>
            The booking desk will confirm Pandit Ji availability, samagri arrangements, inclusions, and the quote before
            payment.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
            <TrackedContactLink
              href={whatsappHrefForLocation(location)}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-btn-pill apple-btn-primary"
              eventName="whatsapp_click"
              params={trackedLocationParams(location, "location_final")}
            >
              <MessageCircle size={17} aria-hidden="true" />
              WhatsApp Booking Desk
            </TrackedContactLink>
            <Link href="#booking-section" className="apple-btn-pill apple-btn-outline-white">
              Use Booking Form
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

function LocationServiceCard({ location, service }) {
  const serviceName = service.formServiceName || service.title;
  const cardMode = preferredModeForService(service);

  return (
    <article className="apple-product-card" aria-label={`${service.title} ${bookingCity(location)} enquiry`}>
      <div className="apple-product-media">
        <Link href={`/${service.slug}`} aria-label={`View ${service.title}`}>
          <img
            src={service.image.local}
            alt={service.image.alt || service.title}
            className="apple-product-img"
            loading="lazy"
            width="600"
            height="375"
          />
        </Link>
      </div>

      <span className="apple-product-tag">{service.category}</span>
      <h3 className="apple-product-title">
        <Link href={`/${service.slug}`} style={{ color: "inherit" }}>
          {service.title}
        </Link>
      </h3>
      <p className="apple-product-desc">{service.intro || service.description}</p>

      <div className="apple-product-specs" style={{ textAlign: "left" }}>
        <div>
          <strong>Modes:</strong> {service.modes.join(", ")}
        </div>
        <div>
          <strong>Duration:</strong> {service.cardDuration || service.duration}
        </div>
        <div>
          <strong>Samagri:</strong> {service.cardSamagri || service.samagri}
        </div>
        <div>
          <strong>Quote:</strong> {service.priceLabel}
        </div>
      </div>

      <div className="apple-product-actions" style={{ flexWrap: "wrap", justifyContent: "flex-start" }}>
        <BookingOptionButton
          city={bookingCity(location)}
          ctaLocation="location_service_card"
          label="Select for quote"
          mode={cardMode}
          note={`Selected scope note: ${serviceName} request in ${bookingCity(location)}; sector or locality, date, samagri, inclusions, and quote need confirmation.`}
          pageType="location"
          service={serviceName}
        />
        <TrackedContactLink
          href={whatsappHrefForLocation(location, serviceName)}
          target="_blank"
          rel="noopener noreferrer"
          className="apple-link apple-link-sm"
          eventName="whatsapp_click"
          params={trackedLocationParams(location, "location_service_card_whatsapp", service.slug)}
        >
          <MessageCircle size={13} aria-hidden="true" />
          <span>WhatsApp</span>
        </TrackedContactLink>
        <Link href={`/${service.slug}`} className="apple-link apple-link-sm">
          <span>View details</span>
          <ChevronRight size={13} className="apple-link-chevron" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function CustomRequestCard({ location, request }) {
  return (
    <article className="apple-product-card" style={{ textAlign: "left" }}>
      <span className="apple-product-tag">Custom request</span>
      <h3 className="apple-product-title">{request.title}</h3>
      <p className="apple-product-desc">{request.body}</p>
      <div className="apple-product-actions" style={{ flexWrap: "wrap", justifyContent: "flex-start" }}>
        <BookingOptionButton
          city={bookingCity(location)}
          ctaLocation="location_custom_request"
          label="Select request"
          mode={request.mode || "Home"}
          note={request.note}
          pageType="location"
          service={request.title}
        />
        <TrackedContactLink
          href={whatsappHrefForLocation(location, request.title)}
          target="_blank"
          rel="noopener noreferrer"
          className="apple-link apple-link-sm"
          eventName="whatsapp_click"
          params={trackedLocationParams(location, "location_custom_request_whatsapp", request.title)}
        >
          <MessageCircle size={13} aria-hidden="true" />
          <span>WhatsApp</span>
        </TrackedContactLink>
      </div>
    </article>
  );
}

function PanditGuidanceSection({ location }) {
  if (location.panditGuidance) {
    return (
      <section className="section-apple service-detail-section" id="pandit-ji-guidance">
        <div className="container">
          <article className="apple-product-card" style={{ maxWidth: "980px", margin: "0 auto", textAlign: "left" }}>
            <span className="apple-product-tag">Pandit Ji guidance</span>
            <h2 className="apple-product-title">{location.panditGuidance.heading}</h2>
            <p className="apple-product-desc">{location.panditGuidance.body}</p>
            <ul className="service-detail-list">
              {location.panditGuidance.items.map((item) => (
                <li key={item}>
                  <Check size={16} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {location.panditGuidance.links?.length ? (
              <div className="service-related-link-row" style={{ justifyContent: "flex-start", marginTop: "22px" }}>
                {location.panditGuidance.links.map((link) => (
                  <Link key={link.href} href={link.href} className="apple-btn-pill apple-btn-secondary">
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </article>
        </div>
      </section>
    );
  }

  if (location.slug !== "ghaziabad") return null;

  return (
    <section className="section-apple service-detail-section" id="pandit-ji-guidance">
      <div className="container">
        <article className="apple-product-card" style={{ maxWidth: "940px", margin: "0 auto", textAlign: "left" }}>
          <span className="apple-product-tag">Ghaziabad Pandit Ji profile</span>
          <h2 className="apple-product-title">Local profile linked to Ghaziabad enquiries.</h2>
          <p className="apple-product-desc">
            Families can review{" "}
            <Link href={acharyaSursainProfile.path}>Acharya Sursain Brijwasi&apos;s Ghaziabad Pandit Ji profile</Link>{" "}
            and the{" "}
            <Link href="/pandit-ji/acharya-sursain-brijwasi-raj-nagar-extension-ghaziabad">
              Raj Nagar Extension Pandit Ji page
            </Link>{" "}
            before sharing their puja, date, locality, samagri needs, and booking questions.
          </p>
        </article>
      </div>
    </section>
  );
}

function QuoteAndInclusionsSection({ location }) {
  const quoteFactors =
    location.quoteFactors ||
    [
      {
        title: "Ritual scope",
        body: "Puja type, mode, date, duration, and samagri responsibility are reviewed before quote confirmation.",
      },
      {
        title: "Travel and access",
        body: "Exact locality, travel feasibility, parking, lift access, and venue process are checked before payment.",
      },
      {
        title: "Optional additions",
        body: "Havan, extra recitation, samagri assistance, or additional Pandit Ji support changes the final scope.",
      },
    ];

  return (
    <section className="section-apple service-detail-section" id="charges-samagri-inclusions" style={{ backgroundColor: "var(--apple-gray-bg)" }}>
      <div className="container">
        <div className="apple-section-header">
          <span className="apple-eyebrow">Charges and inclusions</span>
          <h2>Quote, samagri and inclusions are confirmed first.</h2>
          <p>
            The page does not publish placeholder prices. Share the ceremony details first so the team can confirm the
            exact scope and quote.
          </p>
        </div>

        <div className="service-inclusion-grid">
          {quoteFactors.map((factor) => (
            <article key={factor.title} className="apple-product-card" style={{ textAlign: "left" }}>
              <span className="apple-product-tag">Quote factor</span>
              <h3>{factor.title}</h3>
              <p className="apple-product-desc" style={{ marginBottom: 0 }}>{factor.body}</p>
            </article>
          ))}
        </div>

        {location.inclusionNotes?.length ? (
          <ul className="service-detail-list" style={{ maxWidth: "920px", margin: "28px auto 0" }}>
            {location.inclusionNotes.map((item) => (
              <li key={item}>
                <Check size={16} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

function CoverageSection({ location }) {
  const coverageGroups =
    location.coverageGroups ||
    [
      {
        title: `${location.city} enquiry area`,
        body: location.coverage,
      },
      {
        title: "Exact locality review",
        body: "Share your locality, venue, date, and access details so the booking desk can confirm availability.",
      },
      {
        title: "Availability before payment",
        body: "The team checks Pandit Ji schedule, travel feasibility, language, timing, and samagri requirements before payment.",
      },
    ];

  return (
    <section className="section-apple service-detail-section" id="service-coverage">
      <div className="container">
        <div className="apple-section-header">
          <span className="apple-eyebrow">Coverage</span>
          <h2>{location.city} service coverage.</h2>
          <p>Coverage is handled through exact locality and venue review, not unsupported blanket promises.</p>
        </div>
        <div className="service-inclusion-grid">
          {coverageGroups.map((group) => (
            <article key={group.title} className="apple-product-card" style={{ textAlign: "left" }}>
              <MapPin size={20} aria-hidden="true" style={{ color: "var(--sacred-saffron)", marginBottom: "12px" }} />
              <h3>{group.title}</h3>
              <p className="apple-product-desc" style={{ marginBottom: 0 }}>{group.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PreparationSection({ location }) {
  if (!location.preparationItems?.length) return null;

  return (
    <section className="section-apple service-detail-section" id="puja-preparation" style={{ backgroundColor: "var(--apple-gray-bg)" }}>
      <div className="container">
        <div className="apple-section-header">
          <span className="apple-eyebrow">Preparation</span>
          <h2>Preparing for puja at home, office or society venue.</h2>
          <p>
            These practical details help the booking desk confirm feasibility and help your family avoid last-minute
            confusion.
          </p>
        </div>
        <div className="booking-guide-list">
          {location.preparationItems.map((item, index) => (
            <article key={item}>
              <span className="apple-step-num">{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingStepsSection({ location, locationLabel }) {
  const steps =
    location.bookingSteps ||
    [
      {
        title: "Share the puja and date",
        body: "Send your preferred puja, location, family details, language preference, and time window.",
      },
      {
        title: "Confirm availability",
        body: "The team checks Pandit Ji schedule, travel or video suitability, muhurat, quote, and samagri.",
      },
      {
        title: "Prepare peacefully",
        body: "You receive the final checklist and ceremony guidance before the booking is completed.",
      },
    ];

  return (
    <section className="section-apple service-detail-section" id="booking-process">
      <div className="container">
        <div className="apple-section-header">
          <span className="apple-eyebrow">Booking flow</span>
          <h2>How booking works {locationLabel}.</h2>
        </div>

        <div className="apple-steps-row">
          {steps.map((step, index) => (
            <article className="apple-step-item" key={step.title}>
              <span className="apple-step-num">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="apple-step-title">{step.title}</h3>
              <p className="apple-step-body">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationFaqSection({ location }) {
  if (!location.faqs?.length) return null;

  return (
    <section className="section-apple service-detail-section" id="faqs" style={{ backgroundColor: "var(--apple-gray-bg)" }}>
      <div className="container">
        <div className="apple-section-header">
          <span className="apple-eyebrow">FAQs</span>
          <h2>Questions before booking Pandit Ji in {location.city}.</h2>
        </div>
        <div className="apple-accordion-list">
          {location.faqs.map((faq, index) => (
            <details key={faq.question} className="apple-accordion-row" open={index === 0}>
              <summary className="apple-accordion-toggle" style={{ cursor: "pointer" }}>
                <span>{faq.question}</span>
                <span className="apple-accordion-chevron">
                  <ChevronRight size={18} aria-hidden="true" />
                </span>
              </summary>
              <div className="apple-accordion-content open" style={{ maxHeight: "none", opacity: 1 }}>
                <div>
                  <p>{faq.answer}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedLinksSection({ location }) {
  if (!location.relatedLinks?.length) return null;

  return (
    <section className="section-apple service-detail-section" id="related-guidance">
      <div className="container">
        <div className="apple-section-header">
          <span className="apple-eyebrow">Related guidance</span>
          <h2>Useful pages before a {location.city} booking.</h2>
        </div>
        <div className="service-related-link-row">
          {location.relatedLinks.map((link) => (
            <Link key={link.href} href={link.href} className="apple-btn-pill apple-btn-secondary">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
