import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, MessageCircle } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import {
  bookingSteps,
  contact,
  getCategoryBySlug,
  pathForCategory,
  pujaGuides,
  serviceCategories,
  servicesForCategorySlug,
} from "@/lib/site-data";
import { basePageMetadata, categoryHubJsonLd } from "@/lib/seo";
import { isCategoryIndexable, robotsForIndexable } from "@/lib/site-registry";

function isIndexable(category, services) {
  return isCategoryIndexable(category, services);
}

export function generateStaticParams() {
  return serviceCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) return {};

  const services = servicesForCategorySlug(category.slug);
  const title = `${category.name} | Puja Services`;
  const description = `${category.description} Browse related puja services with request-first booking, samagri guidance, and quote confirmation.`;

  return basePageMetadata({
    title,
    description,
    path: pathForCategory(category),
    image: services[0]?.image.local || "/images/diwali-puja.webp",
    imageAlt: `${category.name} service hub`,
    robots: robotsForIndexable(isIndexable(category, services)),
  });
}

export default async function PujaCategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const services = servicesForCategorySlug(category.slug);
  const readyForMegaMenu = isIndexable(category, services);
  const jsonLd = categoryHubJsonLd(category, services);

  return (
    <>
      <section className="section-apple" style={{ backgroundColor: "var(--apple-gray-bg)", paddingBottom: "48px" }}>
        <div className="container">
          <nav aria-label="Breadcrumb" className="service-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href="/puja-services">Puja Services</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>{category.name}</span>
          </nav>

          <div className="apple-section-header" style={{ marginBottom: "24px" }}>
            <span className="apple-eyebrow">{readyForMegaMenu ? "Publication ready" : "Directory only"}</span>
            <h1>{category.name}</h1>
            <p>{category.description}</p>
          </div>

          <div className="apple-product-card" style={{ maxWidth: "860px", margin: "0 auto", textAlign: "left" }}>
            <h2 className="apple-product-title" style={{ fontSize: "1.3rem" }}>
              Choose the right puja
            </h2>
            <p className="apple-product-desc" style={{ marginBottom: "16px" }}>
              Start with the service page closest to your occasion, deity, format, and city. If the requirement is
              specialist or temple-linked, the booking desk should confirm eligibility, terms, samagri, and practical
              availability before payment.
            </p>
            <div className="apple-product-specs" style={{ textAlign: "left" }}>
              <div>
                <strong>Services linked:</strong> {services.length}
              </div>
              <div>
                <strong>Mega-menu gate:</strong>{" "}
                {readyForMegaMenu
                  ? "Meets the current minimum service-count gate."
                  : "Keep out of the full mega-menu until content and evidence checks are complete."}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-apple">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Related Services</span>
            <h2>Bookable pages in this category.</h2>
          </div>

          {services.length > 0 ? (
            <div className="apple-products-grid">
              {services.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          ) : (
            <div className="apple-product-card" style={{ textAlign: "center" }}>
              <h2 className="apple-product-title">This hub needs service content.</h2>
              <p className="apple-product-desc">
                Add at least three complete service pages before this category is added to expanded navigation.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section-apple" style={{ backgroundColor: "var(--apple-gray-bg)" }}>
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Booking Flow</span>
            <h2>How booking works.</h2>
          </div>

          <div className="apple-steps-row">
            {bookingSteps.map((step) => (
              <article key={step.step} className="apple-step-item">
                <span className="apple-step-num">{step.step}</span>
                <h3 className="apple-step-title">{step.title}</h3>
                <p className="apple-step-body">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-apple">
        <div className="container">
          <div className="service-inclusion-grid">
            <div className="apple-product-card">
              <h3>Pricing factors</h3>
              <ul>
                {[
                  "Number of Pandit Jis and ritual duration",
                  "Home, online, or temple-linked format",
                  "Samagri responsibility and local availability",
                  "Travel, temple, tax, and payment charges where applicable",
                ].map((item) => (
                  <li key={item}>
                    <Check size={16} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="apple-product-card">
              <h3>Pandit standards</h3>
              <ul>
                {[
                  "Identity and conduct expectations",
                  "Ritual fit and language preference",
                  "Punctuality, privacy, and replacement process",
                  "Complaint handling and quality review",
                ].map((item) => (
                  <li key={item}>
                    <Check size={16} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="apple-product-card ethical-card">
              <h3>Related preparation</h3>
              <ul>
                {pujaGuides.slice(0, 3).map((guide) => (
                  <li key={guide.id}>
                    <span className="plus-marker">+</span>
                    <Link href="/guides">{guide.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-apple" style={{ backgroundColor: "var(--apple-gray-bg)" }}>
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Sibling Categories</span>
            <h2>Continue browsing puja services.</h2>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
            {serviceCategories
              .filter((item) => item.slug !== category.slug)
              .map((item) => (
                <Link key={item.slug} href={pathForCategory(item)} className="apple-btn-pill apple-btn-secondary">
                  {item.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="section-apple" id="booking-section">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Booking Request</span>
            <h2>Need help choosing from {category.name}?</h2>
            <p>{contact.responsePromise}</p>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/book-puja" className="apple-btn-pill apple-btn-primary">
              Book Puja
            </Link>
            <a
              href={contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-btn-pill apple-btn-secondary"
            >
              <MessageCircle size={17} aria-hidden="true" />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
