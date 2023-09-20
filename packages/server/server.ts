import fs from 'fs'
import path from 'path'
import express, { urlencoded, json } from 'express'
import process from 'process'
import type { ViteDevServer } from 'vite'
import { createServer as createViteServer } from 'vite'
import cors from 'cors'
import { CLIENT_DIR, DIST_DIR, DIST_SSR_DIR, SERVER_DIR } from './assets/dir'
import { ENVS } from './assets/env'
import { topicRouter, commentRouter } from './api/v1/routers'
import { authMiddleware } from './middlewares'
import useSwagger from './api/v1/swagger'
import dbConnect from './db'
import emojiRoute from './routes/emojiRoute'
import themeRoute from './routes/theme-route'

export const createServer = async () => {
  try {
    await dbConnect()
  } catch (e) {
    console.log('Ошибка подключения к БД', e)
  }

  const app = express()

  const corsOptions = {
    origin: true,
    credentials: true,
  }
  app.use(cors(corsOptions))

  app.use(json())
  app.use(urlencoded({ extended: true }))

  app.use('/api/v1/topics', authMiddleware, topicRouter)
  app.use('/api/v1/comments', authMiddleware, commentRouter)

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
  // app.get('/api/theme', express.json(), async (_, res) => {
  //   try {
  //     const theme = await ThemeModel.findAll()
  //     res.status(200).send(theme)
  //   } catch (error) {
  //     res.status(500).send({ error })
  //   }
  // })

  // app.post('/api/theme', async (req, res) => {
  //   try {
  //     const { mode } = req.body
  //     const theme = await ThemeModel.create({ mode })
  //     res.status(201).send(theme)
  //   } catch (error) {
  //     res.status(500).send({ error })
  //   }
  // })
  app.use('/api/emoji', emojiRoute)
  app.use('/api/theme', themeRoute)
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
