'use client'

import { addToFavorites, getFavorites, removeFromFavorites } from '@/entities/favorites/api'
import { useFavoritesStore } from '@/entities/favorites/model/store'
import { getVacancyById } from '@/entities/job/api'
import { Job } from '@/entities/job/model/types'
import { useUserStore } from '@/entities/user/model/store'
import { AuthRequiredModal } from '@/widgets/auth-required/ui/AuthRequiredModal'
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
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface JobDetailPageProps {
  jobId: number
}

export const JobDetailPage = ({ jobId }: JobDetailPageProps) => {
  const { isAuthenticated } = useUserStore()
  const [job, setJob] = useState<Job | null>(null)
  const router = useRouter()
  const [applied, setApplied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)

  const { isFavorite, getFavoriteId, addFavorite, removeFavorite, setFavorites } =
    useFavoritesStore()

  const isFav = isFavorite(jobId)
  const favoriteId = getFavoriteId(jobId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [job] = await Promise.all([
          getVacancyById(jobId),
          isAuthenticated
            ? getFavorites().then((list) => {
                const map = new Map(list.map((f) => [f.vacancy_id, f.id]))
                setFavorites(map)
              })
            : Promise.resolve(),
        ])
        setJob(job)
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

  const handleApply = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
    setApplied(true)
    // TODO: API вызов
  }

  const handleChat = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
    router.push('/chat')
  }

  if (loading) return <p className="text-center py-10">Загрузка...</p>

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
    { icon: DollarSign, label: 'Зарплата', value: job.salary_net || 'По договорённости' },
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
          <button className="p-2 rounded-xl hover:bg-muted transition-colors" title="Поделиться">
            <Share2 size={22} className="text-muted-foreground" />
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 lg:px-6 py-6 pb-28 space-y-6 animate-fade-in">
        {/* ... existing content ... */}
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
                className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                title="Поделиться"
              >
                <Share2 size={22} className="text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CompanyIcon company={job.company} />
              <span className="text-lg font-medium text-muted-foreground">{job.company}</span>
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Опубликовано: {job.createdAt}
            </span>
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
        {job.requir_respons && job.requir_respons.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-2">Обязанности</h3>
            <ul className="space-y-1.5">
              {/* {job.responsibilities.map((r, i) => (
                <li key={i} className="text-base text-black font-medium flex items-start gap-2">
                  <span className="w-[5px] h-[5px] rounded-full bg-black mt-2 flex-shrink-0" />
                  {r}
                </li>
              ))} */}
              <li className="text-base text-black font-medium flex items-start gap-2">
                <span className="w-[5px] h-[5px] rounded-full bg-black mt-2 flex-shrink-0" />
                {job.requir_respons}
              </li>
            </ul>
          </section>
        )}

        {/* Requirements */}
        {/* {job.requirements && job.requirements.length > 0 && (
          <section>
            <h3 className="font-semibold text-black text-lg mb-2">Требования</h3>
            <ul className="space-y-1.5">
              {job.requirements.map((r, i) => (
                <li key={i} className="text-base text-black font-medium flex items-start gap-2">
                  <span className="w-[5px] h-[5px] rounded-full bg-black mt-2 flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </section>
        )} */}

        {/* Conditions */}
        {/* {job.conditions && job.conditions.length > 0 && (
          <section>
            <h3 className="font-semibold text-black text-lg  mb-2">Условия</h3>
            <ul className="space-y-1.5">
              {job.conditions.map((c, i) => (
                <li key={i} className="text-base text-black font-medium flex items-start gap-2">
                  <span className="w-[5px] h-[5px] rounded-full bg-black mt-2 flex-shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </section>
        )} */}
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
          <Button
            variant="outline"
            className="hidden md:block flex-1 rounded-2xl h-12"
            onClick={handleChat}
          >
            Написать
          </Button>
        </div>
      </div>
    </div>
  )
}
