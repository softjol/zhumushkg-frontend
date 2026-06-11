import { useUserStore } from '@/entities/user/model/store'
import { Application, VacancyCandidate } from '../model/type'

const BASE_URL = '/api-proxy'

interface VacancyApplyData {
  vacancy_id: number
  resume_id: number
}

export async function applyToVacancy(data: VacancyApplyData): Promise<void> {
  const { token } = useUserStore.getState()
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

export async function getMyApplications(): Promise<Application[]> {
  const { token } = useUserStore.getState()

  const res = await fetch(`${BASE_URL}/applications/my`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error('Не удалось получить ващи отклики')
  }

  return res.json()
}

export async function removeApplication(id: number): Promise<void> {
  const { token } = useUserStore.getState()
  const res = await fetch(`${BASE_URL}/applications/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error('Не удалось удалить отклик')
  }
}

// ==================================================

export async function getVacancyCandidates(vacancyId: number): Promise<VacancyCandidate[]> {
  const { token } = useUserStore.getState()
  const res = await fetch(`${BASE_URL}/vacancy/my/${vacancyId}/candidates`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) throw new Error('Не удалось загрузить кандидатов')
  return res.json()
}

export async function updateApplicationStatus(
  applicationId: number,
  status: string
): Promise<void> {
  const { token } = useUserStore.getState()
  const res = await fetch(`${BASE_URL}/applications/${applicationId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    console.error('updateApplicationStatus error:', res.status, err)
    throw new Error('Не удалось обновить статус')
  }
}
