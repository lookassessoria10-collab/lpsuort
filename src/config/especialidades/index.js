/**
 * Registro central das especialidades. Cada item gera a rota /especialidades/<slug>.
 * A ordem abaixo é a ordem de exibição nos links entre especialidades.
 *
 * Convenções de texto usadas em todos os campos:
 *   **trecho**  → destaque em azul-turquesa
 *   \n          → quebra de linha (apenas em títulos)
 *   {prontoAtendimento} → horário do Pronto Atendimento definido em site.js
 *
 * @typedef {{ arquivo: string, alt: string, foco?: string }} Imagem
 * @typedef {'conservador' | 'reabilitacao' | 'procedimento' | 'cirurgico'} TipoTratamento
 * @typedef {{
 *   slug: string,
 *   nome: string,
 *   regiao: { nome: string, artigo: string, em: string },
 *   seo: { title: string, description: string },
 *   hero: { titulo: string, subtitulo: string, imagem: Imagem },
 *   sintomas: {
 *     eyebrow?: string,
 *     titulo: string,
 *     itens: { icone: string, texto: string }[],
 *     destaque: string,
 *     imagem: Imagem,
 *   },
 *   condicoes: { introducao: string, itens: { nome: string, descricao: string }[] },
 *   avaliacao: { exame: string, investigacao: string },
 *   tratamentos: {
 *     introducao: string,
 *     itens: { tipo: TipoTratamento, titulo: string, texto: string, recursos?: string[] }[],
 *   },
 *   instituicao: { introducao: string },
 *   faq: { pergunta: string, resposta: string }[],
 *   ctaFinal: { titulo: string, texto: string },
 *   mensagemWhatsApp: string,
 *   relacionadas: string[],
 * }} Especialidade
 */
import joelho from './joelho.js';
import coluna from './coluna.js';
import ombro from './ombro.js';
import quadril from './quadril.js';
import peETornozelo from './pe-e-tornozelo.js';

/** @type {Especialidade[]} */
export const especialidades = [joelho, coluna, ombro, quadril, peETornozelo];

/** @param {string} slug */
export const porSlug = (slug) => especialidades.find((e) => e.slug === slug);
