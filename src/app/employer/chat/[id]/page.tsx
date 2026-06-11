'use client'
import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChatDetailView } from '@/page/chat/ui/ChatDetailView'
import { getConversations } from '@/entities/chat/api'
import { getVacancy } from '@/entities/vacancy/api'
import { getUserById } from '@/entities/user/api'
import { useUserStore } from '@/entities/user/model/store'

export default function EmployerChatDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { token } = useUserStore()

  const [position, setPosition] = useState('')
  const [candidateName, setCandidateName] = useState('')
  const [candidateId, setCandidateId] = useState<number | undefined>()
  const [hrId, setHrId] = useState<number | undefined>()

  useEffect(() => {
    if (!token) return
    getConversations(token)
      .then(async (data) => {
        const conv = data.find((c) => String(c.id) === id)
        if (!conv) return
        setCandidateId(conv.candidate_id)
        setHrId(conv.hr_id)
        if (conv.vacancy_id) {
          const vacancy = await getVacancy(conv.vacancy_id)
          setPosition(vacancy.position ?? '')
        }
        if (conv.candidate_id) {
          const profile = await getUserById(conv.candidate_id, token)
          setCandidateName(profile.firstName ?? '')
        }
      })
      .catch(console.error)
  }, [token, id])

  return (
    <ChatDetailView
      chatId={id}
      title={position}
      subtitle={candidateName}
      avatarName={candidateName}
      onBack={() => router.push('/employer/chat')}
      candidateId={candidateId}
      hrId={hrId}
    />
  )
}
