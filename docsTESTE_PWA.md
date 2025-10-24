# Checklist de Teste PWA — Cooperata

1) Instalação
- Abrir `index.html` no Chrome Android (ou em https://darkseven09.github.io/Project).
- Adicionar à tela inicial e abrir o app instalado.

2) Full screen e barra do navegador
- Verificar que o app abre em tela cheia (sem UI do navegador).
- Abrir cada simulador a partir da home; confirmar que continuam em tela cheia.

3) Navegação (mesma janela)
- Na home, tocar em:
  - Crédito Pessoal
  - Refinanciamento
  - Construção
  - Carro
- Confirmar que cada simulador abre na mesma janela (sem nova aba).

4) Top bar nos simuladores
- Verificar a presença da barra superior com:
  - “Voltar ao Index” (history.back quando possível; fallback para `index.html`)
  - “Fechar” (tenta `window.close()`; fallback `location.replace('index.html')`)
- Testar ambos os botões em todos os simuladores e confirmar que não empilham histórico/abas.

5) Offline
- Ativar “Offline” no DevTools (Network).
- Abrir o app instalado; acessar a home e cada simulador. As páginas devem carregar do cache.

6) iOS (Safari)
- Usar “Add to Home Screen”.
- Abrir como web app; checar status bar “black-translucent” e comportamento full screen.

7) Acessibilidade/UX
- Confirmar foco visível nos botões da top bar.
- Verificar que o conteúdo não estoura a viewport; tabelas continuam roláveis no eixo X.

