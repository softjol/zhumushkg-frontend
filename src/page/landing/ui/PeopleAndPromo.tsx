'use client';
import Image, { StaticImageData } from 'next/image';
import Doctor from '@/assets/images/Ellipse 1418.png';
import Specialist from '@/assets/images/Ellipse 1420.png';
import Dentist from '@/assets/images/Ellipse 1421.png';
import Dentist2 from '@/assets/images/Ellipse 1422.png';
import Dentist3 from '@/assets/images/Ellipse 1423.png';
import Dentist4 from '@/assets/images/Ellipse 1425.png';
import Dentist5 from '@/assets/images/Ellipse 1425.png';
import Dentist6 from '@/assets/images/Ellipse 1426.png';
import Dentist7 from '@/assets/images/Ellipse 1426.png';
import PHONE_PH from '@/assets/images/Artboard.png';

interface AvatarItem {
  id: number;
  src: string | StaticImageData;
  alt: string;
  d: { w: number; h: number; top?: string; bottom?: string; left?: string; right?: string };
  m: { w: number; h: number; top?: string; bottom?: string; left?: string; right?: string };
  hideOnMobile?: boolean;
}

const avatars: AvatarItem[] = [
  { id: 1, src: Doctor, alt: 'Врач',               d: { w: 176, h: 176, top: '8%',  left: '1%'  }, m: { w: 76,  h: 76,  top: '4%',  left: '0%'  } },
  { id: 2, src: Specialist, alt: 'Специалист',          d: { w: 96,  h: 96,  top: '62%', left: '0%'  }, m: { w: 48,  h: 48,  top: '64%', left: '2%'  } },
  { id: 3, src: Dentist, alt: 'Бариста',             d: { w: 224, h: 224, top: '16%', left: '11%' }, m: { w: 100, h: 100, top: '22%', left: '10%' } },
  { id: 4, src: Dentist2, alt: 'Визажист',            d: { w: 224, h: 224, top: '22%', left: '31%' }, m: { w: 100, h: 100, top: '18%', left: '34%' } },
  { id: 5, src: Dentist3, alt: 'Официант',            d: { w: 144, h: 144, top: '6%',  left: '52%' }, m: { w: 66,  h: 66,  top: '4%',  left: '55%' } },
  { id: 6, src: Dentist4, alt: 'Менеджер',            d: { w: 96,  h: 96,  top: '60%', left: '54%' }, m: { w: 50,  h: 50,  top: '62%', left: '50%' }, hideOnMobile: true },
  { id: 7, src: Dentist5, alt: 'Профессор',           d: { w: 224, h: 224, top: '10%', right: '6%' }, m: { w: 96,  h: 96,  top: '18%', right: '1%' } },
  { id: 8, src: Dentist6, alt: 'Бизнесмен',           d: { w: 80,  h: 80,  top: '2%',  right: '2%' }, m: { w: 44,  h: 44,  top: '2%',  right: '3%' }, hideOnMobile: true },
  { id: 9, src: Dentist7, alt: 'Инженер',             d: { w: 144, h: 144, top: '58%', right: '0%' }, m: { w: 64,  h: 64,  top: '60%', right: '0%' } },
];




interface Props {
  phoneSrc?: string | StaticImageData;
}

