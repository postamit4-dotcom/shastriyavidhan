import { notFound, permanentRedirect } from "next/navigation";
import { getPolicyByLegacySlug, policyPages } from "@/lib/page-content";

export function generateStaticParams() {
  return policyPages.map((policy) => ({ slug: policy.legacySlug }));
}

export default async function LegacyPolicyRedirectPage({ params }) {
  const { slug } = await params;
  const policy = getPolicyByLegacySlug(slug);

  if (!policy) {
    notFound();
  }

  permanentRedirect(policy.href);
}
