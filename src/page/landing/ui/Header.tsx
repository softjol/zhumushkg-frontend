'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import iconLogo from '@/assets/icons/Logo.svg'

const NAV_LINKS = ['Для работодателей', 'Для соискателей', 'Тарифы']

export const Header = () => {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#111]/45 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center justify-between px-5 md:px-10 h-16 max-w-[1440px] mx-auto w-full">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold flex items-center gap-0.5 text-white shrink-0"
          >
            Ж<Image src={iconLogo} alt="Logo" width={22} height={22} />
            муш.kg
          </Link>

          <nav className="hidden md:flex gap-8 text-sm font-medium text-white/60">
            {NAV_LINKS.map((item) => (
              <Link
                key={item}
                href={
                  item === 'Для работодателей' ? '/#' : item === 'Для соискателей' ? '/#' : '/#'
                }
                className="hover:text-white text-white/60 transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex gap-4 items-center text-sm font-medium">
            <Link href={'/login'}>
              <button className="text-white/60 hover:text-white transition-colors px-2">
                Войти
              </button>
            </Link>
            <Link href={'/register'}>
              <button className="bg-white text-[#111] px-4 py-2 rounded-xl font-semibold hover:bg-white/90 transition-colors">
                Зарегистрироваться
              </button>
            </Link>
          </div>

          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 p-1.5"
            onClick={() => setOpen(true)}
            aria-label="Открыть меню"
          >
            <span className="block w-full h-0.5 bg-white rounded-full" />
            <span className="block w-full h-0.5 bg-white rounded-full" />
            <span className="block w-3/4 h-0.5 bg-white rounded-full" />
          </button>
        </div>
      </header>
      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm
          transition-opacity duration-300 md:hidden
          ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        aria-hidden
      />
      <div
        className={`
          fixed top-0 right-0 bottom-0 z-[70]
          w-[75vw] max-w-[320px]
          bg-[#111] border-l border-white/10
          flex flex-col
          transition-transform duration-300 ease-in-out
          md:hidden
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/5 shrink-0">
          <Link
            href="/"
            className="text-lg font-bold flex items-center gap-0.5 text-white"
            onClick={() => setOpen(false)}
          >
            Ж<Image src={iconLogo} alt="Logo" width={18} height={18} />
            муш.kg
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Закрыть меню"
            className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col px-5 pt-4 gap-1 flex-1">
          {NAV_LINKS.map((item, i) => (
            <Link
              key={item}
              href="#"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-4 border-b border-white/5 text-sm font-medium text-white/70 hover:text-white transition-colors"
              style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
            >
              {item}
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 opacity-40"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          ))}
        </nav>

        <div className="px-5 pb-8 pt-4 flex flex-col gap-3 border-t border-white/5 shrink-0">
          <Link href={'/login'}>
            <button className="w-full text-white/80 border border-white/20 px-4 py-3 rounded-xl text-sm font-medium hover:border-white/40 hover:text-white transition-colors">
              Войти
            </button>
          </Link>
          <Link href={'/register'}>
            <button className="w-full bg-white text-[#111] px-4 py-3 rounded-xl text-sm font-bold hover:bg-white/90 transition-colors">
              Зарегистрироваться
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
