import { siteConfig } from "@/lib/site-config";

/**
 * Neighbourhood ("micro-area") pages, nested under a locality:
 * /locations/[locality]/[area] — e.g. /locations/borivali/shantivan.
 *
 * Every page uses the same five sections — intro → price bands → why →
 * buildings → CTA — but the local detail must be written for each area,
 * never copy-pasted. Content here comes from the business: price bands are
 * its own current figures and must carry an "as of" date; buildings are
 * listed only once the business confirms the real names it deals in.
 *
 * Next candidates: Borivali East (main), Dahisar East, Kandivali East,
 * Magathane, Nensey Colony.
 */

export interface PriceBand {
  config: string;
  range: string;
}

export interface MicroArea {
  slug: string;
  /** Slug of the parent locality guide in `locations`. */
  parent: string;
  /** Short name, e.g. "Shantivan". */
  name: string;
  /** Name with its side/suburb, e.g. "Shantivan, Borivali East". */
  fullName: string;
  h1: string;
  intro: string[];
  priceBands?: {
    resale: PriceBand[];
    rent: PriceBand[];
    asOf: string;
    note: string;
  };
  why: string[];
  /** Real buildings the business deals in. Omit until confirmed. */
  buildings?: string[];
  cta: string;
}

export const microAreas: MicroArea[] = [
  {
    slug: "shantivan",
    parent: "borivali",
    name: "Shantivan",
    fullName: "Shantivan, Borivali East",
    h1: "Property in Shantivan, Borivali East — Buy, Rent, Lease",
    intro: [
      "Shantivan sits off Shiv Vallabh Road in Borivali East, between Ashok Van and the Devipada belt. It's a quieter pocket than the main-road buildings, with older 4-storey societies around Shri Krishna Nagar and newer towers along the arterial lanes. Most inventory here is 1 and 2 BHK, with 3 BHKs available in the taller projects. Families pick Shantivan for the walk to Universal High School, proximity to the National Park, and a 5-minute auto to the Western Express Highway for anyone commuting south.",
      `We've been placing families and investors in Shantivan buildings since ${siteConfig.founded}. If you're thinking of buying, selling or renting here, we know the current asking prices, the OC status of most buildings, and which society NOCs typically delay a deal.`,
    ],
    priceBands: {
      resale: [
        { config: "1 BHK", range: "₹60–75 L" },
        { config: "2 BHK", range: "₹1.1–1.5 Cr" },
        { config: "3 BHK", range: "₹1.8–2.3 Cr" },
      ],
      rent: [
        { config: "1 BHK", range: "₹22–28k / month" },
        { config: "2 BHK", range: "₹35–45k / month" },
        { config: "3 BHK", range: "₹55–70k / month" },
      ],
      asOf: "November 2026",
      note: "Bands reflect typical asking prices. Actual deal values vary by floor, view, OC status and furnishing.",
    },
    why: [
      "10-min walk to Devipada bus stop and Magathane for daily shopping",
      "Universal High School, St. Francis and Oxford High are all within 1 km",
      "Dahisar metro and Borivali East station both ~15 min by auto",
      "Sanjay Gandhi National Park at the doorstep",
      "Quieter lanes, less traffic than the Shimpoli Road side",
    ],
    cta: "Tell us your budget, preferred size and move-in date. We'll send a shortlist of 4–5 Shantivan options within 24 hours.",
  },
];

export function getMicroArea(parent: string, slug: string): MicroArea | undefined {
  return microAreas.find((a) => a.parent === parent && a.slug === slug);
}

export function getMicroAreasFor(parent: string): MicroArea[] {
  return microAreas.filter((a) => a.parent === parent);
}
