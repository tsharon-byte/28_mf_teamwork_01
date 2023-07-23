import ValidationRule from '../validation-rule'

class NameValidationRule extends ValidationRule {
  error =
    'Допустима только латиница или кирилица. Первая буква должна быть заглавной. Без пробелов и без цифр, нет спецсимволов (допустим только дефис).'
  checks = [
    {
      regexp: /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/,
      logicalNot: false,
    },
  ]
}

export default new NameValidationRule()
