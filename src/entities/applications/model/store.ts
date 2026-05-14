import { create } from 'zustand'

interface ApplicationsStore {
  appliedIds: Set<number>
  setApplied: (ids: Set<number>) => void
  addApplied: (vacancyId: number) => void
  isApplied: (vacancyId: number) => boolean
}

export const useApplicationsStore = create<ApplicationsStore>((set, get) => ({
  appliedIds: new Set(),

  setApplied: (ids) => set({ appliedIds: ids }),

  addApplied: (vacancyId) =>
    set((state) => {
      const next = new Set(state.appliedIds)
      next.add(vacancyId)
      return { appliedIds: next }
    }),

  isApplied: (vacancyId) => get().appliedIds.has(vacancyId),
}))
