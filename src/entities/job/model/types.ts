export interface Job {
  id: number
  user_id: number
  profession: string      // категория: "Информационные технологии"
  position: string        // название: "Middle Node.js Developer"
  work_schedule: string   // "Полный день, 5/2"
  requir_respons: string  // требования/обязанности
  experience_work: string // "От 3 до 5 лет"
  remote_work: boolean
  city: string
  work_address: string
  region: string
  payment_period: string  // "Ежемесячно"
  salary_net: string      // "180000.00"
  views: number
  favorite: number
  offers: number
  company: string
  createdAt: string
  updatedAt: string
}
