import fs from "node:fs/promises";
import path from "node:path";
import { canonicalPath, absoluteUrl } from "../lib/seo.js";
import { locationPages, servicePages, site } from "../lib/site-data.js";
import { routeRedirects, sitemapNodes, siteNodes } from "../lib/site-registry.js";

const args = new Map(
  process.argv
    .slice(2)
    .filter((arg) => arg.startsWith("--"))
    .map((arg) => {
      const [key, ...valueParts] = arg.split("=");
      return [key, valueParts.join("=") || "true"];
    }),
);

const baseUrl = args.get("--base") || site.productionUrl;
const maxPages = Number(args.get("--max-pages") || 80);
const maxDepth = Number(args.get("--max-depth") || 3);
const base = new URL(baseUrl);
const auditDate = new Date().toISOString();
const dateSlug = auditDate.slice(0, 10);
const environmentLabel = /^(localhost|127\.0\.0\.1)$/i.test(base.hostname) ? "local" : "production";
const outputStem = args.get("--output") || `indexability-audit-${environmentLabel}-${dateSlug}`;
const userAgent = "ShastriyaVidhanIndexabilityAudit/1.0";

const productionHostnames = new Set(["www.shastriyavidhan.com", "shastriyavidhan.com"]);
const localHostnames = new Set(["localhost", "127.0.0.1"]);
const allowedHostnames = new Set([...productionHostnames, ...localHostnames, base.hostname]);
const skippedExtensions = /\.(?:avif|css|gif|ico|jpeg|jpg|js|json|pdf|png|svg|txt|webp|woff2?)$/i;

const nodeByHref = new Map(siteNodes.map((node) => [canonicalPath(node.href), node]));
const redirectBySource = new Map(
  routeRedirects.map((redirect) => [canonicalPath(redirect.source), redirect]),
);
const intendedSitemapHrefs = new Set(sitemapNodes().map((node) => canonicalPath(node.href)));
const httpCache = new Map();

function cleanText(value) {
  return String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function attrValue(tag, attribute) {
  const doubleQuoted = new RegExp(`${attribute}\\s*=\\s*"([^"]*)"`, "i").exec(tag);
  if (doubleQuoted) return doubleQuoted[1];
  const singleQuoted = new RegExp(`${attribute}\\s*=\\s*'([^']*)'`, "i").exec(tag);
  if (singleQuoted) return singleQuoted[1];
  return "";
}

function normalizeDiscoveredUrl(value, fromPath = "/") {
  if (!value || /^(mailto:|tel:|javascript:|sms:|whatsapp:)/i.test(value)) return null;

  try {
    const fromUrl = new URL(fromPath, base);
    const url = new URL(value, fromUrl);

    if (!["http:", "https:"].includes(url.protocol)) return null;
    if (!allowedHostnames.has(url.hostname)) return null;

    const normalized = canonicalPath(url.pathname);
    if (normalized !== "/sitemap.xml" && normalized !== "/robots.txt" && skippedExtensions.test(normalized)) {
      return null;
    }

    return normalized;
  } catch {
    return null;
  }
}

function absoluteAuditUrl(pathname) {
  return new URL(pathname, base).toString();
}

async function fetchPath(pathname) {
  const normalized = canonicalPath(pathname);
  if (httpCache.has(normalized)) return httpCache.get(normalized);

  const result = {
    path: normalized,
    checkedUrl: absoluteAuditUrl(normalized),
    status: "fetch_error",
    redirectedTo: "",
    contentType: "",
    xRobotsTag: "",
    html: "",
    error: "",
  };

  try {
    const response = await fetch(result.checkedUrl, {
      redirect: "manual",
      headers: { "user-agent": userAgent },
    });
    result.status = response.status;
    result.contentType = response.headers.get("content-type") || "";
    result.xRobotsTag = response.headers.get("x-robots-tag") || "";
    result.redirectedTo = response.headers.get("location") || "";

    if (result.contentType.includes("text/") || result.contentType.includes("xml") || result.contentType.includes("html")) {
      result.html = await response.text();
    }
  } catch (error) {
    result.error = error instanceof Error ? error.message : String(error);
  }

  httpCache.set(normalized, result);
  return result;
}

function extractCanonical(html) {
  const links = html.match(/<link\b[^>]*>/gi) || [];
  for (const tag of links) {
    const rel = attrValue(tag, "rel").toLowerCase();
    if (rel.split(/\s+/).includes("canonical")) return attrValue(tag, "href");
  }
  return "";
}

function extractMetaRobots(html) {
  const robots = [];
  const metas = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of metas) {
    const name = attrValue(tag, "name").toLowerCase();
    if (name === "robots" || name === "googlebot") {
      robots.push(`${name}: ${attrValue(tag, "content")}`);
    }
  }
  return robots.join("; ");
}

