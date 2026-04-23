'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import iconLogo from '@/assets/icons/Logo.svg'
import Image from 'next/image'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp'
import { loginUser, confirmPhone } from '@/entities/auth/api'
import { useUserStore } from '@/entities/user/model/store'

export const LoginPage = () => {
  const router = useRouter()
  const { setToken } = useUserStore()

  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [timer, setTimer] = useState(59)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isPhoneValid = phone.replace(/\D/g, '').length === 9

  const startTimer = () => {
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

  const [smsCode, setSmsCode] = useState('')

  const handleSendCode = async () => {
    if (!isPhoneValid) return
    setIsLoading(true)
    setError('')
    try {
      const data = await loginUser('+996' + phone)
      if (data.smsCode) setSmsCode(data.smsCode)
      setStep('otp')
      setOtp('')
      startTimer()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerify = async () => {
    if (otp.length < 4) return
    setIsLoading(true)
    setError('')
    try {
      const token = await confirmPhone('+996' + phone, otp)
      console.log('Received token:', token)
      setToken(token)
      router.push('/jobs')
    } catch (e: any) {
      setError(e.message || 'Неверный код')
    } finally {
      setIsLoading(false)
    }
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
                Войти в аккаунт
              </h1>
              <p className="text-sm font-medium text-muted-foreground text-center mb-6">
                Отправим SMS с кодом подтверждения
              </p>

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

              {error && <p className="text-sm text-destructive text-center mt-3">{error}</p>}

              <Button
                className="w-full mt-4 rounded-2xl h-12 text-base"
                disabled={!isPhoneValid || isLoading}
                onClick={handleSendCode}
              >
                {isLoading ? 'Отправка...' : 'Получить код'}
              </Button>

              <p className="text-sm text-muted-foreground text-center mt-4">
                Нет аккаунта?{' '}
                <Link href="/register" className="text-primary font-medium hover:underline">
                  Зарегистрироваться
                </Link>
              </p>

              <p className="text-sm text-muted-foreground text-center mt-2">
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
                {smsCode && (
                  <>
                    <br />
                    (для тестирования: {smsCode})
                  </>
                )}
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

              {error && (
                <p className="text-sm text-destructive text-center mb-3">{error}</p>
              )}

              <Button
                className="w-full rounded-2xl h-12 text-base"
                disabled={otp.length < 4 || isLoading}
                onClick={handleVerify}
              >
                {isLoading ? 'Проверка...' : 'Подтвердить'}
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
