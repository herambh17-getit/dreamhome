import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { FaqJsonLd, LocalityJsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronDown, MapPin, TrainFront } from "lucide-react";
import { locationGuides } from "@/data/location-guides";
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

  return pageMetadata({
    title: `Property in ${location.name}, Mumbai`,
    description: `Buy, sell or rent property in ${location.name}, Mumbai with ${siteConfig.name}. ${location.tagline}. Local expertise and transparent advice.`,
    path: `/locations/${location.slug}`,
    image: location.image,
    imageAlt: `${location.name}, Mumbai`,
  });
}

export default async function LocationPage(
  props: PageProps<"/locations/[slug]">,
) {
  const { slug } = await props.params;
  const location = await getLocationBySlug(slug);
  if (!location) notFound();

  const [properties, allLocations] = await Promise.all([
    getProperties({ location: slug }),
    getLocations(),
  ]);
  const guide = locationGuides[slug];
  const nearby = (guide?.nearby ?? [])
    .map((s) => allLocations.find((l) => l.slug === s))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  return (
    <>
      <LocalityJsonLd
        name={location.name}
        slug={location.slug}
        description={guide?.summary ?? location.description}
      />
      {guide && guide.faqs.length > 0 && (
        <FaqJsonLd
          faqs={guide.faqs.map((f, i) => ({
            id: `${slug}-${i}`,
            category: location.name,
            ...f,
          }))}
        />
      )}
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
            {/* Answer-first summary: what search snippets and AI assistants
                quote when someone asks "is <suburb> a good place to buy?" */}
            {guide && (
              <div className="mb-10 rounded-2xl border border-brand-gold/40 bg-brand-gold/5 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold-600">
                  In short
                </p>
                <p className="mt-2 text-pretty leading-relaxed text-brand-indigo-900">
                  {guide.summary}
                </p>
              </div>
            )}

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

            {guide && (
              <section className="mt-10">
                <h2 className="text-xl text-brand-indigo-900">
                  Neighbourhoods in {location.name}
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {guide.neighbourhoods.map((group) => (
                    <div
                      key={group.side}
                      className="rounded-2xl border border-border bg-card p-5"
                    >
                      <h3 className="text-base font-semibold text-brand-indigo-900">
                        {group.side}
                      </h3>
                      <ul className="mt-3 space-y-3">
                        {group.places.map((p) => (
                          <li key={p.name} className="flex items-start gap-2.5">
                            <MapPin
                              className="mt-0.5 size-4 shrink-0 text-brand-gold-600"
                              aria-hidden
                            />
                            <span className="text-sm text-foreground/80">
                              {p.href ? (
                                <Link
                                  href={p.href}
                                  className="font-semibold text-primary underline underline-offset-2 hover:text-brand-indigo-900"
                                >
                                  {p.name}
                                </Link>
                              ) : (
                                <span className="font-semibold text-brand-indigo-900">
                                  {p.name}
                                </span>
                              )}{" "}
                              — {p.note}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {guide && guide.faqs.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xl text-brand-indigo-900">
                  {location.name}: common questions
                </h2>
                {/* Native <details>: answers are in the HTML for crawlers and
                    AI assistants, and work without JavaScript. */}
                <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
                  {guide.faqs.map((f, i) => (
                    <details key={f.question} className="group p-5" open={i === 0}>
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-brand-indigo-900 [&::-webkit-details-marker]:hidden">
                        <h3 className="text-base">{f.question}</h3>
                        <ChevronDown
                          className="mt-0.5 size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                          aria-hidden
                        />
                      </summary>
                      <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                        {f.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {nearby.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xl text-brand-indigo-900">Also consider</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {nearby.map((n) => (
                    <Link
                      key={n.slug}
                      href={`/locations/${n.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-brand-indigo-900 transition-colors hover:border-primary hover:bg-brand-indigo-50"
                    >
                      Property in {n.name}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  ))}
                </div>
              </section>
            )}
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
