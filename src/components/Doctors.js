import { registro } from '../config/medicos.js';
import { html } from '../lib/html.js';
import { BotaoAgendar } from './Cta.js';
import { icon } from './Icons.js';
import { Imagem } from './Media.js';

/**
 * Médicos da especialidade (configurados em `medicos` no arquivo da especialidade).
 * Todo bloco que mostra um nome traz data-medicos e, na mesma página, o cartão com o CRM.
 */

/** "A", "A e B", "A, B e C" (aceita HTML). @param {unknown[]} itens */
const juntar = (itens) => itens.flatMap((item, i) => [i === 0 ? '' : i === itens.length - 1 ? ' e ' : ', ', item]);

/** "Dr. Luís Cláudio <b>Chagas</b>": o último nome em destaque. @param {string} nome */
function nomeComDestaque(nome) {
  const partes = nome.split(' ');
  return html`${partes.slice(0, -1).join(' ')} <b>${partes.at(-1)}</b>`;
}

/** Rostos da equipe no hero, com link para os cartões. Decorativos: os nomes vêm no texto ao lado. */
export function AvataresEquipe(lista) {
  if (!lista.length) return '';
  const rosto = (m) => Imagem({ ...(m.fotos.avatar ?? m.fotos.retrato), alt: '' }, { classe: 'avatar' });
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
        (m) => html`<li class="doc-card">
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

/** Destaque de um médico no meio da página (depois da avaliação): foto, formação e CRM. */
export function DestaqueMedico({ esp, equipe }) {
  const m = equipe.meio;
  if (!m) return '';
  return html`<section class="doc-spot" id="conheca-o-especialista" aria-labelledby="destaque-titulo" data-medicos>
  <div class="wrap">
    <div class="doc-spot-box">
      <div class="doc-spot-media"><div class="photo">${Imagem(m.foto)}</div></div>
      <div class="doc-spot-copy">
        <span class="eyebrow">Conheça o especialista</span>
        <h2 id="destaque-titulo">${nomeComDestaque(m.nome)}</h2>
        <p class="doc-area">${m.area}</p>
        ${m.formacao.length ? html`<ul class="doc-cred">${m.formacao.map((f) => html`<li>${icon('check')}<span>${f}</span></li>`)}</ul>` : ''}
        <p class="doc-crm">${registro(m)}</p>
        ${BotaoAgendar({ esp, posicao: 'medico' })}
      </div>
    </div>
  </div>
</section>`;
}

/** Foto de um médico no CTA final. */
export function FotoMedicoFinal(m) {
  if (!m) return '';
  return html`<figure class="final-doc" data-medicos>
      <div class="photo">${Imagem(m.foto)}</div>
      <figcaption><strong>${m.nome}</strong><span>${m.area}</span><span>${registro(m)}</span></figcaption>
    </figure>`;
}
