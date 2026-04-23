export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  phone?: string
  role: 'seeker' | 'employer'
  createdAt: string
  updatedAt: string
}

export interface EmployerProfile extends User {
  role: 'employer'
  company: Company
  vacancies: string[]
  applicants: string[]
}

export interface Company {
  id: string
  name: string
  description: string
  website?: string
  logo?: string
  employees: number
  industry: string
}
