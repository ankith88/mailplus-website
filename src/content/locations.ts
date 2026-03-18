export interface LocationHours {
  day: string
  hours: string
}

export interface Location {
  slug: string
  name: string
  suburb: string
  state: string
  postcode: string
  streetAddress: string
  phone: string
  email: string
  latitude: number
  longitude: number
  hours: LocationHours[]
  isHeadOffice: boolean
  description: string
  services: string[]
  googleMapsUrl: string
  googleCID: string
  metaTitle: string
  metaDescription: string
}

export const locations: Location[] = [
  {
    slug: 'waterloo',
    name: 'MailPlus Waterloo',
    suburb: 'Waterloo',
    state: 'NSW',
    postcode: '2017',
    streetAddress: '45 Botany Road',
    phone: '+61 2 9000 0001',
    email: 'waterloo@mailplus.com.au',
    latitude: -33.8988,
    longitude: 151.2070,
    isHeadOffice: true,
    description: 'Our Waterloo head office and primary dispatch depot, located 3km from Sydney CBD. Handles courier bookings, parcel lodgement, and mail management for the inner city and eastern suburbs.',
    services: ['Same-Day Courier', 'Parcel Delivery', 'Mail Management'],
    hours: [
      { day: 'Monday',    hours: '7:00 AM – 7:00 PM' },
      { day: 'Tuesday',   hours: '7:00 AM – 7:00 PM' },
      { day: 'Wednesday', hours: '7:00 AM – 7:00 PM' },
      { day: 'Thursday',  hours: '7:00 AM – 7:00 PM' },
      { day: 'Friday',    hours: '7:00 AM – 7:00 PM' },
      { day: 'Saturday',  hours: '8:00 AM – 2:00 PM' },
      { day: 'Sunday',    hours: 'Closed' },
    ],
    googleMapsUrl: 'https://maps.google.com/?q=45+Botany+Road+Waterloo+NSW+2017',
    googleCID: 'mailplus-waterloo',
    metaTitle: 'MailPlus Waterloo | Courier & Parcel Depot Sydney | NSW 2017',
    metaDescription: 'MailPlus Waterloo depot at 45 Botany Road, NSW 2017. Same-day courier, parcel delivery and mail management. Open Mon–Fri 7am–7pm, Sat 8am–2pm.',
  },
  {
    slug: 'alexandria',
    name: 'MailPlus Alexandria',
    suburb: 'Alexandria',
    state: 'NSW',
    postcode: '2015',
    streetAddress: '12 Wyndham Street',
    phone: '+61 2 9000 0002',
    email: 'alexandria@mailplus.com.au',
    latitude: -33.9050,
    longitude: 151.1950,
    isHeadOffice: false,
    description: 'Our Alexandria operations hub houses our 3,000 sqm warehouse, cold-chain facility, and B2B logistics operations. Located 4km from Sydney CBD with direct M5 Motorway and Port Botany access.',
    services: ['Logistics & Warehousing', 'Parcel Delivery', 'Same-Day Courier'],
    hours: [
      { day: 'Monday',    hours: '6:00 AM – 8:00 PM' },
      { day: 'Tuesday',   hours: '6:00 AM – 8:00 PM' },
      { day: 'Wednesday', hours: '6:00 AM – 8:00 PM' },
      { day: 'Thursday',  hours: '6:00 AM – 8:00 PM' },
      { day: 'Friday',    hours: '6:00 AM – 8:00 PM' },
      { day: 'Saturday',  hours: '7:00 AM – 3:00 PM' },
      { day: 'Sunday',    hours: 'Closed' },
    ],
    googleMapsUrl: 'https://maps.google.com/?q=12+Wyndham+Street+Alexandria+NSW+2015',
    googleCID: 'mailplus-alexandria',
    metaTitle: 'MailPlus Alexandria | Warehouse & Logistics Hub Sydney | NSW 2015',
    metaDescription: 'MailPlus Alexandria at 12 Wyndham Street, NSW 2015. 3PL warehousing, logistics and parcel depot. Open Mon–Fri 6am–8pm, Sat 7am–3pm.',
  },
]

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug)
}
