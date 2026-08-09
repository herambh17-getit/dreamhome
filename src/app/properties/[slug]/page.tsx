import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  Building2,
  CalendarClock,
  CheckCircle2,
  Maximize,
  ShieldQuestion,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { EnquiryForm } from "@/components/enquiry-form";
import { PropertyCard } from "@/components/property/property-card";
import { PropertyGallery } from "@/components/property/property-gallery";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { PropertyJsonLd } from "@/components/seo/json-ld";
import { Section, SectionHeader } from "@/components/section";
import {
  getAllPropertySlugs,
  getProperties,
  getPropertyBySlug,
} from "@/lib/queries";
import {
  formatArea,
  formatListingPrice,
  formatPricePerSqft,
} from "@/lib/format";
import { whatsappLink } from "@/lib/site-config";

/** Pre-renders the listings known at build time; others render on demand. */
export async function generateStaticParams() {
  const slugs = await getAllPropertySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/properties/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const property = await getPropertyBySlug(slug);

  if (!property) return { title: "Property not found" };

  const title = `${property.configuration} in ${property.location} — ${formatListingPrice(property)}`;

  return {
    title,
    description: property.description.slice(0, 155),
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: {
      title,
      description: property.description.slice(0, 155),
      type: "article",
      images: property.gallery.length ? [property.gallery[0]] : undefined,
    },
  };
}

export default async function PropertyPage(
  props: PageProps<"/properties/[slug]">,
) {
  const { slug } = await props.params;
  const property = await getPropertyBySlug(slug);

  if (!property) notFound();

  const isRental = property.intent === "rent";

  // "More in this area" — same locality, excluding the current listing.
  const related = (await getProperties({ location: property.locationSlug }))
    .filter((p) => p.id !== property.id)
    .slice(0, 3);

  const enquiryMessage = `Hi, I'm interested in "${property.title}" (${property.configuration}, ${property.location}).`;

  return (
    <>
      <PageHeader
        eyebrow={property.status}
        title={property.title}
        description={property.location}
        breadcrumbs={[
          { name: "Properties", href: "/properties" },
          { name: property.configuration, href: `/properties/${property.slug}` },
        ]}
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/50">
              {isRental ? "Monthly rent" : "Price"}
            </p>
            <p className="mt-1 text-3xl font-extrabold text-brand-gold">
              {formatListingPrice(property)}
            </p>
            {!isRental && property.price > 0 && (
              <p className="mt-0.5 text-xs text-white/50">
                {formatPricePerSqft(property.price, property.carpetArea)}
              </p>
            )}
          </div>

          <dl className="flex flex-wrap gap-x-8 gap-y-4">
            <HeaderStat
              icon={Building2}
              label="Configuration"
              value={property.configuration}
            />
            <HeaderStat
              icon={Maximize}
              label="Carpet area"
              value={formatArea(property.carpetArea)}
            />
            {property.possession && (
              <HeaderStat
                icon={CalendarClock}
                label="Possession"
                value={property.possession}
              />
            )}
          </dl>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <div>
            <PropertyGallery
              images={property.gallery}
              title={property.title}
            />

            <section className="mt-10">
              <h2 className="text-2xl text-brand-indigo-900">
                About this property
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                {property.description}
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl text-brand-indigo-900">Key details</h2>
              <dl className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
                <DetailRow label="Property type" value={property.propertyType} />
                <DetailRow label="Configuration" value={property.configuration} />
                <DetailRow
                  label="Carpet area"
                  value={formatArea(property.carpetArea)}
                />
                <DetailRow label="Status" value={property.status} />
                <DetailRow label="Location" value={property.location} />
                <DetailRow
                  label="Developer"
                  value={property.developer || "—"}
                />
                {property.possession && (
                  <DetailRow label="Possession" value={property.possession} />
                )}
                <DetailRow label="RERA" value={property.rera || "Not provided"} />
              </dl>
            </section>

            {property.amenities.length > 0 && (
              <section className="mt-10">
                <h2 className="text-2xl text-brand-indigo-900">Amenities</h2>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {property.amenities.map((amenity) => (
                    <li
                      key={amenity}
                      className="flex items-center gap-2.5 text-sm text-foreground/80"
                    >
                      <CheckCircle2
                        className="size-4 shrink-0 text-brand-gold-600"
                        aria-hidden
                      />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {property.floorPlans.length > 0 && (
              <section className="mt-10">
                <h2 className="text-2xl text-brand-indigo-900">Floor plans</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {property.floorPlans.map((plan) => (
                    <div
                      key={plan.label}
                      className="rounded-2xl border border-border bg-card p-5"
                    >
                      <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-brand-light">
                        {plan.image ? (
                          <Image
                            src={plan.image}
                            alt={`Floor plan — ${plan.label}`}
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-contain"
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
                            Floor plan available on request
                          </div>
                        )}
                      </div>
                      <p className="mt-3 font-semibold text-brand-indigo-900">
                        {plan.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatArea(plan.carpetArea)} carpet
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Verification notice. A consultancy selling transparency should
                tell people to check the regulator, not just trust the site. */}
            <aside className="mt-10 flex gap-4 rounded-2xl border border-brand-gold/30 bg-brand-gold/5 p-5">
              <ShieldQuestion
                className="size-5 shrink-0 text-brand-gold-600"
                aria-hidden
              />
              <div>
                <h2 className="text-sm font-bold text-brand-indigo-900">
                  Verify before you commit
                </h2>
                <p className="mt-1.5 text-pretty text-xs leading-relaxed text-muted-foreground">
                  Check this project&apos;s registration on the official MahaRERA
                  portal yourself, and read the approved plans and possession
                  dates published there. Details on this page are provided in
                  good faith for general guidance and are subject to change; they
                  are not an offer or a legal opinion. Ask us for anything you
                  need to complete your own checks — we will give it to you.
                </p>
              </div>
            </aside>
          </div>

          {/* Enquiry rail */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <Badge className="border-0 bg-brand-indigo-50 font-semibold text-primary">
                <BadgeCheck className="size-3.5" aria-hidden />
                Verified listing
              </Badge>

              <h2 className="mt-4 text-xl text-brand-indigo-900">
                Interested in this one?
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Ask us anything — including what we think the drawbacks are.
              </p>

              <ButtonLink
                href={whatsappLink(enquiryMessage)}
                external
                size="lg"
                className="mt-5 w-full bg-[#25D366] text-white hover:bg-[#1da851]"
              >
                <WhatsAppIcon className="size-4" aria-hidden />
                Ask on WhatsApp
              </ButtonLink>

              <div className="my-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-border" />
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  or
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>

              <EnquiryForm
                source={`property-detail:${property.slug}`}
                propertyId={property.id}
                defaultIntent={property.intent}
                defaultMessage={enquiryMessage}
                compact
              />
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <Section tone="muted">
          <SectionHeader
            align="left"
            eyebrow="Nearby"
            title={`More in ${property.location.split(",")[0]}`}
            className="mx-0"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </Section>
      )}

      <PropertyJsonLd property={property} />
    </>
  );
}

function HeaderStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Building2;
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-white/50">
        <Icon className="size-3.5" aria-hidden />
        {label}
      </dt>
      <dd className="mt-1 font-semibold text-white">{value}</dd>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card px-5 py-4">
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 font-semibold text-brand-indigo-900">{value}</dd>
    </div>
  );
}
