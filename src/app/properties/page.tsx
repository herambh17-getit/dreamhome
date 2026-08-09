import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/page-header";
import { PropertiesBrowser } from "@/components/property/properties-browser";
import { Skeleton } from "@/components/ui/skeleton";
import { getLocations, getProperties } from "@/lib/queries";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Properties for Sale & Rent in Mumbai",
  description:
    "Browse verified residential and commercial properties across Borivali, Kandivali, Malad, Goregaon and Andheri. Every listing checked for title, approvals and RERA registration.",
  alternates: { canonical: "/properties" },
};

/**
 * Property listings.
 *
 * Rendered statically with the full list; filtering happens on the client
 * from the URL query string (see PropertiesBrowser). Keeping this route static
 * means it is fully indexable and has no per-request server render — the
 * filters remain shareable and linkable exactly as before.
 */
export default async function PropertiesPage() {
  const [locations, properties] = await Promise.all([
    getLocations(),
    getProperties(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Properties"
        title="Property in Mumbai for sale & rent"
        description={`Verified listings across ${siteConfig.serviceAreas.slice(0, 5).join(", ")}. Every one checked for title, approvals and RERA registration before it reaches you.`}
        breadcrumbs={[{ name: "Properties", href: "/properties" }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Suspense lets the static shell prerender while the client browser,
            which reads filters from the URL via useSearchParams(), hydrates. */}
        <Suspense
          fallback={<Skeleton className="h-44 w-full rounded-2xl" />}
        >
          <PropertiesBrowser properties={properties} locations={locations} />
        </Suspense>
      </div>
    </>
  );
}
