/**
 * Domain types.
 *
 * `Property` follows the "Property Data Schema" in the source data sheet
 * field-for-field. Field names are kept exactly as specified so the schema
 * stays traceable back to the client's own document.
 */

export type PropertyType =
  | "Apartment"
  | "Villa"
  | "Penthouse"
  | "Plot"
  | "Office"
  | "Shop"
  | "Showroom"
  | "Warehouse";

export type PropertyStatus =
  | "Ready to Move"
  | "Under Construction"
  | "New Launch"
  | "Resale"
  | "Sold";

export type ListingIntent = "buy" | "rent" | "commercial";

export interface FloorPlan {
  label: string;
  carpetArea: number;
  image: string;
  price?: number;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  propertyType: PropertyType;
  /** e.g. "2 BHK", "3.5 BHK", "Shop" */
  configuration: string;
  location: string;
  /** Locality slug, used to join a property to a location page. */
  locationSlug: string;
  /** In INR. Absolute rupees, not lakhs/crores — format at the edge. */
  price: number;
  /** Monthly rent in INR, when the listing is a rental. */
  rent?: number;
  /** In sq. ft. */
  carpetArea: number;
  developer: string;
  developerSlug?: string;
  status: PropertyStatus;
  /** MahaRERA registration number. Empty string = not applicable/pending. */
  rera: string;
  description: string;
  amenities: string[];
  gallery: string[];
  floorPlans: FloorPlan[];
  intent: ListingIntent;
  featured: boolean;
  possession?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  developer: string;
  developerSlug: string;
  location: string;
  locationSlug: string;
  configurations: string[];
  priceFrom: number;
  status: PropertyStatus;
  rera: string;
  possession: string;
  description: string;
  highlights: string[];
  amenities: string[];
  gallery: string[];
  featured: boolean;
}

export interface Developer {
  id: string;
  slug: string;
  name: string;
  established?: number;
  description: string;
  logo?: string;
  projectCount: number;
}

export interface Location {
  id: string;
  slug: string;
  name: string;
  /** Short line used on cards. */
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
  connectivity: string[];
  /** Indicative rate in INR per sq. ft. */
  avgPricePerSqft: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  /** What the client transacted, e.g. "Bought a 2 BHK in Borivali East". */
  context: string;
  date: string;
  source: "Google" | "Direct";
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Markdown-ish body. Rendered by a lightweight renderer, not dangerouslySet. */
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  readingMinutes: number;
  image: string;
  tags: string[];
  featured: boolean;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
}

/** Shape written to the `enquiries` table and consumed by the CRM. */
export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  /** Which form/section produced this lead. Drives CRM routing. */
  source: string;
  intent?: ListingIntent;
  propertyId?: string;
  budget?: string;
  status: "new" | "contacted" | "qualified" | "closed";
  createdAt: string;
}

/** Filters accepted by the property search. Mirrors the URL query string. */
export interface PropertyFilters {
  q?: string;
  intent?: ListingIntent;
  propertyType?: PropertyType;
  configuration?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: PropertyStatus;
  sort?: "newest" | "price-asc" | "price-desc" | "area-desc";
}
