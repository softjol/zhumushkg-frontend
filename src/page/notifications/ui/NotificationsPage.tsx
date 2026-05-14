'use client'

import { Button } from '@/shared/ui/button'
import { ArrowLeft, Bell, Check } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getNotifications } from '@/entities/notifications/api'
import { Notification } from '@/entities/notifications/model/type'
import { NotificationComponent } from './NotificationComponent'

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[] | null>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications()
        console.log(data)
        setNotifications(data)
      } catch (error) {
        console.log('Ошибка при загрузке уведомлений:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchNotifications()
  }, [])

  if (loading) return <p className="text-center py-10">Загрузка...</p>

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <Link href={'/jobs'}>
          <button className="p-1.5 rounded-xl hover:bg-muted">
            <ArrowLeft size={22} />
          </button>
        </Link>
        <span className="flex-1 font-semibold">Уведомления</span>
        <Button size="sm" variant="ghost" className="rounded-xl text-xs">
          <Check size={14} className="mr-1" /> Прочитать все
        </Button>
      </header>

      <div className="max-w-2xl mx-auto p-4 space-y-1">
        {notifications?.length === 0 ? (
          <div className="text-center py-20">
            <Bell size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="font-semibold">Уведомлений пока нет</p>
          </div>
        ) : (
          notifications?.map((notification) => (
            <NotificationComponent key={notification.id} notification={notification} />
          ))
        )}
      </div>
    </div>
  )
}
