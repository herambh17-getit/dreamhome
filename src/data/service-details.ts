/**
 * Long-form content for individual service pages.
 *
 * Keyed by service slug. A slug with no entry still renders — it just shows
 * the summary from site-config — so adding a service never breaks the page.
 *
 * `faqCategory` links a service to its slice of the FAQ list, which also
 * emits FAQPage schema on that page.
 */

export interface ServiceDetail {
  body: string[];
  steps?: { title: string; body: string }[];
  includes?: string[];
  faqCategory?: string;
}

export const serviceDetails: Record<string, ServiceDetail> = {
  "property-buying": {
    faqCategory: "Buying",
    body: [
      "Most buyers come to us having already seen twenty listings and feeling less certain than when they started. That is normal. The problem is rarely a lack of options — it is that nobody has helped you work out which trade-offs you are actually willing to make.",
      "So we start there, before we show you anything. Budget is the easy part. The harder questions are how long the commute can realistically be before it wears you down, whether you need the third bedroom now or in four years, and what happens to this decision if your circumstances change.",
    ],
    steps: [
      {
        title: "We work out what you actually need",
        body: "A proper conversation about budget, commute, family, timeline and how long you plan to stay. Not a form.",
      },
      {
        title: "We shortlist honestly",
        body: "Everything relevant, including options where we earn nothing. If a listing has a real drawback, we tell you before you drive across the city to see it.",
      },
      {
        title: "We view together",
        body: "We point out what a floor plan hides — light, noise, ventilation, society health, what that wall behind the 'park-facing' window really is.",
      },
      {
        title: "We verify before you commit",
        body: "Title search, approvals, occupation certificate, RERA registration, society dues. If it does not check out, we say so — even when it costs us the deal.",
      },
      {
        title: "We negotiate and close",
        body: "Price, terms, agreement, stamp duty, registration and handover, coordinated end to end.",
      },
    ],
    includes: [
      "Needs assessment and realistic budgeting",
      "Curated shortlist across our service areas",
      "Accompanied viewings",
      "Title and approval verification via a solicitor",
      "RERA registration number, for you to check yourself",
      "Price and terms negotiation",
      "Home loan introductions",
      "Agreement, stamp duty and registration support",
    ],
  },

  "property-selling": {
    faqCategory: "Selling",
    body: [
      "Selling well is mostly about pricing honestly and presenting properly. Everything else is logistics.",
      "We price from registered transactions in your building and comparable societies nearby — not from asking prices, and not from what a neighbour claims they got. Then we adjust for your specific flat and your actual timeline, and we tell you the number the market will pay. Sometimes that is more than you hoped. Often it is less.",
    ],
    steps: [
      {
        title: "Valuation from real data",
        body: "Recent registered transactions, adjusted for floor, view, condition, layout efficiency and society health.",
      },
      {
        title: "Presentation",
        body: "Professional photographs, an accurate carpet-area listing, and honest copy. Overselling produces viewings that waste your Saturday.",
      },
      {
        title: "Qualified buyers only",
        body: "We screen for financing and intent before anyone walks through your home.",
      },
      {
        title: "Negotiation and close",
        body: "We handle offers, terms, paperwork, society NOC and registration.",
      },
    ],
    includes: [
      "Written valuation grounded in registered comparables",
      "Professional listing photography",
      "Buyer screening and qualification",
      "Accompanied viewings",
      "Offer negotiation",
      "Society NOC and transfer coordination",
      "Agreement and registration support",
    ],
  },

  renting: {
    faqCategory: "Renting",
    body: [
      "Renting goes wrong in predictable ways: the agreement was never registered, the tenant was never verified, or the society objected after everyone had shaken hands.",
      "We handle the whole process for both sides so none of that happens. For landlords, that means finding tenants who pay and stay. For tenants, it means listings that actually exist at the price advertised.",
    ],
    steps: [
      {
        title: "Match properly",
        body: "Verified listings for tenants; screened tenants for landlords.",
      },
      {
        title: "Agree terms",
        body: "Rent, deposit, lock-in, notice, escalation and who fixes what — settled in writing before anyone commits.",
      },
      {
        title: "Register the agreement",
        body: "Leave-and-licence registration is mandatory in Maharashtra. An unregistered agreement protects you very little if things go wrong.",
      },
      {
        title: "Society and handover",
        body: "NOC, police verification, and a documented inventory at handover.",
      },
    ],
    includes: [
      "Verified listings and tenant screening",
      "Terms negotiation",
      "Leave-and-licence agreement drafting",
      "Mandatory registration",
      "Police verification coordination",
      "Society NOC",
      "Handover inventory",
    ],
  },

  "property-consultation": {
    body: [
      "Sometimes you do not need an agent. You need someone with no stake in the outcome to look at what is in front of you and tell you what they honestly think.",
      "Bring us a shortlist you assembled yourself, a builder's offer, a redevelopment proposal, or just a question you cannot get a straight answer to. We will give you ours — including when the answer is that you should wait, or walk away entirely.",
    ],
    includes: [
      "Second opinion on a shortlist you built yourself",
      "Review of a developer or builder offer",
      "Redevelopment proposal assessment",
      "Locality and pricing reality-check",
      "Documentation review",
      "Straight answers, including inconvenient ones",
    ],
  },

  "society-redevelopment": {
    faqCategory: "Redevelopment",
    body: [
      "Redevelopment can transform an ageing society — or stall for years in litigation with every member already out of their home. The difference is almost always decided before anyone signs.",
      "We help societies evaluate developers on their delivery record rather than their brochure, understand the development agreement in plain language, and reach a decision members can genuinely live with. We are not tied to any developer, and we will tell you if a proposal is bad for you.",
    ],
    steps: [
      {
        title: "Feasibility",
        body: "What your plot and its permissions actually support — before expectations get set.",
      },
      {
        title: "Developer evaluation",
        body: "Completed projects, not started ones. Whether possession landed on the agreed date. Whether rent was paid on time, every month.",
      },
      {
        title: "Terms in plain language",
        body: "Area, corpus, rent, timelines — and critically, what security sits behind each promise.",
      },
      {
        title: "Member consensus",
        body: "The slow work of bringing members along. It is faster than the litigation that follows a decision forced through.",
      },
    ],
    includes: [
      "Feasibility assessment",
      "Developer shortlisting and due diligence",
      "Reference conversations with delivered societies",
      "Development agreement review with a specialist solicitor",
      "Member education sessions",
      "Negotiation support",
    ],
  },

  "nri-services": {
    faqCategory: "NRI Services",
    body: [
      "The rules for NRI buyers are workable. The risk is not regulatory — it is that you cannot stand in the flat and notice that the 'park-facing' bedroom faces a wall.",
      "We are your eyes on the ground. We view properly, photograph honestly, video-call you from the site, verify the paperwork, and coordinate with your CA on the tax and repatriation side before you commit rather than after.",
    ],
    includes: [
      "Property search and honest video walkthroughs",
      "Title and approval verification",
      "Guidance on NRE / NRO / FCNR funding routes",
      "Power of attorney coordination",
      "Registration handled in your absence",
      "Coordination with your CA on tax and repatriation",
      "Ongoing property management after purchase",
    ],
  },

  "legal-documentation": {
    faqCategory: "Legal & Documentation",
    body: [
      "Paperwork is where property deals quietly go wrong, usually months after everyone has celebrated.",
      "We coordinate title searches, agreements, stamp duty, registration and society transfers with solicitors who do this every day — so the thing you own is actually, verifiably yours.",
    ],
    includes: [
      "Title search and written legal opinion",
      "Approval and occupation certificate checks",
      "MahaRERA verification",
      "Agreement drafting and review",
      "Stamp duty calculation and payment",
      "Registration",
      "Society transfer and share certificate",
    ],
  },

  "investment-advisory": {
    body: [
      "Property investment advice in Mumbai is mostly conviction dressed as analysis. We prefer to show our working.",
      "Yield, appreciation, holding costs, exit liquidity and the honest downside — laid out so you can decide. Sometimes our advice is that this particular asset is not worth buying, and occasionally that property is not the right vehicle for what you are trying to achieve at all.",
    ],
    includes: [
      "Rental yield analysis grounded in local comparables",
      "Appreciation drivers and risks, stated plainly",
      "Total holding cost modelling",
      "Exit liquidity assessment",
      "Portfolio review",
      "A clear recommendation, including 'not this one'",
    ],
  },

  "property-management": {
    body: [
      "Owning a property you do not live in is a small ongoing job. If you are abroad or simply busy, it is a job that quietly does not get done.",
      "We take it on: tenant sourcing and screening, rent collection, maintenance, society compliance, and renewals — with a single point of contact who actually answers.",
    ],
    includes: [
      "Tenant sourcing and screening",
      "Rent collection and follow-up",
      "Maintenance coordination",
      "Society liaison and compliance",
      "Periodic inspections with photographs",
      "Renewal and re-letting",
    ],
  },

  "project-marketing": {
    body: [
      "We work with developers across the western suburbs as a channel partner, bringing qualified buyers to launches and inventory.",
      "We are selective about what we represent, for a straightforward commercial reason: our clients trust our recommendations because we do not recommend everything. That trust is the entire asset, and one bad project spends it.",
    ],
    includes: [
      "Channel partnership for launches and inventory",
      "Qualified buyer introductions",
      "Site visit coordination",
      "Market and pricing feedback",
      "Transaction support through to registration",
    ],
  },

  "buying-selling": {
    body: [
      "End-to-end transaction management, whichever side of the table you are on.",
      "From first viewing to registered agreement, with one point of contact and no gaps between the people handling each stage.",
    ],
    includes: [
      "Search or listing, depending on your side",
      "Viewings and buyer or seller qualification",
      "Negotiation",
      "Legal verification",
      "Stamp duty and registration",
      "Handover",
    ],
  },

  "real-estate-consultancy": {
    body: [
      "The full advisory relationship: buying, selling, leasing and investment, across residential and commercial property in Mumbai's western suburbs.",
      "Most of our clients start with one transaction and stay for the next one. That is the business model — we would rather be useful to you for twenty years than extract everything from one deal.",
    ],
    includes: [
      "Residential and commercial advisory",
      "Buying, selling and leasing",
      "Investment analysis",
      "Legal and documentation coordination",
      "Long-term portfolio guidance",
    ],
  },
};
