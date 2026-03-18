const faqs = [
  {
    question: 'How do I track my MailPlus delivery?',
    answer:
      'Enter your tracking number in the field above and click "Track Now". You\'ll see the real-time status of your parcel from pick-up through to delivery. You can find your tracking number on your shipping confirmation email or inside the ShipMate platform.',
  },
  {
    question: 'How long does MailPlus delivery take?',
    answer:
      'Most MailPlus orders arrive within 1–2 business days Australia-wide. Your dedicated owner-operator picks up your parcels and lodges them same-day, giving your customers fast, reliable delivery.',
  },
  {
    question: 'My tracking number isn\'t working — what should I do?',
    answer:
      'Tracking numbers can take a few hours to become active after pick-up. If your number still isn\'t working after 4 hours, please contact our Aussie-based customer service team on 1300 65 65 95 (Mon–Fri, 9am–5pm AEST) or submit a delivery support form.',
  },
  {
    question: 'Will my customer receive delivery notifications?',
    answer:
      'Yes. MailPlus automatically sends SMS and email notifications to your customers at each stage of the delivery journey — so they always know when to expect their parcel.',
  },
  {
    question: 'Can I track multiple parcels at once?',
    answer:
      'Yes. Through the ShipMate platform you can view and manage all your active shipments from one dashboard. ShipMate is free to use for all MailPlus account holders.',
  },
  {
    question: 'What happens if a delivery is unsuccessful?',
    answer:
      'If a delivery attempt is unsuccessful, the driver will leave a card with instructions. Your customer can arrange redelivery or collect from the nearest facility. For any issues, our customer service team is ready to help.',
  },
]

export function TrackingFaq() {
  return (
    <section
      className="py-24 px-6"
      aria-labelledby="tracking-faq-heading"
      style={{ backgroundColor: '#063040' }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span
            className="text-xs font-bold tracking-widest uppercase mb-4 block"
            style={{ color: '#EAF044' }}
          >
            FAQ
          </span>
          <h2
            id="tracking-faq-heading"
            className="text-3xl md:text-4xl font-bold"
            style={{ color: '#ffffff' }}
          >
            Tracking Questions,{' '}
            <span className="italic" style={{ color: '#EAF044' }}>Answered</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-2xl border group"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.10)' }}
            >
              <summary
                className="flex items-center justify-between p-6 font-semibold cursor-pointer list-none transition-opacity duration-200 hover:opacity-80"
                style={{ color: '#ffffff' }}
              >
                <span className="pr-4 text-sm md:text-base">{faq.question}</span>
                <svg
                  className="w-5 h-5 flex-none transition-transform duration-300 group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{ color: '#EAF044' }}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div
                className="px-6 pb-6 text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.72)' }}
              >
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Still need help with your delivery?
          </p>
          <a
            href="tel:1300656595"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: '#EAF044', color: '#103d39' }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
            </svg>
            Call 1300 65 65 95
          </a>
        </div>
      </div>
    </section>
  )
}
