'use client'

import { useState } from 'react'
import { Button } from '../../../shared/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '../../../shared/ui/input'
import { Checkbox } from '../../../shared/ui/checkbox'

export default function ForgotPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreed, setAgreed] = useState(false)
  return (
    <div className=" flex flex-col justify-center items-center">
      <form className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Электронная почта</label>
          <Input
            placeholder="Введите электронную почту"
            className="h-[55px] rounded-xl bg-[#F2F3F5] border-none text-base"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Пароль</label>
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
    </div>
  )
}
