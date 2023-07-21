import loginValidationRule from '.'

describe('test login validation rule', () => {
  it('should return false if less than three characters entered', () => {
    const value = 'xx'

    const actual = loginValidationRule.validate(value)

    expect(actual).toBeFalsy()
  })

  it('should return false if more than twenty characters are entered', () => {
    const value = 'xxxxxxxxxxxxxxxxxxxxx'

    const actual = loginValidationRule.validate(value)

    expect(actual).toBeFalsy()
  })

  it('should return false if cyrillic characters are entered', () => {
    const value = 'яяя'

    const actual = loginValidationRule.validate(value)

    expect(actual).toBeFalsy()
  })

  it('should return false if only digits are entered', () => {
    const value = '888'

    const actual = loginValidationRule.validate(value)

    expect(actual).toBeFalsy()
  })

  it('should return false if input text contains spaces', () => {
    const value = 'xxx xx'

    const actual = loginValidationRule.validate(value)

    expect(actual).toBeFalsy()
  })

  it('should return false if input text contains special symbols', () => {
    const value = 'xxx@x$x'

    const actual = loginValidationRule.validate(value)

    expect(actual).toBeFalsy()
  })

  it('should return true if input text is valid', () => {
    const value = 'xxx_8xx-13'

    const actual = loginValidationRule.validate(value)

    expect(actual).toBeTruthy()
  })
})
