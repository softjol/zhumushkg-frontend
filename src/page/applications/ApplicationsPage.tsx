'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/shared/ui/button'
import { ExternalLink, FileText, MapPin, EllipsisVertical } from 'lucide-react'
import Link from 'next/link'
// import { getMyApplications, removeApplication } from '@/entities/applications/api'
import { Application } from '@/entities/applications/model/type'
import { useUserStore } from '@/entities/user/model/store'
import { AuthRequired } from '@/widgets/auth-required/ui/AuthRequired'
import { formatDate } from '@/shared/lib/formatDate'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu'
import { Skeleton } from '@/shared/ui/skeleton'

const ApplicationCardSkeleton = () => (
  <div className="bg-card border px-7 border-border shadow rounded-2xl p-4">
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-48 rounded-lg" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <Skeleton className="h-4 w-28 rounded-lg" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-4 w-52 rounded-lg mt-2" />
      </div>
    </div>
    <div className="flex gap-2 mt-3">
      <Skeleton className="h-10 w-28 rounded-2xl" />
    </div>
  </div>
)

const statusConfig: Record<string, { label: string; className: string }> = {
  NEW: { label: 'Новый', className: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  REVIEWING: { label: 'На рассмотрении', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  INTERVIEW: { label: 'Интервью', className: 'bg-purple-100 text-purple-700 border-purple-200' },
  OFFER: { label: 'Оффер', className: 'bg-orange-100 text-orange-700 border-orange-200' },
  HIRED: { label: 'Принят', className: 'bg-green-100 text-green-700 border-green-200' },
  REJECTED: { label: 'Отказ', className: 'bg-red-100 text-red-700 border-red-200' },
}

export const ApplicationsPage = () => {
  const { isAuthenticated } = useUserStore()
  const [applications, setApplications] = useState<Application[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await getMyApplications()
        // setApplications(res)
        setApplications([])
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      // await removeApplication(id)
      // setApplications((prev) => prev?.filter((app) => app.id !== id) ?? prev)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="px-4 lg:px-6 py-6 max-w-3xl mx-auto w-full">
      <h1 className="text-xl font-bold text-foreground mb-4">Мои отклики</h1>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <ApplicationCardSkeleton key={i} />
          ))}
        </div>
      ) : isAuthenticated ? (
        applications !== null && applications.length !== 0 ? (
          <div className="space-y-3">
            {applications.map((item) => (
              <div
                key={item.id}
                className="bg-card border px-7 border-border shadow rounded-2xl p-4 animate-fade-in"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-foreground">
                        {item.vacancy.position}
                      </h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="bg-muted p-2 rounded-full hover:shadow hover:bg-gray-200">
                            <EllipsisVertical size={18} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[156px] p-2">
                          <Button
                            onClick={() => handleDelete(item.id)}
                            variant={'destructive'}
                            className="text-sm"
                          >
                            Удалить Отклик
                          </Button>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-base text-muted-foreground mt-0.5">
                      {item.vacancy.company}{' '}
                      <span className="inline-flex items-center gap-1 text-xs text-primary bg-primary-light px-2 py-0.5 rounded-full">
                        <MapPin size={12} />
                        {item.vacancy.city}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Откликнулся {formatDate(item.created_at)}{' '}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 justify-between items-center">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-2xl text-sm h-10 px-4 border-primary text-primary"
                    asChild
                  >
                    <Link href={`/jobs/${item.vacancy_id}`}>
                      <ExternalLink size={16} className="mr-1.5" /> Вакансия
                    </Link>
                  </Button>
                  <span
                    className={`ml-5 text-sm rounded-2xl flex items-center border p-2 font-medium ${(statusConfig[item.status] ?? statusConfig.NEW).className}`}
                  >
                    {(statusConfig[item.status] ?? statusConfig.NEW).label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="font-semibold text-foreground">Вы ещё не откликались</p>
            <p className="text-sm text-muted-foreground mt-1">на вакансии</p>
            <Button asChild className="mt-6 rounded-xl">
              <Link href="/">Найти вакансии</Link>
            </Button>
          </div>
        )
      ) : (
        <AuthRequired description="Войдите, чтобы видеть сохранённые вакансии" />
      )}
    </div>
  )
}
