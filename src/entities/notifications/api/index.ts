import { useUserStore } from "@/entities/user/model/store"
import { Notification } from "../model/type"



const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function getNotifications(): Promise<Notification[]> {
    const {user} = useUserStore.getState()

    const res = await fetch(`${BASE_URL}/notification/my/${user?.id}`, {
        method: 'GET',
    })

    if(!res.ok){
        throw new Error('Не удалось получить уведомления')
    }
    return res.json()
}

export async function readNotications(id: number): Promise<Notification[]> {
  const res = await fetch(`${BASE_URL}/notifications/my/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(id),
  })
  if (!res.ok) throw new Error('Не удалось прочитать уведомления')
  return res.json()
}