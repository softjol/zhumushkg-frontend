'use client'
import { Input } from '@/shared/ui/input'
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal } from 'lucide-react'
import { jobsData } from '../model/mockData'
import { useState } from 'react'
import { MobileSearchBar } from '@/features/search-bar/ui/MobileSearchBar'
import { JobCard } from '@/entities/job/ui/JobCard'

type Props = {}

export const JobList = ({}: Props) => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 9

  const filteredJobs =
    activeCategory === 'all' ? jobsData : jobsData.filter((j) => j.category === activeCategory)

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)
  const indexOfLastJob = currentPage * jobsPerPage
  const indexOfFirstJob = indexOfLastJob - jobsPerPage
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="w-full overflow-hidden">
      <MobileSearchBar />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {currentJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2.5 rounded-2xl bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-border"
          >
            <ChevronLeft size={22} />
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-11 h-11 rounded-2xl border text-lg font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-100 hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2.5 rounded-2xl bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-border"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </div>
  )
}
