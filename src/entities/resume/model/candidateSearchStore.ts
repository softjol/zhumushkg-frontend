import { create } from 'zustand'

interface CandidateSearchStore {
  query: string
  setQuery: (query: string) => void
}

export const useCandidateSearchStore = create<CandidateSearchStore>((set) => ({
  query: '',
  setQuery: (query) => set({ query }),
}))
