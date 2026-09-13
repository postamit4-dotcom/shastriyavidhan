# Internal Link Audit - Acharya Sursain Brijwasi

Target profile:
https://www.shastriyavidhan.com/pandit-ji/acharya-sursain-brijwasi-ghaziabad

Preferred internal path:
`/pandit-ji/acharya-sursain-brijwasi-ghaziabad`

## Project Inspection

- Framework: Next.js App Router with React server and client components.
- Routing: file-system routes under `app/`, dynamic service/mode/support/policy route handling in `app/[slug]/page.jsx`, location route handling in `app/locations/[slug]/page.jsx`, and service-category route handling in `app/puja-services/[slug]/page.jsx`.
- Rendering: static generation for routes with `generateStaticParams`; API contact route remains dynamic.
- Content locations: service and location content in `lib/site-data.js`; mode, support, and policy content in `lib/page-content.js`; central route metadata in `lib/site-registry.js`.
- Sitemap source: `app/sitemap.js` uses `sitemapNodes()` from `lib/site-registry.js`, which filters to live/indexable routes.
- Canonical conventions: metadata helpers in `lib/seo.js`; `next.config.mjs` sets `trailingSlash: false` and redirects non-www to `https://www.shastriyavidhan.com`.
- Existing internal-link method: Next.js `Link` for internal links and normal `<a>` only for external, `tel:`, WhatsApp, and same-page anchors.
- Available checks: `npm.cmd run check:site` and `npm.cmd run build`. No separate lint or test scripts are configured in `package.json`.

## Existing Occurrences Before New Placements

- `components/HomePageClient.jsx`: existing homepage named-profile section for Acharya Sursain Brijwasi.
- `app/about/page.jsx`: existing public Pandit Ji profile card.
- `app/contact/page.jsx`: existing Ghaziabad Pandit Ji contact card.
- `app/pandit-standards/page.jsx`: existing standards-page profile CTA.
- `app/pandit-ji/acharya-sursain-brijwasi-ghaziabad/page.jsx`: target profile page content, metadata, contact actions, and schema.
- `lib/site-registry.js`: route node for the profile.
- `docs/route-inventory.json`: route inventory entry for the profile.
- `components/PanditJiPicture.jsx`: profile image alt/caption metadata.
- `components/MobileStickyBar.jsx`: profile path used only to change the sticky action on the profile page; it is not a rendered link to the profile from other pages.
- `lib/site-data.js`: Shastriya Vidhan phone and WhatsApp values, including `+91 7599 340 430` / `917599340430`.
- `public/images/*acharya-sursain-brijwasi*`: profile image assets by filename.

## Route Decision Table

