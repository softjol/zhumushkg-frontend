'use client'

import { SearchBar } from '@/features/search-bar/ui/SearchBar'
import Link from 'next/link'
import iconLogo from '@/assets/icons/Logo.svg'
import Image from 'next/image'

export function Header() {
  return (
    <header className="h-[64px] lg:h-[73px] flex items-center gap-4 px-4 py-3 lg:px-6 lg:py-4 border-b border-border bg-background sticky top-0 z-20 ">
      {/* Desktop Search bar */}
      <div className="hidden lg:flex w-full">
        <SearchBar />
      </div>
      {/* Mobile header */}
      <Link href={'/'} className="flex lg:hidden w-full justify-start items-center gap-2">
        <div className={'text-[24px] flex items-center font-bold'}>
          Ж
          <Image src={iconLogo} alt="logo" className="w-[18px] mt-[1px]" />
          муш.kg
        </div>
      </Link>
    </header>
  )
}
