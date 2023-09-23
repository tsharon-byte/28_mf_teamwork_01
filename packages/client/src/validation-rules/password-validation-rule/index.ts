import ValidationRule from '../validation-rule'

class PasswordValidationRule extends ValidationRule {
  error =
    'Должно быть от 8 символов, обязательно хотя бы одна заглавная буква и цифра.'
  checks = [
    {
      regexp: /^.{8,}$/,
      logicalNot: false,
    },
    {
      regexp: /[A-Z]|[А-Я]+/,
      logicalNot: false,
    },
    {
      regexp: /[0-9]+/,
      logicalNot: false,
    },
  ]
}

export default new PasswordValidationRule()
