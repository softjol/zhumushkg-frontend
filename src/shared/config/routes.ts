export const ROUTES = {
  HOME: '/jobs',
  
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    ONBOARDING: '/onboarding',
  },

  CANDIDATE: {
    JOBS: '/jobs',
    JOB_DETAIL: (id: string) => `/jobs/${id}`,
    FAVORITES: '/favorites',
    APPLICATIONS: '/applications',
    CHAT: '/',
    CHAT_DETAIL: (id: string) => `/chat/${id}`,
    NOTIFICATIONS: '/notifications',
    PROFILE: '/profile',
    RESUME: '/resume',
    FILTERS: '/filters',
  },

  EMPLOYER: {
    CANDIDATES: '/employer/candidates',
    CANDIDATE_DETAIL: (id: string) => `/employer/candidates/${id}`,
    VACANCIES: '/employer/vacancies',
    CREATE_VACANCY: '/employer/vacancies/create',
    EDIT_VACANCY: (id: string) => `/employer/vacancies/${id}/edit`,
    APPLICANTS: '/employer/applicants',
    APPLICANTS_BY_VACANCY: (id: string) => `/employer/applicants/${id}`,
    PROFILE: '/employer/profile',
    COMPANY: '/employer/company',
    PRICING: '/employer/pricing',
    FAVORITES: '/employer/favorites',
  },
} as const;