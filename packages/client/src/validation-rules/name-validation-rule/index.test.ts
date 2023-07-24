import nameValidationRule from '.'

describe('test name validation rule', () => {
  it('should return false if the first letter is not capitalized', () => {
    const value = 'xx'

    const actual = nameValidationRule.validate(value)

    expect(actual).toBeFalsy()
  })

  it('should return false if input text contains spaces', () => {
    const value = 'Xxx xx'

    const actual = nameValidationRule.validate(value)

    expect(actual).toBeFalsy()
  })

  it('should return false if input text contains digits', () => {
    const value = 'Xxx8xx'

    const actual = nameValidationRule.validate(value)

    expect(actual).toBeFalsy()
  })

  it('should return false if input text contains special symbols', () => {
    const value = 'Xxx&xx'

    const actual = nameValidationRule.validate(value)

    expect(actual).toBeFalsy()
  })

  it('should return true if input text is valid', () => {
    const value = 'X'

    const actual = nameValidationRule.validate(value)

    expect(actual).toBeTruthy()
  })

  it('should return true if input text is valid', () => {
    const value = 'X-'

    const actual = nameValidationRule.validate(value)

    expect(actual).toBeTruthy()
  })

  it('should return true if input text is valid', () => {
    const value = 'Я'

    const actual = nameValidationRule.validate(value)

    expect(actual).toBeTruthy()
  })

  it('should return true if input text is valid', () => {
    const value = 'Я-'

    const actual = nameValidationRule.validate(value)

    expect(actual).toBeTruthy()
  })
})
