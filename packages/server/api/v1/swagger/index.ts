import type { Express, Request, RequestHandler, Response } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import options from './config'

const swaggerSpec = swaggerJsdoc(options)

const useSwagger = (app: Express) => {
  app.use(
    '/swagger',
    swaggerUi.serve as RequestHandler[],
    swaggerUi.setup(swaggerSpec) as RequestHandler
  )

  app.get('swagger.json', (_: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}

export default useSwagger
