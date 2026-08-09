import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { AboutSection } from "@/components/home/about-section";
import { FounderSection } from "@/components/home/founder-section";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Section, SectionHeader } from "@/components/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { brandStrategy, brandVoice, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us — A Real Estate Consultancy in Borivali East",
  description: `${siteConfig.name} is a Mumbai real estate consultancy founded by ${siteConfig.founder.name}. Our purpose, values, and how we work.`,
  alternates: { canonical: "/about" },
};

const PILLARS = [
  { label: "Our purpose", body: brandStrategy.purpose },
  { label: "Our mission", body: brandStrategy.mission },
  { label: "Our vision", body: brandStrategy.vision },
  { label: "Our promise", body: brandStrategy.promise },
  { label: "Our positioning", body: brandStrategy.positioning },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="We guide. You decide."
        description={siteConfig.description}
        breadcrumbs={[{ name: "About", href: "/about" }]}
      />

      <AboutSection />

      <Section tone="muted">
        <SectionHeader
          eyebrow="What we stand for"
          title="The things we actually hold ourselves to"
          description="Written down, so you can hold us to them too."
        />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar) => (
            <RevealItem key={pillar.label} className="h-full">
              <div className="h-full rounded-2xl border border-border bg-card p-7">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold-600">
                  {pillar.label}
                </h3>
                <p className="mt-3 text-pretty leading-relaxed text-foreground/80">
                  {pillar.body}
                </p>
              </div>
            </RevealItem>
          ))}

          <RevealItem className="h-full">
            <div className="brand-gradient h-full rounded-2xl p-7 text-white">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
                Our values
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {brandStrategy.values.map((value) => (
                  <li
                    key={value}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium"
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        </RevealGroup>
      </Section>

      <FounderSection />

      <WhyChooseUs />

      {/* How we speak. Publishing this is unusual — and it is the point.
          It gives clients an explicit standard to hold us to. */}
      <Section>
        <SectionHeader
          eyebrow="How we talk to you"
          title="You will never hear these from us"
          description="Our brand guidelines rule out pressure selling. Here is the actual list."
        />

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-7">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-700">
              What we say
            </h3>
            <ul className="mt-4 space-y-3">
              {brandVoice.doSay.map((line) => (
                <li
                  key={line}
                  className="text-pretty font-medium text-brand-indigo-900"
                >
                  “{line}”
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-red-200 bg-red-50/40 p-7">
            <h3 className="text-sm font-bold uppercase tracking-wider text-red-700">
              What we don&apos;t
            </h3>
            <ul className="mt-4 space-y-3">
              {brandVoice.dontSay.map((line) => (
                <li
                  key={line}
                  className="text-pretty font-medium text-muted-foreground line-through decoration-red-400/60"
                >
                  “{line}”
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
