'use client'

import { useState } from 'react'
import { Bell, ChevronLeft, ChevronRight } from 'lucide-react'

import iconLogo from '@/assets/icons/Logo.svg'
import Link from 'next/link'
import { Footer } from '@/widgets/footer'
import Image from 'next/image'
import CandidateCard from '@/features/сandidate-сard/CandidateCard'
import { SearchBarCandidates } from '@/features/search-bar/ui/SearchBarCandidates'
import { Header } from '@/widgets/header/ui/Header'

const candidates = [
  {
    id: 2,
    user_id: 1,
    description: 'Опытный разработчик на Node.js',
    position: null,
    work_schedule: 'Полный рабочий день',
    payment_period: 'Месяц',
    salary_net: 150000,
    birth_date: '1995-05-20',
    phone_number: '+79991234567',
    city: 'Москва',
    education: 'МГТУ им. Баумана',
    work_experience: [
      {
        company: '',
        end_year: 2000,
        position: '',
        end_month: 1,
        until_now: false,
        start_year: 2000,
        description: '5 лет в IT',
        start_month: 1,
      },
    ],
    skills: ['JavaScript', 'Node.js', 'PostgreSQL'],
    personal_qualities: 'Ответственность, коммуникабельность',
    photo: 'https://example.com/photo.jpg',
    createdAt: '2026-03-09T04:39:50.580Z',
    updatedAt: '2026-03-09T04:43:38.132Z',
  },
  {
    id: 17,
    user_id: 43,
    description:
      'Backend-разработчик с опытом проектирования REST API и микросервисов. Ищу команду с современным стеком.',
    position: 'Middle Node.js Developer',
    work_schedule: 'Полный день',
    payment_period: 'Месяц',
    salary_net: 180000,
    birth_date: '1995-03-15',
    phone_number: '+996700123456',
    city: 'Бишкек',
    education:
      'Высшее. Кыргызский государственный технический университет им. И. Раззакова, факультет информационных технологий, 2013–2017.',
    work_experience: [
      {
        company: 'ООО «Техно»',
        position: 'Middle Node.js Developer',
        until_now: true,
        start_year: 2021,
        description:
          'Разработка и сопровождение REST API на NestJS и PostgreSQL; проектирование схем БД; код-ревью; участие в оценке задач и планировании спринтов.',
        start_month: 3,
      },
      {
        company: 'ИП Иванов',
        end_year: 2021,
        position: 'Junior разработчик',
        end_month: 2,
        until_now: false,
        start_year: 2019,
        description:
          'Поддержка существующего кода, исправление багов, мелкие доработки по ТЗ; работа с Git и таск-трекером.',
        start_month: 6,
      },
    ],
    skills: ['Node.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'REST API', 'Git', 'Docker'],
    personal_qualities:
      'Ответственность, умение работать в команде, внимание к деталям, готовность к обучению.',
    photo: 'https://example.com/uploads/resume-photo.jpg',
    createdAt: '2026-04-22T04:22:05.724Z',
    updatedAt: '2026-04-22T04:22:05.724Z',
  },
  {
    id: 18,
    user_id: 49,
    description: 'Опытный разработчdик с 4 годами коммерческого опыта.',
    position: 'Senior ML AI Developer',
    work_schedule: 'Полный день',
    payment_period: 'Ежемесячно',
    salary_net: 50000,
    birth_date: '1995-01-15',
    phone_number: '+996700000000',
    city: 'Бишкек',
    education: 'Высшее, КГТУ',
    work_experience: [
      {
        company: 'ООО «Техно»',
        position: 'Backend-разработчик',
        until_now: true,
        start_year: 2021,
        description: 'Разработка REST API, код-ревью.',
        start_month: 3,
      },
    ],
    skills: ['JavaScript', 'NestJS', 'PostgreSQL'],
    personal_qualities: 'Ответственный, коммуникабельный',
    photo: 'https://example.com/photo.jpg',
    createdAt: '2026-04-23T12:58:36.389Z',
    updatedAt: '2026-04-23T13:18:15.433Z',
  },
]

export const EmployerCandidatesPage = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = candidates
  const handleSearchSubmit = (e: React.FormEvent) => e.preventDefault()
  const totalPages = 1
  const currentPage = 1
  const handlePageChange = (page: number) => {}

  return (
    <div className="flex flex-col min-h-full bg-muted">
      <div className='block lg:hidden'>
        <Header />
      </div>
      <div className="px-4 lg:px-6 py-4 lg:py-8 space-y-6 max-w-4xl mx-auto w-full flex-1">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Кандидаты</h1>
          <p className="text-base text-muted-foreground">
            Найдено <span className="font-semibold text-foreground">{filtered.length}</span> резюме
          </p>
        </div>

        <SearchBarCandidates
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchSubmit={handleSearchSubmit}
        />

        <div className="grid gap-3">
          {filtered.map((candidate, index) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate as any}
              onInvite={() => {}}
              listIndex={index}
              totalCount={filtered.length}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2.5 rounded-2xl bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-border"
            >
              <ChevronLeft size={22} />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-11 h-11 rounded-2xl text-lg font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-2xl bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-border"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
