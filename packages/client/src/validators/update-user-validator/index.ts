import Validator from '../validator'
import {
  nameValidationRule,
  loginValidationRule,
  emailValidationRule,
  phoneValidationRule,
} from '../../validation-rules'

class UpdateUserValidator extends Validator {
  constructor() {
    super({
      first_name: nameValidationRule,
      second_name: nameValidationRule,
      login: loginValidationRule,
      email: emailValidationRule,
      phone: phoneValidationRule,
    })
  }
}

export default new UpdateUserValidator()
