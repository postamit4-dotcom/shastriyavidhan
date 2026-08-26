# WordPress To Node.js Migration Plan

Source site: https://shastriyavidhan.com/

## Completed in this local build

- Created a Next.js app for the Node.js rebuild.
- Migrated the real public site structure: Home, Contact, Services, and 13 puja service pages.
- Preserved existing service page slugs so production URLs can stay stable.
- Recreated Rank Math style page metadata in Next.js `generateMetadata`.
- Replaced WPForms Lite with a local Node API route at `/api/contact`.
- Added sitemap and robots routes.
- Added an asset download script for primary service images.
- Excluded 509 published blog posts that appear unrelated to the puja business.

## Asset approach

The app stores primary image mappings in `lib/site-data.js`.

Run this after installing dependencies:

```bash
npm run download:assets
```

The script downloads mapped WordPress upload images into `public/images`.

## Before going live

1. Connect `/api/contact` to email, CRM, WhatsApp, or a database.
2. Review all titles, descriptions, and page copy for final wording.
3. Check every old URL against the new routes.
4. Add redirects for any non-service URLs you want to keep.
5. Back up WordPress and remove or noindex the unrelated blog content.
6. Deploy the Next.js app to a Node-compatible host.
7. Update DNS for `shastriyavidhan.com` after testing the production build.
