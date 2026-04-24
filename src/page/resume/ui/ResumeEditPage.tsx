'use client'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { Checkbox } from '@/shared/ui/checkbox'
import { Label } from '@/shared/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/shared/lib/utils'
import { useResumeStore } from '@/entities/resume/model/store'
import { updateResume } from '@/entities/resume/api'
import type { WorkExperience } from '@/entities/resume/model/types'

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

// Локальный тип: skills как строка для инпута
type FormState = {
  position: string
  description: string
  work_schedule: string
  payment_period: string
  salary_net: number
  birth_date: string
  phone_number: string
  city: string
  education: string
  work_experience: WorkExperience[]
  skills: string // строка для отображения в инпуте
  personal_qualities: string
  photo: string
}

// Resume из стора хранит skills как string[] — конвертируем в строку для формы
function resumeToFormState(resume: any): FormState {
  return {
    position: resume.position ?? '',
    description: resume.description ?? '',
    work_schedule: resume.work_schedule ?? '',
    payment_period: resume.payment_period ?? '',
    salary_net: Number(resume.salary_net) ?? 0,
    birth_date: resume.birth_date ?? '',
    phone_number: resume.phone_number ?? '',
    city: resume.city ?? '',
    education: resume.education ?? '',
    work_experience: resume.work_experience ?? [],
    skills: Array.isArray(resume.skills) ? resume.skills.join(', ') : (resume.skills ?? ''),
    personal_qualities: resume.personal_qualities ?? '',
    photo: resume.photo ?? 'https://example.com/photo.jpg',
  }
}

