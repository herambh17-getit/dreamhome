"use client";

import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { Faq } from "@/lib/types";

/**
 * FAQ list with category filtering.
 *
 * Categories are derived from the data rather than hard-coded, so adding an
 * FAQ in a new category needs no code change here.
 */
export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(faqs.map((f) => f.category)))],
    [faqs],
  );
  const [active, setActive] = useState("All");

  const visible =
    active === "All" ? faqs : faqs.filter((f) => f.category === active);

  return (
    <div className="mx-auto max-w-3xl">
      <div
        className="flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Filter questions by category"
      >
        {categories.map((category) => {
          const isActive = active === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-brand-indigo-200 hover:text-foreground",
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      <Accordion className="mt-10 space-y-3">
        {visible.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="rounded-2xl border border-border bg-card px-5 data-[panel-open]:border-brand-indigo-200"
          >
            <AccordionTrigger className="text-left text-base font-semibold text-brand-indigo-900 hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-pretty leading-relaxed text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {visible.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          No questions in this category yet.
        </p>
      )}
    </div>
  );
}
