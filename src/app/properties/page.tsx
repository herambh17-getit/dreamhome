import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import { PageHeader } from "@/components/page-header";
import { PropertiesBrowser } from "@/components/property/properties-browser";
import { PropertySearchForm } from "@/components/property/property-search-form";
import { PropertyResults } from "@/components/property/property-results";
import { getLocations, getProperties } from "@/lib/queries";
import { isSampleRecord } from "@/lib/placeholder";
import { PROPERTY_FILTER_KEYS } from "@/lib/property-filters";
import { Skeleton } from "@/components/ui/skeleton";

/** Marks <html data-property-filters> when the URL carries a listing filter. */
const FILTERED_URL_SCRIPT = `(function(){try{var p=new URLSearchParams(location.search);if(${JSON.stringify(
  PROPERTY_FILTER_KEYS,
)}.some(function(k){return p.has(k)}))document.documentElement.setAttribute("data-property-filters","")}catch(e){}})();`;

export async function generateMetadata(): Promise<Metadata> {
  const properties = await getProperties();
  return pageMetadata({
    title: "Properties for Sale & Rent in Mumbai",
    description:
      "Residential and commercial property for sale and rent in Borivali, Kandivali, Malad, Goregaon and Andheri. Ask for the property documents and check MahaRERA registration before you commit.",
    path: "/properties",
    // With no real listings the page is an empty state (or, on preview
    // builds, samples only) — keep it out of search until real listings
    // exist. Same rule as /projects.
    noindex: properties.length === 0 || properties.every(isSampleRecord),
  });
}

/**
 * Property listings.
 *
 * A static route. `PropertiesBrowser` filters in the browser from the URL
 * query string, so filters stay shareable without a per-request server
 * render. Because it reads the URL with useSearchParams(), Next leaves it out
 * of the prerendered HTML — so the Suspense fallback is the full, unfiltered,
 * server-rendered list. Crawlers and no-JS visitors get every listing; the
 * browser then swaps in the filterable version.
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
        description="Residential and commercial properties across Borivali, Kandivali, Malad, Goregaon and Andheri. Ask us for available property documents and, where applicable, verify the project's MahaRERA registration on the official portal before committing."
        breadcrumbs={[{ name: "Properties", href: "/properties" }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Runs before the fallback below is painted. On a filtered URL it
            marks <html> so the unfiltered list is swapped for a skeleton
            until PropertiesBrowser renders the filtered results — no flash
            of the wrong listings. Unfiltered URLs, crawlers and no-JS
            visitors are unaffected and see the full list. */}
        <script
          dangerouslySetInnerHTML={{ __html: FILTERED_URL_SCRIPT }}
        />
        <Suspense
          fallback={
            <>
              <PropertySearchForm locations={locations} defaultIntent="buy" />
              <div className="[html[data-property-filters]_&]:hidden">
                <PropertyResults
                  properties={properties}
                  totalCount={properties.length}
                />
              </div>
              <div className="hidden [html[data-property-filters]_&]:block">
                <Skeleton className="mt-8 h-44 w-full rounded-2xl" />
              </div>
            </>
          }
        >
          <PropertiesBrowser properties={properties} locations={locations} />
        </Suspense>
      </div>
    </>
  );
}
