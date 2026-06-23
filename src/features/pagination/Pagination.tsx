'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function getPageNumbers(current: number, total: number, delta: number): (number | '...')[] {
  if (total <= delta * 2 + 3) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | '...')[] = []
  const rangeStart = Math.max(2, current - delta)
  const rangeEnd = Math.min(total - 1, Math.max(current + delta, rangeStart + 1))

  pages.push(1)
  if (rangeStart > 2) pages.push('...')
  for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i)
  if (rangeEnd < total - 1) pages.push('...')
  pages.push(total)

  return pages
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const [isSmall, setIsSmall] = useState(false)

  useEffect(() => {
    const check = () => setIsSmall(window.innerWidth <= 400)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (totalPages <= 1) return null

  const delta = isSmall ? 0 : 1
  const pages = getPageNumbers(currentPage, totalPages, delta)

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2.5 rounded-2xl bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-border"
      >
        <ChevronLeft size={22} />
      </button>

      <div className="flex items-center gap-1">
        {pages.map((page, idx) =>
          page === '...' ? (
            <span
              key={`ellipsis-${idx}`}
              className="w-11 h-11 text-3xl flex items-center justify-center text-muted-foreground select-none"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-11 h-11 rounded-2xl text-lg font-medium transition-colors border ${
                currentPage === page
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground border-border'
              }`}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2.5 rounded-2xl bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-border"
      >
        <ChevronRight size={22} />
      </button>
    </div>
  )
}
