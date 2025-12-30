/// <reference lib="webworker" />
// Explicitly mark this file as a module so local declarations don't pollute the global scope.
export {}

// Ensure TypeScript treats this file as a Service Worker context instead of Window.
declare const self: ServiceWorkerGlobalScope

// T041 service worker caching logic
const CACHE = 'app-shell-v1'
const APP_SHELL: readonly string[] = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
]

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
        ),
      ),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached
      return fetch(request).then((resp) => {
        const copy = resp.clone()
        ;(async () => {
          try {
            const cache = await caches.open(CACHE)
            await cache.put(request, copy)
          } catch {
            // Swallow caching errors (e.g., opaque responses, quota exceeded)
          }
        })()
        return resp
      })
    }),
  )
})
