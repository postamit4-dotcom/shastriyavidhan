import Link from "next/link";
import {
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Flame,
  Home,
  Landmark,
  Laptop,
  ListChecks,
  MapPin,
  MessageCircle,
  ScrollText,
  ShieldCheck,
  Users,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import {
  contact,
  getGrahaDoshShantiServices,
  grahaDoshShantiHub,
  isGrahaDoshShantiHubIndexable,
  locationPages,
  pujaModes,
} from "@/lib/site-data";
import { modePages } from "@/lib/page-content";
import { basePageMetadata, grahaDoshShantiHubJsonLd } from "@/lib/seo";
import { robotsForIndexable } from "@/lib/site-registry";

const activeServices = getGrahaDoshShantiServices();
const isIndexable = isGrahaDoshShantiHubIndexable();
const categoryWhatsAppLink = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
  "Namaste Shastriya Vidhan, I need help choosing a Graha & Dosh Shanti Puja. I can share the exact term, preferred date, mode, and city.",
)}`;

export const metadata = basePageMetadata({
  title: grahaDoshShantiHub.seoTitle,
  description: grahaDoshShantiHub.metaDescription,
  path: grahaDoshShantiHub.href,
  robots: robotsForIndexable(isIndexable),
});

const decisionPaths = [
  {
    title: "I know the Puja name",
    body: "Go straight to the active service cards and open the detailed page for the booked format, samagri notes, and confirmation steps.",
    href: "#active-services",
    icon: ListChecks,
  },
  {
    title: "I have a recommendation or kundli term",
    body: "Match the exact term you were given or share that wording with the team. The page does not reinterpret a kundli or diagnose a dosh.",
    href: "#help-choosing",
    icon: ScrollText,
  },
  {
    title: "I know my preferred mode",
    body: "Compare home, online, and temple-linked options, then confirm whether the chosen service supports that mode in your city or date.",
    href: "#mode-section",
    icon: CalendarCheck,
  },
  {
    title: "I am not sure what to choose",
    body: "Ask for human help. The team can explain catalogue differences without turning the page into an automated astrology recommendation.",
    href: "#help-choosing",
    icon: CircleHelp,
  },
];

const serviceTypeNotes = [
  {
    title: "Puja",
    body: "Structured worship and offerings led according to the booked vidhi. The exact sequence is confirmed on the individual service page and during booking.",
    icon: CheckCircle2,
  },
  {
    title: "Path",
    body: "Recitation of a sacred text or selected passages. It may be a standalone service or part of a wider ritual when that service specifies it.",
    icon: ScrollText,
  },
  {
    title: "Jaap",
    body: "Repeated mantra recitation with a defined sankalp or count only when the selected service explicitly includes that scope.",
    icon: Users,
  },
  {
    title: "Havan or Homa",
    body: "A fire ritual that may be included in some services. It should never be assumed as standard unless the service page and confirmation say so.",
    icon: Flame,
  },
];

const modeIcons = {
  home: Home,
  online: Laptop,
  temple: Landmark,
};

const serviceFieldList = [
  "traditional context and suitability language",
  "what happens in the booked format",
  "main vidhi stages at summary level",
  "whether Path, Jaap, Sankalp, or Havan is included",
  "duration or confirmation process",
  "family participation and samagri responsibility",
  "available modes and locations",
  "inclusions, exclusions, quote process, and booking steps",
  "preparation instructions",
  "source clarity, practical disclaimers, and applicable policies",
];

const bookingChecklist = [
  "Exact service name or the terminology you were given",
  "Preferred date and whether you can be flexible",
  "City, travel plan, or online participation location",
  "Preferred mode: home, online guidance, or temple coordination",
  "Who will participate and whether family members will join",
  "Language preference if it is supported for the service",
  "Who arranges samagri and when the final list is shared",
  "Whether Havan is included, optional, or unavailable",
  "Expected duration and reporting or setup time",
  "Temple travel, local process, quote, rescheduling, and cancellation terms",
];

const faqs = [
  {
    question: "Which Graha or Dosh Shanti Puja should I choose?",
    answer:
      "Start with the exact service name or term you already have from a trusted recommendation. If you are unsure, share that wording, your preferred date, mode, and city with the booking team so they can explain the catalogue options without making an automated diagnosis.",
  },
  {
    question: "What is the difference between Puja, Path, Jaap and Havan?",
    answer:
      "Puja is structured worship and offerings, Path is recitation, Jaap is repeated mantra chanting with a specified sankalp or count, and Havan is a fire ritual. The individual service page and booking confirmation are authoritative because inclusions vary by tradition and format.",
  },
  {
    question: "Can a Graha Shanti service be performed online?",
    answer:
      "Some services may support online guidance or consultation, while others are temple-linked or require in-person coordination. The team checks ritual suitability, time zone, language, and samagri preparation before confirming an online format.",
  },
  {
    question: "Are all services available at home or at a temple?",
    answer:
      "No. Mode availability depends on the specific service, city, date, temple process, and Pandit Ji schedule. Use the card-level mode notes as the starting point, then confirm the final format before payment.",
  },
  {
    question: "Does Shastriya Vidhan serve my city?",
    answer:
      "Current requests are reviewed for Noida, Delhi, Gurugram, Ujjain temple coordination, and online guidance. A submitted request is not confirmed until the team checks practical availability for your service, mode, and date.",
  },
  {
    question: "Is samagri included?",
    answer:
      "Samagri depends on the booked service, package, city, and mode. The team should explain whether a checklist is provided, whether any materials can be arranged, and what the family must prepare before payment.",
  },
  {
    question: "How long does the Puja take?",
    answer:
      "Duration varies by service and ritual scope. Use any maintained duration label as an estimate only, and rely on the final confirmation for date, temple process, Havan, and participation details.",
  },
  {
    question: "Can more than one service be combined?",
    answer:
      "Sometimes a family may request related services together, but the scope, sequence, duration, samagri, number of Pandit Jis, and quote must be reviewed manually before confirmation.",
  },
  {
    question: "Does performing a Puja guarantee a particular result?",
    answer:
      "No. These are devotional services with traditional context and preparation guidance. Shastriya Vidhan does not promise guaranteed astrological, material, health, financial, marriage, legal, or career outcomes.",
  },
];

function serviceHref(service) {
  return `/${service.slug}`;
}

function groupServices(services) {
  return services.reduce((groups, service) => {
    const group = service.grahaDoshHub.group;
    if (!groups[group]) groups[group] = [];
    groups[group].push(service);
    return groups;
  }, {});
}

function modeLabel(mode) {
  if (mode === "home") return "Home";
  if (mode === "online") return "Online";
  return "Temple";
}

function ServiceDirectoryCard({ service }) {
  const hub = service.grahaDoshHub;

  return (
    <article className="gds-service-card" aria-label={service.title}>
      <div className="gds-card-topline">
        <span>{hub.group}</span>
        <strong>Active catalogue item</strong>
      </div>
      <h3>{service.title}</h3>
      <p>{hub.summary}</p>
      <dl className="gds-service-facts">
        <div>
          <dt>Usual format</dt>
          <dd>{hub.usualFormat}</dd>
        </div>
        <div>
          <dt>Preparation</dt>
          <dd>{hub.preparationLabel}</dd>
        </div>
        <div>
          <dt>Family participation</dt>
          <dd>{hub.familyParticipation}</dd>
        </div>
        <div>
          <dt>Modes</dt>
          <dd>{service.modes.join(", ")}</dd>
        </div>
        <div>
          <dt>Availability</dt>
          <dd>{hub.availabilityNote}</dd>
        </div>
        <div>
          <dt>Havan</dt>
          <dd>{hub.havanLabel}</dd>
        </div>
      </dl>
      <Link href={serviceHref(service)} className="apple-link apple-link-sm">
        <span>Compare {service.navTitle || service.title} details</span>
        <ChevronRight size={13} className="apple-link-chevron" aria-hidden="true" />
      </Link>
    </article>
  );
}

function ComparisonTable({ services }) {
  return (
    <>
      <div className="gds-table-region" role="region" aria-label="Graha and Dosh Shanti service comparison" tabIndex={0}>
        <table className="gds-comparison-table">
          <caption>
            Active services shown here come from the same catalogue records as the directory cards. Final details are
            confirmed on the individual service page and during booking.
          </caption>
          <thead>
            <tr>
              <th scope="col">Service</th>
              <th scope="col">Traditional context</th>
              <th scope="col">Usual format</th>
              <th scope="col">Preparation</th>
              <th scope="col">Family participation</th>
              <th scope="col">Home</th>
              <th scope="col">Online</th>
              <th scope="col">Temple</th>
              <th scope="col">Availability note</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => {
              const hub = service.grahaDoshHub;
              return (
                <tr key={service.slug}>
                  <th scope="row">
                    <Link href={serviceHref(service)}>{service.title}</Link>
                  </th>
                  <td>{hub.traditionalContext}</td>
                  <td>{hub.usualFormat}</td>
                  <td>{hub.preparationLabel}</td>
                  <td>{hub.familyParticipation}</td>
                  <td>{hub.modeAvailability.home}</td>
                  <td>{hub.modeAvailability.online}</td>
                  <td>{hub.modeAvailability.temple}</td>
                  <td>{hub.availabilityNote}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="gds-mobile-comparison" aria-label="Mobile service comparison">
        {services.map((service) => {
          const hub = service.grahaDoshHub;
          return (
            <article key={service.slug}>
              <h3>{service.title}</h3>
              <dl>
                <div>
                  <dt>Traditional context</dt>
                  <dd>{hub.traditionalContext}</dd>
                </div>
                <div>
                  <dt>Usual format</dt>
                  <dd>{hub.usualFormat}</dd>
                </div>
                <div>
                  <dt>Preparation</dt>
                  <dd>{hub.preparationLabel}</dd>
                </div>
                <div>
                  <dt>Family participation</dt>
                  <dd>{hub.familyParticipation}</dd>
                </div>
                <div>
                  <dt>Home</dt>
                  <dd>{hub.modeAvailability.home}</dd>
                </div>
                <div>
                  <dt>Online</dt>
                  <dd>{hub.modeAvailability.online}</dd>
                </div>
                <div>
                  <dt>Temple</dt>
                  <dd>{hub.modeAvailability.temple}</dd>
                </div>
                <div>
                  <dt>Availability</dt>
                  <dd>{hub.availabilityNote}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </>
  );
}

function ReviewStatus() {
  return (
    <section className="section-apple gds-review-section" aria-labelledby="guidance-heading">
      <div className="container">
        <div className="gds-review-panel">
          <span className="apple-eyebrow">Careful guidance</span>
          <h2 id="guidance-heading">Choose remedial pujas with human review.</h2>
          <div className="gds-review-grid">
            <div>
              <span>Ritual fit</span>
              <strong>Confirmed before booking</strong>
            </div>
            <div>
              <span>Kundli context</span>
              <strong>Discuss with a qualified expert</strong>
            </div>
            <div>
              <span>Booking status</span>
              <strong>Manual availability review</strong>
            </div>
          </div>
          <p>
            Graha and Dosh Shanti requests should be handled carefully. Share the exact term you were given,
            the desired city or temple preference, and your timing needs so the booking desk can explain which
            services may be suitable without making fear-based or guaranteed outcome claims.
          </p>
          <ul>
            {[
              "Do not treat symptoms or life events as proof of a dosh.",
              "Confirm vidhi, samagri, location, duration, and quote before payment.",
              "Use the booking desk for human explanation when the correct service is unclear.",
            ].map((item) => (
              <li key={item}>
                <ShieldCheck size={16} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function GrahaDoshShantiPage() {
  const services = activeServices;
  const groupedServices = groupServices(services);
  const jsonLd = grahaDoshShantiHubJsonLd(services);
  const modePageByModeId = new Map(modePages.map((page) => [page.modeId, page]));
  const formServiceOptions = [
    {
      value: "I am not sure - Graha & Dosh Shanti",
      label: "I am not sure - Graha & Dosh Shanti",
    },
    ...services.map((service) => ({
      value: service.title,
      label: service.title,
    })),
  ];

  return (
    <>
      <section className="section-apple gds-hero" aria-labelledby="gds-heading">
        <div className="container">
          <nav aria-label="Breadcrumb" className="service-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href="/puja-services">Puja Services</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>{grahaDoshShantiHub.breadcrumbLabel}</span>
          </nav>

          <div className="gds-hero-grid">
            <div>
              <span className="apple-eyebrow">Graha &amp; Dosh Shanti</span>
              <h1 id="gds-heading">{grahaDoshShantiHub.h1}</h1>
              <p>
                Compare the verified Graha and Dosh Shanti service options currently represented in the catalogue by
                traditional context, format, family participation, mode, and availability. The goal is calm category
                discovery, not fear-based diagnosis or outcome promises.
              </p>
              <div className="service-hero-actions">
                <a href="#help-choosing" className="apple-btn-pill apple-btn-primary">
                  Help me choose a Puja
                </a>
                <Link href="/puja-services" className="apple-btn-pill apple-btn-secondary">
                  View all Puja Services
                </Link>
              </div>
            </div>

            <div className="gds-hero-panel" aria-label="Category disclosure">
              <div>
                <strong>{services.length}</strong>
                <span>Active compared services</span>
              </div>
              <ul>
                <li>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  Availability confirmed manually
                </li>
                <li>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  Samagri and preparation explained before booking
                </li>
                <li>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  Home, online, and temple options vary by service and location
                </li>
                <li>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  No guaranteed astrological or material outcomes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-apple" aria-labelledby="decision-heading">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Decision path</span>
            <h2 id="decision-heading">Start with what you already know</h2>
            <p>
              Use the information you already have, then move to the service page or the booking desk when a detail needs
              human confirmation.
            </p>
          </div>
          <div className="gds-decision-grid">
            {decisionPaths.map((path) => {
              const Icon = path.icon;
              return (
                <a key={path.title} href={path.href} className="gds-decision-card">
                  <Icon size={22} aria-hidden="true" />
                  <h3>{path.title}</h3>
                  <p>{path.body}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-apple gds-soft-section" aria-labelledby="types-heading">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Terminology</span>
            <h2 id="types-heading">Understand the service types</h2>
            <p>
              Names and inclusions can vary by tradition and booked format. The individual service page and booking
              confirmation are authoritative for the actual vidhi, count, samagri, duration, and participation details.
            </p>
          </div>
          <div className="gds-type-grid">
            {serviceTypeNotes.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="gds-type-card">
                  <Icon size={22} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-apple" id="active-services" aria-labelledby="services-heading">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Active directory</span>
            <h2 id="services-heading">Compare active Graha and Dosh Shanti services</h2>
            <p>
              Only active, indexable, complete service records with explicit hub fields appear here. Planned, paused,
              incomplete, and unreviewed-only service ideas are excluded from this directory.
            </p>
          </div>

          <div className="gds-group-stack">
            {Object.entries(groupedServices).map(([group, groupItems]) => {
              const groupId = `${group.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-heading`;
              return (
                <section key={group} aria-labelledby={groupId}>
                  <div className="gds-group-heading">
                    <h3 id={groupId}>{group}</h3>
                    <strong>{groupItems.length} service{groupItems.length === 1 ? "" : "s"}</strong>
                  </div>
                  <div className="gds-service-grid">
                    {groupItems.map((service) => (
                      <ServiceDirectoryCard key={service.slug} service={service} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-apple gds-soft-section" aria-labelledby="comparison-heading">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Format comparison</span>
            <h2 id="comparison-heading">Compare by format and preparation</h2>
            <p>
              This table compares practical decision attributes. It does not compare promises, benefits, or outcomes.
            </p>
          </div>
          <ComparisonTable services={services} />
        </div>
      </section>

      <section className="section-apple" id="mode-section" aria-labelledby="mode-heading">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Modes</span>
            <h2 id="mode-heading">Choose home, online or temple format</h2>
            <p>
              Mode availability is service-level information. The cards below explain the operational difference without
              implying that every service supports every format.
            </p>
          </div>
          <div className="gds-mode-grid">
            {pujaModes.map((mode) => {
              const Icon = modeIcons[mode.id] || MapPin;
              const modePage = modePageByModeId.get(mode.id);
              return (
                <article key={mode.id} className="gds-mode-card">
                  <Icon size={24} aria-hidden="true" />
                  <span>{mode.badge}</span>
                  <h3>{mode.title}</h3>
                  <p>{mode.bestFor}</p>
                  <dl>
                    <div>
                      <dt>Participation</dt>
                      <dd>{mode.howItWorks}</dd>
                    </div>
                    <div>
                      <dt>Confirm</dt>
                      <dd>{mode.prepare}</dd>
                    </div>
                  </dl>
                  {modePage ? (
                    <Link href={modePage.href} className="apple-link apple-link-sm">
                      <span>View {modePage.title} details</span>
                      <ChevronRight size={13} className="apple-link-chevron" aria-hidden="true" />
                    </Link>
                  ) : (
                    <a href="#help-choosing" className="apple-link apple-link-sm">
                      <span>Ask about {modeLabel(mode.id)} availability</span>
                      <ChevronRight size={13} className="apple-link-chevron" aria-hidden="true" />
                    </a>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-apple gds-soft-section" aria-labelledby="confirm-heading">
        <div className="container">
          <div className="gds-two-column">
            <div>
              <span className="apple-eyebrow">Before booking</span>
              <h2 id="confirm-heading">Know what to confirm before booking</h2>
              <p>
                A good request gives the booking desk enough context to check the service, date, mode, city, samagri,
                and quote clearly before payment.
              </p>
              <div className="gds-link-row">
                <Link href="/how-it-works">How It Works</Link>
                <Link href="/pricing-and-inclusions">Pricing &amp; Inclusions</Link>
                <Link href="/guides#samagri-guidance">Samagri guidance</Link>
                <Link href="/locations">Locations</Link>
                <Link href="/pandit-standards">Pandit standards</Link>
                <Link href="/religious-legal-disclaimer">Policies</Link>
              </div>
            </div>
            <ul className="gds-checklist">
              {bookingChecklist.map((item) => (
                <li key={item}>
                  <ClipboardCheck size={17} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-apple" aria-labelledby="service-pages-heading">
        <div className="container">
          <div className="gds-two-column">
            <div>
              <span className="apple-eyebrow">Detail pages</span>
              <h2 id="service-pages-heading">What each service page explains</h2>
              <p>
                This hub stays at comparison level. The service pages carry the detailed vidhi, inclusions, exclusions,
                samagri responsibility, duration notes, mode and location availability, booking steps, and disclaimers.
              </p>
              <div className="gds-service-links">
                {services.map((service) => (
                  <Link key={service.slug} href={serviceHref(service)}>
                    Compare {service.navTitle || service.title} details
                  </Link>
                ))}
              </div>
            </div>
            <ul className="gds-checklist compact">
              {serviceFieldList.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={17} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-apple gds-soft-section" aria-labelledby="availability-heading">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Availability</span>
            <h2 id="availability-heading">Check availability for your mode and location</h2>
            <p>
              Live availability is not programmatically exposed in this repository. Availability is manually confirmed
              after you share the service, preferred date, mode, and city.
            </p>
          </div>
          <div className="gds-location-grid">
            {locationPages.map((location) => (
              <article key={location.slug}>
                <span>{location.badge}</span>
                <h3>{location.city}</h3>
                <p>{location.status}</p>
                {location.slug === "online-puja" ? (
                  <Link href="/online-puja">View online Puja details</Link>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-apple" aria-labelledby="guidance-heading">
        <div className="container">
          <div className="gds-guidance-panel">
            <ShieldCheck size={28} aria-hidden="true" />
            <div>
              <span className="apple-eyebrow">Responsible guidance</span>
              <h2 id="guidance-heading">Clear guidance without outcome promises</h2>
              <p>
                Shastriya Vidhan explains the booked ritual, format, preparation, participation, quote, and limitations
                clearly. The service language respects Hindu religious practice while avoiding fear-based claims,
                pressure tactics, and guaranteed astrological or material outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-apple gds-soft-section" id="help-choosing" aria-labelledby="help-heading">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Assisted choice</span>
            <h2 id="help-heading">Need help choosing a service?</h2>
            <p>
              Share the exact term you have, preferred date, mode, and city. If you do not know the service name, choose
              "I am not sure" and the team can explain catalogue distinctions before any confirmation or payment.
            </p>
            <div className="gds-help-actions">
              <a href="#booking-form-wrapper" className="apple-btn-pill apple-btn-primary">
                Help me choose a Puja
              </a>
              <a
                href={categoryWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-btn-pill apple-btn-secondary"
              >
                <MessageCircle size={17} aria-hidden="true" />
                WhatsApp Booking Desk
              </a>
            </div>
          </div>
          <ContactForm
            prefilledService="I am not sure - Graha & Dosh Shanti"
            prefilledCity="Ujjain"
            serviceOptions={formServiceOptions}
            includeDefaultServiceOptions={false}
          />
        </div>
      </section>

      <section className="section-apple" aria-labelledby="faq-heading">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Frequently asked questions</span>
            <h2 id="faq-heading">Frequently asked questions</h2>
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

      <ReviewStatus />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
