'use client'

import { Skeleton } from "@/shared/ui/skeleton"
import { ArrowLeft } from "lucide-react"

export const CandidateDetailSkeleton = () => (
  <div className="flex flex-col min-h-screen bg-[#f4f7fe] pb-10 font-sans">
    <header className="sticky top-0 z-20 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
      <div className="p-1.5 rounded-xl">
        <ArrowLeft size={22} />
      </div>
    </header>

    <div className="max-w-5xl mx-auto w-full p-4 lg:p-8 space-y-2 lg:space-y-4 pt-6 lg:pt-10">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-4 lg:p-6 flex flex-col gap-2 shadow-sm border border-slate-100">
        <div className="flex flex-row gap-6 items-start w-full">
          <Skeleton className="w-20 h-20 rounded-full shrink-0" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-36 rounded-lg" />
            <div className="flex items-center gap-2 flex-wrap">
              <Skeleton className="h-6 w-44 rounded-lg" />
              <Skeleton className="h-5 w-40 rounded-xl" />
            </div>
            <div className="hidden lg:flex flex-wrap items-center gap-6 mt-1">
              <Skeleton className="h-5 w-32 rounded-lg" />
              <Skeleton className="h-5 w-28 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Mobile contacts */}
        <div className="flex lg:hidden flex-col gap-3 mt-5 mb-2">
          <Skeleton className="h-5 w-32 rounded-lg" />
          <Skeleton className="h-5 w-28 rounded-lg" />
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 lg:gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-1 lg:p-4 flex items-center gap-2">
              <Skeleton className="h-4 w-28 rounded-lg" />
              <Skeleton className="h-5 w-24 rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* About Me */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100 space-y-3">
        <Skeleton className="h-6 w-24 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-11/12 rounded-lg" />
          <Skeleton className="h-4 w-4/5 rounded-lg" />
        </div>
      </div>

      {/* Work Experience */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100 space-y-6">
        <Skeleton className="h-6 w-36 rounded-lg mb-4" />
        <div className="space-y-10">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-4 pb-6 border-b border-slate-50 last:border-0 last:pb-0">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2">
                <div className="space-y-1.5">
                  <Skeleton className="h-5 w-40 rounded-lg" />
                  <Skeleton className="h-5 w-32 rounded-lg" />
                </div>
                <Skeleton className="h-4 w-48 rounded-lg" />
              </div>
              <div className="pl-4 border-l-2 border-slate-200 space-y-1.5">
                <Skeleton className="h-4 w-full rounded-lg" />
                <Skeleton className="h-4 w-5/6 rounded-lg" />
                <Skeleton className="h-4 w-3/4 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education & Qualities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100 space-y-4">
            <Skeleton className="h-6 w-32 rounded-lg" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-4/5 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100 space-y-4">
        <Skeleton className="h-6 w-36 rounded-lg" />
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-10 rounded-xl"
              style={{ width: `${60 + Math.random() * 60}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
)