"use client";

import { useEffect, useState } from "react";
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Loader2, 
  MessageCircle, 
  ShieldCheck 
} from "lucide-react";
import { contact, servicePages } from "@/lib/site-data";

const initialState = {
  service: "Rudrabhishek Puja",
  mode: "Home",
  city: "Noida",
  preferredDate: "",
  preferredTime: "Morning (08:00 AM - 11:30 AM)",
  language: "Hindi & Sanskrit",
  samagri: "Please confirm samagri options",
  name: "",
  phone: "",
  email: "",
  address: "",
  instructions: "",
};

const steps = [
  { id: 0, label: "1. Service" },
  { id: 1, label: "2. Schedule" },
  { id: 2, label: "3. Details" },
  { id: 3, label: "4. Review" },
];

const modeOptions = [
  { id: "Home", title: "Puja at Home", desc: "Pandit Ji visits residence" },
  { id: "Online", title: "Online Video", desc: "Video guidance if suitable" },
  { id: "Temple", title: "At Temple", desc: "Reviewed teerth request" },
];

const cityOptions = ["Noida", "Delhi", "Ghaziabad", "Gurugram", "Ujjain", "Online / Worldwide", "Other City"];

const timeSlotOptions = [
  "Morning (08:00 AM - 11:30 AM)",
  "Early Morning (06:00 AM - 08:00 AM)",
  "Afternoon (12:00 PM - 03:00 PM)",
  "Evening / Pradosh (05:30 PM - 08:30 PM)",
  "Flexible / Auspicious Muhurat",
];

const languageOptions = [
  "Hindi & Sanskrit",
  "Sanskrit Recitation with English Guidance",
  "Regional (UP / Bihar / Maithili / Garhwali)",
  "Regional (Bengali / Marathi / Gujarati)",
];

const samagriOptions = [
  "Please confirm samagri options",
  "Provide Samagri Checklist (I will arrange)",
  "Need Guidance on Samagri Checklist",
];

function normalizeServiceOption(option) {
  if (!option) return null;
  if (typeof option === "string") return { value: option, label: option };
  return option;
}

function uniqueServiceOptions(options) {
  const seen = new Set();
  return options.map(normalizeServiceOption).filter((option) => {
    if (!option?.value || seen.has(option.value)) return false;
    seen.add(option.value);
    return true;
  });
}

