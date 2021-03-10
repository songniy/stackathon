//store of the browser. if we load something once, don't have to reload again
//simply take from the cache
const CACHE_NAME = 'version-1'
//offline.html is document that we want to show when we have no internet connection
const urlsToCache = ['index.html', 'offline.html'] //add offline.html to this later. will receive error trying to cache something that does not exist
const self = this
//events for 3 things
//installation of sw
//self means the sw itself.
self.addEventListener('install', event => {
  //open the cache- meaning add the urlsToCache array
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache')

      return cache.addAll(urlsToCache)
    })
  )
})

//listen for requests
self.addEventListener('fetch', event => {
  //respond with something when heard
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match('offline.html'))
    })
  )
})
//activate the sw
self.addEventListener('activate', event => {})
