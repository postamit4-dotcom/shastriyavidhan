"use client";

import { MessageCircle, PhoneCall } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { contact } from "@/lib/site-data";

export function trackPanditRegistrationEvent(eventName, parameters = {}) {
  trackEvent(eventName, {
    page_location: "/pandit-registration",
    ...parameters,
  });
}

export function focusPanditRegistrationForm() {
  if (typeof window === "undefined") return;

  const target =
    document.getElementById("pandit-registration-form-heading") ||
    document.getElementById("pandit-registration-form");

  if (!(target instanceof HTMLElement)) return;

  trackPanditRegistrationEvent("pandit_registration_start");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const headerHeight = document.querySelector(".apple-nav-shell")?.getBoundingClientRect().height || 0;
  const targetTop = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerHeight - 24);

  window.scrollTo({
    top: targetTop,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });

  window.setTimeout(() => {
    target.focus({ preventScroll: true });
  }, prefersReducedMotion ? 0 : 240);
}

export default function PanditRegistrationActions({ showPhone = false, className = "service-hero-actions" }) {
  const whatsappHref = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    "Namaste Shastriya Vidhan, I want to ask about Pandit registration.",
  )}`;

  return (
    <div className={className}>
      <button type="button" className="apple-btn-pill apple-btn-primary" onClick={focusPanditRegistrationForm}>
        Start Registration
      </button>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="apple-btn-pill apple-btn-secondary"
        onClick={() => trackPanditRegistrationEvent("pandit_registration_whatsapp_click")}
      >
        <MessageCircle size={18} aria-hidden="true" />
        Ask on WhatsApp
      </a>
      {showPhone ? (
        <a
          href={`tel:${contact.phone}`}
          className="apple-btn-pill apple-btn-secondary"
          onClick={() => trackPanditRegistrationEvent("pandit_registration_phone_click")}
        >
          <PhoneCall size={18} aria-hidden="true" />
          Call {contact.displayPhone}
        </a>
      ) : null}
    </div>
  );
}