| Source URL | Page type | Relevance score | Decision | Anchor text | Placement | Existing or new | Reason |
|---|---:|---:|---|---|---|---|---|
| https://www.shastriyavidhan.com/ | home | 6 | Preserve | Ghaziabad Pandit Ji Profile | Named public profile card | Existing, anchor improved | Home already introduces owner-approved named public profile and Ghaziabad enquiry context. |
| https://www.shastriyavidhan.com/puja-services | commercial_hub | 2 | Do not add | N/A | N/A | Excluded | General service directory does not make the Ghaziabad profile a necessary next step. |
| https://www.shastriyavidhan.com/how-it-works | help | 5 | Add | Acharya Sursain Brijwasi's profile | Booking acceptance checklist | New | Explains Pandit Ji assignment and manual confirmation; Ghaziabad users benefit before submitting details. |
| https://www.shastriyavidhan.com/locations | locations_hub | 5 | Add | Acharya Sursain Brijwasi's Ghaziabad profile | Location hub profile card | New | Location hub is the natural place to surface the verified Ghaziabad profile without creating an unverified city page. |
| https://www.shastriyavidhan.com/guides | guides_hub | 0 | Do not add | N/A | N/A | Excluded | Preparation guides are not specific to Ghaziabad or this Pandit Ji. |
| https://www.shastriyavidhan.com/about | about | 6 | Preserve | Acharya Sursain Brijwasi's profile | Public Pandit Ji profile card | Existing, anchor improved | About page already explains the request-first process and verified Ghaziabad profile. |
| https://www.shastriyavidhan.com/pandit-standards | trust | 6 | Preserve | Acharya Sursain Brijwasi's profile | Minimum checklist CTA row | Existing, anchor improved | Standards page discusses assignment checks and public profile transparency. |
| https://www.shastriyavidhan.com/pandit-ji/acharya-sursain-brijwasi-ghaziabad | profile | -4 | Do not add self-link | N/A | N/A | Excluded | Target profile itself should not receive a contextual self-link. |
| https://www.shastriyavidhan.com/pricing-and-inclusions | help | 2 | Do not add | N/A | N/A | Excluded | Pricing factors are general and not a Ghaziabad profile decision point. |
| https://www.shastriyavidhan.com/book-puja | booking | 5 | Add | Acharya Sursain Brijwasi's profile | Above booking request form | New | Booking form is where Ghaziabad users submit ceremony, locality, date, and samagri details. |
| https://www.shastriyavidhan.com/contact | contact | 6 | Preserve | Ghaziabad Pandit Ji Profile | Ghaziabad Pandit Ji contact card | Existing, anchor improved | Contact page already names Ghaziabad coverage and asks users to review the profile before enquiry. |
| https://www.shastriyavidhan.com/faqs | help | 2 | Do not add | N/A | N/A | Excluded | FAQ content is broad; no page-level Ghaziabad profile context. |
| https://www.shastriyavidhan.com/site-map | html_sitemap | -4 | Do not add contextual link | N/A | N/A | Excluded | Sitemap pages are excluded from contextual placement. The complete route-registry listing may still list the profile as a route. |
| https://www.shastriyavidhan.com/puja-at-home | mode_hub | 5 | Add | public profile of Acharya Sursain Brijwasi | Optional mode-page profile callout | New | Home-puja mode is directly useful for families requesting puja at home in Ghaziabad. |
| https://www.shastriyavidhan.com/online-puja | mode_hub | 1 | Do not add | N/A | N/A | Excluded | Online puja is not tied to Ghaziabad or this local profile. |
| https://www.shastriyavidhan.com/help | help | 2 | Do not add | N/A | N/A | Excluded | Broad support hub links to booking/help resources, not a local profile. |
| https://www.shastriyavidhan.com/complaints-resolution | help | -4 | Do not add | N/A | N/A | Excluded | Complaint process page is policy-like and not a discovery path for a local profile. |
| https://www.shastriyavidhan.com/payment-safety | help | -4 | Do not add | N/A | N/A | Excluded | Payment safety is transactional/policy guidance. |
| https://www.shastriyavidhan.com/editorial-sourcing-policy | help | -4 | Do not add | N/A | N/A | Excluded | Editorial policy is not a Pandit Ji discovery page. |
| https://www.shastriyavidhan.com/privacy-policy | policy | -4 | Do not add | N/A | N/A | Excluded | Legal/privacy page. |
| https://www.shastriyavidhan.com/terms | policy | -4 | Do not add | N/A | N/A | Excluded | Legal/terms page. |
| https://www.shastriyavidhan.com/cancellation-refund-policy | policy | -4 | Do not add | N/A | N/A | Excluded | Cancellation/refund policy page. |
| https://www.shastriyavidhan.com/religious-legal-disclaimer | policy | -4 | Do not add | N/A | N/A | Excluded | Disclaimer page. |
| https://www.shastriyavidhan.com/puja-services/featured-pujas | service_category | 2 | Do not add | N/A | N/A | Excluded | Category hub is broad and not Ghaziabad-specific. |
| https://www.shastriyavidhan.com/puja-services/festival-pujas | service_category | 2 | Do not add | N/A | N/A | Excluded | Festival category is broad and not local-profile specific. |
| https://www.shastriyavidhan.com/puja-services/shiva-pujas | service_category | 2 | Do not add | N/A | N/A | Excluded | Shiva category is broad and does not support a Ghaziabad-specific profile claim. |
| https://www.shastriyavidhan.com/puja-services/vishnu-krishna | service_category | 2 | Do not add | N/A | N/A | Excluded | Vishnu/Krishna category is broad and not Ghaziabad-specific. |
| https://www.shastriyavidhan.com/puja-services/devi-pujas | service_category | 2 | Do not add | N/A | N/A | Excluded | Devi category is broad and not a local-profile decision point. |
| https://www.shastriyavidhan.com/book-pandit-ji-online-for-diwali-puja | service | 0 | Do not add | N/A | N/A | Excluded | Locations are Noida, Delhi, Gurugram, and Online; no Ghaziabad support is stated. |
| https://www.shastriyavidhan.com/book-pandit-ji-online-for-janmashtami-puja | service | 0 | Do not add | N/A | N/A | Excluded | No explicit Ghaziabad service support. |
| https://www.shastriyavidhan.com/book-pandit-ji-online-for-education-puja | service | 0 | Do not add | N/A | N/A | Excluded | No explicit Ghaziabad service support. |
| https://www.shastriyavidhan.com/book-pandit-ji-online-for-holika-dahan-puja | service | 0 | Do not add | N/A | N/A | Excluded | No explicit Ghaziabad service support. |
| https://www.shastriyavidhan.com/book-pandit-ji-online-for-ram-navami-puja | service | 0 | Do not add | N/A | N/A | Excluded | No explicit Ghaziabad service support. |
| https://www.shastriyavidhan.com/book-pandit-ji-online-for-tulsi-vivah | service | 0 | Do not add | N/A | N/A | Excluded | No explicit Ghaziabad service support. |
| https://www.shastriyavidhan.com/book-pandit-ji-online-for-bagualmukhi-puja | service | 2 | Manual review, no link | N/A | N/A | Manual review | Uses broad "Delhi NCR" wording but does not explicitly verify Ghaziabad or Acharya suitability for Baglamukhi Puja. |
| https://www.shastriyavidhan.com/book-pandit-ji-for-rudrabhishek-puja-noida | service | 0 | Do not add | N/A | N/A | Excluded | Noida-focused service URL; no explicit Ghaziabad support. |
| https://www.shastriyavidhan.com/book-pandit-ji-online-for-maha-shivratri-puja | service | 0 | Do not add | N/A | N/A | Excluded | No explicit Ghaziabad service support. |
| https://www.shastriyavidhan.com/book-pandit-ji-online-for-dhanteras-puja | service | 0 | Do not add | N/A | N/A | Excluded | No explicit Ghaziabad service support. |
| https://www.shastriyavidhan.com/book-pandit-ji-online-for-mahamrityunjaya-jaap-puja | service | 0 | Do not add | N/A | N/A | Excluded | No explicit Ghaziabad service support. |
| https://www.shastriyavidhan.com/book-pandit-ji-for-sundar-kand-path | service | 7 | Add | Acharya Sursain Brijwasi's public profile | Ghaziabad Pandit Ji profile callout after related guidance | New | Page explicitly targets Sundarkand Path at home in Ghaziabad and asks for locality/availability review. |
| https://www.shastriyavidhan.com/book-pandit-ji-for-hanuman-chalisa-path | service | 0 | Do not add | N/A | N/A | Excluded | No explicit Ghaziabad service support. |
| https://www.shastriyavidhan.com/kaal-sarp-dosh-puja-in-ujjain | service | -4 | Do not add | N/A | N/A | Excluded | Ujjain destination service; adding a Ghaziabad profile would be misleading. |

