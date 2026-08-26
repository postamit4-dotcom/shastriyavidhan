"use client";

import { useState } from "react";
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
  samagri: "Complete Samagri Package Arranged",
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
  { id: "Online", title: "Online Video", desc: "Live 1-on-1 HD session" },
  { id: "Temple", title: "At Temple", desc: "Teerth coordination" },
];

const cityOptions = ["Noida", "Delhi", "Gurugram", "Ujjain", "Online / Worldwide", "Other City"];

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
  "Complete Samagri Package Arranged",
  "Provide Samagri Checklist (I will arrange)",
  "Need Guidance on Samagri Checklist",
];

export default function ContactForm({ prefilledService = "" }) {
  const [formData, setFormData] = useState({
    ...initialState,
    service: prefilledService || initialState.service,
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    if (!validateStep(2)) {
      setCurrentStep(2);
      return;
    }

    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      }).catch(() => null);
    } catch {
      // Graceful fallback
    }

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 500);
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
          Your request for <strong>{formData.service}</strong> on <strong>{formData.preferredDate}</strong> has been logged. Our spiritual desk is reviewing Acharya availability and will connect with you via WhatsApp or phone.
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
            Fast-Track on WhatsApp
          </a>
          <button
            type="button"
            className="apple-btn-pill apple-btn-secondary"
            onClick={() => {
              setSubmitted(false);
              setCurrentStep(0);
              setFormData(initialState);
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
                {servicePages.map((s) => (
                  <option key={s.slug} value={s.title}>
                    {s.title} ({s.category})
                  </option>
                ))}
                <option value="Griha Pravesh & Vastu Puja">Griha Pravesh &amp; Vastu Puja</option>
                <option value="Satyanarayan Katha & Hawan">Satyanarayan Katha &amp; Hawan</option>
                <option value="Sundarkand Path">Sundarkand Path</option>
                <option value="Navgrah Shanti Hawan">Navgrah Shanti Hawan</option>
                <option value="Custom Vedic Ritual">Custom Vedic Ritual</option>
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
                />
                {errors.preferredDate && (
                  <span style={{ fontSize: "0.8rem", color: "var(--apple-red)", marginTop: "2px" }}>
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
              We will share the preparation checklist and confirm Acharya schedule.
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
                />
                {errors.name && (
                  <span style={{ fontSize: "0.8rem", color: "var(--apple-red)", marginTop: "2px" }}>
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
                />
                {errors.phone && (
                  <span style={{ fontSize: "0.8rem", color: "var(--apple-red)", marginTop: "2px" }}>
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>

            <div className="apple-form-group">
              <label htmlFor="apple-address" className="apple-form-label">
                {formData.mode === "Home" ? "Society / Address (Delhi NCR)" : "City / Country"}
              </label>
              <input
                id="apple-address"
                type="text"
                placeholder={formData.mode === "Home" ? "e.g. Sector 78, Noida / Vasant Kunj, New Delhi" : "e.g. London, UK"}
                className="apple-form-input"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="apple-form-group">
              <label htmlFor="apple-notes" className="apple-form-label">
                Gotra or Special Notes (Optional)
              </label>
              <textarea
                id="apple-notes"
                rows={2}
                placeholder="Mention gotra or any specific puja requirements..."
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
                <strong>No immediate payment required.</strong> Our team confirms Acharya availability first.
              </span>
            </div>
          </div>
        )}

        {/* Action Controls */}
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
