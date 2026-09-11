import {
  contact,
  grahaDoshShantiHub,
  getCategoryBySlug,
  getGrahaDoshShantiServices,
  locationPages,
  pathForCategory,
  serviceCategoryAssignments,
  servicePages,
  site,
} from "./site-data.js";
import { getNodeById } from "./site-registry.js";

const defaultImage = "/images/diwali-puja.webp";
const defaultImageAlt = `${site.name} Vedic puja booking service`;
const languages = ["Hindi", "Sanskrit", "English"];
export const SITE_URL = site.productionUrl.replace(/\/+$/, "");
const productionHostnames = new Set(["shastriyavidhan.com", "www.shastriyavidhan.com"]);

export function canonicalPath(path = "/") {
  const [pathOnly] = String(path).split(/[?#]/);
  const normalizedPath = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`;
  const cleanPath = normalizedPath.replace(/^\/+|\/+$/g, "");
  return cleanPath ? `/${cleanPath}` : "/";
}

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    const url = new URL(path);
    if (!productionHostnames.has(url.hostname)) return path;

    const normalizedPath = canonicalPath(url.pathname);
    return normalizedPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${normalizedPath}`;
  }

  const normalizedPath = canonicalPath(path);
  return normalizedPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${normalizedPath}`;
}

export const canonicalUrl = absoluteUrl;

export function basePageMetadata({
  title,
  description,
  path = "/",
  image = defaultImage,
  imageAlt = defaultImageAlt,
  type = "website",
  robots,
}) {
  const canonical = canonicalPath(path);
  const url = absoluteUrl(canonical);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: robots ?? {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      locale: "en_IN",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function breadcrumbJsonLd(items, idPath = items.at(-1)?.path || "/") {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(idPath)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function imageObject(src, alt, idPath = src) {
  return {
    "@type": "ImageObject",
    "@id": `${absoluteUrl(idPath)}#primaryimage`,
    url: absoluteUrl(src),
    caption: alt,
  };
}

function serviceBreadcrumbItems(service) {
  if (service.breadcrumbItems?.length) return service.breadcrumbItems;

  const assignment = serviceCategoryAssignments[service.slug];
  const category = assignment?.primary ? getCategoryBySlug(assignment.primary) : undefined;
  const items = [
    { name: "Home", path: "/" },
    { name: "Puja Services", path: "/puja-services" },
  ];

  if (category) {
    items.push({ name: category.name, path: pathForCategory(category) });
  }

  items.push({ name: service.title, path: `/${service.slug}` });
  return items;
}

function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: site.name,
    legalName: site.legalName,
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      "@id": `${absoluteUrl("/")}#logo`,
      url: absoluteUrl("/images/shastriya-vidhan-logo.png"),
      caption: `${site.name} logo`,
    },
    image: absoluteUrl(defaultImage),
    telephone: contact.phone,
    description: site.description,
    areaServed: locationPages.map((location) => ({
      "@type": "Place",
      name: location.city,
    })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: contact.phone,
        contactType: "customer support",
        areaServed: "IN",
        availableLanguage: languages,
      },
    ],
  };
}

function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    url: absoluteUrl("/"),
    name: site.name,
    description: site.description,
    inLanguage: "en-IN",
    publisher: {
      "@id": `${absoluteUrl("/")}#organization`,
    },
  };
}

export function siteGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd(), websiteJsonLd()],
  };
}

export function homePageJsonLd() {
  const url = absoluteUrl("/");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${site.name} | Puja Made Peaceful`,
        description: site.description,
        inLanguage: "en-IN",
        isPartOf: {
          "@id": `${absoluteUrl("/")}#website`,
        },
        about: {
          "@id": `${absoluteUrl("/")}#organization`,
        },
        primaryImageOfPage: imageObject(defaultImage, defaultImageAlt, "/"),
      },
      {
        "@type": "ItemList",
        "@id": `${url}#featured-services`,
        name: "Featured Vedic puja services",
        itemListElement: servicePages.slice(0, 8).map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.title,
          url: absoluteUrl(`/${service.slug}`),
        })),
      },
    ],
  };
}

