import { site } from '../config/site.js';

/** Caminho público de uma especialidade. @param {string} slug */
export const caminhoPagina = (slug) => `${site.basePath}/${slug}`;

/** URL absoluta (canonical, Open Graph, JSON-LD). @param {string} caminho */
export const urlAbsoluta = (caminho) => new URL(caminho, site.baseUrl).href;

/** Caminho público de um arquivo em /especialidades/assets. @param {string} arquivo */
export const caminhoAsset = (arquivo) => `${site.basePath}/assets/${arquivo}`;

/** @param {string} mensagem */
export const linkWhatsApp = (mensagem) =>
  `https://wa.me/${site.contato.whatsapp.numero}?text=${encodeURIComponent(mensagem)}`;

export const linkTelefone = () => `tel:${site.contato.telefone.e164}`;

/**
 * Mensagens de WhatsApp de uma especialidade. A de agendamento vem da configuração;
 * as demais são derivadas do nome, para que toda nova especialidade já nasça com elas.
 * @param {{ nome: string, mensagemWhatsApp: string }} esp
 */
export const mensagens = (esp) => ({
  agendamento: esp.mensagemWhatsApp,
  duvida: `Olá! Vim pela página de ${esp.nome} da UORT e gostaria de tirar uma dúvida sobre o atendimento.`,
  convenio: `Olá! Vim pela página de ${esp.nome} da UORT e gostaria de saber se meu convênio é atendido.`,
});

/** Destino dos botões "Agende sua consulta". @param {{ nome: string, mensagemWhatsApp: string }} esp */
export function linkAgendamento(esp) {
  if (site.agendamento.canal === 'url' && site.agendamento.url) {
    return { href: site.agendamento.url, canal: 'agendamento-online' };
  }
  return { href: linkWhatsApp(mensagens(esp).agendamento), canal: 'whatsapp' };
}

/** Substitui os marcadores de conteúdo pelos dados institucionais. @param {string} texto */
export const interpolar = (texto) => texto.replace(/\{prontoAtendimento\}/g, site.prontoAtendimento.frase);
