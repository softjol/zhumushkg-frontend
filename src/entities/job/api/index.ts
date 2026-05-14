import { Job } from '../model/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export interface VacancyParams {
  search?: string
  city?: string
  region?: string
  position?: string
  experience_work?: string
  payment_period?: string
  salary_from?: number
  salary_to?: number
  remote_work?: boolean
  work_schedule?: string
}

export async function getVacancies(params?: VacancyParams): Promise<Job[]> {
  const query = new URLSearchParams()
  if (params) {
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== '') query.set(key, String(val))
    })
  }
  const res = await fetch(`${BASE_URL}/vacancy?${query.toString()}`)
  if (!res.ok) throw new Error('Не удалось загрузить вакансии')
  return res.json()
}

export async function getVacancyById(id: number): Promise<Job> {
  const res = await fetch(`${BASE_URL}/vacancy/${id}`)
  if (!res.ok) throw new Error('Вакансия не найдена')
  return res.json()
}
