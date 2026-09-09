import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 18_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 8;
const DUPLICATE_WINDOW_MS = 45 * 1000;
const SOURCE_PAGE = "/book-puja";
const allowedOriginHostnames = new Set([
  "www.shastriyavidhan.com",
  "shastriyavidhan.com",
  "localhost",
  "127.0.0.1",
]);

const allowedFields = new Set([
  "service",
  "mode",
  "city",
  "preferredDate",
  "preferredTime",
  "alternateDate",
  "language",
  "tradition",
  "samagri",
  "name",
  "phone",
  "whatsapp",
  "email",
  "address",
  "instructions",
  "message",
  "submittedAt",
  "sourcePage",
  "ctaLocation",
  "website",
]);

const fieldLimits = {
  service: 160,
  mode: 60,
  city: 100,
  preferredDate: 40,
  preferredTime: 120,
  alternateDate: 40,
  language: 120,
  tradition: 160,
  samagri: 160,
  name: 120,
  phone: 32,
  whatsapp: 32,
  email: 180,
  address: 500,
  instructions: 1200,
  message: 1200,
  submittedAt: 40,
  sourcePage: 120,
  ctaLocation: 80,
  website: 180,
};

const rateLimitStore = globalThis.__svContactRateLimit || new Map();
const duplicateStore = globalThis.__svContactDuplicateGuard || new Map();
globalThis.__svContactRateLimit = rateLimitStore;
globalThis.__svContactDuplicateGuard = duplicateStore;

function shortId() {
  return `SV-${Date.now().toString(36).toUpperCase()}`;
}

function pruneStore(store, now, ttl) {
  for (const [key, value] of store.entries()) {
    const lastSeen = Array.isArray(value) ? value.at(-1) : value;
    if (!lastSeen || now - lastSeen > ttl) store.delete(key);
  }
}

function clean(value, max = 500) {
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
  return clean(value, fieldLimits.phone).replace(/[^\d+]/g, "").replace(/(?!^)\+/g, "");
}

function normalizeEmail(value) {
  return clean(value, fieldLimits.email).toLowerCase();
}

function addFieldError(fieldErrors, field, message) {
  if (!fieldErrors[field]) fieldErrors[field] = message;
}

function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for") || "";
  return clean(forwarded.split(",")[0] || request.headers.get("x-real-ip") || "unknown", 80);
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

function validPhone(value) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function validDateInput(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function validateContactPayload(body, { now = new Date() } = {}) {
  const fieldErrors = {};

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, fieldErrors: { form: "Submit the booking request again." } };
  }

  const unexpectedFields = Object.keys(body).filter((field) => !allowedFields.has(field));
  if (unexpectedFields.length > 0) {
    return { ok: false, fieldErrors: { form: "Submit the booking request again." } };
  }

  if (clean(body.website, fieldLimits.website)) {
    return { ok: false, fieldErrors: { form: "Submit the booking request again." } };
  }

  const text = {};
  for (const [field, max] of Object.entries(fieldLimits)) {
    if (hasOversizedText(body[field], max)) {
      addFieldError(fieldErrors, field, "Please shorten this answer.");
    }
    text[field] = clean(body[field], max);
  }

  const phone = normalizePhone(body.phone);
  const whatsapp = normalizePhone(body.whatsapp);
  const email = normalizeEmail(body.email);

  if (!text.name) addFieldError(fieldErrors, "name", "Please enter your name.");
  if (!validPhone(phone)) addFieldError(fieldErrors, "phone", "Please enter a valid phone number.");
  if (!text.service) addFieldError(fieldErrors, "service", "Please select a puja.");
  if (!text.mode) addFieldError(fieldErrors, "mode", "Please choose a booking mode.");
  if (!text.city) addFieldError(fieldErrors, "city", "Please select your city.");
  if (!text.preferredDate || !validDateInput(text.preferredDate)) {
    addFieldError(fieldErrors, "preferredDate", "Please choose your preferred date.");
  }
  if (text.alternateDate && !validDateInput(text.alternateDate)) {
    addFieldError(fieldErrors, "alternateDate", "Please choose a valid alternate date.");
  }
  if (!text.preferredTime) addFieldError(fieldErrors, "preferredTime", "Please choose a time slot.");
  if (!text.language) addFieldError(fieldErrors, "language", "Please choose a language preference.");
  if (!text.samagri) addFieldError(fieldErrors, "samagri", "Please choose a samagri option.");
  if (whatsapp && !validPhone(whatsapp)) addFieldError(fieldErrors, "whatsapp", "Please enter a valid WhatsApp number.");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    addFieldError(fieldErrors, "email", "Please enter a valid email address.");
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  const submission = {
    requestId: shortId(),
    createdAt: now.toISOString(),
    status: "pending_review",
    sourcePage: text.sourcePage || SOURCE_PAGE,
    ctaLocation: text.ctaLocation || "",
    name: text.name,
    phone,
    whatsapp,
    email,
    service: text.service,
    mode: text.mode,
    city: text.city,
    preferredDate: text.preferredDate,
    preferredTime: text.preferredTime,
    alternateDate: text.alternateDate,
    language: text.language,
    tradition: text.tradition,
    samagri: text.samagri,
    address: text.address,
    instructions: text.instructions || text.message,
  };

  return { ok: true, submission };
}

export async function POST(request) {
  const now = new Date();
  const ip = getClientIp(request);

  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Submit the booking request again." }, { status: 403 });
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Submit the booking request again." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Please shorten the booking request before submitting." },
      { status: 413 },
    );
  }

  if (!checkRateLimit(ip, now.getTime())) {
    return NextResponse.json(
      { error: "The booking request could not be saved. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Submit the booking request again." }, { status: 400 });
  }

  const validation = validateContactPayload(body, { now });

  if (!validation.ok) {
    return NextResponse.json(
      { error: "Please complete the required booking details.", fieldErrors: validation.fieldErrors },
      { status: 400 },
    );
  }

  const duplicateKey = `${ip}:${validation.submission.phone}:${validation.submission.service}:${validation.submission.preferredDate}`;
  if (!checkDuplicate(duplicateKey, now.getTime())) {
    return NextResponse.json(
      { error: "Please wait a moment before submitting another booking request." },
      { status: 429 },
    );
  }

  const storageDir = path.join(process.cwd(), "storage");
  const storageFile = path.join(storageDir, "contact-submissions.jsonl");

  try {
    await fs.mkdir(storageDir, { recursive: true });
    await fs.appendFile(storageFile, `${JSON.stringify(validation.submission)}\n`, "utf8");
  } catch {
    return NextResponse.json(
      { error: "The booking request could not be saved. Please use WhatsApp or call the booking desk." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    requestId: validation.submission.requestId,
    status: validation.submission.status,
  });
}
