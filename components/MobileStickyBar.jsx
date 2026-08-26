"use client";

import { MessageCircle, PhoneCall, Calendar } from "lucide-react";
import { contact } from "@/lib/site-data";

export default function MobileStickyBar() {
  return (
    <aside className="apple-mobile-bar" aria-label="Mobile quick actions">
      <a
        href="#book-pandit-ji"
        className="apple-mobile-bar-btn apple-btn-primary"
        id="apple-mobile-book-btn"
      >
        <Calendar size={15} aria-hidden="true" />
        <span>Book Puja</span>
      </a>

      <a
        href={contact.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="apple-mobile-bar-btn apple-btn-secondary"
        id="apple-mobile-whatsapp-btn"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={15} aria-hidden="true" />
        <span>WhatsApp</span>
      </a>

      <a
        href={`tel:${contact.phone}`}
        className="apple-mobile-bar-btn apple-btn-dark"
        id="apple-mobile-call-btn"
        aria-label={`Call Pandit Ji booking line ${contact.displayPhone}`}
      >
        <PhoneCall size={15} aria-hidden="true" />
        <span>Call</span>
      </a>
    </aside>
  );
}
