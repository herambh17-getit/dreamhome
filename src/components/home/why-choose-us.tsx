import {
  BadgeCheck,
  Eye,
  FileText,
  MapPin,
  TrendingUp,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { whyChooseUs } from "@/lib/site-config";

const ICONS: Record<string, LucideIcon> = {
  UserRoundCheck,
  MapPin,
  Eye,
  BadgeCheck,
  FileText,
  TrendingUp,
};

export function WhyChooseUs() {
  return (
    <Section id="why-us" tone="dark">
      <SectionHeader
        tone="dark"
        eyebrow="Why choose us"
        title="Six reasons people keep sending us their family"
        description="None of them are 'best deals guaranteed'."
      />

      <RevealGroup className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {whyChooseUs.map((item) => {
          const Icon = ICONS[item.icon] ?? BadgeCheck;

          return (
            <RevealItem key={item.title}>
              <div className="flex gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-brand-gold/30 bg-brand-gold/10 text-brand-gold">
                  <Icon className="size-5" strokeWidth={2} aria-hidden />
                </span>
                <div>
                  <h3 className="text-base text-white">{item.title}</h3>
                  <p className="mt-1.5 text-pretty text-sm leading-relaxed text-brand-indigo-200">
                    {item.description}
                  </p>
                </div>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
