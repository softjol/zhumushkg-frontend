'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null

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
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
        ))}
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
