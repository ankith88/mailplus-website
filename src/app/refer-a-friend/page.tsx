import type { Metadata } from 'next'
import Link from 'next/link'
import { ReferHero } from '@/components/refer-a-friend/ReferHero'
import { ReferHowItWorks } from '@/components/refer-a-friend/ReferHowItWorks'
import { ReferForm } from '@/components/refer-a-friend/ReferForm'

export const metadata: Metadata = {
  title: 'Refer a Friend — Cash Incentive | MailPlus',
  description:
    'Know someone who\'d make a great MailPlus franchisee? Refer them and earn a cash incentive when they sign up. With 120+ franchises across Australia, we\'re always growing.',
  alternates: { canonical: 'https://mailplus.com.au/refer-a-friend-cash-incentive' },
}

export default function ReferAFriendPage() {
  return (
    <>
      <ReferHero />
      <ReferHowItWorks />

      {/* Form section */}
      <section
        id="refer-form"
        className="py-24 px-6"
        style={{ backgroundColor: '#ffffff' }}
        aria-labelledby="refer-form-heading"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_360px] gap-12">

          {/* Form */}
          <div>
            <ReferForm />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">

            {/* Incentive card */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: '#095c7b' }}
            >
              <span
                className="text-xs font-bold tracking-widest uppercase mb-3 block"
                style={{ color: '#EAF044' }}
              >
                Cash Incentive
              </span>
              <p className="font-bold text-lg mb-3" style={{ color: '#ffffff' }}>
                Earn a cash reward when your friend becomes a MailPlus franchisee.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
                Contact our team for full incentive details. The reward is paid once your
                referred friend signs their Franchise Agreement with MailPlus.
              </p>
            </div>

            {/* Why franchise card */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: '#DAE8DA', border: '1px solid rgba(9,92,123,0.10)' }}
            >
              <p className="font-bold text-sm mb-3" style={{ color: '#095c7b' }}>Why MailPlus?</p>
              <ul className="space-y-2">
                {[
                  '120+ franchises across Australia',
                  'Established brand & client base',
                  'Full training provided',
                  'Free ShipMate technology platform',
                  'Exclusive territory',
                  'No prior experience needed',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(9,92,123,0.80)' }}>
                    <svg className="w-4 h-4 flex-none mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: '#095c7b' }} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/become-a-franchisee"
                className="inline-flex items-center gap-1.5 text-xs font-bold mt-4 transition-opacity hover:opacity-70"
                style={{ color: '#095c7b' }}
              >
                Learn more about franchising
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Contact */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: 'rgba(9,92,123,0.04)', border: '1px solid rgba(9,92,123,0.12)' }}
            >
              <p className="font-bold text-sm mb-1" style={{ color: '#095c7b' }}>Questions?</p>
              <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(9,92,123,0.72)' }}>
                Monday – Friday, 9am – 5pm AEST
              </p>
              <a
                href="tel:1300656595"
                className="flex items-center gap-2 font-bold text-sm"
                style={{ color: '#095c7b' }}
              >
                <svg className="w-4 h-4 flex-none" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                </svg>
                1300 65 65 95
              </a>
            </div>

          </aside>
        </div>
      </section>
    </>
  )
}
