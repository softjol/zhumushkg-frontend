import { apiRequest } from '@/shared/api/clients';

export interface ApiVacancy {
  id: number;
  position: string;      
  company: string;
  salary_net: number;    
  city: string;
  views: number;
  createdAt: string;
}

export const vacancyApi = {
  getVacancies: () => apiRequest<ApiVacancy[]>('/vacancy'),
  deleteVacancy: (id: number) => apiRequest<void>(`/vacancy/${id}`, { method: 'DELETE' }),
};