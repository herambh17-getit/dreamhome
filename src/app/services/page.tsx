import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Section, SectionHeader } from "@/components/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ServicesSection } from "@/components/home/services-section";
import { ServiceIcon } from "@/components/service-icon";
import { practiceAreas } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "Real Estate Services in Mumbai",
  description:
    "Buying, selling, renting and property consultation in Mumbai's western suburbs — plus NRI services, redevelopment, legal paperwork and investment advice.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What we do, and how we do it"
        description="Four core services and nine specialist desks. Every one runs on the same principle: you get the full picture, including the parts that don't suit us."
        breadcrumbs={[{ name: "Services", href: "/services" }]}
      />

      <ServicesSection />

      <Section tone="muted">
        <SectionHeader
          eyebrow="Specialist desks"
          title="Where things get more specific"
          description="Some situations need more than a good agent. These are the areas we've built genuine depth in."
        />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {practiceAreas.map((area) => (
            <RevealItem key={area.slug} className="h-full">
              <Link
                href={`/services/${area.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-indigo-200 hover:shadow-xl hover:shadow-brand-indigo/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-indigo-50 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <ServiceIcon name={area.icon} className="size-5" />
                </span>
                <h3 className="mt-4 text-base text-brand-indigo-900">
                  {area.title}
                </h3>
                <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {area.summary}
                </p>
                <ArrowRight
                  aria-hidden
                  className="mt-4 size-4 text-primary transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Finding the right one"
          title="Which service do you need?"
          description="Most people arrive with a situation, not a service name. Find yours below and we will point you to the right page."
        />

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card">
          {situations.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between gap-4 p-5 transition-colors hover:bg-brand-indigo-50/60 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
            >
              <div>
                <p className="text-sm font-semibold text-brand-indigo-900">
                  {item.situation}
                </p>
                <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {item.note}
                </p>
              </div>
              <ArrowRight
                aria-hidden
                className="size-4 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-4 text-pretty leading-relaxed text-muted-foreground">
          <h3 className="text-xl text-brand-indigo-900">How every service works</h3>
          <p>
            Whatever you come to us for, the approach is the same. We start from
            what you actually need, not from what we have to sell. We tell you
            the drawbacks of an option before you spend a weekend visiting it.
            And where a decision needs a legal opinion, an independent property
            solicitor gives it, with us coordinating the documents and the
            people around it.
          </p>
          <p>
            If you are unsure which service fits, a short conversation is
            usually quicker than reading. Call or WhatsApp us, tell us where you
            are, and we will say plainly whether we can help and where to begin.
          </p>
        </div>
      </Section>
    </>
  );
}

const situations = [
  {
    situation: "I want to buy a home",
    note: "A shortlist built around your needs, accompanied viewings and paperwork through to registration.",
    href: "/services/property-buying",
  },
  {
    situation: "I want to sell my property",
    note: "A valuation from registered comparables, honest presentation and screened buyers.",
    href: "/services/property-selling",
  },
  {
    situation: "I want to rent a home, or let mine out",
    note: "Tenant screening, registered leave-and-licence agreements, police verification and society NOC.",
    href: "/services/renting",
  },
  {
    situation: "I need my rent agreement registered onsite",
    note: "Leave and licence agreements drafted and registered onsite in Borivali East.",
    href: "/services/leave-and-licence-registration",
  },
  {
    situation: "I am still deciding and want an independent opinion",
    note: "A one-off second opinion on a shortlist, a builder's offer or a redevelopment proposal.",
    href: "/services/property-consultation",
  },
  {
    situation: "A deal is going ahead and I want one coordinator",
    note: "One point of contact for a sale, a purchase or both, from first viewing to handover.",
    href: "/services/buying-selling",
  },
  {
    situation: "I expect to buy, sell or invest more than once",
    note: "Long-term advisory across residential and commercial property.",
    href: "/services/real-estate-consultancy",
  },
  {
    situation: "I am an NRI buying, selling or managing from abroad",
    note: "Video walkthroughs, power of attorney coordination and registration in your absence.",
    href: "/services/nri-services",
  },
  {
    situation: "My society has a redevelopment proposal",
    note: "Developer evaluation, the agreement in plain language and building member consensus.",
    href: "/services/society-redevelopment",
  },
  {
    situation: "I need the paperwork sorted",
    note: "Title search and legal opinion by independent solicitors, stamp duty, registration and society transfer.",
    href: "/services/legal-documentation",
  },
  {
    situation: "I am looking at property as an investment",
    note: "Net yield, holding costs, exit liquidity and a clear recommendation.",
    href: "/services/investment-advisory",
  },
  {
    situation: "I own a flat I do not live in",
    note: "Tenant sourcing, rent collection, maintenance and inspections with photographs.",
    href: "/services/property-management",
  },
  {
    situation: "I am a developer looking for a channel partner",
    note: "Qualified buyer introductions, site visits and honest market feedback.",
    href: "/services/project-marketing",
  },
];
