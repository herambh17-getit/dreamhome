import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ContactSection } from "@/components/home/contact-section";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact a Property Consultant in Mumbai",
  description: `Speak to ${siteConfig.name} about buying, selling, renting or investing in Mumbai property. Based in ${siteConfig.contact.address.full}. No obligation.`,
  alternates: { canonical: "/contact" },
};

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