function extractTitle(html) {
  return cleanText((/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html) || [])[1] || "");
}

function extractH1(html) {
  return cleanText((/<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html) || [])[1] || "");
}

function extractMainTextLength(html) {
  const main = (/<main[^>]*>([\s\S]*?)<\/main>/i.exec(html) || [])[1] || html;
  return cleanText(main).length;
}

function extractLinks(html, fromPath) {
  const links = [];
  for (const tag of html.match(/<a\b[^>]*>/gi) || []) {
    const href = attrValue(tag, "href");
    const normalized = normalizeDiscoveredUrl(href, fromPath);
    if (normalized && !normalized.startsWith("/api/")) links.push(normalized);
  }
  return Array.from(new Set(links));
}

function parseSitemapPaths(xml) {
  const paths = [];
  for (const match of xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)) {
    const normalized = normalizeDiscoveredUrl(cleanText(match[1]));
    if (normalized) paths.push(normalized);
  }
  return Array.from(new Set(paths));
}

function parseRobotsRules(robotsText) {
  const rules = [];
  let active = false;

  for (const rawLine of robotsText.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*/, "").trim();
    if (!line) continue;

    const [rawField, ...rawValue] = line.split(":");
    const field = rawField.trim().toLowerCase();
    const value = rawValue.join(":").trim();

    if (field === "user-agent") {
      active = value === "*" || value.toLowerCase().includes("googlebot");
      continue;
    }

    if (active && (field === "allow" || field === "disallow")) {
      rules.push({ type: field, path: value });
    }
  }

  return rules;
}

function isRobotsAllowed(pathname, rules) {
  const matches = rules
    .filter((rule) => rule.path && pathname.startsWith(rule.path))
    .sort((a, b) => b.path.length - a.path.length);

  if (matches.length === 0) return true;
  return matches[0].type === "allow";
}

function intendedDecision(pathname) {
  const redirect = redirectBySource.get(pathname);
  if (redirect) {
    return {
      node: null,
      decision: "Redirect",
      pageType: "redirect",
      priority: "P2",
      publicationStatus: "redirect",
      evidenceStatus: "not_applicable",
      expectedCanonical: redirect.destination,
    };
  }

  const node = nodeByHref.get(pathname);
  if (!node) {
    return {
      node: null,
      decision: "Unknown",
      pageType: "unregistered",
      priority: "unlisted",
      publicationStatus: "unknown",
      evidenceStatus: "unknown",
      expectedCanonical: "",
    };
  }

  const eligible = node.publicationState === "live" && node.indexable;
  return {
    node,
    decision: eligible
      ? "Technically eligible"
      : node.publicationState === "conditional"
        ? "Still blocked"
        : "Intentionally excluded",
    pageType: node.pageType,
    priority: node.priority,
    publicationStatus: node.publicationState,
    evidenceStatus: node.evidenceState,
    expectedCanonical: absoluteUrl(node.href),
  };
}

function canonicalMatchesPath(canonical, pathname) {
  if (!canonical) return false;
  try {
    const url = new URL(canonical, base);
    return productionHostnames.has(url.hostname) && canonicalPath(url.pathname) === pathname;
  } catch {
    return false;
  }
}

function hasNoindex(metaRobots, xRobotsTag) {
  return /noindex|none/i.test(`${metaRobots} ${xRobotsTag}`);
}

function addSource(sources, pathname, source) {
  if (!pathname) return;
  if (!sources.has(pathname)) sources.set(pathname, new Set());
  sources.get(pathname).add(source);
}

async function crawlSite(discoveredSources) {
  const queue = ["/"];
  const depth = new Map([["/", 0]]);
  const graph = new Map();
  const visited = new Set();

  while (queue.length > 0 && visited.size < maxPages) {
    const current = queue.shift();
    if (!current || visited.has(current)) continue;
    visited.add(current);
    addSource(discoveredSources, current, "crawl");

    const response = await fetchPath(current);
    if (response.status !== 200 || !response.contentType.includes("text/html")) continue;

    const links = extractLinks(response.html, current);
    graph.set(current, links);

    const currentDepth = depth.get(current) ?? 0;
    if (currentDepth >= maxDepth) continue;

    for (const link of links) {
      addSource(discoveredSources, link, `crawl_link_from:${current}`);
      if (!depth.has(link)) depth.set(link, currentDepth + 1);
      if (!visited.has(link) && !queue.includes(link) && visited.size + queue.length < maxPages) {
        queue.push(link);
      }
    }
  }

  return { depth, graph, visitedCount: visited.size };
}

