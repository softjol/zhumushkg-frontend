'use client'
import { MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import CompanyIcon from '@/features/company-icon/CompanyIcon'
import { useUserStore } from '@/entities/user/model/store'
import { AuthRequired } from '@/widgets/auth-required/ui/AuthRequired'
import { getConversations, Conversation } from '@/entities/chat/api'
import { getVacancy } from '@/entities/vacancy/api'

interface EnrichedConversation extends Conversation {
  vacancyTitle: string
  companyName: string
}

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, token, user } = useUserStore()
  const params = useParams()
  const activeId = params?.id as string | undefined

  const [conversations, setConversations] = useState<EnrichedConversation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) return

    getConversations(token)
      .then(async (data) => {
        console.log('[Chat] Conversations from backend:', data)

        const enriched = await Promise.all(
          data.map(async (conv): Promise<EnrichedConversation> => {
            if (!conv.vacancy_id) {
              return { ...conv, vacancyTitle: '', companyName: '' }
            }
            try {
              const vacancy = await getVacancy(conv.vacancy_id)
              console.log(`[Chat] Vacancy ${conv.vacancy_id}:`, vacancy)
              return {
                ...conv,
                vacancyTitle: vacancy.position ?? '',
                companyName: vacancy.company ?? '',
              }
            } catch (e) {
              console.error(`[Chat] getVacancy(${conv.vacancy_id}) failed:`, e)
              return { ...conv, vacancyTitle: '', companyName: '' }
            }
          })
        )

        setConversations(enriched)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [token])

  const withMessages = conversations.filter(
    (conv) => conv.candidate_id === Number(user?.id) && conv.messages && conv.messages.length > 0
  )

  if (!isAuthenticated) {
    return (
      <div className="w-full">
        <div className="p-4 lg:p-6">
          <h1 className="text-xl font-bold text-foreground">Чаты</h1>
        </div>
        <AuthRequired description="Войдите, чтобы видеть сообщения" />
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-64px)] lg:h-screen overflow-hidden">
      {/* Список чатов */}
      <div className={`w-full lg:w-1/2 border-r border-border flex flex-col bg-background ${activeId ? 'hidden lg:flex' : 'flex'}`}>
        <div className="p-4 lg:p-6">
          <h1 className="text-xl font-bold text-foreground">Чаты</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-2 lg:p-3 space-y-1">
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
          {!loading && withMessages.length === 0 && (
            <div className="text-center py-10 opacity-50">
              <MessageCircle size={32} className="mx-auto mb-2" />
              <p>Нет сообщений</p>
            </div>
          )}
          {withMessages.map((conv) => {
            const lastMsg = conv.messages![conv.messages!.length - 1]
            const lastText = lastMsg?.content ?? ''
            const lastTime = (lastMsg?.created_at ?? lastMsg?.createdAt)
              ? new Date(lastMsg.created_at ?? lastMsg.createdAt ?? '').toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
              : conv.last_message_at
              ? new Date(conv.last_message_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
              : ''
            const isActive = activeId === String(conv.id)

            return (
              <Link
                key={conv.id}
                href={`/chat/${conv.id}`}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
              >
                <div className="relative shrink-0">
                  <CompanyIcon company={conv.companyName || conv.vacancyTitle} className="h-12 w-12 text-base rounded-full" />
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold text-base truncate ${isActive ? 'text-primary' : 'text-foreground'}`}>
                      {conv.vacancyTitle}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">{lastTime}</span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-base text-muted-foreground truncate">{conv.companyName}</p>
                    {conv.unreadCount != null && conv.unreadCount > 0 && !isActive && (
                      <span className="w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate mt-0.5">{lastText}</p>
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
