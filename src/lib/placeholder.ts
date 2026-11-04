/**
 * Detects the demo content the site ships with, so it can be kept out of
 * search results until real listings replace it.
 *
 * Sample listings and projects carry a "RERA number pending — sample …"
 * value; sample developer profiles start with "Placeholder". Once a record is
 * replaced with real data (real RERA number, real description) it becomes
 * indexable automatically — nothing else needs changing.
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
