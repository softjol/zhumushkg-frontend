'use client'
import { forwardRef, useState, type InputHTMLAttributes } from 'react'
import { cn } from '../lib/utils'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  containerClassName?: string
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, containerClassName, id, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col items-start gap-1', containerClassName)}>
        <label className="text-sm font-medium leading-6 text-[#141619]">{label}</label>

        <input
          ref={ref}
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

        {error && (
          <span className="text-xs leading-[18px] text-[#EF4444] font-medium ">{error}</span>
        )}
      </div>
    )
  },
)

FormInput.displayName = 'FormInput'

export { FormInput }
