import { attrs, html } from '../lib/html.js';
import { caminhoPagina, linkAgendamento } from '../lib/links.js';
import { BotaoAgendar } from './Cta.js';
import { icon } from './Icons.js';

/** Cabeçalho: marca, menu compacto (desktop) e CTA de agendamento. */
export function Header({ esp, especialidades }) {
  const itensEspecialidades = especialidades.map(
    (e) =>
      html`<li><a href="${caminhoPagina(e.slug)}" data-interno${attrs({
        'aria-current': e.slug === esp.slug ? 'page' : null,
      })}>${e.nome}</a></li>`,
  );

  return html`<header class="top">
  <div class="wrap">
    <a class="brand" href="#inicio" aria-label="UORT Ortopedia e Traumatologia, voltar ao início"><span class="logo" aria-hidden="true"></span></a>
    <div class="top-right">
      <nav class="nav" aria-label="Principal">
        <details class="menu" data-menu>
          <summary>Especialidades${icon('chevron', 'menu-caret')}</summary>
          <ul class="menu-list">${itensEspecialidades}</ul>
        </details>
        <a href="#tratamentos">Tratamentos</a>
        <a href="#por-que-uort">Sobre a UORT</a>
        <a href="#convenios">Convênios</a>
      </nav>
      ${BotaoAgendar({
        esp,
        posicao: 'cabecalho',
        variante: 'compacto',
        rotulo: html`<span class="lbl-full">${
          linkAgendamento(esp).canal === 'whatsapp' ? 'Agendar pelo WhatsApp' : 'Agende sua consulta'
        }</span><span class="lbl-short">Agendar</span>`,
      })}
    </div>
  </div>
</header>`;
}
