import { html } from '../lib/html.js';
import { caminhoPagina } from '../lib/links.js';
import { BotaoWhatsApp } from './Cta.js';
import { icon } from './Icons.js';

/** Bloco 08: perguntas frequentes em accordion nativo (<details>), acessível por teclado. */
export function Faq({ esp, especialidades }) {
  const relacionadas = esp.relacionadas.map((slug) => especialidades.find((e) => e.slug === slug)).filter(Boolean);

  return html`<section class="faq" id="duvidas" aria-labelledby="faq-titulo">
  <div class="wrap">
    <div class="faq-aside">
      <span class="eyebrow">Perguntas frequentes</span>
      <h2 id="faq-titulo">Dúvidas sobre <b>${esp.regiao.artigo}</b></h2>
      <p>As respostas são informativas e não substituem a consulta. Para entender o seu caso, fale com a equipe da UORT.</p>
      ${BotaoWhatsApp({ esp, posicao: 'faq', rotulo: 'Tire sua dúvida no WhatsApp' })}
      ${relacionadas.length
        ? html`<nav class="related" aria-label="Especialidades relacionadas">
        <p class="related-title">Veja também</p>
        <ul>${relacionadas.map(
          (r) => html`<li><a href="${caminhoPagina(r.slug)}" data-interno>Especialistas em ${r.nome}${icon('right')}</a></li>`,
        )}</ul>
      </nav>`
        : ''}
    </div>
    <div class="faq-list">
      ${esp.faq.map(
        (item, i) => html`<details class="faq-item" data-faq="${i + 1}"${i === 0 ? html` open` : ''}>
        <summary><h3>${item.pergunta}</h3><span class="faq-toggle" aria-hidden="true"></span></summary>
        <div class="faq-a"><p>${item.resposta}</p></div>
      </details>`,
      )}
    </div>
  </div>
</section>`;
}
