import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarCheck, ChevronRight, MapPin, MessageCircle, PhoneCall } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import ServiceCard from "@/components/ServiceCard";
import TrackedContactLink from "@/components/TrackedContactLink";
import { acharyaSursainProfile, contact, getLocationBySlug, locationPages, servicePages } from "@/lib/site-data";
import { basePageMetadata, locationPageJsonLd } from "@/lib/seo";
import { getNodeById, robotsForIndexable } from "@/lib/site-registry";

function isOnlineLocation(location) {
  return location.city.toLowerCase().includes("online");
}

function servicesForLocation(location) {
  const locationKey = isOnlineLocation(location) ? "Online" : location.city;

  return servicePages.filter((service) =>
    service.locations.some((serviceLocation) => serviceLocation.toLowerCase() === locationKey.toLowerCase()),
  );
}

function pageTitleForLocation(location) {
  if (isOnlineLocation(location)) {
    return "Book Online Puja with Pandit Ji | Live Video Vedic Puja";
  }

  return `Book Pandit Ji in ${location.city} | Vedic Puja Services`;
}

function descriptionForLocation(location) {
  if (isOnlineLocation(location)) {
    return "Book online puja with Pandit Ji through live video guidance for families in India, the US, UK, Canada, Australia, UAE, and worldwide.";
  }

  return `Book Pandit Ji in ${location.city} for authentic Vedic puja with availability review, samagri guidance, quote clarity, and family-friendly coordination.`;
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
    image: "/images/diwali-puja.webp",
    imageAlt: `${location.city} Pandit Ji puja booking`,
    robots: robotsForIndexable(routeNode?.indexable),
  });
}

export default async function LocationPage({ params }) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const routeNode = getNodeById(`location-${location.slug}`);
  const availableServices = servicesForLocation(location);
  const jsonLd = locationPageJsonLd(location, availableServices);
  const locationLabel = isOnlineLocation(location) ? "online" : `in ${location.city}`;

  return (
    <>
      <section className="section-apple" style={{ backgroundColor: "var(--apple-gray-bg)", paddingBottom: "48px" }}>
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
              <h1>{pageTitleForLocation(location)}</h1>
              <p>{location.status}</p>
              <div className="service-hero-actions">
                <TrackedContactLink
                  href="#booking-section"
                  className="apple-btn-pill apple-btn-primary"
                  eventName="booking_start"
                  params={{ city_slug: location.slug, cta_location: "location_hero", page_type: "location" }}
                >
                  Book Pandit Ji
                </TrackedContactLink>
                <TrackedContactLink
                  href={contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-btn-pill apple-btn-secondary"
                  eventName="whatsapp_click"
                  params={{ city_slug: location.slug, cta_location: "location_hero", page_type: "location" }}
                >
                  <MessageCircle size={17} />
                  WhatsApp Assistance
                </TrackedContactLink>
              </div>
            </div>

            <div className="apple-product-card" style={{ textAlign: "left" }}>
              <span className="apple-product-tag">Coverage</span>
              <h2 className="apple-product-title">{location.city}</h2>
              <div className="apple-product-specs">
                <div>
                  <MapPin size={16} aria-hidden="true" />
                  <strong>Area:</strong> {location.coverage}
                </div>
                <div>
                  <CalendarCheck size={16} aria-hidden="true" />
                  <strong>Review:</strong> Date, muhurat, mode, and samagri are confirmed before payment.
                </div>
                <div>
                  <strong>Availability note:</strong>{" "}
                  {routeNode?.indexable
                    ? "Detailed city page is available for booking requests."
                    : "Share the exact locality so the booking desk can confirm service availability."}
                </div>
                <div>
                  <PhoneCall size={16} aria-hidden="true" />
                  <strong>Booking desk:</strong> {location.phone}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {location.slug === "ghaziabad" ? (
        <section className="section-apple">
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
      ) : null}

      <section className="section-apple">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Available Services</span>
            <h2>Puja requests {locationLabel}.</h2>
            <p>
              Choose a relevant puja page, then share your date, locality, service mode, and
              samagri requirement so the booking desk can review availability.
            </p>
          </div>

          {availableServices.length > 0 ? (
            <div className="apple-products-grid">
              {availableServices.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          ) : (
            <div className="apple-product-card" style={{ textAlign: "center" }}>
              <h2 className="apple-product-title">Ask the booking desk.</h2>
              <p className="apple-product-desc">
                This location is reviewed manually. Share your puja requirement and
                the team will confirm whether service is available.
              </p>
              <TrackedContactLink
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-btn-pill apple-btn-primary"
                eventName="whatsapp_click"
                params={{ city_slug: location.slug, cta_location: "location_empty_services", page_type: "location" }}
              >
                <MessageCircle size={15} />
                Ask on WhatsApp
              </TrackedContactLink>
            </div>
          )}
        </div>
      </section>

      <section className="section-apple" style={{ backgroundColor: "var(--apple-gray-bg)" }}>
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Booking Flow</span>
            <h2>How booking works {locationLabel}.</h2>
          </div>

          <div className="apple-steps-row">
            <article className="apple-step-item">
              <span className="apple-step-num">01</span>
              <h3 className="apple-step-title">Share the puja and date</h3>
              <p className="apple-step-body">
                Send your preferred puja, location, family details, language preference, and time window.
              </p>
            </article>
            <article className="apple-step-item">
              <span className="apple-step-num">02</span>
              <h3 className="apple-step-title">Confirm availability</h3>
              <p className="apple-step-body">
                The team checks Pandit Ji schedule, travel or video suitability, muhurat, quote, and samagri.
              </p>
            </article>
            <article className="apple-step-item">
              <span className="apple-step-num">03</span>
              <h3 className="apple-step-title">Prepare peacefully</h3>
              <p className="apple-step-body">
                You receive the final checklist and ceremony guidance before the booking is completed.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-apple" id="booking-section">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Priority Request</span>
            <h2>Book Pandit Ji {locationLabel}.</h2>
            <p>{contact.responsePromise}</p>
          </div>

          <ContactForm />
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
