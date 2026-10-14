import { html } from '../lib/html.js';
import { icon } from './Icons.js';

/** Bloco 04: como funciona a avaliação. Trilha numerada (horizontal no desktop, vertical no celular). */
export function Evaluation({ esp }) {
  const etapas = [
    { titulo: 'Consulta e avaliação clínica', texto: esp.avaliacao.exame },
    { titulo: 'Investigação dos sintomas e do histórico', texto: esp.avaliacao.investigacao },
    {
      titulo: 'Definição da conduta conforme o diagnóstico',
      texto: 'Você entende o diagnóstico e as opções de tratamento indicadas para o seu caso, para decidir junto com o especialista.',
    },
    {
      titulo: 'Acompanhamento quando indicado',
      texto: 'Retornos e reabilitação para acompanhar a evolução, quando o tratamento exigir.',
    },
  ];

  return html`<section class="steps" id="avaliacao" aria-labelledby="avaliacao-titulo">
  <div class="wrap">
    <div class="steps-head">
      <span class="eyebrow">Avaliação</span>
      <h2 id="avaliacao-titulo">Como funciona <b>a avaliação</b></h2>
      <p class="lead">Uma consulta para entender a sua queixa ${esp.regiao.em} e definir o cuidado adequado.</p>
    </div>
    <ol class="steps-list">
      ${etapas.map(
        (etapa, i) => html`<li class="step">
        <span class="step-num" aria-hidden="true">${i + 1}</span>
        <h3>${etapa.titulo}</h3>
        <p>${etapa.texto}</p>
      </li>`,
      )}
    </ol>
    <p class="steps-note">${icon('pulse')}Cada caso é avaliado individualmente. As etapas podem variar conforme a necessidade de cada paciente.</p>
  </div>
</section>`;
}
