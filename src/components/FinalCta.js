import { html, rich } from '../lib/html.js';
import { BotaoAgendar, BotaoWhatsApp, LinkTelefone } from './Cta.js';

/** Bloco 09: CTA final em azul-petróleo. */
export function FinalCta({ esp }) {
  return html`<section class="final" id="agendar" aria-labelledby="final-titulo">
  <div class="wrap">
    <div class="final-copy">
      <span class="eyebrow eyebrow-light">Agende sua avaliação</span>
      <h2 id="final-titulo">${rich(esp.ctaFinal.titulo)}</h2>
      <p>${esp.ctaFinal.texto}</p>
    </div>
    <div class="final-actions">
      ${BotaoAgendar({ esp, posicao: 'cta-final', variante: 'claro' })}
      ${BotaoWhatsApp({ esp, posicao: 'cta-final', classe: 'btn btn-outline-light' })}
      <p class="final-phone">Prefere ligar? ${LinkTelefone({ posicao: 'cta-final', comIcone: false })}</p>
    </div>
  </div>
</section>`;
}
