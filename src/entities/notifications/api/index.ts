import { useUserStore } from "@/entities/user/model/store"
import { Notification } from "../model/type"

const BASE_URL = '/api-proxy'

export async function getNotifications(): Promise<Notification[]> {
    const { token } = useUserStore.getState()

    const res = await fetch(`${BASE_URL}/notification/my`, {
        method: 'GET',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })

    if (!res.ok) {
        throw new Error('Не удалось получить уведомления')
    }
    const json = await res.json()
    return Array.isArray(json) ? json : (json.data ?? [])
}

export async function readNotification(id: number): Promise<void> {
  const { token } = useUserStore.getState()
  const res = await fetch(`${BASE_URL}/notification/${id}/read`, {
    method: 'PATCH',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (!res.ok) throw new Error('Не удалось прочитать уведомление')
}

export async function readAllNotifications(ids: number[]): Promise<void> {
  await Promise.all(ids.map((id) => readNotification(id)))
}