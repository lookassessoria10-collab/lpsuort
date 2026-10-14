# Imagens das landing pages

Cada especialidade usa **duas imagens próprias**: uma no hero (bloco 01) e outra na seção de sintomas (bloco 02).
O bloco "Por que escolher a UORT?" usa **uma foto real da estrutura** da clínica e, logo abaixo, a galeria
"Conheça a clínica" com fotos reais das salas (configurada em `site.galeriaEstrutura`, em `src/config/site.js`).

Enquanto um arquivo não existir, a página exibe uma composição de marca (arcos e o "U" do logotipo)
no lugar da foto. Ela é discreta e não imita uma fotografia. Nenhuma imagem inadequada é publicada.

## Situação atual

| Especialidade | Hero | Sintomas |
|---|---|---|
| Joelho | ✅ referência aprovada, **em baixa resolução** (353 px, ampliada para 760 px) | ✅ referência aprovada, **em baixa resolução** (397 px, ampliada para 800 px) |
| Coluna | ✅ 1600 × 2000 | ✅ 1600 × 1333 |
| Ombro | ✅ 1122 × 1402 | ✅ 1374 × 1145 |
| Quadril | ✅ 1122 × 1402 | ✅ 1374 × 1145 |
| Pé e Tornozelo | ✅ 1122 × 1402 | ✅ 1374 × 915 (faixa superior cortada para o tornozelo não ficar sob o cartão no celular) |

As imagens de coluna, ombro, quadril e pé e tornozelo foram geradas por IA, no estilo das de joelho.

| Institucional | Arquivo | Origem |
|---|---|---|
| Foto do bloco (recepção) | `institucional/estrutura` | ✅ foto real (DSC01025), recortada em 4:5 |
| Galeria: Consultório | `institucional/consultorio` | ✅ foto real (DSC01027) |
| Galeria: Sala de raio X | `institucional/raio-x` | ✅ foto real (DSC01035) |
| Galeria: Aplicação de medicamentos | `institucional/aplicacao-medicamentos` | ✅ foto real (DSC01030) |

As fotos reais vieram da sessão de fotos da clínica (Sony, 7008 × 4672). Em `imagens-originais/institucional/`
ficam versões reduzidas (até 2400 px) e sem metadados da câmera. As legendas seguem a sinalização das portas.
Também há fotos da entrada com o logo (DSC01021), de um segundo consultório (DSC01029), da porta do raio X
(DSC01033) e de uma sala com maca (DSC01039), que podem entrar na galeria se for útil.

As duas imagens de joelho foram extraídas da referência aprovada (`landing-page-uort.html`). Substitua-as pelos
originais em alta resolução assim que estiverem disponíveis. A imagem de sintomas de joelho tem o texto
"Existe um caminho de volta para o movimento" aplicado no canto inferior direito; o cartão da página cobre
essa área em todos os tamanhos de tela, mas o ideal é receber a versão **sem texto**.

A foto do médico usada no bloco 4 da referência **não** foi aproveitada, porque as páginas não podem dar
protagonismo a profissionais individuais.

## Como adicionar ou substituir

1. Coloque o arquivo original em `imagens-originais/<slug>/hero.jpg` e `imagens-originais/<slug>/sintomas.jpg`
   (aceita `.jpg`, `.png` ou `.webp`). Para a estrutura: `imagens-originais/institucional/estrutura.jpg`.
2. Rode `npm run imagens` (requer `npm i -D sharp`). O script gera WebP otimizado em `src/assets/img/`.
   Sem o sharp, exporte o WebP manualmente com os tamanhos abaixo e salve direto em `src/assets/img/<slug>/`.
3. Rode `npm run build`. A página passa a usar a foto automaticamente, com `width`/`height` lidos do arquivo.
4. Ajuste o `alt` e o enquadramento (`foco`, em `object-position`) no arquivo da especialidade, se necessário.
   Para um enquadramento diferente no desktop (a partir de 861 px), use `focoDesktop`. Em ombro e coluna, ele
   tira o logo do jaleco de trás do botão "Agende sua consulta" do cabeçalho.

## Especificações

| Uso | Proporção exibida | Largura do original | Peso final |
|---|---|---|---|
| Hero (desktop: metade direita, com fusão suave à esquerda) | vertical ~ 0,9:1; no celular, recorte horizontal | ≥ 1520 px | ≤ 180 KB (WebP) |
| Sintomas (cartão arredondado, com destaque sobreposto no canto inferior direito) | 397 : 336 (~ 1,18:1) | ≥ 1600 px | ≤ 140 KB (WebP) |
| Estrutura da UORT | 4 : 5 (desktop) / 4 : 3 (celular) | ≥ 1200 px | ≤ 160 KB (WebP) |

Direção visual comum a todas: luz clara e difusa, fundo branco ou azul-esverdeado muito suave, jaleco com a
marca UORT quando houver profissional em cena, enquadramento nas mãos e na região avaliada (sem destacar rosto
de médico), paciente sereno (sem expressão exagerada de dor). No hero, deixar o **terço esquerdo da imagem
limpo**, porque ele se funde ao fundo da página. Na imagem de sintomas, deixar o **canto inferior direito
livre**, onde fica o cartão de destaque.

## Briefing por especialidade

Prompts prontos para gerar estas imagens por IA, no mesmo estilo das de joelho: [PROMPTS-IMAGENS.md](PROMPTS-IMAGENS.md).

**Coluna** — Hero: ortopedista avaliando a região lombar de paciente em pé ou sentado de costas, mãos na
coluna lombar. Sintomas: pessoa com a mão na lombar ao se levantar da cadeira ou ao fim do dia de trabalho.

**Ombro** — Hero: ortopedista examinando o ombro, conduzindo a elevação do braço do paciente.
Sintomas: pessoa com a mão no ombro ao tentar alcançar algo em uma prateleira ou após atividade física.

**Quadril** — Hero: paciente deitado na maca enquanto o ortopedista testa a mobilidade do quadril
(flexão e rotação da perna). Sintomas: pessoa com a mão na lateral do quadril ao levantar ou ao caminhar.

**Pé e Tornozelo** — Hero: ortopedista examinando o tornozelo de paciente sentado na maca.
Sintomas: pessoa sentada segurando o tornozelo, com tênis esportivo ao lado.

**Estrutura** — Recepção, consultório ou área de fisioterapia da UORT, sem pacientes identificáveis.
Se houver profissionais, apenas em foto coletiva já aprovada.

Evitar: radiografias artificiais, efeitos "holográficos" exagerados, anatomia incorreta, banco de imagem com
cara de genérico, e a mesma foto em mais de uma especialidade.

**Efeito de raio X:** as cinco especialidades usam a sobreposição estilizada de raio X na articulação, como nas
imagens aprovadas de joelho. Isso diverge da diretriz original de evitar radiografias artificiais. Se a decisão
mudar, regenere as dez imagens sem o efeito (veja [PROMPTS-IMAGENS.md](PROMPTS-IMAGENS.md)).
