import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Page metadata builder.
 *
 * Next merges metadata shallowly: a page that sets `openGraph` replaces the
 * layout's block wholesale, and a page that doesn't inherits the homepage's
 * title and URL. Building every page's tags here means each one gets its own
 * canonical, share title, share URL and image — and they can't drift apart.
 */

/** Branded 1200×630 card used when a page has no photo of its own. */
export const DEFAULT_OG_IMAGE = "/og-default.png";

const BRAND_SUFFIX = ` | ${siteConfig.name}`;
/** Google truncates titles at roughly 60 characters. */
const MAX_TITLE = 60;
/** …and descriptions at roughly 155–160. */
const MAX_DESCRIPTION = 158;

/** Trims to a word boundary so a description never ends mid-word. */
export function clampDescription(text: string, max = MAX_DESCRIPTION): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—–-]\s*$/, "")}…`;
}

interface PageSeo {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/about". Resolved against metadataBase. */
  path: string;
  /** Page-specific share image; falls back to the branded default. */
  image?: string | null;
  imageAlt?: string;
  article?: { publishedTime: string; authors: string[] };
  /** Keep the page out of search results (it stays crawlable/followable). */
  noindex?: boolean;
}

export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  article,
  noindex,
}: PageSeo): Metadata {
  // Append the brand only when it still fits; a long specific title beats a
  // truncated one with the brand cut off halfway.
  const fullTitle =
    title.includes(siteConfig.name) || title.length + BRAND_SUFFIX.length > MAX_TITLE
      ? title
      : `${title}${BRAND_SUFFIX}`;
  const desc = clampDescription(description);
  const images = [{ url: image || DEFAULT_OG_IMAGE, alt: imageAlt ?? fullTitle }];

  const shared = {
    url: path,
    title: fullTitle,
    description: desc,
    siteName: siteConfig.name,
    locale: "en_IN",
    images,
  };

  return {
    title: { absolute: fullTitle },
    description: desc,
    alternates: { canonical: path },
    openGraph: article
      ? {
          ...shared,
          type: "article",
          publishedTime: article.publishedTime,
          authors: article.authors,
        }
      : { ...shared, type: "website" },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: images.map((i) => i.url),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
