const randomEnumValue = <T extends Record<string, string | number>>(
  EnumInstance: T
): T[keyof T] => {
  const keys = Object.keys(EnumInstance) as unknown as T[keyof T][]
  const index = Math.floor(Math.random() * keys.length)
  return keys[index]
}

export default randomEnumValue
