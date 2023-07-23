import type { TValidationErrors } from './types'
import type { ValidationRule } from '../../validation-rules'

export default class Validator {
  protected _isValid: boolean | undefined = undefined
  protected _errors: TValidationErrors = {}
  protected readonly _rules: Record<string, ValidationRule>

  constructor(rules: Record<string, ValidationRule>) {
    this._rules = { ...rules }
  }

  public get isValid(): boolean | undefined {
    return this._isValid
  }

  public get errors(): TValidationErrors {
    return JSON.parse(JSON.stringify(this._errors))
  }

  public validate<T extends Record<string, unknown>>(data: T): void {
    this._isValid = true
    this._errors = {}
    Object.entries(this._rules).forEach(([name, rule]) => {
      this._validateField(name, data[name], rule)
    })
  }

  protected _validateField<TFieldValue = unknown>(
    name: string,
    value: TFieldValue,
    rule: ValidationRule
  ): void {
    if (!rule.validate<TFieldValue>(value)) {
      this._isValid = false
      this._setError(name, rule.error)
    }
  }

  protected _setError(fieldName: string, error: string): void {
    if (!this._errors[fieldName]) {
      this._errors[fieldName] = []
    }
    this._errors[fieldName].push(error)
  }
}
