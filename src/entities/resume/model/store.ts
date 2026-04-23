import { create } from 'zustand'
import { Resume } from './types'

interface ResumeStore {
  resume: Resume | null
  setResume: (resume: Resume | null) => void
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: null,
  setResume: (resume) => set({ resume }),
}))
