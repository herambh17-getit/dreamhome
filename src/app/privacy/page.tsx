import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { Prose } from "@/components/prose";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects the information you share when you enquire about property in Mumbai.`,
  alternates: { canonical: "/privacy" },
};

/**
 * Privacy policy.
 *
 * This is a clear, honest baseline that matches what the site actually does
 * (an enquiry form and WhatsApp/phone contact — no accounts, no tracking-led
 * advertising). It is written to be truthful, not to be legal advice: the
 * business should have it reviewed against the DPDP Act 2023 and its own
 * data practices before relying on it.
 */
const UPDATED = "26 July 2026";

const content = `We keep this simple, because our whole business is built on trust. This policy explains what we collect when you contact ${siteConfig.name}, why, and what we will never do.

## What we collect

We only collect what you choose to give us. When you submit an enquiry form, call, or message us on WhatsApp, that typically means your **name, phone number, email address, and whatever you tell us about what you are looking for**. We do not ask for, or want, financial account numbers, passwords or identity-document numbers through this website.

## How we use it

- To understand your requirement and respond to your enquiry.
- To share property options, arrange viewings, and follow up on a conversation you started.
- To keep a record of our discussions so we can serve you properly over time.

That is the entire list. We contact you about your enquiry — not with unrelated marketing you did not ask for.

## What we will never do

- We do **not** sell, rent or trade your personal information to anyone.
- We do **not** pass your details to a developer, bank or third party without telling you and having a reason connected to your request.
- We do **not** run advertising trackers that profile you across other websites.

## Cookies and analytics

This site aims to work without unnecessary tracking. If aggregate analytics are used to understand which pages are useful, they are configured to respect your privacy, and any non-essential cookies are only set with your consent.

## Third-party services

If you click through to WhatsApp, a phone dialler, an email client or an embedded map, those services handle your interaction under their own privacy policies. We do not control them.

## Keeping your data

We hold enquiry information only for as long as it is useful to help you, or as long as the law requires, and then we remove it. You can ask us at any time to tell you what we hold, correct it, or delete it.

## Your choices

To see, correct or delete the information we hold about you, or to ask any question about this policy, contact us at **${siteConfig.contact.email}** or **${siteConfig.contact.phone}**. We will respond within a reasonable time.

## Changes to this policy

If we change how we handle information, we will update this page and the date below. Material changes will be made clear.

_Last updated: ${UPDATED}._`;

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="What we collect when you get in touch, why, and the lines we will not cross."
        breadcrumbs={[{ name: "Privacy", href: "/privacy" }]}
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <Prose content={content} />
        </div>
      </Section>
    </>
  );
}
