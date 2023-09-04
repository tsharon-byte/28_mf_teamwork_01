import { isBrowser } from './constants'

export const getFromLocalStorage = (name: string) => {
  const valueFromLocalStorage = isBrowser
    ? window.localStorage.getItem(name)
    : null
  if (valueFromLocalStorage) {
    return JSON.parse(valueFromLocalStorage)
  }
  return null
}

export const setToLocalStorage = (name: string, value: any) => {
  window.localStorage.setItem(name, JSON.stringify(value))
}

export const deleteFromLocalStorage = (name: string) => {
  window.localStorage.removeItem(name)
}
