'use client';
import Employer from '@/assets/icons/Frame 427321250.png';
import Statistics from '@/assets/icons/Frame 427321251.png';
import Content from '@/assets/icons/Frame 427321250 (1).png';
import Vacancies from '@/assets/icons/Frame 427321250 (2).png';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/config/routes';
import Image from 'next/image';
import { useUserStore } from '@/entities/user/model/store';

const NAV_ITEMS = [
  {
    href: ROUTES.ADMIN.STATISTICS,
    label: 'Статистика',
    icon: {
      src: Statistics,
      alt: 'Statistics',
    },
  },
  {
    href: ROUTES.ADMIN.EMPLOYERS,
    label: 'Пользователи',
    icon: {      
      src: Employer,
      alt: 'Employers',
    },
  },
  {
    href: ROUTES.ADMIN.CONTENT,
    label: 'Контент',
    icon: {
      src: Content,
      alt: 'Content',
    },
  },
  {
    href: ROUTES.ADMIN.VACANCIES,
    label: 'Вакансии',
    icon: {
      src: Vacancies,      
      alt: 'Vacancies',
    },
  },
  
];


export function Sidebar() {
  const pathname = usePathname();

  const logout = useUserStore((s) => s.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace(ROUTES.AUTH.LOGIN);
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-[240px] bg-white border-r border-gray-100 flex flex-col z-30">
      <div className="px-6 pt-8 pb-6">
        <h1 className="text-lg font-bold text-gray-900 tracking-tight">АДМИНКА 0.1</h1>
        <p className="text-xs text-gray-400 mt-0.5">Жумуш KG</p>
      </div>
      <nav className="flex-1 px-3 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                isActive
                  ? 'bg-[#5B5FC7] text-white shadow-sm shadow-[#5B5FC7]/30'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              ].join(' ')}
            >
              <span className="flex-shrink-0">
                <Image 
                  src={item.icon.src} 
                  alt={item.icon.alt} 
                  width={30} 
                  height={30} 
                />
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="px-3 pb-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition w-full text-sm font-medium"
        >
          <span className="flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          Выйти
        </button>
      </div>
    </aside>
  );
}