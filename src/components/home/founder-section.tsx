import Image from "next/image";
import { Quote } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { FOUNDER_SRC } from "@/lib/brand-assets.generated";
import { brandStrategy, siteConfig } from "@/lib/site-config";

/**
 * Meet the Founder.
 *
 * The portrait is the emotional anchor of a trust-first site, so when the
 * real photograph is missing we render a branded monogram panel rather than
 * a stock face. Using a stock model to stand in for a named real person
 * would be a straightforward misrepresentation.
 */
export function FounderSection() {
  const { founder } = siteConfig;

  return (
    <Section id="founder">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-brand-indigo-50">
              {FOUNDER_SRC ? (
                <Image
                  src={FOUNDER_SRC}
                  alt={`${founder.name}, ${founder.role} of ${siteConfig.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              ) : (
                <FounderPlaceholder name={founder.name} />
              )}
            </div>

            {/* Floating credential card */}
            <div className="absolute -bottom-6 -right-4 hidden max-w-[15rem] rounded-2xl border border-border bg-card p-5 shadow-xl sm:block lg:-right-8">
              <Quote className="size-6 text-brand-gold" aria-hidden />
              <p className="mt-2 text-pretty text-sm font-semibold leading-snug text-brand-indigo-900">
                “We guide, you decide.”
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {founder.name}, {founder.role}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold-600">
            Meet the founder
          </p>
          <h2 className="mt-3 text-balance text-3xl leading-[1.15] text-brand-indigo-900 sm:text-4xl">
            {founder.name}
          </h2>
          <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {founder.role}, {siteConfig.name}
          </p>

          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            {founder.bio}
          </p>

          <blockquote className="mt-8 border-l-2 border-brand-gold pl-5">
            <p className="text-pretty text-lg font-semibold leading-relaxed text-brand-indigo-900">
              {brandStrategy.promise}
            </p>
          </blockquote>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/about" size="lg">
              Read our story
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="outline">
              Speak to Nayan
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function FounderPlaceholder({ name }: { name: string }) {
  const initials = name
    .replace(/^(Mr|Mrs|Ms|Dr)\.?\s+/i, "")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      className="brand-gradient flex size-full flex-col items-center justify-center gap-4 text-white"
      role="img"
      aria-label={`Photograph of ${name} — coming soon`}
    >
      <span className="flex size-28 items-center justify-center rounded-full border-2 border-white/25 bg-white/10 text-4xl font-extrabold">
        {initials}
      </span>
      <p className="px-8 text-center text-sm text-white/70">
        Portrait coming soon
      </p>
    </div>
  );
}
