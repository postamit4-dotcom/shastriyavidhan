import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero compact">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The requested page is not available in the Shastriya Vidhan puja booking experience.</p>
      <Link className="primary-button" href="/services">
        Browse puja services
      </Link>
    </section>
  );
}
