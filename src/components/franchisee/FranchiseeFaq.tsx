const faqs = [
  {
    q: 'Do I need courier or logistics experience to become a MailPlus franchisee?',
    a: 'No prior courier or logistics experience is required. MailPlus provides comprehensive onboarding training covering all aspects of running your franchise — from daily operations and client management to using the ShipMate platform. We look for motivated, customer-focused individuals who are committed to delivering excellent service.',
  },
  {
    q: 'How many clients will I have when I start?',
    a: 'When you purchase a MailPlus franchise, you receive an established territory with existing clients already using MailPlus services. You\'re not starting from zero — you\'ll have a client base generating revenue from day one, with the opportunity to grow it further within your exclusive area.',
  },
  {
    q: 'What does a MailPlus franchise territory look like?',
    a: 'Each territory is a defined geographic area, typically covering a suburb or commercial precinct. Your territory is exclusive — no other MailPlus franchisee will operate within your boundaries. Territory size varies depending on the location and business density.',
  },
  {
    q: 'What are the ongoing support arrangements?',
    a: 'As a MailPlus franchisee you\'ll have access to our full support network including the Sales and Marketing team, Customer Service team, IT Systems team, and direct support from MailPlus head office. We hold regular franchisee network events and provide ongoing training as our technology and services evolve.',
  },
  {
    q: 'Can I grow my business beyond my initial territory?',
    a: 'Yes. Many successful MailPlus franchisees expand by acquiring additional territories or taking on sub-contractors to manage volume growth. Our team will work with you on a growth strategy that suits your goals.',
  },
  {
    q: 'How do I find out what territories are currently available?',
    a: 'Available territories change regularly as the network expands. The best way to find out what\'s available in your preferred area is to submit an enquiry via the form on this page. Our franchising team will contact you to discuss current availability.',
  },
]

export function FranchiseeFaq() {
  return (
    <section
      className="py-24 px-6"
      aria-labelledby="franchise-faq-heading"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span
            className="text-xs font-bold tracking-widest uppercase mb-4 block"
            style={{ color: '#095c7b' }}
          >
            FAQ
          </span>
          <h2
            id="franchise-faq-heading"
            className="text-3xl md:text-4xl font-bold"
            style={{ color: '#095c7b' }}
          >
            Common franchise{' '}
            <span className="italic" style={{ color: '#103d39' }}>questions answered.</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="rounded-2xl border group"
              style={{ backgroundColor: '#f8faf8', borderColor: 'rgba(9,92,123,0.12)' }}
            >
              <summary
                className="flex items-center justify-between p-6 font-semibold cursor-pointer list-none transition-opacity duration-200 hover:opacity-80"
                style={{ color: '#095c7b' }}
              >
                <span className="pr-4 text-sm md:text-base">{faq.q}</span>
                <svg
                  className="w-5 h-5 flex-none transition-transform duration-300 group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{ color: '#095c7b' }}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div
                className="px-6 pb-6 text-sm leading-relaxed"
                style={{ color: 'rgba(9,92,123,0.80)' }}
              >
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
