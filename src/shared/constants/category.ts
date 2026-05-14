// shared/constants/category.ts

export enum JobCategory {
  ALL = 'all',
  IT = 'it',
  TRADE = 'trade',
  SALES = 'sales',
  CONSTRUCTION = 'construction',
  TRANSPORT = 'transport',
  FOOD = 'food',
  EDUCATION = 'education',
  BEAUTY = 'beauty',
  SERVICES = 'services',
  MANUFACTURING = 'manufacturing',
  SECURITY = 'security',
  MEDICINE = 'medicine',
  FINANCE = 'finance',
  LEGAL = 'legal',
  MARKETING = 'marketing',
  ADMIN = 'admin',
  AGRICULTURE = 'agriculture',
  HOSPITALITY = 'hospitality',
  DOMESTIC = 'domestic',
  MANAGEMENT = 'management',
  CUSTOMER_SUPPORT = 'customer_support',
  WAREHOUSE = 'warehouse',
  CLEANING = 'cleaning',
  OTHER = 'other',
}

export interface CategoryItem {
  id: string
  label: string
  icon: string
  color: string
}

export const JOB_CATEGORIES: CategoryItem[] = [
  { id: JobCategory.ALL, label: 'Все', icon: 'LayoutGrid', color: '#64748b' },
  { id: JobCategory.IT, label: 'IT и технологии', icon: 'Monitor', color: '#8b5cf6' },
  { id: JobCategory.TRADE, label: 'Торговля и розница', icon: 'ShoppingBag', color: '#0ea5e9' },
  { id: JobCategory.SALES, label: 'Продажи', icon: 'TrendingUp', color: '#0284c7' },
  {
    id: JobCategory.CONSTRUCTION,
    label: 'Строительство и ремонт',
    icon: 'Hammer',
    color: '#f59e0b',
  },
  { id: JobCategory.TRANSPORT, label: 'Транспорт и доставка', icon: 'Car', color: '#3b82f6' },
  { id: JobCategory.FOOD, label: 'Еда и напитки', icon: 'UtensilsCrossed', color: '#ef4444' },
  {
    id: JobCategory.EDUCATION,
    label: 'Образование и наука',
    icon: 'GraduationCap',
    color: '#10b981',
  },
  { id: JobCategory.BEAUTY, label: 'Красота и здоровье', icon: 'Sparkles', color: '#ec4899' },
  { id: JobCategory.SERVICES, label: 'Бытовые услуги', icon: 'Wrench', color: '#facc15' },
  { id: JobCategory.MANUFACTURING, label: 'Производство', icon: 'Factory', color: '#475569' },
  { id: JobCategory.SECURITY, label: 'Охрана и безопасность', icon: 'Shield', color: '#dc2626' },
  { id: JobCategory.MEDICINE, label: 'Медицина', icon: 'HeartPulse', color: '#06b6d4' },
  { id: JobCategory.FINANCE, label: 'Финансы и бухгалтерия', icon: 'Banknote', color: '#16a34a' },
  { id: JobCategory.LEGAL, label: 'Юриспруденция', icon: 'Scale', color: '#7c3aed' },
  { id: JobCategory.MARKETING, label: 'Маркетинг и реклама', icon: 'Megaphone', color: '#f97316' },
  {
    id: JobCategory.ADMIN,
    label: 'Административный персонал',
    icon: 'ClipboardList',
    color: '#64748b',
  },
  { id: JobCategory.AGRICULTURE, label: 'Сельское хозяйство', icon: 'Tractor', color: '#84cc16' },
  { id: JobCategory.HOSPITALITY, label: 'Гостиницы и туризм', icon: 'Hotel', color: '#f43f5e' },
  { id: JobCategory.DOMESTIC, label: 'Домашний персонал', icon: 'Home', color: '#a78bfa' },
  { id: JobCategory.MANAGEMENT, label: 'Управление', icon: 'BarChart2', color: '#0f172a' },
  {
    id: JobCategory.CUSTOMER_SUPPORT,
    label: 'Колл-центр и поддержка',
    icon: 'PhoneCall',
    color: '#6366f1',
  },
  { id: JobCategory.WAREHOUSE, label: 'Склад и логистика', icon: 'Warehouse', color: '#92400e' },
  { id: JobCategory.CLEANING, label: 'Уборка и клининг', icon: 'Brush', color: '#22d3ee' },
  { id: JobCategory.OTHER, label: 'Другое', icon: 'MoreHorizontal', color: '#94a3b8' },
]
