export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  const months = [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ]

  const day = date.getDate()
  const month = months[date.getMonth()]

  return `${day} ${month}` // "10 март"
}
