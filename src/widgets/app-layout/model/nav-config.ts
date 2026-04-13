import {
  LayoutGrid,
  Heart,
  MessageCircle,
  User,
  Briefcase,
  Inbox,
  Building2,
  Users,
} from 'lucide-react';
import { ROUTES } from '@/shared/config/routes';
import { NavItem, UserRole } from './types';

export const candidateNavItems: NavItem[] = [
  {
    path: ROUTES.CANDIDATE.JOBS,
    label: 'Вакансии',
    icon: LayoutGrid,
  },
  {
    path: ROUTES.CANDIDATE.FAVORITES,
    label: 'Избранное',
    icon: Heart,
  },
  {
    path: ROUTES.CANDIDATE.CHAT,
    label: 'Чат',
    icon: MessageCircle,
    badge: 0,
  },
  {
    path: ROUTES.CANDIDATE.PROFILE,
    label: 'Кабинет',
    icon: User,
  },
];

export const employerNavItems: NavItem[] = [
  {
    path: ROUTES.EMPLOYER.CANDIDATES,
    label: 'Кандидаты',
    icon: Users,
  },
  {
    path: ROUTES.EMPLOYER.VACANCIES,
    label: 'Мои вакансии',
    icon: Briefcase,
  },
  {
    path: ROUTES.EMPLOYER.APPLICANTS,
    label: 'Отклики',
    icon: Inbox,
  },
  {
    path: ROUTES.CANDIDATE.CHAT,
    label: 'Чат',
    icon: MessageCircle,
    badge: 0,
  },
  {
    path: ROUTES.EMPLOYER.PROFILE,
    label: 'Кабинет',
    icon: Building2,
  },
];

export const getNavItems = (role: UserRole): NavItem[] => {
  return role === 'employer' ? employerNavItems : candidateNavItems;
};