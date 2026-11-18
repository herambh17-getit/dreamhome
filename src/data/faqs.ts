import type { Faq } from "@/lib/types";

/**
 * FAQs. These feed both the /faq page and FAQPage JSON-LD, so they are
 * eligible for rich results — which makes accuracy load-bearing.
 *
 * Answers below are written to be generally correct for Maharashtra as of
 * mid-2026 and deliberately avoid quoting exact statutory rates, which
 * change with state budgets. Anything numeric and regulatory (stamp duty
 * percentages, registration caps) is described qualitatively and should be
 * confirmed with the client's legal desk before launch.
 */
export const faqs: Faq[] = [
  {
    id: "faq-001",
    question: "What areas of Mumbai does Dream Home Properties cover?",
    answer:
      "We work across Mumbai and the MMR, with our deepest expertise in north Mumbai and South Mumbai. Our base is Borivali East, where we have worked since 2005, and we know the western suburbs — Dahisar, Borivali, Kandivali, Malad, Goregaon and Andheri — street by street.",
    category: "General",
  },
  {
    id: "faq-002",
    question: "Do you charge buyers a fee?",
    answer:
      "We don't hide the brokerage. It is the standard rate on a sale and one month's rent on a rental, written into the agreement before any token is paid. You will know exactly what you are paying and what it covers before any money changes hands.",
    category: "General",
  },
  {
    id: "faq-003",
    question: "What is RERA, and why does it matter to me?",
    answer:
      "RERA is the Real Estate (Regulation and Development) Act. Projects above a certain size must register with MahaRERA, which publishes the developer's approvals, plans and committed possession dates on a public portal. It gives you a verifiable source of truth and a route to complain if commitments are broken. Always check the registration number yourself on the MahaRERA site — we will give you the number and show you where to look.",
    category: "Legal & Documentation",
  },
  {
    id: "faq-004",
    question: "How do I verify a property's title before buying?",
    answer:
      "A title search traces ownership back over a period of years to confirm the seller can legally sell, and that the property carries no undisclosed mortgage, litigation or encumbrance. For society flats you also want the share certificate, the society's no-objection certificate, and confirmation that maintenance dues are clear. The title search itself is done by an independent property solicitor; we coordinate it as standard — it is not an optional extra.",
    category: "Legal & Documentation",
  },
  {
    id: "faq-005",
    question: "What costs should I budget for beyond the property price?",
    answer:
      "Expect stamp duty and registration charges, GST if the property is under construction, brokerage, legal fees, society transfer charges, and any loan processing fees. Together these are a meaningful addition to the headline price. Rates vary by property type, buyer profile and the prevailing state budget, so we will give you a written cost sheet for your specific transaction rather than a rule of thumb.",
    category: "Buying",
  },
  {
    id: "faq-006",
    question: "Is an under-construction property cheaper than a ready one?",
    answer:
      "Usually the entry price is lower and payment is staged across construction, which helps cash flow. Against that you carry completion risk, you pay GST that ready properties do not attract, and you may be paying rent while you wait. Whether that trade is worth it depends on the developer's delivery record and your own timeline. We will give you a straight answer for the specific project, including when it is not worth it.",
    category: "Buying",
  },
  {
    id: "faq-007",
    question: "What is society redevelopment, and what should members watch for?",
    answer:
      "Redevelopment is when a society appoints a developer to demolish and rebuild, with members receiving new flats — usually larger — plus a corpus and rent during construction. The things that decide whether it goes well are the developer's track record, the terms in the development agreement, the guarantees behind the rent and corpus, and whether members are genuinely aligned before signing. Most disputes trace back to terms nobody read closely. We help societies work through exactly that.",
    category: "Redevelopment",
  },
  {
    id: "faq-008",
    question: "Can NRIs buy property in Mumbai?",
    answer:
      "Yes. NRIs and OCI cardholders can buy residential and commercial property in India; agricultural land, plantations and farmhouses are the exception. Funding must route through NRE, NRO or FCNR accounts, and there are specific rules for repatriating proceeds later. A power of attorney lets you complete a purchase without flying in. We handle the ground work and coordinate with your CA on the tax side.",
    category: "NRI Services",
  },
  {
    id: "faq-009",
    question: "How long does buying a property usually take?",
    answer:
      "From serious shortlist to registration, four to eight weeks is typical for a ready resale flat where the paperwork is clean and financing is arranged. Title complications, society approvals or a slow lender can extend that. Under-construction purchases complete faster on paper but hand over years later.",
    category: "Buying",
  },
  {
    id: "faq-010",
    question: "What documents do I need to rent out my flat?",
    answer:
      "You will need proof of ownership, a registered leave-and-licence agreement, the society's no-objection certificate where required, and police verification of the tenant. Registration of the agreement is mandatory in Maharashtra — an unregistered agreement gives you very little if the arrangement goes wrong. We handle the full process for landlords.",
    category: "Renting",
  },
  {
    id: "faq-011",
    question: "How do you value a property you are selling for me?",
    answer:
      "We start from recent registered transactions in the same building or comparable neighbouring societies, then adjust for floor, view, condition, layout efficiency and how quickly you need to sell. We will tell you what the market will actually pay, which is occasionally lower than what you hoped. Pricing to that number is what gets a sale done.",
    category: "Selling",
  },
  {
    id: "faq-012",
    question: "Do you handle commercial property?",
    answer:
      "Yes — offices, shops, showrooms and warehouses across the western suburbs, for both purchase and lease. Commercial deals turn on different things than residential ones: permitted use, footfall, lease structure, and yield. We advise on all of them.",
    category: "Commercial",
  },
  {
    id: "faq-013",
    question: "What is the difference between carpet area and super built-up area?",
    answer:
      "Carpet area is the usable floor area inside the flat's walls, the space you could actually lay a carpet on. Super built-up area adds a share of common areas such as lobbies, staircases and amenities. Under RERA, developers must sell apartments on carpet area, so compare listings on carpet area, not on the larger figure.",
    category: "Buying",
  },
  {
    id: "faq-014",
    question: "What should I look for when I visit a flat?",
    answer:
      "Visit more than once, at different times of day. Check natural light, ventilation, noise, water pressure and mobile signal. Look at the condition of the staircase, lift and compound, ask the society about maintenance charges and any arrears, and find out whether redevelopment is being discussed. A flat can look right on paper and feel wrong in person.",
    category: "Buying",
  },
  {
    id: "faq-015",
    question: "Can I get a home loan approved before I find a property?",
    answer:
      "Usually yes. Many lenders will give an in-principle approval based on your income and credit profile, which tells you what budget is realistic. The final sanction depends on the specific property, including its title and approvals. We introduce lenders, but the choice of lender is yours.",
    category: "Buying",
  },
  {
    id: "faq-016",
    question: "What is an occupation certificate and why does it matter?",
    answer:
      "An occupation certificate, or OC, is issued by the local municipal authority to confirm that a building was completed in line with its approved plans and is fit to live in. Buying in a building without one carries legal and practical risk and can complicate a home loan or the society transfer, so ask for it early and have your solicitor check it.",
    category: "Legal & Documentation",
  },
  {
    id: "faq-017",
    question: "What is the difference between an agreement for sale and a sale deed?",
    answer:
      "An agreement for sale records the terms of the purchase, including price, payment schedule and possession, and in Maharashtra it must be registered. A sale deed or conveyance is the document that transfers title. Which documents apply depends on whether the property is resale or under construction, and your solicitor will confirm the exact set for your transaction.",
    category: "Legal & Documentation",
  },
  {
    id: "faq-018",
    question: "What documents do I need to sell my flat?",
    answer:
      "Typically proof of ownership and your registered agreement, the society share certificate, the society's no-objection certificate, recent maintenance and property tax receipts showing no dues, and your identity documents. If there is a loan on the flat, you will also need your lender's papers to close it at the time of sale. We give you a checklist for your specific flat.",
    category: "Selling",
  },
  {
    id: "faq-019",
    question: "What should a tenant check before signing a leave and licence agreement?",
    answer:
      "Confirm that the person signing owns the flat, ask for the society's no-objection certificate where required, and make sure the rent, deposit, lock-in, notice period and who pays for repairs are written down. The agreement should be registered, and you should keep a signed inventory of what is in the flat on the day you move in.",
    category: "Renting",
  },
  {
    id: "faq-020",
    question: "What documents does an NRI need to buy property in India?",
    answer:
      "Typically a passport, a PAN, proof of overseas address, and details of the NRE or NRO account the funds will come from. The solicitor and the lender will confirm the exact requirements for your case, and if you are buying through a power of attorney, that document has its own formalities, which we coordinate.",
    category: "NRI Services",
  },
  {
    id: "faq-021",
    question: "What should I check before buying or leasing a shop or office?",
    answer:
      "Start with permitted use, because not every premises can legally be used for every business. Then check ownership and title, the lease terms if you are leasing, any society or building rules on signage and hours, and the practicalities of power, water and access. For an investment purchase, look at how long similar premises have stayed vacant.",
    category: "Commercial",
  },
  {
    id: "faq-022",
    question: "How do I choose between Borivali, Kandivali, Malad, Goregaon and Andheri?",
    answer:
      "Start with the commute, because that shapes daily life more than any other factor, then your budget, and then what you want around you: schools, open space, shopping, quiet. All five sit on the Western Line corridor, so the differences are in character and price. Our locality guides set out what each area offers, and we are happy to talk through your specific priorities.",
    category: "General",
  },
];

export const faqCategories = Array.from(new Set(faqs.map((f) => f.category)));

export function getFaqsByCategory(category: string): Faq[] {
  return faqs.filter((f) => f.category === category);
}