export function servicesDirectoryJsonLd() {
  const url = absoluteUrl("/puja-services");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: "All Vedic Puja Services",
        description:
          "Explore authentic Shastriya Vidhan puja services by category, format, location, and preparation requirements.",
        inLanguage: "en-IN",
        isPartOf: {
          "@id": `${absoluteUrl("/")}#website`,
        },
        breadcrumb: {
          "@id": `${url}#breadcrumb`,
        },
      },
      breadcrumbJsonLd(
        [
          { name: "Home", path: "/" },
          { name: "Puja Services", path: "/puja-services" },
        ],
        "/puja-services",
      ),
      {
        "@type": "ItemList",
        "@id": `${url}#service-list`,
        name: "Vedic puja service directory",
        itemListElement: servicePages.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.title,
          url: absoluteUrl(`/${service.slug}`),
        })),
      },
    ],
  };
}

export function categoryHubJsonLd(category, services) {
  const path = pathForCategory(category);
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: category.name,
        description: category.description,
        inLanguage: "en-IN",
        isPartOf: {
          "@id": `${absoluteUrl("/")}#website`,
        },
        breadcrumb: {
          "@id": `${url}#breadcrumb`,
        },
      },
      breadcrumbJsonLd(
        [
          { name: "Home", path: "/" },
          { name: "Puja Services", path: "/puja-services" },
          { name: category.name, path },
        ],
        path,
      ),
      {
        "@type": "ItemList",
        "@id": `${url}#service-list`,
        name: `${category.name} service list`,
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.title,
          url: absoluteUrl(`/${service.slug}`),
        })),
      },
    ],
  };
}

