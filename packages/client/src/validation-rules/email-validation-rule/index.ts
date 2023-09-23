import ValidationRule from '../validation-rule'

class EmailValidationRule extends ValidationRule {
  error =
    'Должна быть латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.'
  checks = [
    {
      regexp:
        /([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+/i,
      logicalNot: false,
    },
  ]
}

export default new EmailValidationRule()
