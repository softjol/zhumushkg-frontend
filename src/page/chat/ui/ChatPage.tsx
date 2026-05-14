'use client'
import { MessageCircle, Search, User, ChevronLeft } from 'lucide-react'
import { useState, useEffect } from 'react'
import { ChatDetailView } from './ChatDetailView'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import CompanyIcon from '@/features/company-icon/CompanyIcon'
import { useUserStore } from '@/entities/user/model/store'
import { AuthRequired } from '@/widgets/auth-required/ui/AuthRequired'

interface ChatDialog {
  id: string
  company: string
  companyAvatar?: string
  jobTitle: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
}

export const mockChats: ChatDialog[] = [
  {
    id: '1',
    company: 'Мегаком',
    jobTitle: 'Frontend-разработчик',
    lastMessage: 'Здравствуйте! Мы рассмотрели ваше резюме...',
    time: '10:30',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    company: 'Бета Сторес',
    jobTitle: 'Продавец-консультант',
    lastMessage: 'Когда вы сможете прийти на собеседование?',
    time: 'вчера',
    unread: 0,
    online: false,
  },
  {
    id: '3',
    company: 'Oxford School',
    jobTitle: 'Учитель английского',
    lastMessage: 'Спасибо за отклик!',
    time: '2 дня назад',
    unread: 0,
    online: true,
  },
]
interface ChatPageProps {
  chatId?: string
}
export const ChatPage = ({ chatId }: ChatPageProps) => {
  const { isAuthenticated } = useUserStore()

  const router = useRouter()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const chats = mockChats
  const isEmployer = false
  const filtered = chats.filter((c) => {
    const matchesSearch = isEmployer
      ? (c as any).candidateName.toLowerCase().includes(search.toLowerCase()) ||
        (c as any).candidatePosition.toLowerCase().includes(search.toLowerCase())
      : (c as any).company.toLowerCase().includes(search.toLowerCase()) ||
        (c as any).jobTitle.toLowerCase().includes(search.toLowerCase())

    return matchesSearch
  })

  const id = chatId || null
  const showDetailOnlyOnMobile = !!id

  return (
    <div className="flex h-[calc(100vh-64px)] lg:h-screen overflow-hidden">
      {isAuthenticated ? (
        <>
          <div
            className={`w-full lg:w-1/2 border-r border-border flex flex-col bg-background ${
              showDetailOnlyOnMobile ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <div className="p-4 lg:p-6 ">
              <h1 className="text-xl font-bold text-foreground">Чаты</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-2 lg:p-3 space-y-1">
              {filtered.length > 0 ? (
                filtered.map((chat) => {
                  const chatId = chat.id
                  const title = isEmployer ? (chat as any).candidateName : (chat as any).company
                  const subtitle = isEmployer
                    ? (chat as any).candidatePosition
                    : (chat as any).jobTitle
                  const isActive = id === chatId

                  return (
                    <Link
                      key={chatId}
                      href={`/chat/${chatId}`}
                      className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${
                        isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                      }`}
                    >
                      <div className="relative flex-shrink-0">
                        <CompanyIcon company={title} className="h-12 w-12 text-base rounded-full" />
                        {chat.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-semibold text-base truncate ${isActive ? 'text-primary' : 'text-foreground'}`}
                          >
                            {subtitle}
                          </span>
                          <span className="text-xs text-muted-foreground ml-2">{chat.time}</span>
                        </div>
                        <div className="flex items-center justify-between mt-0.5">
                          <p className="text-base text-muted-foreground truncate">{title}</p>
                          {chat.unread > 0 && !isActive && (
                            <span className="w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate mt-0.5">
                          {chat.lastMessage}
                        </p>
                      </div>
                    </Link>
                  )
                })
              ) : (
                <div className="text-center py-10 opacity-50">
                  <MessageCircle size={32} className="mx-auto mb-2" />
                  <p>Нет сообщений</p>
                </div>
              )}
            </div>
          </div>

          <div
            className={`flex-1 bg-muted/10 ${!showDetailOnlyOnMobile ? 'hidden lg:block' : 'block'}`}
          >
            {id ? (
              <ChatDetailView chatId={id} onBack={() => router.push('/chat')} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <MessageCircle size={32} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Выберите чат</h3>
                <p className="text-sm">Чтобы начать общение, выберите диалог из списка слева</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="w-full ">
          <div className="p-4 lg:p-6 ">
            <h1 className="text-xl font-bold text-foreground">Чаты</h1>
          </div>
          <AuthRequired description="Войдите, чтобы видеть сообщения" />
        </div>
      )}
    </div>
  )
}
