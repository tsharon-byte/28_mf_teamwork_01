import ValidationRule from '../../validation-rules/validation-rule'
import Validator from '.'
import { TValidationErrors } from './types'

jest.mock('../../validation-rules')

describe('test Validator class', () => {
  it('should isValid to be undefined when initialized', () => {
    const MockedValidator = class extends Validator {
      constructor() {
        super({})
      }

      get isValid() {
        return this._isValid
      }
    }
    const validator = new MockedValidator()
    expect(validator.isValid).toBe(undefined)
  })

  it('should errors to be empty object when initialized', () => {
    const MockedValidator = class extends Validator {
      constructor() {
        super({})
      }

      get getErrors() {
        return this._errors
      }
    }
    const validator = new MockedValidator()
    const expected = '{}'
    const actual = JSON.stringify(validator.getErrors)
    expect(actual).toBe(expected)
  })

  it('should rules to be equal passed object when initialized', () => {
    const MockedValidationRule = class extends ValidationRule {
      error = 'some error'
    }
    const rules = {
      someFieldName: new MockedValidationRule(),
    }
    const MockedValidator = class extends Validator {
      get rules() {
        return this._rules
      }
    }
    const validator = new MockedValidator(rules)
    const expected = '{"someFieldName":{"error":"some error","checks":[]}}'
    const actual = JSON.stringify(validator.rules)
    expect(actual).toBe(expected)
  })

  it('should isValid getter returns correct value', () => {
    const MockedValidator = class extends Validator {
      protected _isValid: boolean | undefined = true

      constructor() {
        super({})
      }
    }
    const validator = new MockedValidator()
    const expected = true
    const actual = validator.isValid
    expect(actual).toBe(expected)
  })

  it('should errors getter returns correct value', () => {
    const MockedValidator = class extends Validator {
      protected _errors: TValidationErrors = { 'some-field': ['some-error'] }

      constructor() {
        super({})
      }
    }
    const validator = new MockedValidator()
    const expected = '{"some-field":["some-error"]}'
    const actual = JSON.stringify(validator.errors)
    expect(actual).toBe(expected)
  })

  describe('test validate method', () => {
    it('should set isValid field to true', () => {
      const MockedValidator = class extends Validator {
        protected _isValid: boolean | undefined = undefined

        constructor() {
          super({})
        }

        get isValid() {
          return this._isValid
        }
      }

      const validator = new MockedValidator()
      const data = {}

      validator.validate(data)

      expect(validator.isValid).toBe(true)
    })

    it('should set errors to empty object', () => {
      const MockedValidator = class extends Validator {
        protected _errors: TValidationErrors = {
          someField: ['some-error'],
        }

        constructor() {
          super({})
        }

        get errors() {
          return this._errors
        }
      }

      const validator = new MockedValidator()
      const data = {}

      validator.validate(data)
      const expected = '{}'
      const actual = JSON.stringify(validator.errors)

      expect(actual).toBe(expected)
    })

    it('should call _validateField method with params', () => {
      const MockedValidationRule = class extends ValidationRule {
        error = 'some error'
      }
      const mockedValidateFieldMethod = jest.fn()
      const fieldName = 'someField'
      const rule = new MockedValidationRule()
      const MockedValidator = class extends Validator {
        protected _rules: Record<string, ValidationRule> = {
          [fieldName]: rule,
        }

        constructor() {
          super({})
        }

        protected _validateField = mockedValidateFieldMethod
      }
      const validator = new MockedValidator()
      const fieldValue = 'some-value'
      const data = {
        [fieldName]: fieldValue,
      }
      validator.validate(data)
      expect(mockedValidateFieldMethod).toHaveBeenCalledWith(
        fieldName,
        fieldValue,
        rule
      )
    })
  })

  describe('test _validateField method', () => {
    it('should call rule validate method with value', () => {
      const mockedValidateMethod = jest.fn()
      const MockedValidationRule = class extends ValidationRule {
        error = 'some error'

        validate = mockedValidateMethod
      }
      const fieldName = 'someField'
      const rule = new MockedValidationRule()
      const MockedValidator = class extends Validator {
        protected _rules: Record<string, ValidationRule> = {
          [fieldName]: rule,
        }

        constructor() {
          super({})
        }

        validateField<TFieldValue = unknown>(
          name: string,
          value: TFieldValue,
          rule: ValidationRule
        ): void {
          return this._validateField(name, value, rule)
        }
      }
      const validator = new MockedValidator()
      const fieldValue = 'some-value'
      validator.validateField(fieldName, fieldValue, rule)
      expect(mockedValidateMethod).toHaveBeenCalledWith(fieldValue)
    })

    it('should set isValid to false when rule validate method returns false', () => {
      const mockedValidateMethod = jest.fn(() => false)
      const MockedValidationRule = class extends ValidationRule {
        validate = mockedValidateMethod
      }
      const fieldName = 'someField'
      const rule = new MockedValidationRule()
      const MockedValidator = class extends Validator {
        protected _rules: Record<string, ValidationRule> = {
          [fieldName]: rule,
        }
        protected _isValid: boolean | undefined = undefined

        constructor() {
          super({})
        }

        get isValid() {
          return this._isValid
        }

        validateField<TFieldValue = unknown>(
          name: string,
          value: TFieldValue,
          rule: ValidationRule
        ): void {
          return this._validateField(name, value, rule)
        }
      }
      const validator = new MockedValidator()
      const fieldValue = 'some-value'
      validator.validateField(fieldName, fieldValue, rule)
      expect(validator.isValid).toBe(false)
    })

    it('should call _setError method when rule validate method returns false', () => {
      const mockedValidateMethod = jest.fn(() => false)
      const errorText = 'some-error'
      const MockedValidationRule = class extends ValidationRule {
        error = errorText

        validate = mockedValidateMethod
      }
      const fieldName = 'someField'
      const rule = new MockedValidationRule()
      const mockedSetErrorMethod = jest.fn()
      const MockedValidator = class extends Validator {
        protected _rules: Record<string, ValidationRule> = {
          [fieldName]: rule,
        }

        constructor() {
          super({})
        }

        validateField<TFieldValue = unknown>(
          name: string,
          value: TFieldValue,
          rule: ValidationRule
        ): void {
          return this._validateField(name, value, rule)
        }

        protected _setError = mockedSetErrorMethod
      }
      const validator = new MockedValidator()
      const fieldValue = 'some-value'
      validator.validateField(fieldName, fieldValue, rule)
      expect(mockedSetErrorMethod).toHaveBeenCalledWith(fieldName, errorText)
    })

    it('should not change isValid when validate method returns true', () => {
      const mockedValidateMethod = jest.fn(() => true)
      const MockedValidationRule = class extends ValidationRule {
        validate = mockedValidateMethod
      }
      const fieldName = 'someField'
      const rule = new MockedValidationRule()
      const MockedValidator = class extends Validator {
        protected _rules: Record<string, ValidationRule> = {
          [fieldName]: rule,
        }
        protected _isValid: boolean | undefined = undefined

        constructor() {
          super({})
        }

        get isValid() {
          return this._isValid
        }

        validateField<TFieldValue = unknown>(
          name: string,
          value: TFieldValue,
          rule: ValidationRule
        ): void {
          return this._validateField(name, value, rule)
        }
      }
      const validator = new MockedValidator()
      const fieldValue = 'some-value'
      validator.validateField(fieldName, fieldValue, rule)
      expect(validator.isValid).toBe(undefined)
    })

    it('should not call _setError method when rule validate method returns true', () => {
      const mockedValidateMethod = jest.fn(() => true)
      const MockedValidationRule = class extends ValidationRule {
        validate = mockedValidateMethod
      }
      const fieldName = 'someField'
      const rule = new MockedValidationRule()
      const mockedSetErrorMethod = jest.fn()
      const MockedValidator = class extends Validator {
        protected _rules: Record<string, ValidationRule> = {
          [fieldName]: rule,
        }

        constructor() {
          super({})
        }

        validateField<TFieldValue = unknown>(
          name: string,
          value: TFieldValue,
          rule: ValidationRule
        ): void {
          return this._validateField(name, value, rule)
        }

        protected _setError = mockedSetErrorMethod
      }
      const validator = new MockedValidator()
      const fieldValue = 'some-value'
      validator.validateField(fieldName, fieldValue, rule)
      expect(mockedSetErrorMethod).toBeCalledTimes(0)
    })
  })

  describe('test _setError method', () => {
    it('should add fielName and array with errorText to _errors property if it does not already exist there', () => {
      const fieldName = 'someField'
      const MockedValidator = class extends Validator {
        protected _errors: TValidationErrors = {}

        constructor() {
          super({})
        }

        get errors() {
          return this._errors
        }

        setError(fieldName: string, error: string): void {
          return this._setError(fieldName, error)
        }
      }
      const validator = new MockedValidator()
      const errorText = 'some-error'
      validator.setError(fieldName, errorText)

      const expected = JSON.stringify({ [fieldName]: [errorText] })
      const actual = JSON.stringify(validator.errors)

      expect(actual).toBe(expected)
    })

    it('should add new field with error and not remove other errors in the _errors property', () => {
      const fieldName = 'someField'
      const otherFieldName = 'someOtherField'
      const fieldError = 'some-error'
      const MockedValidator = class extends Validator {
        protected _errors: TValidationErrors = {
          [fieldName]: [fieldError],
        }

        constructor() {
          super({})
        }

        get errors() {
          return this._errors
        }

        setError(fieldName: string, error: string): void {
          return this._setError(fieldName, error)
        }
      }
      const validator = new MockedValidator()
      const otherFieldError = 'some-other-error'
      validator.setError(otherFieldName, otherFieldError)

      const expected = JSON.stringify({
        [fieldName]: [fieldError],
        [otherFieldName]: [otherFieldError],
      })
      const actual = JSON.stringify(validator.errors)

      expect(actual).toBe(expected)
    })

    it('should add new error for existed field in the _errors property and dont remove existed errors', () => {
      const fieldName = 'someField'
      const fieldError = 'some-error'
      const MockedValidator = class extends Validator {
        protected _errors: TValidationErrors = {
          [fieldName]: [fieldError],
        }

        constructor() {
          super({})
        }

        get errors() {
          return this._errors
        }

        setError(fieldName: string, error: string): void {
          return this._setError(fieldName, error)
        }
      }
      const validator = new MockedValidator()
      const otherFieldError = 'some-other-error'
      validator.setError(fieldName, otherFieldError)

      const expected = JSON.stringify({
        [fieldName]: [fieldError, otherFieldError],
      })
      const actual = JSON.stringify(validator.errors)

      expect(actual).toBe(expected)
    })
  })
})
