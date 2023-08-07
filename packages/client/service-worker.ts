import { ISWEvents } from './src/types'

const cacheName = '::bomberman'
const version = 'v0.0.3'
const timeout = 400

const URLS = ['/index.html']

const addCaches = async () => {
  try {
    const cache: Cache = await caches.open(`${version}${cacheName}`)

    return cache.addAll(URLS)
  } catch (error) {
    console.error(error.message)
  }
}

self.addEventListener('install', (event: ISWEvents) => {
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
    console.error(error.message)
  }
}

self.addEventListener('activate', (event: ISWEvents) => {
  event.waitUntil(checkCaches)
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