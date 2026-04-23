

export interface Resume {
  id: number
  user_id: number
  description: string
  work_schedule: string
  payment_period: string
  salary_net: string        // decimal string from API
  birth_date: string        // "YYYY-MM-DD"
  phone_number: string      // "+996XXXXXXXXX"
  city: string
  education: string
  work_experience: string
  skills: string[]
  personal_qualities: string
  photo: string             // URL
  createdAt: string         // ISO datetime
  updatedAt: string         // ISO datetime
}