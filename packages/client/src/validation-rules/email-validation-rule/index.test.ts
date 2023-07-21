import emailValidationRule from '.'

describe('test email validation rule', () => {
  it('should return false when value has cyrillic symbols', () => {
    const value = 'Какой-то текст'

    const actual = emailValidationRule.validate(value)

    expect(actual).toBeFalsy()
  })

  it('should return false when value has not @', () => {
    const value = 'ioaksenenkogmail.com'

    const actual = emailValidationRule.validate(value)

    expect(actual).toBeFalsy()
  })

  it('should return false when value has not point after @', () => {
    const value = 'ioaksenenko@gmailcom'

    const actual = emailValidationRule.validate(value)

    expect(actual).toBeFalsy()
  })

  it('should return false when value has not letters before point after @', () => {
    const value = 'ioaksenenko@.com'

    const actual = emailValidationRule.validate(value)

    expect(actual).toBeFalsy()
  })

  it('should return true when passed valid email', () => {
    const value = 'ioaksenenko@gmail.com'

    const actual = emailValidationRule.validate(value)

    expect(actual).toBeTruthy()
  })
})
