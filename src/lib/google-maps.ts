import { siteConfig } from "@/lib/site-config";

/**
 * Google Maps / Business Profile links.
 *
 * None of these need an API key. Querying by business name + full address
 * (rather than the address alone) makes Google resolve to the Business
 * Profile listing — so the map shows the named pin with its rating and
 * reviews link, not an anonymous street marker.
 */

const placeId = (): string =>
  process.env.GOOGLE_PLACE_ID || siteConfig.google.placeId;

const businessQuery = encodeURIComponent(
  `${siteConfig.name}, ${siteConfig.contact.address.full}`,
);

/** Embeddable live Google Map centred on the business listing. */
export function mapEmbedSrc(): string {
  return `https://maps.google.com/maps?q=${businessQuery}&z=16&output=embed`;
}

/** The Business Profile on Google Maps. */
export function profileUrl(): string {
  if (siteConfig.google.profileUrl) return siteConfig.google.profileUrl;
  const id = placeId();
  return `https://www.google.com/maps/search/?api=1&query=${businessQuery}${
    id ? `&query_place_id=${id}` : ""
  }`;
}

/** Turn-by-turn directions from the visitor's location. */
export function directionsUrl(): string {
  const id = placeId();
  return `https://www.google.com/maps/dir/?api=1&destination=${businessQuery}${
    id ? `&destination_place_id=${id}` : ""
  }`;
}

/** Opens Google's "write a review" dialog. Needs a Place ID. */
export function writeReviewUrl(): string | null {
  const id = placeId();
  return id ? `https://search.google.com/local/writereview?placeid=${id}` : null;
}
