import { GetStartedForm } from './GetStartedForm'

export function GetStartedSection() {
  return (
    <section
      id="get-started"
      className="py-16 px-6"
      style={{ backgroundColor: '#f5f0eb' }}
      aria-labelledby="get-started-heading"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2
            id="get-started-heading"
            className="text-4xl md:text-5xl font-bold mb-5"
            style={{ color: '#095c7b', fontFamily: 'var(--font-display)' }}
          >
            Get started,{' '}
            <span
              className="italic"
              style={{
                color: '#095c7b',
                textDecoration: 'underline',
                textDecorationColor: '#EAF044',
                textDecorationThickness: '3px',
                textUnderlineOffset: '4px',
              }}
            >
              today.
            </span>
          </h2>
          <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#103d39' }}>
            Create a free MailPlus account and gain access to the ShipMate platform. No contracts,
            no minimum volume – just reliable, efficient shipping. A team member will reach out
            confirm your unique business needs.
          </p>
        </div>

        {/* Form */}
        <GetStartedForm />
      </div>
    </section>
  )
}
