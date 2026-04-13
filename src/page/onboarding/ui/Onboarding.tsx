'use client'

import { useState } from 'react'
import { MapPin, Zap, MessageCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import iconLogo from '@/assets/icons/Logo.svg'

const slides = [
  {
    icon: MapPin,
    title: 'Находи работу рядом с домом',
    description: 'Вакансии по всему Кыргызстану — Бишкек, Ош, Жалал-Абад и другие города',
    color: 'bg-primary',
  },
  {
    icon: Zap,
    title: 'Откликайся в один клик',
    description: 'Создай резюме один раз и откликайся на вакансии мгновенно',
    color: 'bg-success',
  },
  {
    icon: MessageCircle,
    title: 'Общайся с работодателем напрямую',
    description: 'Встроенный чат для быстрой связи без лишних посредников',
    color: 'bg-info',
  },
]

export const OnboardingPage = () => {
  const router = useRouter()
  const [current, setCurrent] = useState(0)

  return (
    <div className="min-h-svh bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="text-[38px] flex items-center font-bold">
            Ж
            <Image src={iconLogo} alt="logo" width={26} height={26} className="mt-[5px]" />
            муш.kg
          </div>
        </div>

        {/* Slide */}
        <div className="text-center animate-fade-in" key={current}>
          <div
            className={`w-20 h-20 rounded-3xl ${slides[current].color} flex items-center justify-center mx-auto mb-6`}
          >
            {(() => {
              const Icon = slides[current].icon
              return <Icon size={36} className="text-primary-foreground" />
            })()}
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">{slides[current].title}</h2>
          <p className="text-sm text-muted-foreground">{slides[current].description}</p>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? 'w-6 bg-primary' : 'w-2 bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-10 space-y-3">
          <Link href="/login" className="w-full block">
            <Button className="w-full rounded-xl h-12 text-base">Войти</Button>
          </Link>
          <Link href="/register" className="w-full block">
            <Button variant="outline" className="w-full rounded-xl h-12 text-base">
              Зарегистрироваться
            </Button>
          </Link>
          <Link
            href="/jobs"
            className="w-full text-sm flex justify-center text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            Продолжить без регистрации
          </Link>
        </div>
      </div>
    </div>
  )
}
