/**
 * Single source of truth for business data.
 *
 * Everything a non-developer might need to change lives here: contact
 * details, service areas, brand voice strings, nav. Pages and JSON-LD read
 * from this file, so updating a phone number here updates it everywhere,
 * including schema markup.
 *
 * Contact details are taken from the live dreamhomeproperties.in site.
 * They feed WhatsApp links, `tel:` links and LocalBusiness schema, so a
 * wrong value here silently drops real leads.
 *
 * Still unconfirmed: postalCode and geo are inferred for Borivali East, not
 * read off the live site. Verify both before launch — geo drives the map pin.
 */

export const siteConfig = {
  name: "Dream Home Properties",
  legalName: "Dream Home Properties",
  tagline: "Building Trust. Finding Homes.",
  // From the source data sheet; used as a secondary//supporting line.
  altTagline: "Your Local Real Estate Expert",
  industry: "Real Estate Consultancy",
  businessType: "Real Estate Consultant",

  description:
    "Dream Home Properties is a Mumbai-based real estate consultancy specializing in residential and commercial properties. The company assists buyers, sellers, investors and tenants with transparent and professional guidance.",

  shortDescription:
    "A premium real estate consultancy in Borivali East, Mumbai — guiding buyers, sellers, investors and tenants with transparent, expert advice.",

  url: "https://www.dreamhomeproperties.in",

  contact: {
    phone: "+91 98193 88390",
    phoneHref: "+919819388390",
    whatsapp: "919819388390",
    email: "dreamproperties147@gmail.com",
    address: {
      street: "Shop No 6, Thakkar Apartment, Near Universal High School",
      locality: "Borivali East",
      region: "Maharashtra",
      city: "Mumbai",
      country: "IN",
      postalCode: "400066",
      full: "Shop No 6, Thakkar Apartment, Near Universal High School, Borivali East, Mumbai, Maharashtra 400066",
    },
    geo: { lat: 19.2307, lng: 72.8567 },
    hours: "Open all days, 10:00 AM – 9:30 PM",
  },

  google: {
    rating: 4.9,
    reviewCount: 25,
  },

  /**
   * MahaRERA agent registration. Under the Real Estate (Regulation and
   * Development) Act, a real estate agent operating in Maharashtra must
   * quote their MahaRERA registration number on every piece of marketing.
   *
   * `agentNumber` is intentionally empty until the client supplies the real
   * one — the UI shows nothing rather than a fabricated number, so no invalid
   * registration can ever go live. Set it here and it appears in the footer,
   * the contact page and the RealEstateAgent schema automatically.
   */
  rera: {
    agentNumber: "",
    portalUrl: "https://maharera.maharashtra.gov.in",
  },

  founder: {
    name: "Mr. Nayan Jomraj",
    role: "Founder",
    // Kept factual: the source data gives name and role only. Any
    // biography beyond this needs sign-off before it goes live.
    bio: "Nayan Jomraj founded Dream Home Properties to bring clarity to a market that too often trades on pressure and half-information. His approach is simple and unchanged since day one: understand what a family actually needs, show them everything relevant, explain the trade-offs honestly, and let them decide.",
    principles: [
      "We guide, you decide.",
      "Transparent advice for a better tomorrow.",
      "Helping you make confident real estate decisions.",
    ],
  },

  serviceAreas: [
    "Borivali",
    "Kandivali",
    "Malad",
    "Goregaon",
    "Andheri",
    "Mumbai",
  ],

  social: {
    instagram: "https://www.instagram.com/dreamhomeproperties147/",
    facebook:
      "https://www.facebook.com/people/Dreamhomeproperties/61556126013573/",
    linkedin: "https://www.linkedin.com/in/dreamhome-properties-57b578427/",
    youtube: "https://www.youtube.com/@dreamhomeproperties147",
  },
} as const;

/** Primary navigation — mirrors the "Navigation" list in the source data. */
export const mainNav = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Properties", href: "/properties" },
  { title: "Projects", href: "/projects" },
  { title: "Testimonials", href: "/testimonials" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
] as const;

/**
 * Core services from the source data sheet.
 * `icon` names map to lucide-react icons; the brand sheet specifies
 * outline / 2px stroke / rounded corners, which lucide matches by default.
 */
export const services = [
  {
    slug: "property-buying",
    title: "Property Buying",
    icon: "Home",
    summary:
      "Find the right home with guidance that starts from your needs, not our inventory.",
    description:
      "We shortlist against your budget, commute, family size and long-term plans — then walk you through every option honestly, including the ones with drawbacks.",
  },
  {
    slug: "property-selling",
    title: "Property Selling",
    icon: "Building2",
    summary:
      "Price it right, present it well, and reach buyers who are actually serious.",
    description:
      "Realistic valuation grounded in local comparables, professional listing presentation, and qualified buyer introductions — so you are not fielding time-wasters.",
  },
  {
    slug: "renting",
    title: "Renting",
    icon: "Key",
    summary:
      "Tenants and landlords matched properly, with paperwork handled end to end.",
    description:
      "Verified listings, tenant screening, rent agreements, registration and society NOCs — the full process, without the back-and-forth.",
  },
  {
    slug: "property-consultation",
    title: "Property Consultation",
    icon: "MessagesSquare",
    summary:
      "An expert second opinion before you commit to a major decision.",
    description:
      "Bring us a shortlist, a builder offer or a redevelopment proposal and we will tell you what we would do — clearly, and without a stake in the outcome.",
  },
] as const;

