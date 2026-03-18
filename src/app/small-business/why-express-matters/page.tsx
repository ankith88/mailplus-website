import type { Metadata } from 'next'
import { WhyExpressHero } from '@/components/why-express/WhyExpressHero'
import { WhyExpressArticle } from '@/components/why-express/WhyExpressArticle'

export const metadata: Metadata = {
  title: 'Small Business Hub | Why Express Delivery Matters | MailPlus',
  description:
    'Our small business hub includes articles on everything you need to know about shipping and delivery. Here, we cover why express delivery matters.',
  alternates: { canonical: 'https://mailplus.com.au/small-business/why-express-matters' },
}

export default function WhyExpressMattersPage() {
  return (
    <>
      <WhyExpressHero />
      <WhyExpressArticle />
    </>
  )
}
