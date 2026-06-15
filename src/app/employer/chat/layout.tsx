'use client'
import { MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import CompanyIcon from '@/features/company-icon/CompanyIcon'
import { useUserStore } from '@/entities/user/model/store'
import { getConversations, Conversation } from '@/entities/chat/api'
import { getVacancy } from '@/entities/vacancy/api'
import { getUserById } from '@/entities/user/api'

interface EnrichedConversation extends Conversation {
  vacancyTitle: string
  candidateName: string
  lastText: string
  lastTime: string
}

export default function EmployerChatLayout({ children }: { children: React.ReactNode }) {
  const { token, user } = useUserStore()
  const params = useParams()
  const activeId = params?.id as string | undefined

  const [conversations, setConversations] = useState<EnrichedConversation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) return

    getConversations(token)
      .then(async (data) => {
        console.log('[EmployerChat] Conversations from backend:', data)

        const withMessages = data.filter(
          (c) => c.hr_id === Number(user?.id)
        )

        const enriched = await Promise.all(
          withMessages.map(async (conv): Promise<EnrichedConversation> => {
            const lastMsg = conv.messages?.[conv.messages.length - 1]
            const rawLast = conv.last_message
            const lastMessageText = typeof rawLast === 'string' ? rawLast : rawLast?.content ?? ''
            const lastText = lastMsg?.content ?? lastMessageText
            const lastTime = conv.last_message_at
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
                const profile = await getUserById(conv.candidate_id, token)
                candidateName = profile.firstName ?? 'Соискатель'
              }
            } catch (e) {
              console.error('[EmployerChat] getUserById failed:', e)
            }

            return { ...conv, vacancyTitle, candidateName, lastText, lastTime }
          })
        )

        setConversations(enriched)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [token, user?.id])

  return (
    <div className={`flex ${activeId ? 'h-svh' : 'h-[calc(100svh-72px)]'} lg:h-svh overflow-hidden`}>
      {/* Список чатов */}
      <div className={`w-full lg:w-1/2 border-r border-border flex flex-col bg-background ${activeId ? 'hidden lg:flex' : 'flex'}`}>
        <div className="p-4 lg:p-6">
          <h1 className="text-xl font-bold text-foreground">Чаты</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-2 lg:p-3 space-y-2">
          {loading && Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-2xl animate-pulse">
              <div className="shrink-0 h-12 w-12 rounded-full bg-muted" />
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-32 rounded bg-muted" />
                  <div className="h-3 w-10 rounded bg-muted" />
                </div>
                <div className="h-3 w-24 rounded bg-muted" />
                <div className="h-3 w-40 rounded bg-muted" />
              </div>
            </div>
          ))}
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
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all bg-muted/50 ${isActive ? 'bg-primary/20 text-primary shadow-md' : 'hover:bg-muted'}`}
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
      <div className={`flex-1 flex flex-col bg-muted/10 ${!activeId ? 'hidden lg:flex' : 'flex'}`}>
        {children}
      </div>
    </div>
  )
}
