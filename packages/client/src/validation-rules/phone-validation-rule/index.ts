import ValidationRule from '../validation-rule'

class PhoneValidationRule extends ValidationRule {
  error =
    'Должно быть от 10 до 15 символов, состоит из цифр, может начинается с плюса.'

  validate<T = unknown>(value: T): boolean {
    return !value || /^\+?\d{10,15}$/.test(String(value))
  }
}

export default new PhoneValidationRule()
