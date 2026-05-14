import icon from '@/assets/icons/Logo.svg'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white rounded-t-[40px] md:rounded-t-[80px] pt-12 pb-10 px-6 md:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="flex items-center gap-1 text-2xl font-bold tracking-tight">
            <span>Ж</span>
            <div>
              <Image src={icon} alt="Logo" width={24} height={24} />
            </div>
            <span>муш.kg</span>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-4 text-[15px] font-medium text-white">
            <a href="/#" className="hover:text-indigo-400  transition-colors  text-white/80">
              Для работодателей
            </a>
            <a
              href="/#"
              className="hover:text-indigo-400 transition-colors text-white/80"
            >
              Для соискателей
            </a>
            <a href="/#" className="hover:text-indigo-400 transition-colors text-white/80">
              Тарифы
            </a>
            <a
              href="/login"
              className="hover:text-indigo-400 transition-colors md:ml-10 text-white/80"
            >
              Войти
            </a>
            <a href="/register" className="hover:text-indigo-400 transition-colors text-white/80">
              Зарегистрироваться
            </a>
          </nav>
        </div>
        <div className="h-[1px] w-full bg-white/10 mb-16" />
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
          <p className="text-xl md:text-2xl font-medium max-w-[400px] leading-relaxed">
            Мы всегда открыты к сотрудничеству и новым решениям
          </p>

          <div className="relative w-full max-w-[500px]">
            <input
              type="text"
              placeholder="Есть предложения?"
              className="w-full bg-[#F5F5F5] border-none rounded-full py-5 px-8 outline-none text-black placeholder:text-gray-500 text-lg"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-[#6366F1] px-6 rounded-full hover:bg-indigo-500 transition-all flex items-center justify-center">
              <span className="text-2xl">→</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
