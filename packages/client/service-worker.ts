import { ISWEvents } from './src/types'

const cacheName = '::bomberman'
const version = 'v0.0.2'
const timeout = 400

const URLS = ['/index.html', '/src/main.tsx']

self.addEventListener('install', (event: ISWEvents) => {
  event.waitUntil(
    caches
      .open(`${version}${cacheName}`)
      .then((cache: Cache) => cache.addAll(URLS))
  )
})

self.addEventListener('activate', (event: ISWEvents) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== `${version}${cacheName}`)
          .map(name => caches.delete(name))
      )
    })
  )
})

const getFromNetwork = (
  request: string,
  timeout: number
): Promise<Response> => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(reject, timeout)

    fetch(request).then(res => {
      clearTimeout(timeoutId)

      const responseClone = res.clone()

      caches
        .open(`${version}${cacheName}`)
        .then(cache => cache.put(request, responseClone))

      resolve(res)
    }, reject)
  })
}

const getFromCache = async (request: string): Promise<Response> => {
  const cache = await caches.open(`${version}${cacheName}`)
  const result = await cache.match(request)

  return result || Promise.reject('no-match')
}

self.addEventListener('fetch', (event: ISWEvents) => {
  event.respondWith(
    getFromNetwork(event.request, timeout).catch(() =>
      getFromCache(event.request)
    )
  )
})
