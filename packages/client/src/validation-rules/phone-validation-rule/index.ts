import ValidationRule from '../validation-rule'

class PhoneValidationRule extends ValidationRule {
  error =
    'Должно быть от 10 до 15 символов, состоит из цифр, может начинается с плюса.'
  checks = [
    {
      regexp: /^\+?\d{10,15}$/,
      logicalNot: false,
    },
  ]
}

export default new PhoneValidationRule()
