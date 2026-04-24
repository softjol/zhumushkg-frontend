'use client'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { Checkbox } from '@/shared/ui/checkbox'
import { Label } from '@/shared/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useState } from 'react'
import { cn } from '@/shared/lib/utils'
import { useRouter } from 'next/navigation'
import { useResumeStore } from '@/entities/resume/model/store'
import { createResume } from '@/entities/resume/api'
import { useUserStore } from '@/entities/user/model/store'
import type { WorkExperience, ResumeFormData } from '@/entities/resume/model/types'

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

// Локальный тип стейта: skills — строка (для инпута через запятую)
type FormState = {
  user_id: number | undefined
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
  skills: string
  personal_qualities: string
  photo: string
}

// ─────────────────────────────────────────────
// 🧪 ТЕСТОВЫЕ ДАННЫЕ — убрать когда не нужны
// ─────────────────────────────────────────────
const TEST_DATA: Omit<FormState, 'user_id'> = {
  position: 'Middle Node.js Developer',
  description: 'Опытный разработчик с 4 годами коммерческого опыта.',
  work_schedule: 'Полный день',
  payment_period: 'Ежемесячно',
  salary_net: 50000,
  birth_date: '1995-01-15',
  phone_number: '+996700000000',
  city: 'Бишкек',
  education: 'Высшее, КГТУ',
  work_experience: [
    {
      company: 'ООО «Техно»',
      position: 'Backend-разработчик',
      start_month: 3,
      start_year: 2021,
      until_now: true,
      description: 'Разработка REST API, код-ревью.',
    },
  ],
  skills: 'JavaScript, NestJS, PostgreSQL',
  personal_qualities: 'Ответственный, коммуникабельный',
  photo: 'https://example.com/photo.jpg',
}

// ─────────────────────────────────────────────
// ✅ РАБОЧИЕ ДАННЫЕ — раскомментировать для прода,
//    заменить TEST_DATA на EMPTY_DATA в useState ниже
// ─────────────────────────────────────────────
// const EMPTY_DATA: Omit<FormState, 'user_id'> = {
//   position: '',
//   description: '',
//   work_schedule: '',
//   payment_period: '',
//   salary_net: 0,
//   birth_date: '',
//   phone_number: '',
//   city: '',
//   education: '',
//   work_experience: [],
//   skills: '',
//   personal_qualities: '',
//   photo: 'https://example.com/photo.jpg',
// }

export const ResumeCreatePage = () => {
  const router = useRouter()
  const { user } = useUserStore.getState()
  const { setResume } = useResumeStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 🧪 Для теста — TEST_DATA, для прода заменить на EMPTY_DATA
  const [formData, setFormData] = useState<FormState>({
    user_id: user?.id ? Number(user.id) : undefined, // ← конвертируем в number
    ...TEST_DATA,
  })
  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
    setFormData((prev) => ({
      ...prev,
      work_experience: [...prev.work_experience, newExp],
    }))
  }

  const removeExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      work_experience: prev.work_experience.filter((_, i) => i !== index),
    }))
  }

  const updateExperience = <K extends keyof WorkExperience>(
    index: number,
    field: K,
    value: WorkExperience[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      work_experience: prev.work_experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp,
      ),
    }))
  }

  const isFormValid = (): boolean => {
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
    if (!isFormValid() || isSubmitting) return

    setIsSubmitting(true)
    try {
      // Явно собираем payload без user_id (не входит в ResumeFormData)
      // и конвертируем skills: строка → массив
      const payload: ResumeFormData = {
        position: formData.position,
        description: formData.description,
        work_schedule: formData.work_schedule,
        payment_period: formData.payment_period,
        salary_net: formData.salary_net,
        birth_date: formData.birth_date,
        phone_number: formData.phone_number,
        city: formData.city,
        education: formData.education,
        work_experience: formData.work_experience,
        personal_qualities: formData.personal_qualities,
        photo: formData.photo,
        skills: formData.skills
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      }

      const created = await createResume(payload)
      setResume(created)
      router.push('/resume')
    } catch (err) {
      console.error(err)
      // TODO: показать toast об ошибке
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] lg:min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => router.back()} className="p-1.5 rounded-xl hover:bg-muted">
          <ArrowLeft size={22} />
        </button>
        <span className="flex-1 font-semibold text-lg">Создание резюме</span>
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
            <Button type="button" variant="outline" onClick={addExperience} className="rounded-2xl">
              <Plus size={20} className="mr-1" /> Добавить
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

        {/* Submit */}
        <div className="w-full flex flex-col items-center gap-2">
          <Button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className={cn(
              'h-14 px-10 rounded-2xl text-base font-bold transition-all duration-300 mb-10',
              isFormValid()
                ? 'bg-primary hover:bg-primary-hover shadow-lg shadow-primary/20 text-white'
                : 'bg-muted text-muted-foreground cursor-not-allowed',
            )}
          >
            {isSubmitting ? 'Создание...' : 'Создать резюме'}
          </Button>
          {!isFormValid() && (
            <p className="text-center text-xs text-muted-foreground lg:hidden">
              Заполните все обязательные поля, чтобы создать резюме
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
