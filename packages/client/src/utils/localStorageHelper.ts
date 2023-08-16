export const getFromLocalStorage = (name: string) => {
  const valueFromLocalStorage = localStorage.getItem(name)
  if (valueFromLocalStorage) {
    return JSON.parse(valueFromLocalStorage)
  }
  return null
}

export const setToStorage = (name: string, value: string) => {
  localStorage.setItem(name, value)
}
