import { useState } from 'react'
import { cn } from '../lib/utils'
import { FormInput } from './FormIntup'

interface DateInputProps {
  label?: string
  error?: string
  placeholder?: string
  value?: string
  containerClassName?: string
  onChange?: (date: string) => void
}

const DateInput = ({
  label,
  error,
  value,
  containerClassName,
  onChange,
  placeholder,
}: DateInputProps) => {
  const [open, setOpen] = useState(false)

  const handleSelect = (date: Date | undefined) => {
    if (!date) return
    const formatted = date.toLocaleDateString('ru-RU')
    onChange?.(formatted)
    setOpen(false)
  }
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={cn('relative', containerClassName)}>
      <FormInput
        label={label}
        error={error}
        readOnly
        value={value ?? ''}
        placeholder={placeholder}
        onClick={() => setOpen((prev) => !prev)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="cursor-pointer pr-10"
      />

      <svg
        width="21"
        height="21"
        viewBox="0 0 22 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          'absolute right-[13px] bottom-[13px] cursor-pointer transition-colors',
          isFocused ? 'text-[#626AE5]' : 'text-[#141619]',
          error ? 'bottom-[33px] text-[#EF4444]' : 'bottom-[13px]',
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <path
          d="M15.75 12.25C16.3023 12.25 16.75 11.8023 16.75 11.25C16.75 10.6977 16.3023 10.25 15.75 10.25C15.1977 10.25 14.75 10.6977 14.75 11.25C14.75 11.8023 15.1977 12.25 15.75 12.25Z"
          fill="currentColor"
        />
        <path
          d="M15.75 16.25C16.3023 16.25 16.75 15.8023 16.75 15.25C16.75 14.6977 16.3023 14.25 15.75 14.25C15.1977 14.25 14.75 14.6977 14.75 15.25C14.75 15.8023 15.1977 16.25 15.75 16.25Z"
          fill="currentColor"
        />
        <path
          d="M11.75 11.25C11.75 11.8023 11.3023 12.25 10.75 12.25C10.1977 12.25 9.75 11.8023 9.75 11.25C9.75 10.6977 10.1977 10.25 10.75 10.25C11.3023 10.25 11.75 10.6977 11.75 11.25Z"
          fill="currentColor"
        />
        <path
          d="M11.75 15.25C11.75 15.8023 11.3023 16.25 10.75 16.25C10.1977 16.25 9.75 15.8023 9.75 15.25C9.75 14.6977 10.1977 14.25 10.75 14.25C11.3023 14.25 11.75 14.6977 11.75 15.25Z"
          fill="currentColor"
        />
        <path
          d="M5.75 12.25C6.30229 12.25 6.75 11.8023 6.75 11.25C6.75 10.6977 6.30229 10.25 5.75 10.25C5.19772 10.25 4.75 10.6977 4.75 11.25C4.75 11.8023 5.19772 12.25 5.75 12.25Z"
          fill="currentColor"
        />
        <path
          d="M5.75 16.25C6.30229 16.25 6.75 15.8023 6.75 15.25C6.75 14.6977 6.30229 14.25 5.75 14.25C5.19772 14.25 4.75 14.6977 4.75 15.25C4.75 15.8023 5.19772 16.25 5.75 16.25Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.75 0C6.16421 0 6.5 0.335786 6.5 0.75V1.51272C7.162 1.49999 7.89133 1.49999 8.69346 1.5H12.8064C13.6086 1.49999 14.338 1.49999 15 1.51272V0.75C15 0.335786 15.3358 0 15.75 0C16.1642 0 16.5 0.335786 16.5 0.75V1.57709C16.7599 1.59691 17.0061 1.62182 17.239 1.65313C18.4114 1.81076 19.3604 2.14288 20.1088 2.89124C20.8571 3.63961 21.1892 4.58855 21.3469 5.76098C21.5 6.90018 21.5 8.3558 21.5 10.1935V12.3064C21.5 14.1441 21.5 15.5998 21.3469 16.739C21.1892 17.9114 20.8571 18.8604 20.1088 19.6088C19.3604 20.3571 18.4114 20.6892 17.239 20.8469C16.0998 21 14.6442 21 12.8065 21H8.69359C6.85585 21 5.40018 21 4.26098 20.8469C3.08856 20.6892 2.13961 20.3571 1.39124 19.6088C0.64288 18.8604 0.310763 17.9114 0.153135 16.739C-2.78205e-05 15.5998 -1.54177e-05 14.1442 3.17956e-07 12.3064V10.1936C-1.54177e-05 8.35582 -2.78205e-05 6.90019 0.153135 5.76098C0.310763 4.58855 0.64288 3.63961 1.39124 2.89124C2.13961 2.14288 3.08856 1.81076 4.26098 1.65313C4.4939 1.62182 4.74006 1.59691 5 1.57709V0.75C5 0.335786 5.33579 0 5.75 0ZM4.46085 3.13976C3.45476 3.27502 2.87511 3.52869 2.4519 3.9519C2.02869 4.37511 1.77502 4.95476 1.63976 5.96085C1.61685 6.13123 1.5977 6.31061 1.58168 6.5H19.9183C19.9023 6.31061 19.8831 6.13124 19.8602 5.96085C19.725 4.95476 19.4713 4.37511 19.0481 3.9519C18.6249 3.52869 18.0452 3.27502 17.0392 3.13976C16.0115 3.00159 14.6568 3 12.75 3H8.75C6.84318 3 5.48851 3.00159 4.46085 3.13976ZM1.5 10.25C1.5 9.39599 1.50032 8.65273 1.51309 8H19.9869C19.9997 8.65273 20 9.39599 20 10.25V12.25C20 14.1568 19.9984 15.5115 19.8602 16.5392C19.725 17.5452 19.4713 18.1249 19.0481 18.5481C18.6249 18.9713 18.0452 19.225 17.0392 19.3602C16.0115 19.4984 14.6568 19.5 12.75 19.5H8.75C6.84318 19.5 5.48851 19.4984 4.46085 19.3602C3.45476 19.225 2.87511 18.9713 2.4519 18.5481C2.02869 18.1249 1.77502 17.5452 1.63976 16.5392C1.50159 15.5115 1.5 14.1568 1.5 12.25V10.25Z"
          fill="currentColor"
        />
      </svg>

      {/* {open && (
        <div className="absolute z-10 top-full mt-1 bg-white rounded-2xl shadow-lg">
          <Calendar mode="single" />
        </div>
      )} */}
    </div>
  )
}

DateInput.displayName = 'DateInput'

export { DateInput }
