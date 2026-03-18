import type { Metadata } from 'next'
import { FranchiseePageWrapper } from '@/components/franchisee/FranchiseePageWrapper'
import { FranchiseeHero } from '@/components/franchisee/FranchiseeHero'
import { FranchiseeAvailable } from '@/components/franchisee/FranchiseeAvailable'
import { FranchiseeStats } from '@/components/franchisee/FranchiseeStats'
import { FranchiseeWhy } from '@/components/franchisee/FranchiseeWhy'
import { FranchiseeWhatYouGet } from '@/components/franchisee/FranchiseeWhatYouGet'
import { FranchiseeSteps } from '@/components/franchisee/FranchiseeSteps'
import { FranchiseeTestimonials } from '@/components/franchisee/FranchiseeTestimonials'
import { FranchiseeFaq } from '@/components/franchisee/FranchiseeFaq'

export const metadata: Metadata = {
  title: 'Become a Franchisee | Own a Franchise | MailPlus',
  description:
    "With 120+ franchises across Australia, we're always looking for new franchisees and investors to help us deliver to more customers Australia-wide.",
  alternates: { canonical: 'https://mailplus.com.au/become-a-franchisee' },
}

export default function BecomeAFranchiseePage() {
  return (
    <FranchiseePageWrapper>
      <FranchiseeHero />
      <FranchiseeAvailable />
      <FranchiseeStats />
      <FranchiseeWhy />
      <FranchiseeWhatYouGet />
      <FranchiseeSteps />
      <FranchiseeTestimonials />
      <FranchiseeFaq />
    </FranchiseePageWrapper>
  )
}
