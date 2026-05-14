'use client'

import { useEffect, useState, useMemo } from 'react'
import { Footer } from '@/widgets/footer'
import CandidateCard from '@/features/сandidate-сard/CandidateCard'
import { SearchBarCandidates } from '@/features/search-bar/ui/SearchBarCandidates'
import { Header } from '@/widgets/header/ui/Header'
import { Pagination } from '@/features/pagination/Pagination'
import { getAllResume } from '@/entities/resume/api'
import { useCandidateSearchStore } from '@/entities/resume/model/candidateSearchStore'
import { useCandidateFilterStore } from '@/entities/resume/model/candidateFilterStore'
import { CandidateCardSkeleton } from '@/features/сandidate-сard/CandidateCardSkeleton'
import { useCandidatesListStore } from '@/entities/resume/model/candidatesListStore'

export const EmployerCandidatesPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const candidatesPerPage = 9

  const candidates = useCandidatesListStore((s) => s.candidates)
  const loading = useCandidatesListStore((s) => s.loading)
  const cachedParamsKey = useCandidatesListStore((s) => s.cachedParamsKey)
  const { setCandidates, setLoading } = useCandidatesListStore.getState()

  const query = useCandidateSearchStore((s) => s.query)
  const { city, position, schedule, experience, salaryFrom, salaryTo, category } =
    useCandidateFilterStore()

  const paramsKey = useMemo(
    () =>
      JSON.stringify({
        query,
        city,
        position,
        schedule,
        experience,
        salaryFrom,
        salaryTo,
        category,
      }),
    [query, city, position, schedule, experience, salaryFrom, salaryTo, category],
  )

  useEffect(() => {
    if (cachedParamsKey === paramsKey) return

    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await getAllResume({
          search: query || undefined,
          city: city || undefined,
          position: position || undefined,
          work_schedule: schedule || undefined,
          experience_work: experience || undefined,
          salary_from: salaryFrom ? Number(salaryFrom) : undefined,
          salary_to: salaryTo ? Number(salaryTo) : undefined,
          category: category || undefined,
        })
        setCandidates(data ?? [], paramsKey)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [paramsKey])

  useEffect(() => {
    setCurrentPage(1)
  }, [paramsKey])

  const totalPages = Math.ceil(candidates.length / candidatesPerPage)
  const currentCandidates = candidates.slice(
    (currentPage - 1) * candidatesPerPage,
    currentPage * candidatesPerPage,
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="flex flex-col min-h-full bg-muted">
      <div className="block lg:hidden">
        <Header />
      </div>
      <div className="px-4 lg:px-6 py-4 lg:py-8 space-y-6 max-w-4xl mx-auto w-full flex-1">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">Кандидаты</h1>
          <p className="text-base text-muted-foreground">
            Найдено <span className="font-medium">{candidates.length}</span> резюме
          </p>
        </div>

        <SearchBarCandidates />

        {loading ? (
          <div className="grid gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <CandidateCardSkeleton key={i} />
            ))}
          </div>
        ) : candidates.length === 0 ? (
          <p className="text-center py-10 text-muted-foreground">Ничего не найдено</p>
        ) : (
          <>
            <div className="grid gap-3">
              {currentCandidates.map((candidate, index) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate as any}
                  onInvite={() => {}}
                  listIndex={index}
                  totalCount={candidates.length}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}
