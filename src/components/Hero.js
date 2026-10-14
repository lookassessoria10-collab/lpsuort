import { site } from '../config/site.js';
import { html, rich } from '../lib/html.js';
import { BotaoAgendar, BotaoWhatsApp } from './Cta.js';
import { icon } from './Icons.js';
import { Midia } from './Media.js';

/** Bloco 01: primeira dobra. Texto à esquerda, imagem dominante à direita com transição suave. */
export function Hero({ esp, imagens }) {
  return html`<section class="hero" id="inicio" aria-labelledby="hero-titulo">
  ${Midia(imagens.hero, { id: 'hero', prioridade: true })}
  <div class="wrap">
    <div class="hero-copy">
      <span class="eyebrow">UORT <i></i> Especialidade</span>
      <h1 id="hero-titulo">${rich(esp.hero.titulo)}</h1>
      <p class="lead">${esp.hero.subtitulo}</p>
      <div class="actions">
        ${BotaoAgendar({ esp, posicao: 'hero' })}
        ${BotaoWhatsApp({ esp, posicao: 'hero' })}
      </div>
      <p class="hero-note">${icon('pin')}${site.endereco.bairro}, ${site.endereco.cidade} · Particular e convênios</p>
    </div>
  </div>
</section>`;
}
