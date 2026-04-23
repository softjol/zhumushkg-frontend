'use client'
import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, MapPin, Search, Briefcase, X, Check, Wifi } from 'lucide-react'
import { Input } from '@/shared/ui/input'
import Link from 'next/link'
import { Switch } from '@/shared/ui/switch'

const schedules = ['Полный день', 'Неполный день', 'Сменный график']
const experiences = ['Нет опыта', 'Менее 1 года', 'От 1 до 3 лет', 'От 3 до 6 лет', 'Более 6 лет']
const periods = ['За месяц', 'За смену', 'За день', 'За час']

export const FiltersPage = () => {
  const [cityInput, setCityInput] = useState('')
  const [profInput, setProfInput] = useState(null)
  const [profFocus, setProfFocus] = useState(false)
  const [resultCount, setResultCount] = useState(8032)
  const [isCounting, setIsCounting] = useState(false)

  const cityRef = useRef<HTMLDivElement>(null)
  const profRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-background flex flex-col pt-safe relative">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border flex items-center px-4 p-3 lg:py-4">
        <Link
          href="/jobs"
          className="p-2 rounded-full hover:bg-muted active:scale-95 active:bg-muted/80 transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-semibold text-center mr-8">Фильтры</h1>
      </header>

      <div className="flex-1 flex flex-col gap-6 overflow-y-auto px-4 lg:px-6 py-6 max-w-2xl mx-auto w-full pb-10 lg:pb-32">
        {/* City */}
        <div>
          <h3 className="text-base font-medium text-[#111] mb-3">Город</h3>

          <div className="relative" ref={cityRef}>
            <div className="relative">
              <MapPin
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Бишкек"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                className="px-10 bg-muted border-0 rounded-xl h-12 text-base focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Profession */}
        <div>
          <h3 className="text-base font-medium text-[#111] mb-3">Должность</h3>
          <div className="relative" ref={profRef}>
            <div className="relative">
              <Briefcase
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground mt-[1px]"
              />
              <Input
                placeholder="Менеджер, водитель, повар"
                onFocus={() => setProfFocus(true)}
                className="px-10 bg-muted border-0 rounded-xl h-12 text-base focus-visible:ring-1 focus-visible:ring-primary"
              />
              {profInput && (
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Salary */}
        <div>
          <h3 className="text-base font-medium text-[#111] mb-3">Зарплата (сом)</h3>
          <div className="grid grid-cols-2 gap-3 mb-1">
            <div className="relative">
              <Input
                placeholder="От"
                type="number"
                className={`pl-6 bg-muted border-0 rounded-xl h-12 text-base focus-visible:ring-1 focus-visible:ring-primary }`}
              />
            </div>
            <div className="relative">
              <Input
                placeholder="До"
                type="number"
                className={`pl-6 bg-muted border-0 rounded-xl h-12 text-base focus-visible:ring-1 focus-visible:ring-primary }`}
              />
            </div>
          </div>
        </div>
        {/* Remote */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Wifi size={20} className="text-muted-foreground" />
            <h3 className="text-base font-medium text-[#111]">Удалённая работа</h3>
          </div>
          <Switch />
        </div>
        {/* Schedule */}
        <div>
          <h3 className="text-base font-medium text-[#111] mb-3">График работы</h3>
          <div className="flex flex-wrap gap-2">
            {schedules.map((s) => (
              <button
                key={s}
                className={`px-4 py-2 rounded-full border text-base transition-all ${
                  false
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
                className={`px-4 py-2 rounded-full border text-base transition-all ${
                  false
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
                className={`px-4 py-2 rounded-full border text-base transition-all ${
                  false
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
            className={`w-1/2 max-w-[220px] lg:w-full  h-12 rounded-2xl text-base font-bold transition-all flex items-center justify-center bg-primary text-white `}
          >
            {isCounting ? (
              <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : resultCount === 0 ? (
              'Нет вакансий'
            ) : (
              `Показать ${resultCount.toLocaleString()}`
            )}
          </button>
          <button className="px-6 h-12 w-1/2 max-w-[220px] lg:w-full  rounded-2xl text-base font-bold border-2 border-[#EBEBEB] hover:bg-muted transition-colors text-foreground active:scale-[0.98]">
            Сбросить
          </button>
        </div>
      </div>
    </div>
  )
}
