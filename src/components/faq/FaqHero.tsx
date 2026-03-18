export function FaqHero() {
  return (
    <section
      className="relative w-full flex items-center justify-center px-6 overflow-hidden"
      aria-labelledby="faq-hero-heading"
      style={{ backgroundColor: '#063040', minHeight: '45svh' }}
    >
      <div
        className="organic-blob absolute w-[700px] h-[700px] -right-48 -top-32 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.06 }}
      />
      <div
        className="organic-blob-moss absolute w-[450px] h-[450px] -left-24 bottom-0 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.07, animationDelay: '4s' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center py-24">
        <span
          className="text-xs font-bold tracking-widest uppercase mb-5 block"
          style={{ color: '#EAF044' }}
        >
          Commonly Asked Questions
        </span>
        <h1
          id="faq-hero-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          style={{ color: '#ffffff', fontFamily: 'var(--font-display)' }}
        >
          You&apos;ve got questions,{' '}
          <span className="italic" style={{ color: '#EAF044' }}>we&apos;ve got answers.</span>
        </h1>
        <p
          className="text-xl leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.72)' }}
        >
          Everything you need to know about MailPlus services, delivery, pricing, and more.
        </p>
      </div>
    </section>
  )
}
