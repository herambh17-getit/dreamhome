import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { brandStrategy, siteConfig } from "@/lib/site-config";

/**
 * About band.
 *
 * The counters are deliberately conservative. Only two numbers about this
 * business are actually verified — the Google rating and review count — so
 * those are the only ones stated as fact. Invented "500+ happy families"
 * counters are the industry norm and exactly the kind of claim the brand's
 * own voice guidelines rule out.
 */
export function AboutSection() {
  return (
    <Section id="about" className="overflow-hidden">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold-600">
            About us
          </p>
          <h2 className="mt-3 text-balance text-3xl leading-[1.15] text-brand-indigo-900 sm:text-4xl lg:text-[2.75rem]">
            A consultancy, not a brokerage
          </h2>
          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            {siteConfig.description}
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            The distinction matters. A broker is paid to close the transaction
            in front of them. A consultant is paid to give you the right answer
            — and sometimes the right answer is to wait, or to walk away. We
            have built this practice on being the second kind, which is slower,
            and which is why people come back.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/about" size="lg">
              Our story
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/services" size="lg" variant="outline">
              What we do
            </ButtonLink>
          </div>
        </Reveal>

        <RevealGroup className="grid gap-4 sm:grid-cols-2">
          <RevealItem className="sm:col-span-2">
            <div className="brand-gradient rounded-2xl p-7 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
                Our vision
              </p>
              <p className="mt-3 text-pretty text-lg font-semibold leading-relaxed">
                {brandStrategy.vision}
              </p>
            </div>
          </RevealItem>

          <RevealItem>
            <div className="h-full rounded-2xl border border-border bg-card p-7">
              <p className="text-4xl font-extrabold text-brand-indigo-900">
                {siteConfig.google.rating}
                <span className="text-xl text-muted-foreground">/5</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                across {siteConfig.google.reviewCount} verified Google reviews
              </p>
            </div>
          </RevealItem>

          <RevealItem>
            <div className="h-full rounded-2xl border border-border bg-card p-7">
              <p className="text-4xl font-extrabold text-brand-indigo-900">
                {siteConfig.serviceAreas.length - 1}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                western suburbs we cover in depth — Borivali to Andheri
              </p>
            </div>
          </RevealItem>

          <RevealItem className="sm:col-span-2">
            <div className="h-full rounded-2xl border border-brand-gold/30 bg-brand-gold/5 p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold-600">
                Our values
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {brandStrategy.values.map((value) => (
                  <li
                    key={value}
                    className="rounded-full border border-brand-indigo-100 bg-background px-3.5 py-1.5 text-sm font-medium text-brand-indigo-900"
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </Section>
  );
}
