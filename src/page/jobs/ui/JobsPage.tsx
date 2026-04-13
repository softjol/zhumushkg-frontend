'use client'

import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header/ui/Header'
import { CategoryChips } from './CategoryChips'
import { FeaturedCompanies } from './FeaturedCompanies'
import { JobList } from './JobList'
import { useEffect } from 'react'

export const JobsPage = () => {
  return (
    <div className="w-full min-h-screen relative flex flex-1 flex-col ">
      <Header />
      <div className="flex-1 bg-muted p-4 lg:px-6 lg:py-6 space-y-6 pb-12">
        <CategoryChips active="all" onChange={() => {}} />
        <section>
          <h2 className="text-lg font-semibold mb-3">Работа в известных компаниях</h2>
          <FeaturedCompanies />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Вакансии</h2>
          <JobList />
        </section>
      </div>
      <Footer />
    </div>
  )
}
