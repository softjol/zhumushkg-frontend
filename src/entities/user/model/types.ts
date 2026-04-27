export interface User {
  id: string
  firstName: string
  phoneNumber: string
  phoneConfirmed?: string
  smsCode?: string
  role: 'candidate' | 'employer'
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
