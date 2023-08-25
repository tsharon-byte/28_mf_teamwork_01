import IReasonError from './types'

const isReasonError = (value: unknown): value is IReasonError =>
  typeof value === 'object' &&
  value !== null &&
  typeof Object.entries(value).find(
    ([key, val]) => key === 'reason' && typeof val === 'string'
  ) !== 'undefined'

export default isReasonError
