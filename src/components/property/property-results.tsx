import type { ReactNode } from "react";
import { SlidersHorizontal } from "lucide-react";
import { PropertyCard } from "@/components/property/property-card";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { whatsappLink } from "@/lib/site-config";
import type { Property } from "@/lib/types";

/**
 * Result count + listing grid (or an empty state) for /properties.
 *
 * Deliberately hook-free so it renders in two places from one definition:
 *  - on the server, as the Suspense fallback in `app/properties/page.tsx`,
 *    which puts the full unfiltered list into the prerendered HTML that
 *    search engines read; and
 *  - in the browser, inside `PropertiesBrowser`, once URL filters apply.
 *
 * `totalCount` is the number of listings before filtering. Zero means nothing
 * is published at all, which gets a different message from "your filters
 * matched nothing".
 */
export function PropertyResults({
  properties,
  totalCount,
  filters,
  sort,
}: {
  properties: Property[];
  totalCount: number;
  /** Active-filter chips (client only). */
  filters?: ReactNode;
  /** Sort control (client only). */
  sort?: ReactNode;
}) {
  if (totalCount === 0) return <NoListingsState />;

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p
            className="text-lg font-bold text-brand-indigo-900"
            aria-live="polite"
          >
            {properties.length}{" "}
            {properties.length === 1 ? "property" : "properties"}
          </p>
          {filters}
        </div>

        {sort}
      </div>

      {properties.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property, i) => (
            <PropertyCard
              key={property.id}
              property={property}
              priority={i < 3}
            />
          ))}
        </div>
      ) : (
        <NoMatchesState />
      )}
    </>
  );
}

function NoMatchesState() {
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

function NoListingsState() {
  return (
    <div className="mt-10 rounded-2xl border border-dashed border-border bg-brand-light px-6 py-16 text-center">
      <h2 className="text-xl text-brand-indigo-900">
        Our current listings aren&apos;t published here yet
      </h2>
      <p className="mx-auto mt-2 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
        Most of what we place never reaches a listing page. Tell us what you
        are looking for and we will come back with options.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/contact" size="lg">
          Tell us what you need
        </ButtonLink>
        <ButtonLink
          href={whatsappLink(
            "Hi, I'm looking for a property. Can you share what's available?",
          )}
          external
          size="lg"
          className="bg-[#25D366] text-white hover:bg-[#1da851]"
        >
          <WhatsAppIcon className="size-4" aria-hidden />
          WhatsApp us
        </ButtonLink>
      </div>
    </div>
  );
}
