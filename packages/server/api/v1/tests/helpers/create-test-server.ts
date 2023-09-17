import express, { urlencoded, json } from 'express'
import cors from 'cors'
import { topicRouter, commentRouter } from '../../routers'
import testAuthMiddleware from './test-auth-middleware'

const createTestServer = () => {
  const app = express()

  app.use(cors())
  app.use(json())
  app.use(urlencoded({ extended: true }))

  app.use('/api/v1/topics', testAuthMiddleware, topicRouter)
  app.use('/api/v1/comments', testAuthMiddleware, commentRouter)

  return app
}

export default createTestServer
