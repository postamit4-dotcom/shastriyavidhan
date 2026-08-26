import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

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
    message: clean(body.message),
  };

  if (
    !submission.name ||
    !submission.phone ||
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

  await fs.mkdir(storageDir, { recursive: true });
  await fs.appendFile(storageFile, `${JSON.stringify(submission)}\n`, "utf8");

  return NextResponse.json({ ok: true, requestId });
}
