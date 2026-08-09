import "server-only";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { properties as seedProperties } from "@/data/properties";
import { projects as seedProjects, developers as seedDevelopers } from "@/data/projects";
import { locations as seedLocations } from "@/data/locations";
import { blogPosts as seedPosts } from "@/data/blog";
import { faqs as seedFaqs } from "@/data/faqs";
import { TESTIMONIALS } from "@/data/testimonials";
import { filterProperties } from "@/lib/property-filters";
import type {
  BlogPost,
  Developer,
  Faq,
  Location,
  Project,
  Property,
  PropertyFilters,
  Testimonial,
} from "@/lib/types";

/**
 * Data access for public pages.
 *
 * Every function reads Supabase when it is configured and falls back to the
 * seed files otherwise. Pages never branch on this — they call these
 * functions and get data either way, which keeps the site demoable with no
 * database and makes the eventual cutover a config change rather than a
 * refactor.
 *
 * If a Supabase query errors we log and fall back rather than throwing. A
 * transient database problem should degrade the site, not blank it.
 */

/* ------------------------------------------------------------------ */
/* row mappers                                                         */
/* ------------------------------------------------------------------ */

/* eslint-disable @typescript-eslint/no-explicit-any */

function rowToProperty(r: any): Property {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    propertyType: r.property_type,
    configuration: r.configuration,
    location: r.location,
    locationSlug: r.location_slug ?? "",
    price: Number(r.price ?? 0),
    rent: r.rent ? Number(r.rent) : undefined,
    carpetArea: r.carpet_area,
    developer: r.developer ?? "",
    developerSlug: r.developer_slug ?? undefined,
    status: r.status,
    rera: r.rera ?? "",
    description: r.description ?? "",
    amenities: r.amenities ?? [],
    gallery: r.gallery ?? [],
    floorPlans: r.floor_plans ?? [],
    intent: r.intent,
    featured: r.featured,
    possession: r.possession ?? undefined,
    createdAt: r.created_at,
  };
}

function rowToProject(r: any): Project {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    developer: r.developer ?? "",
    developerSlug: r.developer_slug ?? "",
    location: r.location,
    locationSlug: r.location_slug ?? "",
    configurations: r.configurations ?? [],
    priceFrom: Number(r.price_from ?? 0),
    status: r.status,
    rera: r.rera ?? "",
    possession: r.possession ?? "",
    description: r.description ?? "",
    highlights: r.highlights ?? [],
    amenities: r.amenities ?? [],
    gallery: r.gallery ?? [],
    featured: r.featured,
  };
}

function rowToPost(r: any): BlogPost {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt ?? "",
    content: r.content ?? "",
    category: r.category ?? "",
    author: r.author ?? "",
    publishedAt: r.published_at,
    readingMinutes: r.reading_minutes ?? 5,
    image: r.image ?? "",
    tags: r.tags ?? [],
    featured: r.featured,
  };
}

/* eslint-enable @typescript-eslint/no-explicit-any */

/* ------------------------------------------------------------------ */
/* properties                                                          */
/* ------------------------------------------------------------------ */

/**
 * Applies filters to seed data. Delegates to the shared, isomorphic
 * `filterProperties` so the seed path and the client-side browser can never
 * drift apart.
 */
function filterSeed(list: Property[], f: PropertyFilters): Property[] {
  return filterProperties(list, f);
}

export async function getProperties(
  filters: PropertyFilters = {},
): Promise<Property[]> {
  if (!isSupabaseConfigured()) return filterSeed(seedProperties, filters);

  try {
    const supabase = await createClient();
    let query = supabase.from("properties").select("*").eq("published", true);

    if (filters.intent) query = query.eq("intent", filters.intent);
    if (filters.propertyType)
      query = query.eq("property_type", filters.propertyType);
    if (filters.configuration)
      query = query.eq("configuration", filters.configuration);
    if (filters.location) query = query.eq("location_slug", filters.location);
    if (filters.status) query = query.eq("status", filters.status);
    if (filters.minPrice != null) query = query.gte("price", filters.minPrice);
    if (filters.maxPrice != null) query = query.lte("price", filters.maxPrice);
    if (filters.q) query = query.textSearch("search_vector", filters.q);

    switch (filters.sort) {
      case "price-asc":
        query = query.order("price", { ascending: true });
        break;
      case "price-desc":
        query = query.order("price", { ascending: false });
        break;
      case "area-desc":
        query = query.order("carpet_area", { ascending: false });
        break;
      default:
        query = query.order("created_at", { ascending: false });
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []).map(rowToProperty);
  } catch (err) {
    console.error("[queries] getProperties fell back to seed data:", err);
    return filterSeed(seedProperties, filters);
  }
}

