'use client'
import { ArrowLeft, Phone, MoreVertical, Send, User, Check, CheckCheck } from 'lucide-react'
import { Input } from '@/shared/ui/input'
import { useState } from 'react'
import CompanyIcon from '@/features/company-icon/CompanyIcon'

interface Message {
  id: string
  text: string
  mine: boolean
  time: string
  status: 'sent' | 'delivered' | 'read'
}

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Здравствуйте! Я откликнулся на вакансию Frontend-разработчик',
    mine: true,
    time: '10:15',
    status: 'read',
  },
  {
    id: '2',
    text: 'Здравствуйте! Мы рассмотрели ваше резюме и хотели бы пригласить вас на собеседование.',
    mine: false,
    time: '10:30',
    status: 'read',
  },
  { id: '3', text: 'Когда вам будет удобно?', mine: false, time: '10:30', status: 'read' },
]

interface ChatDetailViewProps {
  chatId: string
  onBack?: () => void
}

export const ChatDetailView = ({ chatId, onBack }: ChatDetailViewProps) => {
  const isEmployer = false
  const chats = mockMessages
  const chat = chats.find((c) => c.id === chatId)

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(mockMessages)

  if (!chat) return null

  const title = isEmployer ? (chat as any).candidateName : (chat as any).company
  const subtitle = isEmployer ? (chat as any).candidatePosition : (chat as any).jobTitle

  const handleSend = () => {
    if (!message.trim()) return
    setMessages([
      ...messages,
      { id: Date.now().toString(), text: message, mine: true, time: 'сейчас', status: 'sent' },
    ])
    setMessage('')
  }

  const statusIcon = (s: string) => {
    if (s === 'read') return <CheckCheck size={15} />
    if (s === 'delivered') return <CheckCheck size={15} />
    return <Check size={15} />
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
          <CompanyIcon company={title} className="h-12 w-12 text-base rounded-full" />
          {/* {chat.online && (
            <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-success rounded-full border-2 border-background" />
          )} */}
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
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.mine ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] sm:max-w-[70%] px-4 py-2.5 rounded-2xl text-[15px] shadow-sm ${
                msg.mine
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-muted/50 text-foreground rounded-bl-none border border-border/30'
              }`}
            >
              <p className="leading-relaxed">{msg.text}</p>
              <div
                className={`flex items-center justify-end gap-1 mt-1 ${msg.mine ? 'text-primary-foreground/70' : 'text-muted-foreground/60'}`}
              >
                <span className="text-[12px]">{msg.time}</span>
                {msg.mine && (
                  <span className="text-[12px] font-medium leading-none">
                    {statusIcon(msg.status)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-background pb-[calc(env(safe-area-inset-bottom)+1rem)]">
        <div className="flex gap-2 items-center ">
          <Input
            placeholder="Написать сообщение..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="px-5 bg-transparent border-none rounded-xl flex-1 h-12 bg-muted  outline-none "
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
