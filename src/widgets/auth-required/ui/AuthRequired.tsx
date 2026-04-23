'use client'
import { LogIn } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/shared/ui/button'
import { ROUTES } from '@/shared/config/routes'

interface AuthRequiredProps {
  description?: string
  className?: string
}

export const AuthRequired = ({
  description = 'Войдите в аккаунт',
  className = 'py-32 px-6',
}: AuthRequiredProps) => {
  return (
    <div className={`flex flex-col items-center justify-center  text-center ${className}`}>
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <LogIn size={28} className="text-muted-foreground" />
      </div>
      <h2 className="text-lg font-semibold text-foreground mb-2">Нужна авторизация</h2>
      <p className="text-sm text-muted-foreground mb-6">{description}</p>
      <div className="flex flex-col gap-4 w-full max-w-[300px]">
        <Button asChild className="rounded-2xl h-12">
          <Link href={ROUTES.AUTH.LOGIN}>Войти</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-2xl h-12">
          <Link href={ROUTES.AUTH.REGISTER}>Зарегистрироваться</Link>
        </Button>
      </div>
    </div>
  )
}
