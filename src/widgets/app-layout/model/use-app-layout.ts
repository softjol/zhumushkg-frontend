'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getNavItems } from './nav-config';
import { UserRole, AppLayoutContextType } from './types';
import { ROUTES } from '@/shared/config/routes';
import { useUserStore } from '@/entities/user/model/store';

export function useAppLayout(): AppLayoutContextType {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUserStore();
  const [role, setRole] = useState<UserRole>('candidate');
  const [hasCompanyProfile, setHasCompanyProfile] = useState(false);
  const [activeFilterGroupsCount, setActiveFilterGroupsCount] = useState(0);

  // Determine role based on current route
  useEffect(() => {
    if (pathname?.startsWith('/employer')) {
      setRole('employer');
    } else {
      setRole('candidate');
    }
  }, [pathname]);

  // Check company profile
  useEffect(() => {
    const checkCompanyProfile = async () => {
      if (user?.role === 'employer') {
        // Fetch from API if needed
        setHasCompanyProfile(true);
      }
    };

    checkCompanyProfile();
  }, [user]);

  const isMainPage = 
    pathname === ROUTES.CANDIDATE.JOBS || 
    pathname === ROUTES.EMPLOYER.CANDIDATES;

  const navItems = getNavItems(role);

  const switchRole = (newRole: UserRole) => {
    if (newRole === 'employer' && !hasCompanyProfile) {
      router.push(ROUTES.EMPLOYER.COMPANY);
      setRole(newRole);
      return;
    }

    setRole(newRole);
    const defaultPath = newRole === 'employer' 
      ? ROUTES.EMPLOYER.CANDIDATES 
      : ROUTES.CANDIDATE.JOBS;
    
    router.push(defaultPath);
  };

  return {
    role,
    navItems,
    isMainPage,
    activeFilterGroupsCount,
    switchRole,
    hasCompanyProfile,
  };
}