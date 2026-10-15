/**
 * Prepara as imagens das landing pages (opcional; o build não depende deste script).
 *
 *   imagens-originais/<slug>/hero.(jpg|png|webp)      → src/assets/img/<slug>/hero.webp
 *   imagens-originais/<slug>/sintomas.(jpg|png|webp)  → src/assets/img/<slug>/sintomas.webp
 *   imagens-originais/institucional/estrutura.(...)   → src/assets/img/institucional/estrutura.webp
 *   imagens-originais/institucional/<foto>.(...)      → as fotos da galeria listadas em site.galeriaEstrutura
 *   + uma imagem de compartilhamento (Open Graph) por especialidade em src/assets/og/<slug>.jpg
 *   imagens-originais/equipe/<arquivo>.(...)          → src/assets/img/equipe/<arquivo>.webp (fotos dos médicos;
 *                                                       "-avatar" vira o círculo do hero)
 *   imagens-originais/convenios/<id>.(...)            → src/assets/img/convenios/<id>.webp (logos; id de site.convenios)
 *
 * Os originais da equipe já ficam recortados (retrato 4:5, avatar quadrado), reduzidos e sem metadados.
 *
 * Para processar só alguns grupos: npm run imagens -- equipe convenios
 * (grupos: especialidades, institucional, equipe, convenios; sem argumentos, todos).
 *
 * Requer o pacote "sharp", que não faz parte das dependências do projeto:
 *   npm i -D sharp   (ou aponte NODE_PATH para um node_modules que já o tenha)
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { especialidades } from '../src/config/especialidades/index.js';
import { site } from '../src/config/site.js';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);

let sharp;
try {
  sharp = require('sharp');
} catch {
  console.error('Este script precisa do pacote "sharp". Rode: npm i -D sharp');
  process.exit(1);
}

const ORIGEM = path.join(raiz, 'imagens-originais');
const DESTINO = path.join(raiz, 'src/assets/img');
const EXTENSOES = ['.jpg', '.jpeg', '.png', '.webp'];

/** Largura máxima publicada e largura mínima aceitável de cada tipo de imagem. */
const PERFIS = {
  hero: { max: 1520, min: 760 },
  sintomas: { max: 1200, min: 800 },
  estrutura: { max: 1200, min: 800 },
  galeria: { max: 1000, min: 760 },
  equipe: { max: 900, min: 360 },
  avatar: { max: 160, min: 96 },
  convenio: { max: 320, min: 120, qualidade: 90, aparar: true }, // aparar: remove a margem em volta da logo
};

const GRUPOS = process.argv.slice(2);
const incluir = (grupo) => !GRUPOS.length || GRUPOS.includes(grupo);

const encontrar = (pasta, nome) =>
  EXTENSOES.map((ext) => path.join(pasta, nome + ext)).find((arquivo) => fs.existsSync(arquivo));

async function otimizar(origem, destino, perfil) {
  // Lê e grava pelo Node: a libvips não abre caminhos longos no Windows (limite de 260 caracteres).
  let entrada = fs.readFileSync(origem);
  if (perfil.aparar) entrada = await sharp(entrada).trim({ threshold: 24 }).toBuffer();
  const meta = await sharp(entrada).metadata();
  let pipeline = sharp(entrada).rotate();
  let aviso = '';
  if (meta.width > perfil.max) {
    pipeline = pipeline.resize({ width: perfil.max });
  } else if (meta.width < perfil.min) {
    // Ampliação apenas para não publicar algo menor que a área de exibição. Substitua pelo original em alta.
    pipeline = pipeline.resize({ width: perfil.min, kernel: 'lanczos3' }).sharpen({ sigma: 0.6 });
    aviso = ` (AMPLIADA de ${meta.width}px: substitua por um original com pelo menos ${perfil.min * 2}px de largura)`;
  }
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  const { data, info } = await pipeline.webp({ quality: perfil.qualidade ?? 80, effort: 6 }).toBuffer({ resolveWithObject: true });
  fs.writeFileSync(destino, data);
  console.log(`✓ ${path.relative(raiz, destino)}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} KB${aviso}`);
}

