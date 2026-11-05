/**
 * Locality guide content: answer-first summaries, neighbourhoods and FAQs
 * for the /locations/[slug] pages.
 *
 * Kept separate from `locations.ts` (the card/listing data, which can come
 * from Supabase) so the editorial content survives whichever source the
 * listing data uses — the same pattern as `service-details.ts`.
 *
 * Rules for anything added here, because it is quoted by search engines and
 * AI assistants:
 *  - Publicly verifiable facts only: neighbourhood names, transport, landmarks.
 *  - No prices, yields, rents or timelines — those change and go stale. Point
 *    the reader to us for a figure on a specific property instead.
 *  - No claims about deals, clients or rankings.
 *  - Lead with the answer; explain the trade-off honestly.
 */

export interface LocationGuide {
  /** 2–3 sentence answer to "should I look at property here?" */
  summary: string;
  /** Neighbourhoods people search for by name, grouped by side of the line. */
  neighbourhoods: { side: string; places: { name: string; note: string }[] }[];
  faqs: { question: string; answer: string }[];
  /** Adjacent service areas, by slug, for "also consider" links. */
  nearby: string[];
}

export const locationGuides: Record<string, LocationGuide> = {
  borivali: {
    summary:
      "Borivali suits buyers who want space and greenery without leaving Mumbai. It has its own station on the Western Line, sits on the Western Express Highway, and has Sanjay Gandhi National Park on its eastern edge, with schools, hospitals and retail that are well established rather than promised. Both sides of the station mix older society buildings with newer redeveloped towers, so the specific building usually matters more than the address.",
    neighbourhoods: [
      {
        side: "Borivali East",
        places: [
          {
            name: "National Park side",
            note: "Closest to Sanjay Gandhi National Park, with Rashtriya Udyan Metro station nearby.",
          },
          {
            name: "Devipada & Magathane",
            note: "Along the Western Express Highway, served by Metro Line 7.",
          },
          {
            name: "Dattapada & Rajendra Nagar",
            note: "Established residential pockets between the station and the highway.",
          },
        ],
      },
      {
        side: "Borivali West",
        places: [
          {
            name: "IC Colony",
            note: "A long-established, quieter residential neighbourhood.",
          },
          {
            name: "Shimpoli & Chikuwadi",
            note: "Near Link Road and Metro Line 2A.",
          },
          {
            name: "Gorai",
            note: "Towards Gorai creek and the beaches; more spread out.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Is Borivali East or Borivali West better to buy in?",
        answer:
          "It depends on what you value. Borivali East is closer to Sanjay Gandhi National Park, the Western Express Highway and Metro Line 7, and has seen a lot of redevelopment. Borivali West is closer to Link Road, Metro Line 2A and the Gorai side. Both have a mix of older society buildings and newer towers, so the condition, paperwork and floor of the specific flat usually matter more than which side of the station it is on.",
      },
      {
        question: "Which Metro lines serve Borivali?",
        answer:
          "Metro Line 7 runs along the Western Express Highway on the east side, with stations including Rashtriya Udyan, Devipada and Magathane. Metro Line 2A runs along Link Road on the west side, with stations including Eksar and Borivali West. Borivali railway station is on the Western Line.",
      },
      {
        question: "Is Borivali good for families?",
        answer:
          "Many families choose Borivali for its green surroundings, established schools and hospitals, and the national park on its doorstep. The trade-off is a longer commute to South Mumbai and BKC than from Andheri or Goregaon, so it suits households whose work is in the western suburbs or who can travel off-peak.",
      },
      {
        question: "What should I check before buying a redeveloped flat in Borivali?",
        answer:
          "For a redeveloped building, confirm the occupation certificate (OC) has been issued, check the project's MahaRERA registration yourself on the MahaRERA portal, and ask how the society handled the redevelopment agreement. For a resale flat, add a title search, the share certificate, a society NOC for the transfer, and confirmation that maintenance dues are clear.",
      },
    ],
    nearby: ["kandivali"],
  },

  kandivali: {
    summary:
      "Kandivali gives better value per square foot than Borivali or Malad while keeping good connectivity. Kandivali East includes planned pockets such as Thakur Village and Lokhandwala Township; Kandivali West includes Charkop and Mahavir Nagar. Metro Lines 7 and 2A have shortened commutes towards Malad, Goregaon and Andheri.",
    neighbourhoods: [
      {
        side: "Kandivali East",
        places: [
          {
            name: "Thakur Village",
            note: "A planned township with wide internal roads, mature trees and everyday retail.",
          },
          {
            name: "Lokhandwala Township",
            note: "Off Akurli Road, with a mix of older buildings and newer towers.",
          },
          {
            name: "Samta Nagar & Akurli Road",
            note: "Close to the Western Express Highway and Metro Line 7 (Poisar and Akurli stations).",
          },
        ],
      },
      {
        side: "Kandivali West",
        places: [
          {
            name: "Charkop",
            note: "Large residential sector with many housing societies.",
          },
          {
            name: "Mahavir Nagar",
            note: "Busy, well-served neighbourhood with strong main-road retail.",
          },
          {
            name: "Dahanukarwadi",
            note: "Along Link Road, served by Metro Line 2A.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "What are the main residential areas in Kandivali?",
        answer:
          "In Kandivali East, Thakur Village and Lokhandwala Township are planned pockets, with Samta Nagar and the Akurli Road belt near the Western Express Highway. In Kandivali West, Charkop, Mahavir Nagar and Dahanukarwadi are the main residential areas. Each has a different character and price point, so it is worth visiting more than one before deciding.",
      },
      {
        question: "Which Metro lines serve Kandivali?",
        answer:
          "Metro Line 7 serves Kandivali East along the Western Express Highway, with stations at Poisar and Akurli. Metro Line 2A serves Kandivali West along Link Road, with stations including Kandivali West and Dahanukarwadi. Kandivali railway station is on the Western Line.",
      },
      {
        question: "Is Kandivali a good place to buy a flat to rent out?",
        answer:
          "Kandivali has steady rental demand from working professionals who commute to Malad, Goregaon and Andheri, helped by the Metro. Whether a particular flat makes sense as an investment depends on the purchase price, the building's condition and the rent it can realistically command. We work those numbers out for a specific flat before recommending it.",
      },
      {
        question: "Is Thakur Village a good place to live?",
        answer:
          "Thakur Village is one of the better-planned pockets in the western suburbs, with wide internal roads, mature trees, schools and everyday shopping within walking distance. Buildings vary a lot in age and upkeep, so the specific society's maintenance and paperwork deserve as much attention as the location.",
      },
    ],
    nearby: ["borivali", "malad"],
  },

  malad: {
    summary:
      "Malad suits people who want to live close to work. Malad West has the Mindspace business district, Infiniti and Inorbit malls, and access to Link Road and the beaches at Aksa and Marve; Malad East is closer to the Western Express Highway and Metro Line 7. Demand from people working in Mindspace and Goregaon keeps rental interest steady.",
    neighbourhoods: [
      {
        side: "Malad West",
        places: [
          {
            name: "Mindspace & Chincholi Bunder",
            note: "Around the Mindspace business district, Infiniti and Inorbit malls.",
          },
          {
            name: "Orlem & Marve Road",
            note: "Established residential area heading towards Marve and Aksa beaches.",
          },
          {
            name: "Link Road belt",
            note: "Along New Link Road, served by Metro Line 2A (Malad West, Valnai and Lower Malad stations).",
          },
        ],
      },
      {
        side: "Malad East",
        places: [
          {
            name: "Kurar",
            note: "Near the Western Express Highway, with Kurar Metro station on Line 7.",
          },
          {
            name: "Dindoshi",
            note: "Residential and commercial mix near the highway, with Dindoshi Metro station.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Is Malad West or Malad East better to live in?",
        answer:
          "Malad West is the choice if you work in Mindspace or want malls, restaurants and the beaches nearby; it is busier and generally pricier. Malad East is closer to the Western Express Highway and Metro Line 7, which suits anyone commuting along the highway towards Goregaon or Andheri East.",
      },
      {
        question: "Which Metro lines serve Malad?",
        answer:
          "Metro Line 2A runs along Link Road through Malad West, with stations including Valnai, Malad West and Lower Malad. Metro Line 7 runs along the Western Express Highway through Malad East, with stations at Kurar and Dindoshi. Malad railway station is on the Western Line.",
      },
      {
        question: "Is Malad good for a rental investment?",
        answer:
          "Rental demand in Malad, particularly near Mindspace, comes from people who want to walk or take a short ride to work, and that has kept interest steady. Whether a specific flat is a good investment still depends on what you pay for it, the building's condition and the rent it can realistically achieve, so we run those numbers on the actual property.",
      },
      {
        question: "Which beaches are near Malad?",
        answer:
          "Aksa, Marve and Madh are within reach to the west of Malad West, along the Marve Road side. They are a weekend draw rather than something to plan a commute around.",
      },
    ],
    nearby: ["kandivali", "goregaon"],
  },

  goregaon: {
    summary:
      "Goregaon sits at the centre of the western corridor, between the northern suburbs and the Andheri–BKC employment belt. Goregaon East has Nesco and the Bombay Exhibition Centre, Oberoi Garden City and Film City nearby; Goregaon West has established residential neighbourhoods such as Bangur Nagar and Motilal Nagar. That central position is the main reason prices have held up.",
    neighbourhoods: [
      {
        side: "Goregaon East",
        places: [
          {
            name: "Oberoi Garden City",
            note: "A large integrated township with offices, retail and residential towers.",
          },
          {
            name: "Nesco & Western Express Highway",
            note: "Around Nesco and the Bombay Exhibition Centre commercial hub.",
          },
          {
            name: "Aarey & Film City side",
            note: "Greener and quieter, towards Aarey and Film City; Aarey Metro station is on Line 7.",
          },
        ],
      },
      {
        side: "Goregaon West",
        places: [
          {
            name: "Bangur Nagar",
            note: "A well-established residential neighbourhood off Link Road.",
          },
          {
            name: "Motilal Nagar",
            note: "Large, long-established residential area with ongoing redevelopment interest.",
          },
          {
            name: "Jawahar Nagar & SV Road",
            note: "Close to Goregaon station and the SV Road market belt.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "What is Goregaon East known for?",
        answer:
          "Goregaon East is home to Nesco and the Bombay Exhibition Centre, the Oberoi Garden City township, and Film City further inland next to Aarey. It combines a strong office and exhibition base with large residential developments.",
      },
      {
        question: "Which Metro lines serve Goregaon?",
        answer:
          "Metro Line 7 runs along the Western Express Highway through Goregaon East, with stations including Aarey and Goregaon East. Metro Line 2A runs along Link Road through Goregaon West, with stations including Goregaon West. Goregaon railway station is on the Western Line and is also connected to the Harbour Line.",
      },
      {
        question: "Is Goregaon East or Goregaon West better?",
        answer:
          "Goregaon East suits buyers who want newer towers, townships and a short trip to offices at Nesco or along the highway. Goregaon West suits buyers who prefer older, established neighbourhoods close to the station and SV Road. Both have good Metro access, so the choice usually comes down to building type and budget.",
      },
      {
        question: "Why is Goregaon considered a good long-term location?",
        answer:
          "Its position: Goregaon is between the northern suburbs and the Andheri–BKC employment belt, with the Western Line, Harbour Line connection, two Metro lines and the Western Express Highway all running through it. Central, well-connected locations tend to hold demand, though any individual property still has to be judged on its own merits.",
      },
    ],
    nearby: ["malad", "andheri"],
  },

  andheri: {
    summary:
      "Andheri gives you the most access of any western suburb: the international airport, SEEPZ and MIDC, a Metro interchange, and the shortest trip to BKC of the areas we cover. In return it is the most expensive and most congested of them. Andheri West covers Lokhandwala, Versova and Four Bungalows; Andheri East covers Marol, Chakala, SEEPZ and MIDC.",
    neighbourhoods: [
      {
        side: "Andheri West",
        places: [
          {
            name: "Lokhandwala",
            note: "Busy, popular residential and retail neighbourhood.",
          },
          {
            name: "Versova & Seven Bungalows",
            note: "Towards the sea, at the western end of Metro Line 1.",
          },
          {
            name: "Four Bungalows & DN Nagar",
            note: "Well connected, with DN Nagar on Metro Lines 1 and 2A.",
          },
        ],
      },
      {
        side: "Andheri East",
        places: [
          {
            name: "Marol",
            note: "Residential and commercial mix close to the airport and Metro Line 1.",
          },
          {
            name: "Chakala & MIDC",
            note: "A major office and industrial belt near the airport.",
          },
          {
            name: "SEEPZ",
            note: "Export processing zone and employment hub.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Andheri East or Andheri West — which is better to buy in?",
        answer:
          "Andheri West is mainly residential and lifestyle-led, with Lokhandwala, Versova and Four Bungalows. Andheri East is more commercial, with the airport, SEEPZ, MIDC and Chakala, which makes it practical if you work there. West usually costs more for a comparable flat; East can be the better buy for a short commute.",
      },
      {
        question: "Which Metro lines serve Andheri?",
        answer:
          "Metro Line 1 (Versova–Andheri–Ghatkopar) runs east–west through Andheri. Metro Line 2A ends at DN Nagar in Andheri West, and Metro Line 7 ends at Gundavali in Andheri East, both linking up with Line 1. Andheri railway station is on the Western Line and the Harbour Line.",
      },
      {
        question: "Is Andheri a good place for commercial property?",
        answer:
          "Andheri has the deepest office market in the western suburbs, centred on SEEPZ, MIDC and Chakala in Andheri East, close to the airport and Metro Line 1. That depth helps both leasing and resale, but rent, vacancy and building quality vary widely, so each office needs checking individually.",
      },
      {
        question: "Why is Andheri more expensive than the northern suburbs?",
        answer:
          "Access. Andheri is the closest of our service areas to BKC and the airport, has the largest employment base in the western suburbs, and is a Metro interchange. That convenience is priced in; the trade-off is higher prices and more congestion than Goregaon, Malad, Kandivali or Borivali.",
      },
    ],
    nearby: ["goregaon"],
  },
};
