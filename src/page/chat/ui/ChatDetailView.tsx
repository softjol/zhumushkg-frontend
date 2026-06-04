'use client'
import { ArrowLeft, MoreVertical, Send, CheckCheck } from 'lucide-react'
import { Input } from '@/shared/ui/input'
import { useState, useRef } from 'react'
import CompanyIcon from '@/features/company-icon/CompanyIcon'
import { useUserStore } from '@/entities/user/model/store'
import { useChat } from '@/entities/chat/model/useChat'

interface ChatDetailViewProps {
  chatId: string
  title?: string
  subtitle?: string
  onBack?: () => void
  candidateId?: number
  hrId?: number
}

export const ChatDetailView = ({ chatId, title, subtitle, onBack, candidateId, hrId }: ChatDetailViewProps) => {
  const { token, user } = useUserStore()

  // Определяем "свой" ID по роли в этом чате.
  // Когда кандидат и работодатель — один человек, user.id одинаковый,
  // поэтому используем candidate_id / hr_id из conversation.
  const myIdInConversation = user?.role === 'EMPLOYER' ? hrId : candidateId

  const { messages, loading, error, send } = useChat(
    token,
    chatId,
    myIdInConversation != null ? String(myIdInConversation) : user?.id ?? null,
  )
  const [message, setMessage] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  // Автоскролл вниз когда приходят новые сообщения
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }, [messages])
  console.log(messages)
  const handleSend = async () => {
    if (!message.trim()) return
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
          <CompanyIcon company={title ?? ''} className="h-12 w-12 text-base rounded-full" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-base text-foreground truncate">{subtitle}</p>
          <p className="text-base text-muted-foreground truncate">{title}</p>
        </div>
        <button className="p-2 rounded-xl hover:bg-muted">
          <MoreVertical size={21} className="text-muted-foreground" />
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading && <p className="text-center text-muted-foreground text-sm">Загрузка...</p>}
        {error && <p className="text-center text-destructive text-sm">{error}</p>}
        {messages.map((msg) => {
          const senderId = Number(msg.sender_id ?? msg.senderId)
          const isMine = myIdInConversation != null
            ? senderId === myIdInConversation
            : senderId === Number(user?.id)
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
                    {new Date(msg.created_at ?? msg.createdAt ?? '').toLocaleTimeString('ru-RU', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
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
            className="px-5 bg-transparent border-none rounded-xl flex-1 h-12 bg-muted outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="p-2.5 h-12 w-12 flex justify-center items-center rounded-xl bg-primary text-primary-foreground disabled:opacity-50 transition-all shadow-sm active:scale-95"
          >
            <Send size={22} />
          </button>
        </div>
      </div>
    </div>
  )
}
