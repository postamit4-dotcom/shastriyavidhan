"use client";

import { trackEvent, slugifyAnalyticsValue } from "@/lib/analytics";

export default function BookingOptionButton({
  city = "",
  formatName = "",
  label = "Select option",
  mode = "",
  note = "",
  packageName = "",
  pageType = "service",
  service = "",
  ctaLocation = "service_option",
}) {
  const handleSelect = () => {
    trackEvent("booking_start", {
      service_slug: slugifyAnalyticsValue(service),
      city_slug: slugifyAnalyticsValue(city),
      booking_mode: slugifyAnalyticsValue(mode),
      cta_location: ctaLocation,
      page_type: pageType,
    });

    window.dispatchEvent(
      new CustomEvent("booking-prefill", {
        detail: {
          city,
          formatName,
          mode,
          note,
          packageName,
          service,
          notice: `${packageName || formatName} selected. Review the booking form details below.`,
        },
      }),
    );

    const bookingSection = document.getElementById("booking-section");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    bookingSection?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <button type="button" className="apple-btn-pill apple-btn-secondary service-option-select" onClick={handleSelect}>
      {label}
    </button>
  );
}
