import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { ButtonLink } from "@/components/ui/button";
import { ReviewsSection } from "@/components/home/reviews-section";
import { profileUrl, writeReviewUrl } from "@/lib/google-maps";
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

      <Section>
        <div className="mx-auto max-w-3xl space-y-4 text-pretty leading-relaxed text-muted-foreground">
          <h2 className="text-2xl text-brand-indigo-900">
            About these reviews
          </h2>
          <p>
            The rating above comes from our Google Business Profile, where
            anyone who has dealt with us can leave a review, good or bad. We do
            not choose who reviews us there.
          </p>
          <p>
            The quotes on this page are from clients who agreed to be quoted,
            shown with a first name and initial and a short note on what we
            helped them with.
          </p>
          <p>
            Reviews are a better guide than any description we could write, so
            read the full set on Google before you decide.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink href={profileUrl()} external size="lg">
              Read all reviews on Google
            </ButtonLink>
            {writeReviewUrl() && (
              <ButtonLink
                href={writeReviewUrl() as string}
                external
                size="lg"
                variant="outline"
              >
                Leave a review
              </ButtonLink>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
