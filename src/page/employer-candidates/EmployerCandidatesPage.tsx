'use client'

import { useEffect, useState } from 'react'

import { Footer } from '@/widgets/footer'
import CandidateCard from '@/features/сandidate-сard/CandidateCard'
import { SearchBarCandidates } from '@/features/search-bar/ui/SearchBarCandidates'
import { Header } from '@/widgets/header/ui/Header'
import { Pagination } from '@/features/pagination/Pagination'
import { getAllResume } from '@/entities/resume/api'
import { useUserStore } from '@/entities/user/model/store'
import { Resume } from '@/entities/resume/model/types'

export const EmployerCandidatesPage = () => {
  const [candidates, setCandidates] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)
  const { isAuthenticated } = useUserStore.getState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllResume()
        setCandidates(data ?? [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [isAuthenticated])

  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = candidates
  const handleSearchSubmit = (e: React.FormEvent) => e.preventDefault()
  const totalPages = 1

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0 })
  }
  if (loading) return <p className="text-center py-10">Загрузка...</p>

  return (
    <div className="flex flex-col min-h-full bg-muted">
      <div className="block lg:hidden">
        <Header />
      </div>
      <div className="px-4 lg:px-6 py-4 lg:py-8 space-y-6 max-w-4xl mx-auto w-full flex-1">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Кандидаты</h1>
          <p className="text-base text-muted-foreground">
            Найдено <span className="font-semibold text-foreground">{filtered.length}</span> резюме
          </p>
        </div>

        <SearchBarCandidates
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchSubmit={handleSearchSubmit}
        />

        <div className="grid gap-3">
          {filtered.map((candidate, index) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate as any}
              onInvite={() => {}}
              listIndex={index}
              totalCount={filtered.length}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <Footer />
    </div>
  )
}
