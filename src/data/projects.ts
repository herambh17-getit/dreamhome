import type { Developer, Project } from "@/lib/types";

/**
 * ⚠️  SAMPLE DATA — NOT REAL PROJECTS OR DEVELOPERS. REPLACE BEFORE LAUNCH.
 *
 * Developer names here are deliberately fictional. Listing invented projects,
 * prices or possession dates under a real developer's name would misrepresent
 * that company and is not something to ship, even as a placeholder.
 *
 * When real channel-partner inventory is loaded, replace these wholesale and
 * use the developer's actual MahaRERA registration in `rera`.
 */

export const SAMPLE_RERA = "RERA number pending — sample project";

export const developers: Developer[] = [
  {
    id: "dev-a",
    slug: "sample-developer-a",
    name: "Sample Developer A",
    established: 1998,
    description:
      "Placeholder developer profile. Replace with the real developer's history, delivery track record and current portfolio once channel-partner inventory is confirmed.",
    projectCount: 2,
  },
  {
    id: "dev-b",
    slug: "sample-developer-b",
    name: "Sample Developer B",
    established: 2005,
    description:
      "Placeholder developer profile. Replace with the real developer's history, delivery track record and current portfolio.",
    projectCount: 2,
  },
  {
    id: "dev-c",
    slug: "sample-developer-c",
    name: "Sample Developer C",
    established: 2011,
    description:
      "Placeholder developer profile. Replace with the real developer's history, delivery track record and current portfolio.",
    projectCount: 2,
  },
  {
    id: "dev-d",
    slug: "sample-developer-d",
    name: "Sample Developer D",
    established: 2001,
    description:
      "Placeholder developer profile. Replace with the real developer's history, delivery track record and current portfolio.",
    projectCount: 2,
  },
];

export const projects: Project[] = [
  {
    id: "proj-001",
    slug: "sample-project-parkview-borivali-east",
    name: "Sample Project — Parkview, Borivali East",
    developer: "Sample Developer A",
    developerSlug: "sample-developer-a",
    location: "Borivali East, Mumbai",
    locationSlug: "borivali",
    configurations: ["2 BHK", "3 BHK"],
    priceFrom: 21000000,
    status: "Under Construction",
    rera: SAMPLE_RERA,
    possession: "Dec 2027",
    description:
      "Placeholder project. Replace the description, pricing, possession date and RERA registration with the developer's actual approved details before this page is published.",
    highlights: [
      "Placeholder highlight — e.g. proximity to the national park",
      "Placeholder highlight — e.g. podium-level amenity deck",
      "Placeholder highlight — e.g. three-side open apartments",
    ],
    amenities: [
      "Clubhouse",
      "Swimming pool",
      "Gymnasium",
      "Children's play area",
      "Landscaped podium",
      "24×7 security",
      "Power backup",
      "Covered parking",
    ],
    gallery: [
      "/images/locations/borivali.jpg",
      "/images/properties/mumbai-towers.jpg",
      "/images/properties/mumbai-skyline.jpg",
    ],
    featured: true,
  },
  {
    id: "proj-002",
    slug: "sample-project-skyline-goregaon-east",
    name: "Sample Project — Skyline, Goregaon East",
    developer: "Sample Developer C",
    developerSlug: "sample-developer-c",
    location: "Goregaon East, Mumbai",
    locationSlug: "goregaon",
    configurations: ["3 BHK", "4 BHK"],
    priceFrom: 52000000,
    status: "New Launch",
    rera: SAMPLE_RERA,
    possession: "Jun 2029",
    description:
      "Placeholder project. Replace with the developer's actual approved details before publishing.",
    highlights: [
      "Placeholder highlight",
      "Placeholder highlight",
      "Placeholder highlight",
    ],
    amenities: [
      "Infinity pool",
      "Clubhouse",
      "Concierge",
      "Gymnasium",
      "Co-working lounge",
      "Landscaped deck",
      "24×7 security",
    ],
    gallery: [
      "/images/locations/goregaon.jpg",
      "/images/properties/mumbai-skyline.jpg",
      "/images/properties/mumbai-city.jpg",
    ],
    featured: true,
  },
  {
    id: "proj-003",
    slug: "sample-project-greens-kandivali-east",
    name: "Sample Project — The Greens, Kandivali East",
    developer: "Sample Developer B",
    developerSlug: "sample-developer-b",
    location: "Kandivali East, Mumbai",
    locationSlug: "kandivali",
    configurations: ["1 BHK", "2 BHK"],
    priceFrom: 13500000,
    status: "Under Construction",
    rera: SAMPLE_RERA,
    possession: "Mar 2028",
    description:
      "Placeholder project. Replace with the developer's actual approved details before publishing.",
    highlights: ["Placeholder highlight", "Placeholder highlight"],
    amenities: [
      "Clubhouse",
      "Gymnasium",
      "Jogging track",
      "Children's play area",
      "24×7 security",
      "Covered parking",
    ],
    gallery: [
      "/images/locations/kandivali.jpg",
      "/images/properties/mumbai-towers.jpg",
      "/images/properties/mumbai-sealink.jpg",
    ],
    featured: true,
  },
  {
    id: "proj-004",
    slug: "sample-project-junction-andheri-east",
    name: "Sample Project — Junction, Andheri East",
    developer: "Sample Developer D",
    developerSlug: "sample-developer-d",
    location: "Andheri East, Mumbai",
    locationSlug: "andheri",
    configurations: ["Office", "Showroom"],
    priceFrom: 38000000,
    status: "Ready to Move",
    rera: SAMPLE_RERA,
    possession: "Ready",
    description:
      "Placeholder commercial project. Replace with the developer's actual approved details before publishing.",
    highlights: ["Placeholder highlight", "Placeholder highlight"],
    amenities: [
      "Central air conditioning",
      "Dedicated parking",
      "24×7 access",
      "Power backup",
      "Food court",
      "Passenger and service lifts",
    ],
    gallery: [
      "/images/locations/andheri.jpg",
      "/images/properties/mumbai-city.jpg",
      "/images/properties/mumbai-sealink.jpg",
    ],
    featured: false,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getDeveloper(slug: string): Developer | undefined {
  return developers.find((d) => d.slug === slug);
}

export function getProjectsByDeveloper(developerSlug: string): Project[] {
  return projects.filter((p) => p.developerSlug === developerSlug);
}
