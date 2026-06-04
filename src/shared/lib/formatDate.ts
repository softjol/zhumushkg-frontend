export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffMs / 1000 / 60)
  const diffHours = Math.floor(diffMinutes / 60)

  if (diffMinutes < 60) {
    const min = Math.max(diffMinutes, 1)
    const lastTwo = min % 100
    const last = min % 10
    let label: string
    if (lastTwo >= 11 && lastTwo <= 19) {
      label = 'минут'
    } else if (last === 1) {
      label = 'минуту'
    } else if (last >= 2 && last <= 4) {
      label = 'минуты'
    } else {
      label = 'минут'
    }
    return `${min} ${label} назад`
  }

  if (diffHours < 24) {
    const hrs = diffHours
    const lastTwo = hrs % 100
    const last = hrs % 10
    let label: string
    if (lastTwo >= 11 && lastTwo <= 19) {
      label = 'часов'
    } else if (last === 1) {
      label = 'час'
    } else if (last >= 2 && last <= 4) {
      label = 'часа'
    } else {
      label = 'часов'
    }
    return `${hrs} ${label} назад`
  }

  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterdayStart = new Date(todayStart.getTime() - 86400000)
  const dateStart = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  if (dateStart.getTime() === yesterdayStart.getTime()) {
    return 'вчера'
  }

  const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']

  return `${date.getDate()} ${months[date.getMonth()]}`
}
