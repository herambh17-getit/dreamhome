import type { MetadataRoute } from "next";
import { getBlogPosts, getDevelopers, getLocations, getProjects } from "@/lib/queries";
import { getAllPropertySlugs } from "@/lib/queries";
import { practiceAreas, services, siteConfig } from "@/lib/site-config";

/**
 * Dynamic sitemap. Rebuilt from the same queries the pages use, so it can
 * never list a page that does not exist or miss one that does.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: base, changeFrequency: "weekly", priority: 1 },
      { url: `${base}/properties`, changeFrequency: "daily", priority: 0.9 },
      { url: `${base}/projects`, changeFrequency: "weekly", priority: 0.8 },
      { url: `${base}/services`, changeFrequency: "monthly", priority: 0.8 },
      { url: `${base}/locations`, changeFrequency: "monthly", priority: 0.8 },
      { url: `${base}/about`, changeFrequency: "monthly", priority: 0.7 },
      { url: `${base}/testimonials`, changeFrequency: "weekly", priority: 0.6 },
      { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 },
      { url: `${base}/faq`, changeFrequency: "monthly", priority: 0.6 },
      { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.8 },
      { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
      { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
    ] satisfies MetadataRoute.Sitemap
  ).map((r) => ({ ...r, lastModified: now }));

  const [propertySlugs, projects, locations, developers, posts] =
    await Promise.all([
      getAllPropertySlugs(),
      getProjects(),
      getLocations(),
      getDevelopers(),
      getBlogPosts(),
    ]);

  return [
    ...staticRoutes,

    ...propertySlugs.map((slug) => ({
      url: `${base}/properties/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),

    ...projects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),

    ...developers.map((d) => ({
      url: `${base}/developers/${d.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),

    // Locality pages are the main organic entry points for
    // "property in <suburb>" searches, so they rank high here.
    ...locations.map((l) => ({
      url: `${base}/locations/${l.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),

    ...[...services, ...practiceAreas].map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
