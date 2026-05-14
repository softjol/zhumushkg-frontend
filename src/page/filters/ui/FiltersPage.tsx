'use client'
import { ArrowLeft, MapPin, Briefcase, Wifi } from 'lucide-react'
import { Input } from '@/shared/ui/input'
import Link from 'next/link'
import { Switch } from '@/shared/ui/switch'
import { useRouter } from 'next/navigation'
import { useFilterStore } from '@/entities/job/model/filterStore'

const schedules = ['Полный день', 'Неполный день', 'Сменный график']
const experiences = ['Нет опыта', 'Менее 1 года', 'От 1 до 3 лет', 'От 3 до 6 лет', 'Более 6 лет']
const periods = ['Месяц', 'Смена', 'День', 'Час']

export const FiltersPage = () => {
  const router = useRouter()

  const {
    city, position, schedule, experience,
    period, salaryFrom, salaryTo, remoteWork,
    setFilter, clearFilters,
  } = useFilterStore()

  const hasFilters =
    !!city || !!position || !!schedule || !!experience ||
    !!period || !!salaryFrom || !!salaryTo || remoteWork

  return (
    <div className="min-h-screen bg-background flex flex-col pt-safe relative">
      <header className="sticky top-0 z-40 bg-background border-b border-border flex items-center px-4 p-3 lg:py-4">
        <Link href="/jobs" className="p-2 rounded-full hover:bg-muted active:scale-95 transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-semibold text-center mr-8 flex-1">Фильтры</h1>
      </header>

      <div className="flex-1 flex flex-col gap-6 overflow-y-auto px-4 lg:px-6 py-6 max-w-2xl mx-auto w-full pb-32">
        {/* City */}
        <div>
          <h3 className="text-base font-medium text-[#111] mb-3">Город</h3>
          <div className="relative">
            <MapPin size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Бишкек"
              value={city}
              onChange={(e) => setFilter('city', e.target.value)}
              className="px-10 bg-muted border-0 rounded-xl h-12 text-base focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Position */}
        <div>
          <h3 className="text-base font-medium text-[#111] mb-3">Должность</h3>
          <div className="relative">
            <Briefcase size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Менеджер, водитель, повар"
              value={position}
              onChange={(e) => setFilter('position', e.target.value)}
              className="px-10 bg-muted border-0 rounded-xl h-12 text-base focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Salary */}
        <div>
          <h3 className="text-base font-medium text-[#111] mb-3">Зарплата (сом)</h3>
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="От"
              type="number"
              value={salaryFrom}
              onChange={(e) => setFilter('salaryFrom', e.target.value)}
              className="pl-6 bg-muted border-0 rounded-xl h-12 text-base focus-visible:ring-1 focus-visible:ring-primary"
            />
            <Input
              placeholder="До"
              type="number"
              value={salaryTo}
              onChange={(e) => setFilter('salaryTo', e.target.value)}
              className="pl-6 bg-muted border-0 rounded-xl h-12 text-base focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Remote */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Wifi size={20} className="text-muted-foreground" />
            <h3 className="text-base font-medium text-[#111]">Удалённая работа</h3>
          </div>
          <Switch checked={remoteWork} onCheckedChange={(val) => setFilter('remoteWork', val)} />
        </div>

        {/* Schedule */}
        <div>
          <h3 className="text-base font-medium text-[#111] mb-3">График работы</h3>
          <div className="flex flex-wrap gap-2">
            {schedules.map((s) => (
              <button
                key={s}
                onClick={() => setFilter('schedule', schedule === s ? '' : s)}
                className={`px-4 py-2 rounded-full border text-base transition-all ${
                  schedule === s
                    ? 'border-primary bg-primary/5 text-primary font-medium'
                    : 'border-[#EBEBEB] bg-background text-foreground hover:border-muted-foreground/30'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <h3 className="text-base font-medium text-[#111] mb-3">Опыт работы</h3>
          <div className="flex flex-wrap gap-2">
            {experiences.map((s) => (
              <button
                key={s}
                onClick={() => setFilter('experience', experience === s ? '' : s)}
                className={`px-4 py-2 rounded-full border text-base transition-all ${
                  experience === s
                    ? 'border-primary bg-primary/5 text-primary font-medium'
                    : 'border-[#EBEBEB] bg-background text-foreground hover:border-muted-foreground/30'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Period */}
        <div>
          <h3 className="text-base font-medium text-[#111] mb-3">Период оплаты</h3>
          <div className="flex flex-wrap gap-2">
            {periods.map((s) => (
              <button
                key={s}
                onClick={() => setFilter('period', period === s ? '' : s)}
                className={`px-4 py-2 rounded-full border text-base transition-all ${
                  period === s
                    ? 'border-primary bg-primary/5 text-primary font-medium'
                    : 'border-[#EBEBEB] bg-background text-foreground hover:border-muted-foreground/30'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:left-[260px] p-4 bg-background border-t border-[#EBEBEB] z-40">
        <div className="flex items-center justify-center gap-3 w-full">
          <button
            onClick={() => router.push('/jobs')}
            disabled={!hasFilters}
            className={`w-1/2 max-w-[220px] lg:w-full h-12 rounded-2xl text-base font-bold transition-all ${
              hasFilters ? 'bg-primary text-white' : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            Применить 
          </button>
          <button
            onClick={clearFilters}
            className="px-6 h-12 w-1/2 max-w-[220px] lg:w-full rounded-2xl text-base font-bold border-2 border-[#EBEBEB] hover:bg-muted transition-colors text-foreground"
          >
            Сбросить
          </button>
        </div>
      </div>
    </div>
  )
}
