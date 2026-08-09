import { parseBudget } from "@/lib/format";
import type {
  ListingIntent,
  Property,
  PropertyFilters,
  PropertyType,
} from "@/lib/types";

/**
 * Pure, isomorphic property filtering.
 *
 * These functions have no server or client dependencies, so the same logic
 * runs at build time (server) and in the browser. That lets the /properties
 * page render statically with the full list and filter on the client from the
 * URL — no per-request server render, which keeps the route static and avoids
 * the on-demand rendering path entirely.
 */

/** Reads a URL query object into typed filters, ignoring anything unrecognised. */
export function parsePropertyFilters(
  sp: Record<string, string | string[] | undefined>,
): PropertyFilters {
  const one = (key: string): string | undefined => {
    const v = sp[key];
    return Array.isArray(v) ? v[0] : v;
  };

  const { minPrice, maxPrice } = parseBudget(one("budget"));
  const intent = one("intent");
  const sort = one("sort");

  return {
    q: one("q"),
    intent: (["buy", "rent", "commercial"] as const).includes(
      intent as ListingIntent,
    )
      ? (intent as ListingIntent)
      : undefined,
    propertyType: one("propertyType") as PropertyType | undefined,
    configuration: one("configuration"),
    location: one("location"),
    minPrice,
    maxPrice,
    sort: (
      ["newest", "price-asc", "price-desc", "area-desc"] as const
    ).includes(sort as NonNullable<PropertyFilters["sort"]>)
      ? (sort as PropertyFilters["sort"])
      : "newest",
  };
}

/** Applies filters + sort to a property list. Mirrors the SQL path so both agree. */
export function filterProperties(
  list: Property[],
  f: PropertyFilters,
): Property[] {
  let out = [...list];

  if (f.intent) out = out.filter((p) => p.intent === f.intent);
  if (f.propertyType) out = out.filter((p) => p.propertyType === f.propertyType);
  if (f.configuration)
    out = out.filter((p) => p.configuration === f.configuration);
  if (f.location) out = out.filter((p) => p.locationSlug === f.location);
  if (f.status) out = out.filter((p) => p.status === f.status);

  // Rentals price on `rent`, sales on `price`. Comparing a rental's price
  // field (0) against a sale budget would wrongly drop every rental.
  const amount = (p: Property) => (p.intent === "rent" ? (p.rent ?? 0) : p.price);
  if (f.minPrice != null) out = out.filter((p) => amount(p) >= f.minPrice!);
  if (f.maxPrice != null) out = out.filter((p) => amount(p) <= f.maxPrice!);

  if (f.q) {
    const q = f.q.toLowerCase();
    out = out.filter((p) =>
      [p.title, p.location, p.configuration, p.developer, p.description]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }

  switch (f.sort) {
    case "price-asc":
      out.sort((a, b) => amount(a) - amount(b));
      break;
    case "price-desc":
      out.sort((a, b) => amount(b) - amount(a));
      break;
    case "area-desc":
      out.sort((a, b) => b.carpetArea - a.carpetArea);
      break;
    default:
      out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  return out;
}
