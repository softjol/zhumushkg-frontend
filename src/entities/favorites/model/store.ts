import { create } from 'zustand'

interface FavoritesStore {
  favoritesMap: Map<number, number>
  setFavorites: (map: Map<number, number>) => void
  addFavorite: (vacancyId: number, favoriteId: number) => void
  removeFavorite: (vacancyId: number) => void
  isFavorite: (vacancyId: number) => boolean
  getFavoriteId: (vacancyId: number) => number | null
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favoritesMap: new Map(),

  setFavorites: (map) => set({ favoritesMap: map }),

  addFavorite: (vacancyId, favoriteId) =>
    set((state) => {
      const next = new Map(state.favoritesMap)
      next.set(vacancyId, favoriteId)
      return { favoritesMap: next }
    }),

  removeFavorite: (vacancyId) =>
    set((state) => {
      const next = new Map(state.favoritesMap)
      next.delete(vacancyId)
      return { favoritesMap: next }
    }),

  isFavorite: (vacancyId) => get().favoritesMap.has(vacancyId),
  getFavoriteId: (vacancyId) => get().favoritesMap.get(vacancyId) ?? null,
}))
