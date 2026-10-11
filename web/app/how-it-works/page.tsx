import type { Metadata } from 'next'
import { HowItWorksPageBody } from '@/components/HomeSections'

export const metadata: Metadata = {
  title: 'How it works – HOMA Healthcare Center | Dr. Muddu Surendra Nehru MD',
  description:
    'The HOMA approach to diabetes reversal in 5 steps: HOMA-IR testing, root-cause diagnosis, a doctor-designed plan, weekly follow-up and long-term remission.',
}

export default function HowItWorksPage() {
  return <HowItWorksPageBody />
}
