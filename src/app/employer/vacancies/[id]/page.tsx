import { EmployerVacancyDetail } from '@/page/employer-vacancy/ui/EmployerVacancyDetail'

interface Props {
  params: Promise<{ id: string }>
}
export default async function VacancyDetail({ params }: Props) {
  const { id } = await params

  return <EmployerVacancyDetail vacancyId={Number(id)} />
}
