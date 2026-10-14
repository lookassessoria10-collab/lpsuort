# UORT · Landing pages de especialidades

Cinco landing pages de especialidade da **UORT Ortopedia e Traumatologia** (Salvador/BA), voltadas para
agendamento e para tráfego do Google Ads. Todas usam **um único modelo** com os mesmos blocos e componentes.
O conteúdo de cada uma vem de um arquivo de configuração próprio.

| Rota | Especialidade |
|---|---|
| `/especialidades/joelho` | Joelho |
| `/especialidades/coluna` | Coluna |
| `/especialidades/ombro` | Ombro |
| `/especialidades/quadril` | Quadril |
| `/especialidades/pe-e-tornozelo` | Pé e Tornozelo |

O site é estático: HTML, CSS e JavaScript puros, gerados por Node.js **sem dependências**. Segue o mesmo
padrão dos outros projetos UORT da agência (estático, publicado na Vercel).

## Comandos

```bash
npm run dev      # gera o site e serve em http://localhost:4321 (refaz o build quando src/ muda)
npm run build    # gera dist/especialidades/<slug>/index.html, assets e sitemap.xml
npm run lint     # valida o conteúdo (SEO, estrutura, termos proibidos, recursos, pendências)
npm test         # 50 testes sobre o HTML gerado (SEO, CTAs, WhatsApp, links, JSON-LD, conteúdo)
npm run check    # lint + build + testes
npm run imagens  # otimiza imagens e gera as imagens de compartilhamento (requer: npm i -D sharp)
```

Requer Node.js 20 ou superior.

## Estrutura

```
src/
  config/
    site.js                     dados institucionais: contatos, endereço, convênios, analytics, privacidade
    recursos.js                 recursos terapêuticos confirmados na clínica (ondas de choque, SIS…)
    especialidades/
      index.js                  registro e tipo (JSDoc) de uma especialidade
      joelho.js · coluna.js · ombro.js · quadril.js · pe-e-tornozelo.js
  layouts/SpecialtyLayout.js    sequência fixa dos blocos + <head>
  components/
    Header.js                   marca, menu compacto, CTA
    Hero.js                     bloco 01
    Symptoms.js                 bloco 02
    Conditions.js               bloco 03
    Evaluation.js               bloco 04
    Treatments.js               bloco 05
    Institutional.js            bloco 06
    Insurance.js                bloco 07
    Faq.js                      bloco 08
    FinalCta.js                 bloco 09
    Footer.js                   bloco 10
    MobileCta.js                CTA fixo no celular
    Cta.js                      botões de conversão (agendar, WhatsApp, telefone) com rastreamento
    Seo.js                      meta tags, Open Graph, canonical, JSON-LD, GTM/GA4
    Media.js · Icons.js         imagens (com fallback) e ícones lineares
  lib/                          template HTML com escape automático; links e mensagens de WhatsApp
  styles/especialidades.css     estilos mobile-first (inline no build)
  scripts/especialidades.js     eventos, menu, UTM/gclid, CTA fixo (inline no build)
  assets/                       logo, imagens publicadas, imagens de compartilhamento (og)
imagens-originais/              originais usados pelo npm run imagens
scripts/                        build, dev, lint, otimização de imagens
tests/                          testes (node:test)
docs/IMAGENS.md                 situação, especificações e briefing das imagens
```

## Blocos (idênticos nas cinco páginas)

1. **Hero**: eyebrow "UORT — Especialidade", H1 "Especialistas em [Especialidade]", subtítulo e dois CTAs.
2. **Sintomas**: título, quatro situações com ícones e cartão sobre a imagem.
3. **Condições**: 4 a 6 cartões com nome e descrição.
4. **Como funciona a avaliação**: trilha de quatro etapas, com aviso de que o fluxo varia por paciente.
5. **Tratamentos**: lista editorial. Recursos da clínica recebem o selo "Disponível na UORT".
6. **Por que escolher a UORT?**: diferenciais institucionais, cartão de localização e a galeria "Conheça a
   clínica", com fotos reais das salas.
7. **Convênios e facilidades**: painel compacto com convênios, contatos e CTA.
8. **Perguntas frequentes**: accordion nativo (`<details>`), com links para especialidades relacionadas.
9. **CTA final**: azul-petróleo, com texto adaptado à especialidade.
10. **Rodapé**: contatos, endereço, especialidades, links institucionais e privacidade.

