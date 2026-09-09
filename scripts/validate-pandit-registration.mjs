import assert from "node:assert/strict";
import { POST, validatePanditRegistrationPayload } from "../app/api/pandit-registration/route.js";
import { footerNavigationGroups, getNodeByHref, sitemapNodes } from "../lib/site-registry.js";

const validPayload = {
  fullName: "Acharya Test <script>",
  mobile: "+91 9876543210",
  sameAsMobile: true,
  whatsapp: "",
  email: "ACHARYA@example.com",
  city: "Ghaziabad",
  state: "Uttar Pradesh",
  pinCode: "201014",
  preferredContactLanguage: "Hindi",
  professionalTitle: "Pandit Ji",
  yearsExperience: "8-15 years",
  education: "Studied Vedic rituals with a family teacher and temple guidance.",
  institution: "Family teacher",
  introduction: "I conduct Vedic puja services with clear samagri guidance and family participation.",
  languagesSpoken: ["Hindi", "Sanskrit"],
  pujaLanguages: ["Sanskrit chanting", "Hindi explanation"],
  templeAssociation: "Local temple association",
  hasExperienceEvidence: "Yes",
  specializations: ["Rudrabhishek", "Satyanarayan Katha"],
  otherSpecialization: "",
  serviceModes: ["At customer's home", "Online/video call"],
  primaryServiceCity: "Ghaziabad",
  areasServed: "Indirapuram, Vasundhara, Vaishali",
  travelRadius: "City-wide",
  availableDays: ["Monday", "Sunday"],
  preferredTimeRanges: ["Morning", "Evening"],
  ownTransport: "Yes",
  canArrangeSamagri: "Depends on puja",
  canProvideSamagriChecklist: "Yes",
  nriVideoCall: "Yes",
  pricingNotes: "Subject to discussion after review.",
  accuracyConsent: true,
  conductConsent: true,
  privacyConsent: true,
  marketingConsent: false,
  sourcePage: "/pandit-registration",
  utmSource: "test",
  utmMedium: "script",
  utmCampaign: "pandit-registration",
  website: "",
};

function clonePayload(overrides = {}) {
  return {
    ...structuredClone(validPayload),
    ...overrides,
  };
}

const validResult = validatePanditRegistrationPayload(clonePayload(), {
  now: new Date("2026-09-06T00:00:00.000Z"),
});
assert.equal(validResult.ok, true, "valid payload should pass validation");
assert.equal(validResult.application.status, "pending_review");
assert.equal(validResult.application.applicant.mobile, "9876543210");
assert.equal(validResult.application.applicant.email, "acharya@example.com");
assert.equal(validResult.application.sourcePage, "/pandit-registration");
assert.equal(validResult.application.applicant.fullName.includes("<script>"), false);

const unexpected = validatePanditRegistrationPayload(clonePayload({ admin: true }));
assert.equal(unexpected.ok, false, "unexpected fields should fail");
assert.equal(Boolean(unexpected.fieldErrors.form), true);

const honeypot = validatePanditRegistrationPayload(clonePayload({ website: "https://spam.example" }));
assert.equal(honeypot.ok, false, "honeypot should fail");

const invalidPhone = validatePanditRegistrationPayload(clonePayload({ mobile: "12345" }));
assert.equal(invalidPhone.ok, false, "invalid mobile should fail");
assert.equal(Boolean(invalidPhone.fieldErrors.mobile), true);

const missingConsent = validatePanditRegistrationPayload(clonePayload({ privacyConsent: false }));
assert.equal(missingConsent.ok, false, "privacy consent should be required");
assert.equal(Boolean(missingConsent.fieldErrors.privacyConsent), true);

const oversized = validatePanditRegistrationPayload(clonePayload({ introduction: "x".repeat(1000) }));
assert.equal(oversized.ok, false, "oversized text should fail");
assert.equal(Boolean(oversized.fieldErrors.introduction), true);

const wrongOriginResponse = await POST(
  new Request("https://www.shastriyavidhan.com/api/pandit-registration", {
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
  new Request("https://www.shastriyavidhan.com/api/pandit-registration", {
    method: "POST",
    headers: {
      origin: "https://www.shastriyavidhan.com",
      "content-type": "text/plain",
    },
    body: "plain text",
  }),
);
assert.equal(wrongContentTypeResponse.status, 415, "non-JSON request should be rejected");

const node = getNodeByHref("/pandit-registration");
assert.equal(node?.id, "pandit-registration", "registration page should be in the route registry");
assert.equal(node.indexable, true, "registration page should be indexable");
assert.equal(
  sitemapNodes().some((item) => item.href === "/pandit-registration"),
  true,
  "registration page should be in the XML sitemap",
);
assert.equal(
  sitemapNodes().some((item) => item.href.startsWith("/api/")),
  false,
  "private API routes should not be in sitemap",
);
assert.equal(
  footerNavigationGroups.some((group) => group.items.some((item) => item.href === "/pandit-registration")),
  true,
  "registration page should be linked from footer navigation",
);

console.log("Pandit registration validation passed.");
