import { JobDetailPage } from "@/page/job-detail/ui/JobDetailPage";

interface Props {
  params: { id: string };
}

export default function JobDetail({ params }: Props) {
  return <JobDetailPage jobId={params.id} />;
}