import { useUserStore } from '@/entities/user/model/store'
import { FavoriteItem } from '../model/type'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function addToFavorites(vacancyId: number): Promise<FavoriteItem> {
  const { token } = useUserStore.getState()
  const res = await fetch(`${BASE_URL}/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ vacancy_id: vacancyId }),
  })
  if (!res.ok) throw new Error('Не удалось добавить в избранное')
  return res.json()
}

export async function getFavorites(): Promise<FavoriteItem[]> {
  const { token } = useUserStore.getState()

  const res = await fetch(`${BASE_URL}/favorites`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error('Не удалось получить избранное')
  }

  return res.json()
}

export async function removeFromFavorites(id: number): Promise<void> {
  const { token } = useUserStore.getState()

  const res = await fetch(`${BASE_URL}/favorites/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error('Не удалось удалить из избранного')
  }
}
