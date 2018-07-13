let staticCacheName = 'restaurant-static-001';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll([
          '/index.html',
          // '/restaurant.html',
          '/css/styles.css',
          '/js/dbhelper.js',
          '/js/sw_register.js',
          '/js/main.js',
          '/js/restaurant_info.js',
          '/data/restaurants.json',
          '/restaurant.html?id=1',
          '/restaurant.html?id=2',
          '/restaurant.html?id=3',
          '/restaurant.html?id=4',
          '/restaurant.html?id=5',
          '/restaurant.html?id=6',
          '/restaurant.html?id=7',
          '/restaurant.html?id=8',
          '/restaurant.html?id=9',
          '/restaurant.html?id=10',
        ]).catch(error => {
          console.log('Caches open failed: ' + error);
        });
      })
  );
});
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					return cacheName.startsWith('restaurant-') &&
						   cacheName != staticCacheName;
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
})

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request)
		.then(function(response) {
			return response || fetch(event.request);
		})
	);
});