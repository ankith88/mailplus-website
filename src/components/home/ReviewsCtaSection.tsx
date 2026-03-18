import Link from 'next/link'

export function ReviewsCtaSection() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="reviews-heading"
      style={{ backgroundColor: '#D1E0D1' }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Not your average courier */}
        <div
          className="rounded-3xl p-10 md:p-14 mb-10 border text-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.6)', borderColor: 'rgba(9,92,123,0.15)' }}
        >
          <span
            className="text-xs font-bold tracking-widest uppercase mb-4 block"
            style={{ color: '#095c7b' }}
          >
            Community
          </span>
          <h2
            id="reviews-heading"
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: '#095c7b' }}
          >
            Not Your Average Courier Service
          </h2>
          <p className="text-lg max-w-xl mx-auto mb-8" style={{ color: '#103d39' }}>
            Tag along for a dose of fun, insights and connect with us for a chance to see
            your business in the spotlight.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.instagram.com/mailplusau"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border-2 transition-all duration-300 hover:opacity-80"
              style={{ borderColor: '#095c7b', color: '#095c7b' }}
            >
              {/* Instagram icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @mailplusau
            </a>
            <a
              href="https://www.facebook.com/mailplusau"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border-2 transition-all duration-300 hover:opacity-80"
              style={{ borderColor: '#095c7b', color: '#095c7b' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              MailPlus Australia
            </a>
          </div>
        </div>

        {/* See Why Businesses Love Us */}
        <div
          className="rounded-3xl p-10 md:p-14 text-center border"
          style={{ backgroundColor: '#095c7b', borderColor: 'rgba(234,240,68,0.2)' }}
        >
          <div className="flex justify-center gap-1 mb-4" aria-label="5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-2xl" style={{ color: '#EAF044' }} aria-hidden="true">★</span>
            ))}
          </div>
          <h3
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: '#ffffff' }}
          >
            See Why Businesses Love Us
          </h3>
          <p className="text-lg max-w-xl mx-auto mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Our 5-star reviews speak for themselves — join other businesses that trust us
            for top-tier service and shipping solutions.
          </p>
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
