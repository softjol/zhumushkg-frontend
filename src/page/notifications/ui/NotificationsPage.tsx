'use client'

import { Button } from '@/shared/ui/button'
import { ArrowLeft, Bell, Check } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getNotifications, readAllNotifications } from '@/entities/notifications/api'
import { Notification } from '@/entities/notifications/model/type'
import { useNotificationStore } from '@/entities/notifications/model/store'
import { NotificationComponent } from './NotificationComponent'
import { useUserStore } from '@/entities/user/model/store'
import { AuthRequired } from '@/widgets/auth-required/ui/AuthRequired'

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[] | null>()
  const [loading, setLoading] = useState(true)
  const [readingAll, setReadingAll] = useState(false)
  const { setHasUnread } = useNotificationStore()
  const { isAuthenticated, isLoading: authLoading } = useUserStore()

  useEffect(() => {
    if (authLoading) return
    if (!isAuthenticated) {
      setLoading(false)
      return
    }
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications()
        setNotifications(data)
      } catch (error) {
        console.log('Ошибка при загрузке уведомлений:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchNotifications()
  }, [isAuthenticated, authLoading])

  const handleReadAll = async () => {
    const unread = notifications?.filter((n) => !n.isRead) ?? []
    if (unread.length === 0) return
    setReadingAll(true)
    try {
      await readAllNotifications(unread.map((n) => n.id))
      setNotifications((prev) => prev?.map((n) => ({ ...n, isRead: true })) ?? prev)
      setHasUnread(false)
    } catch (error) {
      console.log('Ошибка при прочтении уведомлений:', error)
    } finally {
      setReadingAll(false)
    }
  }

  if (!loading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-20 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
          <Link href={'/jobs'}>
            <button className="p-1.5 rounded-xl hover:bg-muted">
              <ArrowLeft size={22} />
            </button>
          </Link>
          <span className="flex-1 font-semibold">Уведомления</span>
        </header>
        <AuthRequired description="Войдите, чтобы видеть уведомления" />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-20 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
          <Link href={'/jobs'}>
            <button className="p-1.5 rounded-xl hover:bg-muted">
              <ArrowLeft size={22} />
            </button>
          </Link>
          <span className="flex-1 font-semibold">Уведомления</span>
        </header>
        <div className="max-w-2xl mx-auto p-4 space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-2xl animate-pulse">
              <div className="flex-1 min-w-0 space-y-2">
                <div className="h-4 w-40 rounded bg-muted" />
                <div className="h-3 w-64 rounded bg-muted" />
                <div className="h-3 w-20 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <Link href={'/jobs'}>
          <button className="p-1.5 rounded-xl hover:bg-muted">
            <ArrowLeft size={22} />
          </button>
        </Link>
        <span className="flex-1 font-semibold">Уведомления</span>
        <Button size="sm" variant="ghost" className="rounded-xl text-xs" onClick={handleReadAll} disabled={readingAll}>
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
