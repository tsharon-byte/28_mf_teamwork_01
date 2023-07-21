export default class ValidationRule {
  error = 'Validation error'

  validate<T = unknown>(value: T): boolean {
    throw new Error('Not implemented')
  }
}
