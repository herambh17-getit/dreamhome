import Link from "next/link";
import { Clock, MapPin, ShieldCheck } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { mapEmbedSrc } from "@/lib/google-maps";
import { GoogleBusinessCard } from "@/components/google-business-card";
import { FounderJsonLd } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/page-header";
import { AboutSection } from "@/components/home/about-section";
import { FounderSection } from "@/components/home/founder-section";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Section, SectionHeader } from "@/components/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { brandStrategy, brandVoice, siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: `About ${siteConfig.name}, Borivali East`,
  description: `${siteConfig.name} has advised Mumbai buyers, sellers and tenants from Borivali East since ${siteConfig.founded}. Founded by ${siteConfig.founder.name}. Our story, principles and office.`,
  path: "/about",
  image: "/images/team/founder.jpg",
  imageAlt: `${siteConfig.founder.name}, ${siteConfig.founder.role} of ${siteConfig.name}`,
});

/** The business's three working principles, in its own words. */
const PRINCIPLES = [
  {
    title: "We say no to bad deals.",
    body: "If a flat has an OC issue, a stuck NOC or a seller with a hidden loan, we'll tell you — even if it means losing our commission.",
  },
  {
    title: "We quote carpet, not built-up.",
    body: "You'll always know exactly what you're buying or renting.",
  },
  {
    title: "We don't hide the brokerage.",
    body: "Standard rate on a sale, one month's rent on a rental — written into the agreement before the token.",
  },
];

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
      <FounderJsonLd />
      <PageHeader
        eyebrow={`About us · Since ${siteConfig.founded}`}
        title="20 years, rooted in Borivali East."
        description="We guide. You decide."
        breadcrumbs={[{ name: "About", href: "/about" }]}
      />

      {/* Our story — the business's own account of its history. */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold-600">
            Our story
          </p>
          <div className="mt-4 space-y-5 text-pretty text-lg leading-relaxed text-foreground/85">
            <p>
              {siteConfig.name} opened in Borivali East in {siteConfig.founded}.
              In the two decades since, Borivali has gone from the edge of the
              city to one of Mumbai&apos;s most sought-after suburbs. Over that
              stretch, we&apos;ve placed families in their first flats, helped
              NRIs invest in rental homes, closed commercial deals for small
              shop owners on Shiv Vallabh Road, and handled hundreds of
              leave-and-licence agreements in buildings we now know better than
              most owners do.
            </p>
            <p>
              We work from a single office at Shop 6, Thakkar Apartment,
              Ashokvan, Borivali East — a five-minute walk from Universal High
              School. From there we work across Mumbai and the MMR, with our
              deepest expertise in north Mumbai — Borivali East and West,{" "}
              <Link
                href="/locations/borivali/shantivan"
                className="font-medium text-primary underline underline-offset-2"
              >
                Shantivan
              </Link>
              , Ashok Van, Nensey Colony, Magathane, Dahisar East, Kandivali
              East including Thakur Village, Malad, Goregaon and Andheri — and
              in South Mumbai.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border bg-card p-7"
            >
              <h2 className="text-lg text-brand-indigo-900">{p.title}</h2>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

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

      <Section tone="muted" id="office">
        <SectionHeader
          eyebrow="Our office"
          title="Come and see us in Borivali East"
          description="Walk in, call or WhatsApp — whichever suits you."
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <iframe
              title={`Google Map showing ${siteConfig.name} in ${siteConfig.contact.address.locality}`}
              src={mapEmbedSrc()}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-80 w-full border-0"
            />
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="flex items-start gap-3 text-sm text-foreground/85">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-gold-600" aria-hidden />
                {siteConfig.contact.address.full}
              </p>
              <p className="mt-3 flex items-start gap-3 text-sm text-foreground/85">
                <Clock className="mt-0.5 size-4 shrink-0 text-brand-gold-600" aria-hidden />
                {siteConfig.contact.hours}
              </p>
              {siteConfig.rera.agentNumber && (
                <p className="mt-3 flex items-start gap-3 text-sm text-foreground/85">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand-gold-600" aria-hidden />
                  <span>
                    MahaRERA Agent Registration No.{" "}
                    <a
                      href={siteConfig.rera.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-brand-indigo-900 underline-offset-2 hover:underline"
                    >
                      {siteConfig.rera.agentNumber}
                    </a>
                  </span>
                </p>
              )}
            </div>
            <GoogleBusinessCard />
          </div>
        </div>
      </Section>
    </>
  );
}
