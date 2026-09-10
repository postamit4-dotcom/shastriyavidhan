import fs from "node:fs";
import {
  footerNavigationGroups,
  headerNavigation,
  mobileNavigationSections,
  routeRedirects,
  serviceMegaMenuGroups,
  sitemapNodes,
  siteNodes,
} from "../lib/site-registry.js";
import {
  getGrahaDoshShantiServices,
  grahaDoshShantiCatalogueIssues,
  isGrahaDoshShantiHubIndexable,
  serviceCategoryAssignments,
  servicePages,
  serviceCategories,
  servicesForCategorySlug,
} from "../lib/site-data.js";
import {
  categoryHubJsonLd,
  contactPageJsonLd,
  grahaDoshShantiHubJsonLd,
  homePageJsonLd,
  locationPageJsonLd,
  locationsDirectoryJsonLd,
  absoluteUrl,
  SITE_URL,
  servicePageJsonLd,
  servicesDirectoryJsonLd,
} from "../lib/seo.js";
import { locationPages } from "../lib/site-data.js";

const failures = [];

function fail(message) {
  failures.push(message);
}

function assertUnique(items, keyName, label) {
  const seen = new Map();
  for (const item of items) {
    const value = item[keyName];
    if (seen.has(value)) {
      fail(`Duplicate ${label}: ${value}`);
    }
    seen.set(value, item);
  }
}

function collectLinks() {
  const links = [];

  for (const item of headerNavigation) {
    links.push(item.href);
    if (item.items) links.push(...item.items.map((link) => link.href));
  }

  for (const group of serviceMegaMenuGroups) {
    links.push(...group.items.map((link) => link.href));
  }

  for (const section of mobileNavigationSections) {
    for (const group of section.groups) {
      links.push(...group.items.map((link) => link.href));
    }
  }

  for (const group of footerNavigationGroups) {
    links.push(...group.items.map((link) => link.href));
  }

  return Array.from(new Set(links));
}

function normalizeHref(href) {
  if (/^(https?:|tel:|mailto:)/.test(href)) return href;
  const [path] = href.split("#");
  return path === "" ? "/" : path.replace(/\/+$/, "") || "/";
}

function verifyRegistry() {
  assertUnique(siteNodes, "id", "route id");
  assertUnique(siteNodes, "href", "route href");

  const hrefs = new Set(siteNodes.map((item) => item.href));
  const redirectSources = new Set(routeRedirects.map((item) => item.source));

  for (const redirect of routeRedirects) {
    if (hrefs.has(redirect.source)) {
      fail(`Redirect source is also a canonical route: ${redirect.source}`);
    }
  }

  for (const node of siteNodes) {
    if (node.publicationState !== "live" && node.indexable) {
      fail(`Non-live node is indexable: ${node.id}`);
    }

    if (node.publicationState === "conditional" && (node.showInHeader || node.showInFooter || node.showInHtmlSitemap)) {
      fail(`Conditional node leaks into navigation or sitemap: ${node.id}`);
    }
  }

  for (const href of collectLinks()) {
    const normalized = normalizeHref(href);
    if (/^(https?:|tel:|mailto:)/.test(normalized)) continue;
    if (!hrefs.has(normalized)) {
      fail(`Navigation link does not resolve to a registry node: ${href}`);
    }
    if (redirectSources.has(normalized)) {
      fail(`Navigation points at redirect source instead of canonical URL: ${href}`);
    }
  }
}

function verifyServiceData() {
  const categorySlugs = new Set(serviceCategories.map((category) => category.slug));

  for (const service of servicePages) {
    const assignment = serviceCategoryAssignments[service.slug];
    if (!assignment?.primary) {
      fail(`Service missing primary category assignment: ${service.slug}`);
      continue;
    }

    if (!categorySlugs.has(assignment.primary)) {
      fail(`Service has unknown primary category: ${service.slug} -> ${assignment.primary}`);
    }

    for (const key of ["title", "description", "duration", "priceLabel", "samagri"]) {
      if (!service[key]) {
        fail(`Service missing ${key}: ${service.slug}`);
      }
    }

    if (!service.image?.local || !service.image?.alt) {
      fail(`Service missing image or alt text: ${service.slug}`);
    }
  }

  for (const category of serviceCategories) {
    const services = servicesForCategorySlug(category.slug);
    if (category.megaMenuEligible && services.length === 0) {
      fail(`Mega-menu category has no services: ${category.slug}`);
    }
  }
}

function verifyGrahaDoshShantiCatalogue() {
  const services = getGrahaDoshShantiServices();
  if (services.length === 0) {
    fail("Graha & Dosh Shanti hub has no active services with complete public hub fields.");
  }

  const reviewGateIssues = new Set([
    "Missing Graha & Dosh Shanti catalogue owner.",
    "Missing named religious reviewer for Graha & Dosh Shanti taxonomy.",
    "Missing last-reviewed date for Graha & Dosh Shanti catalogue.",
  ]);

  for (const issue of grahaDoshShantiCatalogueIssues()) {
    if (!reviewGateIssues.has(issue)) {
      fail(issue);
    }
  }

  if (isGrahaDoshShantiHubIndexable()) {
    for (const issue of grahaDoshShantiCatalogueIssues()) {
      fail(issue);
    }
  }
}

