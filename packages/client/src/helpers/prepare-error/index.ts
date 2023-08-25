import { isAxiosError } from 'axios'
import isReasonError from '../is-reason-error'
import IError from './types'

const prepareError = (error: unknown): IError => ({
  status: isAxiosError(error) ? error.response?.status : undefined,
  message: isAxiosError(error)
    ? error.response
      ? isReasonError(error.response.data)
        ? error.response.data.reason
        : undefined
      : undefined
    : error instanceof Error
    ? error.message
    : undefined,
})

export default prepareError
