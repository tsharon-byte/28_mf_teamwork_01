import type { Request, Response, NextFunction } from 'express'
import axios, { isAxiosError } from 'axios'
import { HTTP_200_OK, HTTP_403_FORBIDDEN, HTTP_500_INTERNAL_SERVER_ERROR } from '../constants/status'

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cookie } = req.headers
  const { AUTH_URL } = process.env
  if (cookie && AUTH_URL) {
    try {
      const response = await axios.get(AUTH_URL, {
        headers: {
          Cookie: cookie,
        },
      })
      if (response.status === HTTP_200_OK) {
        req.user = response.data
        return next()
      }
      return res.status(response.status).json(response.data)
    } catch (err) {
      if (isAxiosError(err) && err.response?.status) {
        return res.status(err.response?.status).json(err.response?.data)
      }
      return res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({
        reason: (err as Error).message
      })
    }
  } else {
    return res.status(HTTP_403_FORBIDDEN).json({
      reason: 'Cookie is not valid'
    })
  }
}

export default authMiddleware
