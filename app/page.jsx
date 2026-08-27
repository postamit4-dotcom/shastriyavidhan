"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  CalendarCheck,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Compass,
  Flame,
  Globe,
  HeartHandshake,
  Languages,
  Layers,
  MapPin,
  MessageCircle,
  PhoneCall,
  Scroll,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Video,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import PujaFinder from "@/components/PujaFinder";
import {
  bookingSteps,
  contact,
  customerExperiences,
  homeFaqs,
  locationPages,
  panditProfiles,
  pujaGuides,
  pujaModes,
  servicePages,
  site,
  trustPillars,
} from "@/lib/site-data";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      {/* 1. APPLE FULL-BLEED HERO SECTION */}
      <section className="apple-hero-fullbleed" aria-label="Hero Introduction">
        <div className="container apple-hero-grid">
          <div className="apple-hero-copy">
            <div className="social-proof-badge">
              <span className="stars" aria-hidden="true">★★★★★</span>
              <span>Trusted by families across Delhi NCR and worldwide</span>
            </div>

            <span className="apple-eyebrow">Shastriya Vidhan Special</span>
            <h1 className="apple-hero-title">
              Book <span className="text-gradient">Pandit Ji</span> for puja at home, temple or online.
            </h1>
            <p className="apple-hero-subtitle">
              Plan authentic Vedic pujas with clear vidhi, samagri guidance, quote confirmation, and family-friendly coordination before payment.
            </p>

            <div className="apple-hero-ctas">
              <a href="#book-pandit-ji" className="apple-btn-pill apple-btn-primary" id="hero-book-cta">
                Book Pandit Ji
                <ChevronRight size={17} aria-hidden="true" />
              </a>
              <a href={contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="apple-btn-pill apple-btn-secondary">
                <MessageCircle size={17} aria-hidden="true" />
                WhatsApp Booking Desk
              </a>
            </div>

            <div className="trust-badge-grid" aria-label="Booking highlights">
              <div className="badge-item">
                <Check size={16} aria-hidden="true" />
                <span>Manual availability check</span>
              </div>
              <div className="badge-item">
                <Check size={16} aria-hidden="true" />
                <span>Home, temple and online puja</span>
              </div>
              <div className="badge-item">
                <Check size={16} aria-hidden="true" />
                <span>Samagri checklist before booking</span>
              </div>
              <div className="badge-item">
                <Check size={16} aria-hidden="true" />
                <span>No payment before quote clarity</span>
              </div>
              <div className="badge-item">
                <Check size={16} aria-hidden="true" />
                <span>Hindi, Sanskrit and English support</span>
              </div>
              <div className="badge-item">
                <Check size={16} aria-hidden="true" />
                <span>NRI video-call friendly</span>
              </div>
            </div>
          </div>

          <div className="apple-hero-stage">
            <div className="image-border-gradient">
              <img
                src="/images/diwali-puja.webp"
                alt="Authentic Vedic Puja arrangement with traditional lamps"
                className="apple-hero-media"
                fetchPriority="high"
                width="1200"
                height="900"
              />
            </div>

            <div className="floating-stats-card">
              <div className="avatar-group" aria-hidden="true">
                <span className="avatar">OM</span>
                <span className="avatar">SV</span>
                <span className="avatar">PJ</span>
              </div>
              <div className="stats-text">
                <strong>Request-first</strong>
                <span>Availability, quote, and samagri confirmed manually.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. APPLE 2-UP BENTO GRID */}
      <section className="section-apple" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="apple-bento-grid">
            {/* Bento Card 1: Online Video Puja */}
            <article className="apple-bento-card">
              <div className="apple-bento-card-header">
                <span className="apple-eyebrow">NRI &amp; Remote Friendly</span>
                <h2 className="apple-bento-title">Online Video Puja.</h2>
                <p className="apple-bento-desc">
                  Join a private live HD video session with your family anywhere in the world.
                </p>
                <div className="apple-bento-actions">
                  <a href="#book-pandit-ji" className="apple-btn-pill apple-btn-primary">
                    Book Online
                  </a>
                  <a href="#puja-finder" className="apple-link">
                    <span>How it works</span>
                    <ChevronRight size={14} className="apple-link-chevron" />
                  </a>
                </div>
              </div>

              <div className="apple-bento-media-wrap">
                <img
                  src="/images/maha-shivratri.webp"
                  alt="Online Puja live guidance"
                  className="apple-bento-img"
                  loading="lazy"
                />
              </div>
            </article>

            {/* Bento Card 2: Dark Apple Pro Style - Lord Shiva Rudrabhishek */}
            <article className="apple-bento-card apple-bento-dark">
              <div className="apple-bento-card-header">
                <span className="apple-eyebrow" style={{ color: "var(--sacred-saffron)" }}>
                  Lord Shiva Rituals
                </span>
                <h2 className="apple-bento-title">Rudrabhishek.</h2>
                <p className="apple-bento-desc">
                  Sacred Shiva abhishek with panchamrit, bilva patra, and authentic Vedic chanting.
                </p>
                <div className="apple-bento-actions">
                  <Link href="/book-pandit-ji-for-rudrabhishek-puja-noida" className="apple-btn-pill apple-btn-primary">
                    Explore Vidhi
                  </Link>
                  <a href="#book-pandit-ji" className="apple-link" style={{ color: "#fff" }}>
                    <span>Request Acharya</span>
                    <ChevronRight size={14} className="apple-link-chevron" />
                  </a>
                </div>
              </div>

              <div className="apple-bento-media-wrap">
                <img
                  src="/images/rudrabhishek-puja.webp"
                  alt="Lord Shiva Rudrabhishek ritual"
                  className="apple-bento-img"
                  loading="lazy"
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 3. APPLE COMPARISON & DISCOVERY SEGMENT */}
      <PujaFinder />

      {/* 4. APPLE PRO DARK SHOWCASE: "Vedic Precision. Zero Superstitions." */}
      <section className="apple-dark-showcase" id="why-us" aria-labelledby="showcase-heading">
        <div className="container">
          <span className="apple-eyebrow" style={{ textAlign: "center", display: "block" }}>
            The Shastriya Vidhan Standard
          </span>
          <h2 id="showcase-heading">
            Vedic Precision. Zero Superstitions.
          </h2>
          <p>
            Pure shastric integrity designed for modern families. No fear-based astrology, hidden charges, or empty claims.
          </p>

          <div className="apple-dark-grid-3">
            <div className="apple-dark-feature-card">
              <div className="apple-dark-feature-icon">
                <Award size={22} />
              </div>
              <h3>Verified Sanskrit Scholars</h3>
              <p>
                Every Acharya holds recognized degrees from Sampurnanand Sanskrit University or Lal Bahadur Shastri Sanskrit University.
              </p>
            </div>

            <div className="apple-dark-feature-card">
              <div className="apple-dark-feature-icon">
                <Scroll size={22} />
              </div>
              <h3>Itemized Samagri Lists</h3>
              <p>
                You receive a clear, upfront checklist specifying exactly what the Pandit Ji arranges versus what you prepare at home.
              </p>
            </div>

            <div className="apple-dark-feature-card">
              <div className="apple-dark-feature-icon">
                <ShieldCheck size={22} />
              </div>
              <h3>Verified Quotes Before Payment</h3>
              <p>
                No automated surprises. Our spiritual desk checks priest schedules and travel feasibility before finalizing your booking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. APPLE 4-STEP HOW IT WORKS ROW */}
      <section className="section-apple" id="how-it-works" aria-labelledby="hiw-apple-heading">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Simple 4-Step Journey</span>
            <h2 id="hiw-apple-heading">From booking to blessings.</h2>
            <p>
              A straightforward process engineered for clarity and peace of mind.
            </p>
          </div>

          <div className="apple-steps-row">
            {bookingSteps.map((step) => (
              <div key={step.step} className="apple-step-item">
                <span className="apple-step-num">0{step.step}</span>
                <h3 className="apple-step-title">{step.title}</h3>
                <p className="apple-step-body">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PUJA MODES (Home vs Online vs Temple) */}
      <section className="section-apple" id="puja-modes" style={{ backgroundColor: "var(--apple-gray-bg)" }}>
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Flexible Formats</span>
            <h2>Puja tailored to your family&apos;s lifestyle.</h2>
            <p>
              Choose home visits in Delhi NCR, authorized teerth pujas in Ujjain, or live HD video worldwide.
            </p>
          </div>

          <div className="apple-bento-grid">
            {pujaModes.map((m) => (
              <div key={m.id} className="apple-product-card" style={{ textAlign: "left" }}>
                <span className="apple-product-tag">{m.badge}</span>
                <h3 className="apple-product-title">{m.title}</h3>
                <p className="apple-product-desc">{m.bestFor}</p>

                <div className="apple-product-specs" style={{ textAlign: "left" }}>
                  <div><strong>How it works:</strong> {m.howItWorks}</div>
                  <div><strong>Included:</strong> {m.includes}</div>
                </div>

                <div style={{ marginTop: "auto", display: "flex", gap: "12px", alignItems: "center" }}>
                  <a href="#book-pandit-ji" className="apple-btn-pill apple-btn-primary">
                    Book {m.bookingMode}
                  </a>
                  <a href={contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="apple-link apple-link-sm">
                    <span>Ask team</span>
                    <ChevronRight size={13} className="apple-link-chevron" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PANDIT JI LEADERSHIP DIRECTORY */}
      <section className="section-apple" id="pandits" aria-labelledby="pandits-apple-heading">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Verified Vedic Acharyas</span>
            <h2 id="pandits-apple-heading">Meet the scholars guiding your puja.</h2>
            <p>
              Educated in traditional Vedic gurukuls and top Sanskrit universities across India.
            </p>
          </div>

          <div className="apple-profiles-grid">
            {panditProfiles.map((p) => (
              <article key={p.name} className="apple-profile-card">
                <div className="apple-profile-photo-wrap">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="apple-profile-photo"
                    loading="lazy"
                  />
                </div>
                <div className="apple-profile-body">
                  <h3 className="apple-profile-name">{p.name}</h3>
                  <p className="apple-profile-title">{p.title} • {p.experience}</p>
                  <div className="apple-profile-edu">
                    <strong>Vedic Education:</strong> {p.education}
                  </div>
                  <p className="apple-profile-bio">{p.bio}</p>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "1px solid var(--apple-line-light)" }}>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-tertiary)" }}>
                      {p.locations.join(" • ")}
                    </span>
                    <a href="#book-pandit-ji" className="apple-btn-pill apple-btn-primary" style={{ padding: "6px 14px", fontSize: "0.82rem" }}>
                      Request
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SERVICE LOCATIONS HUBS */}
      <section className="section-apple" id="locations" style={{ backgroundColor: "var(--apple-gray-bg)" }}>
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Service Areas</span>
            <h2>Available across Delhi NCR, Ujjain &amp; Global.</h2>
            <p>
              Local Acharyas dispatched for home pujas across Delhi NCR, plus authorized temple coordination.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            {locationPages.map((loc) => (
              <div key={loc.city} className="apple-product-card" style={{ padding: "24px", textAlign: "left" }}>
                <span className="apple-product-tag">{loc.badge}</span>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "4px 0" }}>{loc.city}</h3>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "16px" }}>{loc.coverage}</p>
                <a href="#book-pandit-ji" className="apple-link apple-link-sm" style={{ fontWeight: 500 }}>
                  <span>Book in {loc.city}</span>
                  <ChevronRight size={13} className="apple-link-chevron" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PUJA GUIDES & SAMAGRI LIBRARY */}
      <section className="section-apple" id="guides">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Preparation Library</span>
            <h2>Puja Vidhi &amp; Samagri Guides.</h2>
            <p>
              Reviewed by senior Acharyas to help you understand every ritual step and prepare smoothly.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {pujaGuides.map((guide) => (
              <article key={guide.id} className="apple-product-card" style={{ textAlign: "left", padding: "20px" }}>
                <div style={{ aspectRatio: "16/10", borderRadius: "var(--radius-inner)", overflow: "hidden", marginBottom: "16px" }}>
                  <img src={guide.image} alt={guide.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                </div>
                <span className="apple-product-tag">{guide.category} • {guide.readTime}</span>
                <h3 style={{ fontSize: "1.08rem", fontWeight: 600, margin: "6px 0 8px", lineHeight: 1.3 }}>{guide.title}</h3>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "14px", lineHeight: 1.45 }}>{guide.summary}</p>
                <a href="#book-pandit-ji" className="apple-link apple-link-sm">
                  <span>Read checklist</span>
                  <ChevronRight size={13} className="apple-link-chevron" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 10. APPLE SLEEK ACCORDION (FAQs) */}
      <section className="section-apple" id="faqs" style={{ backgroundColor: "var(--apple-gray-bg)" }}>
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Frequently Asked Questions</span>
            <h2>Questions before booking.</h2>
          </div>

          <div className="apple-accordion-list">
            {homeFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`apple-accordion-row ${isOpen ? "open" : ""}`}>
                  <button
                    type="button"
                    className="apple-accordion-toggle"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <span className="apple-accordion-chevron">
                      <ChevronDown size={18} />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="apple-accordion-content">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. APPLE-STYLE 4-STEP BOOKING ENGINE */}
      <section className="section-apple" id="book-pandit-ji">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Priority Booking Desk</span>
            <h2>Book your Pandit Ji.</h2>
            <p>
              Submit your puja details below. Our spiritual desk will verify Acharya schedule and connect with you.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* 12. FINAL APPLE HIGH-IMPACT HERO BANNER */}
      <section className="section-apple" style={{ backgroundColor: "var(--apple-dark)", color: "var(--apple-white)", textAlign: "center" }}>
        <div className="container">
          <span className="apple-eyebrow" style={{ color: "var(--sacred-saffron)" }}>
            Devotion Without Friction
          </span>
          <h2 style={{ color: "var(--apple-white)", fontSize: "var(--font-h1)", marginBottom: "16px", letterSpacing: "-0.03em" }}>
            Experience authentic Vedic tradition.
          </h2>
          <p style={{ color: "var(--text-muted-dark)", fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto 32px" }}>
            Connect with our knowledgeable booking coordinators today for Noida, Delhi, Gurugram, or live video pujas worldwide.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <a href="#book-pandit-ji" className="apple-btn-pill apple-btn-primary" style={{ padding: "14px 28px", fontSize: "1rem" }}>
              Book Pandit Ji
            </a>
            <a
              href={contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-btn-pill apple-btn-outline-white"
              style={{ padding: "14px 28px", fontSize: "1rem" }}
            >
              <MessageCircle size={18} />
              WhatsApp Booking Desk
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
