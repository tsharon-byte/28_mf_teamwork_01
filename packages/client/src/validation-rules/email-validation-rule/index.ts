import ValidationRule from '../validation-rule'

class EmailValidationRule extends ValidationRule {
  error =
    'Должна быть латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.'

  validate<T = unknown>(value: T): boolean {
    return !value || /^[a-z0-9-_.]+@[a-z]+\.[a-z]+$/i.test(String(value))
  }
}

export default new EmailValidationRule()
