/**
 * Detects the demo content the site ships with, so it can be kept off the
 * public site until real listings replace it.
 *
 * Sample listings and projects carry a "RERA number pending — sample …"
 * value; sample developer profiles start with "Placeholder". Once a record is
 * replaced with real data (real RERA number, real description) it becomes
 * visible and indexable automatically — nothing else needs changing.
 *
 * Visibility is enforced in `lib/queries.ts` via `visibleRecords`, so every
 * page that lists properties, projects or developers follows the same rule.
 */

const SAMPLE_RERA_PREFIX = "RERA number pending";

export function isSampleRecord(record: {
  rera?: string;
  description?: string;
}): boolean {
  return (
    (record.rera ?? "").startsWith(SAMPLE_RERA_PREFIX) ||
    /^\s*placeholder\b/i.test(record.description ?? "")
  );
}

/**
 * Whether this build may show sample records to visitors.
 *
 * Only when SHOW_SAMPLE_LISTINGS=true AND the build is a Vercel preview or
 * local `next dev`. Production never shows them — even if the variable is set
 * there by mistake. The variable is server-only (no NEXT_PUBLIC_ prefix), so
 * set it in Vercel → Settings → Environment Variables with only "Preview"
 * ticked.
 */
export function sampleListingsAllowed(): boolean {
  if (process.env.SHOW_SAMPLE_LISTINGS !== "true") return false;
  if (process.env.VERCEL_ENV === "production") return false;
  return (
    process.env.VERCEL_ENV === "preview" ||
    process.env.NODE_ENV === "development"
  );
}

/** Drops sample records unless this build is allowed to show them. */
export function visibleRecords<
  T extends { rera?: string; description?: string },
>(list: T[]): T[] {
  return sampleListingsAllowed()
    ? list
    : list.filter((r) => !isSampleRecord(r));
}
