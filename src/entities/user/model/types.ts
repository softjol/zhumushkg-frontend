export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  role: 'seeker' | 'employer';
  createdAt: string;
  updatedAt: string;
}

export interface SeekerProfile extends User {
  role: 'seeker';
  resume?: Resume;
  applications: string[];
  favorites: string[];
}

export interface Resume {
  id: string;
  title: string;
  experience: string;
  education: string;
  skills: string[];
  languages: string[];
  about: string;
}

export interface EmployerProfile extends User {
  role: 'employer';
  company: Company;
  vacancies: string[];
  applicants: string[];
}

export interface Company {
  id: string;
  name: string;
  description: string;
  website?: string;
  logo?: string;
  employees: number;
  industry: string;
}