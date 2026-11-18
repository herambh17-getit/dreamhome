/**
 * Answer-first summaries and service-specific FAQs for /services/[slug].
 *
 * These sit alongside `service-details.ts` (long-form body, steps, includes)
 * and the shared FAQ list (`faqs.ts`, shown by category). Questions here are
 * specific to one service and don't repeat the shared list.
 *
 * Same rules as the locality guides, because search engines and AI
 * assistants quote this text:
 *  - Describe only what the business already commits to elsewhere on the
 *    site (verification, RERA checks, working with solicitors…) and widely
 *    known Maharashtra property procedure.
 *  - No fees, timelines in days, statistics or guarantees.
 *  - Lead with the answer.
 */

export interface ServiceGuide {
  /** 1–2 sentences: what this service is and who it is for. */
  summary: string;
  faqs: { question: string; answer: string }[];
}

export const serviceGuides: Record<string, ServiceGuide> = {
  "property-buying": {
    summary:
      "We help you buy property in Mumbai's western suburbs starting from what you need, not from our inventory: an honest shortlist, accompanied viewings, due diligence coordinated with independent property solicitors, then negotiation and paperwork through to registration.",
    faqs: [
      {
        question: "Do you only show properties you have listed?",
        answer:
          "No. We shortlist from whatever fits your brief, including properties we earn nothing on, and we tell you about a property's drawbacks before you travel to see it.",
      },
      {
        question: "Can you help me get a home loan?",
        answer:
          "Yes. We can introduce you to lenders and help you put the paperwork together. The loan approval, interest rate and terms are decided by the lender.",
      },
      {
        question: "Should I buy in the area I rent in now?",
        answer:
          "Not automatically. Renting somewhere is a good test of the commute and the neighbourhood, but buying is a longer commitment, so we look at where your work, schooling and family will be over the years you plan to own the flat.",
      },
    ],
  },

  "property-selling": {
    summary:
      "We help you sell at a realistic price: we value your flat against actual registered transactions nearby, present it properly, bring serious buyers, and handle the negotiation, agreement and registration.",
    faqs: [
      {
        question: "What documents do I need to sell my flat?",
        answer:
          "Typically your purchase agreement and the chain of earlier agreements, the society share certificate, a society NOC for the transfer, confirmation that maintenance dues are clear, recent property tax receipts and, for newer buildings, the occupation certificate. We check what your specific flat needs before it is listed, so nothing holds up a buyer later.",
      },
      {
        question: "Should I renovate before selling?",
        answer:
          "Usually small things are worth it — repairs, painting, cleaning and fixing anything a buyer will notice in the first minute. Major renovations often don't recover their cost in the sale price. We look at your flat and tell you which, if any, are worth doing.",
      },
      {
        question: "Can I sell my flat and buy a new one at the same time?",
        answer:
          "Yes. We can manage both sides so the dates, payments and handover line up, which avoids paying for two homes or moving twice.",
      },
    ],
  },

  renting: {
    summary:
      "We match tenants and landlords properly — listings shared by property owners, screened tenants, and the paperwork handled end to end, including a registered leave-and-licence agreement, society NOC and police verification.",
    faqs: [
      {
        question: "Does a rent agreement in Mumbai have to be registered?",
        answer:
          "Yes. In Maharashtra a leave-and-licence agreement has to be registered, and it can be done online. An unregistered agreement gives both landlord and tenant very little protection if things go wrong, so we draft and register it as part of every rental.",
      },
      {
        question: "Do you help tenants as well as landlords?",
        answer:
          "Yes. For tenants we share listings from property owners and confirm the rent and terms with them; for landlords we find and screen tenants. Either way, the terms are agreed in writing before anyone commits.",
      },
      {
        question: "What should be agreed before a tenant moves in?",
        answer:
          "Rent, deposit, lock-in period, notice period, any rent escalation, and who pays for which repairs and charges — all in the registered agreement — plus a documented inventory of the flat's condition at handover.",
      },
    ],
  },

  "property-consultation": {
    summary:
      "An independent second opinion before a big property decision: bring us a shortlist, a builder's offer or a redevelopment proposal, and we tell you what we would do and why — including when the answer is to wait or walk away.",
    faqs: [
      {
        question: "When is a property consultation useful?",
        answer:
          "Before you sign a builder's offer, when you are torn between properties on a shortlist, when your society has a redevelopment proposal, or when you are unsure whether a price is fair. It is most useful before money or signatures change hands.",
      },
      {
        question: "What should I bring to a consultation?",
        answer:
          "Whatever you are deciding on — the shortlist, offer letters, draft agreements or proposals — plus your budget, timeline and what matters most to you. The more we can see, the more specific our advice can be.",
      },
      {
        question: "Can you review a builder's agreement?",
        answer:
          "We review the commercial terms and flag anything that looks wrong. Where you need a formal legal opinion, we coordinate it with an independent property solicitor.",
      },
      {
        question: "Will you tell me not to buy if that is the right answer?",
        answer:
          "Yes. A consultation is only useful if it is honest. If the price is wrong, the building has a problem, or the timing is poor, we say so and explain why, even when it means no deal for us.",
      },
      {
        question: "How is a consultation different from a legal opinion?",
        answer:
          "A consultation covers the commercial and practical side: whether the price is fair, whether the property suits you, what the terms commit you to and where the risks are. A formal legal opinion on title or documents comes from an independent property solicitor, which we coordinate when it is needed.",
      },
    ],
  },

  "society-redevelopment": {
    summary:
      "We guide housing societies through redevelopment: what the plot actually supports, developers judged on their delivery record, the development agreement in plain language, and genuine member consensus — without being tied to any developer.",
    faqs: [
      {
        question: "How should our society choose a redevelopment developer?",
        answer:
          "On completed projects, not brochures: whether earlier societies got possession on the agreed date, whether rent was paid on time for the full period, and what members of societies they have already delivered say. Speaking to those members is the single most useful check.",
      },
      {
        question: "What should a redevelopment agreement cover?",
        answer:
          "At minimum: the new carpet area per member stated clearly, the corpus and when it is paid, the rent amount and period, delay penalties, termination rights, and what security stands behind the rent and corpus promises. A solicitor who specialises in redevelopment should review it for the society.",
      },
      {
        question: "Do all members have to agree to redevelopment?",
        answer:
          "There is a formal approval process through the society's general body, and your society's legal adviser should confirm the current requirements. In practice, a decision forced through over strong objection is the most common reason projects stall, so building real consensus first saves time.",
      },
    ],
  },

  "nri-services": {
    summary:
      "We help NRIs buy, sell and manage Mumbai property from abroad: honest video walkthroughs, help gathering paperwork for independent solicitors to review, power-of-attorney coordination, registration in your absence, and coordination with your CA on tax and repatriation.",
    faqs: [
      {
        question: "Do I need to travel to India to buy property?",
        answer:
          "Not necessarily. A properly drafted power of attorney lets someone you trust complete registration on your behalf. It should be specific to the transaction and executed correctly in the country where you sign it — we coordinate that process.",
      },
      {
        question: "How do NRIs pay for property in India?",
        answer:
          "Through normal banking channels, from an NRE, NRO or FCNR account, or with a home loan from an Indian lender. Cash is not an option. Your CA should advise on which route suits your repatriation plans before you buy.",
      },
      {
        question: "Can you manage my flat after I buy it?",
        answer:
          "Yes. We can find and screen tenants, collect rent, coordinate maintenance and society matters, and send you periodic inspection photographs, so you have one point of contact on the ground.",
      },
    ],
  },

  "legal-documentation": {
    summary:
      "We coordinate the documentation side of a property deal. Independent property solicitors conduct the title search, review the agreement and give the legal opinion; we collect the documents, coordinate the solicitor and the other parties, and handle stamp duty, registration and society transfer. You can check a project's MahaRERA registration yourself on the official portal.",
    faqs: [
      {
        question: "What is a title search?",
        answer:
          "A solicitor traces the property's chain of ownership back over a period of years to confirm that the seller can legally sell it and that there is no undisclosed mortgage, dispute or claim on it. You should receive a written opinion, not just a verbal reassurance.",
      },
      {
        question: "Who pays stamp duty and registration in Mumbai?",
        answer:
          "Normally the buyer. Both are paid before the agreement is registered at the sub-registrar's office. We calculate the amounts for your specific transaction and coordinate payment and registration.",
      },
      {
        question: "What happens at registration?",
        answer:
          "The buyer and seller, or their power-of-attorney holders, sign the agreement before the sub-registrar with witnesses, and identity and biometrics are recorded. Once registered, the agreement is the legal record of the sale.",
      },
    ],
  },

  "investment-advisory": {
    summary:
      "We assess Mumbai property as an investment the way you would assess any other: rental yield, what drives appreciation, holding costs and how easily you could sell — laid out plainly, with a clear recommendation, including 'not this one'.",
    faqs: [
      {
        question: "How is rental yield calculated?",
        answer:
          "Gross yield is the annual rent divided by the purchase price. Net yield first subtracts the running costs — maintenance, property tax, repairs, vacant months and any agent fees — and is the number that actually matters. We work it out on real figures for a specific flat.",
      },
      {
        question: "What costs should I include in a property investment?",
        answer:
          "Beyond the price: stamp duty, registration, legal fees and any brokerage when you buy; maintenance, property tax, repairs, insurance, vacant periods and loan interest while you hold it; and selling costs and capital gains tax when you exit.",
      },
      {
        question: "Is property always a good investment in Mumbai?",
        answer:
          "No. Some properties are good investments and many are not, and sometimes property isn't the right vehicle for what you are trying to achieve at all. We would rather tell you that up front than sell you a flat.",
      },
      {
        question: "What is the difference between rental yield and capital appreciation?",
        answer:
          "Rental yield is the income a property earns each year relative to its price. Capital appreciation is the rise in its value over time. They often pull in different directions, so the right mix depends on whether you want income now or growth over a longer holding period.",
      },
      {
        question: "Is an under-construction or a ready property better for investment?",
        answer:
          "An under-construction property usually has a lower entry price and staged payments, but it earns no rent until possession and carries completion risk. A ready property can earn rent immediately and can be inspected before you buy. Which suits you depends on your timeline and on the developer's delivery record.",
      },
      {
        question: "Is rental income and the profit on a sale taxable?",
        answer:
          "Both are generally taxable, and the rules depend on how long you hold the property and your own circumstances. Your chartered accountant should confirm the tax treatment before you commit, and we are happy to work alongside them.",
      },
    ],
  },

  "property-management": {
    summary:
      "We manage property for owners who live abroad or simply don't have the time: tenant sourcing and screening, rent collection, maintenance, society compliance, inspections with photographs, and renewals — through one point of contact.",
    faqs: [
      {
        question: "Who is property management for?",
        answer:
          "Owners who live abroad or in another city, and owners in Mumbai who would rather not handle tenants, repairs and society matters themselves.",
      },
      {
        question: "How will I know my property is being looked after?",
        answer:
          "Through periodic inspections with photographs, rent updates, and a single point of contact who answers when you call.",
      },
      {
        question: "Do you handle renewals and new tenants?",
        answer:
          "Yes. We handle renewals with existing tenants and, when a tenant leaves, find and screen the next one, with a registered agreement each time.",
      },
      {
        question: "What happens when something needs repairing?",
        answer:
          "We coordinate the repair with a contractor and tell you what is needed and why. How repairs are approved, and up to what amount we can act without checking first, is agreed with you at the start.",
      },
      {
        question: "Can you manage a flat that is currently empty?",
        answer:
          "Yes. We can find and screen a tenant, arrange the registered leave-and-licence agreement with police verification and society NOC where required, and then manage the tenancy.",
      },
    ],
  },

  "project-marketing": {
    summary:
      "For developers: we work as a channel partner across Mumbai's western suburbs, bringing qualified buyers to launches and inventory, coordinating site visits and feeding back market and pricing insight. We are selective about which projects we represent.",
    faqs: [
      {
        question: "What does a channel partner do for a developer?",
        answer:
          "We introduce qualified buyers to the project, coordinate site visits, support the transaction through to registration, and give honest feedback on how buyers are responding to the pricing and product.",
      },
      {
        question: "Which projects do you agree to market?",
        answer:
          "Only projects we would be comfortable recommending to our own clients, and that are registered with MahaRERA where registration is required. Our clients trust our recommendations because we don't recommend everything.",
      },
      {
        question: "Do buyers who come through you deal with the developer directly?",
        answer:
          "Yes — the purchase is between the buyer and the developer. We support the buyer through the process and make sure they have checked the project's MahaRERA details themselves.",
      },
      {
        question: "What do you need from a developer before you agree to market a project?",
        answer:
          "The project's MahaRERA registration details, its approvals, clear pricing and payment terms, and access for site visits. We need to be able to check what we are recommending before we recommend it.",
      },
      {
        question: "What kind of feedback can a developer expect from you?",
        answer:
          "What buyers ask about, which parts of the pricing or product they push back on, and what stops them from booking. We talk to buyers every day, so the feedback is direct and specific to the project.",
      },
    ],
  },

  "buying-selling": {
    summary:
      "Property buying and selling, managed as one transaction: a single coordinator for your sale, purchase or both, from the first viewing or listing to the registered agreement and handover.",
    faqs: [
      {
        question: "What does the property buying and selling service include?",
        answer:
          "Search or listing, viewings, qualifying the other side, negotiation, the legal checks (carried out by independent property solicitors), the agreement, stamp duty, registration and handover — with the same person coordinating every stage.",
      },
      {
        question: "Who handles the legal checks?",
        answer:
          "Independent solicitors who do property work every day carry out the title search and give the legal opinion; we coordinate them alongside the rest of the transaction so nothing falls between stages.",
      },
      {
        question: "Can you handle a sale and a purchase together?",
        answer:
          "Yes. Coordinating both lets the dates, payments and handovers line up, so you avoid a gap or an overlap between homes.",
      },
      {
        question: "What happens if a problem turns up in the paperwork mid-deal?",
        answer:
          "The solicitor flags it, and we explain it to you in plain terms. Depending on what it is, the options are usually to get it fixed, to renegotiate the price or terms, or to walk away. We will not push you to proceed with a deal that does not add up.",
      },
      {
        question: "When should I choose transaction management instead of a consultation?",
        answer:
          "Choose transaction management when a deal is actually going ahead and you want one coordinator through to registration. Choose a property consultation when you are still deciding, or want an independent opinion on an offer or a shortlist before committing.",
      },
    ],
  },

  "real-estate-consultancy": {
    summary:
      "Real estate consultancy as a long-term advisory relationship, for clients who expect to transact more than once, covering buying, selling, leasing and investment across Mumbai's western suburbs.",
    faqs: [
      {
        question: "What is the difference between a property consultant and a broker?",
        answer:
          "A broker is paid to close the transaction in front of them. A consultant's job is to give you the right answer — which is sometimes to wait, negotiate harder, or walk away. That is how we work.",
      },
      {
        question: "Do I still need a consultant if I've already found a property?",
        answer:
          "It often helps most at that point: arranging an independent solicitor's title search, collecting the approval documents, checking the price against real transactions, negotiating terms and handling the paperwork.",
      },
      {
        question: "Do you advise on residential and commercial property?",
        answer:
          "Yes — flats, homes, offices and shops, for buying, selling, leasing and investment.",
      },
      {
        question: "How is long-term advisory different from a property consultation?",
        answer:
          "A property consultation is a one-off second opinion on a single decision. Long-term advisory is an ongoing relationship for clients who expect to buy, sell, lease or invest more than once, so the advice on one property takes account of what you plan to do with the next.",
      },
      {
        question: "Who is long-term advisory best suited to?",
        answer:
          "Families with a home and an investment flat, investors building a portfolio, businesses that own or lease premises, and owners facing a big decision such as a society redevelopment. Anyone whose property decisions are connected tends to benefit.",
      },
    ],
  },
};
