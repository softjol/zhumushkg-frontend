'use client'

import { useRouter } from 'next/navigation'
import { useUserStore } from '@/entities/user/model/store'
import { AuthRequiredModal } from '@/widgets/auth-required/ui/AuthRequiredModal'
import { SearchBar } from '@/features/search-bar/ui/SearchBar'
import Link from 'next/link'
import iconLogo from '@/assets/icons/Logo.svg'
import Image from 'next/image'
import { Bell } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getNotifications } from '@/entities/notifications/api'
import { useNotificationStore } from '@/entities/notifications/model/store'

export function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { isAuthenticated, user } = useUserStore()
  const { hasUnread, setHasUnread } = useNotificationStore()
  const router = useRouter()

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications()
        setHasUnread(data.some((n) => !n.isRead))
      } catch (error) {
        console.log('Ошибка при загрузке уведомлений:', error)
      }
    }
    fetchNotifications()
  }, [])

  const handleNotificationClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
    } else {
      const path =
        user?.role?.toUpperCase() === 'EMPLOYER' ? '/employer/notifications' : '/notifications'
      router.push(path)
    }
  }

  return (
    <header className="h-[64px] lg:h-[73px] flex items-center gap-4 px-4 py-3 lg:px-6 lg:py-4 border-b border-border bg-background sticky top-0 z-20 ">
      {/* Desktop Search bar */}
      <div className="hidden lg:flex w-full justify-between items-center">
        <SearchBar />
        <div
          onClick={handleNotificationClick}
          className="group bg-muted p-2.5 rounded-full cursor-pointer hover:shadow-md transition-all relative "
        >
          <Bell className="text-muted-foreground group-hover:text-primary transition-colors" />
          {hasUnread && (
            <div className="absolute w-1.5 h-1.5 bg-primary rounded-full top-2 right-2"></div>
          )}
        </div>
      </div>
      {/* Mobile header */}
      <div className="w-full flex lg:hidden justify-between items-center">
        <Link href={'/jobs'} className="flex  justify-start items-center gap-2">
          <div className={'text-[24px] flex items-center font-bold'}>
            Ж
            <Image src={iconLogo} alt="logo" className="w-[18px] mt-[1px]" />
            муш.kg
          </div>
        </Link>
        <div
          onClick={handleNotificationClick}
          className="group bg-muted p-2.5 rounded-full cursor-pointer hover:shadow-md transition-all relative "
        >
          <Bell className="text-muted-foreground group-hover:text-primary transition-colors" />
          {hasUnread && (
            <div className="absolute w-1.5 h-1.5 bg-primary rounded-full top-2 right-2"></div>
          )}
        </div>
      </div>
      <AuthRequiredModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </header>
  )
}
