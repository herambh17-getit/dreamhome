import { Star } from "lucide-react";
import { Section, SectionHeader } from "@/components/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";
import type { Testimonial } from "@/lib/types";

/**
 * Google Reviews.
 *
 * The aggregate (4.9 / 25) is real and comes from the client's data sheet.
 * Individual quotes come from `getTestimonials()`, which returns the curated,
 * owner-confirmed client testimonials, or live Google reviews when the Places
 * API is wired.
 */
export function ReviewsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <Section id="reviews" tone="muted">
      <SectionHeader
        eyebrow="Client reviews"
        title="What people say after the deal is done"
        description={`Rated ${siteConfig.google.rating} out of 5 across ${siteConfig.google.reviewCount} Google reviews.`}
      />

      <div className="mt-8 flex items-center justify-center gap-3">
        <div className="flex" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-6 fill-brand-gold text-brand-gold" />
          ))}
        </div>
        <p className="text-2xl font-extrabold text-brand-indigo-900">
          {siteConfig.google.rating}
          <span className="ml-1 text-base font-medium text-muted-foreground">
            / 5
          </span>
        </p>
      </div>

      <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t) => (
          <RevealItem key={t.id} className="h-full">
            <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
              <div className="flex" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    aria-hidden
                    className={
                      i < t.rating
                        ? "size-4 fill-brand-gold text-brand-gold"
                        : "size-4 text-muted-foreground/30"
                    }
                  />
                ))}
              </div>

              <blockquote className="mt-4 flex-1">
                <p className="text-pretty text-sm leading-relaxed text-foreground/85">
                  “{t.quote}”
                </p>
              </blockquote>

              <figcaption className="mt-5 border-t border-border pt-4">
                <p className="text-sm font-semibold text-brand-indigo-900">
                  {t.name}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {t.context}
                </p>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
