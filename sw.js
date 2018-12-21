const staticCacheName = 'restaurant-review-cache-v2';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then( (cache) => {
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
        'img/10.jpg'
  /*
      'restaurant.html?id=1'
       'restaurant.html?id=2',
        'restaurant.html?id=3',
        'restaurant.html?id=4',
        'restaurant.html?id=5',
        'restaurant.html?id=6',
        'restaurant.html?id=7',
        'restaurant.html?id=8',
        'restaurant.html?id=9',
        'restaurant.html?id=10' */
      ]);
    })
  );
});

/*self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).then( (response) => {
      if (response.status == 404) {
        return new Response ('Page not found!');
      }
      return response;
    }).catch( () => {return new Response('Failed!')})
  )
});*/


self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then( (cacheNames) => {
      return Promise.all(
        cacheNames.filter( (cacheName) => {
          return cacheName.startsWith('restaurant-') &&
                 (cacheName != staticCacheName);
              //   console.log("itt "+cacheName);
        }).map( (cacheName) => {
        //  console.log("itt "+cacheName);
          return cache.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
   caches.open(staticCacheName).then( (cache) => {
      return cache.match(event.request).then( (response) => {
        if (response)
          return response;
        else {
          return fetch(event.request).then( (response) => {
            if (response.status > 399)
              return new Response('Failed!' + response.status);
            else {
              cache.put(event.request, response.clone());
              return response;
            }
          }).catch((error) => { return new Response('Failed!');});
        }
      });
    })
  );
});
