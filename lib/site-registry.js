import {
  grahaDoshShantiHub,
  isActiveIndexableService,
  isGrahaDoshShantiHubIndexable,
  locationPages,
  pathForCategory,
  serviceCategories,
  servicePages,
  servicesForCategorySlug,
  site,
} from "./site-data.js";
import { modePages, policyPages, supportPages } from "./page-content.js";

const currentDate = site.exportedAt;

function node(config) {
  return {
    shortLabel: config.label,
    parentId: undefined,
    categories: [],
    publicationState: "live",
    evidenceState: "not_applicable",
    indexable: true,
    showInHeader: false,
    showInFooter: false,
    showInHtmlSitemap: true,
    priority: "P1",
    redirectFrom: [],
    lastModified: currentDate,
    ...config,
  };
}

export function isCategoryIndexable(category, services = servicesForCategorySlug(category.slug)) {
  if (category.slug === grahaDoshShantiHub.categorySlug) {
    return isGrahaDoshShantiHubIndexable();
  }

  return Boolean(category.megaMenuEligible && services.length >= 3);
}

const staticNodes = [
  node({
    id: "home",
    label: "Home",
    href: "/",
    pageType: "home",
    evidenceState: "verified",
    showInHeader: true,
    priority: "P0",
  }),
  node({
    id: "puja-services",
    label: "Puja Services",
    shortLabel: "Services",
    href: "/puja-services",
    pageType: "commercial_hub",
    evidenceState: "verified",
    showInHeader: true,
    showInFooter: true,
    priority: "P0",
    redirectFrom: ["/services", "/category/services"],
  }),
  node({
    id: "how-it-works",
    label: "How It Works",
    href: "/how-it-works",
    pageType: "help",
    evidenceState: "verified",
    showInHeader: true,
    showInFooter: true,
    priority: "P0",
  }),
  node({
    id: "locations",
    label: "Locations",
    href: "/locations",
    pageType: "locations_hub",
    evidenceState: "partially_verified",
    showInHeader: true,
    showInFooter: true,
    priority: "P1",
  }),
  node({
    id: "guides",
    label: "Puja Guides",
    shortLabel: "Guides",
    href: "/guides",
    pageType: "guides_hub",
    evidenceState: "partially_verified",
    showInHeader: true,
    showInFooter: true,
    priority: "P1",
  }),
  node({
    id: "about",
    label: "About",
    href: "/about",
    pageType: "about",
    evidenceState: "partially_verified",
    showInHeader: true,
    showInFooter: true,
    priority: "P1",
  }),
  node({
    id: "pandit-standards",
    label: "Pandit Standards",
    href: "/pandit-standards",
    pageType: "trust",
    evidenceState: "partially_verified",
    showInFooter: true,
    priority: "P0",
  }),
  node({
    id: "pricing-and-inclusions",
    label: "Pricing & Inclusions",
    href: "/pricing-and-inclusions",
    pageType: "help",
    evidenceState: "partially_verified",
    showInFooter: true,
    priority: "P0",
    redirectFrom: ["/pricing-inclusions"],
  }),
  node({
    id: "book-puja",
    label: "Book Puja",
    href: "/book-puja",
    pageType: "booking",
    evidenceState: "verified",
    showInHeader: true,
    showInFooter: true,
    priority: "P0",
  }),
  node({
    id: "contact",
    label: "Contact",
    href: "/contact",
    pageType: "contact",
    evidenceState: "partially_verified",
    showInFooter: true,
    priority: "P0",
  }),
  node({
    id: "faqs",
    label: "Frequently Asked Questions",
    shortLabel: "FAQs",
    href: "/faqs",
    pageType: "help",
    evidenceState: "partially_verified",
    showInFooter: true,
    priority: "P2",
  }),
  node({
    id: "site-map",
    label: "Site Map",
    href: "/site-map",
    pageType: "html_sitemap",
    evidenceState: "not_applicable",
    showInFooter: true,
    priority: "P2",
  }),
  node({
    id: "migration-notes",
    label: "Migration Notes",
    href: "/migration-notes",
    pageType: "internal_status",
    publicationState: "temporary",
    evidenceState: "not_applicable",
    indexable: false,
    showInHtmlSitemap: false,
    priority: "P2",
  }),
  node({
    id: "blog-archive-review",
    label: "Blog Archive Under Review",
    href: "/category/blog",
    pageType: "content_review",
    publicationState: "temporary",
    evidenceState: "unverified",
    indexable: false,
    showInHtmlSitemap: false,
    priority: "P2",
  }),
];

