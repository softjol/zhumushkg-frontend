import { useUserStore } from '@/entities/user/model/store'
import { Resume } from '../model/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function createResume(data: Resume): Promise<void> {
  const { token } = useUserStore.getState()

  const res = await fetch(`${BASE_URL}/resume`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error('Не удалось создать резюме')
  return res.json()
}

export async function getMyResume(): Promise<Resume[]> {
  const { token } = useUserStore.getState()

  const res = await fetch(`${BASE_URL}/resume`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) throw new Error('Не удалось загрузить резюме')
  return res.json()
}
