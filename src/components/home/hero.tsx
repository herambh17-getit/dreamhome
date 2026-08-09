"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { PropertySearchForm } from "@/components/property/property-search-form";
import { HERO_SRC } from "@/lib/brand-assets.generated";
import { siteConfig } from "@/lib/site-config";
import type { Location } from "@/lib/types";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Homepage hero.
 *
 * Two states by design. With a real hero photograph it renders the image
 * under a scrim; without one it renders the brand gradient. It never renders
 * a grey box or a broken image — an unset asset should look deliberate.
 *
 * The scrim is not optional decoration: the brand sheet forbids brand marks
 * on busy backgrounds, and this is what makes the overlay compliant and
 * keeps text contrast above WCAG AA.
 */
export function Hero({ locations }: { locations: Location[] }) {
  return (
    <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-20">
        {HERO_SRC ? (
          <Image
            src={HERO_SRC}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="brand-gradient size-full" />
        )}
      </div>

      {/* Scrim */}
      <div className="brand-scrim absolute inset-0 -z-10" aria-hidden />

      {/* Subtle depth. Decorative only. */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
        className="absolute -right-40 top-1/4 -z-10 size-[36rem] rounded-full bg-brand-sky/12 blur-3xl"
      />

      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-24 lg:pt-36">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm"
          >
            <div className="flex" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-brand-gold text-brand-gold" />
              ))}
            </div>
            <p className="text-xs font-medium text-white sm:text-sm">
              {siteConfig.google.rating} from {siteConfig.google.reviewCount}{" "}
              Google reviews
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
            className="mt-6 text-balance text-4xl leading-[1.05] text-white sm:text-6xl lg:text-7xl"
          >
            Building trust.
            <br />
            <span className="text-brand-gold">Finding homes.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg"
          >
            A real estate consultancy in Borivali East, guiding buyers, sellers
            and investors across Mumbai&apos;s western suburbs. We show you
            everything relevant, explain the trade-offs honestly, and leave the
            decision where it belongs — with you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <ButtonLink
              href="/properties"
              size="xl"
              className="bg-brand-gold text-brand-indigo-950 hover:bg-brand-gold-400"
            >
              Browse properties
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink
              href="/contact"
              size="xl"
              variant="outline"
              className="border-white/30 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
            >
              Talk to a consultant
            </ButtonLink>
          </motion.div>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.32 }}
          className="mt-12 lg:mt-16"
        >
          <PropertySearchForm locations={locations} variant="hero" />
        </motion.div>
      </div>
    </section>
  );
}
