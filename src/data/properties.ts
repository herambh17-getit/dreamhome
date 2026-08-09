import type { Property } from "@/lib/types";

/**
 * ⚠️  SAMPLE DATA — NOT REAL LISTINGS. REPLACE BEFORE LAUNCH.
 *
 * These records exist so the site renders, is styleable, and can be
 * demoed end-to-end before Supabase is connected. Three deliberate choices:
 *
 * 1. `rera` is a placeholder string, never a real-looking number. MahaRERA
 *    IDs are regulatory identifiers — inventing plausible ones and publishing
 *    them would mislead buyers and expose the business. Real IDs only.
 * 2. Developer names are fictional. Attaching invented projects, prices or
 *    possession dates to real developers would misrepresent them.
 * 3. Prices are round, illustrative figures — not quotes.
 *
 * Once Supabase is connected, `lib/queries.ts` reads from the database and
 * falls back to this file only when credentials are absent.
 */

export const SAMPLE_RERA = "RERA number pending — sample listing";

export const properties: Property[] = [
  {
    id: "prop-001",
    slug: "3-bhk-apartment-borivali-east-parkview-residences",
    title: "3 BHK in a redeveloped tower, minutes from the national park",
    propertyType: "Apartment",
    configuration: "3 BHK",
    location: "Borivali East, Mumbai",
    locationSlug: "borivali",
    price: 32500000,
    carpetArea: 1180,
    developer: "Sample Developer A",
    developerSlug: "sample-developer-a",
    status: "Ready to Move",
    rera: SAMPLE_RERA,
    description:
      "A corner unit on a high floor with cross-ventilation on three sides and an unobstructed green outlook toward Sanjay Gandhi National Park. The building completed redevelopment recently, so the structure is new while the society itself is long-established and settled — which in practice means fewer teething problems than a brand-new launch.",
    amenities: [
      "Covered parking",
      "Clubhouse",
      "Gymnasium",
      "Children's play area",
      "24×7 security",
      "Power backup",
      "Landscaped podium",
      "Rainwater harvesting",
    ],
    gallery: [
      "/images/locations/borivali.jpg",
      "/images/properties/mumbai-towers.jpg",
      "/images/properties/mumbai-skyline.jpg",
    ],
    floorPlans: [
      {
        label: "3 BHK — Type A",
        carpetArea: 1180,
        image: "",
        price: 32500000,
      },
    ],
    intent: "buy",
    featured: true,
    possession: "Ready",
    createdAt: "2026-06-02",
  },
  {
    id: "prop-002",
    slug: "2-bhk-apartment-kandivali-east-thakur-village",
    title: "2 BHK in Thakur Village with a genuinely usable layout",
    propertyType: "Apartment",
    configuration: "2 BHK",
    location: "Kandivali East, Mumbai",
    locationSlug: "kandivali",
    price: 19800000,
    carpetArea: 745,
    developer: "Sample Developer B",
    developerSlug: "sample-developer-b",
    status: "Ready to Move",
    rera: SAMPLE_RERA,
    description:
      "Thakur Village is one of the better-planned pockets in the western suburbs, and this unit benefits from it — wide internal roads, mature trees, and everyday retail within walking distance. The flat itself has minimal passage waste, so the carpet area does more work than the number suggests.",
    amenities: [
      "Covered parking",
      "Lift",
      "24×7 security",
      "Power backup",
      "Society garden",
      "Visitor parking",
    ],
    gallery: [
      "/images/properties/thakur-village.jpg",
      "/images/properties/mumbai-towers.jpg",
      "/images/properties/mumbai-city.jpg",
    ],
    floorPlans: [
      {
        label: "2 BHK",
        carpetArea: 745,
        image: "",
        price: 19800000,
      },
    ],
    intent: "buy",
    featured: true,
    possession: "Ready",
    createdAt: "2026-06-18",
  },
  {
    id: "prop-003",
    slug: "4-bhk-penthouse-goregaon-east-skyline",
    title: "4 BHK duplex penthouse with a private terrace",
    propertyType: "Penthouse",
    configuration: "4 BHK",
    location: "Goregaon East, Mumbai",
    locationSlug: "goregaon",
    price: 78000000,
    carpetArea: 2340,
    developer: "Sample Developer C",
    developerSlug: "sample-developer-c",
    status: "Ready to Move",
    rera: SAMPLE_RERA,
    description:
      "A duplex on the top two floors with roughly 900 sq. ft. of private terrace and a double-height living volume. West-facing, so the evening light is the main event. This is a large, specific home — it will suit one particular buyer very well and most others not at all.",
    amenities: [
      "Private terrace",
      "Double-height living room",
      "Two covered parking bays",
      "Concierge",
      "Infinity pool",
      "Clubhouse",
      "Gymnasium",
      "Landscaped deck",
      "24×7 security",
    ],
    gallery: [
      "/images/properties/goregaon-east.jpg",
      "/images/properties/mumbai-skyline.jpg",
      "/images/properties/mumbai-sealink.jpg",
    ],
    floorPlans: [
      {
        label: "Penthouse — lower level",
        carpetArea: 1400,
        image: "",
      },
      {
        label: "Penthouse — upper level",
        carpetArea: 940,
        image: "",
      },
    ],
    intent: "buy",
    featured: true,
    possession: "Ready",
    createdAt: "2026-05-11",
  },
  {
    id: "prop-004",
    slug: "2-bhk-rent-malad-west-mindspace",
    title: "2 BHK on rent, walking distance to Mindspace",
    propertyType: "Apartment",
    configuration: "2 BHK",
    location: "Malad West, Mumbai",
    locationSlug: "malad",
    price: 0,
    rent: 68000,
    carpetArea: 690,
    developer: "Sample Developer B",
    developerSlug: "sample-developer-b",
    status: "Ready to Move",
    rera: SAMPLE_RERA,
    description:
      "Semi-furnished, available immediately, and close enough to Mindspace that the commute is a walk rather than a negotiation with the Link Road. Suits a working couple or a small family. Society permits corporate leases.",
    amenities: [
      "Semi-furnished",
      "Covered parking",
      "Lift",
      "24×7 security",
      "Power backup",
      "Corporate lease permitted",
    ],
    gallery: [
      "/images/locations/malad.jpg",
      "/images/properties/mumbai-towers.jpg",
      "/images/properties/mumbai-city.jpg",
    ],
    floorPlans: [
      {
        label: "2 BHK",
        carpetArea: 690,
        image: "",
      },
    ],
    intent: "rent",
    featured: false,
    possession: "Immediate",
    createdAt: "2026-07-01",
  },
  {
    id: "prop-005",
    slug: "commercial-office-andheri-east-midc",
    title: "Fitted-out office floor in Andheri East",
    propertyType: "Office",
    configuration: "Office",
    location: "Andheri East, Mumbai",
    locationSlug: "andheri",
    price: 46000000,
    carpetArea: 1650,
    developer: "Sample Developer D",
    developerSlug: "sample-developer-d",
    status: "Ready to Move",
    rera: SAMPLE_RERA,
    description:
      "A full floor plate in the MIDC belt, already fitted out — workstations, two cabins, a meeting room and a pantry in place. Two dedicated parking bays. Practical for a team of roughly 30 that wants to move in rather than build out.",
    amenities: [
      "Fitted-out and furnished",
      "Two dedicated parking bays",
      "Central air conditioning",
      "Dedicated power backup",
      "24×7 access",
      "Passenger and service lifts",
    ],
    gallery: [
      "/images/locations/andheri.jpg",
      "/images/properties/mumbai-city.jpg",
      "/images/properties/mumbai-sealink.jpg",
    ],
    floorPlans: [
      {
        label: "Office floor plate",
        carpetArea: 1650,
        image: "",
      },
    ],
    intent: "commercial",
    featured: true,
    possession: "Ready",
    createdAt: "2026-06-25",
  },
  {
    id: "prop-006",
    slug: "1-bhk-apartment-borivali-west-new-launch",
    title: "1 BHK in a new launch, priced for first-time buyers",
    propertyType: "Apartment",
    configuration: "1 BHK",
    location: "Borivali West, Mumbai",
    locationSlug: "borivali",
    price: 11500000,
    carpetArea: 420,
    developer: "Sample Developer A",
    developerSlug: "sample-developer-a",
    status: "New Launch",
    rera: SAMPLE_RERA,
    description:
      "An entry point into Borivali West that does not require compromising on the location. New launch, so the payment is staged across construction — which helps cash flow but means you are buying a plan, not a finished flat. We will walk you through what that actually commits you to.",
    amenities: [
      "Clubhouse",
      "Gymnasium",
      "Children's play area",
      "Landscaped garden",
      "24×7 security",
      "Power backup",
      "Covered parking",
    ],
    gallery: [
      "/images/locations/borivali.jpg",
      "/images/properties/mumbai-towers.jpg",
      "/images/properties/mumbai-skyline.jpg",
    ],
    floorPlans: [
      {
        label: "1 BHK",
        carpetArea: 420,
        image: "",
        price: 11500000,
      },
    ],
    intent: "buy",
    featured: false,
    possession: "Dec 2028",
    createdAt: "2026-07-08",
  },
  {
    id: "prop-007",
    slug: "3-bhk-apartment-andheri-west-lokhandwala",
    title: "3 BHK in Lokhandwala, refurbished last year",
    propertyType: "Apartment",
    configuration: "3 BHK",
    location: "Andheri West, Mumbai",
    locationSlug: "andheri",
    price: 44000000,
    carpetArea: 1050,
    developer: "Sample Developer C",
    developerSlug: "sample-developer-c",
    status: "Resale",
    rera: SAMPLE_RERA,
    description:
      "A resale unit in a well-run Lokhandwala society, fully refurbished last year — new wiring, plumbing and finishes throughout. The society is old enough to have its paperwork genuinely in order, which is worth more than it sounds.",
    amenities: [
      "Recently refurbished",
      "Covered parking",
      "Society gymnasium",
      "24×7 security",
      "Power backup",
      "Lift",
    ],
    gallery: [
      "/images/locations/andheri.jpg",
      "/images/properties/mumbai-towers.jpg",
      "/images/properties/mumbai-city.jpg",
    ],
    floorPlans: [
      {
        label: "3 BHK",
        carpetArea: 1050,
        image: "",
      },
    ],
    intent: "buy",
    featured: false,
    possession: "Ready",
    createdAt: "2026-06-30",
  },
  {
    id: "prop-008",
    slug: "shop-kandivali-west-mahavir-nagar",
    title: "Ground-floor shop on a main road in Mahavir Nagar",
    propertyType: "Shop",
    configuration: "Shop",
    location: "Kandivali West, Mumbai",
    locationSlug: "kandivali",
    price: 28000000,
    carpetArea: 480,
    developer: "Sample Developer D",
    developerSlug: "sample-developer-d",
    status: "Ready to Move",
    rera: SAMPLE_RERA,
    description:
      "Main-road frontage with real footfall, currently tenanted on a lease with time left to run — so it produces income from day one. Suitable for F&B, clinic or retail use subject to society and licensing approvals, which we will check for you before you commit.",
    amenities: [
      "Main road frontage",
      "Currently tenanted",
      "Water and electricity connections",
      "Shutter and signage rights",
      "Customer parking on street",
    ],
    gallery: [
      "/images/locations/kandivali.jpg",
      "/images/properties/mumbai-sealink.jpg",
      "/images/properties/mumbai-city.jpg",
    ],
    floorPlans: [
      {
        label: "Shop layout",
        carpetArea: 480,
        image: "",
      },
    ],
    intent: "commercial",
    featured: false,
    possession: "On lease expiry",
    createdAt: "2026-05-28",
  },
];

export function getProperty(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured);
}
