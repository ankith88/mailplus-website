export function ShopifyHero() {
  return (
    <section
      className="relative w-full flex items-center justify-center px-6 overflow-hidden"
      aria-labelledby="shopify-hero-heading"
      style={{ backgroundColor: '#063040', minHeight: '100svh' }}
    >
      {/* Blobs */}
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

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Shopify badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm"
            style={{ backgroundColor: '#96BF48' }}
            aria-hidden="true"
          >
            S
          </div>
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: '#EAF044' }}
          >
            Shopify Integration
          </span>
        </div>

        <h1
          id="shopify-hero-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          style={{ color: '#ffffff', fontFamily: 'var(--font-display)' }}
        >
          Selling with Shopify,{' '}
          <span className="italic" style={{ color: '#EAF044' }}>made easier.</span>
        </h1>

        <p
          className="text-xl md:text-2xl leading-relaxed mb-4"
          style={{ color: 'rgba(255,255,255,0.80)' }}
        >
          MailPlus makes selling with Shopify so much easier.
        </p>
        <p
          className="text-lg leading-relaxed mb-10 max-w-xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.60)' }}
        >
          Our Shopify integration is free, easy to use and allows you to scan parcels straight from your phone.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#get-started"
            className="px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: '#EAF044', color: '#103d39' }}
          >
            Enquire Now
          </a>
          <a
            href="https://apps.shopify.com/mailplus?surface_detail=mailplus&surface_inter_position=1&surface_intra_position=1&surface_type=search"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: 'rgba(255,255,255,0.10)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.20)' }}
          >
            <div className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: '#96BF48' }} aria-hidden="true">S</div>
            View on Shopify App Store
          </a>
        </div>
      </div>
    </section>
  )
}
