import ReviewsCarouselWidget from '@/components/shared/ReviewsCarouselWidget';
import ReviewsHeaderBanner from '@/components/shared/ReviewsHeaderBanner';

export function TestimonialsSection() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="testimonial-section">
          <ReviewsHeaderBanner />
          <ReviewsCarouselWidget />
        </div>
      </div>
    </section>
  )
}

