'use client'
import { Skeleton } from "@/shared/ui/skeleton";

export const CandidateCardSkeleton = () => (
  <div className="bg-white rounded-[24px] p-5 sm:p-6 border border-slate-100 shadow flex gap-4">
    {/* Avatar desktop */}
    <div className="hidden md:flex shrink-0 pt-0.5">
      <Skeleton className="w-18 h-18 rounded-full" />
    </div>

    <div className="flex-1 min-w-0">
      {/* Mobile: avatar + name */}
      <div className="flex md:hidden items-center gap-3 mb-3">
        <Skeleton className="w-14 h-14 rounded-full shrink-0" />
        <div className="min-w-0 space-y-1.5">
          <Skeleton className="h-4 w-24 rounded-lg" />
          <Skeleton className="h-5 w-36 rounded-lg" />
        </div>
      </div>

      {/* Desktop: name + salary */}
      <div className="hidden md:flex justify-between items-start gap-3">
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-28 rounded-lg" />
          <Skeleton className="h-6 w-44 rounded-lg" />
        </div>
        <div className="text-right space-y-1.5">
          <Skeleton className="h-5 w-32 rounded-lg" />
          <Skeleton className="h-4 w-16 rounded-lg" />
        </div>
      </div>

      {/* Meta */}
      <div className="flex gap-x-3 gap-y-1.5 mt-3">
        <Skeleton className="h-4 w-20 rounded-lg" />
        <Skeleton className="h-4 w-16 rounded-lg" />
        <Skeleton className="h-4 w-24 rounded-lg" />
      </div>

      {/* Description */}
      <div className="space-y-1.5 mt-3">
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-4/5 rounded-lg" />
      </div>

      {/* Desktop: skills + button */}
      <div className="hidden md:flex items-center justify-between gap-3 mt-4">
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16 rounded-[12px]" />
          <Skeleton className="h-8 w-20 rounded-[12px]" />
          <Skeleton className="h-8 w-14 rounded-[12px]" />
        </div>
        <Skeleton className="h-10 w-28 rounded-2xl" />
      </div>

      {/* Mobile: skills + salary + button */}
      <div className="flex md:hidden flex-col gap-3 mt-3">
        <div className="flex gap-2 flex-wrap">
          <Skeleton className="h-8 w-16 rounded-[12px]" />
          <Skeleton className="h-8 w-20 rounded-[12px]" />
          <Skeleton className="h-8 w-14 rounded-[12px]" />
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-28 rounded-lg" />
            <Skeleton className="h-4 w-14 rounded-lg" />
          </div>
          <Skeleton className="h-10 w-28 rounded-2xl" />
        </div>
      </div>
    </div>
  </div>
)
