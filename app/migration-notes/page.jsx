import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";
import { excludedContent, servicePages, site } from "@/lib/site-data";

export const metadata = {
  title: "Site Update Notes",
  description: "Shastriya Vidhan site update notes and maintained puja service navigation.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function MigrationNotesPage() {
  return (
    <>
      <section className="page-hero compact">
        <p className="eyebrow">Site Update</p>
        <h1>Service directory update for {site.name}</h1>
        <p>
          The current site focuses on maintained puja service pages, booking guidance, contact details,
          location coverage, policies, and practical preparation resources.
        </p>
      </section>

      <section className="section-wrap">
        <div className="resource-grid">
        <article>
          <CheckCircle2 size={24} />
          <h2>Included</h2>
          <p>
            Home, Contact, and {servicePages.length} puja service pages are available with
            structured routes and page-level metadata.
          </p>
        </article>
        <article>
          <CheckCircle2 size={24} />
          <h2>Service URLs</h2>
          <p>
            Service pages keep stable public URLs so families can reach booking guidance,
            samagri notes, and request forms without extra navigation.
          </p>
        </article>
        <article>
          <AlertTriangle size={24} />
          <h2>Older Posts</h2>
          <p>
            {excludedContent.publishedPosts} older posts are outside the current booking directory.
            Maintained service pages should be used for current puja booking information.
          </p>
        </article>
        <article>
          <CheckCircle2 size={24} />
          <h2>Assets</h2>
          <p>
            Primary service images are maintained with local image paths and descriptive alt text
            for the current public routes.
          </p>
        </article>
        </div>
      </section>

      <section className="split-section">
        <div>
          <h2>Booking readiness checklist</h2>
          <p>
            Before confirming a booking, the team should verify the selected service, city,
            date, samagri responsibility, quote, and contact follow-up path.
          </p>
        </div>
        <Link className="primary-button" href="/puja-services">
          Review services
          <ArrowRight size={18} />
        </Link>
      </section>
    </>
  );
}
