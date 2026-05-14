import { useState, useEffect, useRef } from 'react'
import { getMessages, sendMessage, ChatMessage } from '../api'

export function useChat(token: string | null, conversationId: string, userId: string | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const fetchMessages = async () => {
    if (!token || !conversationId || !userId) return
    try {
      const data = await getMessages(token, conversationId, Number(userId))
      setMessages(data)
      setError(null)
    } catch (e) {
      setError('Не удалось загрузить сообщения')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()

    intervalRef.current = setInterval(fetchMessages, 3000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [token, conversationId, userId])

  const send = async (content: string) => {
    if (!token || !content.trim()) return
    try {
      const newMessage = await sendMessage(token, conversationId, content)
      setMessages((prev) => [...prev, newMessage])
    } catch (e) {
      setError('Не удалось отправить сообщение')
    }
  }

  return { messages, loading, error, send }
}
