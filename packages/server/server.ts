import fs from 'fs'
import path from 'path'
import express from 'express'
import process from 'process'
import type { ViteDevServer } from 'vite'
import { createServer as createViteServer } from 'vite'
import cors from 'cors'
import { CLIENT_DIR, DIST_DIR, DIST_SSR_DIR, SERVER_DIR } from './assets/dir'
import { ENVS } from './assets/env'

export const createServer = async () => {
  const app = express()
  app.use(cors())

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
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    let template, render

    try {
      template = fs.readFileSync(
        path.resolve(CLIENT_DIR, 'index.html'),
        'utf-8'
      )

      if (ENVS.__DEV__) {
        template = await vite.transformIndexHtml(url, template)

        render = (
          await vite.ssrLoadModule(
            path.resolve(SERVER_DIR, 'ssr/entry.server.tsx')
          )
        ).render
      } else {
        render = (await import(path.resolve(DIST_SSR_DIR, 'entry.server.cjs')))
          .render
      }

      const { appHTML, preloadedState } = render(url)

      if (template) {
        const html = template
          .replace('<!--ssr-outlet-->', appHTML)
          .replace(
            '<!--preloaded-state-->',
            `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
              preloadedState
            )}</script>`
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

  app.get('/', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}
