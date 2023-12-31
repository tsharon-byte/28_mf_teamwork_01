import { ValidationRule } from '../../../validation-rules'

export type EditTextFieldType = {
  value: string | undefined
  callback?: (value: string) => void
  mainColor?: string
  hoverColor?: string
  position?: 'end' | 'start'
  name: string
  label?: string
  validationRules?: ValidationRule[]
}
