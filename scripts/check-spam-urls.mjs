import { site } from "../lib/site-data.js";

const suspiciousTerms = [
  "casino",
  "gambling",
  "betting",
  "slot",
  "poker",
  "wager",
  "sportsbook",
  "roulette",
];

const defaultSuspectPaths = [
  "/emerging-technologies-reshaping-the-future-of/",
];

function normalizeUrl(input) {
  if (/^https?:\/\//i.test(input)) return input;
  return new URL(input, site.sourceWordPressUrl).toString();
}

async function fetchText(url) {
  const response = await fetch(url, {
    redirect: "manual",
    headers: {
      "user-agent": "ShastriyaVidhanSpamCheck/1.0",
    },
  });

  const contentType = response.headers.get("content-type") || "";
  const text = contentType.includes("text") || contentType.includes("xml") || contentType.includes("html")
    ? await response.text()
    : "";

  return { response, text };
}

async function sitemapUrls() {
  try {
    const { response, text } = await fetchText(normalizeUrl("/sitemap.xml"));
    if (!response.ok) return [];
    return Array.from(text.matchAll(/<loc>(.*?)<\/loc>/gi), (match) => match[1]);
  } catch {
    return [];
  }
}

function hasSuspiciousTerm(text) {
  const lower = text.toLowerCase();
  return suspiciousTerms.some((term) => lower.includes(term));
}

async function checkUrl(url, isKnownSuspect = false) {
  try {
    const { response, text } = await fetchText(url);
    const suspiciousContent = hasSuspiciousTerm(text);
    const suspectStillLive = isKnownSuspect && response.status === 200;

    return {
      url,
      status: response.status,
      ok: !suspiciousContent && !suspectStillLive,
      suspiciousContent,
      suspectStillLive,
    };
  } catch (error) {
    return {
      url,
      status: "fetch_failed",
      ok: false,
      error: error.message,
    };
  }
}

const extraUrls = process.argv.slice(2).map(normalizeUrl);
const knownSuspectUrls = defaultSuspectPaths.map(normalizeUrl);
const discoveredUrls = await sitemapUrls();
const urls = Array.from(new Set([...knownSuspectUrls, ...extraUrls, ...discoveredUrls]));

if (urls.length === 0) {
  console.error("No URLs were available to check.");
  process.exit(2);
}

const results = await Promise.all(
  urls.map((url) => checkUrl(url, knownSuspectUrls.includes(url))),
);

const failures = results.filter((result) => !result.ok);

for (const result of results) {
  const status = result.ok ? "OK" : "CHECK";
  const reasons = [
    result.suspiciousContent ? "suspicious term found" : "",
    result.suspectStillLive ? "known suspect path returns 200" : "",
    result.error ? result.error : "",
  ].filter(Boolean);

  console.log(`${status} ${result.status} ${result.url}${reasons.length ? ` - ${reasons.join(", ")}` : ""}`);
}

if (failures.length > 0) {
  console.error(`${failures.length} URL(s) need review.`);
  process.exit(1);
}

console.log(`Checked ${results.length} URL(s). No spam indicators found.`);
