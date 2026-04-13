'use client'
import { Heart, Eye, MapPin, BriefcaseBusiness, Clock } from 'lucide-react'
import { useState } from 'react'
import { Job } from '../model/types'
import Link from 'next/link'
import CompanyIcon from '@/features/company-icon/CompanyIcon'
import { Button } from '@/shared/ui/button'
import { useRouter } from 'next/navigation'

const formatJobDate = (date: string) => {
  if (date === 'сегодня' || date === 'вчера') return date
  if (date === '1 день назад') return 'вчера'
  if (date === '2 дня назад') return '4 апр'
  if (date === '3 дня назад') return '3 апр'
  return date
}
interface JobCardProps {
  job: Job
}

export const JobCard = ({ job }: JobCardProps) => {
  const [isFav, setIsFav] = useState(job.isFavorite ?? false)
  const [applied, setApplied] = useState(false)

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="block w-full bg-card rounded-2xl p-5 hover:shadow-xl transition-all group animate-fade-in overflow-hidden shadow lg:hover:shadow-xl lg:ease-in lg:duration-100"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
              {job.title}
            </h3>
          </div>
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap mt-1">
            {formatJobDate(job.date)}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <CompanyIcon company={job.company} />
            <span className="text-sm font-medium text-muted-foreground">{job.company}</span>
            <span className="inline-flex items-center gap-1 text-xs text-primary bg-primary-light px-2 py-0.5 rounded-full ">
              <MapPin size={12} />
              {job.city}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-2.5">
            {(job.schedule === 'Свободный график' || job.schedule === 'Неполный день') && (
              <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[#E8F5E9] bg-[#00838F] px-2.5 py-1 rounded-lg">
                <Clock size={14} className="text-[#E8F5E9]" />
                Подработка
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[13px] font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-lg">
              <MapPin size={14} className="text-muted-foreground/70" />
              {job.remote ? 'Удаленно' : 'Офлайн'}
            </span>
            <span className="inline-flex items-center gap-1 text-[13px] font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-lg">
              <BriefcaseBusiness size={14} className="text-muted-foreground/70" />
              {job.experience}
            </span>
          </div>
        </div>
      </div>

      {job.salary && (
        <p className="mt-3 text-base font-bold text-foreground">
          {job.salary}
          {job.salaryPeriod && (
            <span className="text-base font-normal text-muted-foreground ml-1">
              {job.salaryPeriod}
            </span>
          )}
        </p>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="flex-1">
          <Button
            className={`w-[200px] h-10 text-sm font-semibold rounded-2xl transition-all shadow-sm ${
              applied
                ? 'bg-muted text-muted-foreground'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setApplied(true)
            }}
            disabled={applied}
          >
            {applied ? 'Вы откликнулись ✓' : 'Откликнуться'}
          </Button>
        </div>

        <div className="flex items-center gap-3 ml-4">
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsFav(!isFav)
            }}
            className="p-2 rounded-full hover:bg-muted transition-colors flex-shrink-0 border border-transparent hover:border-border"
          >
            <Heart
              size={23}
              className={isFav ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}
            />
          </button>
        </div>
      </div>
    </Link>
  )
}
