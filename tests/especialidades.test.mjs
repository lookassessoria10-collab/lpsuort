import assert from 'node:assert/strict';
import fs from 'node:fs';
import { before, describe, test } from 'node:test';
import { build } from '../scripts/build.mjs';
import { lint, TERMOS_PROIBIDOS } from '../scripts/lint.mjs';
import { especialidades } from '../src/config/especialidades/index.js';
import { site } from '../src/config/site.js';

/** @type {Map<string, string>} */
const paginas = new Map();
let resultado;

before(() => {
  resultado = build({ silencioso: true });
  for (const p of resultado.paginas) paginas.set(p.slug, fs.readFileSync(p.arquivo, 'utf8'));
});

const textoVisivel = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

const meta = (html, atributo, nome) =>
  html.match(new RegExp(`<meta ${atributo}="${nome}" content="([^"]*)"`))?.[1];

const links = (html) => [...html.matchAll(/<a\s([^>]*)>/g)].map((m) => m[1]);
const attr = (tag, nome) => tag.match(new RegExp(`${nome}="([^"]*)"`))?.[1];
const decodificar = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

describe('build', () => {
  test('gera uma página por especialidade nas rotas esperadas', () => {
    assert.deepEqual(
      resultado.paginas.map((p) => p.caminho),
      ['joelho', 'coluna', 'ombro', 'quadril', 'pe-e-tornozelo'].map((s) => `/especialidades/${s}`),
    );
    for (const p of resultado.paginas) assert.ok(fs.existsSync(p.arquivo), p.arquivo);
  });

  test('sitemap lista as cinco URLs absolutas', () => {
    const sitemap = fs.readFileSync(new URL('../dist/especialidades/sitemap.xml', import.meta.url), 'utf8');
    for (const esp of especialidades) assert.match(sitemap, new RegExp(`${site.baseUrl}/especialidades/${esp.slug}<`));
  });

  test('o lint de conteúdo não tem erros', () => {
    assert.deepEqual(lint().erros, []);
  });

  test('o lint detecta nomes de médicos e promessas', () => {
    const detecta = (t) => TERMOS_PROIBIDOS.some(({ padrao }) => padrao.test(t));
    assert.ok(detecta('Agende com o Dr. Fulano'));
    assert.ok(detecta('Tratamento com cura garantida'));
    assert.ok(detecta('A melhor clínica de Salvador'));
    assert.ok(detecta('Emergência ortopédica 24h'));
    assert.ok(!detecta('Manter-se ativo costuma ser melhor do que ficar em repouso.'));
  });
});