export function grahaDoshShantiHubJsonLd(services = getGrahaDoshShantiServices()) {
  const path = grahaDoshShantiHub.href;
  const url = absoluteUrl(path);
  const graph = [
    {
      "@type": "CollectionPage",
      "@id": `${url}#webpage`,
      url,
      name: grahaDoshShantiHub.h1,
      description: grahaDoshShantiHub.metaDescription,
      inLanguage: "en-IN",
      isPartOf: {
        "@id": `${absoluteUrl("/")}#website`,
      },
      breadcrumb: {
        "@id": `${url}#breadcrumb`,
      },
    },
    breadcrumbJsonLd(
      [
        { name: "Home", path: "/" },
        { name: "Puja Services", path: "/puja-services" },
        { name: grahaDoshShantiHub.breadcrumbLabel, path },
      ],
      path,
    ),
  ];

  if (services.length > 0) {
    graph.push({
      "@type": "ItemList",
      "@id": `${url}#service-list`,
      name: "Active Graha and Dosh Shanti service directory",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.title,
        url: absoluteUrl(`/${service.slug}`),
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function servicePageJsonLd(service) {
  const url = absoluteUrl(`/${service.slug}`);
  const serviceId = `${url}#service`;
  const graph = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: service.pageH1 || service.title,
      description: service.description,
      dateModified: service.updated,
      inLanguage: "en-IN",
      isPartOf: {
        "@id": `${absoluteUrl("/")}#website`,
      },
      primaryImageOfPage: imageObject(service.image.local, service.image.alt, `/${service.slug}`),
      breadcrumb: {
        "@id": `${url}#breadcrumb`,
      },
      mainEntity: {
        "@id": serviceId,
      },
    },
    {
      "@type": "Service",
      "@id": serviceId,
      name: service.title,
      serviceType: service.schemaServiceType || service.category,
      description: service.description,
      url,
      image: absoluteUrl(service.image.local),
      provider: {
        "@id": `${absoluteUrl("/")}#organization`,
      },
      areaServed: service.locations.map((location) => ({
        "@type": "Place",
        name: location,
      })),
      availableChannel: service.modes.map((mode) => ({
        "@type": "ServiceChannel",
        serviceUrl: url,
        name: `${mode} puja booking`,
      })),
      audience: {
        "@type": "Audience",
        audienceType: "Families and devotees booking Hindu puja services",
      },
    },
    breadcrumbJsonLd(serviceBreadcrumbItems(service), `/${service.slug}`),
  ];

  if (service.includeFaqJsonLd !== false && Array.isArray(service.faqs) && service.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function contactPageJsonLd() {
  const url = absoluteUrl("/contact");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${url}#webpage`,
        url,
        name: "Contact Shastriya Vidhan",
        description:
          "Contact Shastriya Vidhan for Pandit Ji booking assistance in Ghaziabad, Noida, Delhi, Gurugram, Ujjain, and online.",
        inLanguage: "en-IN",
        isPartOf: {
          "@id": `${absoluteUrl("/")}#website`,
        },
        about: {
          "@id": `${absoluteUrl("/")}#organization`,
        },
        breadcrumb: {
          "@id": `${url}#breadcrumb`,
        },
      },
      breadcrumbJsonLd(
        [
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ],
        "/contact",
      ),
    ],
  };
}

export function locationsDirectoryJsonLd() {
  const url = absoluteUrl("/locations");
  const publicLocations = locationPages.filter(
    (location) => location.slug === "online-puja" || getNodeById(`location-${location.slug}`)?.indexable,
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: "Pandit Ji Service Locations",
        description:
          "Explore Shastriya Vidhan service areas for home puja, temple coordination, and online puja booking.",
        inLanguage: "en-IN",
        isPartOf: {
          "@id": `${absoluteUrl("/")}#website`,
        },
        breadcrumb: {
          "@id": `${url}#breadcrumb`,
        },
      },
      breadcrumbJsonLd(
        [
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
        ],
        "/locations",
      ),
      {
        "@type": "ItemList",
        "@id": `${url}#locations`,
        name: "Pandit Ji service areas",
        itemListElement: publicLocations.map((location, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: location.city,
          url: absoluteUrl(location.href),
        })),
      },
    ],
  };
}

export function locationPageJsonLd(location, services) {
  const url = absoluteUrl(location.href);
  const serviceId = `${url}#service`;
  const graph = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: location.pageH1 || `Book Pandit Ji in ${location.city}`,
      description: location.metaDescription || location.status,
      inLanguage: "en-IN",
      isPartOf: {
        "@id": `${absoluteUrl("/")}#website`,
      },
      about: {
        "@id": `${absoluteUrl("/")}#organization`,
      },
      mainEntity: {
        "@id": serviceId,
      },
      primaryImageOfPage: location.image?.local
        ? imageObject(location.image.local, location.image.alt || `${location.city} puja booking`, location.href)
        : undefined,
      breadcrumb: {
        "@id": `${url}#breadcrumb`,
      },
    },
    breadcrumbJsonLd(
      [
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations" },
        { name: location.city, path: location.href },
      ],
      location.href,
    ),
    {
      "@type": "Service",
      "@id": serviceId,
      name: location.serviceSchemaName || `Pandit Ji booking support in ${location.city}`,
      serviceType: location.serviceSchemaType || "Pandit Ji puja booking",
      description: location.metaDescription || location.status,
      url,
      provider: {
        "@id": `${absoluteUrl("/")}#organization`,
      },
      areaServed: {
        "@type": "Place",
        name: location.city,
      },
      audience: {
        "@type": "Audience",
        audienceType: "Families and devotees booking Hindu puja services",
      },
    },
  ];

  if (services.length > 0) {
    graph.push({
        "@type": "ItemList",
        "@id": `${url}#available-services`,
        name: `${location.city} puja services`,
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.title,
          url: absoluteUrl(`/${service.slug}`),
        })),
      });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
