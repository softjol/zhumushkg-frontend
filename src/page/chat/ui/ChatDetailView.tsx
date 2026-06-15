'use client'
import { ArrowLeft, Send, CheckCheck } from 'lucide-react'
import { Input } from '@/shared/ui/input'
import { useState, useRef, useEffect } from 'react'
import CompanyIcon from '@/features/company-icon/CompanyIcon'
import { useUserStore } from '@/entities/user/model/store'
import { useChat } from '@/entities/chat/model/useChat'
import { openConversationWithCandidate, sendMessage } from '@/entities/chat/api'
import { useRouter } from 'next/navigation'

interface ChatDetailViewProps {
  chatId: string
  title?: string
  subtitle?: string
  avatarName?: string
  onBack?: () => void
  candidateId?: number
  hrId?: number
  pendingCandidateId?: number
}

export const ChatDetailView = ({ chatId, title, subtitle, avatarName, onBack, candidateId, hrId, pendingCandidateId }: ChatDetailViewProps) => {
  const { token, user } = useUserStore()
  const router = useRouter()

  const isPending = chatId === 'new'
  const myIdInConversation = user?.role === 'EMPLOYER' ? hrId : candidateId

  const { messages, loading, error, send } = useChat(
    isPending ? null : token,
    isPending ? '' : chatId,
    isPending ? null : (myIdInConversation != null ? String(myIdInConversation) : user?.id ?? null),
  )
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const prevLengthRef = useRef(0)

  useEffect(() => {
    if (messages.length > prevLengthRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    prevLengthRef.current = messages.length
  }, [messages])

  const handleSend = async () => {
    if (!message.trim() || sending) return
    if (isPending && pendingCandidateId != null && token) {
      setSending(true)
      try {
        const conv = await openConversationWithCandidate(token, pendingCandidateId)
        await sendMessage(token, String(conv.id), message)
        router.push(`/employer/chat/${conv.id}`)
      } catch (err) {
        console.error('Ошибка отправки:', err)
        setSending(false)
      }
      setMessage('')
      return
    }
    await send(message)
    setMessage('')
  }

  return (
    <div className="flex flex-col h-full bg-background border-l border-border">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-background">
        {onBack && (
          <button
            onClick={onBack}
            className="p-1.5 rounded-xl hover:bg-muted transition-colors lg:hidden"
          >
            <ArrowLeft size={22} />
          </button>
        )}
        <div className="relative flex-shrink-0">
          <CompanyIcon company={avatarName ?? title ?? ''} className="h-12 w-12 text-base rounded-full" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-base text-foreground truncate">{subtitle}</p>
          <p className="text-base text-muted-foreground truncate">{title}</p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading && <p className="text-center text-muted-foreground text-sm">Загрузка...</p>}
        {error && <p className="text-center text-destructive text-sm">{error}</p>}
        {messages.map((msg) => {
          const senderId = Number(msg.sender_id ?? msg.senderId)
          const isMine = senderId === Number(user?.id)
          return (
            <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] sm:max-w-[70%] px-4 py-2.5 rounded-2xl text-[15px] shadow-sm ${
                  isMine
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-muted/50 text-foreground rounded-bl-none border border-border/30'
                }`}
              >
                <p className="leading-relaxed">{msg.content}</p>
                <div
                  className={`flex items-center justify-end gap-1 mt-1 ${isMine ? 'text-primary-foreground/70' : 'text-muted-foreground/60'}`}
                >
                  <span className="text-[12px]">
                    {(msg.created_at ?? msg.createdAt)
                      ? new Date(msg.created_at ?? msg.createdAt!).toLocaleTimeString('ru-RU', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : ''}
                  </span>
                  {isMine && <CheckCheck size={15} />}
                </div>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-background pb-[calc(env(safe-area-inset-bottom)+1rem)]">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Написать сообщение..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            autoComplete="off"
            className="px-5 bg-transparent border-none rounded-xl flex-1 h-12 bg-muted outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim() || sending}
            className="p-2.5 h-12 w-12 flex justify-center items-center rounded-xl bg-primary text-primary-foreground disabled:opacity-50 transition-all shadow-sm active:scale-95"
          >
            <Send size={22} className='mr-[2px]'/>
          </button>
        </div>
      </div>
    </div>
  )
}
