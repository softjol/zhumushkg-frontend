const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export interface ChatMessage {
  id: string
  conversation_id?: string
  sender_id?: string
  senderId?: string
  content: string
  created_at?: string
  createdAt?: string
}

export interface Conversation {
  id: number
  vacancy_id?: number
  candidate_id?: number
  hr_id?: number
  application_id?: number
  source?: string
  status?: string
  messages?: ChatMessage[]
  last_message_at?: string
  created_at?: string
  updated_at?: string
  unreadCount?: number
  online?: boolean
}

function authHeaders(token: string) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

export async function getConversations(token: string): Promise<Conversation[]> {
  const res = await fetch(`${BASE_URL}/conversations`, {
    headers: authHeaders(token),
  })
  if (!res.ok) throw new Error('Ошибка загрузки чатов')
  return res.json()
}

export async function getMessages(
  token: string,
  conversationId: string,
  userId: number,
): Promise<ChatMessage[]> {
  const res = await fetch(`${BASE_URL}/conversations/${conversationId}/messages?userId=${userId}`, {
    headers: authHeaders(token),
  })
  if (!res.ok) throw new Error('Ошибка загрузки сообщений')
  return res.json()
}

export async function sendMessage(
  token: string,
  conversationId: string,
  content: string,
): Promise<ChatMessage> {
  const res = await fetch(`${BASE_URL}/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ content }),
  })
  if (!res.ok) throw new Error('Ошибка отправки сообщения')
  return res.json()
}

export async function createConversation(token: string, vacancyId: string): Promise<Conversation> {
  const res = await fetch(`${BASE_URL}/conversations`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ vacancyId }),
  })
  if (!res.ok) throw new Error('Ошибка создания чата')
  return res.json()
}
