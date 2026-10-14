/**
 * Valida o conteúdo antes do build: estrutura de cada especialidade, limites de SEO,
 * recursos da clínica, termos proibidos (nomes de médicos, promessas, superlativos) e pendências.
 * Erros encerram com código 1; avisos apenas informam.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { ICONES } from '../src/components/Icons.js';
import { especialidades } from '../src/config/especialidades/index.js';
import { recursos } from '../src/config/recursos.js';
import { site } from '../src/config/site.js';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TIPOS = new Set(['conservador', 'reabilitacao', 'procedimento', 'cirurgico']);

/**
 * Comunicação institucional e responsável: nada de médicos em destaque, promessas ou rankings.
 * Os padrões valem para todo o texto publicado (especialidades e dados institucionais).
 */
export const TERMOS_PROIBIDOS = [
  { padrao: /\bDra?\.\s*[A-ZÀ-Ú]/, motivo: 'nome de médico (Dr./Dra.)' },
  { padrao: /\bdoutora?\s+[A-ZÀ-Ú]/i, motivo: 'nome de médico (doutor/doutora)' },
  { padrao: /corpo cl[ií]nico/i, motivo: 'destaque ao corpo clínico individual' },
  { padrao: /nosso especialista|nossa especialista/i, motivo: 'destaque a um profissional' },
  { padrao: /\bcur(a|ar|ado|ada)\b/i, motivo: 'promessa de cura' },
  { padrao: /garant/i, motivo: 'promessa de resultado' },
  { padrao: /100\s?%/, motivo: 'promessa de resultado' },
  { padrao: /sem (riscos?|efeitos colaterais)/i, motivo: 'promessa de ausência de risco' },
  { padrao: /\b(o|a|os|as) melhor(es)?\b/i, motivo: 'superlativo comparativo' },
  { padrao: /melhor(es)? (ortopedista|cl[ií]nica|especialista|equipe|tratamento)/i, motivo: 'superlativo comparativo' },
  { padrao: /n[úu]mero 1|\bn[ºo°]\s?1\b|refer[êe]ncia em/i, motivo: 'ranking ou autopromoção' },
  { padrao: /emerg[êe]ncia/i, motivo: 'o Pronto Atendimento não pode ser chamado de emergência' },
];

/** Todas as strings de um objeto, com o caminho de cada uma. */
function textos(valor, caminho = '') {
  if (typeof valor === 'string') return [{ caminho, texto: valor }];
  if (Array.isArray(valor)) return valor.flatMap((v, i) => textos(v, `${caminho}[${i}]`));
  if (valor && typeof valor === 'object') {
    return Object.entries(valor).flatMap(([k, v]) => textos(v, caminho ? `${caminho}.${k}` : k));
  }
  return [];
}

