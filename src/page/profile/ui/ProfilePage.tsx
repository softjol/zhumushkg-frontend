'use client'
import { useUserStore } from '@/entities/user/model/store'
import { ROUTES } from '@/shared/config/routes'
import { Button } from '@/shared/ui/button'
import { Switch } from '@/shared/ui/switch'
import { AuthRequired } from '@/widgets/auth-required/ui/AuthRequired'
import {
  FileText,
  ClipboardList,
  Heart,
  Bell,
  Globe,
  Shield,
  FileQuestion,
  LogOut,
  Trash2,
  ChevronRight,
  User,
  LogIn,
} from 'lucide-react'
import Link from 'next/link'

const menuItems = [
  { icon: FileText, label: 'Моё резюме', path: '/resume', chevron: true },
  { icon: ClipboardList, label: 'Мои отклики', path: '/applications', chevron: true },
]

export const ProfilePage = () => {
  const { user, logout, isAuthenticated } = useUserStore()

  return (
    <div className="px-4 lg:px-6 pt-4 lg:pt-6">
      <h1 className=" text-xl font-bold text-foreground mb-4">Кабинет</h1>
      {isAuthenticated ? (
        <div className="px-4 lg:px-6 py-4 lg:py-6 max-w-3xl mx-auto">
          {/* User info */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-card border border-border rounded-2xl">
            <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center">
              <User size={24} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-base text-foreground">{user?.firstName}</p>
              <p className="text-base text-muted-foreground">{user?.phone}</p>
            </div>
          </div>

          {/* Menu */}
          <div className="space-y-1 mb-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
              >
                <item.icon size={22} className="text-muted-foreground" />
                <span className="flex-1 text-base font-medium text-foreground">{item.label}</span>
                {item.chevron && <ChevronRight size={18} className="text-muted-foreground" />}
              </Link>
            ))}
          </div>

          {/* Settings */}
          <div className="border-t border-border pt-4 space-y-1">
            <h3 className="text-sm font-semibold text-muted-foreground px-3 mb-2 uppercase tracking-wider">
              Настройки
            </h3>

            <div className="flex items-center gap-3 p-3 rounded-xl">
              <Bell size={22} className="text-muted-foreground" />
              <span className="flex-1 text-base font-medium">Уведомления</span>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl">
              <Globe size={22} className="text-muted-foreground" />
              <span className="flex-1 text-base font-medium">Язык</span>
              <span className="text-base text-muted-foreground">Русский</span>
            </div>

            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
            >
              <Shield size={22} className="text-muted-foreground" />
              <span className="flex-1 text-base font-medium">Политика конфиденциальности</span>
              <ChevronRight size={18} className="text-muted-foreground" />
            </a>

            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
            >
              <FileQuestion size={22} className="text-muted-foreground" />
              <span className="flex-1 text-base font-medium">Связаться с поддержкой</span>
              <ChevronRight size={18} className="text-muted-foreground" />
            </a>
          </div>

          {/* Danger zone */}
          <div className="border-t border-border pt-4 mt-4 space-y-2">
            <Button
              onClick={logout}
              variant="outline"
              className="w-full justify-start rounded-xl text-destructive hover:text-destructive text-base h-12"
            >
              <LogOut size={22} className="mr-3" /> Выйти из аккаунта
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start rounded-xl text-destructive/60 hover:text-destructive text-base h-12"
            >
              <Trash2 size={22} className="mr-3" /> Удалить аккаунт
            </Button>
          </div>
        </div>
      ) : (
        <AuthRequired />
      )}
    </div>
  )
}
