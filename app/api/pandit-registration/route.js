import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONSENT_VERSION = "pandit-registration-v1-2026-09-06";
const SOURCE_PAGE = "/pandit-registration";
const MAX_ARRAY_ITEMS = 32;
const MAX_BODY_BYTES = 24_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const DUPLICATE_WINDOW_MS = 30 * 1000;
const allowedOriginHostnames = new Set([
  "www.shastriyavidhan.com",
  "shastriyavidhan.com",
  "localhost",
  "127.0.0.1",
]);

const allowedFields = new Set([
  "fullName",
  "mobile",
  "sameAsMobile",
  "whatsapp",
  "email",
  "city",
  "state",
  "pinCode",
  "preferredContactLanguage",
  "professionalTitle",
  "yearsExperience",
  "education",
  "institution",
  "introduction",
  "languagesSpoken",
  "pujaLanguages",
  "templeAssociation",
  "hasExperienceEvidence",
  "specializations",
  "otherSpecialization",
  "serviceModes",
  "primaryServiceCity",
  "areasServed",
  "travelRadius",
  "availableDays",
  "preferredTimeRanges",
  "ownTransport",
  "canArrangeSamagri",
  "canProvideSamagriChecklist",
  "nriVideoCall",
  "pricingNotes",
  "accuracyConsent",
  "conductConsent",
  "privacyConsent",
  "marketingConsent",
  "sourcePage",
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "website",
]);

const fieldLimits = {
  fullName: 120,
  mobile: 24,
  whatsapp: 24,
  email: 180,
  city: 100,
  state: 100,
  pinCode: 12,
  preferredContactLanguage: 80,
  professionalTitle: 80,
  yearsExperience: 40,
  education: 900,
  institution: 160,
  introduction: 900,
  templeAssociation: 240,
  hasExperienceEvidence: 16,
  otherSpecialization: 180,
  primaryServiceCity: 100,
  areasServed: 500,
  travelRadius: 80,
  ownTransport: 16,
  canArrangeSamagri: 24,
  canProvideSamagriChecklist: 16,
  nriVideoCall: 16,
  pricingNotes: 500,
  sourcePage: 120,
  utmSource: 80,
  utmMedium: 80,
  utmCampaign: 120,
  website: 180,
};

const requiredTextFields = [
  "fullName",
  "mobile",
  "city",
  "state",
  "pinCode",
  "preferredContactLanguage",
  "professionalTitle",
  "yearsExperience",
  "education",
  "introduction",
  "hasExperienceEvidence",
  "primaryServiceCity",
  "areasServed",
  "travelRadius",
  "canArrangeSamagri",
  "canProvideSamagriChecklist",
  "nriVideoCall",
];

const rateLimitStore = globalThis.__svPanditRegistrationRateLimit || new Map();
const duplicateStore = globalThis.__svPanditRegistrationDuplicateGuard || new Map();
globalThis.__svPanditRegistrationRateLimit = rateLimitStore;
globalThis.__svPanditRegistrationDuplicateGuard = duplicateStore;

function pruneStore(store, now, ttl) {
  for (const [key, value] of store.entries()) {
    const lastSeen = Array.isArray(value) ? value.at(-1) : value;
    if (!lastSeen || now - lastSeen > ttl) store.delete(key);
  }
}

function cleanText(value, max = 500) {
  if (typeof value !== "string") return "";

  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function hasOversizedText(value, max = 500) {
  return typeof value === "string" && value.trim().length > max;
}

function normalizePhone(value) {
  const digits = cleanText(value, 24).replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

function normalizeEmail(value) {
  return cleanText(value, fieldLimits.email).toLowerCase();
}

function normalizeArray(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => cleanText(item, 120))
    .filter(Boolean)
    .slice(0, MAX_ARRAY_ITEMS);
}

function addFieldError(fieldErrors, field, message) {
  if (!fieldErrors[field]) fieldErrors[field] = message;
}

function createApplicationId(now = new Date()) {
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `SVP-${date}-${suffix}`;
}

function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for") || "";
  return cleanText(forwarded.split(",")[0] || request.headers.get("x-real-ip") || "unknown", 80);
}

