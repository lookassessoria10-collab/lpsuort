import { html } from '../lib/html.js';
import { BotaoAgendar } from './Cta.js';

/** Bloco 03: condições atendidas, em grade de cartões discretos. */
export function Conditions({ esp }) {
  const { condicoes } = esp;
  return html`<section class="conditions" id="condicoes" aria-labelledby="condicoes-titulo">
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">${esp.nome}</span>
      <h2 id="condicoes-titulo">Quais problemas <b>podemos avaliar e tratar?</b></h2>
      <p class="lead">${condicoes.introducao}</p>
    </div>
    <ul class="cond-grid">
      ${condicoes.itens.map(
        (item, i) => html`<li class="cond-card">
        <span class="cond-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <h3>${item.nome}</h3>
        <p>${item.descricao}</p>
      </li>`,
      )}
    </ul>
    <div class="section-cta">
      <p>Não encontrou a sua queixa? A consulta ajuda a entender o que está acontecendo com ${esp.regiao.artigo}.</p>
      ${BotaoAgendar({ esp, posicao: 'condicoes' })}
    </div>
  </div>
</section>`;
}
