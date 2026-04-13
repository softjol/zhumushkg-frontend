'use client'
import { Input } from '@/shared/ui/input'
import { Search, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

type Props = {}

export const SearchBar = ({}: Props) => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="flex-1 max-w-xl flex items-center gap-2">
      <div className="relative flex-1">
        <Search
          size={21}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder="Поиск вакансий..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-sm font-medium pl-10 bg-muted  hover:shadow  rounded-xl h-11 outline-none "
        />
      </div>
      <Link href={'/filters'}>
      <button className="h-11 p-2.5 px-4 rounded-2xl hover:shadow bg-muted hover:bg-muted/80 transition-colors flex items-center gap-2 text-muted-foreground hover:text-foreground borderborder-border">
        <SlidersHorizontal size={20} />
        <span className="text-sm font-medium">Фильтры</span>
      </button>
      </Link>   
    </div>
  )
}
