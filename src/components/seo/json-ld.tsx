import { siteConfig } from "@/lib/site-config";
import type { BlogPost, Faq, Property } from "@/lib/types";
import { formatArea } from "@/lib/format";

/**
 * JSON-LD structured data.
 *
 * Every claim emitted here must be true — schema markup is machine-read by
 * search engines and misstating it (inventing reviews, faking availability)
 * is both a policy violation and a manual-action risk. The aggregate rating
 * below is the real one from the client's data sheet.
 */

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Content is built from our own typed objects, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** RealEstateAgent + LocalBusiness. Rendered once, in the root layout. */
export function OrganizationJsonLd() {
  const { contact, google } = siteConfig;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        telephone: contact.phone,
        email: contact.email,
        slogan: siteConfig.tagline,
        image: `${siteConfig.url}/images/brand/logo.svg`,
        logo: `${siteConfig.url}/images/brand/logo.svg`,
        priceRange: "₹₹₹",
        address: {
          "@type": "PostalAddress",
          streetAddress: `${contact.address.street}, ${contact.address.locality}`,
          addressLocality: contact.address.city,
          addressRegion: contact.address.region,
          postalCode: contact.address.postalCode,
          addressCountry: contact.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: contact.geo.lat,
          longitude: contact.geo.lng,
        },
        areaServed: siteConfig.serviceAreas.map((a) => ({
          "@type": "City",
          name: a,
        })),
        founder: {
          "@type": "Person",
          name: siteConfig.founder.name,
          jobTitle: siteConfig.founder.role,
        },
        // Real figures from the client's data sheet.
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: google.rating,
          reviewCount: google.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "10:00",
          closes: "21:30",
        },
        sameAs: Object.values(siteConfig.social).filter(Boolean),
        // MahaRERA agent registration, emitted only once a real number is set.
        ...(siteConfig.rera.agentNumber
          ? {
              identifier: {
                "@type": "PropertyValue",
                propertyID: "MahaRERA Agent Registration",
                value: siteConfig.rera.agentNumber,
              },
            }
          : {}),
      }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteConfig.url}/properties?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${siteConfig.url}${item.href}`,
        })),
      }}
    />
  );
}

/**
 * A single listing.
 *
 * Deliberately omits `offers.price` for rentals and price-on-request units —
 * emitting a zero or a guess would be a false claim about a real transaction.
 */
export function PropertyJsonLd({ property }: { property: Property }) {
  const amount = property.intent === "rent" ? property.rent : property.price;
  const hasPrice = typeof amount === "number" && amount > 0;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Residence",
        name: property.title,
        description: property.description,
        url: `${siteConfig.url}/properties/${property.slug}`,
        image: property.gallery.map((g) => `${siteConfig.url}${g}`),
        address: {
          "@type": "PostalAddress",
          addressLocality: property.location,
          addressRegion: siteConfig.contact.address.region,
          addressCountry: siteConfig.contact.address.country,
        },
        floorSize: {
          "@type": "QuantitativeValue",
          value: property.carpetArea,
          unitText: "SQFT",
          name: formatArea(property.carpetArea),
        },
        numberOfRooms: property.configuration,
        ...(hasPrice && {
          offers: {
            "@type": "Offer",
            price: amount,
            priceCurrency: "INR",
            availability:
              property.status === "Sold"
                ? "https://schema.org/SoldOut"
                : "https://schema.org/InStock",
            seller: { "@id": `${siteConfig.url}/#organization` },
          },
        }),
      }}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: Faq[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }}
    />
  );
}

export function ArticleJsonLd({ post }: { post: BlogPost }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: `${siteConfig.url}${post.image}`,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: { "@type": "Person", name: post.author },
        publisher: { "@id": `${siteConfig.url}/#organization` },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${siteConfig.url}/blog/${post.slug}`,
        },
        keywords: post.tags.join(", "),
      }}
    />
  );
}
