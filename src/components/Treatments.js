import { recursos } from '../config/recursos.js';
import { html } from '../lib/html.js';
import { BotaoAgendar } from './Cta.js';

const TIPOS = {
  conservador: 'Conservador',
  reabilitacao: 'Reabilitação',
  procedimento: 'Procedimento',
  cirurgico: 'Cirúrgico',
};

/** O item cita algum recurso confirmado no catálogo da clínica? */
const disponivelNaClinica = (item) => (item.recursos ?? []).some((id) => recursos[id]?.disponivel);

/** Bloco 05: possibilidades de tratamento, em lista editorial (diferente da grade de condições). */
export function Treatments({ esp }) {
  const { tratamentos } = esp;
  return html`<section class="care" id="tratamentos" aria-labelledby="tratamentos-titulo">
  <div class="wrap">
    <div class="care-intro">
      <span class="eyebrow">Tratamentos</span>
      <h2 id="tratamentos-titulo">O cuidado adequado <b>para cada necessidade.</b></h2>
      <p class="lead">${tratamentos.introducao}</p>
      <p class="care-note">A indicação de qualquer tratamento é feita somente após a avaliação especializada. Nem todos os casos exigem procedimentos ou cirurgia.</p>
      ${BotaoAgendar({ esp, posicao: 'tratamentos' })}
    </div>
    <ul class="care-list">
      ${tratamentos.itens.map(
        (item) => html`<li class="care-item">
        <div class="care-meta">
          <span class="care-type">${TIPOS[item.tipo]}</span>
          ${disponivelNaClinica(item) ? html`<span class="chip">Disponível na UORT</span>` : ''}
        </div>
        <h3>${item.titulo}</h3>
        <p>${item.texto}</p>
      </li>`,
      )}
    </ul>
  </div>
</section>`;
}
