import { Notification } from '@/entities/notifications/model/type'
import { formatDate } from '@/shared/lib/formatDate'

const typeIcon: Record<string, string> = {
  invited: '🎉',
  viewed: '👁',
  rejected: '😔',
  message: '💬',
  system: '⚙️',
}

type Props = {
  notification: Notification
}
export const NotificationComponent = ({ notification }: Props) => {
  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-2xl transition-colors cursor-pointer hover:bg-muted ${notification.isRead === false ? 'bg-muted' : ''}`}
    >
      {/* <span className="text-xl flex-shrink-0 mt-0.5">{typeIcon[notification.title]}</span> */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{notification.title}</p>
        <p className="text-sm text-muted-foreground mt-0.5">{notification.body}</p>
        <p className="text-xs text-muted-foreground mt-1">{formatDate(notification.createdAt)}</p>
      </div>
      {notification.isRead == false && <div className="w-2 h-2 bg-primary rounded-full"></div>}
    </div>
  )
}
