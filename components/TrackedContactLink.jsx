"use client";

import { trackEvent } from "@/lib/analytics";

export default function TrackedContactLink({
  children,
  className,
  href,
  eventName,
  params = {},
  target,
  rel,
  id,
  ariaLabel,
  style,
}) {
  return (
    <a
      href={href}
      id={id}
      target={target}
      rel={rel}
      className={className}
      aria-label={ariaLabel}
      style={style}
      onClick={() => trackEvent(eventName, params)}
    >
      {children}
    </a>
  );
}
