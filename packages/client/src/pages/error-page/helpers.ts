import IErrorWithStatus from './types'

const isErrorWithStatus = (value: unknown): value is IErrorWithStatus =>
  Object.prototype.hasOwnProperty.call(value, 'status')

export default isErrorWithStatus
