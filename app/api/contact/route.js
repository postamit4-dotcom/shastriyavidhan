import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function clean(value) {
  return typeof value === "string" ? value.trim().slice(0, 2000) : "";
}

function shortId() {
  return `SV-${Date.now().toString(36).toUpperCase()}`;
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const requestId = shortId();
  const submission = {
    requestId,
    createdAt: new Date().toISOString(),
    name: clean(body.name),
    phone: clean(body.phone),
    whatsapp: clean(body.whatsapp),
    email: clean(body.email),
    service: clean(body.service),
    mode: clean(body.mode),
    city: clean(body.city),
    preferredDate: clean(body.preferredDate),
    preferredTime: clean(body.preferredTime),
    alternateDate: clean(body.alternateDate),
    language: clean(body.language),
    tradition: clean(body.tradition),
    samagri: clean(body.samagri),
    address: clean(body.address),
    instructions: clean(body.instructions || body.message),
  };

  const phoneDigits = submission.phone.replace(/\D/g, "");

  if (
    !submission.name ||
    phoneDigits.length < 10 ||
    !submission.service ||
    !submission.mode ||
    !submission.city ||
    !submission.preferredDate ||
    !submission.preferredTime ||
    !submission.language ||
    !submission.samagri
  ) {
    return NextResponse.json(
      { error: "Please complete the required booking details." },
      { status: 400 },
    );
  }

  const storageDir = path.join(process.cwd(), "storage");
  const storageFile = path.join(storageDir, "contact-submissions.jsonl");

  try {
    await fs.mkdir(storageDir, { recursive: true });
    await fs.appendFile(storageFile, `${JSON.stringify(submission)}\n`, "utf8");
  } catch {
    return NextResponse.json(
      { error: "The booking request could not be saved. Please use WhatsApp or call the booking desk." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, requestId });
}
