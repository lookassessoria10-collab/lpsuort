/**
 * Gera o site estático em dist/:
 *   dist/especialidades/<slug>/index.html   (uma página por especialidade)
 *   dist/especialidades/assets/...          (logo, imagens, Open Graph)
 *   dist/especialidades/sitemap.xml
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { especialidades } from '../src/config/especialidades/index.js';
import { medicos } from '../src/config/medicos.js';
import { site } from '../src/config/site.js';
import { renderEspecialidade } from '../src/layouts/SpecialtyLayout.js';
import { caminhoAsset, caminhoPagina, urlAbsoluta } from '../src/lib/links.js';
import { dimensoes } from './lib/imagens.mjs';

export const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const DIST = path.join(RAIZ, 'dist');
const SRC = path.join(RAIZ, 'src');
const ASSETS = path.join(SRC, 'assets');

/** Minificação conservadora: remove comentários e espaços redundantes. */
const minificarCss = (css) =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};,>])\s*/g, '$1')
    .replace(/:\s+/g, ':') // só o espaço depois de ":"; o de antes separa seletores como ".foot :focus-visible"
    .replace(/;}/g, '}')
    .trim();

const minificarJs = (js) => js.replace(/^\/\*[\s\S]*?\*\/\s*/, '').trim();

/**
 * Resolve uma imagem configurada: só é publicada se o arquivo existir.
 * @param {string} relativo caminho dentro de src/assets/img
 * @param {{ alt: string, foco?: string }} meta
 */
function resolverImagem(relativo, meta) {
  const arquivo = path.join(ASSETS, 'img', relativo);
  if (!fs.existsSync(arquivo)) return null;
  const { width, height } = dimensoes(arquivo);
  return {
    src: caminhoAsset(`img/${relativo.replace(/\\/g, '/')}`),
    width,
    height,
    alt: meta.alt,
    foco: meta.foco,
    focoDesktop: meta.focoDesktop,
  };
}

/** Imagens de uma especialidade (null = pendente, a página usa a composição de marca). */
export function imagensDe(esp) {
  return {
    hero: resolverImagem(`${esp.slug}/${esp.hero.imagem.arquivo}`, esp.hero.imagem),
    sintomas: resolverImagem(`${esp.slug}/${esp.sintomas.imagem.arquivo}`, esp.sintomas.imagem),
    estrutura: resolverImagem(site.fotoEstrutura.arquivo, site.fotoEstrutura),
    galeria: (site.galeriaEstrutura ?? [])
      .map((foto) => {
        const img = resolverImagem(foto.arquivo, foto);
        return img && { ...img, legenda: foto.legenda };
      })
      .filter(Boolean),
  };
}

/** Um médico com as fotos resolvidas (null nas que ainda não existem em src/assets/img). */
function medicoComFotos(id) {
  const m = medicos[id];
  if (!m) return null;
  const fotos = Object.fromEntries(Object.entries(m.fotos).map(([chave, foto]) => [chave, resolverImagem(foto.arquivo, foto)]));
  return { id, ...m, fotos };
}

/**
 * Médicos de uma especialidade: cartões da equipe (só quem tem retrato publicado) e os destaques
 * do meio e do fim da página (só quando a foto escolhida existe).
 */
export function equipeDe(esp) {
  const cfg = esp.medicos;
  if (!cfg) return { medicos: [], meio: null, final: null };
  const destaque = (d) => {
    const m = d && medicoComFotos(d.medico);
    const foto = m?.fotos[d.foto];
    return foto ? { ...m, foto } : null;
  };
  return {
    medicos: cfg.equipe.map(medicoComFotos).filter((m) => m?.fotos.retrato),
    meio: destaque(cfg.meio),
    final: destaque(cfg.final),
  };
}

/** Convênios com a logo resolvida (null = cartão com o nome). */
export const conveniosDe = () =>
  site.convenios.map((c) => ({ ...c, logo: resolverImagem(`convenios/${c.id}.webp`, { alt: c.nome }) }));

