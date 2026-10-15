import { attrs, html, raw } from '../lib/html.js';

/**
 * Ícones lineares (24×24). Cada página inclui no sprite apenas os ícones que usa.
 * Para um novo sintoma, adicione o desenho aqui e referencie o id na configuração.
 */
const linha = (d, largura = 1.6) =>
  `<g fill="none" stroke="currentColor" stroke-width="${largura}" stroke-linecap="round" stroke-linejoin="round">${d}</g>`;

export const ICONES = {
  // Ações
  arrow: linha('<path d="M7 17 17 7M9 7h8v8"/>', 2),
  right: linha('<path d="M4 12h15M13 6l6 6-6 6"/>', 1.8),
  chevron: linha('<path d="m6 9 6 6 6-6"/>', 1.8),
  check: linha('<path d="m5 12.5 4.5 4.5L19 7.5"/>', 1.8),
  wa:
    '<path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z"/>' +
    '<path fill="currentColor" d="M16.2 14c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1l-.7.9c-.1.1-.3.2-.5.1a6 6 0 0 1-3-2.6c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.4a.9.9 0 0 0-.7.3 2.7 2.7 0 0 0-.8 2c0 1.2.8 2.3 1 2.5.1.1 1.7 2.6 4.1 3.6 1.5.6 2.1.7 2.9.6.5-.1 1.3-.6 1.5-1.1.2-.5.2-1 .1-1.1l-.4-.3Z"/>',
  phone: linha(
    '<path d="M5.2 4h3.3l1.7 4.2-2.1 1.4a11 11 0 0 0 6.3 6.3l1.4-2.1 4.2 1.7v3.3a1.6 1.6 0 0 1-1.7 1.6A16.5 16.5 0 0 1 3.6 5.7 1.6 1.6 0 0 1 5.2 4Z"/>',
  ),
  pin: linha('<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.4"/>'),
  clock: linha('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
  mail: linha('<rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="m4.5 7.5 7.5 5.5 7.5-5.5"/>'),
  instagram: linha('<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.8"/><circle cx="17" cy="7" r=".6"/>', 1.5),
  facebook: linha('<path d="M14 21v-7.5h2.6l.4-3H14V8.8c0-.9.3-1.5 1.6-1.5H17V4.7A21 21 0 0 0 14.8 4.5c-2.2 0-3.8 1.4-3.8 3.9v2.1H8.5v3H11V21"/>', 1.5),
  globe: linha('<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.3 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.3-3.5-8.5s1.1-6.1 3.5-8.5Z"/>', 1.5),

  // Sintomas
  stairs: linha('<path d="M3 20h5v-5h5v-5h5V5h3"/>'),
  sun: linha(
    '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>',
  ),
  run: linha(
    '<circle cx="15" cy="4.5" r="1.8"/><path d="M6 21l3.5-5.5 3 2.5L11 22M8 10.5l3.5-3 3 1.5 2 3.5h3M12.5 17l1.5-6.5M9.5 15.5 4 14"/>',
  ),
  calendar: linha(
    '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2"/>',
  ),
  spine: linha(
    '<rect x="9.2" y="2.5" width="5.6" height="3.4" rx="1.3"/><rect x="8.8" y="7.4" width="6.4" height="3.7" rx="1.4"/><rect x="8.3" y="12.6" width="7.4" height="3.9" rx="1.5"/><rect x="7.8" y="18" width="8.4" height="3.5" rx="1.5"/>',
  ),
  radiate: linha('<path d="M13.5 2.5 6 13.5h5.5L10 21.5 18 10h-5.6l1.1-7.5Z"/>'),
  stiff: linha('<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3M12 14.5v2"/>'),
  bend: linha(
    '<circle cx="17" cy="5.5" r="1.9"/><path d="M15.4 7.8 9.5 11.6l.4 4.9-.9 4.5M9.5 11.6l3 4.4.4 5M14 8.7l1.4 5M6.4 9.2 5 8.3M6 11.8H4.2"/>',
  ),
  arm: linha(
    '<circle cx="10.5" cy="5" r="1.9"/><path d="M10.5 7.6v6.6l-2.6 6.8M10.5 14.2l2.6 6.8M10.5 9.2 7 12.6M10.5 9.2l4.6-5.6M14.3 10.2l1.5.9M15.8 8l1.7-.2"/>',
  ),
  moon: linha('<path d="M19.5 14.5A8 8 0 1 1 9.5 4.5a6.5 6.5 0 0 0 10 10Z"/>'),
  reach: linha('<path d="M4 8h16"/><rect x="12.5" y="3.5" width="5" height="4.5" rx=".9"/><path d="M8 21V11.5M5 14.5l3-3 3 3"/>'),
  dumbbell: linha('<path d="M6.5 7.5v9M17.5 7.5v9M4 10v4M20 10v4M6.5 12h11"/>'),
  target: linha('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".9" fill="currentColor"/>'),
  walk: linha(
    '<circle cx="13.5" cy="4.5" r="1.9"/><path d="M12.8 7.6 11 13.6l-3 7.4M11 13.6l3 3.4-.4 4M12.4 9.2 9 12.2M12.6 9.2l3.4 2.6"/>',
  ),
  chair: linha('<path d="M6.5 3.5v17M6.5 13h10v7.5M19.5 10V3.8M17.3 6l2.2-2.2L21.7 6"/>'),
  foot: linha(
    '<path d="M9.4 9.8c0-2.6 1.4-3.9 3.2-3.9 1.9 0 3.1 1.6 3 4.2-.1 2.5-1.4 3.7-1.6 6.1-.2 2.6-.7 4.4-2.7 4.4-1.9 0-2.4-1.7-2.3-4 .2-2.7.4-4.3.4-6.8Z"/><circle cx="9.6" cy="3.4" r="1.1"/><circle cx="12" cy="2.8" r=".9"/><circle cx="14.1" cy="3.1" r=".8"/><circle cx="15.8" cy="4.1" r=".7"/>',
    1.5,
  ),
  drop: linha('<path d="M12 3.5s-6 6.6-6 10.8a6 6 0 0 0 12 0c0-4.2-6-10.8-6-10.8Z"/><path d="M9.2 14.6a2.9 2.9 0 0 0 2.4 2.7"/>'),

  // Institucional
  team: linha(
    '<circle cx="9" cy="8" r="3"/><path d="M3.5 19.5a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.4"/><path d="M15.6 14.1a4.6 4.6 0 0 1 5 4.6"/>',
  ),
  rehab: linha('<path d="M19.6 12a7.6 7.6 0 0 1-13.7 4.6M4.4 12a7.6 7.6 0 0 1 13.7-4.6"/><path d="M18.4 3.6v4h-4M5.6 20.4v-4h4"/>'),
  pulse: linha('<path d="M3 12h4l2.5-6 5 12 2.5-6h4"/>'),
};

/**
 * @param {keyof typeof ICONES} id
 * @param {string} [classe]
 */
export const icon = (id, classe) =>
  html`<svg${attrs({ class: classe })} aria-hidden="true" focusable="false"><use href="#i-${id}"/></svg>`;

/** Gera o sprite apenas com os ícones referenciados no HTML final. @param {string} documento */
export function sprite(documento) {
  const usados = [...new Set([...documento.matchAll(/href="#i-([a-z-]+)"/g)].map((m) => m[1]))];
  const faltando = usados.filter((id) => !ICONES[id]);
  if (faltando.length) throw new Error(`Ícone(s) inexistente(s): ${faltando.join(', ')}`);
  const simbolos = usados.map((id) => `<symbol id="i-${id}" viewBox="0 0 24 24">${ICONES[id]}</symbol>`).join('');
  return raw(`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${simbolos}</defs></svg>`);
}
