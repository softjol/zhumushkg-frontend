export interface Job {
  id: number
  user_id: number
  profession: string
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
  createdAt: string // ISO 8601
  updatedAt: string // ISO 8601
}
