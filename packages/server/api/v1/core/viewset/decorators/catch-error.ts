import type { Request, Response } from 'express'

const catchError = (_: unknown, __: string, descriptor: PropertyDescriptor) => {
  const fn = descriptor.value
  descriptor.value = async function (req: Request, res: Response) {
    try {
      await fn.call(this, req, res)
    } catch (err) {
      res.status(400).json({
        reason: err instanceof Error ? err.message : String(err),
      })
    }
  }
}

export default catchError
