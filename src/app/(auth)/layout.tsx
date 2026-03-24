'use client'

import { usePathname } from 'next/navigation'

import Link from 'next/link'
import { Logo } from '@/shared/kit'

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isRegister = pathname === '/register'

  return (
    <div className="w-full h-screen flex relative">
      {/* Тестовый, тут все будет изменено */}
      <div className="w-full h-full bg-violet-400 rounded-tr-[60px] rounded-br-[60px]">
        {/* <Image src={bg} alt="" className=" absolute bottom-0 left-[-200px]" /> */}
      </div>
      <div className="w-full h-full flex flex-col justify-center gap-[90px] relative z-20">
        <div className="flex flex-col gap-5 ">
          <Logo size={40} />
          <ul className="flex justify-center text-lg font-medium">
            <Link
              href="/register"
              className={`${isRegister && 'border-b border-b-4 border-[#626AE5]'} px-[50px] py-[14px] `}
            >
              Регистрация
            </Link>
            <Link
              href="/login"
              className={`${!isRegister && 'border-b border-b-4 border-[#626AE5]'} px-[50px] py-[14px] `}
            >
              Авторизация
            </Link>
          </ul>
        </div>
        {children}
      </div>
    </div>
  )
}