function checkRateLimit(ip, now) {
  pruneStore(rateLimitStore, now, RATE_LIMIT_WINDOW_MS);
  const hits = rateLimitStore.get(ip)?.filter((time) => now - time < RATE_LIMIT_WINDOW_MS) || [];
  hits.push(now);
  rateLimitStore.set(ip, hits);
  return hits.length <= RATE_LIMIT_MAX;
}

function checkDuplicate(key, now) {
  pruneStore(duplicateStore, now, DUPLICATE_WINDOW_MS);
  const previous = duplicateStore.get(key);
  duplicateStore.set(key, now);
  return !previous || now - previous > DUPLICATE_WINDOW_MS;
}

function isAllowedOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const url = new URL(origin);
    return allowedOriginHostnames.has(url.hostname);
  } catch {
    return false;
  }
}

export function validatePanditRegistrationPayload(body, { now = new Date() } = {}) {
  const fieldErrors = {};

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, fieldErrors: { form: "Submit the application form again." } };
  }

  const unexpectedFields = Object.keys(body).filter((field) => !allowedFields.has(field));
  if (unexpectedFields.length > 0) {
    return { ok: false, fieldErrors: { form: "Submit the application form again." } };
  }

  if (cleanText(body.website, fieldLimits.website)) {
    return { ok: false, fieldErrors: { form: "Submit the application form again." } };
  }

  const text = {};
  for (const field of Object.keys(fieldLimits)) {
    if (hasOversizedText(body[field], fieldLimits[field])) {
      addFieldError(fieldErrors, field, "Please shorten this answer.");
    }
    text[field] = cleanText(body[field], fieldLimits[field]);
  }

  const mobile = normalizePhone(body.mobile);
  const whatsapp = body.sameAsMobile ? mobile : normalizePhone(body.whatsapp);
  const email = normalizeEmail(body.email);
  const pinCode = text.pinCode.replace(/\D/g, "");
  const arrays = {
    languagesSpoken: normalizeArray(body.languagesSpoken),
    pujaLanguages: normalizeArray(body.pujaLanguages),
    specializations: normalizeArray(body.specializations),
    serviceModes: normalizeArray(body.serviceModes),
    availableDays: normalizeArray(body.availableDays),
    preferredTimeRanges: normalizeArray(body.preferredTimeRanges),
  };

  for (const field of requiredTextFields) {
    if (!text[field]) addFieldError(fieldErrors, field, "This field is required.");
  }

  if (!/^[6-9]\d{9}$/.test(mobile)) {
    addFieldError(fieldErrors, "mobile", "Enter a valid 10-digit Indian mobile number.");
  }

  if (!body.sameAsMobile && text.whatsapp && !/^[6-9]\d{9}$/.test(whatsapp)) {
    addFieldError(fieldErrors, "whatsapp", "Enter a valid 10-digit WhatsApp number.");
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    addFieldError(fieldErrors, "email", "Enter a valid email address.");
  }

  if (!/^\d{6}$/.test(pinCode)) {
    addFieldError(fieldErrors, "pinCode", "Enter a valid 6-digit PIN code.");
  }

  if (text.education.length > 0 && text.education.length < 8) {
    addFieldError(fieldErrors, "education", "Tell us about your Vedic education or training.");
  }

  if (text.introduction.length > 0 && text.introduction.length < 25) {
    addFieldError(fieldErrors, "introduction", "Write a short professional introduction.");
  }

  if (arrays.languagesSpoken.length === 0) {
    addFieldError(fieldErrors, "languagesSpoken", "Select at least one spoken language.");
  }

  if (arrays.pujaLanguages.length === 0) {
    addFieldError(fieldErrors, "pujaLanguages", "Select at least one puja language.");
  }

  if (arrays.specializations.length === 0 && !text.otherSpecialization) {
    addFieldError(fieldErrors, "specializations", "Choose at least one puja specialization.");
  }

  if (arrays.serviceModes.length === 0) {
    addFieldError(fieldErrors, "serviceModes", "Choose at least one service mode.");
  }

  if (arrays.availableDays.length === 0) {
    addFieldError(fieldErrors, "availableDays", "Choose at least one available day.");
  }

  if (arrays.preferredTimeRanges.length === 0) {
    addFieldError(fieldErrors, "preferredTimeRanges", "Choose at least one preferred time range.");
  }

  if (!body.accuracyConsent) {
    addFieldError(fieldErrors, "accuracyConsent", "Confirm that your submitted details are accurate.");
  }

  if (!body.conductConsent) {
    addFieldError(fieldErrors, "conductConsent", "Agree to respectful conduct and transparent communication.");
  }

  if (!body.privacyConsent) {
    addFieldError(fieldErrors, "privacyConsent", "Please accept the Privacy Policy and Terms to submit your application.");
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  const application = {
    applicationId: createApplicationId(now),
    createdAt: now.toISOString(),
    status: "pending_review",
    consentVersion: CONSENT_VERSION,
    sourcePage: text.sourcePage === SOURCE_PAGE ? SOURCE_PAGE : SOURCE_PAGE,
    campaign: {
      source: text.utmSource || "",
      medium: text.utmMedium || "",
      campaign: text.utmCampaign || "",
    },
    applicant: {
      fullName: text.fullName,
      mobile,
      whatsapp,
      email,
      city: text.city,
      state: text.state,
      pinCode,
      preferredContactLanguage: text.preferredContactLanguage,
    },
    professionalBackground: {
      title: text.professionalTitle,
      yearsExperience: text.yearsExperience,
      education: text.education,
      institution: text.institution,
      introduction: text.introduction,
      languagesSpoken: arrays.languagesSpoken,
      pujaLanguages: arrays.pujaLanguages,
      templeAssociation: text.templeAssociation,
      hasExperienceEvidence: text.hasExperienceEvidence,
    },
    servicesAndAvailability: {
      specializations: [...arrays.specializations, text.otherSpecialization].filter(Boolean),
      serviceModes: arrays.serviceModes,
      primaryServiceCity: text.primaryServiceCity,
      areasServed: text.areasServed,
      travelRadius: text.travelRadius,
      availableDays: arrays.availableDays,
      preferredTimeRanges: arrays.preferredTimeRanges,
      ownTransport: text.ownTransport,
      canArrangeSamagri: text.canArrangeSamagri,
      canProvideSamagriChecklist: text.canProvideSamagriChecklist,
      nriVideoCall: text.nriVideoCall,
      pricingNotes: text.pricingNotes,
    },
    consents: {
      accuracy: Boolean(body.accuracyConsent),
      conduct: Boolean(body.conductConsent),
      privacyAndTerms: Boolean(body.privacyConsent),
      marketing: Boolean(body.marketingConsent),
    },
  };

  return { ok: true, application };
}

