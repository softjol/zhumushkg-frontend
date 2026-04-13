'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { ArrowLeft } from 'lucide-react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp'
import iconLogo from '@/assets/icons/Logo.svg'
import Image from 'next/image'

export const RegisterPage = () => {
  const router = useRouter()
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [timer, setTimer] = useState(59)
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)

  const isPhoneValid = phone.replace(/\D/g, '').length === 10
  const isNameValid = name.trim().length >= 2
  const isFormValid = isPhoneValid && isNameValid

  const handleSendCode = () => {
    if (!isFormValid) return
    setStep('otp')
    setOtp('')
    setError('')
    setTimer(59)
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(interval)
          return 0
        }
        return t - 1
      })
    }, 1000)
  }

  const handleVerify = () => {
    if (otp.length < 4) return

    if (otp === '0000') {
      const remaining = 2 - attempts
      if (attempts >= 2) {
        setError('Слишком много попыток. Попробуйте через 10 минут')
      } else {
        setError(`Неверный код, осталось ${remaining} попыток`)
        setAttempts((prev) => prev + 1)
      }
      return
    }

    router.push('/')
  }

  return (
    <div className="min-h-svh bg-background flex flex-col">
      <header className="px-4 py-3 flex items-center gap-3">
        <Link
          href={step === 'otp' ? '#' : 'onboarding'}
          onClick={(e) => {
            if (step === 'otp') {
              e.preventDefault()
              setStep('phone')
            }
          }}
          className="p-1.5 rounded-xl hover:bg-muted transition-colors inline-flex"
        >
          <ArrowLeft size={22} />
        </Link>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="w-full max-w-sm" key={step}>
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="text-[38px] flex items-center font-bold">
              Ж
              <Image src={iconLogo} alt="logo" width={26} height={26} className="mt-[5px]" />
              муш.kg
            </div>
          </div>

          {step === 'phone' ? (
            <>
              <h1 className="text-xl font-bold text-foreground text-center mb-2">
                Создать аккаунт
              </h1>
              <p className="text-sm font-medium text-muted-foreground text-center mb-6">
                Заполните данные для регистрации
              </p>

              {/* Name field — only on register */}
              <Input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl h-12 text-base bg-muted border-0 outline-none mb-3 pl-5"
                maxLength={50}
              />

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base font-medium text-foreground">
                  +996
                </span>
                <Input
                  type="tel"
                  placeholder="700 123 456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-14 rounded-xl h-12 text-base bg-muted border-0 outline-none"
                  maxLength={12}
                />
              </div>

              <Button
                className="w-full mt-4 rounded-2xl h-12 text-base"
                disabled={!isFormValid}
                onClick={handleSendCode}
              >
                Получить код
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Уже есть аккаунт?{' '}
                <Link href="/login" className="text-primary font-medium hover:underline">
                  Войти
                </Link>
              </p>

              <p className="text-xs text-muted-foreground text-center mt-2">
                Нажимая «Получить код», вы соглашаетесь с{' '}
                <a href="#" className="text-primary hover:underline">
                  Политикой конфиденциальности
                </a>
              </p>
            </>
          ) : (
            <>
              <h1 className="text-xl font-bold text-foreground text-center mb-2">Введите код</h1>
              <p className="text-sm font-medium text-muted-foreground text-center mb-6">
                Код отправлен на +996 {phone}
              </p>

              <div className="flex justify-center mb-4">
                <InputOTP maxLength={4} value={otp} onChange={setOtp}>
                  <InputOTPGroup className="flex gap-1">
                    <InputOTPSlot index={0} className="w-14 h-14 text-lg rounded-2xl" />
                    <InputOTPSlot index={1} className="w-14 h-14 text-lg rounded-2xl" />
                    <InputOTPSlot index={2} className="w-14 h-14 text-lg rounded-2xl" />
                    <InputOTPSlot index={3} className="w-14 h-14 text-lg rounded-2xl" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {error && <p className="text-sm text-destructive text-center mb-3">{error}</p>}

              <Button
                className="w-full rounded-2xl h-12 text-base"
                disabled={otp.length < 4}
                onClick={handleVerify}
              >
                Подтвердить
              </Button>

              <p className="text-sm text-muted-foreground text-center mt-4">
                {timer > 0 ? (
                  <>Отправить снова через 0:{timer.toString().padStart(2, '0')}</>
                ) : (
                  <button
                    className="text-primary font-medium hover:underline"
                    onClick={handleSendCode}
                  >
                    Отправить снова
                  </button>
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
