'use client'
import { Input } from '@/shared/ui/input'
import { Search, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="flex-1 lg:max-w-xl flex items-center gap-0.5 lg:gap-2 mb-4 lg:mb-0">
      <div className="relative flex-1">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder="Поиск..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white lg:bg-muted border-0 rounded-xl h-12 lg:h-11 text-base lg:text-sm lg:font-medium outline-none lg:hover:shadow"
        />
      </div>
      <Link href="/filters">
        <button className="p-3 lg:p-2.5 px-4 rounded-lg lg:rounded-2xl bg-white lg:bg-muted lg:hover:bg-muted/80 lg:hover:shadow transition-colors flex items-center gap-2 text-muted-foreground lg:hover:text-foreground lg:border lg:border-border">
          <SlidersHorizontal size={20} className="lg:w-5 lg:h-5 w-6 h-6" />
          <span className="hidden lg:inline text-sm font-medium">Фильтры</span>
        </button>
      </Link>
    </div>
  )
}
