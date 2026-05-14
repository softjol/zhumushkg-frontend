import { Skeleton } from '@/shared/ui/skeleton'
import { ArrowLeft } from 'lucide-react'

export const EmployerVacancyDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <button className="p-2 rounded-xl hover:bg-muted transition-colors flex-shrink-0">
            <ArrowLeft size={22} />
          </button>
          <Skeleton className="h-5 w-36 rounded-lg" />
        </div>
        <div className="flex lg:hidden items-center gap-1 flex-shrink-0">
          <Skeleton className="w-9 h-9 rounded-xl" />
          <Skeleton className="w-9 h-9 rounded-xl" />
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 lg:px-6 py-6 pb-28 space-y-6">
        {/* Title + actions */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <Skeleton className="h-8 w-3/4 rounded-lg" />
            <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
              <Skeleton className="w-9 h-9 rounded-xl" />
              <Skeleton className="w-9 h-9 rounded-xl" />
            </div>
          </div>

          {/* Company + meta row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-2">
            <div className="flex items-center gap-2">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="h-5 w-32 rounded-lg" />
            </div>
            <div className="w-full flex items-center gap-3 justify-between sm:justify-start lg:justify-end">
              <Skeleton className="h-4 w-40 rounded-lg" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-12 rounded-lg" />
                <Skeleton className="h-4 w-12 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Meta block */}
        <div className="bg-muted rounded-2xl p-4 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-4 h-4 rounded flex-shrink-0" />
              <Skeleton className="h-4 w-28 rounded-lg" />
              <Skeleton className="h-4 w-32 rounded-lg" />
            </div>
          ))}
        </div>

        {/* Responsibilities */}
        <section className="space-y-2">
          <Skeleton className="h-6 w-36 rounded-lg" />
          <div className="space-y-1.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-start gap-2">
                <Skeleton className="w-[5px] h-[5px] rounded-full mt-2 flex-shrink-0" />
                <Skeleton
                  className="h-4 rounded-lg"
                  style={{ width: `${70 + Math.random() * 25}%` }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Requirements */}
        <section className="space-y-2">
          <Skeleton className="h-6 w-28 rounded-lg" />
          <div className="space-y-1.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start gap-2">
                <Skeleton className="w-[5px] h-[5px] rounded-full mt-2 flex-shrink-0" />
                <Skeleton
                  className="h-4 rounded-lg"
                  style={{ width: `${60 + Math.random() * 35}%` }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Conditions */}
        <section className="space-y-2">
          <Skeleton className="h-6 w-24 rounded-lg" />
          <div className="space-y-1.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-start gap-2">
                <Skeleton className="w-[5px] h-[5px] rounded-full mt-2 flex-shrink-0" />
                <Skeleton
                  className="h-4 rounded-lg"
                  style={{ width: `${65 + Math.random() * 30}%` }}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Fixed bottom bar */}
      <div className="fixed bottom-[71px] lg:bottom-0 left-0 right-0 lg:left-[260px] bg-background border-t border-border p-4 z-20">
        <div className="max-w-3xl mx-auto flex gap-3 justify-center">
          <Skeleton className="max-w-[380px] flex-1 h-12 rounded-2xl" />
          <Skeleton className="hidden md:block flex-1 h-12 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
