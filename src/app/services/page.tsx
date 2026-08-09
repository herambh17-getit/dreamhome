import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Section, SectionHeader } from "@/components/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ServicesSection } from "@/components/home/services-section";
import { ServiceIcon } from "@/components/service-icon";
import { practiceAreas } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Real Estate Services in Mumbai",
  description:
    "Property buying, selling, renting and consultation across Mumbai's western suburbs — plus NRI services, society redevelopment, legal and documentation, investment advisory and property management.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What we do, and how we do it"
        description="Four core services and eight specialist desks. Every one runs on the same principle: you get the full picture, including the parts that don't suit us."
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
    </>
  );
}
