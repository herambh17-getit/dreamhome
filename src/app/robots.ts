import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Everything is crawlable, including by AI assistants (GPTBot, ClaudeBot,
 * PerplexityBot, Google-Extended) — being quotable in AI answers is part of
 * the point for a local consultancy. Pages that shouldn't be indexed say so
 * with a per-page robots meta tag instead, which crawlers can only see if
 * they're allowed to fetch the page.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
