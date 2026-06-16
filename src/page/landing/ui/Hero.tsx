import Image from 'next/image'
import heroBg from '@/assets/images/Frame 1261156023 (1) (1).png'
import Link from 'next/link'

const STATS = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-4 h-4 md:w-5 md:h-5 text-white/80"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
        />
      </svg>
    ),
    value: '500+',
    label: 'компаний',
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-4 h-4 md:w-5 md:h-5 text-white/80"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
        />
      </svg>
    ),
    value: '3 000+',
    label: 'вакансий',
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-4 h-4 md:w-5 md:h-5 text-white/80"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
      </svg>
    ),
    value: '10 000+',
    label: 'пользователей',
  },
]

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-[#111] flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBg}
          alt="Hero"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#111]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111]/50 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-10 w-full py-16 md:py-24 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0">
        <div className="flex-1 max-w-[560px]">
          <h1 className="text-[28px] sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight mb-4">
            Работа и вакансии в Бишкеке{' '}
            <span className="text-[#A083F7]">и по всему Кыргызстану</span>
          </h1>
          <p className="text-white/50 text-sm md:text-base mb-8 leading-relaxed max-w-sm">
            Жумуш.кг - платформа, которая соединяет работодателей и соискателей быстро и удобно
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/register" >
              <button className="bg-[#A083F7] hover:bg-[#8B6EE0] transition-all text-white px-7 py-3.5 rounded-full font-semibold text-sm shadow-lg shadow-[#A083F7]/30 hover:shadow-[#A083F7]/50">
                Я ищу работу
              </button>
            </Link>
            <Link href="/register" >
              <button className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all text-white px-7 py-3.5 rounded-full font-semibold text-sm">
                Я ищу сотрудников
              </button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-col gap-2 md:gap-3 md:ml-auto md:mr-8 flex-wrap">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-3 md:px-5 py-2 md:py-3"
            >
              <div className="w-7 h-7 md:w-10 md:h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                {s.icon}
              </div>
              <div>
                <div className="text-white font-bold text-sm md:text-lg leading-none">
                  {s.value}
                </div>
                <div className="text-white/50 text-[10px] md:text-sm leading-none mt-0.5">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
