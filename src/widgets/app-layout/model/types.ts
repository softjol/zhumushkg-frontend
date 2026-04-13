import { LucideIcon } from 'lucide-react';

export interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

export type UserRole = 'candidate' | 'employer';

export interface AppLayoutContextType {
  role: UserRole;
  navItems: NavItem[];
  isMainPage: boolean;
  activeFilterGroupsCount: number;
  switchRole: (role: UserRole) => void;
  hasCompanyProfile: boolean;
}