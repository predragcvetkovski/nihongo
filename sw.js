
const CACHE_NAME = 'nihongo30-cache-v1.8'; // Increment version for updates
const APP_SHELL_URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  // Key JS modules from importmap (ensure these match your index.html)
  'https://esm.sh/react@^19.1.0',
  'https://esm.sh/react@^19.1.0/', // Sometimes requested with trailing slash
  'https://esm.sh/react-dom@^19.1.0',
  'https://esm.sh/react-dom@^19.1.0/', // Sometimes requested with trailing slash
  'https://esm.sh/@google/genai@^1.4.0',
  'https://esm.sh/@modelcontextprotocol/sdk',
  // Main CSS
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@300;400;500;700&display=swap'
];

// URLs for runtime caching (Cache First strategy)
const RUNTIME_CACHE_PATTERNS = [
  /https:\/\/fonts\.gstatic\.com\/.*/,
  /https:\/\/raw\.githubusercontent\.com\/predragcvetkovski\/kanji\.gif\/.*/,
  // Add more patterns if other external resources need caching
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache and caching app shell:', APP_SHELL_URLS_TO_CACHE);
        // Using addAll, if one fails, the entire operation fails.
        // For CDN resources, consider caching them individually and logging errors
        // or using a more robust pre-caching library.
        const promises = APP_SHELL_URLS_TO_CACHE.map(url => {
          return fetch(new Request(url, { mode: 'cors' })) // Ensure CORS for CDN resources
            .then(response => {
              if (!response.ok) {
                // Do not throw error here to allow SW to install even if one CDN resource fails temporarily
                // Production apps might want more robust error handling or fallbacks
                console.error(`Failed to fetch ${url} during SW install: ${response.status} ${response.statusText}`);
                return Promise.resolve(); // Resolve so other caching can proceed
              }
              return cache.put(url, response);
            })
            .catch(err => {
              console.error(`Error fetching/caching ${url} during SW install:`, err);
              return Promise.resolve();
            });
        });
        return Promise.all(promises);
      })
      .then(() => self.skipWaiting()) // Activate new SW immediately
      .catch(err => {
        console.error('Service Worker installation failed:', err);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of open clients
  );
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Skip caching for non-GET requests or API calls
  if (event.request.method !== 'GET' || requestUrl.origin !== self.location.origin && !isCacheableExternalResource(requestUrl.href)) {
    // Let the browser handle non-GET requests or non-cacheable external resources
    // This will allow API calls (e.g., to Gemini) to pass through without caching.
    return;
  }
  
  // For navigation requests (HTML), try network first, then cache, then offline page (optional)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // If network successful, cache it (for app shell URLs)
          if (response.ok && APP_SHELL_URLS_TO_CACHE.includes(requestUrl.pathname) || requestUrl.pathname === '/') {
             const cacheResponse = response.clone();
             caches.open(CACHE_NAME).then(cache => cache.put(event.request, cacheResponse));
          }
          return response;
        })
        .catch(() => caches.match(event.request)
            .then(cachedResponse => {
                return cachedResponse || caches.match('/index.html'); // Fallback to cached index.html
            })
        )
    );
    return;
  }


  // Cache First strategy for specified runtime cache patterns and app shell
  if (APP_SHELL_URLS_TO_CACHE.includes(requestUrl.href) || RUNTIME_CACHE_PATTERNS.some(pattern => pattern.test(requestUrl.href))) {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.ok) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }
            return networkResponse;
          }).catch(error => {
            console.warn('Network request failed for:', event.request.url, error);
            // Optionally, return a generic fallback image/font here if appropriate
          });
        })
    );
  }
  // Other requests will be handled by the browser as default
});

function isCacheableExternalResource(url) {
  const cacheableDomains = [
    'esm.sh',
    'cdn.tailwindcss.com',
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'raw.githubusercontent.com'
    // Add other domains you want to cache from
  ];
  try {
    const requestUrl = new URL(url);
    return cacheableDomains.some(domain => requestUrl.hostname.includes(domain));
  } catch (e) {
    return false;
  }
}