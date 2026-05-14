import { useUserStore } from '@/entities/user/model/store'
import { Job, JobFormData } from '../model/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

function getAuthHeaders() {
  const { token } = useUserStore.getState()
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

// Создать вакансию (POST /vacancy)
export async function createVacancy(data: JobFormData): Promise<Job> {
  const res = await fetch(`${BASE_URL}/vacancy`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    console.log('Ошибка при создании вакансии:', res)
    throw new Error('Не удалось создать вакансию')
  }
  return res.json()
}

// Все вакансии (GET /vacancy)
export async function getAllVacancies(): Promise<Job[] | null> {
  const res = await fetch(`${BASE_URL}/vacancy`, {
    method: 'GET',
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Не удалось загрузить вакансии')
  return res.json()
}

// Мои вакансии (GET /vacancy/my) — JWT
export async function getMyVacancies(): Promise<Job[] | null> {
  const res = await fetch(`${BASE_URL}/vacancy/my`, {
    method: 'GET',
    headers: getAuthHeaders(),
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Не удалось загрузить мои вакансии')
  return res.json()
}

export async function getVacancy(id: number): Promise<Job> {
  const res = await fetch(`${BASE_URL}/vacancy/${id}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  })
  if (!res.ok) throw new Error('Не удалось загрузить вакансию')
  return res.json()
}

// Обновить вакансию (PATCH /vacancy/{id})
export async function updateVacancy(id: number, data: Partial<JobFormData>): Promise<Job> {
  const res = await fetch(`${BASE_URL}/vacancy/${id}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Не удалось обновить вакансию')
  return res.json()
}

// Удалить вакансию (DELETE /vacancy/{id})
export async function deleteVacancy(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/vacancy/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })
  if (!res.ok) throw new Error('Не удалось удалить вакансию')
}

// Кандидаты по вакансии (GET /vacancy/my/{id}/candidates) — JWT
export async function getVacancyCandidates(id: number): Promise<unknown[]> {
  const res = await fetch(`${BASE_URL}/vacancy/my/${id}/candidates`, {
    method: 'GET',
    headers: getAuthHeaders(),
  })
  if (!res.ok) throw new Error('Не удалось загрузить кандидатов')
  return res.json()
}