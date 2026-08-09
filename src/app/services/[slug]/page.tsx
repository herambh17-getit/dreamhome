import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Section, SectionHeader } from "@/components/section";
import { EnquiryForm } from "@/components/enquiry-form";
import { ServiceIcon } from "@/components/service-icon";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { getFaqs } from "@/lib/queries";
import { practiceAreas, services, whatsappLink } from "@/lib/site-config";
import { serviceDetails } from "@/data/service-details";

/** Both the four core services and the eight practice areas live at /services/*. */
function findService(slug: string) {
  const core = services.find((s) => s.slug === slug);
  if (core) return { ...core, kind: "core" as const };

  const area = practiceAreas.find((a) => a.slug === slug);
  if (area)
    return {
      ...area,
      description: area.summary,
      kind: "practice" as const,
    };

  return null;
}

export function generateStaticParams() {
  return [...services, ...practiceAreas].map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = findService(slug);
  if (!service) return { title: "Service not found" };

  return {
    title: `${service.title} in Mumbai`,
    description: service.summary,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServicePage(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;
  const service = findService(slug);
  if (!service) notFound();

  const detail = serviceDetails[slug];
  const allFaqs = await getFaqs();

  // Show only FAQs relevant to this service, when a category is mapped.
  const faqs = detail?.faqCategory
    ? allFaqs.filter((f) => f.category === detail.faqCategory)
    : [];

  return (
    <>
      <PageHeader
        eyebrow="Service"
        title={service.title}
        description={service.summary}
        breadcrumbs={[
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${slug}` },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-brand-indigo-50 text-primary">
              <ServiceIcon name={service.icon} className="size-7" />
            </span>

            <p className="mt-6 text-pretty text-lg leading-relaxed text-foreground/85">
              {service.description}
            </p>

            {detail?.body.map((paragraph, i) => (
              <p
                key={i}
                className="mt-4 text-pretty leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}

            {detail?.steps && (
              <section className="mt-12">
                <h2 className="text-2xl text-brand-indigo-900">How it works</h2>
                <ol className="mt-6 space-y-6">
                  {detail.steps.map((step, i) => (
                    <li key={step.title} className="flex gap-5">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="text-base text-brand-indigo-900">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {detail?.includes && (
              <section className="mt-12">
                <h2 className="text-2xl text-brand-indigo-900">
                  What&apos;s included
                </h2>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {detail.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-foreground/80"
                    >
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-brand-gold-600"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xl text-brand-indigo-900">
                Talk to us about this
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                No obligation. We&apos;ll tell you honestly whether we can help.
              </p>

              <ButtonLink
                href={whatsappLink(
                  `Hi, I'd like to know more about your ${service.title} service.`,
                )}
                external
                size="lg"
                className="mt-5 w-full bg-[#25D366] text-white hover:bg-[#1da851]"
              >
                <WhatsAppIcon className="size-4" aria-hidden />
                Ask on WhatsApp
              </ButtonLink>

              <div className="my-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-border" />
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  or
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>

              <EnquiryForm source={`service:${slug}`} compact />
            </div>
          </aside>
        </div>
      </div>

      {faqs.length > 0 && (
        <Section tone="muted">
          <SectionHeader
            eyebrow="Questions"
            title={`${service.title} — common questions`}
          />
          <RevealGroup className="mx-auto mt-12 max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <RevealItem key={faq.id}>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-base text-brand-indigo-900">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <FaqJsonLd faqs={faqs} />
        </Section>
      )}
    </>
  );
}