for (const esp of especialidades) {
  describe(`/especialidades/${esp.slug}`, () => {
    const html = () => paginas.get(esp.slug);
    const url = `${site.baseUrl}/especialidades/${esp.slug}`;

    test('SEO: title, description, canonical e Open Graph próprios', () => {
      const h = html();
      assert.equal(h.match(/<title>([^<]*)<\/title>/)[1], esp.seo.title);
      assert.equal(decodificar(meta(h, 'name', 'description')), esp.seo.description);
      assert.match(h, new RegExp(`<link rel="canonical" href="${url}">`));
      assert.equal(meta(h, 'property', 'og:url'), url);
      assert.equal(meta(h, 'property', 'og:title'), esp.seo.title);
      assert.match(meta(h, 'property', 'og:image'), /^https:\/\/.+\.(jpg|webp|png)$/);
      assert.match(h, /<html lang="pt-BR">/);
    });

    test('um único H1 "Especialistas em …" e hierarquia de títulos sem saltos', () => {
      const h = html();
      const h1s = [...h.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
      assert.equal(h1s.length, 1);
      assert.equal(textoVisivel(h1s[0][1]), `Especialistas em ${esp.nome}`);
      const niveis = [...h.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
      niveis.forEach((n, i) => {
        if (i > 0) assert.ok(n - niveis[i - 1] <= 1, `salto de h${niveis[i - 1]} para h${n}`);
      });
    });

    test('imagens com alt e dimensões; pendentes não geram <img>', () => {
      const imgs = [...html().matchAll(/<img\s([^>]*)>/g)].map((m) => m[1]);
      for (const img of imgs) {
        assert.ok(attr(img, 'alt')?.trim(), `img sem alt: ${img}`);
        assert.ok(attr(img, 'width') && attr(img, 'height'), `img sem dimensões: ${img}`);
      }
      const pendentes = resultado.pendentes.filter((p) => p.startsWith(`${esp.slug}/`)).length;
      const galeria = (site.galeriaEstrutura ?? []).filter((f) => !resultado.pendentes.includes(f.arquivo)).length;
      assert.equal(imgs.length, 2 - pendentes + (resultado.pendentes.includes(site.fotoEstrutura.arquivo) ? 0 : 1) + galeria);
    });

    test('dados estruturados válidos: clínica, página médica, trilha e FAQ', () => {
      const bloco = html().match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
      const dados = JSON.parse(bloco);
      const tipos = dados['@graph'].map((n) => n['@type']);
      assert.deepEqual(tipos, ['MedicalClinic', 'MedicalWebPage', 'BreadcrumbList', 'FAQPage']);
      const faq = dados['@graph'].find((n) => n['@type'] === 'FAQPage');
      assert.deepEqual(
        faq.mainEntity.map((q) => q.name),
        esp.faq.map((f) => f.pergunta),
      );
      const clinica = dados['@graph'][0];
      assert.equal(clinica.telephone, site.contato.telefone.e164);
      assert.equal(clinica.address.addressLocality, 'Salvador');
    });

    test('WhatsApp: número oficial e mensagem identificando a especialidade', () => {
      const wa = links(html())
        .map((l) => attr(l, 'href'))
        .filter((href) => href?.startsWith('https://wa.me/'))
        .map(decodificar);
      assert.ok(wa.length >= 6);
      for (const href of wa) {
        const u = new URL(href);
        assert.equal(u.pathname, `/${site.contato.whatsapp.numero}`);
        assert.match(u.searchParams.get('text'), new RegExp(`página de ${esp.nome} da UORT`));
      }
      assert.ok(wa.some((href) => new URL(href).searchParams.get('text') === esp.mensagemWhatsApp));
    });

    test('CTAs rastreáveis em todas as posições estratégicas', () => {
      const ctas = links(html()).filter((l) => l.includes('data-cta='));
      const posicoes = new Set(ctas.map((l) => attr(l, 'data-cta-posicao')));
      for (const p of ['cabecalho', 'hero', 'condicoes', 'tratamentos', 'instituicao', 'convenios', 'faq', 'cta-final', 'barra-fixa', 'rodape']) {
        assert.ok(posicoes.has(p), `faltando CTA na posição "${p}"`);
      }
      const hero = ctas.filter((l) => attr(l, 'data-cta-posicao') === 'hero').map((l) => attr(l, 'data-cta'));
      assert.deepEqual(hero, ['agendar', 'whatsapp']);
      // Todo link de conversão (WhatsApp ou telefone) carrega os atributos de rastreamento.
      for (const l of links(html())) {
        const href = attr(l, 'href') ?? '';
        if (href.startsWith('https://wa.me/') || href.startsWith('tel:')) assert.ok(l.includes('data-cta='), l);
      }
      assert.match(html(), new RegExp(`<body data-especialidade="${esp.slug}"`));
    });

    test('links internos para as outras especialidades e âncoras válidas', () => {
      const h = html();
      const internos = links(h).filter((l) => l.includes('data-interno')).map((l) => attr(l, 'href'));
      for (const outra of especialidades) assert.ok(internos.includes(`/especialidades/${outra.slug}`), outra.slug);
      for (const rel of esp.relacionadas) {
        assert.match(h, new RegExp(`class="related"[\\s\\S]*href="/especialidades/${rel}"`));
      }
      const ids = [...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
      assert.equal(new Set(ids).size, ids.length, 'ids duplicados');
      for (const l of links(h)) {
        const href = attr(l, 'href');
        if (href?.startsWith('#')) assert.ok(ids.includes(href.slice(1)), `âncora sem destino: ${href}`);
        if (attr(l, 'target') === '_blank') assert.match(attr(l, 'rel') ?? '', /noopener/);
      }
    });

    test('comunicação institucional: sem nomes de médicos, promessas ou rankings', () => {
      const texto = textoVisivel(html());
      for (const { padrao, motivo } of TERMOS_PROIBIDOS) {
        if (padrao.source.includes('emerg')) continue; // a razão social contém "Urgência", não "emergência"
        assert.doesNotMatch(texto, padrao, motivo);
      }
      assert.doesNotMatch(html(), /(Chagas|Sadigursky|Meirelles|Sant.Anna|Cardozo|Tourinho|Brand[ãa]o|Andrade|Tavares)\b/);
    });

    test('convênios, contatos e endereço oficiais', () => {
      const texto = textoVisivel(html());
      for (const c of site.convenios) assert.ok(texto.includes(c), c);
      assert.ok(texto.includes(site.contato.telefone.exibicao));
      assert.ok(texto.includes(site.contato.whatsapp.exibicao));
      assert.ok(texto.includes('Centro Empresarial Thomé de Souza'));
      assert.match(html(), new RegExp(`href="tel:\\${site.contato.telefone.e164}"`));
    });
  });
}

describe('conteúdo diferenciado entre especialidades', () => {
  /** Texto exclusivo de cada especialidade (sem os blocos institucionais compartilhados). */
  const proprio = (esp) =>
    [
      esp.hero.subtitulo,
      esp.sintomas.titulo,
      ...esp.sintomas.itens.map((i) => i.texto),
      esp.condicoes.introducao,
      ...esp.condicoes.itens.flatMap((c) => [c.nome, c.descricao]),
      esp.avaliacao.exame,
      esp.avaliacao.investigacao,
      esp.tratamentos.introducao,
      ...esp.tratamentos.itens.map((t) => t.texto),
      ...esp.faq.flatMap((f) => [f.pergunta, f.resposta]),
    ]
      .join(' ')
      .toLowerCase();

  const trigramas = (texto) => {
    const p = texto.match(/[\p{L}\d]+/gu);
    return new Set(p.slice(2).map((_, i) => `${p[i]} ${p[i + 1]} ${p[i + 2]}`));
  };

  test('similaridade de trigramas entre páginas abaixo de 15%', () => {
    for (let i = 0; i < especialidades.length; i++) {
      for (let j = i + 1; j < especialidades.length; j++) {
        const a = trigramas(proprio(especialidades[i]));
        const b = trigramas(proprio(especialidades[j]));
        const inter = [...a].filter((t) => b.has(t)).length;
        const jaccard = inter / (a.size + b.size - inter);
        assert.ok(jaccard < 0.15, `${especialidades[i].slug} × ${especialidades[j].slug}: ${(jaccard * 100).toFixed(1)}%`);
      }
    }
  });
});