const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Imagem de compartilhamento 1200×630 com a identidade da UORT. */
async function gerarOg(esp) {
  const destino = path.join(raiz, 'src/assets/og', `${esp.slug}.jpg`);
  const logo = await sharp(fs.readFileSync(path.join(raiz, 'src/assets/brand/uort-logo.png')))
    .resize({ width: 220 })
    .toBuffer();
  const titulo = esp.nome.length > 10 ? 64 : 76;
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#0B252C"/>
    <g fill="none" stroke="#00C2CB" stroke-opacity=".22"><circle cx="1010" cy="520" r="200"/><circle cx="1010" cy="520" r="300"/><circle cx="1010" cy="520" r="400"/></g>
    <path d="M900 110v190a110 110 0 0 0 220 0V110" fill="none" stroke="#00C2CB" stroke-opacity=".16" stroke-width="54"/>
    <rect x="80" y="296" width="40" height="2" fill="#00C2CB"/>
    <text x="80" y="268" font-family="Segoe UI, Arial, sans-serif" font-size="22" letter-spacing="5" fill="#00C2CB">ESPECIALIDADE · SALVADOR, BAHIA</text>
    <text x="80" y="390" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="300" fill="#FFFFFF">Especialistas em</text>
    <text x="80" y="${390 + titulo + 8}" font-family="Segoe UI, Arial, sans-serif" font-size="${titulo}" font-weight="600" fill="#00C2CB">${escapeXml(esp.nome)}</text>
  </svg>`;
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  const og = await sharp(Buffer.from(svg))
    .composite([{ input: await sharp(logo).tint('#ffffff').toBuffer(), left: 80, top: 80 }])
    .jpeg({ quality: 86 })
    .toBuffer();
  fs.writeFileSync(destino, og);
  console.log(`✓ ${path.relative(raiz, destino)}  1200×630`);
}

const pendentes = [];
if (incluir('especialidades')) {
  for (const esp of especialidades) {
    for (const nome of ['hero', 'sintomas']) {
      const origem = encontrar(path.join(ORIGEM, esp.slug), nome);
      if (origem) await otimizar(origem, path.join(DESTINO, esp.slug, `${nome}.webp`), PERFIS[nome]);
      else if (!fs.existsSync(path.join(DESTINO, esp.slug, `${nome}.webp`))) pendentes.push(`${esp.slug}/${nome}`);
    }
    await gerarOg(esp);
  }
}

if (incluir('institucional')) {
  const estrutura = encontrar(path.join(ORIGEM, 'institucional'), 'estrutura');
  if (estrutura) await otimizar(estrutura, path.join(DESTINO, 'institucional/estrutura.webp'), PERFIS.estrutura);
  else pendentes.push('institucional/estrutura');

  for (const foto of site.galeriaEstrutura ?? []) {
    const relativo = foto.arquivo.replace(/\.webp$/, '');
    const origem = encontrar(path.join(ORIGEM, path.dirname(relativo)), path.basename(relativo));
    if (origem) await otimizar(origem, path.join(DESTINO, foto.arquivo), PERFIS.galeria);
    else pendentes.push(relativo);
  }
}

/** Pastas convertidas por inteiro: cada original vira <pasta>/<nome>.webp em src/assets/img. */
const PASTAS = {
  equipe: (nome) => (nome.endsWith('-avatar') ? PERFIS.avatar : PERFIS.equipe),
  convenios: () => PERFIS.convenio,
};
for (const [pasta, perfil] of Object.entries(PASTAS)) {
  const dir = path.join(ORIGEM, pasta);
  if (!incluir(pasta) || !fs.existsSync(dir)) continue;
  for (const arquivo of fs.readdirSync(dir).filter((f) => EXTENSOES.includes(path.extname(f).toLowerCase()))) {
    const nome = path.parse(arquivo).name;
    await otimizar(path.join(dir, arquivo), path.join(DESTINO, pasta, `${nome}.webp`), perfil(nome));
  }
}
if (incluir('convenios')) {
  for (const c of site.convenios) {
    if (!fs.existsSync(path.join(DESTINO, 'convenios', `${c.id}.webp`))) pendentes.push(`convenios/${c.id}`);
  }
}

if (pendentes.length) console.log(`\nImagens ainda pendentes: ${pendentes.join(', ')}`);
