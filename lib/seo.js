import { contact, locationPages, servicePages, site } from "@/lib/site-data";

const defaultImage = "/images/diwali-puja.webp";
const defaultImageAlt = `${site.name} Vedic puja booking service`;
const languages = ["Hindi", "Sanskrit", "English"];

export function canonicalPath(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (normalizedPath === "/") return "/";
  return normalizedPath.replace(/\/+$/, "");
}

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedPath = canonicalPath(path);
  return normalizedPath === "/" ? `${site.productionUrl}/` : `${site.productionUrl}${normalizedPath}`;
}

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
      canonical,
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
  const url = absoluteUrl("/services");

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
          { name: "Puja Services", path: "/services" },
        ],
        "/services",
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
      serviceType: service.category,
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
    breadcrumbJsonLd(
      [
        { name: "Home", path: "/" },
        { name: "Puja Services", path: "/services" },
        { name: service.title, path: `/${service.slug}` },
      ],
      `/${service.slug}`,
    ),
  ];

  if (Array.isArray(service.faqs) && service.faqs.length > 0) {
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
          "Contact Shastriya Vidhan for Pandit Ji booking assistance in Noida, Delhi, Gurugram, Ujjain, and online.",
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
        itemListElement: locationPages.map((location, index) => ({
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

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `Book Pandit Ji in ${location.city}`,
        description: location.status,
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
          { name: "Locations", path: "/locations" },
          { name: location.city, path: location.href },
        ],
        location.href,
      ),
      {
        "@type": "ItemList",
        "@id": `${url}#available-services`,
        name: `${location.city} puja services`,
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
