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
    log(`\n  Imagens pendentes (a página usa a composição de marca até o arquivo existir em src/assets/img/):`);
    for (const p of pendentes) log(`   - ${p}`);
  }
  log('');

  return { paginas, pendentes };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) build();
