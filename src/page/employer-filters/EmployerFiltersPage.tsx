'use client'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { useRouter } from 'next/navigation'
import { useCandidateFilterStore } from '@/entities/resume/model/candidateFilterStore'

const experienceOptions = ['Нет опыта', 'До 1 года', '1–3 года', '3–6 лет', '6+']
const scheduleOptions = ['Полный день', 'Неполный день', 'Сменный график']

export const EmployerFiltersPage = () => {
  const router = useRouter()

  const { city, position, schedule, experience, salaryFrom, salaryTo, setFilter, clearFilters } =
    useCandidateFilterStore()

  const hasFilters =
    !!city || !!position || !!schedule || !!experience || !!salaryFrom || !!salaryTo

  return (
    <>
      <div className="pb-24">
        <div className="sticky top-0 z-20 bg-background border-b border-border flex items-center justify-between px-4 lg:px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              <ArrowLeft size={20} className="text-foreground" />
            </button>
            <h1 className="text-lg font-bold text-foreground">Фильтры</h1>
          </div>
        </div>

        <div className="px-4 lg:px-6 py-6 max-w-xl mx-auto space-y-8">
          {/* City */}
          <section className="space-y-3">
            <Label className="text-[15px] font-semibold text-foreground">Город</Label>
            <Input
              value={city}
              onChange={(e) => setFilter('city', e.target.value)}
              placeholder="Введите город (напр. Бишкек)"
              className="mt-1 rounded-xl h-11"
            />
          </section>

          {/* Position */}
          <section className="space-y-3">
            <Label className="text-[15px] font-semibold text-foreground">Желаемая должность</Label>
            <Input
              value={position}
              onChange={(e) => setFilter('position', e.target.value)}
              placeholder="Введите должность (напр. Продавец-консультант)"
              className="mt-1 rounded-xl h-11"
            />
          </section>

          {/* Experience */}
          <section className="space-y-3">
            <Label className="text-[15px] font-semibold text-foreground">Опыт работы</Label>
            <div className="flex flex-wrap gap-2">
              {experienceOptions.map((exp) => (
                <button
                  key={exp}
                  onClick={() => setFilter('experience', experience === exp ? '' : exp)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    experience === exp
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-muted text-muted-foreground border-transparent hover:border-border'
                  }`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </section>

          {/* Salary */}
          <section className="space-y-3">
            <Label className="text-[15px] font-semibold text-foreground">
              Желаемая зарплата (сом)
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="От"
                value={salaryFrom}
                onChange={(e) => setFilter('salaryFrom', e.target.value)}
                className="rounded-xl h-11"
              />
              <Input
                type="number"
                placeholder="До"
                value={salaryTo}
                onChange={(e) => setFilter('salaryTo', e.target.value)}
                className="rounded-xl h-11"
              />
            </div>
          </section>

          {/* Schedule */}
          <section className="space-y-3">
            <Label className="text-[15px] font-semibold text-foreground">График работы</Label>
            <div className="flex flex-wrap gap-2">
              {scheduleOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter('schedule', schedule === s ? '' : s)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    schedule === s
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-muted text-muted-foreground border-transparent hover:border-border'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:left-[260px] bg-background border-t border-border p-4 z-30">
        <div className="max-w-xl mx-auto flex gap-5">
          <Button
            onClick={() => router.push('/employer/candidates')}
            disabled={!hasFilters}
            className={`w-full h-12 rounded-xl text-base font-semibold shadow-md ${
              !hasFilters ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
           Применить
          </Button>
          <Button
            onClick={clearFilters}
            variant="outline"
            className="w-full h-12 rounded-xl text-base font-semibold shadow-md"
          >
            Сбросить всё
          </Button>
        </div>
      </div>
    </>
  )
}
