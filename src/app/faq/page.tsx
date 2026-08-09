import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { FaqAccordion } from "@/components/faq-accordion";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { getFaqs } from "@/lib/queries";
import { whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Straight answers about buying, selling and renting property in Mumbai — RERA, title verification, stamp duty, society redevelopment and NRI purchases.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Questions people actually ask"
        description="Answered properly, without the hedging. If yours isn't here, just ask us."
        breadcrumbs={[{ name: "FAQ", href: "/faq" }]}
      />

      <Section>
        <FaqAccordion faqs={faqs} />

        <div className="mx-auto mt-16 max-w-2xl rounded-3xl border border-border bg-brand-light p-8 text-center">
          <h2 className="text-2xl text-brand-indigo-900">
            Still not sure about something?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
            Ask us anything, including the questions you think sound naive. Those
            are usually the important ones.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink
              href={whatsappLink("Hi, I have a question about property in Mumbai.")}
              external
              size="lg"
              className="bg-[#25D366] text-white hover:bg-[#1da851]"
            >
              <WhatsAppIcon className="size-4" aria-hidden />
              Ask on WhatsApp
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="outline">
              Send a message
            </ButtonLink>
          </div>
        </div>
      </Section>

      <FaqJsonLd faqs={faqs} />
    </>
  );
}
