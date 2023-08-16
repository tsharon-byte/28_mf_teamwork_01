export const getCountDaysAgo = (messageDate: string) => {
  const today: Date = new Date()
  const messageDateObj: Date = new Date(messageDate)
  const MILLISECONDS_PER_DAY: number = 1000 * 60 * 60 * 24
  const delta: number = Math.floor(
    (today.getTime() - messageDateObj.getTime()) / MILLISECONDS_PER_DAY
  )

  if (delta === 0) {
    return 'Сегодня'
  } else if (delta === 1) {
    return 'Вчера'
  } else if (delta > 1 && delta < 30) {
    const days = delta.toString()
    const lastDigit = parseInt(days.charAt(days.length - 1))
    let daysAgo = `${delta} дней назад`
    if (lastDigit === 1) {
      daysAgo = `${delta} день назад`
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      daysAgo = `${delta} дня назад`
    }
    return daysAgo
  } else if (delta >= 30 && delta < 365) {
    const months = Math.floor(delta / 30)
    if (months === 1) {
      return 'Месяц назад'
    } else if (months > 1 && months < 5) {
      return `${months} месяца назад`
    } else if (months >= 5 && months <= 12) {
      return `${months} месяцев назад`
    } else {
      return `${months} месяцев назад`
    }
  } else if (delta >= 365) {
    const years = Math.floor(delta / 365)
    if (years === 1) {
      return 'Год назад'
    } else if (years > 1 && years < 5) {
      return `${years} года назад`
    } else {
      return `${years} лет назад`
    }
  } else {
    return ''
  }
}