function issueForRecord(record) {
  const issues = [];
  const noindex = hasNoindex(record.metaRobots, record.xRobotsTag);

  if (record.intendedIndexingDecision === "Redirect") {
    if (![301, 308].includes(record.httpStatus)) issues.push("Redirect source did not return a permanent redirect.");
    if (!record.redirectDestination) issues.push("Redirect source has no location header.");
    return issues;
  }

  if (record.intendedIndexingDecision === "Technically eligible") {
    if (record.httpStatus !== 200) issues.push("Canonical URL does not return HTTP 200.");
    if (!record.robotsTxtAllowsCrawling) issues.push("robots.txt blocks crawling.");
    if (noindex) issues.push("Page has noindex directive.");
    if (!record.declaredCanonical) issues.push("Page has no declared canonical.");
    if (record.declaredCanonical && !canonicalMatchesPath(record.declaredCanonical, record.path)) {
      issues.push("Declared canonical does not match the canonical URL path.");
    }
    if (!record.xmlSitemapIncluded) issues.push("Eligible page is missing from XML sitemap.");
    if (!record.usefulMainContentRenders) issues.push("Useful main content was not detected.");
    if (record.path !== "/" && record.internalIncomingLinkCount === 0) {
      issues.push("No crawlable incoming internal link found in bounded crawl.");
    }
    if (["P0", "P1"].includes(record.businessPriority) && record.crawlDepth !== null && record.crawlDepth > 3) {
      issues.push("Priority page is deeper than the three-click usability target.");
    }
    return issues;
  }

  if (record.intendedIndexingDecision === "Still blocked" || record.intendedIndexingDecision === "Intentionally excluded") {
    if (record.xmlSitemapIncluded) issues.push("Excluded page is present in XML sitemap.");
    if (!record.robotsTxtAllowsCrawling && noindex) {
      issues.push("robots.txt blocks crawler access to the noindex directive.");
    }
    return issues;
  }

  if (record.httpStatus === 200 && record.xmlSitemapIncluded) {
    issues.push("Unregistered URL is present in the XML sitemap.");
  }

  return issues;
}

function proposedFix(record, issues) {
  if (issues.length === 0) {
    if (record.intendedIndexingDecision === "Technically eligible") {
      return "No repository fix needed for technical eligibility; verify in production and Search Console.";
    }
    if (record.intendedIndexingDecision === "Redirect") return "Keep permanent redirect and avoid linking to the source URL.";
    if (record.intendedIndexingDecision === "Still blocked") return "Preserve exclusion until evidence and content requirements are satisfied.";
    if (record.intendedIndexingDecision === "Intentionally excluded") return "Keep out of XML sitemap and public discovery lists.";
    return "Review whether this URL should exist in the route registry.";
  }

  return issues.join(" ");
}

function verificationResult(issues) {
  return issues.length === 0 ? "Pass" : "Needs follow-up";
}

function priorityRank(record) {
  const map = { P0: 0, P1: 1, P2: 2, unlisted: 9 };
  return map[record.businessPriority] ?? 8;
}

