import { JobDetailPage } from '@/page/job-detail/ui/JobDetailPage'

interface Props {
  params: Promise<{ id: string }>
}
export default async function JobDetail({ params }: Props) {
  const { id } = await params

  return <JobDetailPage jobId={Number(id)} />
}
