import { Job } from "@/entities/job/model/types"

export interface FavoriteItem {
  id: number
  user_id: number
  vacancy_id: number
  created_at: string
  vacancy: Job
}
