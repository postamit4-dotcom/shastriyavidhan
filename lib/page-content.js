import { contact, pujaModes, servicePages } from "./site-data.js";

export const policyPages = [
  {
    slug: "privacy-policy",
    legacySlug: "privacy",
    href: "/privacy-policy",
    title: "Privacy Policy",
    description:
      "How Shastriya Vidhan handles booking request details, contact information, analytics, and customer privacy.",
    items: [
      "Booking requests may include name, phone, city, puja preference, date, language, and optional notes.",
      "Personal details should be used only for booking coordination, support, invoicing, and customer communication.",
      "Analytics events must not include names, phone numbers, addresses, gotra, or religious request details.",
      "Access to customer details should be limited to people who need it for fulfillment and support.",
    ],
  },
  {
    slug: "terms",
    legacySlug: "terms",
    href: "/terms",
    title: "Terms of Service",
    description:
      "Basic terms for using the Shastriya Vidhan website and submitting a puja booking request.",
    items: [
      "Website content is general devotional and booking guidance, not a substitute for professional advice.",
      "Submitting a request does not create a confirmed booking until availability, quote, and terms are shared.",
      "Service details may vary by puja, location, date, Pandit Ji availability, and samagri responsibility.",
      "Users should provide accurate contact and booking information so the request can be reviewed properly.",
    ],
  },
  {
    slug: "cancellation-refund-policy",
    legacySlug: "booking-cancellation",
    href: "/cancellation-refund-policy",
    title: "Cancellation & Refund Policy",
    description:
      "How booking confirmation, payment, rescheduling, refund, and cancellation terms should be handled.",
    items: [
      "Payment should happen only after the final quote, inclusions, exclusions, and timing are clear.",
      "Rescheduling depends on Pandit Ji availability, location feasibility, and the terms shared before payment.",
      "Cancellation and refund terms should be explained before payment for each booking.",
      "Festival and temple-linked requests may have stricter lead-time, travel, and local-process requirements.",
    ],
  },
  {
    slug: "religious-legal-disclaimer",
    legacySlug: "disclaimer",
    href: "/religious-legal-disclaimer",
    title: "Religious & Legal Disclaimer",
    description:
      "Important limitations for devotional content, astrology-related pages, and outcome claims on Shastriya Vidhan.",
    items: [
      "Puja services are devotional and religious practices; no health, legal, financial, relationship, or guaranteed material outcome is promised.",
      "Astrology or dosh-related content should be treated as belief-based guidance and not professional advice.",
      "Festival dates and muhurat details should be reviewed for city, tradition, and current panchang before use.",
      "Temple-linked services depend on actual availability, permissions, travel, and local process at the time of booking.",
    ],
  },
];

