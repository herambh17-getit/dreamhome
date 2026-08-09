import type { Location } from "@/lib/types";

/**
 * Service-area locality pages. The service areas themselves come from the
 * client's data sheet (Borivali, Kandivali, Malad, Goregaon, Andheri).
 *
 * Locality descriptions and connectivity below are general, publicly-known
 * facts about these Mumbai suburbs. `avgPricePerSqft` is INDICATIVE and
 * must be reviewed before launch — rates move, and a stale number on a
 * public page is a credibility problem for a consultancy selling accuracy.
 */
export const locations: Location[] = [
  {
    id: "loc-borivali",
    slug: "borivali",
    name: "Borivali",
    tagline: "Green, well-connected, and still genuinely liveable",
    description:
      "Borivali is where a lot of Mumbai families end up when they want space without leaving the city. Sanjay Gandhi National Park sits on its doorstep, the Western Express Highway and the railway line both run through it, and the retail and schooling infrastructure is mature rather than promised. Borivali East in particular has seen steady redevelopment, which means a mix of older society stock and new towers within the same few streets — and a wide price range to match.",
    image: "/images/locations/borivali.jpg",
    highlights: [
      "Sanjay Gandhi National Park on the eastern edge",
      "Deep supply of 1, 2 and 3 BHK society stock",
      "Active redevelopment pipeline across the east",
      "Established schools, hospitals and retail",
    ],
    connectivity: [
      "Borivali station — Western Line, plus outstation halts",
      "Western Express Highway",
      "Metro Line 7 (Dahisar–Andheri East)",
      "~40 min to the international airport",
    ],
    avgPricePerSqft: 24000,
  },
  {
    id: "loc-kandivali",
    slug: "kandivali",
    name: "Kandivali",
    tagline: "Strong value, and the Metro changed the maths",
    description:
      "Kandivali has quietly become one of the better-value propositions on the western corridor. Charkop and Mahavir Nagar to the west, Thakur Village and Lokhandwala Township to the east — each with a distinct character and price point. The Metro has meaningfully improved the commute to Andheri and BKC, which has shown up in both rents and resale.",
    image: "/images/locations/kandivali.jpg",
    highlights: [
      "Thakur Village and Lokhandwala Township as planned pockets",
      "Better price-per-square-foot than Borivali or Malad",
      "Growing inventory of newer, amenity-led towers",
      "Strong rental demand from working professionals",
    ],
    connectivity: [
      "Kandivali station — Western Line",
      "Metro Line 7",
      "Western Express Highway and Link Road",
      "Direct access to Malad and Goregaon business districts",
    ],
    avgPricePerSqft: 22000,
  },
  {
    id: "loc-malad",
    slug: "malad",
    name: "Malad",
    tagline: "Where the offices are — and the commute is a walk",
    description:
      "Malad, particularly Malad West and the Mindspace belt, is one of the suburbs where you can genuinely live near where you work. The IT and BPO concentration drives consistent rental demand, and the retail infrastructure — Infiniti, Inorbit — is among the strongest in the western suburbs. That convenience is priced in, but for anyone working in Mindspace or Goregaon, the time saved is real.",
    image: "/images/locations/malad.jpg",
    highlights: [
      "Mindspace — a major IT and commercial hub",
      "Reliable rental yields driven by working tenants",
      "Infiniti and Inorbit malls; deep F&B and retail",
      "Aksa and Marve beaches within reach to the west",
    ],
    connectivity: [
      "Malad station — Western Line",
      "Link Road and Western Express Highway",
      "Short hop to Goregaon and Andheri business districts",
      "Metro Line 7 via Goregaon",
    ],
    avgPricePerSqft: 23000,
  },
  {
    id: "loc-goregaon",
    slug: "goregaon",
    name: "Goregaon",
    tagline: "The centre of gravity keeps shifting here",
    description:
      "Goregaon has changed faster than most of its neighbours. Nesco and the Bombay Exhibition Centre anchor the east, Film City sits behind it, and the Oberoi Garden City development reset what the western suburbs expected from a large integrated township. It is well positioned between the northern suburbs and the Andheri–BKC employment belt, which is most of the reason prices have held.",
    highlights: [
      "Oberoi Garden City and other large integrated townships",
      "Nesco / Bombay Exhibition Centre commercial hub",
      "Film City and the media cluster",
      "Genuinely central on the western corridor",
    ],
    connectivity: [
      "Goregaon station — Western Line and Harbour Line link",
      "Metro Line 7",
      "Western Express Highway and Link Road",
      "Direct road access to JVLR and the eastern suburbs",
    ],
    image: "/images/locations/goregaon.jpg",
    avgPricePerSqft: 26000,
  },
  {
    id: "loc-andheri",
    slug: "andheri",
    name: "Andheri",
    tagline: "Mumbai's busiest suburb, for good reasons",
    description:
      "Andheri is the hinge of the western suburbs. The airport, SEEPZ, MIDC, Lokhandwala, Versova, and a Metro interchange are all inside it, and it is the closest of our service areas to BKC. It is also the most expensive and the most congested — which is the honest trade-off. What you buy in Andheri is access.",
    image: "/images/locations/andheri.jpg",
    highlights: [
      "Closest of our service areas to BKC and the airport",
      "SEEPZ and MIDC employment base",
      "Lokhandwala and Versova for premium residential",
      "The deepest commercial office market in the suburbs",
    ],
    connectivity: [
      "Andheri station — Western, Harbour and Metro interchange",
      "Metro Lines 1, 2A and 7",
      "Chhatrapati Shivaji Maharaj International Airport",
      "Western Express Highway, JVLR and the Andheri–Ghatkopar Link Road",
    ],
    avgPricePerSqft: 31000,
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
