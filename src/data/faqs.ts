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
      "We work across the western suburbs — primarily Borivali, Kandivali, Malad, Goregaon and Andheri. That focus is deliberate. Knowing five suburbs street by street is more useful to you than claiming to know all of Mumbai.",
    category: "General",
  },
  {
    id: "faq-002",
    question: "Do you charge buyers a fee?",
    answer:
      "Brokerage is discussed openly before you engage us, and it is confirmed in writing. You will know exactly what you are paying and what it covers before any money changes hands. If a fee structure is ever unclear to you, that is our failure, not yours.",
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
      "A title search traces ownership back over a period of years to confirm the seller can legally sell, and that the property carries no undisclosed mortgage, litigation or encumbrance. For society flats you also want the share certificate, the society's no-objection certificate, and confirmation that maintenance dues are clear. We coordinate this with a solicitor as standard — it is not an optional extra.",
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
];

export const faqCategories = Array.from(new Set(faqs.map((f) => f.category)));

export function getFaqsByCategory(category: string): Faq[] {
  return faqs.filter((f) => f.category === category);
}
