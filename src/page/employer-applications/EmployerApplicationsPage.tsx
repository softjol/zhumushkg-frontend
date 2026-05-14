'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowLeft, Inbox } from 'lucide-react'
import { getVacancyCandidates, updateApplicationStatus } from '@/entities/applications/api'
import { VacancyCandidate } from '@/entities/applications/model/type'
import { ApplicantCard } from './ApplicantCard'
import { ApplicantCardSkeleton } from './ApplicantCardSkeleton'

interface EmployerApplicationsPageProps {
  vacancyId: number
}

const tabs = [
  { key: 'all', label: 'Все' },
  { key: 'NEW', label: 'Новые' },
  { key: 'HIRED', label: 'Принятые' },
  { key: 'REJECTED', label: 'Отказ' },
]

export const EmployerApplicationsPage = ({ vacancyId }: EmployerApplicationsPageProps) => {
  const router = useRouter()
  const [candidates, setCandidates] = useState<VacancyCandidate[]>([])
  const [activeTab, setActiveTab] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getVacancyCandidates(vacancyId)
      .then(setCandidates)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [vacancyId])

  const filtered =
    activeTab === 'all' ? candidates : candidates.filter((c) => c.status === activeTab)

  const handleStatusUpdate = async (applicationId: number, status: string) => {
    try {
      await updateApplicationStatus(applicationId, status)
      setCandidates((prev) =>
        prev.map((c) =>
          c.id === applicationId ? { ...c, status: status as VacancyCandidate['status'] } : c,
        ),
      )
    } catch (e) {
      console.error(e)
    }
  }

  if (loading)
    return (
      <div className="px-4 lg:px-6 py-4 lg:py-6 space-y-3 max-w-3xl mx-auto">
        {Array.from({ length: 3 }).map((_, i) => (
          <ApplicantCardSkeleton key={i} />
        ))}
      </div>
    )

  return (
    <div className="px-4 lg:px-6 py-4 lg:py-6 space-y-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-xl hover:bg-muted transition-colors border border-transparent hover:border-border"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-foreground">Отклики</h1>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 max-w-3xl mx-auto touch-pan-x overscroll-x-contain">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`shrink-0 px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap border ${
              activeTab === tab.key
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'bg-muted/50 text-muted-foreground border-transparent hover:border-border'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-muted/20 border border-dashed border-border/50 rounded-3xl">
          <Inbox size={48} className="mx-auto text-muted-foreground mb-4 opacity-30" />
          <p className="font-semibold text-foreground text-lg">Пока нет откликов</p>
          <p className="text-sm text-muted-foreground mt-1">
            Как только появятся новые отклики, они отобразятся здесь
          </p>
        </div>
      ) : (
        <div className="grid gap-3 max-w-3xl mx-auto">
          {filtered.map((item) => (
            <ApplicantCard key={item.id} item={item} onStatusUpdate={handleStatusUpdate} />
          ))}
        </div>
      )}
    </div>
  )
}
