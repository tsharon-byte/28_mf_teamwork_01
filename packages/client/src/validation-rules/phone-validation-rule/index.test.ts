import phoneValidationRule from '.'

describe('test phone validation rule', () => {
  it('should return false if less than ten characters entered', () => {
    const value = 'xxxxxxxxx'

    const actual = phoneValidationRule.validate(value)

    expect(actual).toBeFalsy()
  })

  it('should return false if more than fifteen characters are entered', () => {
    const value = 'xxxxxxxxxxxxxxxx'

    const actual = phoneValidationRule.validate(value)

    expect(actual).toBeFalsy()
  })

  it('should return false if input text contains letters', () => {
    const value = '123456789x'

    const actual = phoneValidationRule.validate(value)

    expect(actual).toBeFalsy()
  })

  it('should return false if input text contains special symbols', () => {
    const value = '123456789&'

    const actual = phoneValidationRule.validate(value)

    expect(actual).toBeFalsy()
  })

  it('should return false if input text contains spaces', () => {
    const value = '123456789 0'

    const actual = phoneValidationRule.validate(value)

    expect(actual).toBeFalsy()
  })

  it('should return true if input text is valid', () => {
    const value = '+1234567890'

    const actual = phoneValidationRule.validate(value)

    expect(actual).toBeTruthy()
  })

  it('should return true if input text is valid', () => {
    const value = '1234567890'

    const actual = phoneValidationRule.validate(value)

    expect(actual).toBeTruthy()
  })
})
