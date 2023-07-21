import ValidationRule from '../validation-rule'

class PasswordValidationRule extends ValidationRule {
  error =
    'Должно быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.'

  validate<T = unknown>(value: T): boolean {
    return (
      !value ||
      (/^.{8,40}$/.test(String(value)) &&
        /[A-Z]+/.test(String(value)) &&
        /[0-9]+/.test(String(value)))
    )
  }
}

export default new PasswordValidationRule()
