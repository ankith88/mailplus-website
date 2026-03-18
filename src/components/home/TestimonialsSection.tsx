import Link from 'next/link'

export function TestimonialsSection() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="testimonial-heading"
      style={{ backgroundColor: '#095c7b' }}
    >
      {/* Blob */}
      <div
        className="organic-blob absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.06 }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <span
          className="text-xs font-bold tracking-widest uppercase mb-6 block"
          style={{ color: '#EAF044' }}
        >
          Client Story
        </span>
        <h2
          id="testimonial-heading"
          className="text-3xl md:text-4xl font-bold mb-12 leading-tight"
          style={{ color: '#ffffff' }}
        >
          Hear it From Phillip, Owner &amp; Founder of{' '}
          <span className="italic" style={{ color: '#EAF044' }}>Goldelucks</span>
        </h2>

        {/* Stars */}
        <div className="flex justify-center gap-1 mb-8" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-2xl" style={{ color: '#EAF044' }} aria-hidden="true">★</span>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="relative mb-10">
          <span
            className="absolute -top-4 left-1/2 -translate-x-1/2 text-8xl font-serif leading-none pointer-events-none select-none"
            style={{ color: 'rgba(234,240,68,0.15)' }}
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p
            className="relative z-10 text-xl md:text-2xl leading-relaxed font-medium italic"
            style={{ color: 'rgba(255,255,255,0.92)' }}
          >
            I absolutely love working with MailPlus. The team is amazing! MailPlus has been a
            game changer for our business – not only are we saving, but we&apos;re also able to
            maintain the next business day delivery for our perishable goods. I have recommended
            MailPlus to multiple business owners. Big shout out to our local driver, David.
            He&apos;s also so accommodating and is patient with us even when we&apos;re flat out
            busy. Thanks MailPlus! Hope to keep working with you for years to come!
          </p>
        </blockquote>

        {/* Author */}
        <footer className="mb-12">
          <div
            className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold"
            style={{ backgroundColor: '#EAF044', color: '#103d39' }}
            aria-hidden="true"
          >
            P
          </div>
          <p className="font-bold text-lg" style={{ color: '#ffffff' }}>Phillip</p>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Owner &amp; Founder, Goldelucks
          </p>
        </footer>

        {/* CTA */}
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
    </section>
  )
}
