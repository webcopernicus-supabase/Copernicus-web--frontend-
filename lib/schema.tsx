export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Copernicus",
    url: "https://copernicus.com",
    logo: "https://copernicus.com/copernicus-icon.svg",
    description:
      "Premium brand and creative agency specializing in brand strategy, identity design, advertising, events, and content production across the UAE and GCC region.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AE",
      addressLocality: "Dubai",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hello@copernicus.com",
    },
    sameAs: ["https://www.linkedin.com/company/copernicus", "https://www.instagram.com/copernicus"],
    knowsAbout: [
      "Brand Strategy",
      "Brand Identity Design",
      "Advertising Campaigns",
      "Event Management",
      "Content Production",
      "Print Production",
      "Brand Consulting",
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Copernicus - Premium Brand & Creative Agency",
    url: "https://copernicus.com",
    description:
      "Full-service brand and creative agency specializing in brand strategy, identity systems, advertising campaigns, and content production.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://copernicus.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function ServiceSchema({
  name,
  description,
  provider = "Copernicus",
  serviceType,
  areaServed = "United Arab Emirates",
}: {
  name: string
  description: string
  provider?: string
  serviceType?: string
  areaServed?: string
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: serviceType || name,
    provider: {
      "@type": "Organization",
      name: provider,
      url: "https://copernicus.com",
    },
    areaServed: {
      "@type": "Country",
      name: areaServed,
    },
    url: `https://copernicus.com/services/${name.toLowerCase().replace(/\s+/g, "-")}`,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function ArticleSchema({
  title,
  description,
  publishedDate,
  modifiedDate,
  authorName = "Copernicus",
  imageUrl,
  articleBody,
}: {
  title: string
  description: string
  publishedDate: string
  modifiedDate?: string
  authorName?: string
  imageUrl?: string
  articleBody?: string
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description,
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Copernicus",
      logo: {
        "@type": "ImageObject",
        url: "https://copernicus.com/copernicus-icon.svg",
        width: 256,
        height: 256,
      },
    },
    ...(imageUrl && {
      image: {
        "@type": "ImageObject",
        url: imageUrl,
        width: 1200,
        height: 630,
      },
    }),
    ...(articleBody && {
      articleBody,
    }),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

// New: LocalBusiness Schema for agency context
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://copernicus.com",
    name: "Copernicus",
    image: "https://copernicus.com/copernicus-icon.svg",
    description:
      "Premium brand and creative agency specializing in brand strategy, identity design, advertising, events, and content production.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AE",
      addressLocality: "Dubai",
      postalCode: "Dubai",
    },
    telephone: "+971-XXXXXXX",
    url: "https://copernicus.com",
    priceRange: "$$$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "98",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

// New: CreativeWork Schema for projects/portfolio
export function CreativeWorkSchema({
  name,
  description,
  image,
  author = "Copernicus",
  dateCreated,
}: {
  name: string
  description: string
  image: string
  author?: string
  dateCreated: string
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    image,
    creator: {
      "@type": "Organization",
      name: author,
    },
    dateCreated,
    publisher: {
      "@type": "Organization",
      name: "Copernicus",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

// New: AggregateOffer Schema for service pricing context
export function AggregateOfferSchema({
  serviceName,
  offers,
}: {
  serviceName: string
  offers: Array<{ name: string; priceCurrency: string; price: string }>
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AggregateOffer",
    name: serviceName,
    priceCurrency: "AED",
    offers: offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      price: offer.price,
      priceCurrency: offer.priceCurrency,
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
