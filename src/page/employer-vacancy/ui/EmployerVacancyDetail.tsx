'use client'

import CompanyIcon from '@/features/company-icon/CompanyIcon'
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Clock,
  Globe,
  DollarSign,
  Building2,
  Calendar,
  MoreVertical,
  Pencil,
  Trash2,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { formatDate } from '@/shared/lib/formatDate'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { Job } from '@/entities/job/model/types'
import { getVacancyById } from '@/entities/job/api'
import { EmployerVacancyDetailSkeleton } from './EmployerVacancyDetailSkeleton'
import { deleteVacancy } from '@/entities/vacancy/api'

interface vacancyDetailPageProps {
  vacancyId: number
}

export const EmployerVacancyDetail = ({ vacancyId }: vacancyDetailPageProps) => {
  const router = useRouter()
  const [vacancy, setVacancy] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getVacancyById(vacancyId)
        setVacancy(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [vacancyId])

  if (loading) return <EmployerVacancyDetailSkeleton />
  if (vacancy === null) return
  const meta = [
    { icon: Briefcase, label: 'Опыт', value: vacancy.experience_work },
    { icon: MapPin, label: 'Город', value: vacancy.city },
    ...(vacancy.work_address
      ? [{ icon: Building2, label: 'Адрес', value: vacancy.work_address }]
      : []),
    { icon: Clock, label: 'График', value: vacancy.work_schedule },
    { icon: Globe, label: 'Удалённая работа', value: vacancy.remote_work ? 'Да' : 'Нет' },
    ...(vacancy.payment_period
      ? [{ icon: Calendar, label: 'Период оплаты', value: vacancy.payment_period }]
      : []),
    { icon: DollarSign, label: 'Зарплата', value: vacancy.salary_net || 'По договорённости' },
  ]
  const handleDelete = async (id: number) => {
    try {
      router.push('/employer/vacancies')
      await deleteVacancy(id)
    } catch (e) {
      console.log(e)
    }
  }
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
        <div className="inline lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 rounded-lg hover:bg-gray-200 bg-gray-100">
                <MoreVertical size={22} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[180px] rounded-2xl p-1.5 shadow-xl border-border/50"
              style={{ zIndex: 300 }}
            >
              <DropdownMenuItem
                className="gap-2.5 rounded-xl py-2.5 text-base"
                onClick={() => router.push(`/employer/edit-vacancy/${vacancy.id}`)}
              >
                <Pencil size={18} /> Редактировать
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2.5 rounded-xl py-2.5 text-base text-destructive"
                onClick={() => handleDelete(vacancy.id)}
              >
                <Trash2 size={18} /> Удалить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-5 lg:px-6 py-6 pb-28 space-y-6 animate-fade-in">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-bold text-foreground break-words flex-1 min-w-0">
              {vacancy.position}
            </h1>
            <div className="hidden lg:inline">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1.5 rounded-lg hover:bg-gray-200 bg-gray-100">
                    <MoreVertical size={22} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-[180px] rounded-2xl p-1.5 shadow-xl border-border/50"
                  style={{ zIndex: 300 }}
                >
                  <DropdownMenuItem
                    className="gap-2.5 rounded-xl py-2.5 text-base"
                    onClick={() => router.push(`/employer/edit-vacancy/${vacancy.id}`)}
                  >
                    <Pencil size={18} /> Редактировать
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="gap-2.5 rounded-xl py-2.5 text-base text-destructive"
                    onClick={() => handleDelete(vacancy.id)}
                  >
                    <Trash2 size={18} /> Удалить
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-2">
            <div className="flex items-center gap-2">
              <CompanyIcon company={vacancy.company} />
              <span className="text-lg font-medium text-muted-foreground">{vacancy.company}</span>
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Опубликовано: {formatDate(vacancy.createdAt)}
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
        {vacancy.description && (
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-2">Обязанности</h3>
            <ul className="space-y-1.5">
              <li className="text-base text-black font-medium flex items-start gap-2">
                <span className="w-[5px] h-[5px] rounded-full bg-black mt-2 flex-shrink-0" />
                {vacancy.description}
              </li>
            </ul>
          </section>
        )}
        {vacancy.requirements && (
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-2">Требования</h3>
            <ul className="space-y-1.5">
              <li className="text-base text-black font-medium flex items-start gap-2">
                <span className="w-[5px] h-[5px] rounded-full bg-black mt-2 flex-shrink-0" />
                {vacancy.requirements}
              </li>
            </ul>
          </section>
        )}{' '}
        {vacancy.conditions && (
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-2">Условия</h3>
            <ul className="space-y-1.5">
              <li className="text-base text-black font-medium flex items-start gap-2">
                <span className="w-[5px] h-[5px] rounded-full bg-black mt-2 flex-shrink-0" />
                {vacancy.conditions}
              </li>
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
