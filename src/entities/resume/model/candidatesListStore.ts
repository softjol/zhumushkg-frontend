import { create } from 'zustand'
import { Resume } from './types'

interface CandidatesListStore {
  candidates: Resume[]
  loading: boolean
  cachedParamsKey: string | null
  setCandidates: (candidates: Resume[], paramsKey: string) => void
  setLoading: (v: boolean) => void
}

export const useCandidatesListStore = create<CandidatesListStore>((set) => ({
  candidates: [],
  loading: false,
  cachedParamsKey: null,
  setCandidates: (candidates, paramsKey) => set({ candidates, cachedParamsKey: paramsKey }),
  setLoading: (loading) => set({ loading }),
}))
