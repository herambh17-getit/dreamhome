import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/page-header";
import { ReviewsSection } from "@/components/home/reviews-section";
import { getTestimonials } from "@/lib/queries";
import { fetchGoogleReviews } from "@/lib/google-reviews";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "Client Reviews & Testimonials",
  description: `${siteConfig.name} is rated ${siteConfig.google.rating} out of 5 across ${siteConfig.google.reviewCount} Google reviews. Read what clients say about buying, selling and renting with us.`,
  path: "/testimonials",
});

export default async function TestimonialsPage() {
  const [seed, google] = await Promise.all([
    getTestimonials(),
    fetchGoogleReviews(),
  ]);

  const testimonials = google ?? seed;

  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="What people say once it's done"
        description={`Rated ${siteConfig.google.rating} out of 5 across ${siteConfig.google.reviewCount} Google reviews.`}
        breadcrumbs={[{ name: "Testimonials", href: "/testimonials" }]}
      />
      <ReviewsSection testimonials={testimonials} />
    </>
  );
}
