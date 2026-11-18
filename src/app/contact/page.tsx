import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/page-header";
import { Section, SectionHeader } from "@/components/section";
import { ContactSection } from "@/components/home/contact-section";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: `Contact ${siteConfig.name}, Mumbai`,
  description: `Call, WhatsApp or visit ${siteConfig.name} in ${siteConfig.contact.address.locality}, Mumbai to buy, sell, rent or invest in property. Honest advice, no obligation.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about what you actually need"
        description="Call, WhatsApp, or send a message. We'll come back with honest options — including whether now is the right time to move at all."
        breadcrumbs={[{ name: "Contact", href: "/contact" }]}
      />
      <ContactSection />

      <Section tone="muted">
        <SectionHeader
          eyebrow="Before you get in touch"
          title="What helps us help you"
          description="You do not need to have everything worked out. A few details just let us give you a useful answer the first time."
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-base text-brand-indigo-900">What to tell us</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>Whether you want to buy, sell, rent or invest</li>
              <li>The area or areas you are considering</li>
              <li>Your rough budget, or the price you hope to get</li>
              <li>How soon you hope to move</li>
              <li>Anything you will not compromise on</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-base text-brand-indigo-900">What happens next</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>We read your message and call or reply on WhatsApp.</li>
              <li>We ask a few questions to understand what you actually need.</li>
              <li>We tell you honestly whether we can help, and how.</li>
              <li>If it makes sense, we move on to a shortlist, a valuation or a consultation. If not, we say so.</li>
            </ol>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-base text-brand-indigo-900">Visiting the office</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Our office is at {siteConfig.contact.address.full}. We are open
              all days, {siteConfig.contact.hours.replace(/^Open all days,\s*/, "")}.
              Calling ahead is not required, but if you want to meet a
              particular person or go through documents at length, a quick call
              helps us set aside the time.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Prefer not to travel? Most conversations, including NRI
              enquiries, work well over a call or video.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
