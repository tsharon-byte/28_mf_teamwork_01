import type { Request, Response } from 'express'
import { HTTP_400_BAD_REQUEST } from '../../../../../constants/status'

const catchError = (_: unknown, __: string, descriptor: PropertyDescriptor) => {
  const fn = descriptor.value
  descriptor.value = async function (req: Request, res: Response) {
    try {
      await fn.call(this, req, res)
    } catch (err) {
      res.status(HTTP_400_BAD_REQUEST).json({
        reason: err instanceof Error ? err.message : String(err),
      })
    }
  }
}

export default catchError
