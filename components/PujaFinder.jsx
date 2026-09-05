"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Search, X } from "lucide-react";
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
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return servicePages.filter((svc) => {
      const matchesSearch =
        normalizedQuery === "" ||
        svc.title.toLowerCase().includes(normalizedQuery) ||
        svc.description.toLowerCase().includes(normalizedQuery) ||
        svc.category.toLowerCase().includes(normalizedQuery);

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

  const visibleServices = filteredServices.slice(0, 6);
  const resultText =
    filteredServices.length === 1
      ? "1 matching puja found."
      : `${filteredServices.length} matching pujas found.`;

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
          <div className="apple-segmented-control" role="group" aria-label="Puja categories">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                aria-pressed={activeCategory === cat.id}
                className={`apple-segment-btn ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Minimal Search Field */}
        <div className="puja-search-wrap">
          <div className="puja-search-field">
            <Search size={18} aria-hidden="true" />
            <input
              type="text"
              placeholder="Search by deity, occasion, or ritual..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search pujas"
              aria-describedby="puja-filter-status"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="puja-search-clear"
                aria-label="Clear puja search"
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </div>
          <p className="puja-filter-status" id="puja-filter-status" role="status" aria-live="polite">
            {resultText}
          </p>
        </div>

        {/* Apple Product Cards Grid */}
        <div className="apple-products-grid">
          {visibleServices.map((service, index) => (
            <article key={service.slug} className="apple-product-card" data-motion="scale-in" style={{ "--motion-order": index }}>
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

        {visibleServices.length === 0 ? (
          <div className="puja-empty-state">
            <strong>No exact match found.</strong>
            <span>Try a broader word, or send the ritual name for manual guidance.</span>
            <a href="#book-pandit-ji" className="apple-btn-pill apple-btn-primary">
              Request Custom Puja
            </a>
          </div>
        ) : null}

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
