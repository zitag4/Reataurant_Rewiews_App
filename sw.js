//Open a new cach and add an array of requests
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('restaurant-review-cache').then((cache) =>{
      return cache.addAll([
        'index.html',
        'index.js',
        'restaurant.html',
        'css/styles.css',
        'data/restaurants.json',
        'js/main.js',
        'js/dbhelper.js',
        'js/restaurant_info.js'
      ]);
    });
  );
});
