'use client'
import { useState, useEffect, useMemo } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Textarea } from '@/shared/ui/textarea'
import { Switch } from '@/shared/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useRouter } from 'next/navigation'
import { cn } from '@/shared/lib/utils'
import { getVacancy, updateVacancy } from '@/entities/vacancy/api'
import type { Job, JobFormData } from '@/entities/vacancy/model/types'
import { JOB_CATEGORIES } from '@/shared/constants/category'
// Конвертируем Job → JobFormData (убираем служебные поля)
function jobToFormData(job: Job): JobFormData {
  return {
    position: job.position ?? '',
    category: job.category,
    city: job.city ?? '',
    region: job.region ?? '',
    work_address: job.work_address ?? '',
    description: job.description,
    requirements: job.requirements,
    conditions: job.conditions,
    work_schedule: job.work_schedule ?? '',
    experience_work: job.experience_work ?? '',
    remote_work: job.remote_work ?? false,
    payment_period: job.payment_period ?? '',
    salary_net: job.salary_net ?? 0,
    company: job.company ?? '',
    company_description: job.company_description,
  }
}

interface EmployerVacancyEditProps {
  vacancyId: number
}

export const EmployerVacancyEdit = ({ vacancyId }: EmployerVacancyEditProps) => {
  const router = useRouter()
  const [formData, setFormData] = useState<JobFormData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [originalJob, setOriginalJob] = useState<Job | null>(null)

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const job = await getVacancy(vacancyId)
        setOriginalJob(job)
        setFormData(jobToFormData(job))
      } catch (err) {
        console.error(err)
        router.push('/employer/vacancies')
      } finally {
        setIsLoading(false)
      }
    }
    fetchVacancy()
  }, [vacancyId])

  // Исходное состояние для сравнения изменений
  const initialFormState = useMemo(
    () => (originalJob ? jobToFormData(originalJob) : null),
    [originalJob],
  )

  // Есть ли несохранённые изменения
  const isChanged = useMemo(() => {
    if (!formData || !initialFormState) return false
    return JSON.stringify(formData) !== JSON.stringify(initialFormState)
  }, [formData, initialFormState])

  const updateField = <K extends keyof JobFormData>(field: K, value: JobFormData[K]) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  const isFormValid = (): boolean => {
    if (!formData) return false
    return Boolean(
      formData.position &&
      formData.city &&
      formData.description &&
      formData.work_schedule &&
      formData.experience_work &&
      formData.payment_period &&
      formData.salary_net > 0 &&
      formData.company,
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid() || isSubmitting || !isChanged || !originalJob || !formData) return

    setIsSubmitting(true)
    try {
      await updateVacancy(originalJob.id, formData)
      router.push('/employer/vacancies')
    } catch (err) {
      console.error(err)
      // TODO: toast об ошибке
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) return null
  if (!formData) return null

  const canSubmit = isFormValid() && isChanged && !isSubmitting

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] lg:min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => router.push('/employer/vacancies')}
          className="p-1.5 rounded-xl hover:bg-muted"
        >
          <ArrowLeft size={22} />
        </button>
        <span className="flex-1 font-semibold text-lg">Редактирование вакансии</span>
      </header>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 lg:p-6 space-y-8 w-full ">
        {/* Main info */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="position" className="text-base">
              Название вакансии (Должность)
            </Label>
            <Input
              id="position"
              placeholder="Например, Middle AI Developer"
              value={formData.position}
              onChange={(e) => updateField('position', e.target.value)}
              className="text-base h-12"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-base">Категория</Label>
              <Select
                value={formData.category ?? ''}
                onValueChange={(v) => updateField('category', v || null)}
              >
                <SelectTrigger className="text-base h-12">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {JOB_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-base">Город работы</Label>
              <Input
                placeholder="Бишкек"
                value={formData.city}
                onChange={(e) => updateField('city', e.target.value)}
                className="text-base h-12"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-base">Регион</Label>
              <Input
                placeholder="Чуйская область"
                value={formData.region}
                onChange={(e) => updateField('region', e.target.value)}
                className="text-base h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base">Рабочий адрес</Label>
            <Input
              placeholder="ул. Ленина, д. 1"
              value={formData.work_address}
              onChange={(e) => updateField('work_address', e.target.value)}
              className="text-base h-12"
            />
          </div>
        </div>

        {/* Description & Requirements */}
        <div className="space-y-4 border-t pt-6">
          <div className="space-y-2">
            <Label className="text-base">Обязанности</Label>
            <Textarea
              placeholder="Опишите обязанности сотрудника..."
              value={formData.description ?? ''}
              onChange={(e) => updateField('description', e.target.value || null)}
              className="min-h-[100px] text-base"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-base">Требования</Label>
            <Textarea
              placeholder="Опыт, знания, навыки..."
              value={formData.requirements ?? ''}
              onChange={(e) => updateField('requirements', e.target.value || null)}
              className="min-h-[100px] text-base"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-base">Условия работы</Label>
            <Textarea
              placeholder="Что предлагает компания..."
              value={formData.conditions ?? ''}
              onChange={(e) => updateField('conditions', e.target.value || null)}
              className="min-h-[80px] text-base"
            />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4 border-t pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-base">График работы</Label>
              <Select
                onValueChange={(v) => updateField('work_schedule', v)}
                value={formData.work_schedule}
              >
                <SelectTrigger className="text-base h-12">
                  <SelectValue placeholder="Выберите график" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Полный день">Полный день</SelectItem>
                  <SelectItem value="Неполный день">Неполный день</SelectItem>
                  <SelectItem value="Сменный график">Сменный график</SelectItem>
                  <SelectItem value="Гибкий график">Гибкий график</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-base">Опыт работы</Label>
              <Input
                placeholder="Например, 3-5 лет"
                value={formData.experience_work}
                onChange={(e) => updateField('experience_work', e.target.value)}
                className="text-base h-12"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-2xl">
            <Label className="text-base cursor-pointer">Удалённая работа</Label>
            <Switch
              checked={formData.remote_work}
              onCheckedChange={(c) => updateField('remote_work', c)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-base">Период оплаты</Label>
              <Select
                onValueChange={(v) => updateField('payment_period', v)}
                value={formData.payment_period}
              >
                <SelectTrigger className="text-base h-12">
                  <SelectValue placeholder="Выберите период" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Месяц">Месяц</SelectItem>
                  <SelectItem value="Смена">Смена</SelectItem>
                  <SelectItem value="Час">Час</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-base">Зарплата (чистыми, сом)</Label>
              <Input
                type="number"
                placeholder="0"
                value={formData.salary_net || ''}
                onChange={(e) => updateField('salary_net', Number(e.target.value))}
                className="text-base h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base">Название компании</Label>
            <Input
              placeholder="ООО Рога и Копыта"
              value={formData.company}
              onChange={(e) => updateField('company', e.target.value)}
              className="text-base h-12"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-base">О компании</Label>
            <Textarea
              placeholder="Расскажите о вашей компании..."
              value={formData.company_description ?? ''}
              onChange={(e) => updateField('company_description', e.target.value || null)}
              className="min-h-[100px] text-base"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className=" bg-background lg:p-0">
          <div className="flex flex-col items-center gap-2">
            <Button
              type="submit"
              disabled={!canSubmit}
              className={cn(
                'w-full h-14 rounded-2xl text-lg font-bold transition-all duration-300 mb-10 lg:mb-0',
                canSubmit
                  ? 'bg-primary hover:bg-primary-hover shadow-lg shadow-primary/20 text-white'
                  : 'bg-muted text-muted-foreground cursor-not-allowed',
              )}
            >
              {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
            </Button>

            {!isFormValid() && (
              <p className="text-center text-xs text-muted-foreground lg:hidden">
                Заполните все обязательные поля, чтобы сохранить изменения
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
