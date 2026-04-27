'use client'
import { JobCard } from '@/entities/job/ui/JobCard'
import { useState, useEffect } from 'react'
import { Job } from '@/entities/job/model/types'
import { getVacancies } from '@/entities/job/api'
import { SearchBar } from '@/features/search-bar/ui/SearchBar'
import { useUserStore } from '@/entities/user/model/store'
import { getFavorites } from '@/entities/favorites/api'
import { useFavoritesStore } from '@/entities/favorites/model/store'
import { Pagination } from '@/features/pagination/Pagination'

export const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [favoritesMap, setFavoritesMap] = useState<Map<number, number>>(new Map())
  const { isAuthenticated } = useUserStore.getState()
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 9

  const { setFavorites } = useFavoritesStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getVacancies()
        setJobs(data)

        if (isAuthenticated) {
          const favorites = await getFavorites()
          setFavorites(new Map(favorites.map((f) => [f.vacancy_id, f.id])))
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [isAuthenticated])

  const totalPages = Math.ceil(jobs.length / jobsPerPage)
  const currentJobs = jobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0 })
  }

  const handleFavoriteChange = (vacancyId: number, favoriteId: number | null) => {
    setFavoritesMap((prev) => {
      const next = new Map(prev)
      if (favoriteId === null) {
        next.delete(vacancyId)
      } else {
        next.set(vacancyId, favoriteId)
      }
      return next
    })
  }

  if (loading) return <p className="text-center py-10">Загрузка...</p>

  return (
    <div className="w-full overflow-hidden">
      <div className="lg:hidden block">
        <SearchBar />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-3">
        {currentJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isFavProps={favoritesMap.has(job.id)}
            favoriteIdProps={favoritesMap.get(job.id) ?? null}
            onFavoriteChange={handleFavoriteChange}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
