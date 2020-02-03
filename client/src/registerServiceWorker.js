import { register } from 'register-service-worker';

if(process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.info(
        '%cServiceWorker',
        'background:#2ecc71;color:#fff;border-radius:5px;padding:2px 6px;font-weight:bold',
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB',
      )
    },
    registered() {
      console.info(
        '%cServiceWorker',
        'background:#2ecc71;color:#fff;border-radius:5px;padding:2px 6px;font-weight:bold',
        'Service worker has been registered.'
      )
    },
    cached() {
      console.info(
        '%cServiceWorker',
        'background:#2ecc71;color:#fff;border-radius:5px;padding:2px 6px;font-weight:bold',
        'Content has been cached for offline use.'
      )
    },
    updatefound() {
      console.info(
        '%cServiceWorker',
        'background:#2ecc71;color:#fff;border-radius:5px;padding:2px 6px;font-weight:bold',
        'New content is downloading.'
      )
    },
    updated() {
      console.info(
        '%cServiceWorker',
        'background:#2ecc71;color:#fff;border-radius:5px;padding:2px 6px;font-weight:bold',
        'New content is available; please refresh.'
      )
    },
    offline() {
      console.info(
        '%cServiceWorker',
        'background:#2ecc71;color:#fff;border-radius:5px;padding:2px 6px;font-weight:bold',
        'No internet connection found. App is running in offline mode.'
      )
    },
    error(error) {
      console.error(
        '%cServiceWorker',
        'background:#2ecc71;color:#fff;border-radius:5px;padding:2px 6px;font-weight:bold',
        'Error during service worker registration:',
        error
      )
    }
  })
}
