import Image from "next/image";
import Link from "next/link";
import { BedDouble, Building2, MapPin, Maximize } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatArea, formatListingPrice, formatPricePerSqft } from "@/lib/format";
import type { Property } from "@/lib/types";

const STATUS_TONE: Record<string, string> = {
  "Ready to Move": "bg-emerald-600 text-white",
  "New Launch": "bg-brand-gold text-brand-indigo-950",
  "Under Construction": "bg-brand-deep-blue text-white",
  Resale: "bg-brand-indigo-600 text-white",
  Sold: "bg-muted-foreground text-white",
};

/**
 * Property card.
 *
 * The whole card is one link, with the image and title sharing a single
 * anchor via a stretched overlay — nested interactive elements inside a
 * card is a common a11y failure, and duplicate links to the same target
 * make keyboard and screen-reader navigation tedious.
 */
export function PropertyCard({
  property,
  className,
  priority = false,
}: {
  property: Property;
  className?: string;
  priority?: boolean;
}) {
  const cover = property.gallery[0];
  const isRental = property.intent === "rent";

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300",
        "hover:-translate-y-1 hover:border-brand-indigo-200 hover:shadow-xl hover:shadow-brand-indigo/8",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        className,
      )}
    >
      <div className="relative aspect-4/3 overflow-hidden bg-brand-indigo-50">
        {cover ? (
          <Image
            src={cover}
            alt=""
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceholderArt />
        )}

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <Badge
            className={cn(
              "border-0 font-semibold",
              STATUS_TONE[property.status] ?? "bg-primary text-primary-foreground",
            )}
          >
            {property.status}
          </Badge>
          {property.featured && (
            <Badge className="border-0 bg-white/90 font-semibold text-brand-indigo-900">
              Featured
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <MapPin className="size-3.5 shrink-0 text-brand-gold-600" aria-hidden />
          {property.location}
        </p>

        <h3 className="mt-2 text-pretty text-lg leading-snug text-brand-indigo-900">
          <Link
            href={`/properties/${property.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {property.title}
          </Link>
        </h3>

        <dl className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Configuration</dt>
            {property.intent === "commercial" ? (
              <Building2 className="size-4 text-brand-indigo-300" aria-hidden />
            ) : (
              <BedDouble className="size-4 text-brand-indigo-300" aria-hidden />
            )}
            <dd>{property.configuration}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Carpet area</dt>
            <Maximize className="size-4 text-brand-indigo-300" aria-hidden />
            <dd>{formatArea(property.carpetArea)}</dd>
          </div>
        </dl>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-xl font-extrabold text-brand-indigo-900">
              {formatListingPrice(property)}
            </p>
            {/* Rate per sq.ft. is only meaningful for a sale price. */}
            {!isRental && property.price > 0 && (
              <p className="text-xs text-muted-foreground">
                {formatPricePerSqft(property.price, property.carpetArea)}
              </p>
            )}
          </div>
          <span
            aria-hidden
            className="text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-0.5"
          >
            View →
          </span>
        </div>
      </div>
    </article>
  );
}

/**
 * Shown when a listing has no photograph yet.
 *
 * A branded geometric panel rather than a grey "no image" box — the sample
 * data ships without photos and the grid should still look considered.
 */
function PlaceholderArt() {
  return (
    <div
      className="brand-gradient flex size-full items-center justify-center"
      aria-hidden
    >
      <svg viewBox="0 0 120 80" className="w-2/5 opacity-30" fill="none">
        <path d="M12 52 L34 30 L52 48 L52 52 Z" fill="white" />
        <path d="M40 52 L68 22 L96 52 Z" fill="white" />
        <path d="M6 64 C 34 48, 90 46, 116 60 C 88 52, 34 55, 14 68 Z" fill="white" />
      </svg>
    </div>
  );
}
