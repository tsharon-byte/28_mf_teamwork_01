import { IChecks } from './types'

export default class ValidationRule {
  error = 'Validation error'
  checks: IChecks = []

  validate<T = string>(value: T): boolean {
    return (
      !value ||
      this.checks.every(check =>
        check.logicalNot
          ? !check.regexp.test(String(value))
          : check.regexp.test(String(value))
      )
    )
  }
}
