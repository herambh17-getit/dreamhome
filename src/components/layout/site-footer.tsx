import Link from "next/link";
import { Mail, MapPin, Phone, Star } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/icons/social-icons";
import { locations } from "@/data/locations";
import {
  mainNav,
  practiceAreas,
  services,
  siteConfig,
  whatsappLink,
} from "@/lib/site-config";

const year = new Date().getFullYear();

/**
 * Social profiles, in display order. Only entries with a non-empty URL in
 * `siteConfig.social` render — so nothing appears until a real profile link
 * is set, and we never ship an icon that points nowhere.
 */
const socialLinks = [
  { label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { label: "YouTube", href: siteConfig.social.youtube, Icon: YoutubeIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedinIcon },
].filter((s) => s.href);

export function SiteFooter() {
  return (
    <footer className="bg-brand-indigo-950 text-brand-indigo-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + contact */}
          <div className="lg:col-span-4">
            <BrandLogo inverted className="h-16 [&_img]:h-16" />

            <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-brand-indigo-200">
              {siteConfig.shortDescription}
            </p>

            <div className="mt-6 flex items-center gap-2">
              <div className="flex" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-brand-gold text-brand-gold"
                  />
                ))}
              </div>
              <p className="text-sm text-brand-indigo-200">
                <span className="font-semibold text-white">
                  {siteConfig.google.rating}
                </span>{" "}
                from {siteConfig.google.reviewCount} Google reviews
              </p>
            </div>

            <address className="mt-6 space-y-3 text-sm not-italic">
              <a
                href={`tel:${siteConfig.contact.phoneHref}`}
                className="flex items-center gap-3 text-brand-indigo-200 transition-colors hover:text-white"
              >
                <Phone className="size-4 shrink-0 text-brand-gold" aria-hidden />
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 text-brand-indigo-200 transition-colors hover:text-white"
              >
                <Mail className="size-4 shrink-0 text-brand-gold" aria-hidden />
                {siteConfig.contact.email}
              </a>
              <p className="flex items-start gap-3 text-brand-indigo-200">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-brand-gold"
                  aria-hidden
                />
                {siteConfig.contact.address.full}
              </p>
            </address>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1da851] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <WhatsAppIcon className="size-4" aria-hidden />
              Chat on WhatsApp
            </a>

            {socialLinks.length > 0 && (
              <div className="mt-6 flex items-center gap-3.5">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${siteConfig.name} on ${label}`}
                    className="flex size-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-brand-indigo-100 transition-colors hover:border-brand-gold hover:bg-brand-gold hover:text-brand-indigo-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <Icon className="size-6" aria-hidden />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
            <FooterColumn title="Explore">
              {mainNav.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.title}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Services">
              {services.map((s) => (
                <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                  {s.title}
                </FooterLink>
              ))}
              {practiceAreas.slice(4, 8).map((p) => (
                <FooterLink key={p.slug} href={`/services/${p.slug}`}>
                  {p.title}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Locations">
              {locations.map((l) => (
                <FooterLink key={l.slug} href={`/locations/${l.slug}`}>
                  Property in {l.name}
                </FooterLink>
              ))}
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/sitemap.xml">Sitemap</FooterLink>
            </FooterColumn>
          </div>
        </div>

        {/* RERA / advisory notice. A consultancy positioned on transparency
            should carry this prominently rather than bury it. */}
        <div className="mt-14 rounded-xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-sm font-semibold text-white">
            A note on verification
          </h2>
          {siteConfig.rera.agentNumber && (
            <p className="mt-2 text-xs font-semibold text-white">
              MahaRERA Agent Registration No.{" "}
              <a
                href={siteConfig.rera.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold underline-offset-2 hover:underline"
              >
                {siteConfig.rera.agentNumber}
              </a>
            </p>
          )}
          <p className="mt-2 text-pretty text-xs leading-relaxed text-brand-indigo-200">
            Always verify a project&apos;s MahaRERA registration on the official
            MahaRERA portal before you commit to a purchase, and read the
            approved plans and possession dates published there. Information on
            this website is provided in good faith for general guidance; it is
            not a legal opinion, an offer, or investment advice, and prices,
            availability and specifications are subject to change. We will give
            you the registration number for any project we introduce you to —
            please look it up yourself.
          </p>
        </div>

        <p className="mt-6 text-center text-[0.7rem] leading-relaxed text-brand-indigo-300/80">
          Locality photographs (Kandivali, Malad, Goregaon, Andheri and Mumbai)
          are sourced from Wikimedia Commons and used under their respective
          Creative Commons licences. They are representative of the area, not of
          any specific listing.
        </p>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-brand-indigo-300 sm:flex-row">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="font-medium text-brand-indigo-200">
            {siteConfig.tagline}
          </p>
          <nav aria-label="Legal" className="flex gap-5">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
            <Link href="/contact" className="transition-colors hover:text-white">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-widest text-brand-gold">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-brand-indigo-200 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {children}
      </Link>
    </li>
  );
}
