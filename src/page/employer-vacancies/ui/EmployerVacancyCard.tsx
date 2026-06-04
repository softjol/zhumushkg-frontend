'use client'
import { Eye, Heart, Users, MoreVertical, Pencil, ArrowUp, XCircle, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { Button } from '@/shared/ui/button'
import { Job } from '@/entities/vacancy/model/types'
import { formatDate } from '@/shared/lib/formatDate'

type Props = {
  vacancy: Job
  handleDelete: (id: number) => void
}
export const EmployerVacancyCard = ({ vacancy, handleDelete }: Props) => {
  const router = useRouter()

  return (
    <>
      <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-foreground text-xl">{vacancy.position}</h3>
              {/* <Badge variant="outline" className={`text-xs rounded-xl border`}>
                {vacancy.status}
              </Badge> */}
            </div>
            <p className="text-lg text-muted-foreground font-medium mt-1">
              Оплата:{' '}
              {vacancy.salary_net > 0 ? (
                <span className="text-green-600">{vacancy.salary_net.toLocaleString('ru-RU')} сом</span>
              ) : (
                <span className="text-green-600">Договорная</span>
              )}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
             <span>Вакансия опубликована: {formatDate(vacancy.createdAt)}</span>
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 rounded-lg hover:bg-muted">
                <MoreVertical size={18} className="text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[180px] rounded-2xl p-1.5 shadow-xl border-border/50"
              style={{ zIndex: 300 }}
            >
              <DropdownMenuItem
                className="gap-2.5 rounded-xl py-2.5 text-base"
                onClick={() => router.push(`/employer/edit-vacancy/${vacancy.id}`)}
              >
                <Pencil size={18} /> Редактировать
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2.5 rounded-xl py-2.5 text-base text-destructive"
                onClick={() => handleDelete(vacancy.id)}
              >
                <Trash2 size={18} /> Удалить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-4 text-base text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Eye size={16} /> {vacancy.views}
          </span>
          <span className="flex items-center gap-1.5">
            <Heart size={16} /> {vacancy.favorite}
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={16} /> {vacancy.offers}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() => router.push(`/employer/applications/${vacancy.id}`)}
            className="rounded-2xl flex-1 min-h-11 text-base shadow-sm"
            size="sm"
          >
            Посмотреть кандидатов
          </Button>
          <Button
            variant="outline"
            className="rounded-2xl flex-1 min-h-11 text-base"
            size="sm"
            onClick={() => router.push(`/employer/vacancies/${vacancy.id}`)}
          >
            Посмотреть Вакансию
          </Button>
        </div>
      </div>
    </>
  )
}
