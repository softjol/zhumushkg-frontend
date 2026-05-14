import { VacancyCandidate } from '@/entities/applications/model/type'
import { calculateAge } from '@/shared/lib/calculateAge'
import { Button } from '@/shared/ui/button'
import {
  MapPin,
  User as IconUser,
  Calendar,
  Briefcase,
  GraduationCap,
  Check,
  X,
} from 'lucide-react'
import Link from 'next/link'

const statusConfig: Record<string, { label: string; className: string }> = {
  NEW: { label: 'Новый', className: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  REVIEWING: { label: 'На рассмотрении', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  INTERVIEW: { label: 'Интервью', className: 'bg-purple-100 text-purple-700 border-purple-200' },
  OFFER: { label: 'Оффер', className: 'bg-orange-100 text-orange-700 border-orange-200' },
  HIRED: { label: 'Принят', className: 'bg-green-100 text-green-700 border-green-200' },
  REJECTED: { label: 'Отказ', className: 'bg-red-100 text-red-700 border-red-200' },
}

interface ApplicantCardProps {
  item: VacancyCandidate
  onStatusUpdate: (applicationId: number, status: string) => void
}

export const ApplicantCard = ({ item, onStatusUpdate }: ApplicantCardProps) => {
  const { candidate, resume } = item
  const skills = resume.skills || []
  const cfg = statusConfig[item.status] ?? statusConfig.NEW

  const canAct = item.status === 'NEW'
  const isRejected = item.status === 'REJECTED'

  const handleAccept = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onStatusUpdate(item.id, 'HIRED')
  }

  const handleReject = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onStatusUpdate(item.id, 'REJECTED')
  }

  return (
    <Link href={`/employer/candidates/${resume.id}`}>
      <div className="bg-white rounded-[24px] p-5 sm:p-6 border border-slate-100 shadow flex gap-4">
        {/* Avatar — md+ */}
        <div className="hidden md:flex shrink-0 pt-0.5">
          <div className="w-18 h-18 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
            <IconUser size={32} />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {/* Mobile: avatar + name/position */}
          <div className="flex md:hidden items-center gap-3 mb-3">
            <div className="shrink-0">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
                <IconUser size={28} />
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <div className="text-base font-medium text-slate-800 truncate">
                  {candidate.firstName}
                </div>
                <span
                  className={`text-xs rounded-lg border px-2 py-0.5 font-medium ${cfg.className}`}
                >
                  {cfg.label}
                </span>
              </div>
              <h3 className="text-lg font-medium text-black leading-tight">{resume.position}</h3>
            </div>
          </div>

          {/* Desktop: name/position + salary */}
          <div className="hidden md:flex justify-between items-start gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <div className="text-lg font-medium text-slate-800 truncate">
                  {candidate.firstName}
                </div>
                <span
                  className={`text-xs rounded-lg border px-2 py-0.5 font-medium ${cfg.className}`}
                >
                  {cfg.label}
                </span>
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-black leading-tight">
                {resume.position}
              </h3>
            </div>
            <div className="text-right shrink-0 pl-1">
              <div className="text-base font-bold text-slate-900 whitespace-nowrap">
                {resume.salary_net
                  ? `${resume.salary_net.toLocaleString('ru-RU')} сом`
                  : 'Договорная'}
              </div>
              {resume.salary_net > 0 && (
                <div className="text-sm text-slate-600 font-medium">в месяц</div>
              )}
            </div>
          </div>

          {/* Meta info */}
          <div className="flex gap-x-3 gap-y-1.5 mt-3">
            {resume.city && (
              <span className="flex items-center gap-1 text-slate-600 text-sm lg:text-base">
                <MapPin size={16} className="text-slate-600 shrink-0" />
                {resume.city}
              </span>
            )}
            {resume.birth_date && (
              <span className="flex items-center gap-1 text-slate-600 text-sm lg:text-base">
                <Calendar size={16} className="text-slate-600 shrink-0" />
                {calculateAge(resume.birth_date)}
              </span>
            )}

            {resume.education && (
              <span className="flex items-center gap-1 text-slate-600 text-sm lg:text-base max-w-[160px]">
                <GraduationCap size={16} className="text-slate-600 shrink-0" />
                <span className="truncate">{resume.education.split(/[.,]/)[0]}</span>
              </span>
            )}
          </div>

          {/* Description */}
          {resume.description && (
            <p className="text-sm text-slate-500 mt-3 line-clamp-2 leading-relaxed">
              {resume.description}
            </p>
          )}

          {/* Desktop: skills + buttons */}
          <div className="hidden md:flex items-center justify-between gap-3 mt-4">
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.slice(0, 5).map((skill, idx) => (
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

            <div className="flex gap-2 shrink-0">
              {canAct ? (
                <>
                  <Button
                    onClick={handleAccept}
                    className="h-10 px-4 rounded-2xl bg-green-600 hover:bg-green-700 text-white flex items-center gap-1.5 text-base font-medium shadow-none"
                  >
                    <Check size={16} /> Принять
                  </Button>
                  <Button
                    onClick={handleReject}
                    variant="outline"
                    className="h-10 px-4 rounded-2xl border-red-200 text-red-600 hover:bg-red-50 flex items-center gap-1.5 text-base font-medium shadow-none"
                  >
                    <X size={16} /> Отказать
                  </Button>
                </>
              ) : isRejected ? (
                <div className="h-10 px-4 rounded-2xl bg-slate-100 text-slate-500 flex items-center text-sm">
                  Заявка отклонена
                </div>
              ) : (
                <span
                  className={`text-sm rounded-2xl border px-3 p-2 font-medium ${cfg.className}`}
                >
                  {cfg.label}
                </span>
              )}
            </div>
          </div>

          {/* Mobile: skills + salary + buttons */}
          <div className="flex md:hidden flex-col gap-3 mt-3">
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.slice(0, 5).map((skill, idx) => (
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

            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-base font-semibold text-slate-900 whitespace-nowrap">
                  {resume.salary_net
                    ? `${resume.salary_net.toLocaleString('ru-RU')} сом`
                    : 'Договорная'}
                </div>
                {resume.salary_net > 0 && (
                  <div className="text-sm text-slate-600 font-medium">в месяц</div>
                )}
              </div>
              <div className="flex gap-2">
                {canAct ? (
                  <>
                    <Button
                      onClick={handleAccept}
                      className="h-10 px-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white flex items-center gap-1 text-sm font-medium shadow-none"
                    >
                      <Check size={15} /> Принять
                    </Button>
                    <Button
                      onClick={handleReject}
                      variant="outline"
                      className="h-10 px-3 rounded-2xl border-red-200 text-red-600 hover:bg-red-50 flex items-center gap-1 text-sm font-medium shadow-none"
                    >
                      <X size={15} /> Отказать
                    </Button>
                  </>
                ) : isRejected ? (
                  <div className="h-10 px-3 rounded-2xl bg-slate-100 text-slate-500 flex items-center text-sm">
                    Отклонён
                  </div>
                ) : (
                  <span
                    className={`text-sm rounded-2xl border px-3 p-2 font-medium ${cfg.className}`}
                  >
                    {cfg.label}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
