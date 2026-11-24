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
        title: "Property Due Diligence Support",
        body: "Independent property solicitors conduct the title search and review the legal documents. We coordinate the process: we help you collect the approvals, occupation certificate, society dues statement and the project's MahaRERA details for you to check yourself — and if something does not add up, we say so, even when it costs us the deal.",
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
      "Title search and legal opinion by an independent property solicitor, coordinated by us",
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
      "We handle the whole process for both sides to reduce those risks. For landlords, that means screening tenants before you commit. For tenants, it means listings shared by property owners, with the rent and terms confirmed in writing before anyone commits.",
    ],
    steps: [
      {
        title: "Match properly",
        body: "Listings shared by property owners for tenants; screened tenants for landlords.",
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
      "Listings shared by property owners, and tenant screening",
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
      "A property consultation is a one-off second opinion on a single decision. Sometimes you do not need an agent. You need someone to look at what is in front of you and tell you what they honestly think.",
      "Bring us a shortlist you assembled yourself, a builder's offer, a redevelopment proposal, or just a question you cannot get a straight answer to. We will give you ours — including when the answer is that you should wait, or walk away entirely.",
      "A consultation covers the commercial and practical side of the decision: whether the price is fair, whether the locality and building suit how you live, what the terms really commit you to, and where the risks sit. It is separate from a formal legal opinion, which comes from an independent property solicitor, and we coordinate that when you need one.",
    ],
    steps: [
      {
        title: "Tell us what you are deciding",
        body: "A shortlist, an offer, a proposal or a plain question, along with your budget, timeline and what matters most.",
      },
      {
        title: "Share what you have",
        body: "Offer letters, draft agreements, brochures, society notices. The more we can see, the more specific the advice.",
      },
      {
        title: "We say what we would do",
        body: "A direct opinion with reasons, including the parts you may not want to hear.",
      },
      {
        title: "You decide",
        body: "The choice stays yours. If you want help carrying it out, we can take it from there, but there is no obligation.",
      },
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

  "leave-and-licence-registration": {
    faqCategory: "Renting",
    body: [
      "In Maharashtra, a leave and licence agreement has to be registered. An unregistered agreement protects a landlord or a tenant very little if the arrangement goes wrong.",
      "We offer onsite leave and licence registration in Borivali East. Call or WhatsApp us with the property and the details of the landlord and the tenant, and we will tell you what is needed and arrange the registration with you.",
      "Registration is the last step of a longer process: agreeing the rent, deposit, lock-in and notice terms in writing, drafting the agreement, and, where required, police verification of the tenant and the society's no-objection certificate. We can handle those steps too, as part of our renting service.",
    ],
    steps: [
      {
        title: "Tell us about the tenancy",
        body: "The property address, the names of the landlord and the tenant, and the rent, deposit and period you have agreed.",
      },
      {
        title: "We confirm what is needed",
        body: "The documents each side has to provide, and whether the society needs to give a no-objection certificate.",
      },
      {
        title: "The agreement is drafted and checked",
        body: "Rent, deposit, lock-in, notice and who fixes what, written clearly before anyone signs.",
      },
      {
        title: "Registration, onsite",
        body: "We carry out the registration onsite, as arranged with you.",
      },
      {
        title: "Police verification and handover",
        body: "We coordinate police verification of the tenant and the society's no-objection certificate where required, and a documented inventory at handover.",
      },
    ],
    includes: [
      "Onsite leave and licence registration",
      "Leave-and-licence agreement drafting",
      "Mandatory registration of the agreement",
      "Police verification coordination",
      "Society NOC",
      "Handover inventory",
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
      "We are your eyes on the ground. We view properly, photograph honestly, video-call you from the site, help gather the paperwork for an independent property solicitor to review, and coordinate with your CA on the tax and repatriation side before you commit rather than after.",
    ],
    includes: [
      "Property search and honest video walkthroughs",
      "Title search and legal opinion by independent property solicitors, coordinated by us",
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
      "The legal work is done by independent property solicitors: they conduct the title search, review the documents and give you a written legal opinion. Our role is coordination — we collect the documents they need, keep the solicitor, the other side and the society moving, and handle the practical steps of stamp duty, registration and society transfer. We do not give legal opinions ourselves.",
    ],
    includes: [
      "Title search and written legal opinion — by independent property solicitors",
      "Agreement drafting and review — by independent property solicitors",
      "Collecting approval and occupation certificate documents — coordinated by us",
      "The project's MahaRERA registration details, for you to check on the official portal",
      "Stamp duty calculation and payment — coordinated by us",
      "Registration at the sub-registrar's office — coordinated by us",
      "Society transfer and share certificate — coordinated by us",
    ],
  },

  "investment-advisory": {
    body: [
      "Property investment advice in Mumbai is mostly conviction dressed as analysis. We prefer to show our working.",
      "Yield, appreciation, holding costs, exit liquidity and the honest downside — laid out so you can decide. Sometimes our advice is that this particular asset is not worth buying, and occasionally that property is not the right vehicle for what you are trying to achieve at all.",
      "Most investment mistakes in property come from looking at one number. A high headline rent can hide high maintenance and long vacancies. A strong locality can hide a building with a weak society. We look at the whole picture, for one specific asset at a time, because averages across a suburb tell you very little about a particular flat.",
    ],
    steps: [
      {
        title: "Define the goal",
        body: "Regular rental income, long-term capital growth, or a mix, and the time horizon you can genuinely hold for.",
      },
      {
        title: "Run the numbers on a specific asset",
        body: "Net yield after maintenance, property tax, repairs and vacant months, not the gross figure in the listing.",
      },
      {
        title: "Test the downside",
        body: "What happens with a long vacancy, a delayed possession, or a need to sell sooner than planned.",
      },
      {
        title: "Give a clear recommendation",
        body: "Buy, negotiate, wait, or walk away, with the reasoning written down so you can check it.",
      },
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
      "The point of management is not only convenience. A flat left to itself loses value in small ways: a slow leak that nobody reports, a tenant who stops paying on time, a society notice that goes unanswered. Regular attention catches these while they are still cheap to fix.",
    ],
    steps: [
      {
        title: "Take stock of the property",
        body: "We record its condition with photographs and gather the documents and keys we need, so everyone starts from the same baseline.",
      },
      {
        title: "Find and screen the tenant",
        body: "Tenant sourcing and screening, then a registered leave-and-licence agreement with police verification and society NOC where required.",
      },
      {
        title: "Run the tenancy",
        body: "Rent collection and follow-up, maintenance coordination, and liaison with the society on dues and compliance.",
      },
      {
        title: "Inspect and report",
        body: "Periodic inspections with photographs, so you can see how the property is being kept even from another country.",
      },
      {
        title: "Renew or re-let",
        body: "Renewals are handled with the existing tenant. When a tenant leaves, we find and screen the next one.",
      },
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
      "For a developer, the useful part of a channel partner is not volume. It is the feedback. We talk to buyers every day, so we can tell you what they ask about, which part of the pricing or product they push back on, and what stops them from booking. That is information a brochure and a sales office rarely produce.",
    ],
    steps: [
      {
        title: "Understand the project",
        body: "Approvals, MahaRERA registration, location, product and pricing, so we know what we would be recommending.",
      },
      {
        title: "Decide whether we represent it",
        body: "We take on only projects we would be comfortable recommending to our own clients.",
      },
      {
        title: "Introduce qualified buyers",
        body: "Buyers who fit the project and have thought about financing, not a list of names.",
      },
      {
        title: "Coordinate site visits",
        body: "We arrange visits and prepare buyers so the time at the site is spent on real questions.",
      },
      {
        title: "Support through registration and report back",
        body: "Transaction support to registration, plus honest feedback on how buyers are responding.",
      },
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
      "Our property buying and selling service is transaction management for a deal that is actually happening: one coordinator for your sale, your purchase, or both together.",
      "From first viewing to registered agreement, with one point of contact and no gaps between the people handling each stage. If you are still deciding what to do, start with a property consultation instead.",
      "It matters most when one deal depends on another. If you are selling a flat to buy a bigger one, the sale date, the buyer's payments, your own booking amount and the handover of the new home all have to line up. Someone who sees both sides of the timeline can spot a gap before it costs you a rental month or a bridging loan.",
    ],
    steps: [
      {
        title: "Agree the brief",
        body: "Whether you are buying, selling or doing both, we settle what a good outcome looks like: budget or price expectation, timeline, and the things you will not compromise on.",
      },
      {
        title: "Search or list",
        body: "Buyers get a shortlist and accompanied viewings. Sellers get a valuation from registered comparables and an accurate listing.",
      },
      {
        title: "Qualify and negotiate",
        body: "We check the other side's financing and paperwork early, then negotiate price and terms on your behalf.",
      },
      {
        title: "Verify the paperwork",
        body: "Independent property solicitors run the title search and review the documents. We coordinate them alongside every other stage so nothing waits on a missing paper.",
      },
      {
        title: "Agreement, stamp duty and registration",
        body: "We coordinate the agreement, stamp duty payment and registration at the sub-registrar's office.",
      },
      {
        title: "Handover",
        body: "Possession, society transfer and the final steps are tracked to completion, so the deal does not stall after the celebration.",
      },
    ],
    includes: [
      "Search or listing, depending on your side",
      "Viewings and buyer or seller qualification",
      "Negotiation",
      "Legal checks by independent property solicitors",
      "Stamp duty and registration",
      "Handover",
    ],
  },

  "real-estate-consultancy": {
    body: [
      "Our real estate consultancy is a long-term advisory relationship for clients who expect to transact more than once: buying, selling, leasing and investment, across residential and commercial property in Mumbai's western suburbs. For a single decision or a one-off second opinion, a property consultation is the better fit.",
      "Most of our clients start with one transaction and stay for the next one. That is the business model — we would rather be useful to you for twenty years than extract everything from one deal.",
      "It suits families with a home and an investment flat, investors building a portfolio, businesses that own or lease premises, and owners facing a large decision such as a society redevelopment. What they share is that the decisions connect: the right time to sell one property depends on what you plan to do with the next.",
    ],
    steps: [
      {
        title: "Understand your position",
        body: "What you own, what you owe, what you plan to do, and the constraints that are not negotiable, across residential and commercial property.",
      },
      {
        title: "Set a direction",
        body: "A plain view on whether to buy, sell, lease or hold over the next few years, and why.",
      },
      {
        title: "Act when it makes sense",
        body: "When a transaction is right, we support it through to registration, coordinating independent solicitors for the legal side.",
      },
      {
        title: "Revisit as things change",
        body: "A new job, a growing family, a redevelopment notice: when circumstances shift, the plan gets updated rather than abandoned.",
      },
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
