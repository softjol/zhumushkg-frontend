import { CandidateDetailPage } from "@/page/employer-candidate-detail/CandidateDetailPage"

interface Props {
  params: Promise<{ id: string }>
}
export default async function CandidateDetail({ params }: Props) {
  const { id } = await params

  return <CandidateDetailPage candidateId={Number(id)} />
}
 