'use client'
import { useEffect, useState } from 'react'
import { Plus, Briefcase } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { useRouter } from 'next/navigation'
import { EmployerVacancyCard } from './EmployerVacancyCard'
import { deleteVacancy, getMyVacancies } from '@/entities/vacancy/api'
import { Job as Vacancy } from '@/entities/vacancy/model/types'
import { Skeleton } from '@/shared/ui/skeleton'
import { EmployerVacancyCardSkeleton } from './EmployerVacancyCardSkeleton'

export const EmployerVacanciesPage = () => {
  const [activeTab, setActiveTab] = useState('active')
  const router = useRouter()
  const [vacancies, setVacancies] = useState<Vacancy[] | null>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyVacancies()
        setVacancies(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await deleteVacancy(id)
      setVacancies((prev) => prev?.filter((v) => v.id !== id) ?? null)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="px-4 lg:px-6 py-4 lg:py-8 space-y-6 max-w-4xl mx-auto w-full">
      {/* Header — всегда виден */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Мои вакансии</h1>
          <div className="flex items-center gap-2 mt-1">
            {loading ? (
              <Skeleton className="h-4 w-32 rounded-lg" />
            ) : (
              <>
                {/* <span className="text-sm lg:text-base text-muted-foreground font-medium">
                  {vacancies?.length} из 3 бесплатных
                </span>
                <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${((vacancies?.length ?? 0) / 3) * 100}%` }}
                  />
                </div> */}
              </>
            )}
          </div>
        </div>
        <Button
          onClick={() => router.push('/employer/create-vacancy')}
          className="rounded-2xl gap-2 h-11 text-base px-6"
        >
          <Plus size={20} /> Создать <span className="hidden lg:block">вакансию</span>
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <EmployerVacancyCardSkeleton key={i} />
          ))}
        </div>
      ) : vacancies?.length === 0 ? (
        <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border/50 max-w-2xl mx-auto w-full">
          <Briefcase size={48} className="mx-auto text-muted-foreground mb-4 opacity-40" />
          <p className="font-semibold text-foreground text-xl">
            {activeTab === 'active'
              ? 'Создайте первую вакансию'
              : 'Здесь будут отображаться ваши вакансии'}
          </p>
          {activeTab === 'active' && (
            <Button
              onClick={() => router.push('/employer/create-vacancy')}
              className="mt-6 rounded-2xl h-11 text-base px-6"
            >
              Создать вакансию
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {vacancies?.map((vacancy) => (
            <EmployerVacancyCard key={vacancy.id} vacancy={vacancy} handleDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
