import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function NotFound() {
  return (
    <section className="page-hero compact">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The requested page is not available in the Shastriya Vidhan puja booking experience.</p>
      <Link className="primary-button" href="/puja-services">
        Browse puja services
      </Link>
    </section>
  );
}
