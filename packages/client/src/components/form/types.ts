import type { FormHTMLAttributes, ForwardedRef } from 'react'
import type { Validator } from '../../validators'

interface IFormProps extends FormHTMLAttributes<HTMLFormElement> {
  validator?: Validator
  ref: ForwardedRef<HTMLFormElement>
}

export default IFormProps
