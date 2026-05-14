import { apiRequest } from '@/shared/api/clients';

export interface AdminUser {
  id: number;
  displayName: string;
  email: string;
  phoneNumber?: string;
  isBanned: boolean;
  role: 'employer' | 'candidate';
  itemCount: number;
}

export const normalizeUser = (user: any): AdminUser => {
  const isEmployer = 'vacancies' in user;
  return {
    id: user.id,
    displayName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Аты жок',
    email: user.email,
    phoneNumber: user.phoneNumber,
    isBanned: user.isBanned,
    role: isEmployer ? 'employer' : 'candidate',
    itemCount: isEmployer 
      ? (user.vacancies?.length || 0) 
      : (user.resumes?.length || 0),
  };
};

export const adminApi = {
  getEmployers: () => apiRequest<any[]>('/user/admin/employers-with-vacancies'),
  getCandidates: () => apiRequest<any[]>('/user/admin/job-seekers-with-resumes'),
  banUser: (id: number) => apiRequest<void>(`/user/admin/${id}/ban`, { method: 'PATCH' }),
  deleteUser: (id: number) => apiRequest<void>(`/user/admin/${id}`, { method: 'DELETE' }),
  getStats: () => apiRequest<{
    userCount: number;
    totalVacancies: number;
    activeVacancies: number;
    blockedUsers: number;
  }>('/admin/statistics'),
};