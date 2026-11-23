import { Section } from "@/components/section";
import { siteConfig } from "@/lib/site-config";

/**
 * Answer-first summary near the top of the homepage. A short, plain answer to
 * "who are you?" is the passage search engines and AI assistants quote.
 * Everything stated here already appears elsewhere on the site.
 */
export function WhoWeAre() {
  const { contact, founded } = siteConfig;

  return (
    <Section className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-balance text-2xl text-brand-indigo-900 sm:text-3xl">
          Who is {siteConfig.name}?
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-foreground/85">
          {siteConfig.name} is a real estate agent in {contact.address.locality},
          Mumbai, working with a consulting approach since {founded}. We help
          people buy, sell and rent homes and commercial property across Mumbai
          and the MMR, with our deepest experience in north Mumbai and South
          Mumbai.
        </p>
        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="font-semibold uppercase tracking-wider text-muted-foreground">
              Office
            </dt>
            <dd className="mt-1 text-brand-indigo-900">
              Ashokvan, {contact.address.locality}
            </dd>
          </div>
          <div>
            <dt className="font-semibold uppercase tracking-wider text-muted-foreground">
              Hours
            </dt>
            <dd className="mt-1 text-brand-indigo-900">
              {contact.hours.replace(/^Open all days,\s*/, "Every day, ")}
            </dd>
          </div>
          <div>
            <dt className="font-semibold uppercase tracking-wider text-muted-foreground">
              Services
            </dt>
            <dd className="mt-1 text-brand-indigo-900">
              Buying, selling, renting and advice
            </dd>
          </div>
        </dl>
      </div>
    </Section>
  );
}
