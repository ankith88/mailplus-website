const territories = [
  {
    state: 'NSW',
    locations: [
      'Arncliffe',
      'Hunter Valley',
      'Macquarie Park',
      'Mascot',
      'Milperra',
      'Northern Beaches/Peninsula',
      'Surry Hills',
    ],
  },
  {
    state: 'VIC',
    locations: [
      'Geelong',
      'Hallam',
      'Hoppers Crossing',
      'Preston',
      'Sunshine',
      'Lalor',
    ],
  },
  {
    state: 'ACT',
    locations: ['Barton', 'Canberra Airport'],
  },
  {
    state: 'TAS',
    locations: ['Launceston', 'Hobart'],
  },
  {
    state: 'QLD',
    locations: ['Gold Coast', 'Sunshine Coast', 'Darra'],
  },
]

export function FranchiseeAvailable() {
  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: '#DAE8DA' }}
      aria-labelledby="available-heading"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2
          id="available-heading"
          className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
          style={{ color: '#095c7b', fontFamily: 'var(--font-display)' }}
        >
          Available MailPlus Franchises for Sale
        </h2>
        <p className="text-base mb-14" style={{ color: 'rgba(9,92,123,0.72)' }}>
          We currently have a range of profitable opportunities across Australia.
        </p>

        <div className="grid grid-cols-2 gap-x-16 gap-y-12">
          {territories.map((t) => (
            <div key={t.state} className="text-center">
              <p
                className="font-bold text-base mb-4"
                style={{ color: '#095c7b' }}
              >
                {t.state}
              </p>
              <ul className="space-y-2">
                {t.locations.map((loc) => (
                  <li
                    key={loc}
                    className="text-sm"
                    style={{ color: 'rgba(9,92,123,0.80)' }}
                  >
                    {loc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <a
            href="#franchise-enquire"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: '#095c7b', color: '#ffffff' }}
          >
            Enquire About a Territory
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