export function lint() {
  const erros = [];
  const avisos = [];
  const erro = (onde, msg) => erros.push(`${onde}: ${msg}`);
  const aviso = (onde, msg) => avisos.push(`${onde}: ${msg}`);

  const slugs = especialidades.map((e) => e.slug);
  const repetidos = (lista) => lista.filter((v, i) => lista.indexOf(v) !== i);

  for (const s of repetidos(slugs)) erro('especialidades', `slug repetido "${s}"`);
  for (const t of repetidos(especialidades.map((e) => e.seo.title))) erro('seo', `title repetido "${t}"`);
  for (const d of repetidos(especialidades.map((e) => e.seo.description))) erro('seo', `description repetida "${d}"`);
  for (const h of repetidos(especialidades.map((e) => e.hero.titulo))) erro('hero', `H1 repetido "${h}"`);

  for (const esp of especialidades) {
    const onde = esp.slug ?? '(sem slug)';

    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(esp.slug ?? '')) erro(onde, 'slug deve ser minúsculo, sem acentos, separado por hífens');
    for (const campo of ['nome', 'mensagemWhatsApp']) if (!esp[campo]) erro(onde, `campo obrigatório "${campo}"`);
    for (const campo of ['nome', 'artigo', 'em']) if (!esp.regiao?.[campo]) erro(onde, `campo obrigatório "regiao.${campo}"`);

    const { title = '', description = '' } = esp.seo ?? {};
    if (title.length < 30 || title.length > 60) erro(onde, `seo.title com ${title.length} caracteres (use 30–60)`);
    if (description.length < 120 || description.length > 160) erro(onde, `seo.description com ${description.length} caracteres (use 120–160)`);
    if (!/salvador/i.test(title)) erro(onde, 'seo.title deve citar Salvador (SEO local)');
    if (!/salvador/i.test(description)) erro(onde, 'seo.description deve citar Salvador (SEO local)');

    const h1 = esp.hero?.titulo?.replace(/\*\*|\n/g, ' ').replace(/\s+/g, ' ') ?? '';
    if (!h1.includes('Especialistas') || !h1.includes(esp.nome)) erro(onde, 'hero.titulo deve seguir "Especialistas em [Especialidade]"');
    if (!esp.hero?.subtitulo) erro(onde, 'hero.subtitulo obrigatório');

    if (esp.sintomas?.itens?.length !== 4) erro(onde, 'sintomas.itens deve ter exatamente 4 itens');
    for (const item of esp.sintomas?.itens ?? []) if (!ICONES[item.icone]) erro(onde, `ícone inexistente "${item.icone}"`);
    if (!esp.sintomas?.destaque) erro(onde, 'sintomas.destaque (cartão sobre a imagem) obrigatório');

    const nCond = esp.condicoes?.itens?.length ?? 0;
    if (nCond < 4 || nCond > 6) erro(onde, `condicoes.itens com ${nCond} itens (use 4–6)`);

    const nFaq = esp.faq?.length ?? 0;
    if (nFaq < 4 || nFaq > 5) erro(onde, `faq com ${nFaq} perguntas (use 4–5)`);
    for (const p of repetidos((esp.faq ?? []).map((f) => f.pergunta))) erro(onde, `pergunta repetida "${p}"`);

    for (const t of esp.tratamentos?.itens ?? []) {
      if (!TIPOS.has(t.tipo)) erro(onde, `tratamento "${t.titulo}" com tipo inválido "${t.tipo}"`);
      for (const id of t.recursos ?? []) {
        if (!recursos[id]) erro(onde, `tratamento "${t.titulo}" cita recurso inexistente "${id}"`);
        else if (!recursos[id].disponivel) erro(onde, `recurso "${id}" não está confirmado como disponível na UORT`);
      }
    }

    for (const r of esp.relacionadas ?? []) {
      if (!slugs.includes(r)) erro(onde, `especialidade relacionada inexistente "${r}"`);
      if (r === esp.slug) erro(onde, 'uma especialidade não pode ser relacionada a si mesma');
    }

    if (esp.mensagemWhatsApp && !esp.mensagemWhatsApp.includes(esp.nome)) {
      erro(onde, 'mensagemWhatsApp deve citar o nome da especialidade (identifica a origem do contato)');
    }

    for (const [chave, img] of [
      ['hero.imagem', esp.hero?.imagem],
      ['sintomas.imagem', esp.sintomas?.imagem],
    ]) {
      if (!img?.arquivo || !img?.alt) erro(onde, `${chave} precisa de "arquivo" e "alt"`);
      else if (!fs.existsSync(path.join(RAIZ, 'src/assets/img', esp.slug, img.arquivo))) {
        aviso(onde, `${chave} pendente (src/assets/img/${esp.slug}/${img.arquivo}); a página usa a composição de marca`);
      }
    }

    for (const { caminho, texto } of textos(esp)) {
      for (const { padrao, motivo } of TERMOS_PROIBIDOS) {
        if (padrao.test(texto)) erro(onde, `${caminho}: ${motivo} → "${texto.match(padrao)[0]}"`);
      }
    }
  }

  const { responsavelTecnico, ...publicado } = site;
  for (const { caminho, texto } of textos(publicado)) {
    if (caminho.startsWith('links') || caminho.endsWith('mapaUrl')) continue;
    for (const { padrao, motivo } of TERMOS_PROIBIDOS) {
      if (padrao.test(texto)) erro('site', `${caminho}: ${motivo} → "${texto.match(padrao)[0]}"`);
    }
  }

  if (!fs.existsSync(path.join(RAIZ, 'src/assets/img', site.fotoEstrutura.arquivo))) {
    aviso('site', `foto da estrutura pendente (src/assets/img/${site.fotoEstrutura.arquivo})`);
  }
  if (!responsavelTecnico) aviso('site', 'responsavelTecnico vazio (Resolução CFM 2.336/2023: confirmar com o jurídico)');
  if (!site.endereco.cep) aviso('site', 'CEP não informado');
  if (!site.analytics.gtmId && !site.analytics.ga4Id) aviso('site', 'nenhum GTM/GA4 configurado; os eventos ficam apenas no dataLayer');
  if (site.baseUrl === 'https://www.uort.com.br') aviso('site', 'baseUrl usa o domínio institucional; confirme o domínio final das páginas');

  return { erros, avisos };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { erros, avisos } = lint();
  for (const a of avisos) console.log(`  aviso  ${a}`);
  for (const e of erros) console.log(`  ERRO   ${e}`);
  console.log(`\nlint: ${erros.length} erro(s), ${avisos.length} aviso(s)`);
  process.exit(erros.length ? 1 : 0);
}
