export function buildOrganizationGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://mailplus.com.au/#organization',
        name: 'MailPlus',
        url: 'https://mailplus.com.au',
        logo: {
          '@type': 'ImageObject',
          url: 'https://mailplus.com.au/images/logo.png',
          width: 200,
          height: 60,
        },
        description: 'Australian courier, parcel delivery, mail management and logistics company serving Sydney from depots in Waterloo and Alexandria, NSW.',
        foundingDate: '2010',
        areaServed: {
          '@type': 'Country',
          name: 'Australia',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: '45 Botany Road',
          addressLocality: 'Waterloo',
          addressRegion: 'NSW',
          postalCode: '2017',
          addressCountry: 'AU',
        },
        telephone: '+61290000001',
        email: 'info@mailplus.com.au',
        sameAs: [
          'https://www.facebook.com/mailplusau',
          'https://www.linkedin.com/company/mailplusau',
          'https://twitter.com/mailplusau',
          'https://www.instagram.com/mailplusau',
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+61290000001',
            contactType: 'customer service',
            areaServed: 'AU',
            availableLanguage: 'English',
            hoursAvailable: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '07:00',
              closes: '19:00',
            },
          },
          {
            '@type': 'ContactPoint',
            telephone: '+61290000001',
            contactType: 'sales',
            areaServed: 'AU',
            availableLanguage: 'English',
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://mailplus.com.au/#website',
        url: 'https://mailplus.com.au',
        name: 'MailPlus',
        description: 'Sydney courier, parcel delivery, mail management and logistics',
        publisher: { '@id': 'https://mailplus.com.au/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://mailplus.com.au/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
        inLanguage: 'en-AU',
      },
    ],
  }
}

export function buildLocalBusinessSchema(opts: {
  id: string
  name: string
  streetAddress: string
  suburb: string
  state: string
  postcode: string
  lat: number
  lng: number
  phone: string
  email: string
  hours: { day: string; hours: string }[]
  googleMapsUrl: string
}) {
  const openingHours = opts.hours
    .filter((h) => h.hours !== 'Closed')
    .map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.day,
      opens: h.hours.split(' – ')[0].replace(' AM', ':00').replace(' PM', ':00').trim(),
      closes: h.hours.split(' – ')[1]?.replace(' AM', ':00').replace(' PM', ':00').trim(),
    }))

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'MovingCompany'],
    '@id': `https://mailplus.com.au/locations/${opts.id}/#localbusiness`,
    name: opts.name,
    parentOrganization: { '@id': 'https://mailplus.com.au/#organization' },
    url: `https://mailplus.com.au/locations/${opts.id}`,
    telephone: opts.phone,
    email: opts.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: opts.streetAddress,
      addressLocality: opts.suburb,
      addressRegion: opts.state,
      postalCode: opts.postcode,
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: opts.lat,
      longitude: opts.lng,
    },
    openingHoursSpecification: openingHours,
    hasMap: opts.googleMapsUrl,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '312',
      bestRating: '5',
    },
    priceRange: '$$',
    currenciesAccepted: 'AUD',
    paymentAccepted: 'Cash, Credit Card, EFTPOS, Invoice',
  }
}

export function buildServiceSchema(opts: {
  slug: string
  name: string
  description: string
  serviceType: string
  startingPrice: string
  currency: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://mailplus.com.au/services/${opts.slug}/#service`,
    name: opts.name,
    description: opts.description,
    provider: { '@id': 'https://mailplus.com.au/#organization' },
    serviceType: opts.serviceType,
    areaServed: [
      {
        '@type': 'City',
        name: 'Sydney',
        sameAs: 'https://www.wikidata.org/wiki/Q3130',
      },
      {
        '@type': 'Country',
        name: 'Australia',
        sameAs: 'https://www.wikidata.org/wiki/Q408',
      },
    ],
    offers: {
      '@type': 'Offer',
      price: opts.startingPrice,
      priceCurrency: opts.currency,
      availability: 'https://schema.org/InStock',
      url: `https://mailplus.com.au/services/${opts.slug}`,
    },
  }
}

export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
