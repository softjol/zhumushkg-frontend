'use client';
import React, { useState, useRef } from 'react';

interface Plan {
  id: number;
  type: string;
  price: string;
  description: string;
  features: string[];
}

const plans: Plan[] = [
  {
    id: 1,
    type: "Free",
    price: "0",
    description: "Попробуйте платформу бесплатно",
    features: ["Размещение 1 вакансии / резюме", "Стандартное отображение в поиске", "Доступ к базовым откликам", "7 дней размещения"],
  },
  {
    id: 2,
    type: "Premium",
    price: "99",
    description: "Попробуйте платформу бесплатно",
    features: ["Всё из Regular", "Приоритетный показ в поиске", "Продвижение в рекомендациях", "Максимальное количество просмотров", "Выделение цветом", "30 дней размещения"],
  },
  {
    id: 3,
    type: "Regular",
    price: "50",
    description: "Попробуйте платформу бесплатно",
    features: ["Всё из Free", "Приоритет выше бесплатных объявлений", "Увеличенное количество показов", "14 дней размещения"],
  }
];

const PricingSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(1); 
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / (offsetWidth * 0.85)); 
      if (index >= 0 && index < plans.length) {
        setActiveIndex(index);
      }
    }
  };

  return (
    <section className="py-16 bg-white w-full overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
          <h2 className="text-[28px] md:text-[48px] font-bold text-[#1A1A1A] leading-[1.1] max-w-2xl">
            Выберите <span className="text-[#9DA3AE]">уровень видимости</span> — получите больше откликов
          </h2>
          <p className="text-[#9DA3AE] text-lg font-medium">Выберите подходящий</p>
        </div>

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar pb-6 px-1 md:px-0"
        >
          {plans.map((plan, index) => {
            const isPremium = plan.type === "Premium";
            
            return (
              <div
                key={plan.id}
                className={`
                  relative min-w-[85vw] md:min-w-0 snap-center rounded-[40px] p-8 flex flex-col h-full transition-all duration-300
                  ${isPremium 
                    ? 'bg-white border-2 border-[#A083F7]/20 shadow-[0_32px_64px_-15px_rgba(160,131,247,0.15)] z-10' 
                    : 'bg-[#F9FAFB] border border-gray-100'
                  }
                `}
              >
                {isPremium && (
                  <div className="absolute inset-0 bg-gradient-to-b from-[#F5F2FF] to-white -z-10 rounded-[40px]" />
                )}

                <div className="flex flex-col items-start border-b border-gray-100">
                    <div className="mb-8">
                  <span className="inline-block px-5 py-2 bg-white rounded-full text-sm font-bold text-[#1A1A1A] border border-gray-100 shadow-sm">
                    {plan.type}
                  </span>
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-[44px] md:text-[52px] font-extrabold text-[#1A1A1A] tracking-tight">
                    ${plan.price}
                  </span>
                  <span className="text-[#9DA3AE] font-medium text-lg italic">/month</span>
                </div>
                </div>
                
                <p className="text-[#6B7280] text-sm md:text-base font-medium mb-8">
                  {plan.description}
                </p>

                <button className={`
                  w-full py-5 rounded-[24px] font-bold text-lg mb-10 transition-all active:scale-[0.97]
                  ${isPremium 
                    ? 'bg-gradient-to-r from-[#A083F7] to-[#5D38F0] text-white shadow-lg shadow-purple-200' 
                    : 'bg-[#1A1A1A] text-white hover:bg-black'
                  }
                `}>
                  Купить
                </button>

                <ul className="space-y-4 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#A083F7] text-lg font-bold">✓</span>
                      <span className="text-[#374151] text-[15px] font-semibold leading-tight">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {plans.map((_, i) => (
            <div 
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i ? 'w-8 bg-[#A083F7]' : 'w-2 bg-gray-200'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default PricingSection;
