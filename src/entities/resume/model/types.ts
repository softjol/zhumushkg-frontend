export interface WorkExperience {
  company: string
  position: string
  start_month: number
  start_year: number
  end_month?: number // optional number, не never
  end_year?: number // optional number, не never
  until_now: boolean
  description: string
}

export interface Resume {
  id: number
  user_id: number
  position: string
  description: string
  work_schedule: string
  payment_period: string
  salary_net: number
  birth_date: string
  phone_number: string
  city: string
  education: string
  work_experience: WorkExperience[]
  skills: string[] // ← массив, API ожидает массив
  personal_qualities: string
  photo: string
  createdAt: string
  updatedAt: string
}

export type ResumeFormData = Omit<Resume, 'id' | 'user_id' | 'createdAt' | 'updatedAt'>
