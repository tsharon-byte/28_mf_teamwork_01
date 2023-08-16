import { getCountDaysAgo } from './get-count-days-ago'

describe('getCountDaysAgo', () => {
  // Tests that the function returns 'Сегодня' when the messageDate is today
  it('should return "Сегодня" when the messageDate is today', () => {
    const today = new Date().toISOString().split('T')[0]
    expect(getCountDaysAgo(today)).toBe('Сегодня')
  })

  // Tests that the function returns 'Вчера' when the messageDate is yesterday
  it('should return "Вчера" when the messageDate is yesterday', () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const messageDate = yesterday.toISOString().split('T')[0]
    expect(getCountDaysAgo(messageDate)).toBe('Вчера')
  })

  // Tests that the function returns 'X дней назад' when the delta is between 2 and 4
  it('should return "X дней назад" when the delta is between 2 and 4', () => {
    const today = new Date()
    today.setDate(today.getDate() - 3)
    const messageDate = today.toISOString().split('T')[0]
    expect(getCountDaysAgo(messageDate)).toBe('3 дня назад')
  })

  // Tests that the function returns 'X дня назад' when the delta ends in 1 and is not 11
  it('should return "X дня назад" when the delta ends in 1 and is not 11', () => {
    const today = new Date()
    today.setDate(today.getDate() - 21)
    const messageDate = today.toISOString().split('T')[0]
    expect(getCountDaysAgo(messageDate)).toBe('21 день назад')
  })

  // Tests that the function returns 'X дней назад' when the delta ends in 2-4 and is not 12-14
  it('should return "X дней назад" when the delta ends in 2-4 and is not 12-14', () => {
    const today = new Date()
    today.setDate(today.getDate() - 23)
    const messageDate = today.toISOString().split('T')[0]
    expect(getCountDaysAgo(messageDate)).toBe('23 дня назад')
  })

  // Tests that the function returns 'X месяцев назад' when the delta is between 5 and 12 months
  it('should return "X месяцев назад" when the delta is between 5 and 12 months', () => {
    const today = new Date()
    today.setMonth(today.getMonth() - 8)
    const messageDate = today.toISOString().split('T')[0]
    expect(getCountDaysAgo(messageDate)).toBe('8 месяцев назад')
  })

  // Tests that the function returns 'X месяца назад' when the delta is between 2 and 4 months
  it('should return "X месяца назад" when the delta is between 2 and 4 months', () => {
    const today = new Date()
    today.setMonth(today.getMonth() - 3)
    const messageDate = today.toISOString().split('T')[0]
    expect(getCountDaysAgo(messageDate)).toBe('3 месяца назад')
  })

  // Tests that the function returns 'Месяц назад' when the delta is 1 month
  it('should return "Месяц назад" when the delta is 1 month', () => {
    const today = new Date()
    today.setMonth(today.getMonth() - 1)
    const messageDate = today.toISOString().split('T')[0]
    expect(getCountDaysAgo(messageDate)).toBe('Месяц назад')
  })

  // Tests that the function returns 'X лет назад' when the delta is greater than or equal to 5 years
  it('should return "X лет назад" when the delta is greater than or equal to 5 years', () => {
    const today = new Date()
    today.setFullYear(today.getFullYear() - 7)
    const messageDate = today.toISOString().split('T')[0]
    expect(getCountDaysAgo(messageDate)).toBe('7 лет назад')
  })

  // Tests that the function returns 'X года назад' when the delta is between 2 and 4 years
  it('should return "X года назад" when the delta is between 2 and 4 years', () => {
    const today = new Date()
    today.setFullYear(today.getFullYear() - 3)
    const messageDate = today.toISOString().split('T')[0]
    expect(getCountDaysAgo(messageDate)).toBe('3 года назад')
  })

  // Tests that the function returns 'Год назад' when the delta is 1 year
  it('should return "Год назад" when the delta is 1 year', () => {
    const today = new Date()
    today.setFullYear(today.getFullYear() - 1)
    const messageDate = today.toISOString().split('T')[0]
    expect(getCountDaysAgo(messageDate)).toBe('Год назад')
  })

  // Tests that the function returns an empty string when the delta is negative
  it('should return an empty string when the delta is negative', () => {
    const today = new Date()
    today.setDate(today.getDate() + 1)
    const messageDate = today.toISOString().split('T')[0]
    expect(getCountDaysAgo(messageDate)).toBe('')
  })
})
