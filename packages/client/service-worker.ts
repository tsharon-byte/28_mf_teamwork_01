import { ISWEvents } from './src/types'

const cacheName = '::bomberman'
const version = 'v0.0.3'
const timeout = 1000

const URLS = ['/index.html']

declare const self: ServiceWorkerGlobalScope

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(
      `${version}${cacheName}`
    ).then(
      cache => cache.addAll(URLS)
    ).catch(
      error => console.error(
        error instanceof Error
          ? error.message
          : error
      )
    )
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(
      cacheNames => cacheNames
        .filter(name => name !== `${version}${cacheName}`)
        .map(name => caches.delete(name))
    ).catch(
      error => console.error(
        error instanceof Error
          ? error.message
          : error
      )
    )
  )
})

const getFromNetwork = (
  request: Request,
  timeout: number
): Promise<Response> => {
  return new Promise<Response>((resolve, reject) => {
    const timeoutId = setTimeout(reject, timeout)

    fetch(request, { cache: 'no-store' }).then(res => {
      clearTimeout(timeoutId)

      const responseClone = res.clone()

      caches
        .open(`${version}${cacheName}`)
        .then(cache => cache.put(request, responseClone))

      resolve(res)
    }, reject)
  })
}

const getFromCache = async (request: Request): Promise<Response> => {
  const cache = await caches.open(`${version}${cacheName}`)
  const result = await cache.match(request)

  return result || Promise.reject('no-match')
}

self.addEventListener('fetch', event => {
  event.respondWith(
    getFromNetwork(event.request, timeout).catch(() =>
      getFromCache(event.request)
    )
  )
})
