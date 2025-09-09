/* Service Worker registration (equivalente ao snippet solicitado) */
(function () {
  const qs = new URLSearchParams(location.search);
  const swOff = qs.get('no-sw') === '1';
  const secure = (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1');

  if (!('serviceWorker' in navigator) || !secure || !window.isSecureContext || swOff) {
    console.info('[SW] não registrado (contexto inseguro ou no-sw=1).');
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('.service-worker.js', { scope: '.' })
      .then(reg => console.log('[SW] OK:', reg.scope))
      .catch(err => console.warn('[SW] erro:', err));
  });
})();
