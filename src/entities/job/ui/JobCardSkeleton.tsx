import { Skeleton } from '@/shared/ui/skeleton'

export const JobCardSkeleton = () => (
  <div className="bg-card rounded-2xl p-5 shadow flex flex-col gap-3">
    {/* Заголовок + дата */}
    <div className="flex items-start justify-between gap-3">
      <Skeleton className="h-6 w-3/4 rounded-lg" />
      <Skeleton className="h-4 w-16 rounded-lg" />
    </div>
    {/* Компания + город */}
    <div className="flex items-center gap-2">
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-4 w-28 rounded-lg" />
      <Skeleton className="h-5 w-16 rounded-full" />
    </div>
    {/* Теги */}
    <div className="flex gap-2 mt-1">
      <Skeleton className="h-6 w-20 rounded-lg" />
      <Skeleton className="h-6 w-20 rounded-lg" />
    </div>
    {/* Зарплата */}
    <Skeleton className="h-5 w-32 rounded-lg mt-1" />
    {/* Кнопка + иконки */}
    <div className="flex items-center justify-between mt-2">
      <Skeleton className="h-10 w-[200px] rounded-2xl" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  </div>
)
