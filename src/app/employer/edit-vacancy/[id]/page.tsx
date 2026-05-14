import { EmployerVacancyEdit } from '@/page/employer-vacancy/ui/EmployerVacancyEdit'

interface Props {
  params: Promise<{ id: string }>
}
export default async function VacancyEdit({ params }: Props) {
  const { id } = await params

  return <EmployerVacancyEdit vacancyId={Number(id)} />
}
