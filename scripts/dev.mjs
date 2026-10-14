/**
 * Servidor local: gera o site, serve dist/ com URLs amigáveis e refaz o build quando src/ muda.
 *   npm run dev  →  http://localhost:4321/especialidades/joelho
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const PORTA = Number(process.env.PORT) || 4321;
const RAIZ = path.resolve(import.meta.dirname, '..');
const DIST = path.join(RAIZ, 'dist');
const BASE = path.join(DIST, 'especialidades');

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
};

/** O build roda em um processo separado para sempre ler a versão atual dos arquivos de src/. */
const gerar = () => spawnSync(process.execPath, [path.join(RAIZ, 'scripts/build.mjs')], { stdio: 'inherit' }).status === 0;

const paginas = () =>
  fs.existsSync(BASE)
    ? fs.readdirSync(BASE).filter((nome) => fs.existsSync(path.join(BASE, nome, 'index.html'))).map((nome) => `/especialidades/${nome}`)
    : [];

function indice() {
  const links = paginas().map((p) => `<li><a href="${p}">${p}</a></li>`).join('');
  return `<!doctype html><meta charset="utf-8"><title>UORT · especialidades (local)</title>
<style>body{font:16px/1.6 system-ui;margin:48px;color:#0B252C}a{color:#0C5E6B}</style>
<h1>UORT · landing pages de especialidades</h1><ul>${links}</ul>`;
}

gerar();

const servidor = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORTA}`);
  const caminho = decodeURIComponent(url.pathname);
  if (caminho === '/') {
    res.writeHead(200, { 'content-type': TIPOS['.html'] });
    return res.end(indice());
  }
  if (caminho.length > 1 && caminho.endsWith('/')) {
    res.writeHead(301, { location: caminho.slice(0, -1) + url.search });
    return res.end();
  }
  let arquivo = path.join(DIST, path.normalize(caminho));
  if (!arquivo.startsWith(DIST)) {
    res.writeHead(403);
    return res.end();
  }
  if (fs.existsSync(arquivo) && fs.statSync(arquivo).isDirectory()) arquivo = path.join(arquivo, 'index.html');
  if (!fs.existsSync(arquivo)) {
    res.writeHead(404, { 'content-type': TIPOS['.html'] });
    return res.end('<!doctype html><meta charset="utf-8"><p>Página não encontrada. <a href="/">Ver páginas</a></p>');
  }
  res.writeHead(200, { 'content-type': TIPOS[path.extname(arquivo)] ?? 'application/octet-stream', 'cache-control': 'no-store' });
  fs.createReadStream(arquivo).pipe(res);
});

servidor.listen(PORTA, () => {
  console.log(`Servidor local: http://localhost:${PORTA}`);
  for (const p of paginas()) console.log(`  http://localhost:${PORTA}${p}`);
});

let agendado;
fs.watch(path.join(RAIZ, 'src'), { recursive: true }, () => {
  clearTimeout(agendado);
  agendado = setTimeout(() => {
    console.log('Alteração detectada, gerando novamente…');
    gerar();
  }, 150);
});
