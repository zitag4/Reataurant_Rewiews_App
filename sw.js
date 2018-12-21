self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('restaurant-review-cache').then( (cache) => {
      return cache.addAll([
        '/',
        'index.html',
        'restaurant.html',
        'css/styles.css',
        'data/restaurants.json',
        'js/main.js',
        'js/dbhelper.js',
        'js/restaurant_info.js',
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'img/10.jpg',
        'restaurant.html?id=1',
        'restaurant.html?id=2',
        'restaurant.html?id=3',
        'restaurant.html?id=4',
        'restaurant.html?id=5',
        'restaurant.html?id=6',
        'restaurant.html?id=7',
        'restaurant.html?id=8',
        'restaurant.html?id=9',
        'restaurant.html?id=10'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).then( (response) => {
      if (response.status == 404) {
        return new Response ('Page not found!');
      }
      return response;
    }).catch( () => {return new Response('Failed!')})
  )
});
/*self.addEventListener('fetch', (event) => {
  console.log("x"+event.request);
  event.respondWith(
    caches.match(event.request).then( (response) => {
      if (response) return response;
      return fetch(event.request);
    }).catch ( () => {return new Response('Failed!')})
  );
});*/

//self.addEventListener('activate', (event) ={

//});