## Links Preserved

- https://www.shastriyavidhan.com/
  - Source file: `components/HomePageClient.jsx`
  - Anchor text: `Ghaziabad Pandit Ji Profile`
  - Surrounding component: named public profile card.
  - Reason: already gives visitors a public Ghaziabad profile before they share puja date, location, samagri, and ceremony details.
- https://www.shastriyavidhan.com/about
  - Source file: `app/about/page.jsx`
  - Anchor text: `Acharya Sursain Brijwasi's profile`
  - Surrounding component: public Pandit Ji profile card.
  - Reason: about page explains request-first coordination and verified Ghaziabad enquiry details.
- https://www.shastriyavidhan.com/contact
  - Source file: `app/contact/page.jsx`
  - Anchor text: `Ghaziabad Pandit Ji Profile`
  - Surrounding component: Ghaziabad Pandit Ji contact card.
  - Reason: contact page explicitly supports Ghaziabad enquiry navigation.
- https://www.shastriyavidhan.com/pandit-standards
  - Source file: `app/pandit-standards/page.jsx`
  - Anchor text: `Acharya Sursain Brijwasi's profile`
  - Surrounding component: minimum checklist CTA row.
  - Reason: standards page is directly about identity, conduct, ritual fit, and assignment review.

## Links Added

- https://www.shastriyavidhan.com/book-puja
  - Source file: `app/book-puja/page.jsx`
  - Anchor text: `Acharya Sursain Brijwasi's profile`
  - Surrounding sentence: "For a Ghaziabad puja enquiry, review Acharya Sursain Brijwasi's profile and share the ceremony name, locality, preferred date, and samagri requirement for manual confirmation."
  - Reason: gives Ghaziabad users a profile review step immediately before form submission.
- https://www.shastriyavidhan.com/how-it-works
  - Source file: `app/how-it-works/page.jsx`
  - Anchor text: `Acharya Sursain Brijwasi's profile`
  - Surrounding sentence: "If the ceremony is planned in Ghaziabad, you may review Acharya Sursain Brijwasi's profile and then submit the puja, date, location, and samagri details for manual confirmation."
  - Reason: aligns the profile with the manual booking and availability-confirmation journey.
- https://www.shastriyavidhan.com/locations
  - Source file: `app/locations/page.jsx`
  - Anchor text: `Acharya Sursain Brijwasi's Ghaziabad profile`
  - Surrounding sentence: "For local puja enquiries, review Acharya Sursain Brijwasi's Ghaziabad profile and share your ceremony, date, locality, and samagri requirements for availability confirmation."
  - Reason: location hub can surface the verified Ghaziabad profile without adding an unverified Ghaziabad city route.
