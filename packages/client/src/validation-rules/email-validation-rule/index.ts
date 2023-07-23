import ValidationRule from '../validation-rule'

class EmailValidationRule extends ValidationRule {
  error =
    'Должна быть латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.'
  checks = [
    {
      regexp: /^[a-z0-9-_.]+@[a-z]+\.[a-z]+$/i,
      logicalNot: false,
    },
  ]
}

export default new EmailValidationRule()