export async function POST(request) {
  const now = new Date();
  const ip = getClientIp(request);

  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Submit the application form again." }, { status: 403 });
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Submit the application form again." }, { status: 415 });
  }

  if (!checkRateLimit(ip, now.getTime())) {
    return NextResponse.json(
      { error: "We could not submit your application. Your information has been preserved - please try again later." },
      { status: 429 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Please shorten the application before submitting." },
      { status: 413 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Submit the application form again." }, { status: 400 });
  }

  const validation = validatePanditRegistrationPayload(body, { now });

  if (!validation.ok) {
    return NextResponse.json(
      { error: "Please review the highlighted fields.", fieldErrors: validation.fieldErrors },
      { status: 400 },
    );
  }

  const duplicateKey = `${ip}:${validation.application.applicant.mobile}`;
  if (!checkDuplicate(duplicateKey, now.getTime())) {
    return NextResponse.json(
      { error: "Please wait a moment before submitting another application." },
      { status: 429 },
    );
  }

  const storageDir = path.join(process.cwd(), "storage");
  const storageFile = path.join(storageDir, "pandit-applications.jsonl");

  try {
    await fs.mkdir(storageDir, { recursive: true });
    await fs.appendFile(storageFile, `${JSON.stringify(validation.application)}\n`, "utf8");
  } catch {
    return NextResponse.json(
      { error: "We could not submit your application. Your information has been preserved - please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    applicationId: validation.application.applicationId,
    status: validation.application.status,
  });
}
