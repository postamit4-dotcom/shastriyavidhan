"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { ClipboardList, MessageCircle, PhoneCall } from "lucide-react";
import { contact, servicePages } from "@/lib/site-data";

const panditProfilePath = "/pandit-ji/acharya-sursain-brijwasi-ghaziabad";

export default function MobileStickyBar() {
  const pathname = usePathname();
  const [isSuppressed, setIsSuppressed] = useState(false);

  const isServicePage = useMemo(
    () => servicePages.some((service) => pathname === `/${service.slug}`),
    [pathname],
  );
  const isPanditProfilePage = pathname === panditProfilePath;
  const shouldShowBar = isServicePage || isPanditProfilePage;

  useEffect(() => {
    if (!shouldShowBar) return undefined;

    const targets = ["booking-section", "booking-form-wrapper", "site-footer"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (targets.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsSuppressed(entries.some((entry) => entry.isIntersecting));
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [shouldShowBar, pathname]);

  if (!shouldShowBar || isSuppressed) {
    return null;
  }

  const primaryAction = isPanditProfilePage
    ? {
        href: `tel:${contact.phone}`,
        label: "Call Pandit Ji",
        ariaLabel: `Call Pandit Ji at ${contact.displayPhone}`,
        Icon: PhoneCall,
      }
    : {
        href: `${pathname}#booking-section`,
        label: "Request Quote",
        ariaLabel: "Request a puja quote",
        Icon: ClipboardList,
      };
  const PrimaryIcon = primaryAction.Icon;

  return (
    <aside className="apple-mobile-bar" aria-label="Mobile quick actions">
      <a
        href={primaryAction.href}
        className="apple-mobile-bar-btn apple-btn-primary"
        id="apple-mobile-book-btn"
        aria-label={primaryAction.ariaLabel}
      >
        <PrimaryIcon size={15} aria-hidden="true" />
        <span>{primaryAction.label}</span>
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
        <span>WhatsApp Us</span>
      </a>
    </aside>
  );
}
