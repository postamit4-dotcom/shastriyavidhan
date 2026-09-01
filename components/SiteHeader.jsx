"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, MessageCircle, X } from "lucide-react";
import { contact, site } from "@/lib/site-data";
import { headerNavigation, mobileNavigationSections, serviceMegaMenuGroups } from "@/lib/site-registry";

function normalizePath(href) {
  return href.split("#")[0].replace(/\/+$/, "") || "/";
}

function idFromLabel(label) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function useCurrentPath() {
  const pathname = usePathname() || "/";

  return (href) => {
    if (href.includes("#")) return false;
    const target = normalizePath(href);
    if (target === "/") return pathname === "/";
    return pathname === target || pathname.startsWith(`${target}/`);
  };
}

function DesktopDropdown({ item, isOpen, isCurrent }) {
  const dropdownId = `desktop-dropdown-${idFromLabel(item.label)}`;

  if (item.menuType === "mega") {
    return (
      <div id={dropdownId} className={`desktop-dropdown desktop-mega-menu ${isOpen ? "open" : ""}`}>
        <div className="desktop-mega-grid">
          {serviceMegaMenuGroups.map((group) => (
            <section key={group.heading} className="desktop-mega-column" aria-label={group.heading}>
              <span className="desktop-mega-heading">{group.heading}</span>
              <ul>
                {group.items.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} aria-current={isCurrent(link.href) ? "page" : undefined}>
                      <span>{link.label}</span>
                      <ChevronRight size={13} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    );
  }

  if (!item.items?.length) return null;

  return (
    <div id={dropdownId} className={`desktop-dropdown ${isOpen ? "open" : ""}`}>
      <ul>
        {item.items.map((link) => (
          <li key={link.href}>
            <Link href={link.href} aria-current={isCurrent(link.href) ? "page" : undefined}>
              <span>{link.label}</span>
              <ChevronRight size={13} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SiteHeader() {
  const pathname = usePathname() || "/";
  const isCurrent = useCurrentPath();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState("puja-services");
  const headerRef = useRef(null);
  const drawerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const toggleRefs = useRef({});
  const hoverTimer = useRef(null);
  const hadOpenDrawer = useRef(false);

  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleDocumentPointerDown(event) {
      if (!headerRef.current?.contains(event.target)) {
        setOpenDropdown(null);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
          return;
        }

        if (openDropdown) {
          const activeToggle = toggleRefs.current[openDropdown];
          setOpenDropdown(null);
          activeToggle?.focus();
        }
      }
    }

    document.addEventListener("pointerdown", handleDocumentPointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handleDocumentPointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen, openDropdown]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileMenuOpen);

    const backgroundNodes = [
      document.getElementById("main-content"),
      document.getElementById("site-footer"),
    ].filter(Boolean);

    backgroundNodes.forEach((node) => {
      if ("inert" in node) {
        node.inert = mobileMenuOpen;
      } else if (mobileMenuOpen) {
        node.setAttribute("aria-hidden", "true");
      } else {
        node.removeAttribute("aria-hidden");
      }
    });

    if (mobileMenuOpen) {
      hadOpenDrawer.current = true;
      window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    } else if (hadOpenDrawer.current) {
      menuButtonRef.current?.focus();
      hadOpenDrawer.current = false;
    }

    return () => {
      document.body.classList.remove("menu-open");
      backgroundNodes.forEach((node) => {
        if ("inert" in node) node.inert = false;
        node.removeAttribute("aria-hidden");
      });
    };
  }, [mobileMenuOpen]);

  function isHoverCapable() {
    return window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
  }

  function scheduleOpen(label) {
    if (!isHoverCapable()) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenDropdown(label), 160);
  }

  function scheduleClose() {
    if (!isHoverCapable()) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenDropdown(null), 240);
  }

  function handleDrawerKeyDown(event) {
    if (event.key !== "Tab" || !drawerRef.current) return;

    const focusable = Array.from(
      drawerRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((node) => node.offsetParent !== null);

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  const primaryLinks = headerNavigation.filter((item) => !item.isPrimary);
  const primaryCta = headerNavigation.find((item) => item.isPrimary);
  const mobileSectionByLabel = new Map(mobileNavigationSections.map((section) => [section.label, section]));

  return (
    <>
      <header className="apple-nav-shell" role="banner" ref={headerRef}>
        <div className="container apple-nav-inner">
          <Link href="/" className="apple-brand-box" aria-label={`${site.name} - Home`}>
            <img src="/images/shastriya-vidhan-logo.png" alt={`${site.name} Logo`} width="42" height="42" />
            <span className="apple-brand-title">{site.name}</span>
          </Link>

          <nav className="apple-desktop-menu" aria-label="Primary">
            <ul className="desktop-nav-list">
              {primaryLinks.map((item) => {
                const hasDropdown = item.menuType === "mega" || item.items?.length > 0;
                const isOpen = openDropdown === item.label;
                const current = isCurrent(item.href);
                const dropdownId = `desktop-dropdown-${idFromLabel(item.label)}`;

                return (
                  <li
                    className="desktop-nav-item"
                    key={item.label}
                    onPointerEnter={() => hasDropdown && scheduleOpen(item.label)}
                    onPointerLeave={() => hasDropdown && scheduleClose()}
                  >
                    {hasDropdown ? (
                      <div className="desktop-nav-group">
                        <Link
                          href={item.href}
                          className={`apple-menu-item ${current ? "active" : ""}`}
                          aria-current={current ? "page" : undefined}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          className="nav-disclosure-button"
                          ref={(node) => {
                            toggleRefs.current[item.label] = node;
                          }}
                          aria-label={`${isOpen ? "Hide" : "Show"} ${item.label} links`}
                          aria-expanded={isOpen}
                          aria-controls={dropdownId}
                          onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                        >
                          <ChevronDown size={14} aria-hidden="true" />
                        </button>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`apple-menu-item ${current ? "active" : ""}`}
                        aria-current={current ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    )}

                    {hasDropdown ? (
                      <div onPointerEnter={() => scheduleOpen(item.label)} onPointerLeave={scheduleClose}>
                        <DesktopDropdown item={item} isOpen={isOpen} isCurrent={isCurrent} />
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="apple-nav-actions">
            {primaryCta ? (
              <Link href={primaryCta.href} className="apple-btn-pill apple-btn-primary">
                {primaryCta.label}
              </Link>
            ) : null}

            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-controls="mobile-navigation-drawer"
              aria-expanded={mobileMenuOpen}
              aria-label="Open primary navigation"
              ref={menuButtonRef}
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen ? (
        <>
          <div className="mobile-drawer-overlay open" onClick={() => setMobileMenuOpen(false)} aria-hidden="true" />
          <div
            id="mobile-navigation-drawer"
            className="mobile-drawer open"
            role="dialog"
            aria-modal="true"
            aria-label="Primary navigation"
            ref={drawerRef}
            onKeyDown={handleDrawerKeyDown}
          >
            <div className="mobile-drawer-header">
              <Link href="/" className="apple-brand-box" onClick={closeMobileMenu}>
                <img src="/images/shastriya-vidhan-logo.png" alt={`${site.name} Logo`} width="36" height="36" />
                <span className="apple-brand-title">{site.name}</span>
              </Link>
              <button
                type="button"
                className="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close primary navigation"
                ref={closeButtonRef}
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            <nav className="mobile-nav-links" aria-label="Primary mobile">
              {primaryLinks.map((item) => {
                const section = mobileSectionByLabel.get(item.label);

                if (!section) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="mobile-nav-link"
                      aria-current={isCurrent(item.href) ? "page" : undefined}
                      onClick={closeMobileMenu}
                    >
                      <span>{item.label}</span>
                      <ChevronRight size={16} aria-hidden="true" />
                    </Link>
                  );
                }

                const isOpen = openMobileSection === section.id;
                const panelId = `mobile-${section.id}-panel`;

                return (
                  <section className="mobile-nav-section" key={section.id}>
                    <button
                      type="button"
                      className="mobile-accordion-button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenMobileSection(isOpen ? null : section.id)}
                    >
                      <span>{section.label}</span>
                      <ChevronDown size={16} aria-hidden="true" />
                    </button>
                    {isOpen ? (
                      <div className="mobile-nav-panel" id={panelId}>
                        {section.groups.map((group) => (
                          <div className="mobile-nav-group" key={group.heading}>
                            <span className="mobile-nav-subheading">{group.heading}</span>
                            {group.items.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className="mobile-nav-sublink"
                                aria-current={isCurrent(link.href) ? "page" : undefined}
                                onClick={closeMobileMenu}
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </section>
                );
              })}
            </nav>

            <div className="mobile-drawer-actions">
              <Link href="/book-puja" className="apple-btn-pill apple-btn-primary" onClick={closeMobileMenu}>
                Book Puja
              </Link>
              <a
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-btn-pill apple-btn-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageCircle size={18} aria-hidden="true" />
                WhatsApp Booking Desk
              </a>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
