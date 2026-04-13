'use client'

import { Input } from "@/shared/ui/input"
import { Search, SlidersHorizontal } from "lucide-react"

type Props = {}

export const MobileSearchBar = ({}: Props) => {
  return (
    <div className="lg:hidden flex-1 flex items-center gap-0.5 mb-4">
      <div className="relative flex-1">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder="Поиск..."
          className="pl-10 bg-white border-0 rounded-xl h-12 text-base outline-none"
        />
      </div>
      <button className="p-3 px-4 rounded-lg bg-white flex items-center justify-center text-muted-foreground relative">
        <SlidersHorizontal size={24} />
      </button>
    </div>
  )
}
