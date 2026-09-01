"use client";

import Link from "next/link";
import { ChevronRight, Clock, MapPin } from "lucide-react";

export default function ServiceCard({ service }) {
  return (
    <article className="apple-product-card" aria-label={service.title}>
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
      
      <p className="apple-product-desc">
        {service.intro || service.description}
      </p>

      <div className="apple-product-specs">
        <div>
          <strong>Modes:</strong> {service.modes.join(", ")}
        </div>
        <div>
          <strong>Duration:</strong> {service.duration.split(",")[0]}
        </div>
        <div>
          <strong>Locations:</strong> {service.locations.slice(0, 3).join(", ")}
        </div>
      </div>

      <div className="apple-product-actions">
        <Link
          href={`/${service.slug}#booking-section`}
          className="apple-btn-pill apple-btn-primary"
          style={{ padding: "8px 18px" }}
        >
          Request Quote
        </Link>
        <Link href={`/${service.slug}`} className="apple-link apple-link-sm">
          <span>View details</span>
          <ChevronRight size={13} className="apple-link-chevron" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
