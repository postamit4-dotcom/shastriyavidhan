import Link from "next/link";
import { MapPin, MessageCircle, PhoneCall } from "lucide-react";
import TrackedContactLink from "@/components/TrackedContactLink";
import { contact } from "@/lib/site-data";

const serviceAreas = [
  { name: "Indirapuram" },
  { name: "Vaishali" },
  { name: "Vasundhara" },
  { name: "Raj Nagar" },
  { name: "Raj Nagar Extension", href: "/pandit-ji/acharya-sursain-brijwasi-raj-nagar-extension-ghaziabad" },
  { name: "Crossings Republik" },
  { name: "Kaushambi" },
  { name: "Sahibabad" },
  { name: "Vijay Nagar" },
  { name: "Wave City" },
];

export default function GhaziabadServiceAreas({
  whatsappHref = contact.whatsappLink,
  phoneHref = `tel:${contact.phone}`,
}) {
  return (
    <section className="section-apple ghaziabad-service-areas" id="ghaziabad-service-areas" aria-labelledby="ghaziabad-areas-heading">
      <div className="container">
        <div className="apple-section-header">
          <span className="apple-eyebrow">Ghaziabad enquiries</span>
          <h2 id="ghaziabad-areas-heading">Areas to mention in your Ghaziabad request</h2>
          <p>
            Share the exact locality, society or venue when requesting Puja, Path, Jaap,
            Havan or a traditional Hindu ceremony. The booking desk checks Pandit Ji
            availability and travel feasibility before confirmation.
          </p>
        </div>

        <ul className="ghaziabad-service-area-grid" aria-label="Ghaziabad service localities">
          {serviceAreas.map((area, index) => (
            <li key={area.name} className="ghaziabad-service-area-card" data-motion="scale-in" style={{ "--motion-order": index }}>
              <MapPin size={18} aria-hidden="true" />
              {area.href ? (
                <Link href={area.href}>Pandit Ji in {area.name}</Link>
              ) : (
                <span>{area.name}</span>
              )}
            </li>
          ))}
        </ul>

        <div className="ghaziabad-area-cta" data-motion="fade-up">
          <div>
            <h3>Need a Pandit Ji in Your Area?</h3>
            <p>
              Tell us your locality, Puja requirement and preferred date to check Pandit Ji
              availability in Ghaziabad.
            </p>
          </div>
          <div className="service-hero-actions">
            <TrackedContactLink
              href={phoneHref}
              className="apple-btn-pill apple-btn-secondary"
              aria-label={`Call Pandit Ji at ${contact.displayPhone}`}
              eventName="call_click"
              params={{ cta_location: "ghaziabad_area_cta", page_type: "profile" }}
            >
              <PhoneCall size={17} aria-hidden="true" />
              Call Pandit Ji
            </TrackedContactLink>
            <TrackedContactLink
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-btn-pill apple-btn-primary"
              aria-label="Chat on WhatsApp with Shastriya Vidhan for a Ghaziabad puja enquiry"
              eventName="whatsapp_click"
              params={{ cta_location: "ghaziabad_area_cta", page_type: "profile" }}
            >
              <MessageCircle size={17} aria-hidden="true" />
              Chat on WhatsApp
            </TrackedContactLink>
          </div>
        </div>
      </div>
    </section>
  );
}
