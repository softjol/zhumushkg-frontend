import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Cubes from "@/assets/images/3d-cubes.jpg"
import reviewsPerson from "@/assets/images/reviews-person.png"

export function StatsSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 md:px-10 py-12 md:py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between w-full mb-10 md:mb-16 gap-4">
        <div className="space-y-1">
          <h2 className="text-[28px] md:text-[48px] font-bold text-[#1A1A1A] leading-[1.1]">
            Закройте вакансию
            <br />
            или найдите работу
          </h2>
          <p className="text-[28px] md:text-[48px] font-bold text-[#9DA3AE] leading-[1.1]">
            всего за 24 часа
          </p>
        </div>
        
        <Link 
          href="#" 
          className="flex items-center gap-1 text-[#6B7280] hover:text-[#1A1A1A] transition-colors text-sm md:text-base font-medium group"
        >
          Разместить вакансию
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:flex lg:flex-wrap items-center gap-3 md:gap-5 w-full">
        
        <div className="flex flex-col items-center justify-center bg-[#F2F2F2] rounded-full h-[100px] md:h-[140px] px-4 flex-1 min-w-[160px] md:min-w-[280px]">
          <span className="text-2xl md:text-5xl font-bold text-[#1A1A1A]">5 000+</span>
          <span className="text-[#6B7280] text-xs md:text-lg">кандидатов</span>
        </div>

        <div className="relative overflow-hidden rounded-full h-[100px] md:h-[140px] flex-1 min-w-[160px] md:min-w-[280px] bg-[#A083F7]">
          <Image
            src={Cubes}
            alt="3D cubes"
            className="absolute inset-0 w-full h-full object-cover"
            width={260}
            height={200}
          />
        </div>

        <div className="flex flex-col items-center justify-center bg-[#F2F2F2] rounded-full h-[100px] md:h-[140px] px-4 flex-1 min-w-[160px] md:min-w-[280px]">
          <span className="text-2xl md:text-5xl font-bold text-[#1A1A1A]">5 000+</span>
          <span className="text-[#6B7280] text-xs md:text-lg whitespace-nowrap">вакансий закрыто</span>
        </div>

        <div className="relative flex items-center bg-[#1A1A1A] rounded-full h-[100px] md:h-[140px] px-8 md:px-12 flex-1 min-w-[160px] md:min-w-[320px] overflow-hidden group">
          <div className="flex flex-col z-10">
            <span className="text-2xl md:text-5xl font-bold text-white">4 000</span>
            <span className="text-[#9DA3AE] text-xs md:text-lg">отзывов</span>
          </div>
          <Image
            src={reviewsPerson}
            alt="Review decoration"
            className="absolute right-0 top-0 h-full w-1/2 object-cover object-center opacity-40 md:opacity-100"
            width={260}
            height={200}
          />
        </div>
        
      </div>
    </section>
  )
}