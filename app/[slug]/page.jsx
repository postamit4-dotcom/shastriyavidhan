import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Languages,
  MapPin,
  MessageCircle,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { contact, getServiceBySlug, servicePages, site } from "@/lib/site-data";
import { absoluteUrl, canonicalPath, servicePageJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
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
    return {};
  }

  const pageTitle = service.seoTitle || `${service.pageH1 || service.title} | ${site.name}`;

  return {
    title: pageTitle,
    description: service.description,
    keywords: uniqueKeywords(service),
    alternates: {
      canonical: canonicalPath(`/${service.slug}`),
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

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const pageH1 = service.pageH1 || service.title;
  const hasFaqs = Array.isArray(service.faqs) && service.faqs.length > 0;
  const jsonLd = servicePageJsonLd(service);

  return (
    <>
      <section className="section-apple service-premium-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="service-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href="/services">Services</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>{service.navTitle || service.title}</span>
          </nav>

          <div className="service-apple-hero-grid">
            <div>
              <span className="apple-eyebrow">{service.category}</span>
              <h1>{pageH1}</h1>
              <p>{service.description}</p>
              <div className="service-hero-actions">
                <a href="#booking-section" className="apple-btn-pill apple-btn-primary">
                  Book this Puja
                </a>
                <a
                  href={contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-btn-pill apple-btn-secondary"
                >
                  <MessageCircle size={17} />
                  WhatsApp Assistance
                </a>
              </div>
              <p className="service-hero-note">
                Request first. Availability, quote, samagri, and booking terms should be
                confirmed before payment.
              </p>
              <div className="service-authority-grid" aria-label="Booking assurances">
                <div>
                  <Check size={16} aria-hidden="true" />
                  <span>Request-first booking</span>
                  <strong>Confirm timing, quote, and fit before payment.</strong>
                </div>
                <div>
                  <Check size={16} aria-hidden="true" />
                  <span>Clear preparation</span>
                  <strong>Samagri and puja mode details are reviewed upfront.</strong>
                </div>
                <div>
                  <Check size={16} aria-hidden="true" />
                  <span>Family-ready support</span>
                  <strong>Coordinate home, online, or temple puja with guidance.</strong>
                </div>
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

      <section className="service-specs-bar">
        <div className="container service-specs-grid">
          <div>
            <Clock size={18} aria-hidden="true" />
            <span>Duration</span>
            <strong>{service.duration}</strong>
          </div>
          <div>
            <MapPin size={18} aria-hidden="true" />
            <span>Locations</span>
            <strong>{service.locations.join(", ")}</strong>
          </div>
          <div>
            <Languages size={18} aria-hidden="true" />
            <span>Languages</span>
            <strong>{service.languages.join(", ")}</strong>
          </div>
          <div>
            <CalendarDays size={18} aria-hidden="true" />
            <span>Format</span>
            <strong>{service.modes.join(" • ")}</strong>
          </div>
        </div>
      </section>

      {service.dateNote ? (
        <section className="section-apple janmashtami-date-section">
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

      <section className="section-apple service-longform-section">
        <div className="container service-content-shell">
          {service.tableOfContents?.length ? (
            <aside className="service-toc-card" aria-label="Page contents">
              <span className="apple-eyebrow">On this page</span>
              <nav>
                {service.tableOfContents.map((item, index) => (
                  <a key={item} href={`#section-${index + 1}`}>
                    {item}
                  </a>
                ))}
              </nav>
            </aside>
          ) : null}

          <div className="service-article-stack">
            {service.sections.map((section, index) => (
              <article id={`section-${index + 1}`} key={section.heading}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {service.leelas?.length ? (
        <section className="section-apple janmashtami-leela-section">
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

      <section className="section-apple">
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

      {service.bookingGuide?.length ? (
        <section className="section-apple booking-guide-section">
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

      {hasFaqs ? (
        <section className="section-apple service-faq-section">
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

      <section className="section-apple" id="booking-section" style={{ backgroundColor: "var(--apple-gray-bg)" }}>
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Priority Request</span>
            <h2>Book {service.title}.</h2>
            <p>{contact.responsePromise}</p>
          </div>

          <ContactForm prefilledService={service.title} />
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
