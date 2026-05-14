'use client'
import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChatDetailView } from '@/page/chat/ui/ChatDetailView'
import { getConversations } from '@/entities/chat/api'
import { getVacancy } from '@/entities/vacancy/api'
import { useUserStore } from '@/entities/user/model/store'

export default function EmployerChatDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { token } = useUserStore()

  const [position, setPosition] = useState('')
  const [company, setCompany] = useState('')

  useEffect(() => {
    if (!token) return
    getConversations(token)
      .then(async (data) => {
        const conv = data.find((c) => String(c.id) === id)
        if (!conv?.vacancy_id) return
        const vacancy = await getVacancy(conv.vacancy_id)
        setPosition(vacancy.position ?? '')
        setCompany(vacancy.company ?? '')
      })
      .catch(console.error)
  }, [token, id])

  return (
    <ChatDetailView
      chatId={id}
      title={company}
      subtitle={position}
      onBack={() => router.push('/employer/chat')}
    />
  )
}
