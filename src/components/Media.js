import { attrs, html, raw } from '../lib/html.js';

/**
 * @typedef {{ src: string, width: number, height: number, alt: string, foco?: string, focoDesktop?: string }} ImagemResolvida
 */

/**
 * Imagem com dimensões explícitas (evita deslocamento de layout).
 * O enquadramento vai em variáveis CSS (--foco e, se houver, --foco-desktop) lidas pela folha de estilo.
 * @param {ImagemResolvida} img
 * @param {{ prioridade?: boolean }} [opcoes]
 */
export function Imagem(img, { prioridade = false } = {}) {
  const foco = [img.foco && `--foco:${img.foco}`, img.focoDesktop && `--foco-desktop:${img.focoDesktop}`].filter(Boolean);
  return html`<img${attrs({
    src: img.src,
    width: img.width,
    height: img.height,
    alt: img.alt,
    loading: prioridade ? null : 'lazy',
    fetchpriority: prioridade ? 'high' : null,
    decoding: 'async',
    style: foco.length ? foco.join(';') : null,
  })}>`;
}

/**
 * Composição de marca exibida enquanto a foto da especialidade não é aprovada.
 * Usa o "U" do logotipo e arcos concêntricos; é decorativa e não simula uma foto.
 * @param {string} id identificador único do gradiente na página
 */
export function MotivoMarca(id) {
  return raw(`<svg class="motif" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
  <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#178C9C"/><stop offset="1" stop-color="#00C2CB"/></linearGradient></defs>
  <g fill="none" stroke="#178C9C" stroke-opacity=".12"><circle cx="390" cy="330" r="110"/><circle cx="390" cy="330" r="180"/><circle cx="390" cy="330" r="250"/><circle cx="390" cy="330" r="320"/></g>
  <path d="M338 236v94a52 52 0 0 0 104 0v-94" fill="none" stroke="url(#${id})" stroke-width="30" opacity=".22"/>
  <circle cx="390" cy="330" r="5" fill="#00C2CB" opacity=".5"/>
</svg>`);
}

/**
 * Foto ou, na falta dela, a composição de marca.
 * @param {ImagemResolvida | null} img
 * @param {{ id: string, prioridade?: boolean, classe?: string }} opcoes
 */
export function Midia(img, { id, prioridade = false, classe = 'photo' }) {
  return img
    ? html`<div class="${classe}">${Imagem(img, { prioridade })}</div>`
    : html`<div class="${classe} is-pending" data-imagem-pendente="${id}">${MotivoMarca(`g-${id}`)}</div>`;
}
