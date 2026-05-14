import { create } from 'zustand'
import { Job } from './types'

interface JobStore {
  jobs: Job[]
  query: string
  loading: boolean
  cachedParamsKey: string | null
  setJobs: (jobs: Job[], paramsKey: string) => void
  setQuery: (query: string) => void
  setLoading: (v: boolean) => void
  getFilteredJobs: () => Job[]
}

export const useJobStore = create<JobStore>((set, get) => ({
  jobs: [],
  query: '',
  loading: false,
  cachedParamsKey: null,

  setJobs: (jobs, paramsKey) => set({ jobs, cachedParamsKey: paramsKey }),
  setQuery: (query) => set({ query }),
  setLoading: (loading) => set({ loading }),

  getFilteredJobs: () => {
    const { jobs, query } = get()
    if (!query.trim()) return jobs
    const q = query.toLowerCase()
    return jobs.filter(
      (job) => job.position.toLowerCase().includes(q) || job.company.toLowerCase().includes(q),
    )
  },
}))
