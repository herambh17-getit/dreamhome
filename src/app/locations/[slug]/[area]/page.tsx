import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Building2, CheckCircle2, Phone } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { EnquiryForm } from "@/components/enquiry-form";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { LocalityJsonLd } from "@/components/seo/json-ld";
import { getMicroArea, microAreas } from "@/data/micro-areas";
import { getLocationBySlug } from "@/lib/queries";
import { pageMetadata } from "@/lib/seo";
import { siteConfig, whatsappLink } from "@/lib/site-config";

/** Only the neighbourhoods defined in `micro-areas.ts` exist. */
export const dynamicParams = false;

export function generateStaticParams() {
  return microAreas.map((a) => ({ slug: a.parent, area: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/locations/[slug]/[area]">,
): Promise<Metadata> {
  const { slug, area: areaSlug } = await props.params;
  const area = getMicroArea(slug, areaSlug);
  if (!area) return { title: "Area not found" };

  return pageMetadata({
    title: `Property in ${area.fullName}`,
    description: area.intro[0],
    path: `/locations/${slug}/${area.slug}`,
  });
}

export default async function MicroAreaPage(
  props: PageProps<"/locations/[slug]/[area]">,
) {
  const { slug, area: areaSlug } = await props.params;
  const area = getMicroArea(slug, areaSlug);
  const parent = await getLocationBySlug(slug);
  if (!area || !parent) notFound();

  return (
    <>
      <LocalityJsonLd
        name={area.fullName}
        slug={`${slug}/${area.slug}`}
        description={area.intro[0]}
      />
      <PageHeader
        eyebrow={`${parent.name} · Neighbourhood guide`}
        title={area.h1}
        description={`Buying, selling, renting or leasing in ${area.name}? Here is what the market looks like right now.`}
        breadcrumbs={[
          { name: "Locations", href: "/locations" },
          { name: parent.name, href: `/locations/${parent.slug}` },
          { name: area.name, href: `/locations/${slug}/${area.slug}` },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            {/* 1. Intro */}
            <section className="space-y-4">
              {area.intro.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-pretty text-lg leading-relaxed text-foreground/85"
                      : "text-pretty leading-relaxed text-muted-foreground"
                  }
                >
                  {p}
                </p>
              ))}
            </section>

            {/* 2. Price bands — the business's own figures, always dated. */}
            {area.priceBands && (
              <section className="mt-12">
                <h2 className="text-2xl text-brand-indigo-900">
                  Current price bands in {area.name}
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {(
                    [
                      ["Resale", area.priceBands.resale],
                      ["Rent", area.priceBands.rent],
                    ] as const
                  ).map(([label, bands]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-border bg-card p-5"
                    >
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold-600">
                        {label}
                      </h3>
                      <dl className="mt-3 divide-y divide-border">
                        {bands.map((b) => (
                          <div
                            key={b.config}
                            className="flex items-baseline justify-between gap-4 py-2.5"
                          >
                            <dt className="text-sm text-muted-foreground">
                              {b.config}
                            </dt>
                            <dd className="font-semibold text-brand-indigo-900">
                              {b.range}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  Typical asking prices as of {area.priceBands.asOf}.{" "}
                  {area.priceBands.note}
                </p>
              </section>
            )}

            {/* 3. Why this neighbourhood */}
            <section className="mt-12">
              <h2 className="text-2xl text-brand-indigo-900">
                Why {area.name}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {area.why.map((w) => (
                  <li
                    key={w}
                    className="flex items-start gap-2.5 text-foreground/80"
                  >
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-brand-gold-600"
                      aria-hidden
                    />
                    {w}
                  </li>
                ))}
              </ul>
            </section>

            {/* 4. Buildings — only once the business confirms real names. */}
            {area.buildings && area.buildings.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl text-brand-indigo-900">
                  Buildings we work with in {area.name}
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {area.buildings.map((b) => (
                    <li
                      key={b}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm text-brand-indigo-900"
                    >
                      <Building2 className="size-3.5 text-brand-gold-600" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-muted-foreground">
                  Ask us for current options in any of these.
                </p>
              </section>
            )}

            {/* 5. CTA */}
            <section className="mt-12 rounded-2xl border border-brand-gold/40 bg-brand-gold/5 p-6">
              <p className="text-pretty font-medium leading-relaxed text-brand-indigo-900">
                {area.cta}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonLink href={`tel:${siteConfig.contact.phoneHref}`} size="lg">
                  <Phone className="size-4" aria-hidden />
                  Call {siteConfig.contact.phone}
                </ButtonLink>
                <a
                  href={whatsappLink(
                    `Hi ${siteConfig.name}, I'm looking for property in ${area.fullName}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1da851]"
                >
                  <WhatsAppIcon className="size-4" aria-hidden />
                  WhatsApp us
                </a>
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xl text-brand-indigo-900">
                Looking in {area.name}?
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Budget, size and move-in date — we&apos;ll come back with a
                shortlist.
              </p>
              <EnquiryForm
                source={`area:${slug}/${area.slug}`}
                className="mt-5"
                compact
              />
            </div>
          </aside>
        </div>
      </div>

      <Section tone="muted">
        <div className="text-center">
          <p className="text-muted-foreground">
            Want the wider picture?
          </p>
          <ButtonLink
            href={`/locations/${parent.slug}`}
            variant="outline"
            size="lg"
            className="mt-4"
          >
            Read our {parent.name} guide
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
