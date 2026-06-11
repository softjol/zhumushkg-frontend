'use client'

import { addToFavorites, getFavorites, removeFromFavorites } from '@/entities/favorites/api'
import { useFavoritesStore } from '@/entities/favorites/model/store'
import { getVacancyById } from '@/entities/job/api'
import { Job } from '@/entities/job/model/types'
import { useUserStore } from '@/entities/user/model/store'
import { AuthRequiredModal } from '@/widgets/auth-required/ui/AuthRequiredModal'
import { createConversation, getConversations } from '@/entities/chat/api'
import CompanyIcon from '@/features/company-icon/CompanyIcon'
import { Button } from '@/shared/ui/button'
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Briefcase,
  Clock,
  Globe,
  DollarSign,
  Building2,
  Calendar,
  BadgeCent,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { formatDate } from '@/shared/lib/formatDate'
import { useApplicationsStore } from '@/entities/applications/model/store'
// import { getMyApplications } from '@/entities/applications/api'
import { JobDetailPageSkeleton } from './JobDetailPageSkeleton'

interface JobDetailPageProps {
  jobId: number
}

export const JobDetailPage = ({ jobId }: JobDetailPageProps) => {
  const { isAuthenticated, token } = useUserStore()
  const [job, setJob] = useState<Job | null>(null)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)

  const { isApplied } = useApplicationsStore()
  const applied = isApplied(jobId)

  const { isFavorite, getFavoriteId, addFavorite, removeFavorite, setFavorites } =
    useFavoritesStore()

  const isFav = isFavorite(jobId)
  const favoriteId = getFavoriteId(jobId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises: Promise<any>[] = [getVacancyById(jobId)]

        if (isAuthenticated) {
          promises.push(
            getFavorites().then((list) => {
              setFavorites(new Map(list.map((f) => [f.vacancy_id, f.id])))
            }),
            // getMyApplications().then((apps) => {
            //   setApplied(new Set(apps.map((a) => a.vacancy_id)))
            // }),
          )
        }

        const [jobData] = await Promise.all(promises)
        setJob(jobData)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [jobId, isAuthenticated])

  const handleFav = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }

    try {
      if (favoriteId) {
        await removeFromFavorites(favoriteId)
        removeFavorite(jobId)
      } else {
        const newFavorite = await addToFavorites(jobId)
        addFavorite(jobId, newFavorite.id)
      }
    } catch (e) {
      console.error(e)
    }
  }

  // OLD: handleApply (resume check + applyToVacancy)
  // const handleApply = async () => {
  //   if (!isAuthenticated) {
  //     setShowAuthModal(true)
  //     return
  //   }
  //   try {
  //     const resume = await getMyResume()
  //     if (!resume) {
  //       setShowResumeModal(true)
  //       return
  //     }
  //     await applyToVacancy({ vacancy_id: jobId, resume_id: resume.id })
  //     addApplied(jobId)
  //   } catch (e) {
  //     console.error(e)
  //     alert('Произошла ошибка при отправке отклика. Пожалуйста, попробуйте снова.')
  //   }
  // }

  const handleApply = () => {
    if (job?.company_description) {
      window.open(job.company_description, '_blank')
    }
  }

  const handleChat = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
    try {
      const existing = await getConversations(token!)
      const found = existing.find((c) => c.vacancy_id === jobId)
      if (found) {
        router.push(`/chat/${found.id}`)
      } else {
        const conv = await createConversation(token!, String(jobId))
        router.push(`/chat/${conv.id}`)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url)
    } else {
      const el = document.createElement('textarea')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    toast.success('Ссылка скопирована')
  }

  if (loading) return <JobDetailPageSkeleton/>
  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center text-red-500">
        <p className="text-5xl mb-4">😕</p>
        <h2 className="text-lg font-semibold">Вакансия больше не активна</h2>
        <p className="text-base text-muted-foreground mt-1">
          Возможно, она была закрыта или удалена
        </p>
        <Button className="mt-6 rounded-xl" onClick={() => router.push('/')}>
          Посмотреть другие вакансии
        </Button>
      </div>
    )
  }

  const meta = [
    { icon: Briefcase, label: 'Опыт', value: job.experience_work },
    { icon: MapPin, label: 'Город', value: job.city },
    ...(job.work_address ? [{ icon: Building2, label: 'Адрес', value: job.work_address }] : []),
    { icon: Clock, label: 'График', value: job.work_schedule },
    { icon: Globe, label: 'Удалённая работа', value: job.remote_work ? 'Да' : 'Нет' },
    ...(job.payment_period
      ? [{ icon: Calendar, label: 'Период оплаты', value: job.payment_period }]
      : []),
    { icon: BadgeCent, label: 'Зарплата', value: job.salary_net ? String(job.salary_net) : 'Договорная' },
  ]
  return (
    <div className="min-h-screen bg-background ">
      <AuthRequiredModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />

      {/* Header */}
      <header className="sticky top-0 z-20 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl hover:bg-muted transition-colors flex-shrink-0"
          >
            <ArrowLeft size={22} />
          </button>
          <span className="font-semibold text-base truncate">Детальная страница</span>
        </div>
        <div className="flex lg:hidden items-center gap-1 flex-shrink-0">
          <button
            onClick={handleFav}
            className="p-2 rounded-xl hover:bg-muted transition-colors"
            title={isFav ? 'Удалить из избранного' : 'Добавить в избранное'}
          >
            <Heart
              size={22}
              className={isFav ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}
            />
          </button>
          <button onClick={handleShare} className="p-2 rounded-xl hover:bg-muted transition-colors" title="Поделиться">
            <Share2 size={22} className="text-muted-foreground" />
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-5 lg:px-6 py-6 pb-28 space-y-6 animate-fade-in">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-bold text-foreground break-words flex-1 min-w-0">
              {job.position}
            </h1>
            <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleFav}
                className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                title={isFav ? 'Удалить из избранного' : 'Добавить в избранное'}
              >
                <Heart
                  size={22}
                  className={isFav ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}
                />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                title="Поделиться"
              >
                <Share2 size={22} className="text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className=" flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-2">
            <div className="flex items-center gap-2">
              <CompanyIcon company={job.company} />
              <span className="text-lg font-medium text-muted-foreground">{job.company}</span>
            </div>
            <div className="w-full flex items-center gap-3 justify-between sm:justify-start lg:justify-end">
              <span className="text-sm font-medium text-muted-foreground lg:order-2">
                Опубликовано: {formatDate(job.createdAt)}
              </span>

              {/* <div className="flex items-center gap-1 mx-1 text-gray-400 text-sm lg:order-1">
                <Eye size={16} />
                {job.views}
                <Heart size={16} className="ml-2" />
                {job.favorite}
              </div> */}
            </div>
          </div>
        </div>
        {/* Meta */}
        <div className="bg-muted rounded-2xl p-4 space-y-3">
          {meta.map((m, i) => (
            <div key={i} className="flex items-center gap-3">
              <m.icon size={16} className="text-muted-foreground flex-shrink-0" />
              <span className="text-base text-muted-foreground w-36">{m.label}</span>
              <span className="text-base font-medium text-foreground">{m.value}</span>
            </div>
          ))}
        </div>
        {/* Responsibilities */}
        {job.description && (
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-2">Описание</h3>
            <ul className="space-y-1.5">
              <li className="text-base text-black font-medium flex items-start gap-2">
                <span className="w-[5px] h-[5px] rounded-full bg-black mt-2 flex-shrink-0" />
                {job.description}
              </li>
            </ul>
          </section>
        )}
        {job.requirements && (
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-2">Требования</h3>
            <ul className="space-y-1.5">
              <li className="text-base text-black font-medium flex items-start gap-2">
                <span className="w-[5px] h-[5px] rounded-full bg-black mt-2 flex-shrink-0" />
                {job.requirements}
              </li>
            </ul>
          </section>
        )}{' '}
        {job.conditions && (
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-2">Условия</h3>
            <ul className="space-y-1.5">
              <li className="text-base text-black font-medium flex items-start gap-2">
                <span className="w-[5px] h-[5px] rounded-full bg-black mt-2 flex-shrink-0" />
                {job.conditions}
              </li>
            </ul>
          </section>
        )}
      </div>

      {/* Fixed bottom bar */}
      <div className="fixed bottom-[71px] lg:bottom-0 left-0 right-0 lg:left-[260px] bg-background border-t border-border p-4 z-20">
        <div className="max-w-3xl mx-auto flex gap-3 flex justify-center">
          <Button
            className="max-w-[380px] flex-1 rounded-2xl h-12"
            onClick={handleApply}
            disabled={applied}
          >
            {applied ? 'Вы откликнулись ✓' : 'Откликнуться'}
          </Button>
          {/* <Button
            variant="outline"
            className="hidden md:block flex-1 rounded-2xl h-12"
            onClick={handleChat}
          >
            Написать
          </Button> */}
        </div>
      </div>
    </div>
  )
}
