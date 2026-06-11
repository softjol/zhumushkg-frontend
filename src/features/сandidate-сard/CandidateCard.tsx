'use client'
import { Resume } from '@/entities/resume/model/types'
import { getUserById } from '@/entities/user/api'
import { useUserStore } from '@/entities/user/model/store'
import { openConversationWithCandidate } from '@/entities/chat/api'
import { calculateAge } from '@/shared/lib/calculateAge'
import { Button } from '@/shared/ui/button'
import CompanyIcon from '@/features/company-icon/CompanyIcon'
import { MapPin, Mail, Calendar, GraduationCap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface CandidateCardProps {
  candidate: Resume
  onInvite?: (candidateId: string) => void
  listIndex?: number
  totalCount?: number
}

export default function CandidateCard({ candidate }: CandidateCardProps) {
  const router = useRouter()
  const { token } = useUserStore()
  const [candidateName, setCandidateName] = useState('')
  const [contacting, setContacting] = useState(false)

  useEffect(() => {
    getUserById(candidate.user_id, token)
      .then((data) => setCandidateName(data.firstName ?? ''))
      .catch(() => {})
  }, [candidate.user_id, token])

  const handleContact = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!token || contacting) return
    setContacting(true)
    try {
      const conv = await openConversationWithCandidate(token, candidate.user_id)
      router.push(`/employer/chat/${conv.id}`)
    } catch (err) {
      console.error('Не удалось открыть чат:', err)
    } finally {
      setContacting(false)
    }
  }

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    router.push(`/employer/candidates/${candidate.id}`)
  }

  const skills = candidate.skills || []

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-[24px] p-5 sm:p-6 border border-slate-100 shadow cursor-pointer hover:shadow-xl transition-all flex gap-4"
    >
      {/* Avatar — только на md+ виден отдельно слева */}
      <div className="hidden md:flex shrink-0 pt-0.5">
        <CompanyIcon company={candidateName || '?'} className="h-14 w-14 rounded-2xl text-xl" />
      </div>

      <div className="flex-1 min-w-0">
        {/* ── md и меньше: avatar + name/position в одном ряду ── */}
        <div className="flex md:hidden items-center gap-3 mb-3">
          <div className="shrink-0">
            <CompanyIcon company={candidateName || '?'} className="h-12 w-12 rounded-xl text-lg" />
          </div>
          <div className="min-w-0">
            <div className="text-base font-medium text-muted-foreground mb-0.5 truncate">
              {candidateName}
            </div>
            <h3 className="text-lg font-medium text-black leading-tight">{candidate.position}</h3>
          </div>
        </div>

        {/* ── md+: старый header — name/position слева, salary справа ── */}
        <div className="hidden md:flex justify-between items-start gap-3">
          <div className="min-w-0">
            <div className="text-lg font-medium text-slate-800 mb-0.5 truncate">
              {candidateName}
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-black leading-tight">
              {candidate.position}
            </h3>
          </div>
          <div className=" text-right shrink-0 pl-1">
            <div className="text-base font-bold text-slate-900 whitespace-nowrap">
              {candidate.salary_net
                ? `${candidate.salary_net.toLocaleString('ru-RU')} сом `
                : 'Договорная'}
            </div>
            {candidate.salary_net > 0 && (
              <div className="text-sm text-slate-600 font-medium">в месяц</div>
            )}
          </div>
        </div>

        {/* Meta info — общий для обоих layout */}
        <div className="flex gap-x-3 gap-y-1.5 mt-3">
          {candidate.city && (
            <span className="flex items-center gap-1 text-slate-600 text-sm lg:text-base">
              <MapPin size={16} className="text-slate-600 shrink-0" />
              {candidate.city}
            </span>
          )}
          <span className="flex items-center gap-1 text-slate-600 text-sm lg:text-base">
            <Calendar size={16} className="text-slate-600 shrink-0" />
            {candidate.birth_date && calculateAge(candidate.birth_date)}
          </span>
          {/* <span className="flex items-center gap-1 text-slate-600 text-sm lg:text-base">
            <Briefcase size={16} className="text-slate-600 shrink-0" />
          </span> */}
          {candidate.education && (
            <span className="flex items-center gap-1 text-slate-600 text-sm lg:text-base max-w-[160px]">
              <GraduationCap size={16} className="text-slate-600 shrink-0" />
              <span className="truncate">{candidate.education.split(/[.,]/)[0]}</span>
            </span>
          )}
        </div>

        {/* Description — общий */}
        {candidate.description && (
          <p className="text-sm text-slate-500 mt-3 line-clamp-2 leading-relaxed">
            {candidate.description}
          </p>
        )}

        {/* ── md+: skills слева, кнопка справа (старый layout) ── */}
        <div className="hidden md:flex items-center justify-between gap-3 mt-4">
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 5).map((skill: string, idx: number) => (
                <span
                  key={skill}
                  className={`px-3 py-1.5 rounded-[12px] text-sm font-medium ${
                    idx < 3 ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {skill}
                </span>
              ))}
              {skills.length > 5 && (
                <span className="px-3 py-1.5 bg-slate-100 text-slate-500 rounded-[9px] text-sm font-medium">
                  +{skills.length - 5}
                </span>
              )}
            </div>
          )}
          <Button
            onClick={handleContact}
            disabled={contacting}
            className="h-10 px-4 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-1.5 text-base font-medium shrink-0 shadow-none"
          >
            <Mail size={16} />
            Связаться
          </Button>
        </div>

        {/* ── md и меньше: skills + внизу salary/кнопка ── */}
        <div className="flex md:hidden flex-col gap-3 mt-3">
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 5).map((skill: string, idx: number) => (
                <span
                  key={skill}
                  className={`px-3 py-1.5 rounded-[12px] text-sm font-medium ${
                    idx < 3 ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {skill}
                </span>
              ))}
              {skills.length > 5 && (
                <span className="px-3 py-1.5 bg-slate-100 text-slate-500 rounded-[9px] text-sm font-medium">
                  +{skills.length - 5}
                </span>
              )}
            </div>
          )}

          {/* Salary + Button внизу */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-base font-semibold text-slate-900 whitespace-nowrap">
                {candidate.salary_net
                  ? `${candidate.salary_net.toLocaleString('ru-RU')} сом`
                  : 'Договорная'}
              </div>
              {candidate.salary_net > 0 && (
                <div className="text-sm text-slate-600 font-medium">в месяц</div>
              )}
            </div>
            <Button
              onClick={handleContact}
              disabled={contacting}
              className="h-10 px-4 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-1.5 text-base font-medium shrink-0 shadow-none"
            >
              <Mail size={16} />
              Связаться
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
