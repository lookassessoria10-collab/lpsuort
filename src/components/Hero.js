import { site } from '../config/site.js';
import { html, rich } from '../lib/html.js';
import { BotaoAgendar } from './Cta.js';
import { AvataresEquipe } from './Doctors.js';
import { icon } from './Icons.js';
import { Midia } from './Media.js';

/**
 * Bloco 01: primeira dobra. Texto à esquerda, imagem dominante à direita com transição suave.
 * O H1 fala da dor do paciente; "Especialistas em [Especialidade]" fica no eyebrow, logo acima.
 * Um único botão de ação (WhatsApp) e, quando há médicos configurados, os rostos da equipe.
 */
export function Hero({ esp, imagens, equipe }) {
  return html`<section class="hero" id="inicio" aria-labelledby="hero-titulo">
  ${Midia(imagens.hero, { id: 'hero', prioridade: true })}
  <div class="wrap">
    <div class="hero-copy">
      <span class="eyebrow">UORT <i></i> Especialistas em ${esp.nome}</span>
      <h1 id="hero-titulo">${rich(esp.hero.titulo)}</h1>
      <p class="lead">${esp.hero.subtitulo}</p>
      <div class="actions">
        ${BotaoAgendar({ esp, posicao: 'hero' })}
      </div>
      ${AvataresEquipe(equipe.medicos)}
      <p class="hero-note">${icon('pin')}${site.endereco.bairro}, ${site.endereco.cidade} · Particular e convênios</p>
    </div>
  </div>
</section>`;
}
