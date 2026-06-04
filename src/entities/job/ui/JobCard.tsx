'use client'

import { Heart, MapPin, BriefcaseBusiness, Clock } from 'lucide-react'
import { useState } from 'react'
import { useApplicationsStore } from '@/entities/applications/model/store'
import { Job } from '../model/types'
import Link from 'next/link'
import CompanyIcon from '@/features/company-icon/CompanyIcon'
import { Button } from '@/shared/ui/button'
import { useUserStore } from '@/entities/user/model/store'
import { AuthRequiredModal } from '@/widgets/auth-required/ui/AuthRequiredModal'
import { addToFavorites, removeFromFavorites } from '@/entities/favorites/api'
import { useFavoritesStore } from '@/entities/favorites/model/store'
import { formatDate } from '@/shared/lib/formatDate'

interface JobCardProps {
  job: Job
  isFavProps?: boolean
  favoriteIdProps?: number | null
  onFavoriteChange?: (vacancyId: number, favoriteId: number | null) => void
}

export const JobCard = ({ job, isFavProps, favoriteIdProps, onFavoriteChange }: JobCardProps) => {
  const { isAuthenticated } = useUserStore()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const { isApplied } = useApplicationsStore()
  const applied = isApplied(job.id)

  // OLD: handleApply (resume check + applyToVacancy)
  // const handleApply = async (e: React.MouseEvent) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   if (!isAuthenticated) {
  //     setShowAuthModal(true)
  //     return
  //   }
  //   try {
  //     const resume = await getMyResume()
  //     if (!resume) {
  //       setShowNoResumeModal(true)
  //       return
  //     }
  //     await applyToVacancy({ vacancy_id: job.id, resume_id: resume.id })
  //     addApplied(job.id)
  //   } catch (e) {
  //     console.error(e)
  //     alert('Произошла ошибка при отправке отклика. Пожалуйста, попробуйте снова.')
  //   }
  // }

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (job.company_description) {
      window.open(job.company_description, '_blank')
    }
  }

  const { isFavorite, getFavoriteId, addFavorite, removeFavorite } = useFavoritesStore()

  const isFav = isFavorite(job.id)
  const favoriteId = getFavoriteId(job.id)

  const handleFav = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }

    try {
      if (favoriteId) {
        await removeFromFavorites(favoriteId)
        removeFavorite(job.id) // ← обновляем глобальный стор
      } else {
        const newFavorite = await addToFavorites(job.id)
        addFavorite(job.id, newFavorite.id) // ← обновляем глобальный стор
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <AuthRequiredModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />

      <Link
        href={`/jobs/${job.id}`}
        className="block w-full bg-card rounded-2xl p-5 hover:shadow-xl transition-all group animate-fade-in overflow-hidden shadow lg:hover:shadow-xl lg:ease-in lg:duration-100"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {job.position}
              </h3>
            </div>
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap mt-1">
              <span>{formatDate(job.createdAt)}</span>
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <CompanyIcon company={job.company} />
              <span className="text-sm font-medium text-muted-foreground">{job.company}</span>
              <span className="inline-flex items-center gap-1 text-xs text-primary bg-primary-light px-2 py-0.5 rounded-full">
                <MapPin size={12} />
                {job.city}
              </span>
              {/* <div className="flex items-center gap-2 ml-3 text-sm text-gray-400 font-medium">
                <span className="flex items-center gap-1 ">
                  <Eye size={16} />
                  {job.views}
                </span>{' '}
                <span className="flex items-center gap-1 ">
                  <Heart size={16} />
                  {job.favorite}
                </span>
              </div> */}
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-2.5">
              {(job.work_schedule === 'Свободный график' ||
                job.work_schedule === 'Неполный день') && (
                <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[#E8F5E9] bg-[#00838F] px-2.5 py-1 rounded-lg">
                  <Clock size={14} className="text-[#E8F5E9]" />
                  Подработка
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-[13px] font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-lg">
                <MapPin size={14} className="text-muted-foreground/70" />
                {job.remote_work ? 'Удаленно' : 'Офлайн'}
              </span>
              <span className="inline-flex items-center gap-1 text-[13px] font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-lg">
                <BriefcaseBusiness size={14} className="text-muted-foreground/70" />
                {job.experience_work}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-3 text-base font-bold text-foreground">
          {job.salary_net > 1 ? (
            <>
              {job.salary_net}
              {job.payment_period && (
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  {job.payment_period}
                </span>
              )}
            </>
          ) : (
            'Договорная'
          )}
        </p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex-1">
            <Button
              className={`w-[200px] h-10 text-sm font-semibold rounded-2xl transition-all shadow-sm ${
                applied
                  ? 'bg-muted text-muted-foreground'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
              onClick={handleApply}
              disabled={applied}
            >
              {applied ? 'Вы откликнулись ✓' : 'Откликнуться'}
            </Button>
          </div>

          <div className="flex items-center ">
            <button
              onClick={handleFav}
              className="p-2 rounded-full hover:bg-muted transition-colors flex-shrink-0 border border-transparent hover:border-border"
            >
              <Heart
                size={24}
                className={isFav ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}
              />
            </button>
          </div>
        </div>
      </Link>
    </>
  )
}
