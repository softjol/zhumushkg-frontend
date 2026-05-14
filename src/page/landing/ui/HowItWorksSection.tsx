'use client';
import React, { useState, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';

import resume from '@/assets/images/iPhone 13 Pro.png';
import vacancy from '@/assets/images/Letter Unread.png';
import invite from '@/assets/images/mockup.png';

interface Step {
  number: number;
  title: string;
  description: string;
  imageSrc: string | StaticImageData;
}

interface StepGridProps {
  steps: Step[];
  title: string;
}


const StepCard: React.FC<Step> = ({ number, title, description, imageSrc }) => (
  <div
    className="
      relative bg-[#F9FAFB] rounded-[32px]
      flex flex-col
      overflow-hidden
      border border-gray-100
      snap-center shrink-0
      min-w-[72vw] sm:min-w-[55vw] md:min-w-0 w-full
      group transition-shadow duration-300 hover:shadow-xl
    "
    style={{ height: 'clamp(260px, 40vw, 320px)' }}
  >
    {/* ── Text block ── */}
    <div className="relative z-10 flex flex-col gap-3 p-6 pb-0 md:p-8 md:pb-0 max-w-[220px]">
      <span className="w-7 h-7 rounded-full bg-[#A083F7]/15 text-[#A083F7] text-xs font-bold flex items-center justify-center shrink-0">
        {number}
      </span>
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#1A1A1A] leading-snug">
        {title}
      </h3>
      <p className="text-gray-400 text-xs sm:text-sm font-medium leading-relaxed">
        {description}
      </p>
    </div>

    <div
      className="
        absolute bottom-0 right-0
        w-[55%] md:w-[52%]
        h-[85%] md:h-[90%]
        transition-transform duration-500
        group-hover:scale-[1.04] group-hover:-translate-y-1
      "
    >
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-contain object-bottom object-right"
        sizes="(max-width: 768px) 45vw, 25vw"
      />
    </div>

    <div
      className="absolute bottom-0 right-0 w-40 h-40 rounded-full pointer-events-none opacity-30"
      style={{ background: '#E5DBFF', filter: 'blur(48px)' }}
    />
  </div>
);


const StepGrid: React.FC<StepGridProps> = ({ steps, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    const cardWidth = offsetWidth * 0.74;
    const index = Math.round(scrollLeft / cardWidth);
    if (index !== activeIndex) setActiveIndex(index);
  };

  const scrollTo = (i: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.offsetWidth * 0.74;
    scrollRef.current.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
    setActiveIndex(i);
  };

  return (
    <div className="space-y-5 md:space-y-10">
      <div className="flex flex-col gap-1 md:gap-2 px-4 md:px-0">
        <span className="text-[#A083F7] font-bold text-xs md:text-sm tracking-widest uppercase">
          🚀 Как это работает?
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1A1A1A] tracking-tight">
          {title}
        </h2>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="
          flex md:grid md:grid-cols-3
          gap-3 md:gap-5
          overflow-x-auto md:overflow-visible
          pb-4 md:pb-0
          px-4 md:px-0
          snap-x snap-mandatory
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
          scroll-smooth
        "
      >
        {steps.map((step) => (
          <StepCard key={step.number} {...step} />
        ))}
      </div>

      <div className="flex justify-center gap-2 md:hidden">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === i ? 'w-8 bg-[#A083F7]' : 'w-2 bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
};


const seekerSteps: Step[] = [
  {
    number: 1,
    title: 'Создайте резюме',
    description: 'Расскажите о своих навыках и опыте, будьте заметны для работодателей.',
    imageSrc: resume,
  },
  {
    number: 2,
    title: 'Откликайтесь на вакансии',
    description: 'Выбирайте интересные предложения и отправляйте отклик в один клик.',
    imageSrc: vacancy,
  },
  {
    number: 3,
    title: 'Получайте приглашения',
    description: 'Работодатели свяжутся с вами для собеседования.',
    imageSrc: invite,
  },
];

const employerSteps: Step[] = [
  {
    number: 1,
    title: 'Разместите вакансию',
    description: 'Опишите требования и условия — это займёт всего несколько минут.',
    imageSrc: resume,
  },
  {
    number: 2,
    title: 'Получайте отклики',
    description: 'Кандидаты сами откликаются, а вы выбираете лучших из подходящих резюме.',
    imageSrc: vacancy,
  },
  {
    number: 3,
    title: 'Наймите сотрудника',
    description: 'Свяжитесь с кандидатом и закройте вакансию быстро и эффективно.',
    imageSrc: invite,
  },
];


const HowItWorksSection: React.FC = () => (
  <section className="py-12 sm:py-16 md:py-32 max-w-[1440px] mx-auto px-4 md:px-10">
    <div className="space-y-16 sm:space-y-20 md:space-y-40">
      <StepGrid steps={seekerSteps} title="Для соискателей" />
      <StepGrid steps={employerSteps} title="Для работодателей" />
    </div>
  </section>
);

export default HowItWorksSection;

export function SeekerSteps() {
  return (
    <section className="pt-12 sm:pt-16 md:pt-32 max-w-[1440px] mx-auto px-4 md:px-10">
      <StepGrid steps={seekerSteps} title="Для соискателей" />
    </section>
  );
}

export function EmployerSteps() {
  return (
    <section className="pt-12 sm:pt-16 md:pt-32 pb-12 md:pb-32 max-w-[1440px] mx-auto px-4 md:px-10">
      <StepGrid steps={employerSteps} title="Для работодателей" />
    </section>
  );
}