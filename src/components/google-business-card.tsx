import { ExternalLink, Navigation, PenLine, Star } from "lucide-react";
import { GoogleIcon } from "@/components/icons/google-icon";
import { fetchGooglePlaceSummary } from "@/lib/google-reviews";
import {
  directionsUrl,
  profileUrl,
  writeReviewUrl,
} from "@/lib/google-maps";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Google Business Profile card.
 *
 * Shows the live rating and review count from Google when the Places API is
 * configured (refreshed daily), and the figures in site-config otherwise —
 * so it always renders, and never shows an error to a prospect.
 */
export async function GoogleBusinessCard({ className }: { className?: string }) {
  const live = await fetchGooglePlaceSummary();
  const rating = live?.rating ?? siteConfig.google.rating;
  const reviewCount = live?.reviewCount ?? siteConfig.google.reviewCount;
  const reviewHref = writeReviewUrl();

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-5 shadow-sm",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-white">
          <GoogleIcon className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-brand-indigo-900">
              {siteConfig.name}
            </p>
            {live && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-emerald-700">
                <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
                Live from Google
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {siteConfig.businessType} · {siteConfig.contact.address.locality},{" "}
            {siteConfig.contact.address.city}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-bold text-brand-indigo-900">
              {rating.toFixed(1)}
            </span>
            <div className="flex" aria-label={`${rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  aria-hidden
                  className={cn(
                    "size-4",
                    i < Math.round(rating)
                      ? "fill-[#FBBC05] text-[#FBBC05]"
                      : "text-muted-foreground/30",
                  )}
                />
              ))}
            </div>
            <a
              href={profileUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary underline-offset-2 hover:underline"
            >
              {reviewCount} Google reviews
            </a>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <ProfileButton href={profileUrl()} icon={ExternalLink}>
          View on Google
        </ProfileButton>
        <ProfileButton href={directionsUrl()} icon={Navigation}>
          Directions
        </ProfileButton>
        {reviewHref && (
          <ProfileButton href={reviewHref} icon={PenLine}>
            Write a review
          </ProfileButton>
        )}
      </div>
    </div>
  );
}

function ProfileButton({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: typeof Star;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-brand-indigo-900 transition-colors hover:border-primary hover:bg-brand-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <Icon className="size-4" aria-hidden />
      {children}
    </a>
  );
}
