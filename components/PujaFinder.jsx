"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Clock, MapPin, Search } from "lucide-react";
import { servicePages } from "@/lib/site-data";

export default function PujaFinder() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All Pujas" },
    { id: "festivals", label: "Festivals" },
    { id: "shiva", label: "Lord Shiva" },
    { id: "path-jaap", label: "Path & Jaap" },
    { id: "online", label: "Online Video" },
  ];

  const filteredServices = useMemo(() => {
    return servicePages.filter((svc) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        svc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.category.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesCat = true;
      if (activeCategory === "festivals") {
        matchesCat = svc.category === "Festival Pujas";
      } else if (activeCategory === "shiva") {
        matchesCat = svc.category === "Shiva Pujas" || ["Maha Shivratri", "Mahamrityunjaya"].includes(svc.navTitle);
      } else if (activeCategory === "path-jaap") {
        matchesCat = svc.category === "Path/Jaap/Katha";
      } else if (activeCategory === "online") {
        matchesCat = svc.modes.includes("Online");
      }

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, activeCategory]);

  return (
    <section className="apple-comparison-section" id="puja-finder" aria-labelledby="finder-heading">
      <div className="container">
        <div className="apple-section-header">
          <span className="apple-eyebrow">Explore &amp; Compare</span>
          <h2 id="finder-heading">Which puja is right for your family?</h2>
          <p>
            Explore authentic Vedic rituals, duration estimates, samagri inclusions, and location availability.
          </p>
        </div>

        {/* Apple iOS Segmented Control */}
        <div style={{ textAlign: "center" }}>
          <div className="apple-segmented-control" role="tablist" aria-label="Puja Categories">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`apple-segment-btn ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Minimal Search Field */}
        <div style={{ maxWidth: "480px", margin: "0 auto 40px", position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "var(--apple-white)",
              borderRadius: "var(--radius-pill)",
              padding: "8px 16px",
              border: "1px solid var(--apple-line)",
            }}
          >
            <Search size={18} style={{ color: "var(--text-tertiary)", marginRight: "10px" }} />
            <input
              type="text"
              placeholder="Search by deity, occasion, or ritual..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, fontSize: "0.95rem", color: "var(--apple-dark)" }}
              aria-label="Search pujas"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 500 }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Apple Product Cards Grid */}
        <div className="apple-products-grid">
          {filteredServices.slice(0, 6).map((service) => (
            <article key={service.slug} className="apple-product-card">
              <div className="apple-product-media">
                <img
                  src={service.image.local}
                  alt={service.image.alt || service.title}
                  className="apple-product-img"
                  loading="lazy"
                />
              </div>

              <span className="apple-product-tag">{service.category}</span>
              <h3 className="apple-product-title">{service.title}</h3>
              <p className="apple-product-desc">{service.intro || service.description}</p>

              {/* Apple-style Specs List */}
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

              {/* Apple Dual Actions */}
              <div className="apple-product-actions">
                <a href="#book-pandit-ji" className="apple-btn-pill apple-btn-primary" style={{ padding: "8px 18px" }}>
                  Request Quote
                </a>
                <Link href={`/${service.slug}`} className="apple-link apple-link-sm">
                  <span>View details</span>
                  <ChevronRight size={13} className="apple-link-chevron" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "44px" }}>
          <Link href="/puja-services" className="apple-link" style={{ fontSize: "1.1rem", fontWeight: 500 }}>
            <span>Compare all {servicePages.length} Vedic pujas</span>
            <ChevronRight size={16} className="apple-link-chevron" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
