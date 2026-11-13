"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { PropertySearchForm } from "@/components/property/property-search-form";
import { PropertySort } from "@/components/property/property-sort";
import { ActiveFilters } from "@/components/property/active-filters";
import { PropertyResults } from "@/components/property/property-results";
import { filterProperties, parsePropertyFilters } from "@/lib/property-filters";
import type { Location, Property } from "@/lib/types";

/**
 * Client-side property browser.
 *
 * Reads the filters from the URL and narrows the list in the browser, so
 * filters stay linkable via the query string while /properties remains a
 * static route (no per-request server render to fail on constrained hosts).
 *
 * Because it calls `useSearchParams()`, Next renders this component only in
 * the browser; the prerendered HTML contains its Suspense fallback instead.
 * `app/properties/page.tsx` therefore uses the full, server-rendered
 * `PropertyResults` list as that fallback — that is what crawlers index.
 */
export function PropertiesBrowser({
  properties,
  locations,
}: {
  properties: Property[];
  locations: Location[];
}) {
  const searchParams = useSearchParams();

  // The filtered results are now on screen, so clear the marker the page's
  // inline script set to hide the unfiltered prerendered list. (Syncs an
  // external system — the <html> attribute — so it belongs in an effect.)
  useEffect(() => {
    document.documentElement.removeAttribute("data-property-filters");
  }, []);

  const { filtered, intent } = useMemo(() => {
    const sp: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      sp[key] = value;
    });
    const parsed = parsePropertyFilters(sp);
    return { filtered: filterProperties(properties, parsed), intent: parsed.intent };
  }, [properties, searchParams]);

  return (
    <>
      <PropertySearchForm locations={locations} defaultIntent={intent ?? "buy"} />

      <PropertyResults
        properties={filtered}
        totalCount={properties.length}
        filters={<ActiveFilters locations={locations} />}
        sort={<PropertySort />}
      />
    </>
  );
}
