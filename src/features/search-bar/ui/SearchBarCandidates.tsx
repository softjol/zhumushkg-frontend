'use client'

import { Badge } from '@/shared/ui/badge'
import { Input } from '@/shared/ui/input'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
  searchQuery: string
  setSearchQuery: (query: string) => void
  handleSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const SearchBarCandidates = ({ searchQuery, setSearchQuery, handleSearchSubmit }: Props) => {
  const router = useRouter()
  return (
    <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder="Поиск по должности, навыкам, ключевым словам"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white border-0 rounded-2xl h-11 outline-none shadow-sm text-base"
        />
      </div>
      <button
        type="button"
        onClick={() => router.push('/employer/filters')}
        className="p-2.5 px-4 rounded-2xl bg-white hover:bg-white/80 transition-colors flex items-center gap-2 text-muted-foreground hover:text-foreground border border-transparent hover:border-border relative shadow-sm"
      >
        <SlidersHorizontal size={20} />
        <span className="text-base font-medium hidden sm:inline">Фильтры</span>
      </button>
    </form>
  )
}
