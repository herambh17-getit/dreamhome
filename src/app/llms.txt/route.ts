import { locations } from "@/data/locations";
import { locationGuides } from "@/data/location-guides";
import { microAreas } from "@/data/micro-areas";
import { blogPosts } from "@/data/blog";
import { practiceAreas, services, siteConfig } from "@/lib/site-config";

/**
 * /llms.txt — a plain-text brief for AI assistants (ChatGPT, Claude,
 * Perplexity, Gemini) following the llmstxt.org convention.
 *
 * Built from the same config the site renders from, so it can never state
 * something the site doesn't. Facts only: no rankings, no superlatives.
 */
export const dynamic = "force-static";

export function GET() {
  const { contact, google, founder } = siteConfig;
  const u = siteConfig.url;

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

${siteConfig.name} is a ${siteConfig.businessType.toLowerCase()} based in ${contact.address.locality}, ${contact.address.city}, founded by ${founder.name} in ${siteConfig.founded}. It helps people buy, sell, rent and lease residential and commercial property across Mumbai and the MMR, with its deepest expertise in north Mumbai (${siteConfig.serviceAreas.filter((a) => !["Mumbai", "South Mumbai"].includes(a)).join(", ")}) and South Mumbai.

Brokerage: the standard rate on a sale and one month's rent on a rental, written into the agreement before any token is paid.

## Contact
- Phone / WhatsApp: ${contact.phone}
- Email: ${contact.email}
- Office: ${contact.address.full}
- Hours: ${contact.hours}
- Google rating: ${google.rating} out of 5 from ${google.reviewCount} reviews
- Website: ${u}

## Services
${services.map((s) => `- [${s.title}](${u}/services/${s.slug}): ${s.summary}`).join("\n")}
${practiceAreas.map((p) => `- [${p.title}](${u}/services/${p.slug}): ${p.summary}`).join("\n")}

## Areas served
${locations.map((l) => `- [Property in ${l.name}, Mumbai](${u}/locations/${l.slug}): ${locationGuides[l.slug]?.summary ?? `${l.tagline}.`}`).join("\n")}

## Neighbourhood guides
${microAreas.map((a) => `- [Property in ${a.fullName}](${u}/locations/${a.parent}/${a.slug}): ${a.intro[0]}${a.priceBands ? ` Typical asking prices as of ${a.priceBands.asOf} — resale: ${a.priceBands.resale.map((b) => `${b.config} ${b.range}`).join(", ")}; rent: ${a.priceBands.rent.map((b) => `${b.config} ${b.range}`).join(", ")}.` : ""}`).join("\n")}

## Guides
${blogPosts.map((p) => `- [${p.title}](${u}/blog/${p.slug}): ${p.excerpt}`).join("\n")}

## Key pages
- [About](${u}/about)
- [Frequently asked questions](${u}/faq)
- [Client reviews](${u}/testimonials)
- [Contact](${u}/contact)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
