import "./globals.css";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import MobileStickyBar from "@/components/MobileStickyBar";
import { site } from "@/lib/site-data";
import { siteGraphJsonLd } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(`${site.productionUrl}/`),
  applicationName: site.name,
  title: {
    default: `${site.name} | Puja Made Peaceful - Book Pandit Ji for Authentic Vedic Puja`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: `${site.name} | Puja Made Peaceful`,
    description: site.description,
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
  const jsonLd = siteGraphJsonLd();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
