import "./globals.css";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import MobileStickyBar from "@/components/MobileStickyBar";
import { site } from "@/lib/site-data";

export const metadata = {
  metadataBase: new URL(site.productionUrl),
  title: {
    default: `${site.name} | Puja Made Peaceful - Book Pandit Ji for Authentic Vedic Puja`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${site.name} | Puja Made Peaceful`,
    description: site.description,
    url: site.productionUrl,
    siteName: site.name,
    images: [
      {
        url: "/images/diwali-puja.webp",
        width: 1200,
        height: 630,
        alt: `${site.name} - Book Pandit Ji for Vedic Puja`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Puja Made Peaceful`,
    description: site.description,
    images: ["/images/diwali-puja.webp"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <MobileStickyBar />
      </body>
    </html>
  );
}
