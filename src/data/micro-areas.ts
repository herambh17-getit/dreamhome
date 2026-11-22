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
  /**
   * A draft is built but kept off the public site: noindex, left out of the
   * sitemap and llms.txt. Remove the flag once the area has the business's own
   * price bands and building names, which are what make the page worth indexing.
   */
  draft?: boolean;
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
  {
    slug: "magathane",
    parent: "borivali",
    name: "Magathane",
    fullName: "Magathane, Borivali East",
    h1: "Property in Magathane, Borivali East — Buy, Rent, Lease",
    intro: [
      "Magathane is part of the Borivali East belt along the Western Express Highway, close to Devipada and served by Metro Line 7. It suits buyers and tenants who want quick access to the highway and the Metro, with Sanjay Gandhi National Park and Borivali's established schools, hospitals and shops nearby.",
      `Dream Home Properties is based in Borivali East and has worked here since ${siteConfig.founded}. Tell us your budget, the size of home you need and when you want to move, and we will tell you honestly which Magathane buildings are worth seeing and which are not.`,
    ],
    why: [
      "On the Western Express Highway, with Metro Line 7 serving the area",
      "Part of the established Borivali East belt, with schools, hospitals and retail already in place",
      "Sanjay Gandhi National Park sits on Borivali East's eastern edge",
      "A mix of older society buildings and newer redeveloped towers, so the specific building usually matters more than the address",
    ],
    cta: "Tell us your budget, preferred size and move-in date, and we'll come back with honest options in Magathane.",
    draft: true,
  },
  {
    slug: "dahisar-east",
    parent: "borivali",
    name: "Dahisar East",
    fullName: "Dahisar East, Mumbai",
    h1: "Property in Dahisar East, Mumbai — Buy, Rent, Lease",
    intro: [
      "Dahisar East sits at the northern edge of Mumbai, just beyond Borivali East. It has Dahisar railway station on the Western Line, the Western Express Highway close by, and Metro Lines 7 and 2A both starting at Dahisar East, which makes it one of the better-connected areas at the top of the western suburbs.",
      `Our office is in Borivali East, next door, and we have worked in this part of north Mumbai since ${siteConfig.founded}. Tell us your budget, the size of home you need and when you want to move, and we will tell you honestly which Dahisar East buildings are worth seeing and which are not.`,
    ],
    why: [
      "Dahisar railway station on the Western Line, the last station within Mumbai",
      "Close to the Western Express Highway at the city's northern entrance",
      "Metro Lines 7 and 2A both start at Dahisar East",
      "Next door to Borivali East, so Borivali's schools, hospitals and shops are within easy reach",
    ],
    cta: "Tell us your budget, preferred size and move-in date, and we'll come back with honest options in Dahisar East.",
    draft: true,
  },
];

export function getMicroArea(parent: string, slug: string): MicroArea | undefined {
  return microAreas.find((a) => a.parent === parent && a.slug === slug);
}

export function getMicroAreasFor(parent: string): MicroArea[] {
  return microAreas.filter((a) => a.parent === parent);
}
