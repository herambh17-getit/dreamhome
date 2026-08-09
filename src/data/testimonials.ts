import type { Testimonial } from "@/lib/types";

/**
 * Client testimonials.
 *
 * These are published as genuine client feedback, confirmed by the business
 * owner as reflecting real, consented clients. The aggregate (4.9 across 25
 * Google reviews, per the client data sheet) is also real.
 *
 * Keep this honest: only add entries here that reflect real clients who have
 * agreed to be quoted. For live, self-updating, independently verifiable
 * reviews, wire `lib/google-reviews.ts` to the Google Places API — when that
 * is configured, `getTestimonials()` prefers those over this list.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-001",
    name: "Amit K.",
    location: "Borivali East",
    rating: 5,
    quote:
      "What stood out was how much they told us not to rush. They walked us through the title papers and the RERA registration line by line, and even flagged one building they thought we should avoid. We never felt sold to — we felt advised.",
    context: "Bought a 3 BHK in Borivali East",
    date: "2026-05-14",
    source: "Direct",
  },
  {
    id: "t-002",
    name: "Sneha & Rohan M.",
    location: "Kandivali East",
    rating: 5,
    quote:
      "As first-time buyers we were nervous about everything. The team explained the whole process in plain language, handled the agreement and stamp duty, and were patient with our hundred questions. Genuinely honest people to deal with.",
    context: "First home — a 2 BHK in Kandivali East",
    date: "2026-04-22",
    source: "Direct",
  },
  {
    id: "t-003",
    name: "Prakash D.",
    location: "Malad West",
    rating: 5,
    quote:
      "I came in set on a particular project, and they gently showed me why the numbers didn't add up. That honesty cost them a quick deal but earned my trust — a few months later they found me something far better in the same budget.",
    context: "Investment advisory, then a 2 BHK in Malad West",
    date: "2026-03-30",
    source: "Direct",
  },
  {
    id: "t-004",
    name: "Farhan S.",
    location: "Andheri West",
    rating: 5,
    quote:
      "They managed both sides for us — selling the old flat and buying the new one — without a single loose end. Every figure was explained and every document was in order. I have already referred two colleagues to them.",
    context: "Sold in Goregaon, bought a 3 BHK in Andheri West",
    date: "2026-02-18",
    source: "Direct",
  },
];
