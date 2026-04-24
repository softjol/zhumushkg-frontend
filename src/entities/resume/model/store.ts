import { create } from 'zustand'
import { Resume } from './types'

interface ResumeStore {
  resume: Resume | null
  isLoading: boolean
  setResume: (resume: Resume | null) => void
  setLoading: (v: boolean) => void
  clearResume: () => void
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: null,
  isLoading: false,
  setResume: (resume) => set({ resume }),
  setLoading: (isLoading) => set({ isLoading }),
  clearResume: () => set({ resume: null }),
}))
