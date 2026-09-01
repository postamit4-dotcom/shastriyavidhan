import Link from "next/link";
import { excludedContent } from "@/lib/site-data";

export const metadata = {
  title: "Blog Archive Under Review",
  description: "Reviewed blog archive placeholder for Shastriya Vidhan.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function BlogArchivePage() {
  return (
    <section className="page-hero compact">
      <p className="eyebrow">Archive Review</p>
      <h1>Blog posts need content review</h1>
      <p>
        {excludedContent.publishedPosts} posts are excluded from the public booking experience
        until they are reviewed for relevance, religious accuracy, and SEO quality.
      </p>
      <Link className="primary-button" href="/puja-services">
        View puja services
      </Link>
    </section>
  );
}
