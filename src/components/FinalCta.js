import { html, rich } from '../lib/html.js';
import { BotaoAgendar, LinkTelefone } from './Cta.js';
import { FotoMedicoFinal } from './Doctors.js';

/**
 * Bloco 09: CTA final em azul-petróleo, com um único botão (WhatsApp) e o telefone como alternativa.
 * Quando a especialidade define `medicos.final`, a foto do médico ocupa a coluna da direita.
 */
export function FinalCta({ esp, equipe }) {
  const acoes = html`<div class="final-actions">
      ${BotaoAgendar({ esp, posicao: 'cta-final', variante: 'claro' })}
      <p class="final-phone">Prefere ligar? ${LinkTelefone({ posicao: 'cta-final', comIcone: false })}</p>
    </div>`;
  const texto = html`<span class="eyebrow eyebrow-light">Agende sua avaliação</span>
      <h2 id="final-titulo">${rich(esp.ctaFinal.titulo)}</h2>
      <p>${esp.ctaFinal.texto}</p>`;

  return html`<section class="final${equipe.final ? ' has-doc' : ''}" id="agendar" aria-labelledby="final-titulo">
  <div class="wrap">
    ${equipe.final
      ? html`<div class="final-copy">
      ${texto}
      ${acoes}
    </div>
    ${FotoMedicoFinal(equipe.final)}`
      : html`<div class="final-copy">
      ${texto}
    </div>
    ${acoes}`}
  </div>
</section>`;
}
