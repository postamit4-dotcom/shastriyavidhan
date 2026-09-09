import Link from "next/link";
import { excludedContent } from "@/lib/site-data";

export const metadata = {
  title: "Blog Archive",
  description: "Shastriya Vidhan blog archive and puja service navigation.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function BlogArchivePage() {
  return (
    <section className="page-hero compact">
      <p className="eyebrow">Archive</p>
      <h1>Blog archive is being refreshed</h1>
      <p>
        {excludedContent.publishedPosts} older posts are outside the current puja booking directory.
        Use the maintained service pages for booking details, samagri guidance, and availability requests.
      </p>
      <Link className="primary-button" href="/puja-services">
        View puja services
      </Link>
    </section>
  );
}
