export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  city: string;
  salary?: string;
  salaryPeriod?: string;
  date: string;
  views: number;
  likes: number;
  category: string;
  experience: string;
  schedule: string;
  remote: boolean;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  conditions?: string[];
  address?: string;
  isFavorite?: boolean;
}