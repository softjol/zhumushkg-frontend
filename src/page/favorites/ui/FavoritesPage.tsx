'use client'
import { JobCard } from '@/entities/job/ui/JobCard'
import { jobsData } from '@/page/jobs/model/mockData'
import { Button } from '@/shared/ui/button'
import { Heart } from 'lucide-react'
import Link from 'next/link'

export const FavoritesPage = () => {
  const favorites = jobsData.slice(0, 2).map((j) => ({ ...j, isFavorite: true }))

  return (
    <div className="px-4 lg:px-6 py-4 lg:py-6">
      <h1 className="text-xl font-bold text-foreground mb-4">Избранное</h1>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {favorites.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Heart size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="font-semibold text-foreground">Сохраняйте вакансии</p>
          <p className="text-sm text-muted-foreground mt-1">чтобы вернуться к ним позже</p>
          <Button asChild className="mt-8 rounded-2xl h-11 text-base px-6">
            <Link href="/">Найти вакансии</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
