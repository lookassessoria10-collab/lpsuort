import { html, rich } from '../lib/html.js';
import { BotaoAgendar, LinkTelefone } from './Cta.js';
import { MedicosFinal } from './Doctors.js';

/**
 * Bloco 09: CTA final em azul-petróleo, com um único botão (WhatsApp) e o telefone como alternativa.
 * Com médicos na página, a coluna da direita mostra a foto do médico único ou todos os médicos.
 */
export function FinalCta({ esp, equipe }) {
  const acoes = html`<div class="final-actions">
      ${BotaoAgendar({ esp, posicao: 'cta-final', variante: 'claro' })}
      <p class="final-phone">Prefere ligar? ${LinkTelefone({ posicao: 'cta-final', comIcone: false })}</p>
    </div>`;
  const texto = html`<span class="eyebrow eyebrow-light">Agende sua avaliação</span>
      <h2 id="final-titulo">${rich(esp.ctaFinal.titulo)}</h2>
      <p>${esp.ctaFinal.texto}</p>`;

  return html`<section class="final${equipe.final.length ? ' has-doc' : ''}" id="agendar" aria-labelledby="final-titulo">
  <div class="wrap">
    ${equipe.final.length
      ? html`<div class="final-copy">
      ${texto}
      ${acoes}
    </div>
    ${MedicosFinal(equipe.final)}`
      : html`<div class="final-copy">
      ${texto}
    </div>
    ${acoes}`}
  </div>
</section>`;
}
