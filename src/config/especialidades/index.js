/**
 * Registro central das especialidades. Cada item gera a rota /especialidades/<slug>.
 * A ordem abaixo é a ordem de exibição nos links entre especialidades.
 *
 * Convenções de texto usadas em todos os campos:
 *   **trecho**  → destaque em azul-turquesa
 *   \n          → quebra de linha (apenas em títulos)
 *   {prontoAtendimento} → horário do Pronto Atendimento em frase (site.prontoAtendimento.frase)
 *
 * Título do hero (H1): pergunta curta sobre a dor do paciente, citando a região do corpo
 * (ex.: "Sofrendo com **dor no joelho?**"). "Especialistas em [Especialidade]" fica no eyebrow.
 *
 * Médicos (opcional): ids de src/config/medicos.js, de preferência em ordem alfabética. Todos aparecem
 * do mesmo jeito: avatar no hero, cartão na equipe, um slide em "Conheça os especialistas" (banner
 * rotativo quando há mais de um) e o avatar no CTA final. As fotos de cada função ficam em medicos.js.
 * Sem `medicos`, a página é publicada sem esses blocos.
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
 *   medicos?: string[],
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
