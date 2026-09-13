"use client";

import { ExternalLink } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

function mergeRel(target, rel) {
  if (target !== "_blank") return rel;
  const values = new Set(String(rel || "").split(/\s+/).filter(Boolean));
  values.add("noopener");
  values.add("noreferrer");
  return Array.from(values).join(" ");
}

export default function TrackedOutboundLink({
  children,
  className,
  href,
  eventName = "social_profile_click",
  params = {},
  target = "_blank",
  rel,
  ariaLabel,
  id,
  style,
  showExternalIcon = true,
}) {
  return (
    <a
      href={href}
      id={id}
      target={target}
      rel={mergeRel(target, rel)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      onClick={() => trackEvent(eventName, params)}
    >
      {children}
      {showExternalIcon ? <ExternalLink size={14} aria-hidden="true" /> : null}
      {target === "_blank" ? <span className="sr-only"> Opens in a new tab.</span> : null}
    </a>
  );
}
