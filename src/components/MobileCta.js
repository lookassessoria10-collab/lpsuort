import { html } from '../lib/html.js';
import { BotaoAgendar, LinkTelefone } from './Cta.js';

/**
 * CTA fixo e discreto no celular. Aparece depois que os botões do hero saem da tela
 * e some quando o CTA final está visível, para não repetir ações nem cobrir conteúdo.
 */
export function MobileCta({ esp }) {
  return html`<div class="mobile-cta" data-mobile-cta>
  ${LinkTelefone({ posicao: 'barra-fixa', rotulo: 'Ligar', classe: 'btn btn-outline' })}
  ${BotaoAgendar({ esp, posicao: 'barra-fixa', variante: 'compacto', rotulo: 'Agendar consulta' })}
</div>`;
}