export default function ContactForm({
  prefilledService = "",
  prefilledMode = "",
  prefilledCity = "",
  serviceOptions = [],
  includeDefaultServiceOptions = true,
}) {
  const defaultFormState = {
    ...initialState,
    service: prefilledService || initialState.service,
    mode: prefilledMode || initialState.mode,
    city: prefilledCity || initialState.city,
  };
  const defaultServiceOptions = includeDefaultServiceOptions
    ? [
        ...servicePages.map((s) => ({
          value: s.title,
          label: `${s.title} (${s.category})`,
        })),
        { value: "Griha Pravesh & Vastu Puja", label: "Griha Pravesh & Vastu Puja" },
        { value: "Satyanarayan Katha & Hawan", label: "Satyanarayan Katha & Hawan" },
        { value: "Sundarkand Path", label: "Sundarkand Path" },
        { value: "Navgrah Shanti Hawan", label: "Navgrah Shanti Hawan" },
        { value: "Custom Vedic Ritual", label: "Custom Vedic Ritual" },
      ]
    : [];
  const serviceSelectOptions = uniqueServiceOptions([
    prefilledService ? { value: prefilledService, label: prefilledService } : null,
    ...serviceOptions,
    ...defaultServiceOptions,
  ]);
  const [formData, setFormData] = useState({
    ...defaultFormState,
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [prefillNotice, setPrefillNotice] = useState("");

  useEffect(() => {
    const handleBookingPrefill = (event) => {
      const detail = event.detail || {};
      const selectionLines = [
        detail.packageName ? `Requested package: ${detail.packageName}` : "",
        detail.formatName ? `Requested format: ${detail.formatName}` : "",
        detail.note || "",
      ].filter(Boolean);

      setSubmitted(false);
      setSubmitError("");
      setErrors({});
      setCurrentStep(0);
      setPrefillNotice(detail.notice || "Selection added. Review the booking details below.");
      setFormData((previous) => {
        const existingNotes = previous.instructions
          .split("\n")
          .filter(
            (line) =>
              !line.startsWith("Requested package:") &&
              !line.startsWith("Requested format:") &&
              !line.startsWith("Selected scope note:"),
          )
          .join("\n")
          .trim();

        return {
          ...previous,
          service: detail.service || previous.service,
          mode: detail.mode || previous.mode,
          city: detail.city || previous.city,
          instructions: [selectionLines.join("\n"), existingNotes].filter(Boolean).join("\n"),
        };
      });
    };

    window.addEventListener("booking-prefill", handleBookingPrefill);
    return () => window.removeEventListener("booking-prefill", handleBookingPrefill);
  }, []);

  const validateStep = (step) => {
    const errs = {};
    if (step === 0) {
      if (!formData.service) errs.service = "Please select a puja.";
      if (!formData.mode) errs.mode = "Please choose a booking mode.";
      if (!formData.city) errs.city = "Please select your city.";
    } else if (step === 1) {
      if (!formData.preferredDate) errs.preferredDate = "Please choose your preferred date.";
    } else if (step === 2) {
      if (!formData.name.trim()) errs.name = "Please enter your name.";
      const phoneDigits = formData.phone.replace(/\D/g, "");
      if (!phoneDigits || phoneDigits.length < 10) {
        errs.phone = "Please enter a valid 10-digit mobile number.";
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSubmitError("");

    if (!validateStep(0)) {
      setCurrentStep(0);
      return;
    }

    if (!validateStep(1)) {
      setCurrentStep(1);
      return;
    }

    if (!validateStep(2)) {
      setCurrentStep(2);
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          message: formData.instructions,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        let message = "The request could not be submitted. Please try WhatsApp or call the booking desk.";

        try {
          const result = await response.json();
          if (result?.error) message = result.error;
        } catch {
          // Keep the generic fallback message.
        }

        setSubmitError(message);
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("The request could not be submitted. Please try WhatsApp or call the booking desk.");
    } finally {
      setSubmitting(false);
    }
  };

  const generateWhatsAppMessage = () => {
    const text = `*Namaste Shastriya Vidhan!*
I want to book a Pandit Ji:
• *Puja:* ${formData.service}
• *Mode:* ${formData.mode}
• *City:* ${formData.city}
• *Preferred Date:* ${formData.preferredDate} (${formData.preferredTime})
• *Language:* ${formData.language}
• *Samagri:* ${formData.samagri}
• *Name:* ${formData.name}
• *Mobile:* ${formData.phone}
${formData.address ? `• *Address:* ${formData.address}` : ""}
${formData.instructions ? `• *Notes:* ${formData.instructions}` : ""}

Please check Pandit Ji availability and share the quote.`;

    return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  if (submitted) {
    return (
      <div className="apple-booking-card" style={{ textAlign: "center", padding: "48px 32px" }}>
        <div 
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "var(--radius-pill)",
            backgroundColor: "rgba(52, 199, 89, 0.12)",
            color: "var(--apple-green)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <Check size={32} />
        </div>
        <span className="apple-eyebrow" style={{ color: "var(--apple-green)" }}>
          Request Received
        </span>
        <h3 style={{ fontSize: "1.8rem", fontWeight: 700, margin: "8px 0 12px" }}>
          Thank you, {formData.name || "Devotee"}.
        </h3>
        <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", maxWidth: "520px", margin: "0 auto 28px" }}>
          Your request for <strong>{formData.service}</strong> on <strong>{formData.preferredDate}</strong> has been logged. The booking desk is reviewing Pandit Ji availability and will connect with you via WhatsApp or phone.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
          <a
            href={generateWhatsAppMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-btn-pill apple-btn-primary"
            style={{ padding: "12px 24px" }}
          >
            <MessageCircle size={17} />
            Share on WhatsApp
          </a>
          <button
            type="button"
            className="apple-btn-pill apple-btn-secondary"
            onClick={() => {
              setSubmitted(false);
              setCurrentStep(0);
              setSubmitError("");
              setFormData(defaultFormState);
            }}
          >
            Book Another Puja
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="apple-booking-card" id="booking-form-wrapper">
      {prefillNotice ? (
        <p className="form-status-info" role="status">
          {prefillNotice}
        </p>
      ) : null}

      {/* Apple-style Segmented Step Switcher */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div className="apple-segmented-control" role="tablist" aria-label="Booking steps">
          {steps.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={currentStep === s.id}
              className={`apple-segment-btn ${currentStep === s.id ? "active" : ""}`}
              onClick={() => {
                if (s.id < currentStep || validateStep(currentStep)) {
                  setCurrentStep(s.id);
                }
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} aria-label="Puja Booking Form">
        {/* STEP 0: Service & Mode */}
        {currentStep === 0 && (
          <div>
            <h3 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "6px" }}>
              Select Puja &amp; Mode
            </h3>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginBottom: "24px" }}>
              Choose your ritual and preferred attendance format.
            </p>

            <div className="apple-form-group">
              <label htmlFor="apple-service-select" className="apple-form-label">
                Puja Service
              </label>
              <select
                id="apple-service-select"
                className="apple-form-select"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                {serviceSelectOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="apple-form-group">
              <label className="apple-form-label">Booking Mode</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px" }}>
                {modeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    style={{
                      padding: "12px",
                      borderRadius: "var(--radius-inner)",
                      border: formData.mode === opt.id ? "1.5px solid var(--apple-blue)" : "1px solid var(--apple-line-light)",
                      backgroundColor: formData.mode === opt.id ? "var(--apple-blue-tint)" : "var(--apple-gray-bg)",
                      textAlign: "center",
                    }}
                    onClick={() => setFormData({ ...formData, mode: opt.id })}
                  >
                    <div style={{ fontWeight: 600, fontSize: "0.92rem", color: "var(--apple-dark)" }}>{opt.title}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "2px" }}>{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="apple-form-group">
              <label htmlFor="apple-city-select" className="apple-form-label">
                Location
              </label>
              <select
                id="apple-city-select"
                className="apple-form-select"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              >
                {cityOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* STEP 1: Date & Preferences */}
        {currentStep === 1 && (
          <div>
            <h3 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "6px" }}>
              Schedule &amp; Preferences
            </h3>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginBottom: "24px" }}>
              Select target date, preferred time slot, and language preference.
            </p>

            <div className="apple-form-grid-2">
              <div className="apple-form-group">
                <label htmlFor="apple-date" className="apple-form-label">
                  Preferred Date *
                </label>
                <input
                  id="apple-date"
                  type="date"
                  className="apple-form-input"
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  aria-invalid={errors.preferredDate ? "true" : undefined}
                  aria-describedby={errors.preferredDate ? "apple-date-error" : undefined}
                />
                {errors.preferredDate && (
                  <span id="apple-date-error" style={{ fontSize: "0.8rem", color: "var(--apple-red)", marginTop: "2px" }}>
                    {errors.preferredDate}
                  </span>
                )}
              </div>

              <div className="apple-form-group">
                <label htmlFor="apple-time" className="apple-form-label">
                  Time Slot
                </label>
                <select
                  id="apple-time"
                  className="apple-form-select"
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                >
                  {timeSlotOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="apple-form-grid-2">
              <div className="apple-form-group">
                <label htmlFor="apple-language" className="apple-form-label">
                  Language Preference
                </label>
                <select
                  id="apple-language"
                  className="apple-form-select"
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                >
                  {languageOptions.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div className="apple-form-group">
                <label htmlFor="apple-samagri" className="apple-form-label">
                  Samagri Option
                </label>
                <select
                  id="apple-samagri"
                  className="apple-form-select"
                  value={formData.samagri}
                  onChange={(e) => setFormData({ ...formData, samagri: e.target.value })}
                >
                  {samagriOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Contact Details */}
        {currentStep === 2 && (
          <div>
            <h3 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "6px" }}>
              Contact Details
            </h3>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginBottom: "24px" }}>
              The booking desk will share the preparation checklist and confirm Pandit Ji availability.
            </p>

            <div className="apple-form-grid-2">
              <div className="apple-form-group">
                <label htmlFor="apple-name" className="apple-form-label">
                  Full Name *
                </label>
                <input
                  id="apple-name"
                  type="text"
                  placeholder="e.g. Ramesh Sharma"
                  className="apple-form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  aria-invalid={errors.name ? "true" : undefined}
                  aria-describedby={errors.name ? "apple-name-error" : undefined}
                />
                {errors.name && (
                  <span id="apple-name-error" style={{ fontSize: "0.8rem", color: "var(--apple-red)", marginTop: "2px" }}>
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="apple-form-group">
                <label htmlFor="apple-phone" className="apple-form-label">
                  Mobile Number *
                </label>
                <input
                  id="apple-phone"
                  type="tel"
                  placeholder="e.g. 9876543210"
                  className="apple-form-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  aria-invalid={errors.phone ? "true" : undefined}
                  aria-describedby={errors.phone ? "apple-phone-error" : undefined}
                />
                {errors.phone && (
                  <span id="apple-phone-error" style={{ fontSize: "0.8rem", color: "var(--apple-red)", marginTop: "2px" }}>
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>

            <div className="apple-form-group">
              <label htmlFor="apple-address" className="apple-form-label">
                {formData.mode === "Home" ? "Locality / Society / Address" : "City / Country"}
              </label>
              <input
                id="apple-address"
                type="text"
                placeholder={formData.mode === "Home" ? "e.g. Indirapuram, Ghaziabad / Sector 78, Noida" : "e.g. Jaipur, India / Toronto, Canada"}
                className="apple-form-input"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="apple-form-group">
              <label htmlFor="apple-notes" className="apple-form-label">
                Notes / Occasion (Optional)
              </label>
              <textarea
                id="apple-notes"
                rows={2}
                placeholder="Mention occasion, access details, samagri needs, havan or musical request. Avoid sharing private medical, financial, or sensitive details."
                className="apple-form-textarea"
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* STEP 3: Review */}
        {currentStep === 3 && (
          <div>
            <h3 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "6px" }}>
              Review Summary
            </h3>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
              Please review your puja request summary.
            </p>

            <div style={{ backgroundColor: "var(--apple-gray-bg)", borderRadius: "var(--radius-inner)", padding: "18px 20px", marginBottom: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "0.9rem" }}>
                <div>
                  <span style={{ color: "var(--text-tertiary)", display: "block", fontSize: "0.75rem", textTransform: "uppercase" }}>Puja</span>
                  <strong>{formData.service}</strong>
                </div>
                <div>
                  <span style={{ color: "var(--text-tertiary)", display: "block", fontSize: "0.75rem", textTransform: "uppercase" }}>Format</span>
                  <strong>{formData.mode} ({formData.city})</strong>
                </div>
                <div>
                  <span style={{ color: "var(--text-tertiary)", display: "block", fontSize: "0.75rem", textTransform: "uppercase" }}>Date &amp; Slot</span>
                  <strong>{formData.preferredDate || "Not chosen"} ({formData.preferredTime})</strong>
                </div>
                <div>
                  <span style={{ color: "var(--text-tertiary)", display: "block", fontSize: "0.75rem", textTransform: "uppercase" }}>Contact</span>
                  <strong>{formData.name} ({formData.phone})</strong>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px", backgroundColor: "var(--apple-blue-tint)", borderRadius: "var(--radius-inner)", marginBottom: "20px" }}>
              <ShieldCheck size={18} style={{ color: "var(--apple-blue)", flexShrink: 0 }} />
              <span style={{ fontSize: "0.85rem", color: "var(--apple-dark)" }}>
                <strong>No immediate payment required.</strong> The team confirms Pandit Ji availability first.
              </span>
            </div>
          </div>
        )}

        {/* Action Controls */}
        {submitError ? (
          <p className="form-status-error" role="alert">
            {submitError}
          </p>
        ) : null}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid var(--apple-line-light)" }}>
          {currentStep > 0 ? (
            <button
              type="button"
              className="apple-btn-pill apple-btn-secondary"
              onClick={handleBack}
            >
              <ChevronLeft size={16} />
              Back
            </button>
          ) : (
            <a
              href={contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-link apple-link-sm"
            >
              <span>Questions? WhatsApp us</span>
              <ChevronRight size={13} className="apple-link-chevron" />
            </a>
          )}

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              className="apple-btn-pill apple-btn-primary"
              onClick={handleNext}
            >
              <span>Continue</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-btn-pill apple-btn-secondary"
              >
                <MessageCircle size={16} />
                WhatsApp Request
              </a>
              <button
                type="button"
                className="apple-btn-pill apple-btn-primary"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="spin" />
                    Submitting...
                  </>
                ) : (
                  <>Submit Request</>
                )}
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
