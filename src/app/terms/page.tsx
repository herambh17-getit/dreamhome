import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { Prose } from "@/components/prose";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms on which ${siteConfig.name} provides information on this website, including RERA verification and no-guarantee notices.`,
  alternates: { canonical: "/terms" },
};

/**
 * Terms of use.
 *
 * Conservative and honest: the site is informational, nothing on it is an
 * offer, and the visitor is responsible for independent RERA/legal
 * verification. This is a sensible baseline, not legal advice — have it
 * reviewed by a lawyer before launch.
 */
const UPDATED = "26 July 2026";

const content = `These terms apply to your use of this website. By using it, you accept them. If you do not agree, please do not use the site.

## Information only — not an offer

Everything on this website is provided for **general information**. Property descriptions, prices, carpet areas, amenities, images and possession dates are indicative, can change without notice, and do **not** constitute an offer, a quotation, or a binding representation. Nothing here is legal, financial or investment advice.

## Sample content

Some listings and project pages on this site may currently show **sample content** for demonstration. Do not rely on any specific listing until you have confirmed the details with us directly and in writing.

## Verify RERA and title independently

Before you commit to any property, you must satisfy yourself — ideally with your own advocate — on title, approvals and registration. **Always verify a project's MahaRERA registration on the official MahaRERA portal** (${siteConfig.rera.portalUrl}) and read the approved plans and declared possession dates published there. We will give you the registration number for any project we introduce you to; the responsibility to check it is yours.

## Our role

${siteConfig.name} acts as a real estate **consultant and agent**. We help you find, evaluate and transact property. We are not the developer, the builder, or a party to the sale agreement between you and a seller, and we do not guarantee the performance of any third party.

## Third-party links and content

The site may link to or embed third-party services (maps, WhatsApp, developer material). We are not responsible for the content, accuracy or practices of those services.

## Limitation of liability

To the extent permitted by law, ${siteConfig.name} is not liable for any loss arising from reliance on information on this website. Your remedy, if you are dissatisfied with the site, is to stop using it.

## Intellectual property

The ${siteConfig.name} name, logo and original content on this site belong to ${siteConfig.legalName}. Locality photographs are used under their respective licences (see the credit note in the site footer). Please do not reproduce our content without permission.

## Governing law

These terms are governed by the laws of India, and the courts at Mumbai, Maharashtra have exclusive jurisdiction.

## Contact

Questions about these terms? Reach us at **${siteConfig.contact.email}** or **${siteConfig.contact.phone}**.

_Last updated: ${UPDATED}._`;

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Use"
        description="The basis on which we share information here — and what stays your responsibility to verify."
        breadcrumbs={[{ name: "Terms", href: "/terms" }]}
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <Prose content={content} />
        </div>
      </Section>
    </>
  );
}
