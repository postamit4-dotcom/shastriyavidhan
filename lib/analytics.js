const safeParamPattern = /^[a-zA-Z0-9 _./:-]{0,120}$/;

function safeParamValue(value) {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "number" || typeof value === "boolean") return value;
  const text = String(value).slice(0, 120);
  return safeParamPattern.test(text) ? text : undefined;
}

export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined") return;
  if (!Array.isArray(window.dataLayer)) return;

  const safeParams = {};
  for (const [key, value] of Object.entries(params)) {
    const safeValue = safeParamValue(value);
    if (safeValue !== undefined) safeParams[key] = safeValue;
  }

  window.dataLayer.push({
    event: eventName,
    ...safeParams,
  });
}

export function slugifyAnalyticsValue(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}
