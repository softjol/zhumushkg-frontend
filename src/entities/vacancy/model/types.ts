export interface Job {
  id: number
  user_id: number
  position: string
  category: string | null
  work_schedule: string
  requirements: string | null
  conditions: string | null
  description: string | null
  experience_work: string
  remote_work: boolean
  city: string
  work_address: string
  region: string
  payment_period: string
  salary_net: number
  views: number
  favorite: number
  offers: number
  company: string
  company_description: string | null
  createdAt: string
  updatedAt: string
}

export type JobFormData = Omit<
  Job,
  'id' | 'user_id' | 'views' | 'favorite' | 'offers' | 'createdAt' | 'updatedAt'
>
