/* Service Worker registration with safe guards */
(function () {
  const qs = new URLSearchParams(location.search);
  const swOff = qs.get('no-sw') === '1';
  const secureHost = (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1');

  const canUseSW =
    'serviceWorker' in navigator &&
    secureHost &&
    window.isSecureContext &&
    !swOff;

  if (!canUseSW) {
    console.info('[SW] Desativado (contexto inseguro, file:, sem https, ou no-sw=1).');
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js', { scope: '.' })
      .then(reg => console.log('[SW] Registrado:', reg.scope))
      .catch(err => console.warn('[SW] Falha ao registrar:', err));
  });

  // Blindar getRegistrations (se usado em outro código)
  if (navigator.serviceWorker.getRegistrations) {
    try {
      navigator.serviceWorker.getRegistrations().catch(err => {
        console.warn('[SW] getRegistrations falhou:', err);
      });
    } catch (e) {
      console.warn('[SW] getRegistrations exceção:', e);
    }
  }
})();