function mdEscape(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

async function main() {
  const discoveredSources = new Map();

  for (const node of siteNodes) {
    addSource(discoveredSources, canonicalPath(node.href), "route_registry");
    for (const source of node.redirectFrom) addSource(discoveredSources, canonicalPath(source), "redirect_source");
  }

  for (const node of sitemapNodes()) addSource(discoveredSources, canonicalPath(node.href), "repository_sitemap_intent");

  const robotsResponse = await fetchPath("/robots.txt");
  const robotsRules = robotsResponse.status === 200 ? parseRobotsRules(robotsResponse.html) : [];

  const sitemapResponse = await fetchPath("/sitemap.xml");
  const liveSitemapPaths = sitemapResponse.status === 200 ? parseSitemapPaths(sitemapResponse.html) : [];
  for (const sitemapPath of liveSitemapPaths) addSource(discoveredSources, sitemapPath, "xml_sitemap");

  const htmlSitemapResponse = await fetchPath("/site-map");
  const htmlSitemapLinks =
    htmlSitemapResponse.status === 200 && htmlSitemapResponse.contentType.includes("text/html")
      ? extractLinks(htmlSitemapResponse.html, "/site-map")
      : [];
  for (const link of htmlSitemapLinks) addSource(discoveredSources, link, "html_site_map");

  const crawl = await crawlSite(discoveredSources);
  const incoming = new Map();
  for (const [from, links] of crawl.graph.entries()) {
    for (const link of links) {
      if (!incoming.has(link)) incoming.set(link, new Set());
      incoming.get(link).add(from);
    }
  }

  const importantPaths = [
    "/",
    "/puja-services",
    "/locations",
    "/locations/ghaziabad",
    "/pandit-ji/acharya-sursain-brijwasi-ghaziabad",
    "/pandit-ji/acharya-sursain-brijwasi-raj-nagar-extension-ghaziabad",
    "/puja-at-home",
    "/online-puja",
    "/guides",
    "/about",
    "/contact",
    "/pricing-and-inclusions",
    "/how-it-works",
  ];
  for (const service of servicePages.filter((service) => intendedSitemapHrefs.has(`/${service.slug}`))) {
    importantPaths.push(`/${service.slug}`);
  }
  for (const path of importantPaths) addSource(discoveredSources, path, "priority_list");

  const allPaths = Array.from(discoveredSources.keys()).sort();
  const records = [];

  for (const pathname of allPaths) {
    const http = await fetchPath(pathname);
    const decision = intendedDecision(pathname);
    const isHtml = http.contentType.includes("text/html");
    const metaRobots = isHtml ? extractMetaRobots(http.html) : "";
    const declaredCanonical = isHtml ? extractCanonical(http.html) : "";
    const title = isHtml ? extractTitle(http.html) : "";
    const h1 = isHtml ? extractH1(http.html) : "";
    const mainTextLength = isHtml ? extractMainTextLength(http.html) : 0;
    const incomingSources = Array.from(incoming.get(pathname) || []);
    const record = {
      url: absoluteUrl(pathname),
      checkedUrl: http.checkedUrl,
      path: pathname,
      fetchError: http.error,
      pageType: decision.pageType,
      businessPriority: decision.priority,
      publicationStatus: decision.publicationStatus,
      evidenceStatus: decision.evidenceStatus,
      httpStatus: http.status,
      redirectDestination: http.redirectedTo,
      robotsTxtAllowsCrawling: isRobotsAllowed(pathname, robotsRules),
      metaRobots,
      xRobotsTag: http.xRobotsTag,
      declaredCanonical,
      title,
      h1,
      usefulMainContentRenders: http.status === 200 && isHtml && Boolean(h1) && mainTextLength >= 500,
      mainTextLength,
      xmlSitemapIncluded: liveSitemapPaths.includes(pathname),
      repositorySitemapIntent: intendedSitemapHrefs.has(pathname),
      internalIncomingLinks: incomingSources.sort(),
      internalIncomingLinkCount: incomingSources.length,
      crawlDepth: crawl.depth.has(pathname) ? crawl.depth.get(pathname) : null,
      discoveredFrom: Array.from(discoveredSources.get(pathname) || []).sort(),
      intendedIndexingDecision: decision.decision,
      googleIndexingStatus: "Unknown-not checked in Search Console",
      problem: "",
      proposedFix: "",
      verificationResult: "",
    };
    const issues = issueForRecord(record);
    record.problem = issues.length > 0 ? issues.join(" | ") : "";
    record.proposedFix = proposedFix(record, issues);
    record.verificationResult = verificationResult(issues);
    records.push(record);
  }

  records.sort((a, b) => priorityRank(a) - priorityRank(b) || a.path.localeCompare(b.path));

  const docsDir = path.join(process.cwd(), "docs");
  await fs.mkdir(docsDir, { recursive: true });

  const jsonPath = path.join(docsDir, `${outputStem}.json`);
  const mdPath = path.join(docsDir, `${outputStem}.md`);
  const eligibleUrls = records.filter((record) => record.intendedIndexingDecision === "Technically eligible");
  const manualIndexingUrls = eligibleUrls
    .filter((record) => ["P0", "P1"].includes(record.businessPriority))
    .map((record) => record.url);
  const excluded = records.filter((record) =>
    ["Still blocked", "Intentionally excluded"].includes(record.intendedIndexingDecision),
  );
  const failing = records.filter((record) => record.verificationResult !== "Pass");

  await fs.writeFile(
    jsonPath,
    `${JSON.stringify(
      {
        site: site.name,
        auditedBaseUrl: base.toString(),
        preferredProductionOrigin: site.productionUrl,
        generatedAt: auditDate,
        crawl: {
          maxPages,
          maxDepth,
          visitedCount: crawl.visitedCount,
          concurrency: 1,
          formsSubmitted: false,
        },
        sitemap: {
          checkedUrl: absoluteAuditUrl("/sitemap.xml"),
          status: sitemapResponse.status,
          urlCount: liveSitemapPaths.length,
        },
        robots: {
          checkedUrl: absoluteAuditUrl("/robots.txt"),
          status: robotsResponse.status,
          rules: robotsRules,
        },
        searchConsole: {
          access: "unavailable in this session",
          googleIndexingStatusDefault: "Unknown-not checked in Search Console",
        },
        summary: {
          records: records.length,
          technicallyEligible: eligibleUrls.length,
          manualIndexingCandidates: manualIndexingUrls.length,
          intentionallyExcludedOrStillBlocked: excluded.length,
          failing: failing.length,
        },
        manualIndexingUrls,
        records,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  const intendedExclusionNotes = excluded
    .map((record) => `| ${mdEscape(record.url)} | ${mdEscape(record.intendedIndexingDecision)} | ${mdEscape(record.proposedFix)} |`)
    .join("\n");
  const inventoryRows = records
    .map(
      (record) =>
        `| ${mdEscape(record.url)} | ${mdEscape(record.pageType)} | ${mdEscape(record.businessPriority)} | ${mdEscape(record.httpStatus)} | ${mdEscape(record.declaredCanonical)} | ${record.xmlSitemapIncluded ? "yes" : "no"} | ${record.robotsTxtAllowsCrawling ? "yes" : "no"} | ${mdEscape(record.intendedIndexingDecision)} | ${mdEscape(record.googleIndexingStatus)} | ${mdEscape(record.verificationResult)} | ${mdEscape(record.problem || "None")} |`,
    )
    .join("\n");

  const markdown = `# Shastriya Vidhan Indexability Audit

Generated: ${auditDate}

Audited base: ${base.toString()}

Preferred production origin: ${site.productionUrl}

## Scope

- Framework/source: Next.js App Router route registry, dynamic service/location data, generated robots.txt, generated XML sitemap, public HTML site map, and bounded same-site crawl.
- Crawl limits: ${crawl.visitedCount} page(s) visited, max ${maxPages} pages, max depth ${maxDepth}, concurrency 1, GET requests only, no forms submitted.
- Search Console: unavailable in this Codex session. Google indexing status is recorded as "Unknown-not checked in Search Console".

## Summary

- Technically eligible URL records: ${eligibleUrls.length}
- P0/P1 URLs for manual URL Inspection consideration: ${manualIndexingUrls.length}
- Intentionally excluded or still blocked URL records: ${excluded.length}
- Records needing follow-up in this audit environment: ${failing.length}
- XML sitemap URL: ${absoluteUrl("/sitemap.xml")}

## Ordered Manual Indexing Candidates

These URLs are technically eligible candidates from the repository intent and audit results. Use Search Console URL Inspection after the production deployment is live; this does not guarantee indexing.

${manualIndexingUrls.map((url, index) => `${index + 1}. ${url}`).join("\n")}

## Intentional Exclusions And Blocks

| URL | Status | Reason / next condition |
| --- | --- | --- |
${intendedExclusionNotes || "| None | None | None |"}

## URL-Level Inventory

| URL | Type | Priority | HTTP | Canonical | In XML sitemap | Robots allowed | Intended indexing | Google indexing | Verification | Problem |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
${inventoryRows}

## Search Console Workflow

1. Open the Search Console property that covers ${site.productionUrl}.
2. Submit or resubmit ${absoluteUrl("/sitemap.xml")} in Sitemaps after the production deployment is live.
3. For selected P0/P1 URLs, use URL Inspection: inspect the canonical URL, review any issue, test the live URL, then request indexing only when eligible.
4. Do not use Google Indexing API for these ordinary puja, guide, location, or business pages.
5. Recheck at 7, 14, and 28 days as monitoring checkpoints, not promised indexing deadlines.
`;

  await fs.writeFile(mdPath, markdown, "utf8");

  console.log(`Wrote ${jsonPath}`);
  console.log(`Wrote ${mdPath}`);

  if (failing.length > 0) {
    console.log(`${failing.length} record(s) need follow-up in ${environmentLabel} audit output.`);
  } else {
    console.log("Indexability audit passed for the checked environment.");
  }
}

await main();
