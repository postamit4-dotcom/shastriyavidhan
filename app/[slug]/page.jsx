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
    <section className="section-apple service-detail-section">
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
    <section className="section-apple service-detail-section">
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
    <section className="section-apple service-detail-section">
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
    <section className="section-apple service-detail-section">
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
    <section className="section-apple service-detail-section">
      <div className="container">
        <div className="apple-section-header">
          <span className="apple-eyebrow">Related guidance</span>
          <h2>Useful links before booking.</h2>
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
    <section className="section-apple service-detail-section">
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
                <a href="#booking-section" className="apple-btn-pill apple-btn-primary">
                  {service.primaryCtaLabel || "Request Quote"}
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-btn-pill apple-btn-secondary"
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  {service.whatsappCtaLabel || "WhatsApp Assistance"}
                </a>
                {service.callCtaLabel ? (
                  <a href={`tel:${contact.phone}`} className="apple-btn-pill apple-btn-secondary">
                    <PhoneCall size={17} aria-hidden="true" />
                    {service.callCtaLabel}
                  </a>
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

      <ServiceFormatsSection service={service} />
      <ServicePackageSection service={service} />
      <ServiceComparisonSection service={service} />

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

      <ServiceSamagriSection service={service} />
      <ServiceRelatedLinksSection service={service} />
      <RelatedPanditProfileSection profile={service.relatedPanditProfile} />

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

      {service.reviewNote ? (
        <section className="section-apple service-detail-section">
          <div className="container">
            <article className="apple-product-card" style={{ maxWidth: "920px", margin: "0 auto", textAlign: "left" }}>
              <span className="apple-product-tag">Review note</span>
              <h2 className="apple-product-title">{service.reviewNote.heading}</h2>
              <p className="apple-product-desc">{service.reviewNote.body}</p>
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
            </article>
          </div>
        </section>
      ) : null}

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
