'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';

interface Review {
  id: number;
  display_name: string;
  text: string;
  rating: number | null;
  created_at: string;
}

const FALLBACK: Review[] = [
  { id: 1, display_name: 'ОсОО «Altyn Trade»', text: 'Раньше поиск сотрудников занимал недели. С JUMUSH.KG мы закрыли вакансию менеджера всего за 4 дня. Платформа удобная, отклики приходят быстро, а кандидаты действительно релевантные', rating: null, created_at: '' },
  { id: 2, display_name: 'ОсОО «Altyn Trade»', text: 'Раньше поиск сотрудников занимал недели. С JUMUSH.KG мы закрыли вакансию менеджера всего за 4 дня. Платформа удобная, отклики приходят быстро, а кандидаты действительно релевантные', rating: 4.2, created_at: '' },
  { id: 3, display_name: 'ОсОО «Altyn Trade»', text: 'Раньше поиск сотрудников занимал недели. С JUMUSH.KG мы закрыли вакансию менеджера всего за 4 дня. Платформа удобная, отклики приходят быстро, а кандидаты действительно релевантные', rating: null, created_at: '' },
];

const DESKTOP_WIDTHS = [359, 551, 359];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2 md:gap-3 mt-4 md:mt-6">
      <div className="flex gap-0.5 md:gap-1">
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = i <= Math.floor(rating);
          const half   = !filled && i - 0.5 <= rating;
          return (
            <svg
              key={i}
              className="w-5 h-5 md:w-7 md:h-7"
              viewBox="0 0 24 24"
            >
              <defs>
                <linearGradient id={`half-${i}`} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="50%" stopColor="#FFDF50" />
                  <stop offset="50%" stopColor="#D4D4D4" />
                </linearGradient>
              </defs>
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={
                  filled ? '#FFDF50'
                  : half  ? `url(#half-${i})`
                  : '#D4D4D4'
                }
              />
            </svg>
          );
        })}
      </div>
      <span className="text-lg md:text-[31.8px] font-medium tracking-[-0.03em] text-black">
        {rating}
      </span>
    </div>
  );
}

function ReviewCard({ review, idx }: { review: Review; idx: number }) {
  const dw = DESKTOP_WIDTHS[idx % DESKTOP_WIDTHS.length];

  return (
    <>
      <style>{`@media(min-width:768px){.rc-${review.id}-${idx}{width:${dw}px!important}}`}</style>

      <div
        className={`
          rc-${review.id}-${idx}
          relative bg-[#F7F7F7] rounded-[24px] md:rounded-[34px]
          p-5 md:p-[41px]
          flex flex-col justify-between overflow-hidden
          snap-center shrink-0
          w-[80vw] sm:w-[68vw]
          h-[340px] md:h-[451px]
        `}
      >
        <div className="absolute w-[152px] h-[89px] left-[115px] top-[257px] bg-[#FEE9EE] blur-[50px] opacity-60 pointer-events-none" />
        <div className="absolute w-[152px] h-[89px] left-[207px] top-[6px] bg-[#E9F2FE] blur-[50px] opacity-60 pointer-events-none" />

        <div className="relative z-10">
          <span className="block text-sm md:text-[18px] font-medium text-black/40 mb-3 md:mb-[22px] tracking-[-0.03em]">
            Отзыв #{review.id}
          </span>
          <p className="text-sm md:text-[20px] font-medium leading-[130%] md:leading-[110%] tracking-[-0.03em] text-black line-clamp-4 md:line-clamp-none">
            {review.text}
          </p>
          {review.rating != null && <StarRating rating={review.rating} />}
        </div>

        <div className="relative z-10 flex items-center justify-between mt-4 md:mt-auto">
          <div className="flex items-center gap-3 md:gap-5">
            <div className="w-10 h-10 md:w-[65px] md:h-[65px] rounded-full shrink-0 bg-gradient-to-br from-[#A083F7] to-[#626AE5] flex items-center justify-center text-white font-bold text-base md:text-2xl">
              {review.display_name[0]}
            </div>
            <div>
              <h4 className="text-sm md:text-[18px] font-medium text-black tracking-[-0.03em]">
                {review.display_name}
              </h4>
              <p className="text-xs md:text-[18px] font-medium text-black/40 tracking-[-0.03em]">
                малый бизнес
              </p>
            </div>
          </div>
          <span className="text-[52px] md:text-[71.5px] font-medium leading-none tracking-[-0.03em] text-black select-none">
            "
          </span>
        </div>
      </div>
    </>
  );
}

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>(FALLBACK);
  const [current, setCurrent] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('https://zhumushkg-backend-git-dev-amirbeks-projects-b11ee92a.vercel.app/landing/reviews')
      .then((r) => r.json())
      .then((data: Review[]) => {
        if (Array.isArray(data) && data.length > 0) setReviews(data);
      })
      .catch(() => {});
  }, []);

  const total = reviews.length;

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const max = scrollWidth - clientWidth;
    if (max <= 0) return;
    setCurrent(Math.round((scrollLeft / max) * (total - 1)) + 1);
  }, [total]);

  const slide = (dir: 'prev' | 'next') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.82;
    scrollRef.current.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' });
  };

  const progressPct = total > 1 ? ((current - 1) / (total - 1)) * 100 : 0;

  return (
    <section className="w-full py-12 md:py-20 bg-white flex flex-col items-center overflow-hidden">

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="
          flex flex-row items-stretch gap-3 md:gap-[30px]
          px-4 md:px-10 mb-8 md:mb-20 w-full
          overflow-x-auto snap-x snap-mandatory scroll-smooth
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
        "
      >
        {reviews.map((r, i) => (
          <ReviewCard key={`${r.id}-${i}`} review={r} idx={i} />
        ))}
      </div>

      <div className="flex flex-col items-center gap-2 md:gap-[6px] px-4">
        <div className="text-[36px] md:text-[54px] font-normal tracking-[-0.03em] text-[#141619] leading-none mb-1">
          {current}
          <span className="text-[#141619]/50">/{total}</span>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={() => slide('prev')}
            aria-label="Назад"
            className="w-6 h-6 flex items-center justify-center border-2 border-[#141619] hover:bg-[#141619] hover:text-white transition-colors"
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="relative w-[200px] sm:w-[280px] md:w-[360px] h-[6px] bg-[#F7F7F7] rounded-[23px] overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-[#B3B3B3] rounded-[23px] transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <button
            onClick={() => slide('next')}
            aria-label="Вперёд"
            className="w-6 h-6 flex items-center justify-center border-2 border-[#141619] rotate-180 hover:bg-[#141619] hover:text-white transition-colors"
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="flex gap-2 mt-3 md:hidden">
          {reviews.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i + 1 === current ? 'w-6 bg-[#141619]' : 'w-2 bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}