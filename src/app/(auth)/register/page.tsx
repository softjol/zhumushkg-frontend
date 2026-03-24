'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '../../../shared/ui/input'
import { Checkbox } from '../../../shared/ui/checkbox'
import { Button } from '@/shared/kit'
import { FormInput } from '@/shared/kit'
import { FileInput } from '@/shared/kit'
import { DateInput } from '@/shared/kit/DateInput'
import { PasswordInput } from '@/shared/kit/PasswordInput'

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1)
  const [role, setRole] = useState<'worker' | 'employer' | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreed, setAgreed] = useState(false)
  return (
    <div className=" flex flex-col justify-center items-center">
      {step === 1 && (
        <div className="text-center">
          <h2 className="text-[26px] font-bold mb-[30px]">Выберите цель</h2>
          <div className="flex justify-center gap-16">
            <label className="flex items-center gap-3 text-[18px] cursor-pointer">
              <span className="flex items-center justify-center w-[20px] h-[20px] rounded-full border-[3.78px] border-[#DBDBDB]">
                <input
                  type="radio"
                  className="sr-only"
                  checked={role === 'worker'}
                  onChange={() => setRole('worker')}
                />
                {role === 'worker' && (
                  <div className=" w-[9px] h-[9px] rounded-full bg-[#626AE5]" />
                )}
              </span>
              Найти работу
            </label>

            <label className="flex items-center gap-3 text-lg font-[450] cursor-pointer">
              <span className="flex items-center justify-center w-[20px] h-[20px] rounded-full border-[3.78px] border-[#DBDBDB]">
                <input
                  type="radio"
                  className="sr-only"
                  checked={role === 'employer'}
                  onChange={() => setRole('employer')}
                />
                {role === 'employer' && (
                  <div className="w-[9px] h-[9px] rounded-full bg-[#626AE5]" />
                )}
              </span>
              Найти сотрудника
            </label>
          </div>
          {/* <Button
            className="w-[450px] h-[55px] block mt-[100px] text-[22px] font-medium"
            onClick={() => setStep(2)}
            disabled={role === null}
          >
            
            Далее
          </Button> */}
          <PasswordInput />
          <FileInput  />
          <DateInput label='Дата рождения'  error={'Ошибка загрузки файла'}/>
          <FormInput  error={'Ошибка загрузки файла'} placeholder="e@gmail.com" className="" />
          <Button variant="secondary" className="mt-10 w-full" disabled>
            На главную
          </Button>
        </div>
      )}
      {step === 2 && (
        <form className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">ФИО</label>
            <Input
              placeholder="Введите ваше ФИО"
              className="h-[55px] rounded-xl bg-[#F2F3F5] border-none text-base"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Электронная почта</label>
            <Input
              placeholder="Введите электронную почту"
              className="h-[55px] rounded-xl bg-[#F2F3F5] border-none text-base"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Придумайте пароль</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="············"
                className="h-[55px] rounded-xl bg-[#F2F3F5] border-none text-base pr-12"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Повторите пароль</label>
            <div className="relative">
              <Input
                type={showConfirm ? 'text' : 'password'}
                placeholder="············"
                className="h-[55px] rounded-xl bg-[#F2F3F5] border-none text-base pr-12"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Номер телефона</label>
            <Input
              placeholder="Введите номер телефона"
              className="h-[55px] rounded-xl bg-[#F2F3F5] border-none text-base"
            />
          </div>

          <div className="flex items-start gap-3 mt-2">
            <Checkbox
              id="agree"
              checked={agreed}
              onCheckedChange={(v) => setAgreed(!!v)}
              className="mt-0.5"
            />
            <label htmlFor="agree" className="text-sm text-gray-500 leading-snug cursor-pointer">
              Нажимая кнопку,{' '}
              <span className="font-semibold text-foreground">
                вы подтверждаете согласие с Пользовательским соглашением
              </span>
            </label>
          </div>

          <Button
            type="submit"
            disabled={!agreed}
            className="w-full h-[55px] text-base font-medium rounded-xl mt-2"
          >
            Далее
          </Button>
        </form>
      )}
    </div>
  )
}
