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
npm test         # 55 testes sobre o HTML gerado (SEO, CTAs, WhatsApp, médicos, links, JSON-LD, conteúdo)
npm run check    # lint + build + testes
npm run imagens  # otimiza imagens e gera as imagens de compartilhamento (requer: npm i -D sharp)
npm run imagens -- equipe convenios   # só os grupos indicados (especialidades, institucional, equipe, convenios)
```

Requer Node.js 20 ou superior.

## Estrutura

```
src/
  config/
    site.js                     dados institucionais: contatos, endereço, convênios, analytics, privacidade
    recursos.js                 recursos terapêuticos confirmados na clínica (ondas de choque, SIS…)
    medicos.js                  médicos: nome, CRM, RQE, área, formação e fotos
    especialidades/
      index.js                  registro e tipo (JSDoc) de uma especialidade
      joelho.js · coluna.js · ombro.js · quadril.js · pe-e-tornozelo.js
  layouts/SpecialtyLayout.js    sequência fixa dos blocos + <head>
  components/
    Header.js                   marca, menu compacto, CTA
    Hero.js                     bloco 01
    Doctors.js                  bloco 01b (equipe), 04b (destaque), avatares do hero e foto do CTA final
    Symptoms.js                 bloco 02
    Conditions.js               bloco 03
    Evaluation.js               bloco 04
    Treatments.js               bloco 05
    Institutional.js            bloco 06
    Insurance.js                bloco 07
    Faq.js                      bloco 08
    FinalCta.js                 bloco 09
    Footer.js                   bloco 10
    Cta.js                      botões de conversão (agendar, WhatsApp, telefone, flutuante) com rastreamento
    Seo.js                      meta tags, Open Graph, canonical, JSON-LD, GTM/GA4
    Media.js · Icons.js         imagens (com fallback) e ícones lineares
  lib/                          template HTML com escape automático; links e mensagens de WhatsApp
  styles/especialidades.css     estilos mobile-first (inline no build)
  scripts/especialidades.js     eventos, menu, UTM/gclid (inline no build)
  assets/                       logo, imagens publicadas, imagens de compartilhamento (og)
imagens-originais/              originais usados pelo npm run imagens
scripts/                        build, dev, lint, otimização de imagens
tests/                          testes (node:test)
docs/IMAGENS.md                 situação, especificações e briefing das imagens
```

## Blocos (idênticos nas cinco páginas)

1. **Hero**: eyebrow "UORT — Especialistas em [Especialidade]", H1 com a dor do paciente ("Sofrendo com dor no
   joelho?"), subtítulo, um único botão "Agendar pelo WhatsApp" e os rostos da equipe com os nomes.
   1b. **Equipe** (quando há médicos): cartões com foto, nome, área e CRM, lado a lado.
2. **Sintomas**: título, quatro situações com ícones e cartão sobre a imagem.
3. **Condições**: 4 a 6 cartões com nome e descrição.
4. **Como funciona a avaliação**: trilha de quatro etapas, com aviso de que o fluxo varia por paciente.
   4b. **Conheça o especialista** (opcional): outra foto de um dos médicos, com formação e CRM.
5. **Tratamentos**: lista editorial. Recursos da clínica recebem o selo "Disponível na UORT".
6. **Por que escolher a UORT?**: diferenciais institucionais, cartão de localização e a galeria "Conheça a
   clínica", com fotos reais das salas.
7. **Convênios e facilidades**: logos dos convênios (cartão com o nome enquanto a logo não existe), contatos e CTA.
8. **Perguntas frequentes**: accordion nativo (`<details>`), com links para especialidades relacionadas.
9. **CTA final**: azul-petróleo, com texto adaptado à especialidade, um único botão e, opcionalmente, a foto de
   um médico.
10. **Rodapé**: contatos, endereço, especialidades, links institucionais e privacidade.

Em todas as páginas, o **botão flutuante do WhatsApp** fica fixo no canto inferior direito (só o ícone no
celular; ícone e "Agendar pelo WhatsApp" no desktop).

## Médicos

Os dados ficam em `src/config/medicos.js` (fonte: página "Especialistas" do site oficial) e cada especialidade
escolhe quem aparece em `medicos`:

```js
medicos: {
  equipe: ['alexandre-meirelles', 'alan-chagas'],             // cartões e avatares do hero
  meio: { medico: 'alexandre-meirelles', foto: 'consulta' },  // destaque depois da avaliação
  final: { medico: 'alan-chagas', foto: 'consultorio' },      // foto no CTA final
},
```

Todo médico exibido tem o CRM no cartão (Resolução CFM nº 2.336/2023); o lint exige o CRM e avisa enquanto o
RQE não for informado. Fora desses blocos, o texto das páginas continua sem nomes de médicos. Pé e Tornozelo
ainda não tem fotos e é publicada sem os blocos de equipe.

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

- **Agendar pelo WhatsApp** (botão principal de cada bloco e botão flutuante) abre o WhatsApp oficial com a
  mensagem de agendamento da especialidade, por exemplo:
  "Olá! Vim pela página de Joelho da UORT e gostaria de agendar uma consulta."
  Para usar outro canal (agendamento online), configure `site.agendamento = { canal: 'url', url: '…' }`; o
  botão principal passa a se chamar "Agende sua consulta" e o flutuante continua no WhatsApp.
- **Tire sua dúvida no WhatsApp** (FAQ) e **Consultar meu convênio** (com o ícone do WhatsApp) usam mensagens de
  dúvida e de convênio, geradas a partir do nome da especialidade.
- Um botão por bloco: cabeçalho, hero, condições, destaque do médico, tratamentos, instituição, convênios, FAQ,
  CTA final, rodapé e o botão flutuante (posição `flutuante`).

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
