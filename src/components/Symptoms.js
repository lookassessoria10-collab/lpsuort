import { html, rich } from '../lib/html.js';
import { icon } from './Icons.js';
import { Midia } from './Media.js';

/** Bloco 02: identificação. Título e quatro sinais à esquerda; imagem com cartão sobreposto à direita. */
export function Symptoms({ esp, imagens }) {
  const { sintomas } = esp;
  return html`<section class="pain" id="sintomas" aria-labelledby="sintomas-titulo">
  <div class="wrap">
    <div class="pain-copy">
      <span class="eyebrow">${sintomas.eyebrow ?? 'Qualidade de vida'}</span>
      <h2 id="sintomas-titulo">${rich(sintomas.titulo)}</h2>
      <ul class="signs">
        ${sintomas.itens.map(
          (item) => html`<li><span class="ico">${icon(item.icone)}</span>${item.texto}</li>`,
        )}
      </ul>
    </div>
    <div class="pain-media">
      ${Midia(imagens.sintomas, { id: 'sintomas' })}
      <div class="quote"><p>${rich(sintomas.destaque)}</p></div>
    </div>
  </div>
</section>`;
}
