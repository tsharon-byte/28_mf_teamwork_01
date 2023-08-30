import { ISWEvents } from './src/types'

const cacheName = '::bomberman'
const version = 'v0.0.3'
const timeout = 1000

const URLS = ['/index.html']

declare const self: ServiceWorkerGlobalScope

const addCaches = async () => {
  try {
    const cache: Cache = await caches.open(`${version}${cacheName}`)

    return cache.addAll(URLS)
  } catch (error) {
    console.error(error instanceof Error ? error.message : error)
  }
}

self.addEventListener('install', event => {
  event.waitUntil(addCaches)
})

const checkCaches = async () => {
  try {
    const cacheNames = await caches.keys()

    return await Promise.all(
      cacheNames
        .filter(name => name !== `${version}${cacheName}`)
        .map(name => caches.delete(name))
    )
  } catch (error) {
    console.error(error instanceof Error ? error.message : error)
  }
}

self.addEventListener('activate', event => {
  event.waitUntil(checkCaches)
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