export default function PeopleAndPromo({ phoneSrc = PHONE_PH }: Props) {
  return (
    <section className="bg-white w-full overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-16 md:pt-24">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Здесь находят работу
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-400 mt-1">
            и сотрудников в любой сфере
          </p>
        </div>

        <div className="relative w-full h-[260px] sm:h-[360px] md:h-[480px] lg:h-[520px]">
          <style>{`
            ${avatars.map(a => `
              @media(min-width:768px){
                .av-${a.id}{
                  width:${a.d.w}px!important;
                  height:${a.d.h}px!important;
                  ${a.d.top    != null ? `top:${a.d.top}!important;`    : 'top:auto!important;'}
                  ${a.d.bottom != null ? `bottom:${a.d.bottom}!important;` : 'bottom:auto!important;'}
                  ${a.d.left   != null ? `left:${a.d.left}!important;`  : 'left:auto!important;'}
                  ${a.d.right  != null ? `right:${a.d.right}!important;` : 'right:auto!important;'}
                }
              }
            `).join('')}
          `}</style>
          {avatars.map((a) => (
            <div key={a.id} className={`av-${a.id} absolute rounded-full overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 ${a.hideOnMobile ? 'hidden sm:block' : ''}`}
              style={{ width: a.m.w, height: a.m.h, top: a.m.top, bottom: a.m.bottom, left: a.m.left, right: a.m.right }}>
              <Image src={a.src} alt={a.alt} fill className="object-cover" sizes="(max-width:640px) 80px,(max-width:768px) 140px,250px" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-10 pb-10 lg:pb-20">
        <div className="relative w-full flex flex-row items-end" style={{ marginTop: 'clamp(-20px, -2vw, 0px)' }}>
          
          <div className="absolute inset-0 rounded-[32px] lg:rounded-[74px] overflow-hidden pointer-events-none"
            style={{ background: 'linear-gradient(263.1deg,#EEEEEE 56.04%,#AF93FD 85.28%)' }}>
            <div className="absolute rounded-full" style={{ width: 'clamp(150px,40vw,635px)', height: 'clamp(150px,45vw,708px)', left: 0, top: '-45px', background: '#E5DBFF', filter: 'blur(140px)' }} />
          </div>

          <div className="w-full pointer-events-none" style={{ height: 'clamp(240px, 55vw, 360px)' }} aria-hidden />

          <div className="absolute left-0 bottom-0 z-20 flex flex-col items-center" 
               style={{ width: 'clamp(160px,38%,480px)', marginLeft: 'clamp(12px,4vw,60px)', marginBottom: 'clamp(10px, 2vw, 30px)' }}>
            
            <div className="relative w-full" style={{ height: 'clamp(240px, 70vw, 500px)' }}>
              <Image src={phoneSrc} alt="Jumush.kg мобильное приложение" fill className="object-contain object-bottom" priority />
            </div>

            <div className="flex gap-2 mt-4 scale-90 sm:scale-100">
              {[
                { label: ['Download on the', 'App Store'], path: 'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' },
                { label: ['GET IT ON', 'Google Play'], path: 'M3.18 23.76c.3.16.64.2.97.12l12.12-6.98-2.54-2.54zM.59 1.18C.22 1.56 0 2.17 0 2.96v18.08c0 .79.22 1.4.59 1.78l.09.09 10.13-10.13v-.24L.68 1.09zM20.46 10.5l-2.72-1.57-2.85 2.85 2.85 2.85 2.74-1.58c.78-.45.78-1.11-.02-1.55zM4.15.24L16.27 7.22l-2.54 2.54L.97.12C1.31.04 1.69.1 2.01.28z' },
              ].map((b) => (
                <button key={b.label[1]} className="flex items-center gap-1.5 bg-[#1A1A1A] hover:bg-[#333] transition-colors text-white rounded-lg px-3 py-1.5">
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="white"><path d={b.path} /></svg>
                  <div className="text-left">
                    <div className="text-[7px] text-white/60 leading-none">{b.label[0]}</div>
                    <div className="text-[10px] font-semibold leading-tight">{b.label[1]}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="absolute right-0 bottom-0 z-10 flex flex-col justify-end self-stretch"
            style={{ left: 'clamp(160px,38%,480px)', padding: 'clamp(12px,3vw,80px)', paddingBottom: 'clamp(20px, 4vw, 60px)', gap: 'clamp(10px,2vw,23px)', height: '100%' }}>
            <h2 className="font-medium leading-[105%] tracking-[-0.03em] text-black" style={{ fontSize: 'clamp(13px,2.4vw,34px)' }}>
              Сегодня Jumush.kg переживает <span className="text-[#9DA3AE]">этап роста и доверия</span>
            </h2>

            <div className="relative bg-white w-full" style={{ padding: 'clamp(6px,2vw,13px)', paddingBottom: 'clamp(14px,2.5vw,48px)', boxShadow: '9px -8px 0px #626AE5', borderRadius: 'clamp(14px,2vw,44px) clamp(14px,2vw,44px) 0 0' }}>
              <div className="w-full text-right text-[#626AE5] font-medium leading-none select-none" style={{ fontSize: 'clamp(12px,4vw,24px)', marginBottom: 'clamp(-3px,-0.6vw,-16px)' }}>"</div>
              <div className="flex flex-col" style={{ gap: 'clamp(5px,1vw,12px)' }}>
                <p className="font-medium text-black leading-[120%]" style={{ fontSize: 'clamp(10px,1.5vw,28px)' }}>
                  Публикуйте вакансии, создавайте резюме и находите нужных людей быстрее.
                </p>
                <p className="text-[#9DA3AE] font-medium" style={{ fontSize: 'clamp(9px,1.2vw,24px)' }}>
                  Удобный поиск, быстрые отклики и простой интерфейс для эффективного найма.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}