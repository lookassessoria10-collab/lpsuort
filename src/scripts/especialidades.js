/*
 * Comportamento das landing pages de especialidade (sem dependências).
 * 1. Eventos de conversão: um listener delegado gera um único evento por clique em [data-cta].
 * 2. Abertura de perguntas frequentes.
 * 3. Menu "Especialidades" do cabeçalho (fecha com clique fora ou Esc).
 * 4. Preservação de UTM/gclid nos links internos entre especialidades.
 * O botão flutuante do WhatsApp é só HTML e CSS: fica sempre visível, sem script.
 */
(() => {
  if (window.__uortEspecialidades) return;
  window.__uortEspecialidades = true;

  const { especialidade, analytics } = document.body.dataset;
  window.dataLayer = window.dataLayer || [];

  /** Envia para o gtag (quando é o modo configurado) ou para o dataLayer, nunca para os dois. */
  function enviar(evento, params) {
    const dados = { especialidade, pagina: location.pathname, ...params };
    if (analytics === 'gtag' && typeof window.gtag === 'function') {
      window.gtag('event', evento, dados);
    } else {
      window.dataLayer.push({ event: evento, ...dados });
    }
  }

  // 1. Conversões
  let ultimo = { alvo: null, quando: 0 };
  document.addEventListener('click', (e) => {
    const alvo = e.target instanceof Element ? e.target.closest('[data-cta]') : null;
    if (!alvo) return;
    const agora = Date.now();
    if (ultimo.alvo === alvo && agora - ultimo.quando < 800) return; // clique duplo conta uma vez
    ultimo = { alvo, quando: agora };
    const { cta, ctaPosicao, ctaCanal } = alvo.dataset;
    enviar('uort_cta_click', {
      cta_acao: cta,
      cta_posicao: ctaPosicao,
      cta_canal: ctaCanal,
      cta_id: `${especialidade}:${ctaPosicao}:${cta}`,
    });
  });

  // 2. Perguntas frequentes (a primeira já vem aberta e não conta como interação)
  document.querySelectorAll('.faq-item[open]').forEach((item) => (item.dataset.registrado = '1'));
  document.addEventListener(
    'toggle',
    (e) => {
      const item = e.target;
      if (!(item instanceof HTMLDetailsElement) || !item.matches('.faq-item') || !item.open) return;
      if (item.dataset.registrado) return;
      item.dataset.registrado = '1';
      enviar('uort_faq_open', { faq_pergunta: item.querySelector('h3')?.textContent.trim() });
    },
    true,
  );

  // 3. Menu do cabeçalho
  const menu = document.querySelector('[data-menu]');
  if (menu) {
    document.addEventListener('click', (e) => {
      if (menu.open && !menu.contains(/** @type {Node} */ (e.target))) menu.open = false;
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.open) {
        menu.open = false;
        menu.querySelector('summary')?.focus();
      }
    });
  }

  // 4. Atribuição (Google Ads): mantém os parâmetros da entrada ao navegar entre especialidades
  const CHAVES = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'gbraid', 'wbraid'];
  const ARMAZENAMENTO = 'uort_atribuicao';
  let atribuicao = {};
  try {
    atribuicao = JSON.parse(sessionStorage.getItem(ARMAZENAMENTO) || '{}');
  } catch {
    atribuicao = {};
  }
  const daUrl = new URLSearchParams(location.search);
  const novos = Object.fromEntries(CHAVES.filter((k) => daUrl.get(k)).map((k) => [k, daUrl.get(k)]));
  if (Object.keys(novos).length) {
    atribuicao = novos;
    try {
      sessionStorage.setItem(ARMAZENAMENTO, JSON.stringify(atribuicao));
    } catch {
      /* armazenamento indisponível: segue só com os parâmetros da URL atual */
    }
  }
  if (Object.keys(atribuicao).length) {
    document.querySelectorAll('a[data-interno]').forEach((link) => {
      const url = new URL(link.getAttribute('href'), location.href);
      for (const [k, v] of Object.entries(atribuicao)) if (!url.searchParams.has(k)) url.searchParams.set(k, v);
      link.setAttribute('href', url.pathname + url.search + url.hash);
    });
  }
})();
