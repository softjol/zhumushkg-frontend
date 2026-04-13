'use client'
import { useRouter } from 'next/navigation'
import iconLogo from '@/assets/icons/Logo.svg'
import instaLogo from '@/assets/icons/insta.png'
import whatsappLogo from '@/assets/icons/whatsapp.png'
import telegramLogo from '@/assets/icons/telegram.png'
import Link from 'next/link'
import { footerNavItems } from './model/footer-nav'
import Image from 'next/image'

interface FooterLinkProps {
  to: string
  label: string
  protected?: boolean
}

const isLoggedIn = false // Set to false to show lock icons as per requirement for "unlogged"

const FooterLink = ({ to, label, protected: isProtected }: FooterLinkProps) => {
  const router = useRouter()
  const handleClick = (e: React.MouseEvent) => {
    if (isProtected && !isLoggedIn) {
      e.preventDefault()
      router.push(`/auth?redirect=${to}`)
    }
  }

  return (
    <Link
      href={to}
      onClick={handleClick}
      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-medium h-9"
    >
      {label}
    </Link>
  )
}

export const Footer = () => {
  return (
    <footer className="w-full bg-card border-t border-border  overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-8 py-7 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="text-[28px] flex items-center font-bold">
                Ж
                <Image src={iconLogo} alt="logo" className="w-[20px] mt-0.5" />
                муш.kg
              </div>
            </Link>
            <p className="text-sm text-muted-foreground font-medium max-w-[200px] text-center md:text-left">
              Работа в Кыргызстане
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Image src={instaLogo} alt="Instagram" className="w-9 h-9" />
              <Image src={whatsappLogo} alt="WhatsApp" className="w-9 h-9" />
              <Image src={telegramLogo} alt="Telegram" className="w-9 h-9" />
            </div>
          </div>

          {/* Columns 2-4: Menu Sections */}
          {footerNavItems.map((section) => (
            <div key={section.id} className="space-y-4 flex flex-col items-center md:items-start">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                {section.title}
              </h3>

              <div className="flex flex-col space-y-1 items-center md:items-start">
                {section.links.map((link) => (
                  <FooterLink key={link.to} {...link} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Subfooter */}
        <div className="mt-6 lg:pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground text-center md:text-left">© 2026 Жумуш.kg. Все права защищены.</p>
          <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10 mr-0 md:mr-24">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
