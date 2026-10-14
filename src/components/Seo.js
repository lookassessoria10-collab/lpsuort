import { site } from '../config/site.js';
import { html, plain, raw } from '../lib/html.js';
import { caminhoAsset, caminhoPagina, urlAbsoluta } from '../lib/links.js';

const FONTES =
  'https://fonts.googleapis.com/css2?family=Onest:wght@300;400;500;600&family=Figtree:wght@400;500;600&display=swap';

/** Dados estruturados: clínica, página médica, trilha de navegação e FAQ. */
export function dadosEstruturados({ esp, imagens, ogImagem }) {
  const url = urlAbsoluta(caminhoPagina(esp.slug));
  const clinicaId = `${site.links.site}#clinica`;
  const { endereco } = site;

  const clinica = {
    '@type': 'MedicalClinic',
    '@id': clinicaId,
    name: site.nome,
    legalName: site.razaoSocial,
    url: site.links.site,
    logo: urlAbsoluta(caminhoAsset('brand/uort-logo.png')),
    image: ogImagem,
    telephone: site.contato.telefone.e164,
    email: site.contato.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${endereco.logradouro}, ${endereco.edificio}, ${endereco.complemento.toLowerCase()}`,
      addressLocality: endereco.cidade,
      addressRegion: endereco.uf,
      addressCountry: endereco.pais,
      ...(endereco.cep ? { postalCode: endereco.cep } : {}),
    },
    areaServed: { '@type': 'City', name: endereco.cidade },
    medicalSpecialty: ['https://schema.org/Musculoskeletal', 'https://schema.org/Physiotherapy'],
    sameAs: [site.links.instagram, site.links.facebook],
  };

  const pagina = {
    '@type': 'MedicalWebPage',
    '@id': `${url}#pagina`,
    url,
    name: esp.seo.title,
    description: esp.seo.description,
    inLanguage: 'pt-BR',
    isPartOf: { '@type': 'WebSite', name: site.nome, url: site.links.site },
    publisher: { '@id': clinicaId },
    about: esp.condicoes.itens.map((c) => ({ '@type': 'MedicalCondition', name: c.nome })),
    specialty: 'https://schema.org/Musculoskeletal',
    breadcrumb: { '@id': `${url}#trilha` },
    ...(imagens.hero ? { primaryImageOfPage: urlAbsoluta(imagens.hero.src) } : {}),
  };

  const trilha = {
    '@type': 'BreadcrumbList',
    '@id': `${url}#trilha`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: site.marca, item: site.links.site },
      { '@type': 'ListItem', position: 2, name: `Especialistas em ${esp.nome}`, item: url },
    ],
  };

  const faq = {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: esp.faq.map((f) => ({
      '@type': 'Question',
      name: f.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: f.resposta },
    })),
  };

  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': [clinica, pagina, trilha, faq] });
  // Impede que "</script>" dentro do conteúdo encerre o bloco.
  return raw(`<script type="application/ld+json">${json.replace(/</g, '\\u003c')}</script>`);
}

/** Snippets de monitoramento. Nada é incluído enquanto os IDs estiverem vazios. */
export function analyticsHead() {
  const { gtmId, ga4Id } = site.analytics;
  if (gtmId) {
    return raw(`<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');</script>`);
  }
  if (ga4Id) {
    return raw(`<script async src="https://www.googletagmanager.com/gtag/js?id=${ga4Id}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}');</script>`);
  }
  return '';
}

export function analyticsBody() {
  const { gtmId } = site.analytics;
  return gtmId
    ? raw(`<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`)
    : '';
}

/** Conteúdo do <head>: título, descrição, canonical, Open Graph, fontes, CSS e dados estruturados. */
export function Head({ esp, imagens, css, ogImagem }) {
  const url = urlAbsoluta(caminhoPagina(esp.slug));
  const titulo = esp.seo.title;
  const descricao = esp.seo.description;

  return html`<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${titulo}</title>
<meta name="description" content="${descricao}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#0B252C">
<meta name="format-detection" content="telephone=no">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${site.nome}">
<meta property="og:title" content="${titulo}">
<meta property="og:description" content="${descricao}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImagem}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${plain(esp.hero.titulo)} — ${site.nome}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${caminhoAsset('brand/favicon.svg')}" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTES}">
${imagens.hero ? html`<link rel="preload" as="image" href="${imagens.hero.src}" fetchpriority="high">` : ''}
${analyticsHead()}
<style>${raw(css)}</style>
${dadosEstruturados({ esp, imagens, ogImagem })}`;
}
