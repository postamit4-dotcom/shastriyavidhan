"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Loader2,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { contact } from "@/lib/site-data";
import { trackPanditRegistrationEvent } from "@/components/PanditRegistrationActions";

const initialFormData = {
  fullName: "",
  mobile: "",
  sameAsMobile: true,
  whatsapp: "",
  email: "",
  city: "",
  state: "",
  pinCode: "",
  preferredContactLanguage: "",
  professionalTitle: "",
  yearsExperience: "",
  education: "",
  institution: "",
  introduction: "",
  languagesSpoken: [],
  pujaLanguages: [],
  templeAssociation: "",
  hasExperienceEvidence: "",
  specializations: [],
  otherSpecialization: "",
  serviceModes: [],
  primaryServiceCity: "",
  areasServed: "",
  travelRadius: "",
  availableDays: [],
  preferredTimeRanges: [],
  ownTransport: "",
  canArrangeSamagri: "",
  canProvideSamagriChecklist: "",
  nriVideoCall: "",
  pricingNotes: "",
  accuracyConsent: false,
  conductConsent: false,
  privacyConsent: false,
  marketingConsent: false,
  website: "",
};

const steps = [
  { id: 0, label: "Contact" },
  { id: 1, label: "Experience" },
  { id: 2, label: "Services" },
  { id: 3, label: "Review" },
];

const stateOptions = [
  "Uttar Pradesh",
  "Delhi",
  "Haryana",
  "Rajasthan",
  "Madhya Pradesh",
  "Maharashtra",
  "Bihar",
  "Uttarakhand",
  "Other",
];

const contactLanguageOptions = ["Hindi", "English", "Hindi and English", "Sanskrit/Hindi", "Regional language"];

const professionalTitles = [
  "Pandit Ji",
  "Acharya",
  "Purohit",
  "Katha Vachak",
  "Vedic scholar",
  "Other relevant title",
];

const yearsOptions = [
  "Less than 1 year",
  "1-3 years",
  "4-7 years",
  "8-15 years",
  "16+ years",
];

const languageOptions = [
  "Hindi",
  "Sanskrit",
  "English",
  "Bhojpuri",
  "Maithili",
  "Braj",
  "Bengali",
  "Marathi",
  "Gujarati",
  "Tamil",
  "Telugu",
  "Kannada",
  "Other",
];

const pujaLanguageOptions = [
  "Sanskrit chanting",
  "Hindi explanation",
  "English coordination",
  "Regional language",
];

const specializationOptions = [
  "Griha Pravesh and Vastu Puja",
  "Satyanarayan Katha",
  "Rudrabhishek",
  "Mahamrityunjaya Jaap",
  "Sundarkand Path",
  "Ramcharitmanas Path",
  "Navgraha Shanti",
  "Graha Dosh Shanti",
  "Kaal Sarp Dosh Puja",
  "Mangal Dosh Puja",
  "Ganesh Puja",
  "Lakshmi Puja",
  "Durga Puja",
  "Navratri Puja",
  "Hanuman Puja",
  "Vivah Sanskar",
  "Namkaran Sanskar",
  "Annaprashan",
  "Mundan Sanskar",
  "Janeu or Upanayan Sanskar",
  "Shraddh and Pind Daan",
  "Festival Pujas",
  "Katha and Path services",
  "Havan",
  "Online video-guided puja",
];

const serviceModeOptions = [
  "At customer's home",
  "At temple",
  "Online/video call",
  "Outstation travel",
];

const travelRadiusOptions = [
  "Local area only",
  "Up to 5 km",
  "Up to 10 km",
  "Up to 25 km",
  "City-wide",
  "Outstation after review",
];

const dayOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Festival or muhurat dates",
];

const timeOptions = [
  "Early morning",
  "Morning",
  "Afternoon",
  "Evening",
  "Flexible by muhurat",
];

const yesNoOptions = ["Yes", "No"];
const samagriOptions = ["Yes", "No", "Depends on puja"];
const fieldStepMap = {
  fullName: 0,
  mobile: 0,
  whatsapp: 0,
  email: 0,
  city: 0,
  state: 0,
  pinCode: 0,
  preferredContactLanguage: 0,
  professionalTitle: 1,
  yearsExperience: 1,
  education: 1,
  institution: 1,
  introduction: 1,
  languagesSpoken: 1,
  pujaLanguages: 1,
  templeAssociation: 1,
  hasExperienceEvidence: 1,
  specializations: 2,
  otherSpecialization: 2,
  serviceModes: 2,
  primaryServiceCity: 2,
  areasServed: 2,
  travelRadius: 2,
  availableDays: 2,
  preferredTimeRanges: 2,
  ownTransport: 2,
  canArrangeSamagri: 2,
  canProvideSamagriChecklist: 2,
  nriVideoCall: 2,
  pricingNotes: 2,
  accuracyConsent: 3,
  conductConsent: 3,
  privacyConsent: 3,
};

