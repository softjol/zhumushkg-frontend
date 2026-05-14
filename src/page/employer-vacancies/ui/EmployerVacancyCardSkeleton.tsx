'use client';

import { Skeleton } from "@/shared/ui/skeleton";

export const EmployerVacancyCardSkeleton = () => (
  <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
    {/* Header: title + menu */}
    <div className="flex items-start justify-between">
      <div className="flex-1 min-w-0 space-y-2">
        <Skeleton className="h-6 w-48 rounded-lg" />
        <Skeleton className="h-5 w-28 rounded-lg" />
        <Skeleton className="h-4 w-36 rounded-lg" />
      </div>
      <Skeleton className="w-7 h-7 rounded-lg shrink-0" />
    </div>

    {/* Stats: views, favorites, applicants */}
    <div className="flex items-center gap-4">
      <Skeleton className="h-4 w-12 rounded-lg" />
      <Skeleton className="h-4 w-12 rounded-lg" />
      <Skeleton className="h-4 w-12 rounded-lg" />
    </div>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-2">
      <Skeleton className="flex-1 h-11 rounded-2xl" />
      <Skeleton className="flex-1 h-11 rounded-2xl" />
    </div>
  </div>
)