import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'relative inline-flex items-center justify-center overflow-hidden rounded-[12px] px-6 py-3 font-medium transition-all duration-200',

          'disabled:cursor-not-allowed ',

          variant === 'primary' &&
            'bg-gradient-to-r from-[#6871E4] to-[#181CA1] text-white hover:from-[#5a63d6] hover:to-[#141790]',

          variant === 'secondary' &&
            'bg-gradient-to-r from-[#6871E4]/50 to-[#181CA1]/50 text-white',

          variant === 'outline' &&
            'bg-transparent border border-[#989898] text-black hover:bg-[#989898]/10',

          variant !== 'outline' && [
            'before:absolute before:-left-[45px] before:-top-[10px] before:h-[208px] before:w-[208px] before:rounded-full',
            'before:bg-[linear-gradient(141.94deg,rgba(255,255,255,0)_21.96%,rgba(255,255,255,0.08)_75.65%)]',
            'after:absolute after:-left-[83px] after:top-[20px] after:h-[208px] after:w-[208px] after:rounded-full',
            'after:bg-[linear-gradient(130.83deg,rgba(255,255,255,0.12)_26.82%,rgba(255,255,255,0)_56.44%)]',
          ],

          className,
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    )
  },
)

Button.displayName = 'Button'

export { Button }