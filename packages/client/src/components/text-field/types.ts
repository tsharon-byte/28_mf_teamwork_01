import type { TextFieldProps, TextFieldVariants } from '@mui/material'
import type { ValidationRule } from '../../validation-rules'

type TextFieldFC = <Variant extends TextFieldVariants>(
  props: {
    /**
     * The variant to use.
     * @default 'outlined'
     */
    variant?: Variant
    validationRules?: ValidationRule[]
  } & Omit<TextFieldProps, 'variant'>
) => JSX.Element

export default TextFieldFC
