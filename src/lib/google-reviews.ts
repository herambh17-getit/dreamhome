import type { Testimonial } from "@/lib/types";

/**
 * Google Reviews integration (Places API — New).
 *
 * Wiring this up is the honest way to show client feedback: reviews stay
 * current, they are verifiable against the business's public profile, and
 * nobody has to hand-copy anything.
 *
 * Setup:
 *   1. In Google Cloud, enable "Places API (New)" — not the legacy Places
 *      API, which Google no longer enables for new projects.
 *   2. Create an API key; restrict it to Places API (New).
 *   3. Find the business's Place ID (Google's Place ID Finder).
 *   4. Set both as environment variables (Vercel → Settings → Environment
 *      Variables, or .env.local for local dev):
 *        GOOGLE_PLACES_API_KEY=...
 *        GOOGLE_PLACE_ID=...
 *
 * The key is read here on the server only and never reaches the client,
 * which is why it has no NEXT_PUBLIC_ prefix.
 *
 * Caveat worth knowing before you promise it to the client: Place Details
 * returns at most five reviews and cannot page through the rest. For a
 * fuller wall you need the Google Business Profile API, which requires
 * ownership verification.
 */

export function isGoogleReviewsConfigured(): boolean {
  return Boolean(process.env.GOOGLE_PLACES_API_KEY && process.env.GOOGLE_PLACE_ID);
}

interface PlacesReview {
  rating?: number;
  text?: { text?: string };
  relativePublishTimeDescription?: string;
  publishTime?: string;
  authorAttribution?: { displayName?: string };
}

interface PlaceDetails {
  rating?: number;
  userRatingCount?: number;
  reviews?: PlacesReview[];
}

/**
 * One Place Details call shared by every caller. The request is identical
 * each time, so Next's fetch cache serves all of them from a single billed
 * request per day.
 *
 * Returns null when unconfigured or on failure, so callers fall back rather
 * than render an error — reviews must never be able to take the page down.
 */
async function fetchPlaceDetails(): Promise<PlaceDetails | null> {
  if (!isGoogleReviewsConfigured()) return null;

  const placeId = encodeURIComponent(process.env.GOOGLE_PLACE_ID!);

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY!,
        // Only the fields we render — Google bills by field tier.
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
      // Cache for a day. Reviews change slowly and the endpoint is billed
      // per call — refetching on every render would be wasteful.
      next: { revalidate: 86_400, tags: ["google-reviews"] },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Places API returned ${res.status}: ${body.slice(0, 300)}`);
    }

    return (await res.json()) as PlaceDetails;
  } catch (err) {
    console.error("[google-reviews] fetch failed, falling back:", err);
    return null;
  }
}

/**
 * Live rating and review count from the Business Profile, or null when the
 * API isn't configured — callers then show the figures from site-config.
 */
export async function fetchGooglePlaceSummary(): Promise<{
  rating: number;
  reviewCount: number;
} | null> {
  const place = await fetchPlaceDetails();
  if (place?.rating == null || place.userRatingCount == null) return null;
  return { rating: place.rating, reviewCount: place.userRatingCount };
}

/** The most recent Google reviews (up to five), newest first. */
export async function fetchGoogleReviews(): Promise<Testimonial[] | null> {
  const place = await fetchPlaceDetails();
  const reviews = (place?.reviews ?? []).filter((r) => r.text?.text);
  if (!reviews.length) return null;

  return reviews.map((r, i) => ({
    id: `google-${r.publishTime ?? i}-${i}`,
    name: r.authorAttribution?.displayName ?? "Google user",
    location: "",
    rating: r.rating ?? 5,
    quote: r.text!.text!,
    context: r.relativePublishTimeDescription ?? "",
    date: r.publishTime ?? new Date().toISOString(),
    source: "Google" as const,
  }));
}
