export function PostOfficeCta() {
  return (
    <section
      className="py-16 px-6 text-center"
      style={{ backgroundColor: '#ffffff' }}
      aria-label="Enquire now"
    >
      <a
        href="#get-started"
        className="inline-flex items-center gap-2 px-12 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
        style={{ backgroundColor: '#EAF044', color: '#103d39' }}
      >
        Enquire Now
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </a>
    </section>
  )
}