export const supportPages = [
  {
    slug: "help",
    href: "/help",
    title: "Help",
    eyebrow: "Support",
    description:
      "Find the main Shastriya Vidhan booking, pricing, policy, payment, and complaint-resolution links in one place.",
    sections: [
      {
        title: "Booking support",
        body: "Start with a booking request or contact the desk for help choosing the right puja.",
        items: [
          { label: "Book Puja", href: "/book-puja" },
          { label: "Contact", href: "/contact" },
          { label: "How It Works", href: "/how-it-works" },
        ],
      },
      {
        title: "Quote and payment clarity",
        body: "Review what should be confirmed before any payment is requested.",
        items: [
          { label: "Pricing & Inclusions", href: "/pricing-and-inclusions" },
          { label: "Payment Safety", href: "/payment-safety" },
          { label: "Cancellation & Refund", href: "/cancellation-refund-policy" },
        ],
      },
      {
        title: "Trust and policies",
        body: "Read how the site handles standards, sourcing, privacy, and devotional limitations.",
        items: [
          { label: "Pandit Standards", href: "/pandit-standards" },
          { label: "Editorial & Sourcing Policy", href: "/editorial-sourcing-policy" },
          { label: "Religious & Legal Disclaimer", href: "/religious-legal-disclaimer" },
        ],
      },
    ],
  },
  {
    slug: "complaints-resolution",
    href: "/complaints-resolution",
    title: "Complaints & Resolution",
    eyebrow: "Support process",
    description:
      "How customers should raise booking, conduct, timing, payment, or service-quality concerns.",
    sections: [
      {
        title: "What to share",
        body: "Send enough detail for the team to find the request and understand the issue.",
        items: [
          "Name used for the request, phone number, puja name, city, and ceremony date.",
          "What happened, when it happened, and which resolution you are requesting.",
          "Screenshots or payment references only when relevant; do not share unnecessary private ritual details.",
        ],
      },
      {
        title: "Review path",
        body: "The booking team should review the record, speak with the assigned Pandit Ji where needed, and explain the next step clearly.",
        items: [
          "Possible outcomes include clarification, rescheduling, replacement, partial adjustment, or escalation.",
          "Refund or cancellation decisions should follow the terms shared before payment.",
        ],
      },
    ],
  },
  {
    slug: "payment-safety",
    href: "/payment-safety",
    title: "Payment Safety",
    eyebrow: "Safe payment",
    description:
      "Payment guidance for Shastriya Vidhan booking requests so customers understand what should be confirmed first.",
    sections: [
      {
        title: "Before payment",
        body: "Do not treat a form submission as a confirmed booking.",
        items: [
          "Confirm puja scope, Pandit Ji availability, date, mode, city, samagri, inclusions, exclusions, and quote.",
          "Ask for cancellation, refund, travel, temple, tax, and payment terms before paying.",
          "Do not share OTPs, passwords, card PINs, or unrelated financial information.",
        ],
      },
      {
        title: "After payment",
        body: "Keep a payment reference and the confirmed booking details for support.",
        items: [
          "The team should provide a clear next step for preparation and arrival or video-call coordination.",
          "Contact the booking desk if the payment details and booking terms do not match.",
        ],
      },
    ],
  },
  {
    slug: "editorial-sourcing-policy",
    href: "/editorial-sourcing-policy",
    title: "Editorial & Sourcing Policy",
    eyebrow: "Content standards",
    description:
      "How Shastriya Vidhan should review devotional, ritual, festival, muhurat, and service content before publication.",
    sections: [
      {
        title: "Review standard",
        body: "Pages should separate devotional tradition from practical booking claims.",
        items: [
          "Do not fabricate scripture citations, reviewer names, credentials, ratings, or customer experiences.",
          "Festival dates and muhurat details need annual review for location, panchang, and tradition.",
          "Astrology and dosh pages should avoid fear-based language and guaranteed outcome claims.",
        ],
      },
      {
        title: "Publication gates",
        body: "Pages that require evidence should remain hidden or noindex until the owner verifies the facts.",
        items: [
          "Location coverage, temple coordination, author or reviewer profiles, testimonials, and prices require evidence.",
          "Structured data must match visible content and must not include unsupported reviews, ratings, prices, or local addresses.",
        ],
      },
    ],
  },
];

export const modePages = [
  {
    slug: "puja-at-home",
    href: "/puja-at-home",
    modeId: "home",
    title: "Puja at Home",
    h1: "Puja at Home with Pandit Ji",
    eyebrow: "Home puja requests",
    description:
      "Request a Pandit Ji for puja at home with manual city, travel, timing, samagri, and quote confirmation before payment.",
    intro:
      "Home puja is suitable when the family wants the ceremony performed in its own puja space. The team reviews city feasibility, travel, ritual scope, and samagri responsibility before confirming.",
    serviceMode: "Home",
  },
  {
    slug: "online-puja",
    href: "/online-puja",
    modeId: "online",
    title: "Online Puja",
    h1: "Online Puja with Live Pandit Ji Guidance",
    eyebrow: "NRI and remote friendly",
    description:
      "Request online puja guidance through live video when the ritual is suitable for remote participation and the family can prepare samagri at home.",
    intro:
      "Online puja helps remote families and NRIs participate from home through live video guidance. The booking desk confirms ritual suitability, time zone, language, and samagri preparation before payment.",
    serviceMode: "Online",
  },
];

export function getPolicyBySlug(slug) {
  return policyPages.find((page) => page.slug === slug);
}

export function getPolicyByLegacySlug(slug) {
  return policyPages.find((page) => page.legacySlug === slug);
}

export function getSupportPageBySlug(slug) {
  return supportPages.find((page) => page.slug === slug);
}

export function getModePageBySlug(slug) {
  const page = modePages.find((item) => item.slug === slug);
  if (!page) return undefined;

  return {
    ...page,
    mode: pujaModes.find((mode) => mode.id === page.modeId),
    services: servicePages.filter((service) => service.modes.includes(page.serviceMode)),
  };
}

export function supportCtaLinks() {
  return [
    { label: "Book Puja", href: "/book-puja" },
    { label: "WhatsApp Booking Desk", href: contact.whatsappLink, external: true },
    { label: "Call Booking Desk", href: `tel:${contact.phone}`, external: true },
  ];
}
