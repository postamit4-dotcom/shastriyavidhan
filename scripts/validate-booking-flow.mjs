import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { POST, validateContactPayload } from "../app/api/contact/route.js";
import { contact, getServiceBySlug, locationPages } from "../lib/site-data.js";
import { getNodeByHref, sitemapNodes } from "../lib/site-registry.js";

const validPayload = {
  service: "Rudrabhishek Puja",
  mode: "Home",
  city: "Noida",
  preferredDate: "2026-12-15",
  preferredTime: "Morning",
  alternateDate: "2026-12-16",
  language: "Hindi",
  tradition: "Family tradition",
  samagri: "Need checklist",
  name: "Amit <script>",
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  email: "AMIT@example.com",
  address: "Sector 62, Noida",
  instructions: "Please confirm samagri and availability.",
  submittedAt: "2026-09-08T00:00:00.000Z",
  sourcePage: "/book-puja",
  ctaLocation: "booking_form",
  website: "",
};

function clonePayload(overrides = {}) {
  return {
    ...structuredClone(validPayload),
    ...overrides,
  };
}

const validResult = validateContactPayload(clonePayload(), {
  now: new Date("2026-09-08T00:00:00.000Z"),
});
assert.equal(validResult.ok, true, "valid booking payload should pass validation");
assert.equal(validResult.submission.status, "pending_review");
assert.equal(validResult.submission.name.includes("<script>"), false);
assert.equal(validResult.submission.email, "amit@example.com");
assert.equal(validResult.submission.sourcePage, "/book-puja");

const unexpected = validateContactPayload(clonePayload({ admin: true }));
assert.equal(unexpected.ok, false, "unexpected fields should fail");
assert.equal(Boolean(unexpected.fieldErrors.form), true);

const honeypot = validateContactPayload(clonePayload({ website: "https://spam.example" }));
assert.equal(honeypot.ok, false, "honeypot should fail");

const invalidPhone = validateContactPayload(clonePayload({ phone: "12345" }));
assert.equal(invalidPhone.ok, false, "invalid phone should fail");
assert.equal(Boolean(invalidPhone.fieldErrors.phone), true);

const invalidEmail = validateContactPayload(clonePayload({ email: "not-an-email" }));
assert.equal(invalidEmail.ok, false, "invalid email should fail");
assert.equal(Boolean(invalidEmail.fieldErrors.email), true);

const oversized = validateContactPayload(clonePayload({ instructions: "x".repeat(1300) }));
assert.equal(oversized.ok, false, "oversized instructions should fail");
assert.equal(Boolean(oversized.fieldErrors.instructions), true);

const wrongOriginResponse = await POST(
  new Request("https://www.shastriyavidhan.com/api/contact", {
    method: "POST",
    headers: {
      origin: "https://example.com",
      "content-type": "application/json",
    },
    body: JSON.stringify(clonePayload()),
  }),
);
assert.equal(wrongOriginResponse.status, 403, "wrong origin should be rejected");

const wrongContentTypeResponse = await POST(
  new Request("https://www.shastriyavidhan.com/api/contact", {
    method: "POST",
    headers: {
      origin: "https://www.shastriyavidhan.com",
      "content-type": "text/plain",
    },
    body: "plain text",
  }),
);
assert.equal(wrongContentTypeResponse.status, 415, "non-JSON request should be rejected");

const oversizedHeaderResponse = await POST(
  new Request("https://www.shastriyavidhan.com/api/contact", {
    method: "POST",
    headers: {
      origin: "https://www.shastriyavidhan.com",
      "content-type": "application/json",
      "content-length": "18001",
    },
    body: JSON.stringify(clonePayload()),
  }),
);
assert.equal(oversizedHeaderResponse.status, 413, "oversized content-length should be rejected");

const routeHrefs = [
  "/",
  "/book-puja",
  "/contact",
  "/locations/noida",
  "/locations/ghaziabad",
  "/pandit-ji/acharya-sursain-brijwasi-ghaziabad",
  "/pandit-ji/acharya-sursain-brijwasi-raj-nagar-extension-ghaziabad",
];
for (const href of routeHrefs) {
  assert.ok(getNodeByHref(href), `${href} should exist in the route registry`);
}

assert.equal(
  sitemapNodes().some((item) => item.href.startsWith("/api/")),
  false,
  "private API routes should not be in sitemap",
);

assert.equal(contact.phone, "+917599340430", "primary phone should stay consistent");
assert.equal(contact.whatsapp, "917599340430", "primary WhatsApp should stay consistent");
assert.ok(contact.whatsappLink.startsWith("https://wa.me/917599340430"), "WhatsApp link should use wa.me");

const noida = locationPages.find((location) => location.slug === "noida");
const ghaziabad = locationPages.find((location) => location.slug === "ghaziabad");
assert.ok(noida, "Noida location page should be configured");
assert.ok(ghaziabad, "Ghaziabad location page should be configured");
assert.ok(ghaziabad.coverage.toLowerCase().includes("indirapuram"), "Ghaziabad coverage should name key areas");

const rudrabhishek = getServiceBySlug("book-pandit-ji-for-rudrabhishek-puja-noida");
assert.ok(rudrabhishek, "Rudrabhishek service should exist");
assert.ok(rudrabhishek.locations.includes("Ghaziabad"), "Rudrabhishek should align with Ghaziabad requests");
assert.ok(rudrabhishek.serviceFormats?.length >= 3, "Rudrabhishek should have service formats");
assert.ok(rudrabhishek.samagriGroups?.length >= 3, "Rudrabhishek should have samagri groups");
assert.ok(rudrabhishek.bookingGuide?.length >= 5, "Rudrabhishek should have booking steps");
assert.ok(rudrabhishek.faqs?.length >= 5, "Rudrabhishek should have FAQs");

const contactFormSource = await fs.readFile("components/ContactForm.jsx", "utf8");
assert.ok(contactFormSource.includes('name="website"'), "contact form should include honeypot field");
assert.ok(contactFormSource.includes('trackEvent("generate_lead"'), "successful booking should track generate_lead");
assert.equal(/trackEvent\([^)]*(phone|email|name)/i.test(contactFormSource), false, "analytics should not send PII field names");

const rajNagarProfileSource = await fs.readFile(
  "app/pandit-ji/acharya-sursain-brijwasi-raj-nagar-extension-ghaziabad/page.jsx",
  "utf8",
);
assert.ok(
  rajNagarProfileSource.includes("Raj Nagar Extension, Ghaziabad"),
  "Raj Nagar Extension profile should have local page copy",
);
assert.ok(
  rajNagarProfileSource.includes("profileJsonLd"),
  "Raj Nagar Extension profile should include structured data",
);

console.log("Booking flow validation passed.");
