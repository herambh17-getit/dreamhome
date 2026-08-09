import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { EnquiryForm } from "@/components/enquiry-form";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { siteConfig, whatsappLink } from "@/lib/site-config";

/**
 * Contact + map.
 *
 * The map is a lazy-loaded iframe rather than the JS Maps SDK: it costs
 * nothing until scrolled to, needs no API key, and cannot break the page.
 * Swap to the SDK only if interactive pins are ever actually required.
 */
export function ContactSection() {
  const { contact } = siteConfig;
  // Full street address geocodes to the actual shop, not just the suburb.
  const mapQuery = encodeURIComponent(contact.address.full);

  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold-600">
            Get in touch
          </p>
          <h2 className="mt-3 text-balance text-3xl leading-[1.15] text-brand-indigo-900 sm:text-4xl">
            Tell us what you&apos;re looking for
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            No obligation, no pressure. Describe what you need and we&apos;ll
            come back with honest options — including whether now is the right
            time to move at all.
          </p>

          <dl className="mt-8 space-y-5">
            <ContactRow icon={Phone} label="Phone">
              <a
                href={`tel:${contact.phoneHref}`}
                className="font-semibold text-brand-indigo-900 transition-colors hover:text-primary"
              >
                {contact.phone}
              </a>
            </ContactRow>

            <ContactRow icon={Mail} label="Email">
              <a
                href={`mailto:${contact.email}`}
                className="font-semibold text-brand-indigo-900 transition-colors hover:text-primary"
              >
                {contact.email}
              </a>
            </ContactRow>

            <ContactRow icon={MapPin} label="Office">
              <span className="font-semibold text-brand-indigo-900">
                {contact.address.full}
              </span>
            </ContactRow>

            <ContactRow icon={Clock} label="Hours">
              <span className="font-semibold text-brand-indigo-900">
                {contact.hours}
              </span>
            </ContactRow>
          </dl>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1da851] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
          >
            <WhatsAppIcon className="size-5" aria-hidden />
            Chat on WhatsApp instead
          </a>

          <div className="mt-8 overflow-hidden rounded-2xl border border-border">
            <iframe
              title={`Map showing ${siteConfig.name} in ${contact.address.locality}`}
              src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full border-0"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h3 className="text-xl text-brand-indigo-900">Send an enquiry</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              We typically reply the same working day.
            </p>
            <EnquiryForm source="homepage-contact" className="mt-6" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Phone;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-indigo-50 text-primary">
        <Icon className="size-4.5" strokeWidth={2} aria-hidden />
      </span>
      <div>
        <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </dt>
        <dd className="mt-0.5">{children}</dd>
      </div>
    </div>
  );
}
