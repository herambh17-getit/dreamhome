import { locations } from "@/data/locations";
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

${siteConfig.name} is a ${siteConfig.businessType.toLowerCase()} based in ${contact.address.locality}, ${contact.address.city}, founded by ${founder.name}. It helps people buy, sell, rent and invest in residential and commercial property across Mumbai's western suburbs: ${siteConfig.serviceAreas.filter((a) => a !== "Mumbai").join(", ")}.

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
${locations.map((l) => `- [Property in ${l.name}, Mumbai](${u}/locations/${l.slug}): ${l.tagline}.`).join("\n")}

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
