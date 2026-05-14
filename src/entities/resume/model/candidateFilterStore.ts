import { create } from 'zustand'

interface CandidateFilterStore {
  city: string
  position: string
  schedule: string
  experience: string
  salaryFrom: string
  salaryTo: string
  category: string
  setFilter: <K extends keyof Omit<CandidateFilterStore, 'setFilter' | 'clearFilters'>>(
    key: K,
    value: CandidateFilterStore[K],
  ) => void
  clearFilters: () => void
}

const initialState = {
  city: '',
  position: '',
  schedule: '',
  experience: '',
  salaryFrom: '',
  salaryTo: '',
  category: '',
}

export const useCandidateFilterStore = create<CandidateFilterStore>((set) => ({
  ...initialState,
  setFilter: (key, value) => set({ [key]: value }),
  clearFilters: () => set(initialState),
}))