function fieldId(name) {
  return `pandit-field-${name}`;
}

function errorId(name) {
  return `pandit-error-${name}`;
}

function HelpText({ id, children }) {
  if (!children) return null;
  return (
    <p className="registration-help" id={id}>
      {children}
    </p>
  );
}

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p className="field-error" id={id} role="alert">
      {message}
    </p>
  );
}

function RequiredMark({ optional = false }) {
  return optional ? <span className="optional-mark">Optional</span> : <span className="required-mark">Required</span>;
}

function TextField({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  help,
  type = "text",
  required = false,
  optional = false,
  autoComplete,
  inputMode,
  maxLength,
  disabled = false,
}) {
  const helpId = help ? `${fieldId(name)}-help` : undefined;
  const describedBy = [helpId, error ? errorId(name) : ""].filter(Boolean).join(" ") || undefined;

  return (
    <div className="registration-field">
      <div className="registration-label-row">
        <label htmlFor={fieldId(name)}>{label}</label>
        <RequiredMark optional={optional} />
      </div>
      <input
        id={fieldId(name)}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        onBlur={() => onBlur(name)}
        className="registration-input"
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
      />
      <HelpText id={helpId}>{help}</HelpText>
      <FieldError id={errorId(name)} message={error} />
    </div>
  );
}

function TextareaField({ name, label, value, onChange, onBlur, error, help, required = false, optional = false, rows = 4, maxLength }) {
  const helpId = help ? `${fieldId(name)}-help` : undefined;
  const describedBy = [helpId, error ? errorId(name) : ""].filter(Boolean).join(" ") || undefined;

  return (
    <div className="registration-field registration-field-wide">
      <div className="registration-label-row">
        <label htmlFor={fieldId(name)}>{label}</label>
        <RequiredMark optional={optional} />
      </div>
      <textarea
        id={fieldId(name)}
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        onBlur={() => onBlur(name)}
        className="registration-textarea"
        rows={rows}
        maxLength={maxLength}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
      />
      <HelpText id={helpId}>{help}</HelpText>
      <FieldError id={errorId(name)} message={error} />
    </div>
  );
}

function SelectField({ name, label, value, onChange, onBlur, error, help, options, required = false, optional = false }) {
  const helpId = help ? `${fieldId(name)}-help` : undefined;
  const describedBy = [helpId, error ? errorId(name) : ""].filter(Boolean).join(" ") || undefined;

  return (
    <div className="registration-field">
      <div className="registration-label-row">
        <label htmlFor={fieldId(name)}>{label}</label>
        <RequiredMark optional={optional} />
      </div>
      <select
        id={fieldId(name)}
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        onBlur={() => onBlur(name)}
        className="registration-select"
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <HelpText id={helpId}>{help}</HelpText>
      <FieldError id={errorId(name)} message={error} />
    </div>
  );
}

