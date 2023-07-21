import Validator from '../validator'
import { passwordValidationRule } from '../../validation-rules'

class ChangePasswordValidator extends Validator {
  constructor() {
    super({
      oldPassword: passwordValidationRule,
      newPassword: passwordValidationRule,
    })
  }
}

export default new ChangePasswordValidator()
