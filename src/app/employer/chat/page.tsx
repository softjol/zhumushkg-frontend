import { MessageCircle } from 'lucide-react'

export default function EmployerChatPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <MessageCircle size={32} />
      </div>
      <h3 className="text-lg font-semibold text-foreground">Выберите чат</h3>
      <p className="text-sm">Чтобы начать общение, выберите диалог из списка слева</p>
    </div>
  )
}
