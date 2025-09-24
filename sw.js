const CACHE_NAME = 'meu-acerto-cache-v2';
// Atualize aqui os URLs para o nome correto do seu repositório.
const urlsToCache = [
  '/meu-acerto-app/',
  '/meu-acerto-app/index.html'
];

// Evento de instalação: abre o cache e armazena os ficheiros principais.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de fetch: serve os ficheiros do cache se estiverem disponíveis (estratégia cache-first).
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se o recurso estiver no cache, retorna-o.
        if (response) {
          return response;
        }
        // Caso contrário, busca na rede.
        return fetch(event.request);
      })
  );
});

// Evento de ativação: limpa caches antigos para manter a aplicação atualizada.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