function verifyJsonLd() {
  const payloads = [
    homePageJsonLd(),
    servicesDirectoryJsonLd(),
    grahaDoshShantiHubJsonLd(),
    locationsDirectoryJsonLd(),
    contactPageJsonLd(),
    ...servicePages.slice(0, 3).map((service) => servicePageJsonLd(service)),
    ...serviceCategories.slice(0, 2).map((category) => categoryHubJsonLd(category, servicesForCategorySlug(category.slug))),
    ...locationPages.slice(0, 2).map((location) => locationPageJsonLd(location, [])),
  ];

  for (const payload of payloads) {
    JSON.parse(JSON.stringify(payload));
  }
}

function visitStrings(value, visitor) {
  if (typeof value === "string") {
    visitor(value);
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) visitStrings(item, visitor);
    return;
  }

  if (value && typeof value === "object") {
    for (const item of Object.values(value)) visitStrings(item, visitor);
  }
}

function verifyProductionUrl(value, label) {
  if (!/^https?:\/\/(?:www\.)?shastriyavidhan\.com(?:[/:#?]|$)/i.test(value)) return;

  const url = new URL(value);
  if (url.protocol !== "https:") {
    fail(`${label} uses non-HTTPS production URL: ${value}`);
  }

  if (url.hostname !== "www.shastriyavidhan.com") {
    fail(`${label} uses non-www production URL: ${value}`);
  }

  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    fail(`${label} uses trailing slash on an inner production URL: ${value}`);
  }
}

function verifyUrlAuthority() {
  if (SITE_URL !== "https://www.shastriyavidhan.com") {
    fail(`SITE_URL must be https://www.shastriyavidhan.com, received ${SITE_URL}`);
  }

  if (absoluteUrl("https://shastriyavidhan.com/example/") !== "https://www.shastriyavidhan.com/example") {
    fail("absoluteUrl() does not normalize same-site apex/slash URLs to the preferred canonical origin.");
  }

  const payloads = [
    homePageJsonLd(),
    servicesDirectoryJsonLd(),
    grahaDoshShantiHubJsonLd(),
    locationsDirectoryJsonLd(),
    contactPageJsonLd(),
    ...servicePages.map((service) => servicePageJsonLd(service)),
    ...serviceCategories.map((category) => categoryHubJsonLd(category, servicesForCategorySlug(category.slug))),
    ...locationPages.map((location) => locationPageJsonLd(location, [])),
  ];

  for (const payload of payloads) {
    visitStrings(payload, (value) => verifyProductionUrl(value, "JSON-LD"));
  }

  for (const route of sitemapNodes()) {
    verifyProductionUrl(absoluteUrl(route.href), "sitemap URL");
    if (route.image) verifyProductionUrl(absoluteUrl(route.image), "sitemap image URL");
  }

  for (const redirect of routeRedirects) {
    verifyProductionUrl(redirect.destination, "redirect destination");
  }
}

function verifySitemap() {
  const sitemapHrefs = sitemapNodes().map((item) => item.href);
  const sitemapHrefSet = new Set(sitemapHrefs);
  assertUnique(
    sitemapHrefs.map((href) => ({ href })),
    "href",
    "sitemap href",
  );

  for (const node of sitemapNodes()) {
    if (!node.indexable || node.publicationState !== "live") {
      fail(`Sitemap includes non-indexable route: ${node.id}`);
    }
  }

  for (const href of [
    "/",
    "/puja-services",
    "/locations/ghaziabad",
    "/pandit-ji/acharya-sursain-brijwasi-ghaziabad",
    "/pandit-ji/acharya-sursain-brijwasi-raj-nagar-extension-ghaziabad",
  ]) {
    if (!sitemapHrefSet.has(href)) {
      fail(`Priority published URL missing from sitemap: ${href}`);
    }
  }

  for (const href of [
    "/locations/noida",
    "/locations/delhi",
    "/locations/gurugram",
    "/locations/ujjain",
    "/puja-services/family-sanskar",
    "/puja-services/path-jaap-katha",
    "/puja-services/hanuman-ganesh",
    "/graha-dosh-shanti",
    "/migration-notes",
    "/category/blog",
  ]) {
    if (sitemapHrefSet.has(href)) {
      fail(`Intentionally excluded URL leaked into sitemap: ${href}`);
    }
  }

  const htmlSitemapSource = fs.readFileSync("app/site-map/page.jsx", "utf8");
  if (htmlSitemapSource.includes("siteNodes")) {
    fail("HTML sitemap should use published sitemap nodes instead of the full technical route registry.");
  }
}

function verifyRobotsPolicy() {
  const robotsSource = fs.readFileSync("app/robots.js", "utf8");
  if (!robotsSource.includes('disallow: ["/api/"]')) {
    fail("robots.txt should only disallow private API routes from the public production build.");
  }

  for (const publicNoindexPath of ["/migration-notes", "/category/blog", "/policies/"]) {
    if (robotsSource.includes(publicNoindexPath)) {
      fail(`robots.txt should not block crawl access to public noindex/redirect route: ${publicNoindexPath}`);
    }
  }
}

verifyRegistry();
verifyServiceData();
verifyGrahaDoshShantiCatalogue();
verifyJsonLd();
verifySitemap();
verifyRobotsPolicy();
verifyUrlAuthority();

if (failures.length > 0) {
  console.error("Site validation failed:");
  for (const item of failures) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`Site validation passed for ${siteNodes.length} route nodes and ${servicePages.length} services.`);