function CheckboxGroup({ name, legend, values, options, onToggle, error, help }) {
  const helpId = help ? `${fieldId(name)}-help` : undefined;
  const describedBy = [helpId, error ? errorId(name) : ""].filter(Boolean).join(" ") || undefined;

  return (
    <fieldset
      id={fieldId(name)}
      className="registration-fieldset"
      data-invalid={error ? "true" : undefined}
      tabIndex={error ? -1 : undefined}
      aria-describedby={describedBy}
    >
      <legend>
        {legend}
        <RequiredMark />
      </legend>
      <HelpText id={helpId}>{help}</HelpText>
      <div className="registration-checkbox-grid">
        {options.map((option) => {
          const checked = values.includes(option);

          return (
            <label className={`registration-choice ${checked ? "selected" : ""}`} key={option}>
              <input
                type="checkbox"
                name={name}
                value={option}
                checked={checked}
                onChange={() => onToggle(name, option)}
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
      <FieldError id={errorId(name)} message={error} />
    </fieldset>
  );
}

function RadioGroup({ name, legend, value, options, onChange, error, help, optional = false }) {
  const helpId = help ? `${fieldId(name)}-help` : undefined;
  const describedBy = [helpId, error ? errorId(name) : ""].filter(Boolean).join(" ") || undefined;

  return (
    <fieldset
      id={fieldId(name)}
      className="registration-fieldset"
      data-invalid={error ? "true" : undefined}
      tabIndex={error ? -1 : undefined}
      aria-describedby={describedBy}
    >
      <legend>
        {legend}
        <RequiredMark optional={optional} />
      </legend>
      <HelpText id={helpId}>{help}</HelpText>
      <div className="registration-choice-grid">
        {options.map((option) => (
          <label className={`registration-choice ${value === option ? "selected" : ""}`} key={option}>
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(name, option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      <FieldError id={errorId(name)} message={error} />
    </fieldset>
  );
}

function phoneDigits(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

function hasMeaningfulProgress(data) {
  return Object.entries(data).some(([key, value]) => {
    if (["sameAsMobile", "website"].includes(key)) return false;
    if (typeof value === "boolean") return value;
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(String(value || "").trim());
  });
}

function selectedList(values) {
  return values.length > 0 ? values.join(", ") : "Not selected";
}

export default function PanditRegistrationForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [campaign, setCampaign] = useState({ utmSource: "", utmMedium: "", utmCampaign: "" });
  const [pendingInvalidFocus, setPendingInvalidFocus] = useState(false);
  const successRef = useRef(null);

  const isDirty = useMemo(() => hasMeaningfulProgress(formData), [formData]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCampaign({
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || "",
    });

    trackPanditRegistrationEvent("pandit_registration_view");
  }, []);

  useEffect(() => {
    if (!isDirty || success) return undefined;

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty, success]);

  useEffect(() => {
    if (!pendingInvalidFocus) return undefined;

    const timer = window.setTimeout(() => {
      const firstInvalid = document.querySelector(
        '#pandit-registration-form [aria-invalid="true"], #pandit-registration-form [data-invalid="true"]',
      );

      if (firstInvalid instanceof HTMLElement) {
        firstInvalid.focus({ preventScroll: true });
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const headerHeight = document.querySelector(".apple-nav-shell")?.getBoundingClientRect().height || 0;
        const targetTop = Math.max(0, firstInvalid.getBoundingClientRect().top + window.scrollY - headerHeight - 24);

        window.scrollTo({
          top: targetTop,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }

      setPendingInvalidFocus(false);
    }, 80);

    return () => window.clearTimeout(timer);
  }, [pendingInvalidFocus, currentStep, errors]);

  useEffect(() => {
    if (success) successRef.current?.focus();
  }, [success]);

  function updateField(name, value) {
    setFormData((previous) => {
      const next = { ...previous, [name]: value };

      if (name === "mobile" && previous.sameAsMobile) {
        next.whatsapp = "";
      }

      return next;
    });

    setErrors((previous) => {
      const next = { ...previous };
      delete next[name];
      if (name === "sameAsMobile") delete next.whatsapp;
      if (Object.keys(next).length === Object.keys(previous).length) return previous;
      return next;
    });
    setSubmitError("");
  }

  function toggleArrayValue(name, value) {
    setFormData((previous) => {
      const currentValues = previous[name];
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return { ...previous, [name]: nextValues };
    });

    setErrors((previous) => {
      if (!previous[name]) return previous;
      const next = { ...previous };
      delete next[name];
      return next;
    });
  }

  function handleBlur(name) {
    const fieldError = validateStep(currentStep, formData)[name];
    setErrors((previous) => {
      const next = { ...previous };
      if (fieldError) {
        next[name] = fieldError;
      } else {
        delete next[name];
      }
      return next;
    });
  }

  function validateStep(stepIndex, data = formData) {
    const nextErrors = {};

    if (stepIndex === 0) {
      if (!data.fullName.trim()) nextErrors.fullName = "Enter your full name.";
      if (!/^[6-9]\d{9}$/.test(phoneDigits(data.mobile))) {
        nextErrors.mobile = "Enter a valid 10-digit Indian mobile number.";
      }
      if (!data.sameAsMobile && data.whatsapp.trim() && !/^[6-9]\d{9}$/.test(phoneDigits(data.whatsapp))) {
        nextErrors.whatsapp = "Enter a valid 10-digit WhatsApp number.";
      }
      if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
        nextErrors.email = "Enter a valid email address.";
      }
      if (!data.city.trim()) nextErrors.city = "Enter your city.";
      if (!data.state) nextErrors.state = "Select your state.";
      if (!/^\d{6}$/.test(data.pinCode.replace(/\D/g, ""))) nextErrors.pinCode = "Enter a valid 6-digit PIN code.";
      if (!data.preferredContactLanguage) {
        nextErrors.preferredContactLanguage = "Choose preferred contact language.";
      }
    }

    if (stepIndex === 1) {
      if (!data.professionalTitle) nextErrors.professionalTitle = "Choose your professional title.";
      if (!data.yearsExperience) {
        nextErrors.yearsExperience = "Tell us approximately how many years of experience you have.";
      }
      if (data.education.trim().length < 8) {
        nextErrors.education = "Tell us about your Vedic education or training.";
      }
      if (data.introduction.trim().length < 25) {
        nextErrors.introduction = "Write a short professional introduction.";
      }
      if (data.languagesSpoken.length === 0) nextErrors.languagesSpoken = "Select at least one spoken language.";
      if (data.pujaLanguages.length === 0) nextErrors.pujaLanguages = "Select at least one puja language.";
      if (!data.hasExperienceEvidence) nextErrors.hasExperienceEvidence = "Select whether evidence is available.";
    }

    if (stepIndex === 2) {
      if (data.specializations.length === 0 && !data.otherSpecialization.trim()) {
        nextErrors.specializations = "Choose at least one puja specialization.";
      }
      if (data.serviceModes.length === 0) nextErrors.serviceModes = "Choose at least one service mode.";
      if (!data.primaryServiceCity.trim()) nextErrors.primaryServiceCity = "Enter your primary service city.";
      if (!data.areasServed.trim()) nextErrors.areasServed = "Enter the areas or localities you serve.";
      if (!data.travelRadius) nextErrors.travelRadius = "Select your travel radius.";
      if (data.availableDays.length === 0) nextErrors.availableDays = "Choose at least one available day.";
      if (data.preferredTimeRanges.length === 0) {
        nextErrors.preferredTimeRanges = "Choose at least one preferred time range.";
      }
      if (!data.canArrangeSamagri) nextErrors.canArrangeSamagri = "Select whether you can arrange puja samagri.";
      if (!data.canProvideSamagriChecklist) {
        nextErrors.canProvideSamagriChecklist = "Select whether you can provide a samagri checklist.";
      }
      if (!data.nriVideoCall) nextErrors.nriVideoCall = "Select whether you can support NRI/video-call coordination.";
    }

    if (stepIndex === 3) {
      if (!data.accuracyConsent) {
        nextErrors.accuracyConsent = "Confirm that your submitted details are accurate.";
      }
      if (!data.conductConsent) {
        nextErrors.conductConsent = "Agree to respectful conduct and transparent communication.";
      }
      if (!data.privacyConsent) {
        nextErrors.privacyConsent = "Please accept the Privacy Policy and Terms to submit your application.";
      }
    }

    return nextErrors;
  }

  function goToStep(nextStep) {
    setCurrentStep(Math.max(0, Math.min(nextStep, steps.length - 1)));
    setSubmitError("");
  }

  function handleNext() {
    const stepErrors = validateStep(currentStep);

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      setPendingInvalidFocus(true);
      trackPanditRegistrationEvent("pandit_registration_validation_error", {
        step_number: currentStep + 1,
        field: Object.keys(stepErrors)[0],
      });
      return;
    }

    setErrors({});
    trackPanditRegistrationEvent("pandit_registration_step_complete", { step_number: currentStep + 1 });
    goToStep(currentStep + 1);
  }

  function firstInvalidStep() {
    for (const step of steps) {
      const stepErrors = validateStep(step.id);
      if (Object.keys(stepErrors).length > 0) {
        return { step: step.id, stepErrors };
      }
    }

    return null;
  }

  function buildPayload() {
    return {
      ...formData,
      sourcePage: "/pandit-registration",
      utmSource: campaign.utmSource,
      utmMedium: campaign.utmMedium,
      utmCampaign: campaign.utmCampaign,
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;

    const invalid = firstInvalidStep();
    if (invalid) {
      setCurrentStep(invalid.step);
      setErrors(invalid.stepErrors);
      setPendingInvalidFocus(true);
      trackPanditRegistrationEvent("pandit_registration_validation_error", {
        step_number: invalid.step + 1,
        field: Object.keys(invalid.stepErrors)[0],
      });
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    trackPanditRegistrationEvent("pandit_registration_submit", {
      selected_specializations: formData.specializations.length + (formData.otherSpecialization.trim() ? 1 : 0),
      service_modes: formData.serviceModes.length,
    });

    try {
      const response = await fetch("/api/pandit-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });

      let result = {};
      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (!response.ok || !result?.ok) {
        const fieldErrors = result?.fieldErrors && typeof result.fieldErrors === "object" ? result.fieldErrors : {};
        setErrors(fieldErrors);
        if (Object.keys(fieldErrors).length > 0) {
          const firstServerField = Object.keys(fieldErrors).find((field) => fieldStepMap[field] !== undefined);
          setCurrentStep(firstServerField ? fieldStepMap[firstServerField] : currentStep);
          setPendingInvalidFocus(true);
        }
        setSubmitError(result?.error || "We could not submit your application. Your information has been preserved - please try again.");
        trackPanditRegistrationEvent("pandit_registration_failure", {
          reason: response.status ? `status_${response.status}` : "network",
        });
        return;
      }

      setSuccess({
        applicationId: result.applicationId,
        status: result.status,
      });
      trackPanditRegistrationEvent("pandit_registration_success");
    } catch {
      setSubmitError("We could not submit your application. Your information has been preserved - please try again.");
      trackPanditRegistrationEvent("pandit_registration_failure", { reason: "network" });
    } finally {
      setSubmitting(false);
    }
  }

  const errorList = Object.entries(errors).filter(([, message]) => message);
  const whatsappFollowupHref = success
    ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
        `Namaste Shastriya Vidhan, I submitted a Pandit registration application. Reference: ${success.applicationId}.`,
      )}`
    : contact.whatsappLink;

  if (success) {
    return (
      <section className="registration-success-card" ref={successRef} tabIndex={-1} role="status" aria-live="polite">
        <div className="registration-success-icon">
          <Check size={34} aria-hidden="true" />
        </div>
        <span className="apple-eyebrow">Application received</span>
        <h2>Thank you for applying.</h2>
        <p>
          Your application reference is <strong>{success.applicationId}</strong>. Submission is not approval,
          and approval does not guarantee enquiries, completed bookings, or earnings.
        </p>
        <p>
          The team will review your profile against current service requirements and contact you by phone or
          WhatsApp if the application moves to the next step.
        </p>
        <div className="registration-success-actions">
          <Link href="/" className="apple-btn-pill apple-btn-primary">
            Go to Home
          </Link>
          <a
            href={whatsappFollowupHref}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-btn-pill apple-btn-secondary"
            onClick={() => trackPanditRegistrationEvent("pandit_registration_whatsapp_click")}
          >
            <MessageCircle size={18} aria-hidden="true" />
            Contact on WhatsApp
          </a>
        </div>
      </section>
    );
  }

  return (
    <form id="pandit-registration-form" className="pandit-registration-form" onSubmit={handleSubmit} noValidate>
      <div className="registration-form-header">
        <span className="apple-eyebrow">Secure application</span>
        <h2 id="pandit-registration-form-heading" tabIndex={-1}>
          Pandit Ji registration form
        </h2>
        <p>
          Submit accurate details for manual review. Do not share Aadhaar, PAN, bank details, or identity
          documents in this public form.
        </p>
      </div>

      <div className="registration-honeypot" aria-hidden="true">
        <label htmlFor={fieldId("website")}>Website</label>
        <input
          id={fieldId("website")}
          name="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          value={formData.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
      </div>

      <div className="registration-progress-wrap">
        <p className="registration-progress-text">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep].label}
        </p>
        <div className="registration-progress" aria-hidden="true">
          <span style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
        </div>
        <div className="registration-step-tabs" role="list" aria-label="Pandit registration steps">
          {steps.map((step) => (
            <button
              key={step.id}
              type="button"
              role="listitem"
              className={`registration-step-tab ${currentStep === step.id ? "active" : ""} ${
                currentStep > step.id ? "complete" : ""
              }`}
              aria-current={currentStep === step.id ? "step" : undefined}
              onClick={() => {
                if (step.id <= currentStep) goToStep(step.id);
              }}
              disabled={step.id > currentStep}
            >
              <span>{step.id + 1}</span>
              {step.label}
            </button>
          ))}
        </div>
      </div>

      {errorList.length > 0 ? (
        <div className="registration-error-summary" role="alert" aria-labelledby="registration-error-heading">
          <h3 id="registration-error-heading">Please review these details</h3>
          <ul>
            {errorList.map(([field, message]) => (
              <li key={field}>
                <a href={`#${fieldId(field)}`}>{message}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {submitError ? (
        <p className="form-status-error" role="alert">
          {submitError}
        </p>
      ) : null}

      <div className="registration-step-panel">
        {currentStep === 0 ? (
          <section aria-labelledby="registration-step-contact">
            <h3 id="registration-step-contact">Contact details</h3>
            <div className="registration-form-grid">
              <TextField
                name="fullName"
                label="Full name"
                value={formData.fullName}
                onChange={updateField}
                onBlur={handleBlur}
                error={errors.fullName}
                required
                autoComplete="name"
                maxLength={120}
              />
              <TextField
                name="mobile"
                label="Mobile number"
                value={formData.mobile}
                onChange={updateField}
                onBlur={handleBlur}
                error={errors.mobile}
                help="Indian mobile number. +91 is assumed for application review."
                required
                autoComplete="tel-national"
                inputMode="tel"
                type="tel"
                maxLength={24}
              />
              <div className="registration-field registration-field-wide">
                <label className="registration-inline-check">
                  <input
                    type="checkbox"
                    checked={formData.sameAsMobile}
                    onChange={(event) => updateField("sameAsMobile", event.target.checked)}
                  />
                  <span>WhatsApp number is the same as mobile</span>
                </label>
              </div>
              <TextField
                name="whatsapp"
                label="WhatsApp number"
                value={formData.sameAsMobile ? "" : formData.whatsapp}
                onChange={updateField}
                onBlur={handleBlur}
                error={errors.whatsapp}
                help={formData.sameAsMobile ? "The mobile number above will be used for WhatsApp follow-up." : ""}
                optional
                autoComplete="tel"
                inputMode="tel"
                type="tel"
                maxLength={24}
                disabled={formData.sameAsMobile}
              />
              <TextField
                name="email"
                label="Email address"
                value={formData.email}
                onChange={updateField}
                onBlur={handleBlur}
                error={errors.email}
                optional
                autoComplete="email"
                inputMode="email"
                type="email"
                maxLength={180}
              />
              <TextField
                name="city"
                label="City"
                value={formData.city}
                onChange={updateField}
                onBlur={handleBlur}
                error={errors.city}
                required
                autoComplete="address-level2"
                maxLength={100}
              />
              <SelectField
                name="state"
                label="State"
                value={formData.state}
                onChange={updateField}
                onBlur={handleBlur}
                error={errors.state}
                options={stateOptions}
                required
              />
              <TextField
                name="pinCode"
                label="PIN code"
                value={formData.pinCode}
                onChange={updateField}
                onBlur={handleBlur}
                error={errors.pinCode}
                required
                autoComplete="postal-code"
                inputMode="numeric"
                maxLength={12}
              />
              <SelectField
                name="preferredContactLanguage"
                label="Preferred contact language"
                value={formData.preferredContactLanguage}
                onChange={updateField}
                onBlur={handleBlur}
                error={errors.preferredContactLanguage}
                options={contactLanguageOptions}
                required
              />
            </div>
          </section>
        ) : null}

        {currentStep === 1 ? (
          <section aria-labelledby="registration-step-experience">
            <h3 id="registration-step-experience">Professional background</h3>
            <div className="registration-form-grid">
              <SelectField
                name="professionalTitle"
                label="Professional title"
                value={formData.professionalTitle}
                onChange={updateField}
                onBlur={handleBlur}
                error={errors.professionalTitle}
                options={professionalTitles}
                required
              />
              <SelectField
                name="yearsExperience"
                label="Years of puja experience"
                value={formData.yearsExperience}
                onChange={updateField}
                onBlur={handleBlur}
                error={errors.yearsExperience}
                options={yearsOptions}
                required
              />
              <TextareaField
                name="education"
                label="Vedic education or training"
                value={formData.education}
                onChange={updateField}
                onBlur={handleBlur}
                error={errors.education}
                help="Mention Gurukul, family parampara, temple training, teacher, or self-study with experience."
                required
                maxLength={900}
              />
              <TextField
                name="institution"
                label="Institution, Gurukul, temple, or teacher name"
                value={formData.institution}
                onChange={updateField}
                onBlur={handleBlur}
                error={errors.institution}
                optional
                maxLength={160}
              />
              <TextareaField
                name="introduction"
                label="Short professional introduction"
                value={formData.introduction}
                onChange={updateField}
                onBlur={handleBlur}
                error={errors.introduction}
                help="Write a concise introduction that can help the review team understand your background."
                required
                rows={5}
                maxLength={900}
              />
              <TextField
                name="templeAssociation"
                label="Existing temple association"
                value={formData.templeAssociation}
                onChange={updateField}
                onBlur={handleBlur}
                error={errors.templeAssociation}
                optional
                maxLength={240}
              />
            </div>
            <CheckboxGroup
              name="languagesSpoken"
              legend="Languages spoken"
              values={formData.languagesSpoken}
              options={languageOptions}
              onToggle={toggleArrayValue}
              error={errors.languagesSpoken}
            />
            <CheckboxGroup
              name="pujaLanguages"
              legend="Languages used for conducting puja"
              values={formData.pujaLanguages}
              options={pujaLanguageOptions}
              onToggle={toggleArrayValue}
              error={errors.pujaLanguages}
            />
            <RadioGroup
              name="hasExperienceEvidence"
              legend="Experience evidence available"
              value={formData.hasExperienceEvidence}
              options={yesNoOptions}
              onChange={updateField}
              error={errors.hasExperienceEvidence}
              help="Documents or references may be requested later through a secure verification process if shortlisted."
            />
          </section>
        ) : null}

        {currentStep === 2 ? (
          <section aria-labelledby="registration-step-services">
            <h3 id="registration-step-services">Puja specialization and availability</h3>
            <CheckboxGroup
              name="specializations"
              legend="Puja specializations"
              values={formData.specializations}
              options={specializationOptions}
              onToggle={toggleArrayValue}
              error={errors.specializations}
              help="Select every ritual, path, or ceremony you can responsibly conduct."
            />
            <div className="registration-form-grid">
              <TextField
                name="otherSpecialization"
                label="Other specialization"
                value={formData.otherSpecialization}
                onChange={updateField}
                onBlur={handleBlur}
                error={errors.otherSpecialization}
                optional
                maxLength={180}
              />
            </div>
            <CheckboxGroup
              name="serviceModes"
              legend="Service modes"
              values={formData.serviceModes}
              options={serviceModeOptions}
              onToggle={toggleArrayValue}
              error={errors.serviceModes}
            />
            <div className="registration-form-grid">
              <TextField
                name="primaryServiceCity"
                label="Primary service city"
                value={formData.primaryServiceCity}
                onChange={updateField}
                onBlur={handleBlur}
                error={errors.primaryServiceCity}
                required
                maxLength={100}
              />
              <TextField
                name="areasServed"
                label="Areas or localities served"
                value={formData.areasServed}
                onChange={updateField}
                onBlur={handleBlur}
                error={errors.areasServed}
                required
                maxLength={500}
              />
              <SelectField
                name="travelRadius"
                label="Travel radius"
                value={formData.travelRadius}
                onChange={updateField}
                onBlur={handleBlur}
                error={errors.travelRadius}
                options={travelRadiusOptions}
                required
              />
              <SelectField
                name="ownTransport"
                label="Own transport"
                value={formData.ownTransport}
                onChange={updateField}
                onBlur={handleBlur}
                error={errors.ownTransport}
                options={["Yes", "No", "Depends on location"]}
                optional
              />
            </div>
            <CheckboxGroup
              name="availableDays"
              legend="Available days"
              values={formData.availableDays}
              options={dayOptions}
              onToggle={toggleArrayValue}
              error={errors.availableDays}
            />
            <CheckboxGroup
              name="preferredTimeRanges"
              legend="Preferred time ranges"
              values={formData.preferredTimeRanges}
              options={timeOptions}
              onToggle={toggleArrayValue}
              error={errors.preferredTimeRanges}
            />
            <div className="registration-form-grid">
              <RadioGroup
                name="canArrangeSamagri"
                legend="Can arrange puja samagri"
                value={formData.canArrangeSamagri}
                options={samagriOptions}
                onChange={updateField}
                error={errors.canArrangeSamagri}
              />
              <RadioGroup
                name="canProvideSamagriChecklist"
                legend="Can provide samagri checklist"
                value={formData.canProvideSamagriChecklist}
                options={yesNoOptions}
                onChange={updateField}
                error={errors.canProvideSamagriChecklist}
              />
              <RadioGroup
                name="nriVideoCall"
                legend="Available for NRI/video-call coordination"
                value={formData.nriVideoCall}
                options={yesNoOptions}
                onChange={updateField}
                error={errors.nriVideoCall}
              />
              <TextareaField
                name="pricingNotes"
                label="Expected dakshina or pricing notes"
                value={formData.pricingNotes}
                onChange={updateField}
                onBlur={handleBlur}
                error={errors.pricingNotes}
                help="Optional notes only. Pricing is never published automatically and remains subject to review."
                optional
                rows={3}
                maxLength={500}
              />
            </div>
          </section>
        ) : null}

        {currentStep === 3 ? (
          <section aria-labelledby="registration-step-review">
            <h3 id="registration-step-review">Review and consent</h3>
            <div className="registration-review-grid">
              <article>
                <button type="button" onClick={() => goToStep(0)} aria-label="Edit contact details">
                  <Edit3 size={16} aria-hidden="true" />
                </button>
                <span>Contact</span>
                <strong>{formData.fullName || "Name missing"}</strong>
                <p>
                  {formData.city || "City missing"}, {formData.state || "state missing"} - {formData.pinCode || "PIN missing"}
                </p>
              </article>
              <article>
                <button type="button" onClick={() => goToStep(1)} aria-label="Edit professional background">
                  <Edit3 size={16} aria-hidden="true" />
                </button>
                <span>Experience</span>
                <strong>{formData.professionalTitle || "Title missing"}</strong>
                <p>{formData.yearsExperience || "Experience missing"}</p>
              </article>
              <article>
                <button type="button" onClick={() => goToStep(2)} aria-label="Edit service details">
                  <Edit3 size={16} aria-hidden="true" />
                </button>
                <span>Services</span>
                <strong>{selectedList(formData.serviceModes)}</strong>
                <p>{selectedList([...formData.specializations, formData.otherSpecialization].filter(Boolean))}</p>
              </article>
            </div>

            <div className="registration-consent-list">
              <label className="registration-consent" id={fieldId("accuracyConsent")}>
                <input
                  type="checkbox"
                  checked={formData.accuracyConsent}
                  onChange={(event) => updateField("accuracyConsent", event.target.checked)}
                  aria-invalid={errors.accuracyConsent ? "true" : undefined}
                  aria-describedby={errors.accuracyConsent ? errorId("accuracyConsent") : undefined}
                />
                <span>
                  The submitted details are accurate to the best of my knowledge. I understand that application
                  submission does not guarantee approval, enquiries, bookings, or earnings.
                </span>
              </label>
              <FieldError id={errorId("accuracyConsent")} message={errors.accuracyConsent} />

              <label className="registration-consent" id={fieldId("conductConsent")}>
                <input
                  type="checkbox"
                  checked={formData.conductConsent}
                  onChange={(event) => updateField("conductConsent", event.target.checked)}
                  aria-invalid={errors.conductConsent ? "true" : undefined}
                  aria-describedby={errors.conductConsent ? errorId("conductConsent") : undefined}
                />
                <span>I agree to respectful conduct and transparent communication with families and the team.</span>
              </label>
              <FieldError id={errorId("conductConsent")} message={errors.conductConsent} />

              <label className="registration-consent" id={fieldId("privacyConsent")}>
                <input
                  type="checkbox"
                  checked={formData.privacyConsent}
                  onChange={(event) => updateField("privacyConsent", event.target.checked)}
                  aria-invalid={errors.privacyConsent ? "true" : undefined}
                  aria-describedby={errors.privacyConsent ? errorId("privacyConsent") : undefined}
                />
                <span>
                  I consent to application processing and agree to the{" "}
                  <Link href="/privacy-policy" target="_blank">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms" target="_blank">
                    Terms of Service
                  </Link>
                  .
                </span>
              </label>
              <FieldError id={errorId("privacyConsent")} message={errors.privacyConsent} />

              <label className="registration-consent">
                <input
                  type="checkbox"
                  checked={formData.marketingConsent}
                  onChange={(event) => updateField("marketingConsent", event.target.checked)}
                />
                <span>I agree to receive optional promotional or network updates. This is not required to apply.</span>
              </label>
            </div>

            <div className="registration-safe-note">
              <ShieldCheck size={19} aria-hidden="true" />
              <p>
                Sensitive identity documents are not collected here. If shortlisted, verification documents may be
                requested only through an approved secure process.
              </p>
            </div>
          </section>
        ) : null}
      </div>

      <div className="registration-form-actions">
        {currentStep > 0 ? (
          <button type="button" className="apple-btn-pill apple-btn-secondary" onClick={() => goToStep(currentStep - 1)}>
            <ChevronLeft size={17} aria-hidden="true" />
            Back
          </button>
        ) : (
          <a
            href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
              "Namaste Shastriya Vidhan, I have a question before Pandit registration.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-link apple-link-sm"
            onClick={() => trackPanditRegistrationEvent("pandit_registration_whatsapp_click")}
          >
            Questions before applying?
            <ChevronRight size={14} aria-hidden="true" />
          </a>
        )}

        {currentStep < steps.length - 1 ? (
          <button type="button" className="apple-btn-pill apple-btn-primary" onClick={handleNext}>
            Continue
            <ChevronRight size={17} aria-hidden="true" />
          </button>
        ) : (
          <button type="submit" className="apple-btn-pill apple-btn-primary" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 size={17} className="spin" aria-hidden="true" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </button>
        )}
      </div>
    </form>
  );
}
