import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/section";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/reveal";
import { PropertyCard } from "@/components/property/property-card";
import type { Property } from "@/lib/types";

export function FeaturedProperties({ properties }: { properties: Property[] }) {
  if (!properties.length) return null;

  return (
    <Section id="featured" tone="muted">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeader
          align="left"
          eyebrow="Featured"
          title="Handpicked homes across the western suburbs"
          description="A small, current selection. If none of these fit, tell us what does — most of what we place never reaches a listing page."
          className="mx-0"
        />
        <Reveal>
          <ButtonLink href="/properties" variant="outline" size="lg">
            View all properties
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </Reveal>
      </div>

      <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property, i) => (
          <RevealItem key={property.id}>
            <PropertyCard property={property} priority={i < 3} className="h-full" />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
