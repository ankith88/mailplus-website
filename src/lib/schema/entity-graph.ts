export function buildOrganizationGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://mailplus.com.au/#organization',
        name: 'MailPlus',
        legalName: 'MailPlus Pty Ltd',
        url: 'https://mailplus.com.au',
        logo: {
          '@type': 'ImageObject',
          url: 'https://mailplus.com.au/images/logo.png',
          width: 200,
          height: 60,
        },
        description:
          'MailPlus is an Australian courier and parcel delivery network for small to medium sized business, founded in 1997, operating franchised territories across all metro areas and selected regional areas with approximately 300 vehicles on the road. Services include express parcel delivery in 1–2 business days Australia-wide, flat-rate pricing up to 5kg, same-day pickup by local owner-operators, and Post Office collect and lodge.',
        foundingDate: '1997',
        founder: {
          '@type': 'Person',
          name: 'Chris Burgess',
          jobTitle: 'Managing Director',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Australia',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Level 16, 175 Pitt Street',
          addressLocality: 'Sydney',
          addressRegion: 'NSW',
          postalCode: '2000',
          addressCountry: 'AU',
        },
        telephone: '+61-1300-65-65-95',
        sameAs: [
          'https://www.facebook.com/mailplusAustralia/',
          'https://www.linkedin.com/company/mailplusau',
          'https://twitter.com/mailplusau',
          'https://www.instagram.com/mailplusau/',
          'https://www.reviews.io/company-reviews/store/mailplus.com.au',
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+61-1300-65-65-95',
            contactType: 'customer service',
            areaServed: 'AU',
            availableLanguage: 'English',
            hoursAvailable: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '09:00',
              closes: '17:00',
            },
          },
          {
            '@type': 'ContactPoint',
            telephone: '+61-1300-65-65-95',
            contactType: 'sales',
            areaServed: 'AU',
            availableLanguage: 'English',
          },
        ],
        makesOffer: [
          {
            '@type': 'Offer',
            name: '5 Free Collections',
            description:
              'Five free collections for new MailPlus business customers who send with Australia Post. A local owner-operator collects and lodges on the customer\'s own Australia Post account. No credit card and no obligation.',
            price: '0',
            priceCurrency: 'AUD',
            url: 'https://mailplus.com.au/5-free-collections',
            eligibleCustomerType: 'https://schema.org/Business',
          },
          {
            '@type': 'Offer',
            name: 'ShipMate Platform',
            description:
              'Free shipping platform for booking pickups, printing labels and tracking, with Shopify and WooCommerce integrations. No subscription and no minimum volume.',
            price: '0',
            priceCurrency: 'AUD',
            url: 'https://mailplus.com.au/shipmate-platform',
          },
          {
            '@type': 'Offer',
            name: 'Express Parcel Delivery',
            description:
              'Flat-rate express delivery for items up to 5kg, 1–2 business days anywhere in Australia, with same-day pickup by a local owner-operator.',
            url: 'https://mailplus.com.au/express-delivery',
          },
          {
            '@type': 'Offer',
            name: 'Post Office Collect & Lodge',
            description:
              'Morning delivery of inbound Australia Post mail and parcels, end-of-day lodgement of outbound items, and business PO Box clearing by a local owner-operator.',
            url: 'https://mailplus.com.au/post-office-collect-lodge',
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://mailplus.com.au/#website',
        url: 'https://mailplus.com.au',
        name: 'MailPlus',
        description: 'Australian courier and parcel delivery for small business',
        publisher: {
          '@id': 'https://mailplus.com.au/#organization',
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