const modeNodes = modePages.map((page) =>
  node({
    id: page.slug,
    label: page.title,
    href: page.href,
    pageType: "mode_hub",
    parentId: "puja-services",
    evidenceState: "partially_verified",
    showInFooter: true,
    priority: page.slug === "online-puja" ? "P0" : "P1",
    redirectFrom: page.slug === "online-puja" ? ["/locations/online-puja"] : [],
  }),
);

const supportNodes = supportPages.map((page) =>
  node({
    id: page.slug,
    label: page.title,
    href: page.href,
    pageType: "help",
    parentId: "help",
    evidenceState: "partially_verified",
    showInFooter: true,
    priority: page.slug === "help" ? "P0" : "P1",
  }),
);

const policyNodes = policyPages.map((page) =>
  node({
    id: page.slug,
    label: page.title,
    href: page.href,
    pageType: "policy",
    parentId: "help",
    evidenceState: "partially_verified",
    showInFooter: true,
    priority: "P0",
    redirectFrom: [`/policies/${page.legacySlug}`],
  }),
);

const categoryNodes = serviceCategories.map((category) => {
  const services = servicesForCategorySlug(category.slug);
  const indexable = isCategoryIndexable(category, services);

  return node({
    id: `category-${category.slug}`,
    label: category.name,
    href: pathForCategory(category),
    pageType: "service_category",
    parentId: "puja-services",
    categories: [category.slug],
    publicationState: indexable ? "live" : "conditional",
    evidenceState: "partially_verified",
    indexable,
    showInFooter: indexable,
    showInHtmlSitemap: indexable,
    priority: indexable ? "P1" : "P2",
    redirectFrom: category.slug === grahaDoshShantiHub.categorySlug ? [grahaDoshShantiHub.legacyHref] : [],
    lastModified: currentDate,
    notes: indexable
      ? `${services.length} linked services currently meet the category publication gate.`
      : `${services.length} linked service(s); keep noindex until the category-quality gate passes.`,
  });
});

const locationNodes = locationPages
  .filter((location) => location.slug !== "online-puja")
  .map((location) =>
    node({
      id: `location-${location.slug}`,
      label: location.city,
      href: location.href,
      pageType: "location",
      parentId: "locations",
      publicationState: "conditional",
      evidenceState: "partially_verified",
      indexable: false,
      showInFooter: false,
      showInHtmlSitemap: false,
      priority: "P2",
      notes:
        "Location page exists for direct review but is hidden from sitemap/header/footer until service coverage is owner-verified.",
    }),
  );

const serviceNodes = servicePages.map((service) =>
  node({
    id: `service-${service.slug}`,
    label: service.title,
    shortLabel: service.navTitle || service.title,
    href: `/${service.slug}`,
    pageType: "service",
    parentId: "puja-services",
    categories: [service.category],
    evidenceState: "partially_verified",
    publicationState: isActiveIndexableService(service) ? "live" : "conditional",
    indexable: isActiveIndexableService(service),
    showInHtmlSitemap: isActiveIndexableService(service),
    priority: "P1",
    redirectFrom: service.redirectFrom || [],
    lastModified: service.updated || currentDate,
    image: service.image?.local,
    notes: "Preserved migrated WordPress service slug.",
  }),
);

