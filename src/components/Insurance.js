import { site } from '../config/site.js';
import { html } from '../lib/html.js';
import { linkWhatsApp, mensagens } from '../lib/links.js';
import { BotaoWhatsApp, LinkTelefone } from './Cta.js';
import { icon } from './Icons.js';

/** Bloco 07: convênios e facilidades, em um painel compacto. */
export function Insurance({ esp }) {
  const { contato } = site;
  return html`<section class="plans" id="convenios" aria-labelledby="convenios-titulo">
  <div class="wrap">
    <div class="plans-box">
      <div class="plans-main">
        <span class="eyebrow">Convênios</span>
        <h2 id="convenios-titulo">Convênios <b>e facilidades</b></h2>
        <p class="plans-lead">Atendimento particular e pelos convênios abaixo.</p>
        <ul class="chips">${site.convenios.map((c) => html`<li>${c}</li>`)}</ul>
        <p class="plans-note">${site.conveniosObservacao}</p>
      </div>
      <div class="plans-contact">
        <h3>Agendamento e contato</h3>
        <ul class="contact-list">
          <li>${icon('phone')}<div><span>Telefone</span>${LinkTelefone({ posicao: 'convenios', comIcone: false })}</div></li>
          <li>${icon('wa')}<div><span>WhatsApp</span><a href="${linkWhatsApp(mensagens(esp).agendamento)}" target="_blank" rel="noopener" data-cta="whatsapp" data-cta-posicao="convenios" data-cta-canal="whatsapp">${contato.whatsapp.exibicao}<span class="sr-only"> (abre o WhatsApp)</span></a></div></li>
          <li>${icon('clock')}<div><span>Pronto Atendimento</span><p>Ortopédico, ${site.prontoAtendimento.horario}</p></div></li>
        </ul>
        ${BotaoWhatsApp({
          esp,
          posicao: 'convenios',
          mensagem: 'convenio',
          rotulo: 'Consulte a disponibilidade de atendimento',
          classe: 'btn btn-primary btn-block',
        })}
      </div>
    </div>
  </div>
</section>`;
}
