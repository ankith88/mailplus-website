import ReviewsCarouselWidget from '@/components/shared/ReviewsCarouselWidget';
import ReviewsHeaderBanner from '@/components/shared/ReviewsHeaderBanner';

interface TestimonialsSectionProps {
  style?: React.CSSProperties;
  className?: string;
}

export function TestimonialsSection({ style, className }: TestimonialsSectionProps = {}) {
  return (
    <section className={`section ${className || ''}`.trim()} style={style}>
      <div className="wrap">
        <div className="testimonial-section">
          <ReviewsHeaderBanner />
          <ReviewsCarouselWidget />
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;

