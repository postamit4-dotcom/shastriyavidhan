import Link from "next/link";
import { contact, site } from "@/lib/site-data";
import { footerNavigationGroups } from "@/lib/site-registry";

export default function SiteFooter() {
  return (
    <footer className="apple-footer" id="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-trust-note">
          <p>
            Service availability is subject to Pandit Ji schedule, date review, travel feasibility,
            ritual scope, and samagri confirmation.
          </p>
          <p>
            Puja services are devotional practices. Shastriya Vidhan does not promise medical,
            legal, financial, relationship, or guaranteed material outcomes.
          </p>
        </div>

        <div className="apple-footer-directory">
          {footerNavigationGroups.map((group) => (
            <div className="apple-footer-col" key={group.heading}>
              <h4>{group.heading}</h4>
              <ul className="apple-footer-links">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="apple-footer-contact">
          <a href={contact.whatsappLink} target="_blank" rel="noopener noreferrer">
            WhatsApp Booking Desk
          </a>
          <a href={`tel:${contact.phone}`}>Call {contact.displayPhone}</a>
        </div>

        <div className="apple-footer-bottom">
          <div>
            Copyright (c) {new Date().getFullYear()} {site.name}. All rights reserved.
          </div>
          <div className="footer-legal-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/cancellation-refund-policy">Cancellation & Refund</Link>
            <Link href="/religious-legal-disclaimer">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
