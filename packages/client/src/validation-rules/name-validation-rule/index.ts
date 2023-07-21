import ValidationRule from '../validation-rule'

class NameValidationRule extends ValidationRule {
  error =
    'Допустима только латиница или кирилица. Первая буква должна быть заглавной. Без пробелов и без цифр, нет спецсимволов (допустим только дефис).'

  validate<T = unknown>(value: T): boolean {
    return !value || /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/.test(String(value))
  }
}

export default new NameValidationRule()
