import { isAxiosError } from 'axios'
import isReasonError from '../is-reason-error'
import IError from './types'

const prepareError = (error: unknown): IError => {
  if (
    isAxiosError(error) &&
    error.response &&
    isReasonError(error.response.data)
  ) {
    return {
      status: error.response.status,
      message: error.response.data.reason,
    }
  }

  if (error instanceof Error) {
    return {
      status: undefined,
      message: error.message,
    }
  }

  return {
    status: undefined,
    message: undefined,
  }
}

export default prepareError
