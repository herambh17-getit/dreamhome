import { Hero } from "@/components/home/hero";
import { AboutSection } from "@/components/home/about-section";
import { FeaturedProperties } from "@/components/home/featured-properties";
import { ServicesSection } from "@/components/home/services-section";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { FounderSection } from "@/components/home/founder-section";
import { ReviewsSection } from "@/components/home/reviews-section";
import { LocationsSection } from "@/components/home/locations-section";
import { BlogPreview } from "@/components/home/blog-preview";
import { ContactSection } from "@/components/home/contact-section";
import { WhoWeAre } from "@/components/home/who-we-are";
import { HomeFaq } from "@/components/home/home-faq";
import { WebSiteJsonLd } from "@/components/seo/json-ld";
import {
  getBlogPosts,
  getFaqs,
  getFeaturedProperties,
  getLocations,
  getTestimonials,
} from "@/lib/queries";
import { fetchGoogleReviews } from "@/lib/google-reviews";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

/** The five questions shown on the homepage, in order (ids from data/faqs.ts). */
const HOME_FAQ_IDS = ["faq-001", "faq-002", "faq-004", "faq-003", "faq-008"];

export const metadata = pageMetadata({
  title: `Real Estate Agent in Borivali East | ${siteConfig.name}`,
  description: siteConfig.shortDescription,
  path: "/",
});

/**
 * Homepage.
 *
 * Section order follows the "Website Sections" list in the client's data
 * sheet: Hero → Property Search → Featured Properties → About Us → Services
 * → Why Choose Us → Meet the Founder → Google Reviews → Property Locations
 * → Blogs → Contact Form → Map → Footer.
 *
 * (Property Search lives inside the Hero; Map inside Contact.)
 *
 * Queries run in parallel — they are independent, and awaiting them in
 * sequence would stack their latency for no reason.
 */
export default async function HomePage() {
  const [featured, locations, posts, seedTestimonials, googleReviews, allFaqs] =
    await Promise.all([
      getFeaturedProperties(6),
      getLocations(),
      getBlogPosts(),
      getTestimonials(),
      fetchGoogleReviews(),
      getFaqs(),
    ]);

  const homeFaqs = HOME_FAQ_IDS.map((id) =>
    allFaqs.find((f) => f.id === id),
  ).filter((f): f is NonNullable<typeof f> => Boolean(f));

  // Prefer live Google reviews when the Places API is configured.
  const testimonials = googleReviews ?? seedTestimonials;

  return (
    <>
      <Hero locations={locations} />
      <WhoWeAre />
      <FeaturedProperties properties={featured} />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUs />
      <FounderSection />
      <ReviewsSection testimonials={testimonials.slice(0, 4)} />
      <LocationsSection locations={locations} />
      <BlogPreview posts={posts} />
      <HomeFaq faqs={homeFaqs} />
      <ContactSection />
      <WebSiteJsonLd />
    </>
  );
}
