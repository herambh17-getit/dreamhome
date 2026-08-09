"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { PropertySearchForm } from "@/components/property/property-search-form";
import { PropertyCard } from "@/components/property/property-card";
import { PropertySort } from "@/components/property/property-sort";
import { ActiveFilters } from "@/components/property/active-filters";
import { ButtonLink } from "@/components/ui/button";
import { filterProperties, parsePropertyFilters } from "@/lib/property-filters";
import type { Location, Property } from "@/lib/types";

/**
 * Client-side property browser.
 *
 * The page ships the full list statically; this component reads the filters
 * from the URL and narrows the list in the browser. That keeps /properties a
 * static route (fast, indexable, and — importantly on constrained hosts — with
 * no per-request server render to fail), while filters stay linkable via the
 * query string exactly as before.
 */
export function PropertiesBrowser({
  properties,
  locations,
}: {
  properties: Property[];
  locations: Location[];
}) {
  const searchParams = useSearchParams();

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

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p
            className="text-lg font-bold text-brand-indigo-900"
            aria-live="polite"
          >
            {filtered.length} {filtered.length === 1 ? "property" : "properties"}
          </p>
          <ActiveFilters locations={locations} />
        </div>

        <PropertySort />
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property, i) => (
            <PropertyCard key={property.id} property={property} priority={i < 3} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </>
  );
}

function EmptyState() {
  return (
    <div className="mt-10 rounded-2xl border border-dashed border-border bg-brand-light px-6 py-16 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-indigo-50 text-primary">
        <SlidersHorizontal className="size-5" aria-hidden />
      </div>
      <h2 className="mt-4 text-xl text-brand-indigo-900">
        Nothing matches those filters
      </h2>
      <p className="mx-auto mt-2 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
        That does not mean nothing exists. Most of what we place never reaches a
        listing page — tell us what you are looking for and we will go and find
        it.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/properties" variant="outline" size="lg">
          Clear filters
        </ButtonLink>
        <ButtonLink href="/contact" size="lg">
          Tell us what you need
        </ButtonLink>
      </div>
    </div>
  );
}
