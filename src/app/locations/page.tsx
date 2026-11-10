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
        description="We work across Mumbai and the MMR, with our deepest expertise in north Mumbai and South Mumbai. These guides cover the western-suburb localities we know street by street."
        breadcrumbs={[{ name: "Locations", href: "/locations" }]}
      />
      <LocationsSection locations={locations} />
    </>
  );
}
