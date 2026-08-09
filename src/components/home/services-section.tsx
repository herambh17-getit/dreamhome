import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Home,
  Key,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { services } from "@/lib/site-config";

/**
 * Icon names live as strings in site-config (which must stay serialisable and
 * free of React imports), so they are resolved to components here.
 */
const ICONS: Record<string, LucideIcon> = {
  Home,
  Building2,
  Key,
  MessagesSquare,
};

export function ServicesSection() {
  return (
    <Section id="services">
      <SectionHeader
        eyebrow="What we do"
        title="Four services, done properly"
        description="We would rather do a few things well than list twenty and mean none of them."
      />

      <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => {
          const Icon = ICONS[service.icon] ?? Home;

          return (
            <RevealItem key={service.slug} className="h-full">
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-indigo-200 hover:shadow-xl hover:shadow-brand-indigo/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-indigo-50 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  {/* 2px stroke + rounded caps matches the brand sheet's
                      "Icon Style: Outline | 2px Stroke | Rounded Corners". */}
                  <Icon className="size-6" strokeWidth={2} aria-hidden />
                </span>

                <h3 className="mt-5 text-lg text-brand-indigo-900">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {service.summary}
                </p>

                <span
                  aria-hidden
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                >
                  Learn more
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
