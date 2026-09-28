import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { Location } from "@/lib/types";

/**
 * Property locations.
 *
 * Doubles as the internal-linking hub for the locality landing pages, which
 * are the pages most likely to rank for "property in <suburb>" searches.
 * The first card spans two columns — a flat grid of five equal tiles reads
 * as a list, not a feature.
 */
export function LocationsSection({ locations }: { locations: Location[] }) {
  return (
    <Section id="locations">
      <SectionHeader
        eyebrow="Where we work"
        title="Five suburbs, known street by street"
        description="We stay inside the western corridor on purpose. Knowing five suburbs properly is worth more to you than claiming to know all of Mumbai."
      />

      <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((location, i) => (
          <RevealItem
            key={location.slug}
            className={i === 0 ? "sm:col-span-2" : undefined}
          >
            <Link
              href={`/locations/${location.slug}`}
              className="group relative flex h-full min-h-64 flex-col justify-end overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <div className="absolute inset-0 -z-10 bg-brand-indigo-900">
                {location.image && (
                  <Image
                    src={location.image}
                    alt=""
                    fill
                    sizes={
                      i === 0
                        ? "(max-width: 640px) 100vw, 66vw"
                        : "(max-width: 640px) 100vw, 33vw"
                    }
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>

              {/* Light bottom-only gradient: keeps the image bright and clear
                  while giving the name/price just enough contrast to stay
                  legible. (Replaces the previous full-image dark scrim.) */}
              <div
                className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-black/75 via-black/30 to-transparent"
                aria-hidden
              />

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl text-white">{location.name}</h3>
                    <p className="mt-1 text-pretty text-sm text-white/75">
                      {location.tagline}
                    </p>
                  </div>
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 shrink-0 text-brand-gold transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>

                <p className="mt-4 text-xs font-medium uppercase tracking-wider text-brand-gold">
                  from ₹{(location.avgPricePerSqft / 1000).toFixed(0)}k / sq.ft.
                  <span className="ml-1.5 font-normal normal-case tracking-normal text-white/45">
                    indicative
                  </span>
                </p>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
