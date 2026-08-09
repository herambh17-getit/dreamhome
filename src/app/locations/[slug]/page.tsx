import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, TrainFront } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Section, SectionHeader } from "@/components/section";
import { PropertyCard } from "@/components/property/property-card";
import { EnquiryForm } from "@/components/enquiry-form";
import { ButtonLink } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getLocationBySlug, getLocations, getProperties } from "@/lib/queries";
import { siteConfig } from "@/lib/site-config";

export async function generateStaticParams() {
  const locations = await getLocations();
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata(
  props: PageProps<"/locations/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const location = await getLocationBySlug(slug);
  if (!location) return { title: "Location not found" };

  return {
    title: `Property in ${location.name}, Mumbai`,
    description: `${location.tagline}. Buy, sell or rent property in ${location.name} with ${siteConfig.name} — local expertise, verified listings, transparent advice.`,
    alternates: { canonical: `/locations/${location.slug}` },
  };
}

export default async function LocationPage(
  props: PageProps<"/locations/[slug]">,
) {
  const { slug } = await props.params;
  const location = await getLocationBySlug(slug);
  if (!location) notFound();

  const properties = await getProperties({ location: slug });

  return (
    <>
      <PageHeader
        eyebrow="Location"
        title={`Property in ${location.name}`}
        description={location.tagline}
        breadcrumbs={[
          { name: "Locations", href: "/locations" },
          { name: location.name, href: `/locations/${location.slug}` },
        ]}
      >
        <div className="mt-8">
          <p className="text-xs uppercase tracking-wider text-white/50">
            Indicative rate
          </p>
          <p className="mt-1 text-3xl font-extrabold text-brand-gold">
            ₹{location.avgPricePerSqft.toLocaleString("en-IN")}
            <span className="ml-1 text-base font-medium text-white/60">
              / sq.ft.
            </span>
          </p>
          {/* An indicative rate stated without a caveat becomes a quote in
              the reader's head. Say what it is. */}
          <p className="mt-1.5 max-w-md text-xs text-white/45">
            A broad average across the locality, for orientation only. Real
            pricing depends on the building, floor, condition and view — ask us
            for a figure on a specific property.
          </p>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <h2 className="text-2xl text-brand-indigo-900">
              About {location.name}
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              {location.description}
            </p>

            <section className="mt-10">
              <h2 className="text-xl text-brand-indigo-900">
                What stands out here
              </h2>
              <ul className="mt-4 space-y-2.5">
                {location.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 text-sm text-foreground/80"
                  >
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-brand-gold-600"
                      aria-hidden
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-xl text-brand-indigo-900">Connectivity</h2>
              <ul className="mt-4 space-y-2.5">
                {location.connectivity.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-2.5 text-sm text-foreground/80"
                  >
                    <TrainFront
                      className="mt-0.5 size-4 shrink-0 text-brand-indigo-300"
                      aria-hidden
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xl text-brand-indigo-900">
                Looking in {location.name}?
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Tell us your budget and requirements. We&apos;ll send what
                actually fits — including options not listed here.
              </p>
              <EnquiryForm
                source={`location:${slug}`}
                className="mt-5"
                compact
              />
            </div>
          </aside>
        </div>
      </div>

      <Section tone="muted">
        <SectionHeader
          align="left"
          eyebrow="Available now"
          title={`Properties in ${location.name}`}
          className="mx-0"
        />

        {properties.length > 0 ? (
          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p) => (
              <RevealItem key={p.id} className="h-full">
                <PropertyCard property={p} className="h-full" />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
            <h3 className="text-lg text-brand-indigo-900">
              Nothing listed in {location.name} right now
            </h3>
            <p className="mx-auto mt-2 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              Which does not mean nothing is available. A lot of what we place
              never reaches a listing page — tell us what you want and we will go
              and look.
            </p>
            <ButtonLink href="/contact" size="lg" className="mt-6">
              Tell us what you need
            </ButtonLink>
          </div>
        )}
      </Section>
    </>
  );
}
