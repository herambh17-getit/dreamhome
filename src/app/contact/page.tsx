import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/page-header";
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
    </>
  );
}
