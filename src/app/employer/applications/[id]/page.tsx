import { EmployerApplicationsPage } from "@/page/employer-applications/EmployerApplicationsPage"

interface Props {
  params: Promise<{ id: string }>
}
export default async function EmployerApplications({ params }: Props) {
  const { id } = await params

  return <EmployerApplicationsPage vacancyId={Number(id)} />
}
