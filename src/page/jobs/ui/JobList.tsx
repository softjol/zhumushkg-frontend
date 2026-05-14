'use client'
import { JobCard } from '@/entities/job/ui/JobCard'
import { useState, useEffect, useMemo } from 'react'
import { getVacancies } from '@/entities/job/api'
import { SearchBar } from '@/features/search-bar/ui/SearchBar'
import { useUserStore } from '@/entities/user/model/store'
import { getFavorites } from '@/entities/favorites/api'
import { useFavoritesStore } from '@/entities/favorites/model/store'
import { useApplicationsStore } from '@/entities/applications/model/store'
import { Pagination } from '@/features/pagination/Pagination'
import { getMyApplications } from '@/entities/applications/api'
import { useJobStore } from '@/entities/job/model/store'
import { useFilterStore } from '@/entities/job/model/filterStore'
import { JobCardSkeleton } from '@/entities/job/ui/JobCardSkeleton'

export const JobList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 9

  const isAuthenticated = useUserStore((s) => s.isAuthenticated)
  const { setFavorites } = useFavoritesStore()
  const { setApplied } = useApplicationsStore()

  // Читаем из стора вместо локального useState
  const jobs = useJobStore((s) => s.jobs)
  const loading = useJobStore((s) => s.loading)
  const cachedParamsKey = useJobStore((s) => s.cachedParamsKey)
  const { setJobs, setLoading } = useJobStore.getState()

  const query = useJobStore((s) => s.query)
  const { city, position, schedule, experience, period, salaryFrom, salaryTo, remoteWork, category } =
    useFilterStore()

  // Строка-ключ всех текущих фильтров
  const paramsKey = useMemo(
    () =>
      JSON.stringify({
        query,
        city,
        position,
        schedule,
        experience,
        period,
        salaryFrom,
        salaryTo,
        remoteWork,
      }),
    [query, city, position, schedule, experience, period, salaryFrom, salaryTo, remoteWork],
  )

  // Эффект для вакансий — пропускаем если ключ совпадает (кеш актуален)
  useEffect(() => {
    if (cachedParamsKey === paramsKey) return

    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await getVacancies({
          search: query || undefined,
          city: city || undefined,
          position: position || undefined,
          work_schedule: schedule || undefined,
          experience_work: experience || undefined,
          payment_period: period || undefined,
          salary_from: salaryFrom ? Number(salaryFrom) : undefined,
          salary_to: salaryTo ? Number(salaryTo) : undefined,
          remote_work: remoteWork || undefined,
        })
        setJobs(data, paramsKey)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [paramsKey]) // <-- только paramsKey, не все фильтры по отдельности

  // Отдельный эффект для избранного/откликов — только при смене авторизации
  useEffect(() => {
    if (!isAuthenticated) return
    const fetchUserData = async () => {
      try {
        const [favorites, applications] = await Promise.all([getFavorites(), getMyApplications()])
        setFavorites(new Map(favorites.map((f) => [f.vacancy_id, f.id])))
        setApplied(new Set(applications.map((a) => a.vacancy_id)))
      } catch (e) {
        console.error(e)
      }
    }
    fetchUserData()
  }, [isAuthenticated]) // <-- только авторизация

  useEffect(() => {
    setCurrentPage(1)
  }, [paramsKey, category])

  const filteredJobs =
    category === 'all' ? jobs : jobs.filter((j) => j.category === category)

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)
  const currentJobs = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="lg:hidden block">
        <SearchBar />
      </div>

      {loading ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredJobs.length === 0 ? (
        <p className="text-center py-10 text-muted-foreground">Ничего не найдено</p>
      ) : (
        <>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-3">
            {currentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
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
  )
}