export const ResumeEditPage = () => {
  const router = useRouter()
  const { resume, setResume } = useResumeStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormState | null>(null)

  useEffect(() => {
    if (resume) {
      setFormData(resumeToFormState(resume))
    } else {
      router.push('/resume/create')
    }
  }, [resume])

  // Исходное состояние для сравнения — пересчитывается только когда resume меняется
  const initialFormState = useMemo(() => (resume ? resumeToFormState(resume) : null), [resume])

  // Проверка: изменилось ли что-нибудь
  const isChanged = useMemo(() => {
    if (!formData || !initialFormState) return false
    return JSON.stringify(formData) !== JSON.stringify(initialFormState)
  }, [formData, initialFormState])

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  const addExperience = () => {
    const newExp: WorkExperience = {
      company: '',
      position: '',
      start_month: 1,
      start_year: new Date().getFullYear(),
      until_now: false,
      description: '',
    }
    setFormData((prev) =>
      prev ? { ...prev, work_experience: [...prev.work_experience, newExp] } : prev,
    )
  }

  const removeExperience = (index: number) => {
    setFormData((prev) =>
      prev
        ? { ...prev, work_experience: prev.work_experience.filter((_, i) => i !== index) }
        : prev,
    )
  }

  const updateExperience = <K extends keyof WorkExperience>(
    index: number,
    field: K,
    value: WorkExperience[K],
  ) => {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            work_experience: prev.work_experience.map((exp, i) =>
              i === index ? { ...exp, [field]: value } : exp,
            ),
          }
        : prev,
    )
  }

  const isFormValid = (): boolean => {
    if (!formData) return false
    return Boolean(
      formData.position &&
      formData.work_schedule &&
      formData.payment_period &&
      formData.salary_net > 0 &&
      formData.birth_date &&
      formData.phone_number &&
      formData.city &&
      formData.education &&
      formData.description &&
      formData.skills &&
      formData.personal_qualities,
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid() || isSubmitting || !resume || !formData || !isChanged) return

    setIsSubmitting(true)
    try {
      const payload = {
        ...formData,
        skills: formData.skills
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      }

      const updated = await updateResume(resume.id, payload)
      setResume(updated)
      router.push('/resume')
    } catch (err) {
      console.error(err)
      // TODO: toast об ошибке
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!formData) return null

  const canSubmit = isFormValid() && isChanged && !isSubmitting

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] lg:min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => router.back()} className="p-1.5 rounded-xl hover:bg-muted">
          <ArrowLeft size={22} />
        </button>
        <span className="flex-1 font-semibold text-lg">Редактирование резюме</span>
      </header>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 lg:p-6 space-y-8 w-full pb-10">
        {/* General Info */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="position" className="text-base">
              Желаемая должность
            </Label>
            <Input
              id="position"
              placeholder="Например, Node.js Developer"
              value={formData.position}
              onChange={(e) => updateField('position', e.target.value)}
              className="text-base h-12"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-base">График работы</Label>
              <Select
                value={formData.work_schedule}
                onValueChange={(v) => updateField('work_schedule', v)}
              >
                <SelectTrigger className="text-base h-12">
                  <SelectValue placeholder="Выберите график" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Полный день">Полный день</SelectItem>
                  <SelectItem value="Удаленно">Удаленно</SelectItem>
                  <SelectItem value="Гибкий график">Гибкий график</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-base">Период оплаты</Label>
              <Select
                value={formData.payment_period}
                onValueChange={(v) => updateField('payment_period', v)}
              >
                <SelectTrigger className="text-base h-12">
                  <SelectValue placeholder="Выберите период" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ежемесячно">Ежемесячно</SelectItem>
                  <SelectItem value="Проектно">Проектно</SelectItem>
                  <SelectItem value="Почасовая">Почасовая</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary" className="text-base">
              Желаемая зарплата (сом)
            </Label>
            <Input
              id="salary"
              type="number"
              className="text-base h-12"
              value={formData.salary_net || ''}
              onChange={(e) => updateField('salary_net', Number(e.target.value))}
            />
          </div>
        </div>

        {/* Personal Info */}
        <div className="space-y-4 border-t pt-6">
          <h3 className="text-lg font-bold">Личные данные</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birth_date" className="text-base">
                Дата рождения
              </Label>
              <Input
                id="birth_date"
                type="date"
                className="text-base h-12"
                value={formData.birth_date}
                onChange={(e) => updateField('birth_date', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base">
                Телефон
              </Label>
              <Input
                id="phone"
                placeholder="+996..."
                className="text-base h-12"
                value={formData.phone_number}
                onChange={(e) => updateField('phone_number', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-base">
                Город
              </Label>
              <Input
                id="city"
                placeholder="Бишкек"
                className="text-base h-12"
                value={formData.city}
                onChange={(e) => updateField('city', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="education" className="text-base">
                Образование
              </Label>
              <Input
                id="education"
                placeholder="Высшее, КГТУ"
                className="text-base h-12"
                value={formData.education}
                onChange={(e) => updateField('education', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="space-y-6 border-t pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Опыт работы</h3>
            <Button type="button" variant="outline" size="sm" onClick={addExperience}>
              <Plus size={16} className="mr-1" /> Добавить
            </Button>
          </div>

          {formData.work_experience.map((exp, index) => (
            <div
              key={index}
              className="p-5 border border-border rounded-3xl space-y-4 relative bg-muted/10"
            >
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="absolute top-4 right-4 p-2 text-destructive hover:bg-destructive/10 rounded-full transition-colors"
              >
                <Trash2 size={18} />
              </button>

              <div className="space-y-4">
                <Input
                  placeholder="Компания"
                  value={exp.company}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                  className="bg-background text-base h-12"
                />
                <Input
                  placeholder="Должность или профессия"
                  value={exp.position}
                  onChange={(e) => updateExperience(index, 'position', e.target.value)}
                  className="bg-background text-base h-12"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Начало работы
                  </span>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`until_now-${index}`}
                      checked={exp.until_now}
                      onCheckedChange={(checked) =>
                        updateExperience(index, 'until_now', checked === true)
                      }
                    />
                    <Label
                      htmlFor={`until_now-${index}`}
                      className="text-sm cursor-pointer font-medium"
                    >
                      Работаю сейчас
                    </Label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Select
                    value={exp.start_month.toString()}
                    onValueChange={(v) => updateExperience(index, 'start_month', parseInt(v))}
                  >
                    <SelectTrigger className="bg-background text-base h-12">
                      <SelectValue placeholder="Месяц" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((m, i) => (
                        <SelectItem key={m} value={(i + 1).toString()}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Год"
                    type="number"
                    className="bg-background text-base h-12"
                    value={exp.start_year || ''}
                    onChange={(e) => updateExperience(index, 'start_year', Number(e.target.value))}
                  />
                </div>
              </div>

              {!exp.until_now && (
                <div className="space-y-3">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Окончание
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <Select
                      value={exp.end_month?.toString() ?? ''}
                      onValueChange={(v) => updateExperience(index, 'end_month', parseInt(v))}
                    >
                      <SelectTrigger className="bg-background text-base h-12">
                        <SelectValue placeholder="Месяц" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((m, i) => (
                          <SelectItem key={m} value={(i + 1).toString()}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Год"
                      type="number"
                      className="bg-background text-base h-12"
                      value={exp.end_year ?? ''}
                      onChange={(e) => updateExperience(index, 'end_year', Number(e.target.value))}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground uppercase tracking-wider">
                  Обязанности и достижения
                </Label>
                <Textarea
                  placeholder="Чем занимались?"
                  value={exp.description}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  className="min-h-[120px] bg-background border-primary/20 focus-visible:ring-primary text-base"
                />
              </div>
            </div>
          ))}
        </div>

        {/* About, Skills, Qualities */}
        <div className="space-y-6 border-t pt-6">
          <div className="space-y-2">
            <Label htmlFor="skills" className="text-base">
              Навыки (через запятую)
            </Label>
            <Input
              id="skills"
              placeholder="JavaScript, React, NestJS..."
              className="text-base h-12"
              value={formData.skills}
              onChange={(e) => updateField('skills', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="qualities" className="text-base">
              Личные качества
            </Label>
            <Input
              id="qualities"
              placeholder="Ответственность, коммуникабельность..."
              className="text-base h-12"
              value={formData.personal_qualities}
              onChange={(e) => updateField('personal_qualities', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base">
              О себе
            </Label>
            <Textarea
              id="description"
              placeholder="Расскажите о себе..."
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              className="min-h-[140px] text-base"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="w-full flex flex-col items-center gap-2">
          <Button
            type="submit"
            disabled={!canSubmit}
            className={cn(
              'h-14 px-10 rounded-2xl text-base font-bold transition-all duration-300',
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
      </form>
    </div>
  )
}
