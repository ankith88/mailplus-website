import type { Metadata } from 'next'
import { DeliverySupportForm } from '@/components/delivery-support-form/DeliverySupportForm'

export const metadata: Metadata = {
  title: 'Delivery Support Form | Customer Enquiry — MailPlus',
  description:
    'Submit a delivery support ticket with MailPlus. Report issues with your parcel including delays, damage, missing items, or incorrect delivery.',
  alternates: { canonical: 'https://mailplus.com.au/customer-enquiry-form' },
}

export default function DeliverySupportFormPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative w-full flex items-center justify-center px-6 overflow-hidden"
        style={{ backgroundColor: '#063040', minHeight: '40svh' }}
      >
        <div
          className="organic-blob absolute w-[600px] h-[600px] -right-40 -top-24 pointer-events-none"
          aria-hidden="true"
          style={{ opacity: 0.06 }}
        />
        <div
          className="organic-blob-moss absolute w-[400px] h-[400px] -left-20 bottom-0 pointer-events-none"
          aria-hidden="true"
          style={{ opacity: 0.07, animationDelay: '4s' }}
        />
        <div className="relative z-10 max-w-2xl mx-auto text-center py-20">
          <span
            className="text-xs font-bold tracking-widest uppercase mb-5 block"
            style={{ color: '#EAF044' }}
          >
            Customer Support
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
            style={{ color: '#ffffff', fontFamily: 'var(--font-display)' }}
          >
            Delivery{' '}
            <span className="italic" style={{ color: '#EAF044' }}>Support Form</span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
            Having an issue with your parcel? Fill in the form below and our Aussie-based
            customer service team will be in touch as soon as possible.
          </p>
        </div>
      </section>

      {/* Form + sidebar */}
      <section
        className="py-20 px-6"
        style={{ backgroundColor: '#ffffff' }}
        aria-label="Delivery support form"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_340px] gap-12">

          {/* Form */}
          <div>
            <DeliverySupportForm />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">

            {/* Rating banner */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: '#DAE8DA', border: '1px solid rgba(9,92,123,0.10)' }}
            >
              <div className="flex gap-0.5 mb-3" aria-label="4.9 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-xl" style={{ color: '#EAF044' }} aria-hidden="true">★</span>
                ))}
              </div>
              <p className="font-bold text-sm mb-1" style={{ color: '#095c7b' }}>Rated 4.9 stars</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(9,92,123,0.72)' }}>
                The most loved local courier for all your pickup &amp; delivery needs.
              </p>
            </div>

            {/* Contact info */}
            <div
              className="rounded-2xl p-6 space-y-4"
              style={{ backgroundColor: '#095c7b' }}
            >
              <p className="font-bold text-sm" style={{ color: '#EAF044' }}>Need urgent help?</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.80)' }}>
                For urgent delivery issues, call our customer service team directly.
              </p>
              <a
                href="tel:1300656595"
                className="flex items-center gap-3 font-bold text-base"
                style={{ color: '#ffffff' }}
              >
                <svg className="w-5 h-5 flex-none" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                </svg>
                1300 65 65 95
              </a>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>Monday – Friday, 9am – 5pm AEST</p>
            </div>

            {/* Tracking tip */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: 'rgba(9,92,123,0.04)', border: '1px solid rgba(9,92,123,0.12)' }}
            >
              <p className="font-bold text-sm mb-2" style={{ color: '#095c7b' }}>Where is my tracking number?</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(9,92,123,0.72)' }}>
                Your tracking number can be found in your shipping confirmation email or inside the ShipMate platform. It typically starts with{' '}
                <span className="font-mono font-semibold" style={{ color: '#095c7b' }}>MPEN</span>,{' '}
                <span className="font-mono font-semibold" style={{ color: '#095c7b' }}>MPSD</span>,{' '}
                <span className="font-mono font-semibold" style={{ color: '#095c7b' }}>MPXL</span>, or{' '}
                <span className="font-mono font-semibold" style={{ color: '#095c7b' }}>CPBZL</span>.
              </p>
            </div>

          </aside>
        </div>
      </section>
    </>
  )
}
