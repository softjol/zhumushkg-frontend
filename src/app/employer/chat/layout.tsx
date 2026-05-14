'use client'
import { MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import CompanyIcon from '@/features/company-icon/CompanyIcon'
import { useUserStore } from '@/entities/user/model/store'
import { getConversations, Conversation } from '@/entities/chat/api'
import { getVacancy } from '@/entities/vacancy/api'
import { getProfile } from '@/entities/user/api'

interface EnrichedConversation extends Conversation {
  vacancyTitle: string
  candidateName: string
  lastText: string
  lastTime: string
}

export default function EmployerChatLayout({ children }: { children: React.ReactNode }) {
  const { token } = useUserStore()
  const params = useParams()
  const activeId = params?.id as string | undefined

  const [conversations, setConversations] = useState<EnrichedConversation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) return

    getConversations(token)
      .then(async (data) => {
        console.log('[EmployerChat] Conversations from backend:', data)

        const withMessages = data.filter((c) => c.messages && c.messages.length > 0)

        const enriched = await Promise.all(
          withMessages.map(async (conv): Promise<EnrichedConversation> => {
            const lastMsg = conv.messages![conv.messages!.length - 1]
            const lastText = lastMsg?.content ?? ''
            const lastTime = (lastMsg?.created_at ?? lastMsg?.createdAt)
              ? new Date(lastMsg.created_at ?? lastMsg.createdAt ?? '').toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
              : conv.last_message_at
              ? new Date(conv.last_message_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
              : ''

            let vacancyTitle = ''
            let candidateName = 'Соискатель'

            try {
              if (conv.vacancy_id) {
                const vacancy = await getVacancy(conv.vacancy_id)
                vacancyTitle = vacancy.position ?? ''
              }
            } catch (e) {
              console.error('[EmployerChat] getVacancy failed:', e)
            }

            try {
              if (conv.candidate_id) {
                const profile = await getProfile(conv.candidate_id)
                candidateName = profile.firstName ?? 'Соискатель'
              }
            } catch (e) {
              console.error('[EmployerChat] getProfile failed:', e)
            }

            return { ...conv, vacancyTitle, candidateName, lastText, lastTime }
          })
        )

        setConversations(enriched)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [token])

  return (
    <div className="flex h-[calc(100vh-64px)] lg:h-screen overflow-hidden">
      {/* Список чатов */}
      <div className={`w-full lg:w-1/2 border-r border-border flex flex-col bg-background ${activeId ? 'hidden lg:flex' : 'flex'}`}>
        <div className="p-4 lg:p-6">
          <h1 className="text-xl font-bold text-foreground">Чаты</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-2 lg:p-3 space-y-1">
          {loading && <p className="text-center py-10 text-muted-foreground text-sm">Загрузка...</p>}
          {!loading && conversations.length === 0 && (
            <div className="text-center py-10 opacity-50">
              <MessageCircle size={32} className="mx-auto mb-2" />
              <p>Нет сообщений</p>
            </div>
          )}
          {conversations.map((conv) => {
            const isActive = activeId === String(conv.id)
            return (
              <Link
                key={conv.id}
                href={`/employer/chat/${conv.id}`}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
              >
                <div className="relative shrink-0">
                  <CompanyIcon company={conv.candidateName} className="h-12 w-12 text-base rounded-full" />
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold text-base truncate ${isActive ? 'text-primary' : 'text-foreground'}`}>
                      {conv.candidateName}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">{conv.lastTime}</span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-base text-muted-foreground truncate">{conv.vacancyTitle}</p>
                    {conv.unreadCount != null && conv.unreadCount > 0 && !isActive && (
                      <span className="w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate mt-0.5">{conv.lastText}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Правая панель */}
      <div className={`flex-1 bg-muted/10 ${!activeId ? 'hidden lg:block' : 'block'}`}>
        {children}
      </div>
    </div>
  )
}
