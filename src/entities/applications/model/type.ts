export interface WorkExperience {
  company: string
  position: string
  description: string
  start_month: number
  start_year: number
  end_month: number
  end_year: number
  until_now: boolean
}

export interface Resume {
  id: number
  user_id: number
  description: string
  position: string
  category: string
  work_schedule: string
  payment_period: string
  salary_net: number
  birth_date: string
  phone_number: string
  city: string
  education: string
  work_experience: WorkExperience[]
  skills: string[]
  personal_qualities: string
  photo: string
  createdAt: string
  updatedAt: string
}

export interface Vacancy {
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
  createdAt: string
  updatedAt: string
}

export interface Application {
  id: number
  vacancy_id: number
  candidate_id: number
  resume_id: number
  status: 'NEW' | 'REVIEWED' | 'ACCEPTED' | 'REJECTED'
  created_at: string
  updated_at: string
  vacancy: Vacancy
  resume: Resume
}

export interface Candidate {
  id: number
  firstName: string
  phoneNumber: string
  phoneConfirmed: boolean
  smsCode: string | null
  isBanned: boolean
}

export interface VacancyCandidate {
  id: number
  vacancy_id: number
  candidate_id: number
  resume_id: number
  status: 'NEW' | 'REVIEWING' | 'INTERVIEW' | 'OFFER' | 'HIRED' | 'REJECTED'
  created_at: string
  updated_at: string
  candidate: Candidate
  resume: Resume
}
