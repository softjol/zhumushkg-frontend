import { create } from 'zustand'

interface FilterStore {
  city: string
  position: string
  schedule: string
  experience: string
  period: string
  salaryFrom: string
  salaryTo: string
  remoteWork: boolean
  category: string
  setFilter: <K extends keyof Omit<FilterStore, 'setFilter' | 'clearFilters'>>(
    key: K,
    value: FilterStore[K],
  ) => void
  clearFilters: () => void
}

const initialState = {
  city: '',
  position: '',
  schedule: '',
  experience: '',
  period: '',
  salaryFrom: '',
  salaryTo: '',
  remoteWork: false,
  category: 'all',
}

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialState,
  setFilter: (key, value) => set({ [key]: value }),
  clearFilters: () => set(initialState),
}))
