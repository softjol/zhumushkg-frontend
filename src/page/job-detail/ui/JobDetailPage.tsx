'use client'

import CompanyIcon from '@/features/company-icon/CompanyIcon'
import { jobsData } from '@/page/jobs/model/mockData'
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
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface JobDetailPageProps {
  jobId: string
}

export const JobDetailPage = ({ jobId }: JobDetailPageProps) => {
  const router = useRouter()
  const params = useParams()
  const [isFav, setIsFav] = useState(false)
  const [applied, setApplied] = useState(false)
  const resolvedId = jobId || (params?.id as string)
  const job = jobsData.find((j) => j.id === resolvedId)

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
    { icon: Briefcase, label: 'Опыт', value: job.experience },
    { icon: MapPin, label: 'Город', value: job.city },
    ...(job.address ? [{ icon: Building2, label: 'Адрес', value: job.address }] : []),
    { icon: Clock, label: 'График', value: job.schedule },
    { icon: Globe, label: 'Удалённая работа', value: job.remote ? 'Да' : 'Нет' },
    ...(job.salaryPeriod
      ? [{ icon: Calendar, label: 'Период оплаты', value: job.salaryPeriod }]
      : []),
    { icon: DollarSign, label: 'Зарплата', value: job.salary || 'По договорённости' },
  ]

  return (
    <div className="min-h-screen bg-background ">
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
            onClick={() => setIsFav(!isFav)}
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
              {job.title}
            </h1>
            <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setIsFav(!isFav)}
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
              Опубликовано: {job.date}
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
        {job.responsibilities && job.responsibilities.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-2">Обязанности</h3>
            <ul className="space-y-1.5">
              {job.responsibilities.map((r, i) => (
                <li key={i} className="text-base text-black font-medium flex items-start gap-2">
                  <span className="w-[5px] h-[5px] rounded-full bg-black mt-2 flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Requirements */}
        {job.requirements && job.requirements.length > 0 && (
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
        )}

        {/* Conditions */}
        {job.conditions && job.conditions.length > 0 && (
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
        )}
      </div>

      {/* Fixed bottom bar */}
      <div className="fixed bottom-[71px] lg:bottom-0 left-0 right-0 lg:left-[260px] bg-background border-t border-border p-4 z-20">
        <div className="max-w-3xl mx-auto flex gap-3 flex justify-center">
          {applied ? (
            <>
              <Button
                disabled
                className="max-w-[380px] flex-1 rounded-2xl h-12 bg-muted text-muted-foreground"
              >
                Вы откликнулись ✓
              </Button>
              <Button
                variant="outline"
                className="hidden md:block text-lg flex-1 rounded-2xl h-12"
                onClick={() => router.push('/chat')}
              >
                Написать
              </Button>
            </>
          ) : (
            <>
              <Button
                className="max-w-[380px] flex-1 rounded-2xl h-12"
                onClick={() => setApplied(true)}
              >
                Откликнуться
              </Button>
              <Button
                variant="outline"
                className="hidden md:block flex-1 rounded-2xl h-12"
                onClick={() => router.push('/chat')}
              >
                Написать
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
