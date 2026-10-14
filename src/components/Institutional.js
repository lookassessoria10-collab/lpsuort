import { recursos } from '../config/recursos.js';
import { site } from '../config/site.js';
import { html } from '../lib/html.js';
import { interpolar } from '../lib/links.js';
import { BotaoAgendar } from './Cta.js';
import { icon } from './Icons.js';
import { Imagem } from './Media.js';

const REABILITACAO = new Set(['fisioterapia', 'rpg', 'cinesioterapia']);

/** "a, b e c" */
const listar = (itens) => (itens.length < 2 ? itens.join('') : `${itens.slice(0, -1).join(', ')} e ${itens.at(-1)}`);

/** Recursos da clínica citados pela especialidade (além da reabilitação, que já tem um item próprio). */
function recursosDaEspecialidade(esp) {
  const ids = esp.tratamentos.itens.flatMap((t) => t.recursos ?? []).filter((id) => !REABILITACAO.has(id));
  const nomes = [...new Set(ids)].filter((id) => recursos[id]?.disponivel).map((id) => recursos[id].nomeCurto);
  if (!nomes.length) return null;
  const texto = listar(nomes);
  return {
    icone: 'pulse',
    titulo: 'Recursos disponíveis na clínica',
    texto: `${texto[0].toUpperCase()}${texto.slice(1)}, indicados conforme a avaliação de cada caso.`,
  };
}

/** Bloco 06: por que escolher a UORT. Autoridade atribuída à instituição, nunca a um profissional. */
export function Institutional({ esp, imagens }) {
  const itens = [...site.diferenciais];
  const extra = recursosDaEspecialidade(esp);
  if (extra) itens.splice(2, 0, extra);
  const { endereco } = site;

  return html`<section class="why${imagens.estrutura ? ' has-photo' : ''}" id="por-que-uort" aria-labelledby="uort-titulo">
  <div class="wrap why-main">
    <div class="why-media">
      ${imagens.estrutura ? html`<div class="photo">${Imagem(imagens.estrutura)}</div>` : ''}
      <div class="place-card">
        <span class="eyebrow eyebrow-light">Onde estamos</span>
        <p class="place-title">${endereco.bairro}<br><span>${endereco.cidade}, ${endereco.uf}</span></p>
        <address>${endereco.edificio}<br>${endereco.logradouro}<br>${endereco.complemento}</address>
        <a class="place-link" href="${endereco.mapaUrl}" target="_blank" rel="noopener" data-cta="mapa" data-cta-posicao="instituicao" data-cta-canal="mapa">Ver no mapa${icon('arrow')}<span class="sr-only"> (abre o Google Maps)</span></a>
      </div>
    </div>
    <div class="why-copy">
      <span class="eyebrow">A UORT</span>
      <h2 id="uort-titulo">Por que escolher <b>a UORT?</b></h2>
      <p class="lead">${esp.instituicao.introducao}</p>
      <ul class="why-list">
        ${itens.map(
          (item) => html`<li>
          <span class="why-ico">${icon(item.icone)}</span>
          <div><h3>${item.titulo}</h3><p>${interpolar(item.texto)}</p></div>
        </li>`,
        )}
      </ul>
      ${BotaoAgendar({ esp, posicao: 'instituicao' })}
    </div>
  </div>
  ${Galeria(imagens.galeria ?? [])}
</section>`;
}

/** Fotos reais das salas da clínica, logo abaixo do bloco institucional. */
function Galeria(fotos) {
  if (!fotos.length) return '';
  return html`<div class="wrap tour">
    <div class="tour-head">
      <span class="eyebrow">Estrutura</span>
      <h3>Conheça a clínica</h3>
      <p>Fotos reais da UORT, no ${site.endereco.edificio}.</p>
    </div>
    <ul class="tour-grid">
      ${fotos.map(
        (foto) => html`<li><figure>
        <div class="photo">${Imagem(foto)}</div>
        <figcaption>${foto.legenda}</figcaption>
      </figure></li>`,
      )}
    </ul>
  </div>`;
}
