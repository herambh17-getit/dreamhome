import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { LocationsSection } from "@/components/home/locations-section";
import { getLocations } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Property Locations — Mumbai Western Suburbs",
  description:
    "Borivali, Kandivali, Malad, Goregaon and Andheri — local guides to Mumbai's western suburbs, with indicative rates, connectivity and available property.",
  alternates: { canonical: "/locations" },
};

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <>
      <PageHeader
        eyebrow="Locations"
        title="The suburbs we know street by street"
        description="We stay inside the western corridor on purpose. Knowing five suburbs properly is worth more to you than claiming to know all of Mumbai."
        breadcrumbs={[{ name: "Locations", href: "/locations" }]}
      />
      <LocationsSection locations={locations} />
    </>
  );
}
