import Link from 'next/link'

export function WhyExpressHero() {
  return (
    <section
      className="relative w-full px-6 overflow-hidden"
      style={{ backgroundColor: '#063040', paddingTop: '8rem', paddingBottom: '5rem' }}
    >
      <div
        className="organic-blob absolute w-[600px] h-[600px] -right-40 -top-24 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.06 }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-8" aria-label="Breadcrumb" style={{ color: 'rgba(255,255,255,0.50)' }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <span style={{ color: 'rgba(255,255,255,0.50)' }}>Small Business Hub</span>
          <span aria-hidden="true">/</span>
          <span style={{ color: '#EAF044' }}>Why Express Matters</span>
        </nav>

        <span
          className="text-xs font-bold tracking-widest uppercase mb-5 block"
          style={{ color: '#EAF044' }}
        >
          Small Business Hub
        </span>

        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          style={{ color: '#ffffff', fontFamily: 'var(--font-display)' }}
        >
          Why Express Delivery{' '}
          <span className="italic" style={{ color: '#EAF044' }}>Matters Most</span>
        </h1>

        <p
          className="text-xl leading-relaxed mb-8 max-w-2xl"
          style={{ color: 'rgba(255,255,255,0.72)' }}
        >
          Delivery speed is one of the biggest factors in whether a customer buys from you again —
          or goes to a competitor. Here&apos;s what the research says, and what you can do about it.
        </p>

        <div className="flex items-center gap-4 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
          <span>Published 5 April 2021</span>
          <span aria-hidden="true">·</span>
          <span>Updated 22 August 2024</span>
          <span aria-hidden="true">·</span>
          <span>6 min read</span>
        </div>
      </div>
    </section>
  )
}
