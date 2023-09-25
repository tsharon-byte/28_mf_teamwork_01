import fs from 'fs'
import path from 'path'
import express, { json } from 'express'
import process from 'process'
import type { ViteDevServer } from 'vite'
import { createServer as createViteServer } from 'vite'
import { CLIENT_DIR, DIST_DIR, DIST_SSR_DIR, SERVER_DIR } from './assets/dir'
import { ENVS } from './assets/env'
import { topicRouter, commentRouter } from './api/v1/routers'
import { authMiddleware } from './middlewares'
import useSwagger from './api/v1/swagger'
import dbConnect from './db'
import emojiRoute from './routes/emojiRoute'
import { createProxyMiddleware } from 'http-proxy-middleware'
import cors from 'cors'

export const createServer = async () => {
  const app = express()

  const corsOptions = {
    origin: true,
    credentials: true,
  }

  app.use(cors(corsOptions))

  try {
    await dbConnect()
  } catch (e) {
    console.log('Ошибка подключения к БД', e)
  }

  useSwagger(app)

  const port = Number(process.env.SERVER_PORT) || 3001

  let vite: ViteDevServer

  if (ENVS.__DEV__) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: CLIENT_DIR,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  } else {
    app.use('/assets', express.static(path.resolve(DIST_DIR, 'assets')))
    app.use('/img', express.static(path.resolve(DIST_DIR, 'img')))
    app.use('/audio', express.static(path.resolve(DIST_DIR, 'audio')))
    app.use(
      '/service-worker.js',
      express.static(path.resolve(DIST_DIR, 'service-worker.js'))
    )
  }

  app.use('/api', authMiddleware)

  app.use(
    '/api/v2',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      target: 'https://ya-praktikum.tech',
    })
  )

  app.use(json())
  app.use('/api/v1/topics', topicRouter)
  app.use('/api/v1/comments', commentRouter)
  app.use('/api/v1/emoji', emojiRoute)

  app.get('/api/*', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    let template, render

    try {
      if (ENVS.__DEV__) {
        template = fs.readFileSync(
          path.resolve(CLIENT_DIR, 'index.html'),
          'utf-8'
        )
        template = await vite.transformIndexHtml(url, template)

        render = (
          await vite.ssrLoadModule(
            path.resolve(SERVER_DIR, 'ssr/entry.server.tsx')
          )
        ).render
      } else {
        template = fs.readFileSync(
          path.resolve(DIST_DIR, 'index.html'),
          'utf-8'
        )
        render = (await import(path.resolve(DIST_SSR_DIR, 'entry.server.cjs')))
          .render
      }

      const { appHTML, preloadedState } = await render(url)
      if (template) {
        const html = template
          .replace('<!--ssr-outlet-->', appHTML)
          .replace(
            '<!--preloaded-state-->',
            `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
              preloadedState
            ).replace(/</g, '\\u003c')}</script>`
          )

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      }
    } catch (error) {
      if (ENVS.__DEV__) {
        vite.ssrFixStacktrace(error as Error)
      }
      next(error)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })

  return app
}
