'use client'

import { ArrowLeft, Calendar, Mail, MapPin, Phone, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getResume } from '@/entities/resume/api'
import { Resume } from '@/entities/resume/model/types'
import { getProfile } from '@/entities/user/api'
import { CandidateDetailSkeleton } from './CandidateDetailSkeleton'
import { calculateAge } from '@/shared/lib/calculateAge'
import { Button } from '@/shared/ui/button'

const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']

interface CandidateDetailPageProps {
  candidateId: number
}

export const CandidateDetailPage = ({ candidateId }: CandidateDetailPageProps) => {
  const router = useRouter()
  const [resume, setResume] = useState<Resume | null>(null)
  const [userName, setUserName] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getResume(candidateId)
        const user = await getProfile(data.user_id)
        setResume(data)
        setUserName(user.firstName)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [candidateId])
  const getMonthName = (m: number) => months[m - 1] || ''

  if (loading) return <CandidateDetailSkeleton />

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fe] pb-10 font-sans">
      <header className=" justify-between sticky top-0 z-20 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => router.back()} className="p-1.5 rounded-xl hover:bg-muted">
          <ArrowLeft size={22} />
        </button>
        <Button
              onClick={(e) => {
                e.stopPropagation()
                router.push('/chat')
              }}
              className="flex  sm:hidden h-10 px-4 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground  items-center gap-1.5 text-base font-medium shrink-0 shadow-none"
            >
              <Mail size={16} />
              Связаться
            </Button>
      </header>
      <div className="max-w-5xl mx-auto w-full p-4 lg:p-8 space-y-2 lg:space-y-4 pt-6 lg:pt-10">
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-4 lg:p-6 flex flex-col gap-2  shadow-sm border border-slate-100">
          <div className="w-full flex justify-between ">
            <div className="flex flex-row gap-6 items-start w-full">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <User size={40} className="text-primary" />
              </div>
              <div className="space-y-2 flex-1">
                <div>
                  <h1 className="text-lg font-bold text-slate-900 mb-0.5">{userName}</h1>
                  <p className=" flex justify-start flex-wrap items-center gap-2 font-semibold text-lg">
                    {resume?.position}{' '}
                    <span className="inline-flex items-center gap-2 text-emerald-600  rounded-xl font-medium text-sm cursor-default">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Открыт к предложениям
                    </span>
                  </p>
                </div>
                <div className=" hidden lg:flex flex-wrap items-center gap-6 text-slate-600 text-base">
                  <span className="flex items-center gap-2">
                    <Phone size={18} /> {resume?.phone_number}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={18} /> {resume?.city}
                  </span>
                </div>
              </div>
            </div>
             <Button
              onClick={(e) => {
                e.stopPropagation()
                router.push('/chat')
              }}
              className="hidden  h-10 px-4 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground sm:flex items-center gap-1.5 text-base font-medium shrink-0 shadow-none"
            >
              <Mail size={16} />
              Связаться
            </Button>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 lg:gap-6">
            <div className=" flex lg:hidden flex-col items-start gap-3 text-slate-600 text-base mt-5 mb-2">
              <span className="flex items-center gap-2">
                <Phone size={18} /> {resume?.phone_number}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={18} /> {resume?.city}
              </span>{' '}
              <span className="flex items-center gap-2">
                <Calendar size={18} /> {resume?.birth_date && calculateAge(resume.birth_date)}
              </span>
            </div>
            <div className="p-1 lg:p-4 flex items-center gap-2">
              <p className="text-sm text-slate-400">Желаемая зарплата:</p>
              <p className="text-base text-slate-900 font-medium">
                {resume?.salary_net?.toLocaleString()} сом
              </p>
            </div>
            <div className="p-1 lg:p-4 flex  items-center gap-2">
              <p className="text-sm text-slate-400">Формат работы:</p>
              <p className="text-base text-slate-900 font-medium">{resume?.work_schedule}</p>
            </div>
            <div className="p-1 lg:p-4 flex  items-center gap-2">
              <p className="text-sm text-slate-400">Занятость:</p>
              {/* <p className="text-base text-slate-900 font-medium">{resume?.employment_type}</p> */}
            </div>
          </div>
        </div>

        {/* About Me */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100 space-y-2">
          <h3 className="font-semibold text-slate-900 text-lg flex items-center">О себе</h3>
          <p className="text-slate-600 leading-relaxed text-base whitespace-pre-wrap">
            {resume?.description}
          </p>
        </div>

        {/* Work Experience */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100 space-y-6">
          <h3 className="font-semibold text-slate-900 text-lg flex items-center  mb-4">
            Опыт работы
          </h3>

          <div className="space-y-10">
            {resume?.work_experience !== null &&
              resume?.work_experience?.map((exp: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row gap-4 items-start pb-6 border-b border-slate-50 last:border-0 last:pb-0"
                >
                  <div className="flex-1 space-y-3 w-full">
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">{exp.position}</h4>
                        <p className="text-primary font-medium text-base mt-1">{exp.company}</p>
                      </div>
                      <span className="text-slate-400 text-sm">
                        {getMonthName(exp.start_month)} {exp.start_year} —{' '}
                        {exp.until_now
                          ? 'по настоящее время'
                          : `${getMonthName(exp.end_month)} ${exp.end_year}`}
                      </span>
                    </div>

                    <div className="text-slate-600 text-base leading-relaxed pl-4 border-l-2 border-slate-200 mt-2">
                      <p className="whitespace-pre-wrap">{exp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            {resume?.work_experience !== null && resume?.work_experience.length === 0 && (
              <p className="text-slate-500 text-base">Нет опыта работы</p>
            )}
          </div>
        </div>

        {/* Education & Qualities Column Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4">
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100 space-y-4">
            <h3 className="font-semibold text-slate-900 text-lg flex items-center gap-2">
              Образование
            </h3>
            <div>
              <h4 className=" text-slate-900 text-base">{resume?.education}</h4>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100 space-y-4">
            <h3 className="font-semibold text-slate-900 text-lg flex items-center gap-2">
              Личные качества
            </h3>
            <p className="text-slate-600 text-base whitespace-pre-wrap">
              {resume?.personal_qualities}
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100 space-y-4">
          <h3 className="font-semibold text-slate-900 text-lg flex items-center gap-2">
            Ключевые навыки
          </h3>
          <div className="flex flex-wrap gap-3">
            {resume?.skills.map((skill: string, i: number) => (
              <span
                key={i}
                className="bg-slate-100 text-slate-800 px-4 py-2 rounded-xl text-base font-medium"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
