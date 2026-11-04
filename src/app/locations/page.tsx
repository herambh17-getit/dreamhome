import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/page-header";
import { LocationsSection } from "@/components/home/locations-section";
import { getLocations } from "@/lib/queries";

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
        description="We stay inside the western corridor on purpose. Knowing five suburbs properly is worth more to you than claiming to know all of Mumbai."
        breadcrumbs={[{ name: "Locations", href: "/locations" }]}
      />
      <LocationsSection locations={locations} />
    </>
  );
}
