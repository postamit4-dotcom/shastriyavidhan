import HomePageClient from "@/components/HomePageClient";
import { site } from "@/lib/site-data";
import { basePageMetadata, homePageJsonLd } from "@/lib/seo";

export const metadata = basePageMetadata({
  title: `${site.name} | Puja Made Peaceful`,
  description: site.description,
  path: "/",
  image: "/images/diwali-puja.webp",
  imageAlt: `${site.name} - Book Pandit Ji for Vedic Puja`,
});

export default function HomePage() {
  const jsonLd = homePageJsonLd();

  return (
    <>
      <HomePageClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
