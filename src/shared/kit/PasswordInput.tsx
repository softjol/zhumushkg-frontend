'use client'

import { forwardRef, useId, useState, type InputHTMLAttributes } from 'react'
import { cn } from '../lib/utils'
import EyeClose from '../../assets/icons/EyeClose.svg'
import EyeOpen from '../../assets/icons/EyeOpen.svg'
import Image from 'next/image'

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  containerClassName?: string
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, className, containerClassName, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className={cn('relative flex flex-col items-start gap-1', containerClassName)}>
        {label && <label className="text-sm font-medium leading-6 text-[#141619]">{label}</label>}

        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          className={cn(
            'w-full h-12 px-4 text-base leading-[48px] rounded-[12px] outline-none transition-colors',
            'placeholder:text-[#C5C9D1]',
            error
              ? 'bg-[#FEE2E2] border border-[#EF4444] text-[#141619]'
              : 'bg-[#F3F4F6] border border-transparent text-[#141619] focus:border-[#626AE5]',
            className,
          )}
          {...props}
        />

        <Image
          src={showPassword ? EyeOpen : EyeClose}
          alt={showPassword ? 'Hide Password' : 'Show Password'}
          className={cn(
            'absolute right-[13px] bottom-[13px] cursor-pointer transition-colors',
            error && 'text-[#EF4444] bottom-[35px]',
          )}
          onClick={() => setShowPassword((prev) => !prev)}
        />

        {error && (
          <span className="text-xs leading-[18px] text-[#EF4444] font-medium">{error}</span>
        )}
      </div>
    )
  },
)

PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
