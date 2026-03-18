import type { Metadata } from 'next'
import { PostOfficeHero } from '@/components/post-office-solutions/PostOfficeHero'
import { PostOfficeUsps } from '@/components/post-office-solutions/PostOfficeUsps'
import { PostOfficeFeature } from '@/components/post-office-solutions/PostOfficeFeature'
import { PostOfficeCta } from '@/components/post-office-solutions/PostOfficeCta'
import { PostOfficeNeverQueue } from '@/components/post-office-solutions/PostOfficeNeverQueue'
import { PostOfficeTestimonials } from '@/components/post-office-solutions/PostOfficeTestimonials'

export const metadata: Metadata = {
  title: "Post Office Services | We'll Bring The Post Office To You",
  description:
    "MailPlus collects your PO Box mail, lodges your Australia Post parcels same-day, and delivers the Post Office to your door. No queues, no contracts, no up-front fees.",
  alternates: { canonical: 'https://mailplus.com.au/post-office-solutions' },
}

export default function PostOfficeSolutionsPage() {
  return (
    <>
      <PostOfficeHero />
      <PostOfficeUsps />
      <PostOfficeFeature />
      <PostOfficeCta />
      <PostOfficeNeverQueue />
      <PostOfficeTestimonials />
    </>
  )
}