- https://www.shastriyavidhan.com/puja-at-home
  - Source files: `lib/page-content.js`, `app/[slug]/page.jsx`
  - Anchor text: `public profile of Acharya Sursain Brijwasi`
  - Surrounding sentence: "Families requesting puja at home in Ghaziabad can review the public profile of Acharya Sursain Brijwasi before submitting the ceremony, date, locality, and samagri details for manual confirmation."
  - Reason: home puja mode is directly relevant to a Ghaziabad local enquiry.
- https://www.shastriyavidhan.com/book-pandit-ji-for-sundar-kand-path
  - Source files: `lib/site-data.js`, `app/[slug]/page.jsx`
  - Anchor text: `Acharya Sursain Brijwasi's public profile`
  - Surrounding sentence: "For Ghaziabad Sundarkand Path enquiries, you can review Acharya Sursain Brijwasi's public profile before sharing the ceremony format, locality, date, and samagri needs. Availability and ritual suitability are confirmed before booking."
  - Reason: the page explicitly supports Sundarkand Path in Ghaziabad and requires locality/availability review.

## Pages Excluded

- Legal and policy pages were excluded: privacy, terms, cancellation/refund, payment safety, religious/legal disclaimer, complaints, and editorial policy.
- Unrelated location pages were excluded: Noida, Delhi, Gurugram, and Ujjain noindex city routes are not indexable source targets and are dedicated to other cities.
- General service category hubs were excluded unless they had explicit Ghaziabad profile relevance; none did.
- Individual service pages were excluded unless they explicitly supported Ghaziabad; only Sundarkand Path qualified.
- Online-only content was excluded because the target profile is a Ghaziabad enquiry profile.
- The target profile page itself was excluded from self-linking.
- The site map page was excluded from contextual placement. Its route-registry listing was not treated as an SEO placement.

## Manual Review Items

- https://www.shastriyavidhan.com/book-pandit-ji-online-for-bagualmukhi-puja
  - Reason: the service mentions broad "Delhi NCR" but does not explicitly verify Ghaziabad availability or Acharya Sursain Brijwasi suitability for this ritual. No link was added.

## Verification Results

- Total indexable pages audited: 42.
- Total existing valid contextual links preserved: 4.
- Total new contextual links added: 5.
- Total pages excluded from contextual placement: 32.
- Total manual-review items: 1.
- Target live HTTP status: 200 for `https://www.shastriyavidhan.com/pandit-ji/acharya-sursain-brijwasi-ghaziabad` with no redirect followed.
- Local rendered route status: all 42 audited indexable routes returned HTTP 200 from `http://localhost:3004`.
- Rendered anchor verification:
  - `/`: 1 target link.
  - `/about`: 1 target link.
  - `/contact`: 1 target link.
  - `/pandit-standards`: 1 target link.
  - `/book-puja`: 1 target link.
  - `/how-it-works`: 1 target link.
  - `/locations`: 1 target link.
  - `/puja-at-home`: 1 target link.
  - `/book-pandit-ji-for-sundar-kand-path`: 1 target link.
  - `/site-map`: 1 route-registry listing, not counted as a contextual placement.
- Duplicate same-page contextual links found: 0.
- Broken audited source routes found: 0.
- Redirecting target variations found in new placements: 0.
- Header/footer profile link added: no.
- Unverified claim introduced: no.
- `npm.cmd run check:site`: passed.
- `npm.cmd run build`: passed; Next.js build compiled successfully and generated 66 static pages.
- Type-check result: passed via the build's TypeScript phase.
- Lint result: no lint script is configured in `package.json`.
- Test result: no test script is configured in `package.json`.
- `git diff --check`: passed with line-ending normalization warnings only.

## Diff Summary

Internal-linking files changed:

- `components/HomePageClient.jsx`: preserved homepage profile placement and improved anchor text.
- `app/about/page.jsx`: preserved profile placement and improved anchor text.
- `app/contact/page.jsx`: preserved Ghaziabad card placement and improved anchor text.
- `app/pandit-standards/page.jsx`: preserved standards CTA placement and improved anchor text.
- `app/book-puja/page.jsx`: added Ghaziabad profile sentence above the booking form.
- `app/how-it-works/page.jsx`: added Ghaziabad profile sentence inside the booking acceptance checklist.
- `app/locations/page.jsx`: added a location-hub Ghaziabad profile card.
- `lib/page-content.js`: added optional `relatedPanditProfile` data to `puja-at-home` only.
- `lib/site-data.js`: added shared `acharyaSursainProfile` data and Sundarkand Path profile callout.
- `app/[slug]/page.jsx`: added an optional related profile renderer for mode and service pages.
- `internal-link-audit-acharya-sursain.md`: added this implementation report.

Current worktree also contains earlier site-map and route-inventory changes that were not introduced for this internal-linking brief.

