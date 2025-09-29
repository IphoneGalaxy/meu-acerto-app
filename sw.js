const CACHE = 'meu-acerto-v3';

// O que é local do seu app (app shell)
const APP_SHELL = [
  '/meu-acerto-app/',
  '/meu-acerto-app/index.html',
  '/meu-acerto-app/manifest.json',
  '/meu-acerto-app/sw.js'
];

// (Opcional) URLs de CDNs que você usa. Se falhar algum, ignoramos para não quebrar a instalação.
const CDN_ASSETS = [
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
  'https://www.gstatic.com/firebasejs/10.12.4/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.4/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore-compat.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(APP_SHELL);
    // Pré-tenta guardar os CDNs; se algum falhar, não aborta a instalação
    await Promise.all(CDN_ASSETS.map(async (url) => {
      try {
        const res = await fetch(url, { mode: 'no-cors' });
        await c.put(url, res);
      } catch (_) {/* ignore */}
    }));
  })());
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k !== CACHE ? caches.delete(k) : null)));
  })());
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;

  // Navegação: online primeiro, fallback para index do cache
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put('/meu-acerto-app/index.html', copy)).catch(()=>{});
          return res;
        })
        .catch(() => caches.match('/meu-acerto-app/index.html'))
    );
    return;
  }

  // Outros GETs: cache-first com atualização
  if (req.method === 'GET') {
    e.respondWith(
      caches.match(req).then((hit) => {
        const fromNet = fetch(req)
          .then((res) => {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(req, clone)).catch(()=>{});
            return res;
          })
          .catch(() => hit);
        return hit || fromNet;
      })
    );
  }
});