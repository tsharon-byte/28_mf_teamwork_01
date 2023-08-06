import type {
  InputAdornmentTypeMap,
  TextFieldProps,
  TextFieldVariants,
} from '@mui/material'
import type { ValidationRule } from '../../validation-rules'
import { OverridableComponent } from '@mui/material/OverridableComponent'

type TextFieldFC = <Variant extends TextFieldVariants>(
  props: {
    /**
     * The variant to use.
     * @default 'outlined'
     */
    variant?: Variant
    validationRules?: ValidationRule[]
    inputProps?: OverridableComponent<InputAdornmentTypeMap>
  } & Omit<TextFieldProps, 'variant'>
) => JSX.Element

export default TextFieldFC
