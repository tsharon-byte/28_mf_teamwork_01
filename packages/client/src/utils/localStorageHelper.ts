export const getFromLocalStorage = (name: string) => {
  const valueFromLocalStorage = localStorage.getItem(name)
  if (valueFromLocalStorage) {
    return JSON.parse(valueFromLocalStorage)
  }
  return null
}

export const setToLocalStorage = (name: string, value: any) => {
  localStorage.setItem(name, JSON.stringify(value))
}

export const deleteFromLocalStorage = (name: string) => {
  localStorage.removeItem(name)
}
