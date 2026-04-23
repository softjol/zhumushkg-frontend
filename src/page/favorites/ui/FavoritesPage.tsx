'use client'
import { Button } from '@/shared/ui/button'
import { Heart, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useUserStore } from '@/entities/user/model/store'
import { useEffect, useState } from 'react'
import { AuthRequired } from '@/widgets/auth-required/ui/AuthRequired'
import { JobCard } from '@/entities/job/ui/JobCard'
import { FavoriteItem } from '@/entities/favorites/model/type'
import { getFavorites } from '@/entities/favorites/api'
import { useFavoritesStore } from '@/entities/favorites/model/store'

export const FavoritesPage = () => {
  const { isAuthenticated } = useUserStore()
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const { setFavorites: setFavoritesStore, favoritesMap } = useFavoritesStore()
  useEffect(() => {
    if (!isAuthenticated) return
    const fetchFavorites = async () => {
      try {
        const data = await getFavorites()
        setFavorites(data)
        const map = new Map(data.map((item) => [item.vacancy_id, item.id]))
        setFavoritesStore(map)
      } catch (error) {
        console.error('Ошибка при загрузке избранного:', error)
      }
    }
    fetchFavorites()
  }, [])
  return (
    <div className="px-4 lg:px-6 py-4 lg:py-6">
      <h1 className="text-xl font-bold text-foreground mb-4">Избранное</h1>
      {isAuthenticated ? (
        favorites.length !== 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {favorites
              .filter((item) => favoritesMap.has(item.vacancy_id))
              .map((item) => (
                <JobCard key={item.id} job={item.vacancy} />
              ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="font-semibold text-foreground">Сохраняйте вакансии</p>
            <p className="text-sm text-muted-foreground mt-1">чтобы вернуться к ним позже</p>
            <Button asChild className="mt-8 rounded-2xl h-11 text-base px-6">
              <Link href="/jobs">Найти вакансии</Link>
            </Button>
          </div>
        )
      ) : (
        <AuthRequired description="Войдите, чтобы видеть сохранённые вакансии" />
      )}
    </div>
  )
}
