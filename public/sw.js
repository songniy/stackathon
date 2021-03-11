//store of the browser. if we load something once, don't have to reload again
//simply take from the cache
const CACHE_NAME = 'version-1'
//offline.html is document that we want to show when we have no internet connection
const appShell = []
const urlsToCache = ['index.html', 'offline.html', 'bundle.js', 'bundle.js.map'] //add offline.html to this later. will receive error trying to cache something that does not exist

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
    //match to all requests and then fetch them again.
    //in this case it's for a weather app and thus we want to fetch
    //the data again because we need new weather data
    //if it cann't fetch, the data .catch, return page since that must mean there is
    //no internet connection
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match('offline.html'))
    })
  )
})
//activate the sw
self.addEventListener('activate', event => {
  //could have a lot of versions of our cache.
  //on activate remove all previous caches and cache the new one
  //this fires when the old service worker is gone and the new serviceworker
  //can take control
  // This is the ideal time to do stuff that you couldn't do while the old worker was still in use, such as migrating databases and clearing caches.
  const cacheWhitelist = []
  cacheWhitelist.push(CACHE_NAME)
  //this goes through and deletes all other caches except the CACHE_NAME
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName)
          }
        })
      )
    )
  )
})
