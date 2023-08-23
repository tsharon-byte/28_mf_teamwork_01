import fs from 'fs'
import path from 'path'
import express from 'express'
import process from 'process'
import type { ViteDevServer } from 'vite'
import { createServer as createViteServer } from 'vite'
import cors from 'cors'
import { CLIENT_DIR, DIST_DIR, DIST_SSR_DIR, SERVER_DIR } from './assets/dir'

export const createServer = async () => {
  const app = express()
  app.use(cors())

  const port = Number(process.env.SERVER_PORT) || 3001

  let vite: ViteDevServer

  if (process.env.NODE_ENV === 'development') {
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
      if (process.env.NODE_ENV === 'development') {
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
        render = (await import(path.resolve(DIST_SSR_DIR, 'entry.server.cjs')))
          .render
      }

      const appHTML = render(url)

      if (template) {
        const html = template.replace('<!--ssr-outlet-->', appHTML)

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
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