/** Fotos de médicos e logos configuradas mas ainda sem arquivo. */
function pendenciasExtras() {
  const usadas = new Set(
    especialidades.flatMap((esp) => {
      const cfg = esp.medicos;
      if (!cfg) return [];
      const fotos = cfg.equipe.flatMap((id) => [medicos[id]?.fotos.retrato, medicos[id]?.fotos.avatar]);
      for (const d of [cfg.meio, cfg.final]) if (d) fotos.push(medicos[d.medico]?.fotos[d.foto]);
      return fotos.filter(Boolean).map((f) => f.arquivo);
    }),
  );
  const logos = site.convenios.map((c) => `convenios/${c.id}.webp`);
  return [...usadas, ...logos].filter((arquivo) => !fs.existsSync(path.join(ASSETS, 'img', arquivo)));
}

function copiarPasta(origem, destino) {
  if (!fs.existsSync(origem)) return;
  fs.mkdirSync(destino, { recursive: true });
  for (const item of fs.readdirSync(origem, { withFileTypes: true })) {
    const de = path.join(origem, item.name);
    const para = path.join(destino, item.name);
    if (item.isDirectory()) copiarPasta(de, para);
    else fs.copyFileSync(de, para);
  }
}

export function build({ silencioso = false } = {}) {
  const log = silencioso ? () => {} : console.log;
  const inicio = performance.now();

  fs.rmSync(DIST, { recursive: true, force: true });
  const base = path.join(DIST, site.basePath.replace(/^\//, ''));

  const css = minificarCss(
    fs.readFileSync(path.join(SRC, 'styles/especialidades.css'), 'utf8').replaceAll('__ASSETS__', caminhoAsset('').replace(/\/$/, '')),
  );
  const js = minificarJs(fs.readFileSync(path.join(SRC, 'scripts/especialidades.js'), 'utf8'));
  const ano = new Date().getFullYear();

  const paginas = [];
  const pendentes = [];
  const convenios = conveniosDe();

  for (const esp of especialidades) {
    const imagens = imagensDe(esp);
    if (!imagens.hero) pendentes.push(`${esp.slug}/${esp.hero.imagem.arquivo}`);
    if (!imagens.sintomas) pendentes.push(`${esp.slug}/${esp.sintomas.imagem.arquivo}`);

    const og = fs.existsSync(path.join(ASSETS, 'og', `${esp.slug}.jpg`))
      ? caminhoAsset(`og/${esp.slug}.jpg`)
      : imagens.hero?.src ?? caminhoAsset('brand/uort-logo.png');

    const documento = renderEspecialidade({
      especialidade: esp,
      especialidades,
      imagens,
      equipe: equipeDe(esp),
      convenios,
      css,
      js,
      ogImagem: urlAbsoluta(og),
      ano,
    });

    const destino = path.join(base, esp.slug, 'index.html');
    fs.mkdirSync(path.dirname(destino), { recursive: true });
    fs.writeFileSync(destino, documento);
    paginas.push({ slug: esp.slug, caminho: caminhoPagina(esp.slug), arquivo: destino, bytes: Buffer.byteLength(documento) });
  }

  if (!site.fotoEstrutura || !imagensDe(especialidades[0]).estrutura) pendentes.push(site.fotoEstrutura.arquivo);
  const galeria = imagensDe(especialidades[0]).galeria.map((foto) => foto.src);
  for (const foto of site.galeriaEstrutura ?? []) {
    if (!galeria.some((src) => src.endsWith(foto.arquivo))) pendentes.push(foto.arquivo);
  }
  pendentes.push(...pendenciasExtras());

  for (const pasta of ['brand', 'img', 'og']) copiarPasta(path.join(ASSETS, pasta), path.join(base, 'assets', pasta));

  const hoje = new Date().toISOString().slice(0, 10);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paginas.map((p) => `  <url><loc>${urlAbsoluta(p.caminho)}</loc><lastmod>${hoje}</lastmod></url>`).join('\n')}
</urlset>
`;
  fs.writeFileSync(path.join(base, 'sitemap.xml'), sitemap);

  log(`\nUORT · especialidades — ${paginas.length} páginas em ${(performance.now() - inicio).toFixed(0)} ms\n`);
  for (const p of paginas) log(`  ${p.caminho.padEnd(32)} ${(p.bytes / 1024).toFixed(1).padStart(6)} KB`);
  log(`  ${`${site.basePath}/sitemap.xml`.padEnd(32)}`);
  if (pendentes.length) {
    log(`\n  Imagens pendentes em src/assets/img/ (até o arquivo existir, a página usa a composição de marca,`);
    log(`  o cartão com o nome do convênio ou omite a foto do médico):`);
    for (const p of pendentes) log(`   - ${p}`);
  }
  log('');

  return { paginas, pendentes };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) build();
