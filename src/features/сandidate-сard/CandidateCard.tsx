'use client'
import { Button } from '@/shared/ui/button'
import { MapPin, Mail, User, Calendar, Briefcase, GraduationCap } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface CandidateCardProps {
  candidate: any
  onInvite?: (candidateId: string) => void
  listIndex?: number
  totalCount?: number
}

export default function CandidateCard({ candidate, onInvite }: CandidateCardProps) {
  const router = useRouter()

  const positionTitle = candidate.position || `Кандидат #${candidate.id}`
  const candidateName = candidate.first_name
    ? `${candidate.first_name} ${candidate.last_name || ''}`
    : `Кандидат #${candidate.user_id || candidate.id}`

  const skills = candidate.skills || []

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    router.push(`/employer/candidate/${candidate.id}`)
  }

  const birthDate = candidate.birth_date ? new Date(candidate.birth_date) : null
  const age = birthDate ? new Date().getFullYear() - birthDate.getFullYear() : 0

  let xpYears = 0
  if (candidate.work_experience && candidate.work_experience.length > 0) {
    candidate.work_experience.forEach((xp: any) => {
      const start = xp.start_year || 0
      const end = xp.until_now ? new Date().getFullYear() : xp.end_year || start
      if (start && end) xpYears += end - start
    })
  }
  const experienceText = xpYears > 0 ? `Опыт ${xpYears} лет` : 'Без опыта'

  function getAgeString(y: number) {
    if (!y) return ''
    const r = y % 10
    if (y >= 11 && y <= 14) return `${y} лет`
    if (r === 1) return `${y} год`
    if (r >= 2 && r <= 4) return `${y} года`
    return `${y} лет`
  }

  const primarySkillsText = skills.slice(0, 3).join(' · ')
  const statusText = candidate.id % 2 === 0 ? 'Активен сегодня' : 'Открыт к предложениям'

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-[24px] p-5 sm:p-6 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] cursor-pointer hover:border-primary/20 transition-all flex gap-4"
    >
      {/* Avatar */}
      <div className="shrink-0 pt-0.5">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
          {candidate.photo ? (
            <img src={candidate.photo} alt={candidateName} className="w-full h-full object-cover" />
          ) : (
            <User size={24} />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* TOP ROW: name+position left, salary right — always side by side */}
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0">
            <div className="text-[12px] font-medium text-slate-400 mb-0.5 truncate">
              {candidateName}
            </div>
            <h3 className="text-[17px] sm:text-[19px] font-bold text-slate-900 leading-tight">
              {positionTitle}
            </h3>
            {primarySkillsText && (
              <p className="text-[13px] font-medium text-primary mt-1">{primarySkillsText}</p>
            )}
          </div>

          {/* Salary — always top-right, never wraps below */}
          <div className="text-right shrink-0 pl-1">
            <div className="text-[15px] sm:text-[17px] font-bold text-slate-900 whitespace-nowrap">
              {candidate.salary_net
                ? `${candidate.salary_net.toLocaleString('ru-RU')} сом`
                : 'Договорная'}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">в месяц</div>
          </div>
        </div>

        {/* META ROW: city, age, experience, education */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-3">
          {candidate.city && (
            <span className="flex items-center gap-1 text-[12px] sm:text-[13px] text-slate-500">
              <MapPin size={13} className="text-slate-400 shrink-0" />
              {candidate.city}
            </span>
          )}
          {age > 0 && (
            <span className="flex items-center gap-1 text-[12px] sm:text-[13px] text-slate-500">
              <Calendar size={13} className="text-slate-400 shrink-0" />
              {getAgeString(age)}
            </span>
          )}
          <span className="flex items-center gap-1 text-[12px] sm:text-[13px] text-slate-500">
            <Briefcase size={13} className="text-slate-400 shrink-0" />
            {experienceText}
          </span>
          {candidate.education && (
            <span className="flex items-center gap-1 text-[12px] sm:text-[13px] text-slate-500 max-w-[160px]">
              <GraduationCap size={13} className="text-slate-400 shrink-0" />
              <span className="truncate">{candidate.education.split(/[.,]/)[0]}</span>
            </span>
          )}
        </div>

        {/* DESCRIPTION */}
        {candidate.description && (
          <p className="text-[13px] text-slate-500 mt-3 line-clamp-2 leading-relaxed">
            {candidate.description}
          </p>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {skills.slice(0, 5).map((skill: string, idx: number) => (
              <span
                key={skill}
                className={`px-3 py-1.5 rounded-[9px] text-[12px] font-medium ${
                  idx < 3 ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {skill}
              </span>
            ))}
            {skills.length > 5 && (
              <span className="px-3 py-1.5 bg-slate-100 text-slate-500 rounded-[9px] text-[12px] font-medium">
                +{skills.length - 5}
              </span>
            )}
          </div>
        )}

        {/* FOOTER: status + button — always in one row */}
        <div className="flex items-center justify-between gap-3 mt-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-[12px] sm:text-[13px] font-medium shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            {statusText}
          </span>

          <Button
            onClick={(e) => {
              e.stopPropagation()
              router.push('/chat')
            }}
            className="h-9 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-1.5 text-[13px] font-medium shrink-0 shadow-none"
          >
            <Mail size={14} />
            Связаться
          </Button>
        </div>
      </div>
    </div>
  )
}
