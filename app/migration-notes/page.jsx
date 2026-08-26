import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";
import { excludedContent, servicePages, site } from "@/lib/site-data";

export const metadata = {
  title: "Migration Notes",
  description: "WordPress to Node.js migration notes for Shastriya Vidhan.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MigrationNotesPage() {
  return (
    <>
      <section className="page-hero compact">
        <p className="eyebrow">WordPress To Node.js</p>
        <h1>Migration notes for {site.name}</h1>
        <p>
          This local Next.js build preserves the real puja booking pages and keeps unrelated
          WordPress blog content out of the new frontend.
        </p>
      </section>

      <section className="section-wrap">
        <div className="resource-grid">
        <article>
          <CheckCircle2 size={24} />
          <h2>Included</h2>
          <p>
            Home, Contact, and {servicePages.length} puja service pages were converted into
            structured Next.js routes with page-level metadata.
          </p>
        </article>
        <article>
          <CheckCircle2 size={24} />
          <h2>Preserved URLs</h2>
          <p>
            Service slugs match the WordPress pages so production deployment can use the same
            public URLs and reduce redirect work.
          </p>
        </article>
        <article>
          <AlertTriangle size={24} />
          <h2>Excluded Posts</h2>
          <p>
            {excludedContent.publishedPosts} published posts were not migrated. {excludedContent.reason}
          </p>
        </article>
        <article>
          <CheckCircle2 size={24} />
          <h2>Assets</h2>
          <p>
            Primary service images are mapped from WordPress upload URLs and copied into
            public/images by the asset download script.
          </p>
        </article>
        </div>
      </section>

      <section className="split-section">
        <div>
          <h2>Production switch checklist</h2>
          <p>
            Before pointing the live domain at Node.js, configure real email delivery for the
            contact form, verify every image, review titles and descriptions, and back up or
            lock down the old WordPress install.
          </p>
        </div>
        <Link className="primary-button" href="/services">
          Review services
          <ArrowRight size={18} />
        </Link>
      </section>
    </>
  );
}
