export type EditTextFieldType = {
  value: string | undefined
  callback?: (value: string) => void
  mainColor?: string
  hoverColor?: string
  position?: 'end' | 'start'
  placeholder: string
}
