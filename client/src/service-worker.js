workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /\.css$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'css-cache',
  })
);

workbox.routing.registerRoute(
  /\.(?:eot|tff|woff|woff2)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'font-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
        maxAgeSeconds: 365 * 24 * 60 * 60 // 1 Year
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /\.js$/,
  workbox.strategies.networkFirst({
    cacheName: 'js-cache',
  })
);

workbox.routing.registerRoute(
  /^https:\/\/api\.elements\.borger\.io/,
  workbox.strategies.cacheFirst({
    cacheName: 'api-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
        maxAgeSeconds: 24 * 60 * 60 // 1 Day
      }),
    ],
  })
);