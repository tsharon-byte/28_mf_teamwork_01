import passwordValidationRule from '.'

describe('test password validation rule', () => {
  it('should return false if less than eight characters entered', () => {
    const value = 'xxxxxxx'

    const actual = passwordValidationRule.validate(value)

    expect(actual).toBeFalsy()
  })

  it('should return false if more than fourty characters are entered', () => {
    const value = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

    const actual = passwordValidationRule.validate(value)

    expect(actual).toBeFalsy()
  })

  it('should return false if input text does not contain at least one digit', () => {
    const value = 'Xxxxxxxx'

    const actual = passwordValidationRule.validate(value)

    expect(actual).toBeFalsy()
  })

  it('should return false if input text does not contain at least one capital letter', () => {
    const value = '8xxxxxxx'

    const actual = passwordValidationRule.validate(value)

    expect(actual).toBeFalsy()
  })

  it('should return true if input text is valid', () => {
    const value = 'X8xxxxxx'

    const actual = passwordValidationRule.validate(value)

    expect(actual).toBeTruthy()
  })
})