## Como adicionar uma nova especialidade

1. Copie `src/config/especialidades/joelho.js` para `src/config/especialidades/<slug>.js`
   (slug minúsculo, sem acentos e com hífens, como `mao-e-punho`).
2. Preencha todos os campos com conteúdo **próprio** da especialidade. O teste de similaridade reprova textos
   que apenas trocam o nome. Use `**trecho**` para destaque em turquesa e `\n` para quebra em títulos.
3. Ícones dos sintomas: use um id de `src/components/Icons.js` ou desenhe um novo ícone lá (24×24, linear).
4. Tratamentos: cite em `recursos` apenas itens de `src/config/recursos.js` com `disponivel: true`, e só quando
   houver pertinência clínica.
5. Registre a especialidade em `src/config/especialidades/index.js` e, se quiser, inclua-a em `relacionadas`
   de outras páginas.
6. Imagens: siga `docs/IMAGENS.md`. Sem imagem, a página é publicada com a composição de marca.
7. Rode `npm run check` e, com o sharp instalado, `npm run imagens` para gerar a imagem de compartilhamento.

## Conversão e monitoramento

- **Agende sua consulta** abre o WhatsApp oficial com a mensagem de agendamento da especialidade, por exemplo:
  "Olá! Vim pela página de Joelho da UORT e gostaria de agendar uma consulta."
  Para usar outro canal (agendamento online), configure `site.agendamento = { canal: 'url', url: '…' }`.
- **Fale no WhatsApp** e **Consulte a disponibilidade** usam mensagens de dúvida e de convênio, geradas a
  partir do nome da especialidade.
- CTAs presentes em: cabeçalho, hero (2), condições, tratamentos, instituição, convênios, FAQ, CTA final,
  rodapé e barra fixa no celular. A barra aparece só quando os botões do hero e do CTA final estão fora da tela.

**Eventos** (um por clique, com proteção contra clique duplo):

| Evento | Parâmetros |
|---|---|
| `uort_cta_click` | `especialidade`, `cta_acao` (agendar, whatsapp, convenio, ligar, mapa), `cta_posicao`, `cta_canal`, `cta_id` (ex.: `joelho:hero:agendar`), `pagina` |
| `uort_faq_open` | `especialidade`, `faq_pergunta`, `pagina` |

Nenhuma ferramenta de monitoramento é instalada sem autorização. Enquanto `site.analytics` estiver vazio, os
eventos ficam apenas em `window.dataLayer`.
- Com `gtmId`, o Google Tag Manager é incluído. Crie gatilhos de "Evento personalizado" para
  `uort_cta_click`, usando `cta_acao` e `especialidade` como variáveis de camada de dados, e associe-os à
  conversão do Google Ads.
- Com `ga4Id` (sem GTM), os eventos vão por `gtag('event', …)`. Nunca há envio duplicado pelos dois caminhos.

**Atribuição:** `utm_*`, `gclid`, `gbraid` e `wbraid` da URL de entrada ficam guardados na sessão e são
repassados aos links entre especialidades.

## SEO

Cada página tem title, meta description e H1 exclusivos, canonical e Open Graph com imagem própria
(1200×630). Os dados estruturados (`MedicalClinic`, `MedicalWebPage`, `BreadcrumbList` e `FAQPage`) seguem a
mesma hierarquia de títulos sem saltos. Também há `alt` em todas as imagens, links internos para as demais
especialidades e o arquivo `/especialidades/sitemap.xml`. Ao publicar, inclua esse sitemap no `robots.txt` do
domínio principal.

## Publicação

O build gera tudo em `dist/`, sob o prefixo `/especialidades`, para conviver com o site institucional.
`vercel.json` já define a saída e URLs sem `.html`. As páginas ficam em `/especialidades/<slug>`, e a raiz
(`/` e `/especialidades`) redireciona temporariamente para `/especialidades/joelho`, porque não há página de índice.
O projeto está na Vercel ligado ao GitHub: cada push na `main` gera um novo deploy de produção.

Antes de publicar, resolva as pendências listadas por `npm run lint` (imagens, domínio, CEP, responsável
técnico, GTM).
