import { site } from '../config/site.js';
import { attrs, html } from '../lib/html.js';
import { caminhoPagina, linkWhatsApp, mensagens } from '../lib/links.js';
import { LinkTelefone } from './Cta.js';
import { icon } from './Icons.js';

/** Bloco 10: rodapé com marca, contatos oficiais, endereço, links e privacidade. */
export function Footer({ esp, especialidades, ano }) {
  const { contato, endereco, links } = site;
  const externo = (href, rotulo, ico) =>
    html`<li><a href="${href}" target="_blank" rel="noopener">${icon(ico)}${rotulo}<span class="sr-only"> (abre em nova aba)</span></a></li>`;

  return html`<footer class="foot">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <span class="logo" role="img" aria-label="UORT Ortopedia e Traumatologia"></span>
        <p>Clínica de Ortopedia e Traumatologia em Salvador, com fisioterapia, RPG e Pronto Atendimento ortopédico.</p>
      </div>
      <div>
        <p class="foot-title">Contato</p>
        <ul class="foot-list">
          <li>${LinkTelefone({ posicao: 'rodape' })}</li>
          <li><a href="${linkWhatsApp(mensagens(esp).agendamento)}" target="_blank" rel="noopener" data-cta="whatsapp" data-cta-posicao="rodape" data-cta-canal="whatsapp">${icon('wa')}${contato.whatsapp.exibicao}<span class="sr-only"> (abre o WhatsApp)</span></a></li>
          <li><a href="mailto:${contato.email}">${icon('mail')}${contato.email}</a></li>
          <li class="foot-address">${icon('pin')}<address>${endereco.edificio}<br>${endereco.logradouro}, ${endereco.complemento.toLowerCase()}<br>${endereco.bairro}, ${endereco.cidade} - ${endereco.uf}</address></li>
        </ul>
      </div>
      <nav aria-label="Especialidades">
        <p class="foot-title">Especialidades</p>
        <ul class="foot-list">
          ${especialidades.map(
            (e) =>
              html`<li><a href="${caminhoPagina(e.slug)}" data-interno${attrs({
                'aria-current': e.slug === esp.slug ? 'page' : null,
              })}>Especialistas em ${e.nome}</a></li>`,
          )}
        </ul>
      </nav>
      <nav aria-label="Institucional">
        <p class="foot-title">Institucional</p>
        <ul class="foot-list">
          ${externo(links.site, 'Site da UORT', 'globe')}
          ${externo(links.instagram, 'Instagram', 'instagram')}
          ${externo(links.facebook, 'Facebook', 'facebook')}
        </ul>
      </nav>
    </div>
    <div class="foot-bottom">
      <p>© ${ano} ${site.razaoSocial} · CNPJ ${site.cnpj}${site.responsavelTecnico ? html` · ${site.responsavelTecnico}` : ''}</p>
      <p><strong>Privacidade:</strong> ${site.privacidade.texto}${
        site.privacidade.url ? html` <a href="${site.privacidade.url}">Política de privacidade</a>.` : ''
      }</p>
      <p>As informações desta página são educativas e não substituem a avaliação médica.</p>
    </div>
  </div>
</footer>`;
}
