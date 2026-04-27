import { useUserStore } from '@/entities/user/model/store'
import { Resume, ResumeFormData } from '../model/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

function getAuthHeaders() {
  const { token } = useUserStore.getState()
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

// Создать резюме (POST /resume)
export async function createResume(data: ResumeFormData): Promise<Resume> {
  const res = await fetch(`${BASE_URL}/resume`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    console.log('Ошибка при создании резюме:', res)
    throw new Error('Не удалось создать резюме')
  }
  return res.json()
}

// Моё резюме (GET /resume/my) — возвращает одно или null
export async function getMyResume(): Promise<Resume | null> {
  const res = await fetch(`${BASE_URL}/resume/my`, {
    method: 'GET',
    headers: getAuthHeaders(),
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Не удалось загрузить резюме')

  const data: Resume[] = await res.json()
  return data[0] ?? null // берём первый элемент, если массив пустой — null
}

// Обновить резюме (PATCH /resume/{id})
export async function updateResume(id: number, data: Partial<ResumeFormData>): Promise<Resume> {
  const res = await fetch(`${BASE_URL}/resume/${id}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Не удалось обновить резюме')
  return res.json()
}

// Удалить резюме (DELETE /resume/{id})
export async function deleteResume(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/resume/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })
  if (!res.ok) throw new Error('Не удалось удалить резюме')
}

// Моё резюме (GET /resume/my) — возвращает одно или null
export async function getAllResume(): Promise<Resume[] | null> {
  const res = await fetch(`${BASE_URL}/resume`, {
    method: 'GET',
    // headers: getAuthHeaders(),
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Не удалось загрузить резюме')

  const data: Resume[] = await res.json()
  return data // возвращаем весь массив резюме
}
