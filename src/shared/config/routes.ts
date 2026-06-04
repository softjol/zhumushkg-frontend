export const ROUTES = {
  HOME: '/jobs',

  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },

  CANDIDATE: {
    JOBS: '/jobs',
    JOB_DETAIL: (id: string) => `/jobs/${id}`,
    FAVORITES: '/favorites',
    APPLICATIONS: '/applications',
    CHAT: '/chat',
    CHAT_DETAIL: (id: string) => `/chat/${id}`,
    NOTIFICATIONS: '/notifications',
    PROFILE: '/profile',
    RESUME: '/resume',
    FILTERS: '/filters',
  },

  EMPLOYER: {
    CANDIDATES: '/employer/candidates',
    CANDIDATE_DETAIL: (id: string) => `/employer/candidates/${id}`,
    CHAT: '/employer/chat',
    CHAT_DETAIL: (id: string) => `/employer/chat/${id}`,
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
  ADMIN: {
    EMPLOYERS: '/admin/employers',
    CANDIDATES: '/admin/candidates',
    VACANCIES: '/admin/vacancies',
    APPLICATIONS: '/admin/applications',
    CONTENT: '/admin/content',
    STATISTICS: '/admin/statistics',
    EMPLOYER_DETAIL: (id: string) => `/admin/employers/${id}`,
    CANDIDATE_DETAIL: (id: string) => `/admin/candidates/${id}`,
    VACANCY_DETAIL: (id: string) => `/admin/vacancies/${id}`,
    APPLICATION_DETAIL: (id: string) => `/admin/applications/${id}`,
  },
} as const
