import Link from 'next/link'
import { Card3D } from '@/components/shared/Card3D'

const advantages = [
  {
    icon: '😌',
    title: 'Less Stress',
    description:
      'You can depend on us and your local operator for VIP treatment. Shoot us a message or call us directly – we won\'t keep you waiting.',
    color: 'from-moss-500/15 to-moss-800/15',
    border: 'border-moss-500/20',
    iconBg: 'from-moss-400 to-moss-600',
  },
  {
    icon: '⏱️',
    title: 'More Time',
    description:
      'Our express delivery and same-day pick-ups will save you from chasing couriers. We can even pick up and lodge your Australia Post mail and parcels, so you don\'t have to.',
    color: 'from-amber-500/15 to-clay-600/15',
    border: 'border-amber-500/20',
    iconBg: 'from-amber-400 to-clay-500',
  },
  {
    icon: '💰',
    title: 'Exclusive Discounts',
    description:
      'Your free account with MailPlus will give you enterprise level shipping products at a discount, regardless of your volume. (And without the hassle of dealing with big corporate companies!)',
    color: 'from-clay-600/15 to-clay-700/15',
    border: 'border-clay-500/20',
    iconBg: 'from-clay-400 to-clay-600',
  },
  {
    icon: '🔗',
    title: 'Integration Solutions',
    description:
      'We integrate with major carriers, allowing you to print labels with ease. Our (free) shipping platform, ShipMate, can be used on its own, with Shopify, or with our API.',
    color: 'from-earth-600/20 to-earth-700/20',
    border: 'border-earth-500/30',
    iconBg: 'from-earth-300 to-earth-500',
  },
  {
    icon: '🕊️',
    title: 'Flexibility & Peace of Mind',
    description:
      'Opening a MailPlus account is free with no strings attached. Simply give us a go and experience the advantage for yourself. If our solution is not for you, you can cancel at any time.',
    color: 'from-moss-500/15 to-amber-500/10',
    border: 'border-moss-400/20',
    iconBg: 'from-moss-300 to-moss-500',
  },
]

export function AdvantageSection() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="advantage-heading"
      style={{ backgroundColor: '#D1E0D1' }}
    >
      {/* Subtle blob */}
      <div
        className="organic-blob-moss absolute w-72 h-72 right-0 top-20 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.07 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span
            className="text-xs font-bold tracking-widest uppercase mb-3 block"
            style={{ color: '#095c7b' }}
          >
            The MailPlus Advantage
          </span>
          <h2
            id="advantage-heading"
            className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
            style={{ color: '#095c7b' }}
          >
            What&apos;s the MailPlus{' '}
            <span className="italic" style={{ color: '#103d39' }}>Advantage?</span>
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: '#103d39' }}>
            Five reasons thousands of Aussie businesses trust MailPlus to handle their shipping.
          </p>
        </div>

        {/* Cards — first 4 in grid, 5th centred below */}
        <div className="cards-3d-scene">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {advantages.slice(0, 4).map((adv, i) => (
              <div
                key={adv.title}
                style={{
                  transform: `translateY(calc(${i % 2 === 0 ? '0px' : '10px'} + var(--scroll-y, 0) * ${-0.02 - i * 0.005}px))`,
                  willChange: 'transform',
                  transition: 'transform 0.1s linear',
                }}
              >
                <Card3D
                  className={`rounded-2xl bg-gradient-to-br ${adv.color} border ${adv.border} overflow-hidden h-full`}
                >
                  <div className="p-6 h-full">
                    <div className="card-3d__depth-lg mb-5">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${adv.iconBg} flex items-center justify-center text-xl`}
                        aria-hidden="true"
                      >
                        {adv.icon}
                      </div>
                    </div>
                    <h3 className="text-base font-bold mb-3" style={{ color: '#095c7b' }}>
                      {adv.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#103d39' }}>
                      {adv.description}
                    </p>
                  </div>
                </Card3D>
              </div>
            ))}
          </div>

          {/* 5th card — centred */}
          <div className="flex justify-center">
            <div className="w-full sm:w-1/2 lg:w-1/4">
              <Card3D
                className={`rounded-2xl bg-gradient-to-br ${advantages[4].color} border ${advantages[4].border} overflow-hidden`}
              >
                <div className="p-6">
                  <div className="card-3d__depth-lg mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${advantages[4].iconBg} flex items-center justify-center text-xl`}
                      aria-hidden="true"
                    >
                      {advantages[4].icon}
                    </div>
                  </div>
                  <h3 className="text-base font-bold mb-3" style={{ color: '#095c7b' }}>
                    {advantages[4].title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#103d39' }}>
                    {advantages[4].description}
                  </p>
                </div>
              </Card3D>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            href="#get-started"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: '#EAF044', color: '#103d39' }}
          >
            START SAVING
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
