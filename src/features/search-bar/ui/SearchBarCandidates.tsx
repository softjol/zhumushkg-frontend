'use client'

import { Input } from '@/shared/ui/input'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCandidateSearchStore } from '@/entities/resume/model/candidateSearchStore'
import { useCandidateFilterStore } from '@/entities/resume/model/candidateFilterStore'
import { useEffect, useState } from 'react'

export const SearchBarCandidates = () => {
  const router = useRouter()
  const [localValue, setLocalValue] = useState('')
  const setQuery = useCandidateSearchStore((s) => s.setQuery)
  const { city, position, schedule, experience, salaryFrom, salaryTo, category } =
    useCandidateFilterStore()

  const hasFilters =
    !!city || !!position || !!schedule || !!experience || !!salaryFrom || !!salaryTo || !!category

  useEffect(() => {
    const timer = setTimeout(() => setQuery(localValue), 300)
    return () => clearTimeout(timer)
  }, [localValue, setQuery])

  return (
    <div className="flex-1 flex items-center gap-0.5 lg:gap-3 mb-4 ">
      <div className="relative flex-1">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder="Поиск по должности..."
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          className="pl-10 bg-white border-0 rounded-xl h-12 lg:h-11 text-base outline-none lg:shadow-sm lg:rounded-2xl"
        />
      </div>
      <button
        type="button"
        onClick={() => router.push('/employer/filters')}
        className={`p-3 lg:p-2.5 relative px-4 rounded-lg lg:rounded-2xl bg-white transition-colors flex items-center gap-2 lg:border lg:border-transparent lg:hover:border-border lg:shadow-sm lg:hover:bg-white/80 ${
          hasFilters ? 'text-primary' : 'text-muted-foreground lg:hover:text-foreground'
        }`}
      >
        <SlidersHorizontal size={20} className="w-6 h-6 lg:w-5 lg:h-5" />
        <span className="hidden lg:inline text-base font-medium">Фильтры</span>
        {hasFilters && (
          <span className="w-3 h-3 absolute top-0 right-0 bg-primary rounded-full"></span>
        )}
      </button>
    </div>
  )
}