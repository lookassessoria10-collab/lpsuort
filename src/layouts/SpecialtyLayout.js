import { site } from '../config/site.js';
import { Conditions } from '../components/Conditions.js';
import { Evaluation } from '../components/Evaluation.js';
import { Faq } from '../components/Faq.js';
import { FinalCta } from '../components/FinalCta.js';
import { Footer } from '../components/Footer.js';
import { Header } from '../components/Header.js';
import { Hero } from '../components/Hero.js';
import { sprite } from '../components/Icons.js';
import { Institutional } from '../components/Institutional.js';
import { Insurance } from '../components/Insurance.js';
import { MobileCta } from '../components/MobileCta.js';
import { analyticsBody, Head } from '../components/Seo.js';
import { Symptoms } from '../components/Symptoms.js';
import { Treatments } from '../components/Treatments.js';
import { html, raw } from '../lib/html.js';
import { interpolar } from '../lib/links.js';

/** Aplica os marcadores de conteúdo ({prontoAtendimento}) em todos os textos da especialidade. */
function interpolarTudo(valor) {
  if (typeof valor === 'string') return interpolar(valor);
  if (Array.isArray(valor)) return valor.map(interpolarTudo);
  if (valor && typeof valor === 'object') {
    return Object.fromEntries(Object.entries(valor).map(([k, v]) => [k, interpolarTudo(v)]));
  }
  return valor;
}

const modoAnalytics = () => (site.analytics.gtmId ? 'gtm' : site.analytics.ga4Id ? 'gtag' : 'nenhum');

/**
 * Layout compartilhado: a mesma sequência de blocos para todas as especialidades.
 * @param {{
 *   especialidade: import('../config/especialidades/index.js').Especialidade,
 *   especialidades: import('../config/especialidades/index.js').Especialidade[],
 *   imagens: { hero: any, sintomas: any, estrutura: any },
 *   css: string,
 *   js: string,
 *   ogImagem: string,
 *   ano: number,
 * }} p
 */
export function renderEspecialidade({ especialidade, especialidades, imagens, css, js, ogImagem, ano }) {
  const esp = interpolarTudo(especialidade);
  const ctx = { esp, especialidades, imagens, ano };

  const corpo = html`${Header(ctx)}
<main id="conteudo">
${Hero(ctx)}
${Symptoms(ctx)}
${Conditions(ctx)}
${Evaluation(ctx)}
${Treatments(ctx)}
${Institutional(ctx)}
${Insurance(ctx)}
${Faq(ctx)}
${FinalCta(ctx)}
</main>
${Footer(ctx)}
${MobileCta(ctx)}`;

  return String(html`<!doctype html>
<html lang="pt-BR">
<head>
${Head({ esp, imagens, css, ogImagem })}
<script>document.documentElement.classList.add('js')</script>
</head>
<body data-especialidade="${esp.slug}" data-analytics="${modoAnalytics()}">
${analyticsBody()}
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
${sprite(String(corpo))}
${corpo}
<script>${raw(js)}</script>
</body>
</html>
`);
}
