import ValidationRule from '../validation-rule'

class LoginValidationRule extends ValidationRule {
  error =
    'Должно быть от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).'
  checks = [
    {
      regexp: /^[a-zA-Z0-9-_]{3,20}$/,
      logicalNot: false,
    },
    {
      regexp: /^\d+$/,
      logicalNot: true,
    },
  ]
}

export default new LoginValidationRule()