export async function getPropertyBySlug(
  slug: string,
): Promise<Property | null> {
  if (!isSupabaseConfigured())
    return seedProperties.find((p) => p.slug === slug) ?? null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw error;
    return data ? rowToProperty(data) : null;
  } catch (err) {
    console.error("[queries] getPropertyBySlug fell back to seed data:", err);
    return seedProperties.find((p) => p.slug === slug) ?? null;
  }
}

export async function getFeaturedProperties(limit = 6): Promise<Property[]> {
  if (!isSupabaseConfigured())
    return seedProperties.filter((p) => p.featured).slice(0, limit);

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("published", true)
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return (data ?? []).map(rowToProperty);
  } catch (err) {
    console.error("[queries] getFeaturedProperties fell back:", err);
    return seedProperties.filter((p) => p.featured).slice(0, limit);
  }
}

/** Slugs for `generateStaticParams`. Seed slugs are the build-time floor. */
export async function getAllPropertySlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) return seedProperties.map((p) => p.slug);

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("properties")
      .select("slug")
      .eq("published", true);
    if (error) throw error;
    return (data ?? []).map((r) => r.slug as string);
  } catch {
    return seedProperties.map((p) => p.slug);
  }
}

/* ------------------------------------------------------------------ */
/* projects & developers                                               */
/* ------------------------------------------------------------------ */

export async function getProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) return seedProjects;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map(rowToProject);
  } catch (err) {
    console.error("[queries] getProjects fell back:", err);
    return seedProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getDevelopers(): Promise<Developer[]> {
  if (!isSupabaseConfigured()) return seedDevelopers;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("developers").select("*");
    if (error) throw error;
    const projects = await getProjects();
    return (data ?? []).map((r) => ({
      id: r.id,
      slug: r.slug,
      name: r.name,
      established: r.established ?? undefined,
      description: r.description ?? "",
      logo: r.logo ?? undefined,
      projectCount: projects.filter((p) => p.developerSlug === r.slug).length,
    }));
  } catch (err) {
    console.error("[queries] getDevelopers fell back:", err);
    return seedDevelopers;
  }
}

export async function getDeveloperBySlug(
  slug: string,
): Promise<Developer | null> {
  const all = await getDevelopers();
  return all.find((d) => d.slug === slug) ?? null;
}

/* ------------------------------------------------------------------ */
/* locations                                                           */
/* ------------------------------------------------------------------ */

export async function getLocations(): Promise<Location[]> {
  if (!isSupabaseConfigured()) return seedLocations;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("locations").select("*");
    if (error) throw error;
    if (!data?.length) return seedLocations;
    return data.map((r) => ({
      id: r.id,
      slug: r.slug,
      name: r.name,
      tagline: r.tagline ?? "",
      description: r.description ?? "",
      image: r.image ?? "",
      highlights: r.highlights ?? [],
      connectivity: r.connectivity ?? [],
      avgPricePerSqft: r.avg_price_per_sqft ?? 0,
    }));
  } catch (err) {
    console.error("[queries] getLocations fell back:", err);
    return seedLocations;
  }
}

export async function getLocationBySlug(
  slug: string,
): Promise<Location | null> {
  const all = await getLocations();
  return all.find((l) => l.slug === slug) ?? null;
}

/* ------------------------------------------------------------------ */
/* blog                                                                */
/* ------------------------------------------------------------------ */

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) return seedPosts;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map(rowToPost);
  } catch (err) {
    console.error("[queries] getBlogPosts fell back:", err);
    return seedPosts;
  }
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const all = await getBlogPosts();
  return all.find((p) => p.slug === slug) ?? null;
}

/* ------------------------------------------------------------------ */
/* testimonials                                                        */
/* ------------------------------------------------------------------ */

/**
 * Only ever returns reviews that are both published and consented — the RLS
 * policy enforces this server-side, and the seed path returns the curated,
 * owner-confirmed testimonials. See `data/testimonials.ts`.
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) return TESTIMONIALS;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("published", true)
      .eq("consented", true)
      .order("created_at", { ascending: false });
    if (error) throw error;
    if (!data?.length) return TESTIMONIALS;
    return data.map((r) => ({
      id: r.id,
      name: r.name,
      location: r.location ?? "",
      rating: r.rating,
      quote: r.quote,
      context: r.context ?? "",
      date: r.created_at,
      source: r.source,
    }));
  } catch (err) {
    console.error("[queries] getTestimonials fell back:", err);
    return TESTIMONIALS;
  }
}

/* ------------------------------------------------------------------ */
/* faqs                                                                */
/* ------------------------------------------------------------------ */

export async function getFaqs(): Promise<Faq[]> {
  if (!isSupabaseConfigured()) return seedFaqs;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    if (!data?.length) return seedFaqs;
    return data.map((r) => ({
      id: r.id,
      question: r.question,
      answer: r.answer,
      category: r.category ?? "General",
    }));
  } catch (err) {
    console.error("[queries] getFaqs fell back:", err);
    return seedFaqs;
  }
}
