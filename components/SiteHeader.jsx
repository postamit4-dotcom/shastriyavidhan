"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Menu, MessageCircle, X } from "lucide-react";
import { contact, site } from "@/lib/site-data";

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileMenuOpen);

    function handleEscape(event) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="apple-ribbon" role="region" aria-label="Announcement">
        <span>Guided Vedic puja booking for families in India and worldwide.</span>
        <a
          href={contact.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Talk to booking desk</span>
          <ChevronRight size={13} aria-hidden="true" />
        </a>
      </div>

      <header className="apple-nav-shell" role="banner">
        <div className="container apple-nav-inner">
          <Link href="/" className="apple-brand-box" aria-label={`${site.name} - Home`}>
            <img
              src="/images/shastriya-vidhan-logo.png"
              alt={`${site.name} Logo`}
              width="34"
              height="34"
            />
            <span className="apple-brand-title">{site.name}</span>
          </Link>

          <nav className="apple-desktop-menu" aria-label="Main Navigation">
            <Link href="/services" className="apple-menu-item">
              Puja Services
            </Link>
            <Link href="/#how-it-works" className="apple-menu-item">
              How It Works
            </Link>
            <Link href="/#puja-modes" className="apple-menu-item">
              Puja Modes
            </Link>
            <Link href="/#pandits" className="apple-menu-item">
              Pandit Standards
            </Link>
            <Link href="/#locations" className="apple-menu-item">
              Locations
            </Link>
            <Link href="/#guides" className="apple-menu-item">
              Guides
            </Link>
            <Link href="/contact" className="apple-menu-item">
              Support
            </Link>
          </nav>

          <div className="apple-nav-actions">
            <Link href="/#book-pandit-ji" className="apple-btn-pill apple-btn-primary">
              Book Puja
            </Link>

            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-controls="mobile-navigation-drawer"
              aria-expanded={mobileMenuOpen}
              aria-label="Open navigation"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen ? (
        <>
          <div
            className="mobile-drawer-overlay open"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-navigation-drawer"
            className="mobile-drawer open"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="mobile-drawer-header">
              <Link href="/" className="apple-brand-box" onClick={() => setMobileMenuOpen(false)}>
                <img
                  src="/images/shastriya-vidhan-logo.png"
                  alt={`${site.name} Logo`}
                  width="32"
                  height="32"
                />
                <span className="apple-brand-title">{site.name}</span>
              </Link>
              <button
                type="button"
                className="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="mobile-nav-links" aria-label="Mobile navigation links">
              <Link href="/services" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                <span>Puja Services</span>
                <ChevronRight size={16} />
              </Link>
              <Link href="/#how-it-works" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                <span>How It Works</span>
                <ChevronRight size={16} />
              </Link>
              <Link href="/#puja-modes" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                <span>Home, Online &amp; Temple Puja</span>
                <ChevronRight size={16} />
              </Link>
              <Link href="/#pandits" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                <span>Pandit Ji Standards</span>
                <ChevronRight size={16} />
              </Link>
              <Link href="/#locations" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                <span>Locations</span>
                <ChevronRight size={16} />
              </Link>
              <Link href="/#guides" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                <span>Puja Guides &amp; Samagri</span>
                <ChevronRight size={16} />
              </Link>
              <Link href="/contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                <span>Support</span>
                <ChevronRight size={16} />
              </Link>
            </nav>

            <div className="mobile-drawer-actions">
              <Link
                href="/#book-pandit-ji"
                className="apple-btn-pill apple-btn-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Pandit Ji
              </Link>
              <a
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-btn-pill apple-btn-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageCircle size={18} />
                WhatsApp Booking Desk
              </a>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
