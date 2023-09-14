import type { Request, Response, NextFunction } from 'express'

const testAuthMiddleware = (req: Request, _: Response, next: NextFunction) => {
  req.user = {
    id: 1,
    first_name: 'Test first name',
    second_name: 'Test second name',
    display_name: 'Test display name',
    login: 'Test login',
    avatar: 'Test avatar',
    email: 'Test email',
    phone: 'Test phone',
  }
  next()
}

export default testAuthMiddleware
