import { site } from '../config/site.js';
import { attrs, html } from '../lib/html.js';
import { linkAgendamento, linkTelefone, linkWhatsApp, mensagens } from '../lib/links.js';
import { icon } from './Icons.js';

/**
 * Botões de conversão. Todos carregam data-cta (ação), data-cta-posicao (onde estão na página)
 * e data-cta-canal; a especialidade vem do <body data-especialidade>. O script da página
 * transforma esses atributos em um único evento por clique.
 */
const rastreio = (acao, posicao, canal) =>
  attrs({ 'data-cta': acao, 'data-cta-posicao': posicao, 'data-cta-canal': canal });

const avisoCanal = (canal) =>
  canal === 'whatsapp' ? html`<span class="sr-only"> (abre o WhatsApp)</span>` : canal === 'agendamento-online'
    ? html`<span class="sr-only"> (abre em nova aba)</span>`
    : '';

/**
 * Botão principal de cada bloco. Com o agendamento pelo WhatsApp (padrão), diz isso no rótulo e no
 * ícone, para o destino ficar claro: "Agendar pelo WhatsApp".
 * @param {{ esp: any, posicao: string, rotulo?: any, variante?: 'padrao' | 'compacto' | 'claro', classe?: string }} p
 */
export function BotaoAgendar({ esp, posicao, rotulo, variante = 'padrao', classe = '' }) {
  const { href, canal } = linkAgendamento(esp);
  const whatsapp = canal === 'whatsapp';
  const texto = rotulo ?? (whatsapp ? 'Agendar pelo WhatsApp' : 'Agende sua consulta');
  const marca = whatsapp ? icon('wa') : icon(variante === 'compacto' ? 'right' : 'arrow');
  const seta = variante === 'compacto' ? marca : html`<span class="arrow${whatsapp ? ' arrow-wa' : ''}">${marca}</span>`;
  const cls = ['btn', variante === 'claro' ? 'btn-light' : 'btn-primary', classe].filter(Boolean).join(' ');
  return html`<a class="${cls}" href="${href}" target="_blank" rel="noopener"${rastreio('agendar', posicao, canal)}>${texto}${seta}${avisoCanal(canal)}</a>`;
}

/** Botão flutuante do WhatsApp, fixo no canto inferior direito em todas as páginas. */
export function BotaoFlutuante({ esp }) {
  const href = linkWhatsApp(mensagens(esp).agendamento);
  return html`<a class="wa-float" href="${href}" target="_blank" rel="noopener"${rastreio('whatsapp', 'flutuante', 'whatsapp')}>
  <span class="wa-float-label">Agendar pelo WhatsApp</span><span class="wa-float-icon" aria-hidden="true">${icon('wa')}</span><span class="sr-only"> (abre o WhatsApp)</span>
</a>`;
}

/**
 * "Fale no WhatsApp".
 * @param {{ esp: any, posicao: string, rotulo?: string, mensagem?: 'duvida' | 'convenio' | 'agendamento', classe?: string }} p
 */
export function BotaoWhatsApp({ esp, posicao, rotulo = 'Fale no WhatsApp', mensagem = 'duvida', classe = 'btn btn-outline' }) {
  const href = linkWhatsApp(mensagens(esp)[mensagem]);
  return html`<a class="${classe}" href="${href}" target="_blank" rel="noopener"${rastreio(
    mensagem === 'convenio' ? 'convenio' : 'whatsapp',
    posicao,
    'whatsapp',
  )}>${icon('wa')}${rotulo}${avisoCanal('whatsapp')}</a>`;
}

/** @param {{ posicao: string, rotulo?: string, classe?: string, comIcone?: boolean }} p */
export function LinkTelefone({ posicao, rotulo = site.contato.telefone.exibicao, classe = '', comIcone = true }) {
  return html`<a${attrs({ class: classe || null })} href="${linkTelefone()}"${rastreio('ligar', posicao, 'telefone')}>${
    comIcone ? icon('phone') : ''
  }${rotulo}</a>`;
}
