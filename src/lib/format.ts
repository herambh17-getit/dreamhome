/**
 * Formatting helpers.
 *
 * Indian real estate is quoted in lakhs and crores, not millions. A buyer
 * reading "₹32.5M" has to stop and convert; "₹3.25 Cr" is the number they
 * already think in. Every price on the site goes through here.
 */

const CRORE = 10_000_000;
const LAKH = 100_000;

/** ₹3.25 Cr · ₹85 L · ₹68,000 */
export function formatPrice(amount: number): string {
  if (!amount || amount <= 0) return "Price on request";

  if (amount >= CRORE) {
    const cr = amount / CRORE;
    // Two decimals below 10 Cr (₹3.25 Cr), one above (₹12.5 Cr) — more
    // precision than that is false precision at those numbers.
    const value = cr >= 10 ? cr.toFixed(1) : cr.toFixed(2);
    return `₹${stripTrailingZeros(value)} Cr`;
  }

  if (amount >= LAKH) {
    const l = amount / LAKH;
    return `₹${stripTrailingZeros(l.toFixed(2))} L`;
  }

  return `₹${amount.toLocaleString("en-IN")}`;
}

/** Monthly rent, always with the period attached. */
export function formatRent(amount: number): string {
  if (!amount || amount <= 0) return "Rent on request";
  return `₹${amount.toLocaleString("en-IN")}/mo`;
}

/** Picks the right formatter for a listing based on its intent. */
export function formatListingPrice(p: {
  intent: string;
  price: number;
  rent?: number;
}): string {
  return p.intent === "rent" ? formatRent(p.rent ?? 0) : formatPrice(p.price);
}

function stripTrailingZeros(value: string): string {
  return value.replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
}

/** 1,180 sq.ft. */
export function formatArea(sqft: number): string {
  return `${sqft.toLocaleString("en-IN")} sq.ft.`;
}

/** ₹27,542/sq.ft. — derived, so it is always consistent with the price. */
export function formatPricePerSqft(price: number, carpetArea: number): string {
  if (!price || !carpetArea) return "—";
  return `₹${Math.round(price / carpetArea).toLocaleString("en-IN")}/sq.ft.`;
}

/** 24 June 2026 */
export function formatDate(input: string | Date): string {
  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Compact form for cards: 24 Jun 2026 */
export function formatDateShort(input: string | Date): string {
  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Budget bands for the search filter, in absolute rupees.
 * Sale and rental need different ladders — a ₹50 L step is meaningless
 * for rent and a ₹10,000 step is meaningless for a purchase.
 */
export const saleBudgetOptions = [
  { label: "Any budget", value: "" },
  { label: "Under ₹1 Cr", value: "0-10000000" },
  { label: "₹1 – 2 Cr", value: "10000000-20000000" },
  { label: "₹2 – 3.5 Cr", value: "20000000-35000000" },
  { label: "₹3.5 – 5 Cr", value: "35000000-50000000" },
  { label: "₹5 – 8 Cr", value: "50000000-80000000" },
  { label: "Above ₹8 Cr", value: "80000000-" },
] as const;

export const rentBudgetOptions = [
  { label: "Any budget", value: "" },
  { label: "Under ₹40,000", value: "0-40000" },
  { label: "₹40,000 – ₹75,000", value: "40000-75000" },
  { label: "₹75,000 – ₹1.5 L", value: "75000-150000" },
  { label: "Above ₹1.5 L", value: "150000-" },
] as const;

/** Parses a "min-max" band back into numbers. Either end may be absent. */
export function parseBudget(value?: string): {
  minPrice?: number;
  maxPrice?: number;
} {
  if (!value) return {};
  const [min, max] = value.split("-");
  return {
    minPrice: min ? Number(min) : undefined,
    maxPrice: max ? Number(max) : undefined,
  };
}
