export const panditJiImage = {
  alt: "Acharya Sursain Brijwasi, Pandit Ji in Ghaziabad",
  caption: "Acharya Sursain Brijwasi - Shastriya Vidhan",
  fallback: "/images/acharya-sursain-brijwasi-pandit-ji-ghaziabad-640.webp",
  schema: "/images/acharya-sursain-brijwasi-pandit-ji-ghaziabad-900.webp",
  og: "/images/acharya-sursain-brijwasi-pandit-ji-ghaziabad-og.jpg",
  width: 900,
  height: 1600,
  avifSrcSet: [
    "/images/acharya-sursain-brijwasi-pandit-ji-ghaziabad-320.avif 320w",
    "/images/acharya-sursain-brijwasi-pandit-ji-ghaziabad-480.avif 480w",
    "/images/acharya-sursain-brijwasi-pandit-ji-ghaziabad-640.avif 640w",
    "/images/acharya-sursain-brijwasi-pandit-ji-ghaziabad-900.avif 900w",
  ].join(", "),
  webpSrcSet: [
    "/images/acharya-sursain-brijwasi-pandit-ji-ghaziabad-320.webp 320w",
    "/images/acharya-sursain-brijwasi-pandit-ji-ghaziabad-480.webp 480w",
    "/images/acharya-sursain-brijwasi-pandit-ji-ghaziabad-640.webp 640w",
    "/images/acharya-sursain-brijwasi-pandit-ji-ghaziabad-900.webp 900w",
  ].join(", "),
};

export default function PanditJiPicture({
  alt = panditJiImage.alt,
  className,
  imgClassName,
  sizes = "(max-width: 640px) calc(100vw - 40px), 420px",
  loading = "lazy",
  fetchPriority,
  decorative = false,
}) {
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={panditJiImage.avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={panditJiImage.webpSrcSet} sizes={sizes} />
      <img
        src={panditJiImage.fallback}
        alt={decorative ? "" : alt}
        width={panditJiImage.width}
        height={panditJiImage.height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        className={imgClassName}
      />
    </picture>
  );
}
