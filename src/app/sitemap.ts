import type { MetadataRoute } from "next";
import {
  getBlogPosts,
  getDevelopers,
  getLocations,
  getProjects,
  getProperties,
} from "@/lib/queries";
import { isSampleRecord } from "@/lib/placeholder";
import { microAreas } from "@/data/micro-areas";
import { practiceAreas, services, siteConfig } from "@/lib/site-config";

/**
 * Sitemap, rebuilt from the same queries the pages use so it can never list
 * a page that does not exist or miss one that does.
 *
 * Two rules keep it trustworthy to search engines:
 *  - Sample/placeholder records are left out (their pages are noindex), and
 *    reappear automatically once replaced with real data.
 *  - `lastModified` is only set where we have a real date. Stamping every
 *    URL with "now" on each build teaches Google to ignore the field.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;

  const [properties, projects, locations, developers, posts] =
    await Promise.all([
      getProperties(),
      getProjects(),
      getLocations(),
      getDevelopers(),
      getBlogPosts(),
    ]);

  const realProjects = projects.filter((p) => !isSampleRecord(p));

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    // /properties is noindex while it has no real listings, so it is listed
    // here only once at least one exists (same rule as /projects).
    ...(properties.some((p) => !isSampleRecord(p))
      ? [{ url: `${base}/properties`, changeFrequency: "daily" as const, priority: 0.9 }]
      : []),
    ...(realProjects.length
      ? [{ url: `${base}/projects`, changeFrequency: "weekly" as const, priority: 0.8 }]
      : []),
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/locations`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/testimonials`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  return [
    ...staticRoutes,

    // Locality pages are the main organic entry points for
    // "property in <suburb>" searches, so they rank high here.
    ...locations.map((l) => ({
      url: `${base}/locations/${l.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),

    ...microAreas.map((a) => ({
      url: `${base}/locations/${a.parent}/${a.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),

    ...[...services, ...practiceAreas].map((s) => ({
      url: `${base}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    ...properties
      .filter((p) => !isSampleRecord(p))
      .map((p) => ({
        url: `${base}/properties/${p.slug}`,
        lastModified: new Date(p.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),

    ...realProjects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),

    ...developers
      .filter((d) => !isSampleRecord(d))
      .map((d) => ({
        url: `${base}/developers/${d.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),

    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
