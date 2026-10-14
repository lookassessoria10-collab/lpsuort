/**
 * Template de HTML com escape automático.
 * Tudo o que é interpolado em html`` é escapado, exceto o que já for SafeHtml
 * (resultado de outro html``, de raw() ou de rich()).
 */
export class SafeHtml {
  /** @param {string} value */
  constructor(value) {
    this.value = value;
  }
  toString() {
    return this.value;
  }
}

const ENTIDADES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** @param {unknown} value */
export const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ENTIDADES[c]);

/** Marca uma string como HTML confiável (use só com conteúdo gerado pelo próprio projeto). */
export const raw = (value) => new SafeHtml(String(value));

/** @param {unknown} value @returns {string} */
function renderizar(value) {
  if (value == null || value === false || value === true) return '';
  if (value instanceof SafeHtml) return value.value;
  if (Array.isArray(value)) return value.map(renderizar).join('');
  return escape(value);
}

/** @param {TemplateStringsArray} strings @param {...unknown} values */
export function html(strings, ...values) {
  let out = strings[0];
  values.forEach((value, i) => {
    out += renderizar(value) + strings[i + 1];
  });
  return new SafeHtml(out);
}

/**
 * Converte o texto de conteúdo em HTML: **trecho** vira destaque e \n vira <br>.
 * @param {string} texto
 */
export function rich(texto) {
  return raw(
    escape(texto)
      .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
      .replace(/\s*\n\s*/g, '<br>'),
  );
}

/** Versão em texto puro (para meta tags, JSON-LD e atributos). @param {string} texto */
export const plain = (texto) => texto.replace(/\*\*/g, '').replace(/\s*\n\s*/g, ' ').trim();

/** Atributos a partir de um objeto; valores nulos ou false são omitidos. @param {Record<string, unknown>} attrs */
export function attrs(attrs) {
  return raw(
    Object.entries(attrs)
      .filter(([, v]) => v != null && v !== false)
      .map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${escape(v)}"`))
      .join(''),
  );
}
