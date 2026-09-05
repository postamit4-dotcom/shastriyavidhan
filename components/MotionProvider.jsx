"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const motionSelectors = [
  "[data-motion]",
  ".apple-section-header",
  ".apple-bento-card",
  ".apple-product-card",
  ".apple-dark-feature-card",
  ".apple-step-item",
  ".apple-steps-row",
  ".apple-profile-card",
  ".pandit-feature-card",
  ".about-pandit-card",
  ".service-hero-visual-card",
  ".service-authority-grid > div",
  ".service-specs-grid > div",
  ".service-toc-card",
  ".service-article-stack article",
  ".service-detail-card",
  ".service-table-wrap",
  ".date-note-card",
  ".leela-grid article",
  ".booking-guide-list article",
  ".apple-footer-col",
  ".footer-trust-note",
  ".apple-footer-contact",
  ".apple-footer-bottom",
].join(",");

const staggerContainers = [
  ".trust-badge-grid",
  ".apple-products-grid",
  ".apple-dark-grid-3",
  ".apple-steps-row",
  ".apple-bento-grid",
  ".apple-profiles-grid",
  ".service-detail-card-grid",
  ".service-inclusion-grid",
  ".service-samagri-grid",
  ".leela-grid",
  ".booking-guide-list",
  ".service-authority-grid",
  ".service-specs-grid",
];

function motionTypeFor(element) {
  if (element.dataset.motion) return element.dataset.motion;
  if (
    element.classList.contains("apple-product-card") ||
    element.classList.contains("apple-bento-card") ||
    element.classList.contains("service-hero-visual-card") ||
    element.classList.contains("pandit-feature-card")
  ) {
    return "scale-in";
  }
  return "fade-up";
}

function elementsFrom(root) {
  const results = [];
  if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return results;
  if (root.nodeType === Node.ELEMENT_NODE && root.matches?.(motionSelectors)) results.push(root);
  root.querySelectorAll?.(motionSelectors).forEach((element) => results.push(element));
  return results;
}

function applyStaggerOrders(root = document) {
  staggerContainers.forEach((selector) => {
    root.querySelectorAll?.(selector).forEach((container) => {
      Array.from(container.children).forEach((child, index) => {
        if (child instanceof HTMLElement) {
          child.style.setProperty("--motion-order", String(Math.min(index, 7)));
        }
      });
    });
  });
}

export default function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = () => reducedMotionQuery.matches;
    const header = document.querySelector(".apple-nav-shell");
    let frame = null;
    let observer = null;

    function updateHeaderState() {
      header?.classList.toggle("is-scrolled", window.scrollY > 12);
    }

    function onScroll() {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        updateHeaderState();
      });
    }

    function reveal(element) {
      element.classList.add("is-visible");
      observer?.unobserve(element);
    }

    function prepareElement(element) {
      if (!(element instanceof HTMLElement) || element.dataset.motionDisabled === "true") return;
      element.dataset.motion = motionTypeFor(element);

      if (prefersReducedMotion()) {
        reveal(element);
        return;
      }

      if (element.classList.contains("is-visible")) return;
      observer?.observe(element);
    }

    function collect(rootNode = document) {
      applyStaggerOrders(document);
      elementsFrom(rootNode).forEach(prepareElement);
    }

    if (!prefersReducedMotion()) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) reveal(entry.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
      );
    }

    updateHeaderState();
    window.addEventListener("scroll", onScroll, { passive: true });
    collect(document);
    root.classList.add("motion-ready");

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => collect(node));
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    function onReducedMotionChange() {
      document.querySelectorAll("[data-motion]").forEach((element) => reveal(element));
    }

    reducedMotionQuery.addEventListener?.("change", onReducedMotionChange);

    return () => {
      root.classList.remove("motion-ready");
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
      observer?.disconnect();
      mutationObserver.disconnect();
      reducedMotionQuery.removeEventListener?.("change", onReducedMotionChange);
    };
  }, [pathname]);

  return null;
}
