import { registro } from '../config/medicos.js';
import { html } from '../lib/html.js';
import { BotaoAgendar } from './Cta.js';
import { icon } from './Icons.js';
import { Imagem } from './Media.js';

/**
 * Médicos da especialidade (configurados em `medicos` no arquivo da especialidade).
 * Numa página com vários médicos, todos aparecem do mesmo jeito e no mesmo tamanho, na ordem da
 * configuração: avatar no hero, cartão na equipe, slide em "Conheça os especialistas" e avatar no
 * CTA final. Cada bloco com nomes traz data-medicos; cada médico, data-medico="<id>".
 */

/** "A", "A e B", "A, B e C" (aceita HTML). @param {unknown[]} itens */
const juntar = (itens) => itens.flatMap((item, i) => [i === 0 ? '' : i === itens.length - 1 ? ' e ' : ', ', item]);

/** "Dr. Luís Cláudio <b>Chagas</b>": o último nome em destaque. @param {string} nome */
function nomeComDestaque(nome) {
  const partes = nome.split(' ');
  return html`${partes.slice(0, -1).join(' ')} <b>${partes.at(-1)}</b>`;
}

/** Rosto decorativo (o nome vem no texto ao lado). */
const rosto = (m) => Imagem({ ...(m.fotos.avatar ?? m.fotos.retrato), alt: '' }, { classe: 'avatar' });

/** Rostos da equipe no hero, com link para os cartões. */
export function AvataresEquipe(lista) {
  if (!lista.length) return '';
  return html`<a class="hero-team" href="#especialistas" data-medicos>
        <span class="avatars">${lista.map(rosto)}</span>
        <span class="hero-team-txt">Atendimento com ${juntar(lista.map((m) => html`<b>${m.nome}</b>`))}</span>
      </a>`;
}

/** Bloco 01b: a equipe da especialidade, logo depois do hero. Foto, nome, área e CRM. */
export function Equipe({ esp, equipe }) {
  const lista = equipe.medicos;
  if (!lista.length) return '';
  const varios = lista.length > 1;
  return html`<section class="team" id="especialistas" aria-labelledby="equipe-titulo" data-n="${lista.length}" data-medicos>
  <div class="wrap">
    <div class="team-head">
      <span class="eyebrow">Quem atende você</span>
      <h2 id="equipe-titulo">${varios ? 'Especialistas' : 'Especialista'} em <b>${esp.nome}</b></h2>
      <p class="lead">Conheça ${varios ? 'os ortopedistas da UORT que atendem' : 'o ortopedista da UORT que atende'} pacientes com dor ${esp.regiao.em}.</p>
    </div>
    <ul class="team-grid">
      ${lista.map(
        (m) => html`<li class="doc-card" data-medico="${m.id}">
        <div class="photo">${Imagem(m.fotos.retrato)}</div>
        <div class="doc-info">
          <h3>${m.nome}</h3>
          <p class="doc-area">${m.area}</p>
          <p class="doc-crm">${registro(m)}</p>
        </div>
      </li>`,
      )}
    </ul>
  </div>
</section>`;
}

/** Conteúdo de um slide: foto, nome, área, formação, CRM e o botão de agendamento. */
function Slide(esp, m, { titulo }) {
  return html`<div class="doc-spot-media"><div class="photo">${Imagem(m.foto)}</div></div>
        <div class="doc-spot-copy">
          ${titulo}
          <p class="doc-area">${m.area}</p>
          ${m.formacao.length ? html`<ul class="doc-cred">${m.formacao.map((f) => html`<li>${icon('check')}<span>${f}</span></li>`)}</ul>` : ''}
          <p class="doc-crm">${registro(m)}</p>
          ${BotaoAgendar({ esp, posicao: 'medico' })}
        </div>`;
}

/**
 * Bloco 04b: "Conheça os especialistas", depois da avaliação. Um médico: um destaque fixo.
 * Vários: banner rotativo com um slide por médico, todos com o mesmo layout, e os nomes de todos
 * sempre visíveis nos botões acima. Sem JavaScript, os slides ficam lado a lado com rolagem.
 */
export function DestaqueMedico({ esp, equipe }) {
  const lista = equipe.destaques;
  if (!lista.length) return '';

  if (lista.length === 1) {
    const [m] = lista;
    return html`<section class="doc-spot" id="conheca-o-especialista" aria-labelledby="destaque-titulo" data-medicos>
  <div class="wrap">
    <div class="doc-spot-box" data-medico="${m.id}">
      ${Slide(esp, m, {
        titulo: html`<span class="eyebrow">Conheça o especialista</span>
          <h2 id="destaque-titulo">${nomeComDestaque(m.nome)}</h2>`,
      })}
    </div>
  </div>
</section>`;
  }

  return html`<section class="doc-spot is-carousel" id="conheca-os-especialistas" aria-labelledby="destaques-titulo" data-medicos>
  <div class="wrap">
    <div class="doc-spot-head">
      <span class="eyebrow">Quem cuida de você</span>
      <h2 id="destaques-titulo">Conheça os <b>especialistas</b></h2>
      <ul class="doc-tabs" aria-label="Escolha o especialista">
        ${lista.map(
          (m, i) => html`<li><a class="doc-tab" href="#medico-${m.id}" data-ir="${i}" data-medico="${m.id}"${
            i === 0 ? html` aria-current="true"` : ''
          }>${rosto(m)}<span>${m.nome}</span></a></li>`,
        )}
      </ul>
    </div>
    <div class="doc-carousel" role="region" aria-roledescription="carrossel" aria-labelledby="destaques-titulo" data-carrossel>
      <ul class="doc-track" data-trilha>
        ${lista.map(
          (m, i) => html`<li class="doc-spot-box" id="medico-${m.id}" aria-roledescription="slide" aria-label="${i + 1} de ${lista.length}: ${m.nome}" data-medico="${m.id}">
        ${Slide(esp, m, { titulo: html`<h3 class="doc-spot-name">${nomeComDestaque(m.nome)}</h3>` })}
      </li>`,
        )}
      </ul>
    </div>
  </div>
</section>`;
}

/**
 * Médicos no CTA final. Um médico com foto "final": retrato ao lado do texto.
 * Vários: todos em lista, com avatar, nome e CRM do mesmo tamanho.
 */
export function MedicosFinal(lista) {
  if (!lista.length) return '';
  if (lista.length === 1) {
    const [m] = lista;
    return html`<figure class="final-doc" data-medicos data-medico="${m.id}">
      <div class="photo">${Imagem(m.foto)}</div>
      <figcaption><strong>${m.nome}</strong><span>${m.area}</span><span>${registro(m)}</span></figcaption>
    </figure>`;
  }
  return html`<div class="final-team" data-medicos>
      <p class="final-team-title">Atendimento com</p>
      <ul>
        ${lista.map(
          (m) => html`<li data-medico="${m.id}">${Imagem({ ...m.foto, alt: '' }, { classe: 'avatar' })}<div><strong>${m.nome}</strong><span>${registro(m)}</span></div></li>`,
        )}
      </ul>
    </div>`;
}
