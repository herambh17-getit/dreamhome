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
      "We help you buy property in Mumbai's western suburbs starting from what you need, not from our inventory: an honest shortlist, accompanied viewings, title, approval and RERA checks, then negotiation and paperwork through to registration.",
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
      "We match tenants and landlords properly — verified listings, screened tenants, and the paperwork handled end to end, including a registered leave-and-licence agreement, society NOC and police verification.",
    faqs: [
      {
        question: "Does a rent agreement in Mumbai have to be registered?",
        answer:
          "Yes. In Maharashtra a leave-and-licence agreement has to be registered, and it can be done online. An unregistered agreement gives both landlord and tenant very little protection if things go wrong, so we draft and register it as part of every rental.",
      },
      {
        question: "Do you help tenants as well as landlords?",
        answer:
          "Yes. For tenants we show listings that actually exist at the price advertised; for landlords we find and screen tenants. Either way, the terms are agreed in writing before anyone commits.",
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
          "We review the commercial terms and flag anything that looks wrong. Where you need a formal legal opinion, we coordinate it with a solicitor.",
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
      "We help NRIs buy, sell and manage Mumbai property from abroad: honest video walkthroughs, paperwork verification, power-of-attorney coordination, registration in your absence, and coordination with your CA on tax and repatriation.",
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
      "We coordinate the legal side of a property deal — title search and legal opinion, approval and occupation certificate checks, MahaRERA verification, agreements, stamp duty, registration and society transfer — with solicitors who do this work every day.",
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
    ],
  },

  "buying-selling": {
    summary:
      "End-to-end transaction management for buyers and sellers, from the first viewing or listing to the registered agreement and handover, with one point of contact throughout.",
    faqs: [
      {
        question: "What does end-to-end transaction management include?",
        answer:
          "Search or listing, viewings, qualifying the other side, negotiation, legal verification, the agreement, stamp duty, registration and handover — with the same person coordinating every stage.",
      },
      {
        question: "Who handles the legal checks?",
        answer:
          "Solicitors who do property work every day carry out the title search and legal opinion; we coordinate them alongside the rest of the transaction so nothing falls between stages.",
      },
      {
        question: "Can you handle a sale and a purchase together?",
        answer:
          "Yes. Coordinating both lets the dates, payments and handovers line up, so you avoid a gap or an overlap between homes.",
      },
    ],
  },

  "real-estate-consultancy": {
    summary:
      "A long-term advisory relationship covering buying, selling, leasing and investment, for residential and commercial property across Mumbai's western suburbs.",
    faqs: [
      {
        question: "What is the difference between a property consultant and a broker?",
        answer:
          "A broker is paid to close the transaction in front of them. A consultant's job is to give you the right answer — which is sometimes to wait, negotiate harder, or walk away. That is how we work.",
      },
      {
        question: "Do I still need a consultant if I've already found a property?",
        answer:
          "It often helps most at that point: verifying the title and approvals, checking the price against real transactions, negotiating terms and handling the paperwork.",
      },
      {
        question: "Do you advise on residential and commercial property?",
        answer:
          "Yes — flats, homes, offices and shops, for buying, selling, leasing and investment.",
      },
    ],
  },
};