export const siteNodes = [
  ...staticNodes,
  ...modeNodes,
  ...supportNodes,
  ...policyNodes,
  ...categoryNodes,
  ...locationNodes,
  ...serviceNodes,
];

export const nodeById = new Map(siteNodes.map((item) => [item.id, item]));
export const nodeByHref = new Map(siteNodes.map((item) => [item.href, item]));

export function getNodeById(id) {
  return nodeById.get(id);
}

export function getNodeByHref(href) {
  const normalized = href === "/" ? "/" : href.replace(/\/+$/, "");
  return nodeByHref.get(normalized);
}

export function robotsForIndexable(indexable) {
  return {
    index: Boolean(indexable),
    follow: true,
    googleBot: {
      index: Boolean(indexable),
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export function sitemapNodes() {
  return siteNodes.filter((item) => item.publicationState === "live" && item.indexable);
}

export const serviceMegaMenuGroups = [
  {
    heading: "Explore",
    items: [
      { label: "All Puja Services", href: "/puja-services" },
      { label: "Puja at Home", href: "/puja-at-home" },
      { label: "Online Puja", href: "/online-puja" },
      { label: "Samagri Guidance", href: "/guides#samagri-guidance" },
    ],
  },
  {
    heading: "Occasion",
    items: [
      { label: "Festival Pujas", href: "/puja-services/festival-pujas" },
    ],
  },
  {
    heading: "Deity",
    items: [
      { label: "Shiva Pujas", href: "/puja-services/shiva-pujas" },
      { label: "Vishnu & Krishna Pujas", href: "/puja-services/vishnu-krishna" },
      { label: "Devi Pujas", href: "/puja-services/devi-pujas" },
    ],
  },
  {
    heading: "Specialist",
    items: [
      { label: "Ask for Specialist Puja", href: "/book-puja" },
      { label: "Pandit Standards", href: "/pandit-standards" },
      { label: "Pricing & Inclusions", href: "/pricing-and-inclusions" },
    ],
  },
];

export const headerNavigation = [
  { label: "Home", href: "/" },
  { label: "Puja Services", href: "/puja-services", menuType: "mega" },
  { label: "How It Works", href: "/how-it-works" },
  {
    label: "Locations",
    href: "/locations",
    items: [
      { label: "All Locations", href: "/locations" },
      { label: "Online Puja Worldwide", href: "/online-puja" },
    ],
  },
  {
    label: "Puja Guides",
    href: "/guides",
    items: [
      { label: "All Puja Guides", href: "/guides" },
      { label: "Puja Vidhi", href: "/guides#puja-preparation" },
      { label: "Samagri Checklists", href: "/guides#samagri-guidance" },
      { label: "Festival Dates & Muhurat", href: "/guides#festival-guides" },
      { label: "Beginner & NRI Guides", href: "/guides#booking-guidance" },
    ],
  },
  {
    label: "About",
    href: "/about",
    items: [
      { label: "About Shastriya Vidhan", href: "/about" },
      { label: "Pandit Standards", href: "/pandit-standards" },
      { label: "Editorial & Sourcing Policy", href: "/editorial-sourcing-policy" },
    ],
  },
  {
    label: "Help",
    href: "/help",
    items: [
      { label: "Help", href: "/help" },
      { label: "Contact", href: "/contact" },
      { label: "Pricing & Inclusions", href: "/pricing-and-inclusions" },
      { label: "Booking Process", href: "/how-it-works" },
      { label: "Cancellation & Refund", href: "/cancellation-refund-policy" },
      { label: "Complaints & Resolution", href: "/complaints-resolution" },
      { label: "Payment Safety", href: "/payment-safety" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Religious & Legal Disclaimer", href: "/religious-legal-disclaimer" },
    ],
  },
  { label: "Book Puja", href: "/book-puja", isPrimary: true },
];

export const mobileNavigationSections = [
  {
    id: "puja-services",
    label: "Puja Services",
    groups: serviceMegaMenuGroups,
  },
  {
    id: "locations",
    label: "Locations",
    groups: [
      {
        heading: "Coverage",
        items: [
          { label: "All Locations", href: "/locations" },
          { label: "Online Puja Worldwide", href: "/online-puja" },
        ],
      },
    ],
  },
  {
    id: "guides",
    label: "Puja Guides",
    groups: [
      {
        heading: "Guides",
        items: headerNavigation.find((item) => item.label === "Puja Guides").items,
      },
    ],
  },
  {
    id: "about",
    label: "About",
    groups: [
      {
        heading: "Trust",
        items: headerNavigation.find((item) => item.label === "About").items,
      },
    ],
  },
  {
    id: "help",
    label: "Help",
    groups: [
      {
        heading: "Support",
        items: headerNavigation.find((item) => item.label === "Help").items,
      },
    ],
  },
];

export const footerNavigationGroups = [
  {
    heading: "Puja Services",
    items: [
      { label: "All Puja Services", href: "/puja-services" },
      { label: "Puja at Home", href: "/puja-at-home" },
      { label: "Online Puja", href: "/online-puja" },
      { label: "Festival Pujas", href: "/puja-services/festival-pujas" },
      { label: "Shiva Pujas", href: "/puja-services/shiva-pujas" },
      { label: "Devi Pujas", href: "/puja-services/devi-pujas" },
    ],
  },
  {
    heading: "Help",
    items: [
      { label: "How Booking Works", href: "/how-it-works" },
      { label: "Pricing & Inclusions", href: "/pricing-and-inclusions" },
      { label: "Book Puja", href: "/book-puja" },
      { label: "Contact Booking Desk", href: "/contact" },
      { label: "Payment Safety", href: "/payment-safety" },
      { label: "Complaints & Resolution", href: "/complaints-resolution" },
    ],
  },
  {
    heading: "Trust",
    items: [
      { label: "Locations", href: "/locations" },
      { label: "Puja Guides & Samagri", href: "/guides" },
      { label: "Pandit Ji Standards", href: "/pandit-standards" },
      { label: "About Shastriya Vidhan", href: "/about" },
      { label: "Editorial & Sourcing Policy", href: "/editorial-sourcing-policy" },
      { label: "FAQs", href: "/faqs" },
      { label: "Site Map", href: "/site-map" },
    ],
  },
  {
    heading: "Policies",
    items: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cancellation & Refund", href: "/cancellation-refund-policy" },
      { label: "Religious & Legal Disclaimer", href: "/religious-legal-disclaimer" },
    ],
  },
];

export const routeRedirects = siteNodes.flatMap((item) =>
  item.redirectFrom.map((source) => ({
    source,
    destination: item.href === "/" ? `${site.productionUrl}/` : `${site.productionUrl}${item.href}`,
    permanent: true,
  })),
);

export function routeInventory() {
  return siteNodes.map((item) => ({
    currentUrl: item.redirectFrom.length > 0 ? item.redirectFrom : item.href,
    pageTitleOrH1: item.label,
    pageType: item.pageType,
    statusCode: "repository_inventory",
    canonicalUrl: item.href,
    indexState: item.indexable && item.publicationState === "live" ? "index" : "noindex",
    existingParent: item.parentId || null,
    inboundNavigationLocation: [
      item.showInHeader ? "header" : "",
      item.showInFooter ? "footer" : "",
      item.showInHtmlSitemap ? "html_sitemap" : "",
    ].filter(Boolean),
    intendedFinalUrl: item.href,
    action: item.publicationState === "conditional" ? "hide" : item.redirectFrom.length > 0 ? "redirect" : "keep",
    evidenceStatus: item.evidenceState,
    notes: item.notes || "",
  }));
}

export function priorityNumber(priority) {
  if (priority === "P0") return 0.9;
  if (priority === "P1") return 0.75;
  return 0.5;
}
