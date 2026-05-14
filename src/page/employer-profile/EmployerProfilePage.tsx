'use client'
import { useEffect, useState } from 'react'
import { useUserStore } from '@/entities/user/model/store'
import { Button } from '@/shared/ui/button'
import { AuthRequired } from '@/widgets/auth-required/ui/AuthRequired'
import { LogOut, User } from 'lucide-react'
import { RoleSwitcher } from '@/features/role-switcher/ui/RoleSwitcher'
import { useAppLayout } from '@/widgets/app-layout/model/use-app-layout'
import { getMyVacancies } from '@/entities/vacancy/api'
import { getVacancyCandidates } from '@/entities/applications/api'
import { Skeleton } from '@/shared/ui/skeleton'

// const menuItems = [
//   { icon: ClipboardList, label: 'Label', path: '/employer/profile', chevron: true },
// ]

interface Stats {
  active: number
  applications: number
  invited: number
}

export const EmployerProfilePage = () => {
  const { user, logout, isAuthenticated, isLoading } = useUserStore()
  const { role, switchRole } = useAppLayout()
  const [stats, setStats] = useState<Stats | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) return
    const fetchStats = async () => {
      try {
        const vacancies = await getMyVacancies()
        const list = vacancies ?? []
        const active = list.length

        const candidateLists = await Promise.all(list.map((v) => getVacancyCandidates(v.id).catch(() => [])))
        const allCandidates = candidateLists.flat()
        const applications = allCandidates.length
        const invited = allCandidates.filter((c) =>
          ['INTERVIEW', 'OFFER', 'HIRED'].includes(c.status)
        ).length

        setStats({ active, applications, invited })
      } catch (e) {
        console.error(e)
        setStats({ active: 0, applications: 0, invited: 0 })
      } finally {
        setStatsLoading(false)
      }
    }
    fetchStats()
  }, [isAuthenticated])

  if (isLoading) return null

  return (
    <div className="px-4 lg:px-6 pt-4 lg:pt-6">
      <h1 className=" text-xl font-bold text-foreground mb-2">Кабинет</h1>
      {isAuthenticated ? (
        <div className="max-w-3xl mx-auto">
          <div className='lg:hidden'>
            <RoleSwitcher currentRole={role} onRoleChange={switchRole} />
          </div>
          <div className="flex flex-row gap-4 mt-3 mb-6 p-4 bg-card border border-border rounded-2xl">
            <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center">
              <User size={24} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-base text-foreground">{user?.firstName}</p>
              <p className="text-base text-muted-foreground">{user?.phoneNumber}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Активных', value: stats?.active },
              { label: 'Откликов', value: stats?.applications },
              { label: 'Приглашено', value: stats?.invited },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-card border border-border rounded-2xl p-3 text-center"
              >
                {statsLoading ? (
                  <Skeleton className="h-7 w-10 mx-auto mb-1 rounded-lg" />
                ) : (
                  <p className="text-xl font-bold text-foreground">{s.value ?? 0}</p>
                )}
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          {/* Menu */}
          {/* <div className="space-y-1 mb-6">
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
          </div> */}

          {/* Settings */}
          <div className="border-t border-border pt-4 space-y-1">
            <h3 className="text-sm font-semibold text-muted-foreground px-3 mb-2 uppercase tracking-wider">
              Настройки
            </h3>

            {/* <div className="flex items-center gap-3 p-3 rounded-xl">
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
            </a> */}
          </div>

          {/* Danger zone */}
          <div className=" pt-4 mt-4 space-y-2">
            <Button
              onClick={logout}
              variant="outline"
              className="w-full justify-start rounded-2xl text-destructive hover:text-destructive text-base h-12"
            >
              <LogOut size={22} className="mr-3" /> Выйти из аккаунта
            </Button>
            {/* <Button
              variant="ghost"
              className="w-full justify-start rounded-xl text-destructive/60 hover:text-destructive text-base h-12"
            >
              <Trash2 size={22} className="mr-3" /> Удалить аккаунт
            </Button> */}
          </div>
        </div>
      ) : (
        <AuthRequired />
      )}
    </div>
  )
}
