"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  Check,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Scroll,
  ShieldCheck,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import PanditJiPicture, { panditJiImage } from "@/components/PanditJiPicture";
import PujaFinder from "@/components/PujaFinder";
import { trackEvent } from "@/lib/analytics";
import {
  acharyaSursainProfile,
  bookingSteps,
  contact,
  homeFaqs,
  locationPages,
  panditStandards,
  pujaGuides,
  pujaModes,
} from "@/lib/site-data";

export default function HomePageClient() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      {/* 1. APPLE FULL-BLEED HERO SECTION */}
      <section className="apple-hero-fullbleed" aria-label="Hero Introduction">
        <div className="container apple-hero-grid">
          <div className="apple-hero-copy">
            <div className="social-proof-badge" data-motion="fade-up" style={{ "--motion-order": 0 }}>
              <ShieldCheck size={16} aria-hidden="true" />
              <span>Manual availability and quote review before payment</span>
            </div>

            <span className="apple-eyebrow" data-motion="fade-up" style={{ "--motion-order": 1 }}>
              Request-first puja booking
            </span>
            <h1 className="apple-hero-title" data-motion="fade-up" style={{ "--motion-order": 2 }}>
              Book <span className="text-gradient">Pandit Ji</span> for puja at home, temple or online.
            </h1>
            <p className="apple-hero-subtitle" data-motion="fade-up" style={{ "--motion-order": 3 }}>
              Plan authentic Vedic pujas with clear vidhi, samagri guidance, quote confirmation, and family-friendly coordination before payment.
            </p>

            <div className="apple-hero-ctas" data-motion="fade-up" style={{ "--motion-order": 4 }}>
              <a
                href="#book-pandit-ji"
                className="apple-btn-pill apple-btn-primary"
                id="hero-book-cta"
                onClick={() => trackEvent("booking_start", { cta_location: "home_hero", page_type: "home" })}
              >
                Book Pandit Ji
                <ChevronRight size={17} aria-hidden="true" />
              </a>
              <a
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-btn-pill apple-btn-secondary"
                onClick={() => trackEvent("whatsapp_click", { cta_location: "home_hero", page_type: "home" })}
              >
                <MessageCircle size={17} aria-hidden="true" />
                WhatsApp Booking Desk
              </a>
            </div>

            <div className="trust-badge-grid" aria-label="Booking highlights">
              <div className="badge-item" data-motion="fade-up">
                <Check size={16} aria-hidden="true" />
                <span>Manual availability check</span>
              </div>
              <div className="badge-item" data-motion="fade-up">
                <Check size={16} aria-hidden="true" />
                <span>Home, temple and online puja</span>
              </div>
              <div className="badge-item" data-motion="fade-up">
                <Check size={16} aria-hidden="true" />
                <span>Samagri checklist before booking</span>
              </div>
              <div className="badge-item" data-motion="fade-up">
                <Check size={16} aria-hidden="true" />
                <span>No payment before quote clarity</span>
              </div>
              <div className="badge-item" data-motion="fade-up">
                <Check size={16} aria-hidden="true" />
                <span>Hindi, Sanskrit and English support</span>
              </div>
              <div className="badge-item" data-motion="fade-up">
                <Check size={16} aria-hidden="true" />
                <span>NRI video-call friendly</span>
              </div>
            </div>
          </div>

          <div className="apple-hero-stage" data-motion="image" style={{ "--motion-order": 5 }}>
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
                  Join a private video guidance session when the ritual is suitable for remote participation.
                </p>
                <div className="apple-bento-actions">
                  <a href="#book-pandit-ji" className="apple-btn-pill apple-btn-primary">
                    Request Online Puja
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
                    <span>Request Pandit Ji</span>
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
          <h2 id="showcase-heading">Clear process. No fear claims.</h2>
          <p>
            A calmer booking experience for modern families: clear scope, samagri responsibility, quote review, and no guaranteed outcome claims.
          </p>

          <div className="apple-dark-grid-3">
            <div className="apple-dark-feature-card">
              <div className="apple-dark-feature-icon">
                <Award size={22} />
              </div>
              <h3>Pandit Standards Before Assignment</h3>
              <p>
                The booking desk reviews identity, conduct expectations, ritual fit, language preference, and location feasibility.
              </p>
            </div>

            <div className="apple-dark-feature-card">
              <div className="apple-dark-feature-icon">
                <Scroll size={22} />
              </div>
              <h3>Clear Samagri Responsibility</h3>
              <p>
                Families know what to prepare and what may be arranged only after city, puja scope, and quote are confirmed.
              </p>
            </div>

            <div className="apple-dark-feature-card">
              <div className="apple-dark-feature-icon">
                <ShieldCheck size={22} />
              </div>
              <h3>Quotes Before Payment</h3>
              <p>
                Payment is requested only after availability, inclusions, exclusions, travel, and samagri details are reviewed.
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
                <span className="apple-step-num">{step.step}</span>
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
              Request home visits in Delhi NCR, temple-linked coordination in Ujjain, or video guidance where the puja is suitable.
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

      {/* 7. PANDIT JI STANDARDS */}
      <section className="section-apple" id="pandits" aria-labelledby="pandits-apple-heading">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Pandit Standards</span>
            <h2 id="pandits-apple-heading">A clearer standard before a booking is accepted.</h2>
            <p>
              The public site describes the assignment process and links to named public profiles only where owner-approved details are available.
            </p>
          </div>

          <article className="pandit-feature-card" aria-labelledby="home-pandit-profile-heading">
            <div className="pandit-feature-media">
              <PanditJiPicture
                alt="Acharya Sursain Brijwasi of Shastriya Vidhan"
                className="pandit-feature-picture"
                imgClassName="pandit-feature-image"
                sizes="(max-width: 760px) min(86vw, 420px), 320px"
              />
            </div>
            <div className="pandit-feature-copy">
              <span className="apple-product-tag">Named public profile</span>
              <h3 id="home-pandit-profile-heading">Acharya Sursain Brijwasi</h3>
              <p>
                View Pandit Ji&apos;s Ghaziabad enquiry profile before sharing your puja date,
                location, samagri needs, and preferred ceremony details.
              </p>
              <Link href={acharyaSursainProfile.path} className="apple-btn-pill apple-btn-secondary">
                Ghaziabad Pandit Ji Profile
                <ChevronRight size={15} aria-hidden="true" />
              </Link>
              <span className="pandit-feature-caption">{panditJiImage.caption}</span>
            </div>
          </article>

          <div className="apple-profiles-grid">
            {panditStandards.map((standard) => (
              <article key={standard.title} className="apple-profile-card">
                <div className="apple-profile-photo-wrap">
                  <img
                    src={standard.image}
                    alt=""
                    className="apple-profile-photo"
                    loading="lazy"
                  />
                </div>
                <div className="apple-profile-body">
                  <h3 className="apple-profile-name">{standard.title}</h3>
                  <p className="apple-profile-bio">{standard.body}</p>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "1px solid var(--apple-line-light)" }}>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-tertiary)" }}>
                      Review standard
                    </span>
                    <Link href="/pandit-standards" className="apple-btn-pill apple-btn-primary" style={{ padding: "6px 14px", fontSize: "0.82rem" }}>
                      Read
                    </Link>
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
            <h2>Service areas reviewed before confirmation.</h2>
            <p>
              Each city request is checked for Pandit Ji availability, travel terms, language, and samagri before payment.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            {locationPages.map((loc) => (
              <div key={loc.city} className="apple-product-card" style={{ padding: "24px", textAlign: "left" }}>
                <span className="apple-product-tag">{loc.badge}</span>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "4px 0" }}>{loc.city}</h3>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "16px" }}>{loc.coverage}</p>
                <Link href={loc.href} className="apple-link apple-link-sm" style={{ fontWeight: 500 }}>
                  <span>View {loc.city} options</span>
                  <ChevronRight size={13} className="apple-link-chevron" />
                </Link>
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
              Guides are organized by preparation need with practical notes on samagri, timing, and booking clarity.
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
                <Link href="/guides" className="apple-link apple-link-sm">
                  <span>View guides</span>
                  <ChevronRight size={13} className="apple-link-chevron" />
                </Link>
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
                <div key={faq.question} className={`apple-accordion-row ${isOpen ? "open" : ""}`}>
                  <button
                    type="button"
                    className="apple-accordion-toggle"
                    id={`home-faq-toggle-${idx}`}
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`home-faq-panel-${idx}`}
                  >
                    <span>{faq.question}</span>
                    <span className="apple-accordion-chevron">
                      <ChevronDown size={18} aria-hidden="true" />
                    </span>
                  </button>
                  <div
                    className={`apple-accordion-content ${isOpen ? "open" : ""}`}
                    id={`home-faq-panel-${idx}`}
                    role="region"
                    aria-labelledby={`home-faq-toggle-${idx}`}
                    aria-hidden={!isOpen}
                  >
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
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
              Submit your puja details below. The booking desk will verify Pandit Ji availability and connect with you.
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
          <h2 style={{ color: "var(--apple-white)", fontSize: "var(--font-h1)", marginBottom: "16px", letterSpacing: 0 }}>
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
