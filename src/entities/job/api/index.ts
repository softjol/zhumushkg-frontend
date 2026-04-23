import { useUserStore } from '@/entities/user/model/store'
import { Job } from '../model/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function getVacancies(): Promise<Job[]> {
  const res = await fetch(`${BASE_URL}/vacancy`)
  if (!res.ok) throw new Error('Не удалось загрузить вакансии')
  return res.json()
}

export async function getVacancyById(id: number): Promise<Job> {
  const res = await fetch(`${BASE_URL}/vacancy/${id}`)
  if (!res.ok) throw new Error('Вакансия не найдена')
  return res.json()
}

interface VacancyApplyData {
  vacancyId: number
  userId: number
}

export async function applyToVacancy(data: VacancyApplyData): Promise<void> {
  const { token } = useUserStore.getState()
  console.log(token)
  const res = await fetch(`${BASE_URL}/applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error('Не удалось отправить отклик')
  }
  return res.json()
}
