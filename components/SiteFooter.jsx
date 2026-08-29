import Link from "next/link";
import { contact, locationPages, servicePages, site } from "@/lib/site-data";

export default function SiteFooter() {
  return (
    <footer className="apple-footer" role="contentinfo">
      <div className="container">
        {/* Footnote Disclaimers */}
        <div style={{ marginBottom: "20px", color: "var(--text-tertiary)", fontSize: "0.75rem", lineHeight: 1.6 }}>
          <p>
            1. Service availability is subject to Pandit Ji muhurat schedule, date verification, travel feasibility across Noida, Delhi, Gurugram, and Ujjain.
          </p>
          <p>
            2. Religious and spiritual significance are presented in accordance with traditional Hindu shastras and devotional beliefs. Shastriya Vidhan strictly does not make superstitious, fear-based, medical, or financial outcome claims.
          </p>
        </div>

        {/* 4-Column Directory Grid */}
        <div className="apple-footer-directory">
          <div className="apple-footer-col">
            <h4>Explore Pujas</h4>
            <ul className="apple-footer-links">
              {servicePages.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
              <li>
                <Link href="/services" style={{ color: "var(--apple-blue)" }}>
                  All Vedic Services →
                </Link>
              </li>
            </ul>
          </div>

          <div className="apple-footer-col">
            <h4>Service Formats</h4>
            <ul className="apple-footer-links">
              <li><Link href="/#puja-modes">Puja at Home (Delhi NCR)</Link></li>
              <li><Link href="/#puja-modes">Online Video Puja (Global)</Link></li>
              <li><Link href="/#puja-modes">Temple Coordination (Ujjain)</Link></li>
              <li><Link href="/#how-it-works">How Booking Works</Link></li>
              <li><Link href="/#pandits">Pandit Ji Standards</Link></li>
            </ul>
          </div>

          <div className="apple-footer-col">
            <h4>Service Areas</h4>
            <ul className="apple-footer-links">
              <li>
                <Link href="/locations" style={{ color: "var(--apple-blue)" }}>
                  All Service Locations
                </Link>
              </li>
              {locationPages.map((loc) => (
                <li key={loc.city}>
                  <Link href={loc.href}>{loc.city} ({loc.badge})</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="apple-footer-col">
            <h4>About &amp; Support</h4>
            <ul className="apple-footer-links">
              <li><Link href="/#guides">Puja Guides &amp; Samagri</Link></li>
              <li><Link href="/#faqs">Frequently Asked Questions</Link></li>
              <li><Link href="/contact">Contact Booking Desk</Link></li>
              <li>
                <a href={contact.whatsappLink} target="_blank" rel="noopener noreferrer">
                  WhatsApp Helpline
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phone}`}>Call {contact.displayPhone}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Line */}
        <div className="apple-footer-bottom">
          <div>
            Copyright © {new Date().getFullYear()} {site.name}. All rights reserved. Authentic Vedic Puja Booking.
          </div>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/contact">Privacy Policy</Link>
            <Link href="/contact">Terms of Use</Link>
            <Link href="/contact">Booking &amp; Cancellation Policy</Link>
            <Link href="/contact">Legal Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
