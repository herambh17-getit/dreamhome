import type { Testimonial } from "@/lib/types";

/**
 * Google Reviews integration.
 *
 * Wiring this up is the honest way to show client feedback: reviews stay
 * current, they are verifiable against the business's public profile, and
 * nobody has to hand-copy anything.
 *
 * Setup:
 *   1. Enable the Places API in Google Cloud.
 *   2. Find the business's Place ID (Google's Place ID Finder).
 *   3. Add to .env.local:
 *        GOOGLE_PLACES_API_KEY=...
 *        GOOGLE_PLACE_ID=...
 *
 * Restrict the key to the Places API and to your server's IP — it is billed
 * per call. It is read here on the server only and never reaches the client,
 * which is why it has no NEXT_PUBLIC_ prefix.
 *
 * Caveat worth knowing before you promise it to the client: the Places
 * Details endpoint returns only a handful of reviews (typically five) and
 * does not let you page through all of them. For a fuller wall you need the
 * Google Business Profile API, which requires ownership verification.
 */

export function isGoogleReviewsConfigured(): boolean {
  return Boolean(process.env.GOOGLE_PLACES_API_KEY && process.env.GOOGLE_PLACE_ID);
}

interface PlacesReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  time: number;
}

/**
 * Fetches reviews from the Google Places API.
 *
 * Returns null when unconfigured or on failure, so callers can fall back
 * rather than render an error. Reviews are a nice-to-have on a page — they
 * should never be able to take the page down.
 */
export async function fetchGoogleReviews(): Promise<Testimonial[] | null> {
  if (!isGoogleReviewsConfigured()) return null;

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", process.env.GOOGLE_PLACE_ID!);
  url.searchParams.set("fields", "review,rating,user_ratings_total");
  url.searchParams.set("reviews_sort", "newest");
  url.searchParams.set("key", process.env.GOOGLE_PLACES_API_KEY!);

  try {
    const res = await fetch(url, {
      // Cache for a day. Reviews change slowly and the endpoint is billed
      // per call — refetching on every render would be wasteful.
      next: { revalidate: 86_400, tags: ["google-reviews"] },
    });

    if (!res.ok) throw new Error(`Places API returned ${res.status}`);

    const json = (await res.json()) as {
      status: string;
      error_message?: string;
      result?: { reviews?: PlacesReview[] };
    };

    if (json.status !== "OK") {
      throw new Error(json.error_message ?? `Places API status: ${json.status}`);
    }

    const reviews = json.result?.reviews ?? [];
    if (!reviews.length) return null;

    return reviews.map((r, i) => ({
      id: `google-${r.time}-${i}`,
      name: r.author_name,
      location: "",
      rating: r.rating,
      quote: r.text,
      context: r.relative_time_description,
      date: new Date(r.time * 1000).toISOString(),
      source: "Google" as const,
    }));
  } catch (err) {
    console.error("[google-reviews] fetch failed, falling back:", err);
    return null;
  }
}
