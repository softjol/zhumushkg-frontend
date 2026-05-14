import { EmployerFiltersPage } from '@/page/employer-filters/EmployerFiltersPage'
import { Suspense } from 'react'

export default function EmployerFilters() {
 return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <EmployerFiltersPage />
    </Suspense>
  )
}
