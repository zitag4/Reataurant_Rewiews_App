self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('restaurant-review-cache').then( (cache) => {
      return cache.addAll([
        'index.html',
        'restaurant.html',
        'css/styles.css',
        'data/restaurants.json',
        'js/main.js',
        'js/dbhelper.js',
        'js/restaurant_info.js'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then( (response) => {
      if (response) return response;
      return fetch(event.request);
    })
  );
});
