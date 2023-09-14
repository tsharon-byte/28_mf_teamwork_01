import type { Request, Response, NextFunction } from 'express'
import axios, { isAxiosError } from 'axios'

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { cookie } = req.headers
    const { AUTH_URL } = process.env
    if (cookie && AUTH_URL) {
        try {
            const response = await axios.get(AUTH_URL, {
                headers: {
                    Cookie: cookie
                }
            })
            if (response.status === 200) {
                req.user = response.data
                return next()
            }
            return res.status(response.status).json(response.data)
        } catch(err) {
            if (isAxiosError(err) && err.response?.status) {
                return res.status(err.response?.status).json(err.response?.data)
            }
            return res.status(500).json({ reason: (err as Error).message })
        }
    } else {
        return res.status(403).json({ reason: 'Cookie is not valid' })
    }
}

export default authMiddleware
