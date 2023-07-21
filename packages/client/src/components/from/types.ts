import type { FormHTMLAttributes } from 'react'
import type { Validator } from '../../validators'

interface IFormProps extends FormHTMLAttributes<HTMLFormElement> {
  validator?: Validator
}

export default IFormProps