/**
 * Applications / practice areas from the brand sheet's "Applications" panel.
 * Broader than the four core services; these are the specialist desks.
 */
export const practiceAreas = [
  {
    slug: "real-estate-consultancy",
    title: "Real Estate Consultancy",
    icon: "Building2",
    summary:
      "End-to-end advisory across buying, selling, leasing and investment.",
  },
  {
    slug: "nri-services",
    title: "NRI Services",
    icon: "Globe",
    summary:
      "Buy, sell or manage Mumbai property from abroad — with someone on the ground you can trust.",
  },
  {
    slug: "buying-selling",
    title: "Buying & Selling",
    icon: "ArrowRightLeft",
    summary:
      "Transaction management from first viewing to registered agreement.",
  },
  {
    slug: "project-marketing",
    title: "Project Marketing",
    icon: "Megaphone",
    summary:
      "Channel partnerships and launch marketing for developers across the western suburbs.",
  },
  {
    slug: "society-redevelopment",
    title: "Society Redevelopment",
    icon: "Blocks",
    summary:
      "Guiding housing societies through developer selection, terms and member consensus.",
  },
  {
    slug: "legal-documentation",
    title: "Legal & Documentation",
    icon: "Scale",
    summary:
      "Title checks, agreements, stamp duty, registration and society transfer — verified.",
  },
  {
    slug: "investment-advisory",
    title: "Investment Advisory",
    icon: "TrendingUp",
    summary:
      "Yield, appreciation and exit analysis grounded in local market data.",
  },
  {
    slug: "property-management",
    title: "Property Management",
    icon: "ClipboardCheck",
    summary:
      "Tenant sourcing, rent collection, maintenance and compliance for owners.",
  },
] as const;

/** "Why Choose Us" — from the source data sheet. */
export const whyChooseUs = [
  {
    title: "Professional Guidance",
    icon: "UserRoundCheck",
    description:
      "Advice from people who do this full time and have seen how these deals actually play out.",
  },
  {
    title: "Local Market Expertise",
    icon: "MapPin",
    description:
      "Deep, street-level knowledge of Borivali, Kandivali, Malad, Goregaon and Andheri.",
  },
  {
    title: "Transparent Dealings",
    icon: "Eye",
    description:
      "Every number explained. No hidden charges, no pressure, no surprises at signing.",
  },
  {
    title: "Verified Properties",
    icon: "BadgeCheck",
    description:
      "Title, approvals and RERA registration checked before a listing reaches you.",
  },
  {
    title: "Documentation Support",
    icon: "FileText",
    description:
      "Agreements, stamp duty, registration and society formalities handled end to end.",
  },
  {
    title: "Investment Advisory",
    icon: "TrendingUp",
    description:
      "Clear-eyed analysis of yield and appreciation, including when the answer is 'not this one'.",
  },
] as const;

/** Brand strategy — verbatim from the brand sheet's "Brand Strategy" band. */
export const brandStrategy = {
  purpose:
    "To empower individuals and families with reliable real estate knowledge, enabling them to make confident and informed property decisions.",
  mission:
    "To simplify real estate decisions by providing expert guidance, ethical practices, and personalised service that creates lasting value for every client.",
  vision:
    "To become Mumbai's most trusted and respected real estate consultancy, recognized for integrity, innovation and exceptional client experiences.",
  promise:
    "We promise honest advice, transparent communication, expert guidance, and unwavering commitment to helping our clients find the right property for their needs and aspirations.",
  positioning:
    "A premium real estate consultancy combining market expertise, ethical practices and personalized advisory services to help clients invest with confidence.",
  values: [
    "Trust",
    "Integrity",
    "Transparency",
    "Professionalism",
    "Excellence",
    "Customer First",
    "Long-Term Relationships",
    "Innovation",
  ],
} as const;

/**
 * Brand voice rules — from the brand sheet's "Brand Voice" / "Voice Examples".
 * Kept in code so copy written later can be checked against them, and so the
 * "Don't Say" list is visible to anyone adding marketing copy.
 */
export const brandVoice = {
  principles: [
    "Confident but approachable",
    "Helpful, honest & transparent",
    "Professional & knowledgeable",
    "Warm, respectful & positive",
    "We speak with clarity and purpose",
    "We empower decisions, not just transactions",
  ],
  tone: [
    "Trustworthy",
    "Professional",
    "Friendly",
    "Informative",
    "Positive",
    "Reliable",
  ],
  doSay: [
    "Helping you make confident real estate decisions.",
    "We guide, you decide.",
    "Transparent advice for a better tomorrow.",
  ],
  dontSay: [
    "Best deals guaranteed!",
    "Hurry! Limited time offer!",
    "We are the number one!",
  ],
} as const;

/** SEO keywords from the source data sheet. */
export const seoKeywords = [
  "Real Estate Consultant Mumbai",
  "Property Consultant Mumbai",
  "Buy Property Mumbai",
  "Sell Property Mumbai",
  "Luxury Homes Mumbai",
  "Commercial Property Mumbai",
  "Dream Home Properties Mumbai",
] as const;

/** Builds a WhatsApp deep link with a pre-filled, context-aware message. */
export function whatsappLink(message?: string): string {
  const text =
    message ??
    `Hi ${siteConfig.name}, I'd like to speak to someone about a property.`;
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

export type Service = (typeof services)[number];
export type PracticeArea = (typeof practiceAreas)[number];
