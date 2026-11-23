import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaqJsonLd } from "@/components/seo/json-ld";
import type { Faq } from "@/lib/types";

/**
 * A short FAQ for the homepage. Answers are rendered into the HTML
 * (keepMounted) so crawlers and AI assistants can read them, and the same
 * questions are emitted as FAQPage markup.
 */
export function HomeFaq({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;

  return (
    <Section id="faq" tone="muted">
      <SectionHeader
        eyebrow="Questions"
        title="Questions people ask us first"
        description="Straight answers, without the hedging."
      />

      <Accordion className="mx-auto mt-12 max-w-3xl space-y-3">
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="rounded-2xl border border-border bg-card px-5 data-[panel-open]:border-brand-indigo-200"
          >
            <AccordionTrigger className="text-left text-base font-semibold text-brand-indigo-900 hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent
              keepMounted
              className="text-pretty leading-relaxed text-muted-foreground"
            >
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <p className="mt-8 text-center">
        <Link
          href="/faq"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          See all questions
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </p>

      <FaqJsonLd faqs={faqs} />
    </Section>
  );
}
