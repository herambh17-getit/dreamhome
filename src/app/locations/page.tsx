import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/page-header";
import { Section, SectionHeader } from "@/components/section";
import { LocationsSection } from "@/components/home/locations-section";
import { getLocations } from "@/lib/queries";
import { locationGuides } from "@/data/location-guides";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "Property Locations in Mumbai",
  description:
    "Local guides to Borivali, Kandivali, Malad, Goregaon and Andheri — indicative rates, connectivity and available property in Mumbai's western suburbs.",
  path: "/locations",
});

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <>
      <PageHeader
        eyebrow="Locations"
        title="The suburbs we know street by street"
        description="We work across Mumbai and the MMR, with our deepest expertise in north Mumbai and South Mumbai. These guides cover the western-suburb localities we know street by street."
        breadcrumbs={[{ name: "Locations", href: "/locations" }]}
      />
      <LocationsSection locations={locations} />

      <Section tone="muted">
        <SectionHeader
          eyebrow="Choosing an area"
          title="How to choose between these suburbs"
          description="They sit along the same railway line, but they feel different to live in. Here is how we suggest you narrow it down."
        />

        <div className="mx-auto mt-12 max-w-3xl space-y-4 text-pretty leading-relaxed text-muted-foreground">
          <p>
            Start with the commute, because it shapes daily life more than any
            other factor. Work out where you or your family travel to most
            often, and how many times a week. A flat that is a good value on
            paper stops being one if the journey wears everyone down.
          </p>
          <p>
            Then consider budget against the type of home you want. The
            suburbs differ in price and in what each rupee buys: some give
            more space for the money, others give a shorter commute or a more
            established neighbourhood. We can talk you through the trade-offs
            for your own budget.
          </p>
          <p>
            Finally, think about what you want around you: schools, open
            space, shopping, quiet, or a lively main road. The east and west
            sides of the railway line often differ in character within the
            same suburb, and the specific building and society usually matter
            more than the address, so it is worth visiting more than one
            before you decide.
          </p>
        </div>

        <ul className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2">
          {locations.map((location) => {
            const guide = locationGuides[location.slug];
            if (!guide) return null;
            const firstSentence = guide.summary.split(/(?<=\.)\s/)[0];
            return (
              <li key={location.slug}>
                <Link
                  href={`/locations/${location.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand-indigo-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-base font-semibold text-brand-indigo-900">
                      {location.name}
                    </span>
                    <ArrowRight
                      aria-hidden
                      className="size-4 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                  <span className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {firstSentence}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mx-auto mt-10 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
          Not sure which suburb fits? Tell us where you work, your budget and
          the size of home you need, and we will suggest where to look first.
          You can call or WhatsApp us on {siteConfig.contact.phone}, or use the{" "}
          <Link href="/contact" className="font-semibold text-primary underline-offset-4 hover:underline">
            contact page
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
