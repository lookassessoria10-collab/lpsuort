/** @type {import('./index.js').Especialidade} */
export default {
  slug: 'quadril',
  nome: 'Quadril',
  regiao: { nome: 'quadril', artigo: 'o quadril', em: 'no quadril' },

  seo: {
    title: 'Especialista em Quadril em Salvador | UORT Ortopedia',
    description:
      'Dor na virilha ou dificuldade para caminhar? Avaliação de artrose, bursite, impacto femoroacetabular e lesões do quadril na UORT, em Salvador.',
  },

  hero: {
    titulo: 'Especialistas\nem **Quadril**',
    subtitulo: 'Avaliação e tratamento para dor, perda de mobilidade e alterações articulares do quadril.',
    imagem: {
      arquivo: 'hero.webp',
      alt: 'Ortopedista da UORT flexionando a perna de uma paciente deitada na maca para avaliar o quadril',
      foco: '50% 40%',
    },
  },

  sintomas: {
    titulo: 'Quando o quadril dói,\n**cada passo pesa.**',
    itens: [
      { icone: 'target', texto: 'Dor na região da virilha' },
      { icone: 'walk', texto: 'Dificuldade para caminhar' },
      { icone: 'chair', texto: 'Rigidez ao levantar' },
      { icone: 'calendar', texto: 'Limitação para atividades diárias' },
    ],
    destaque: 'A dor no quadril nem sempre vem do quadril. **Avaliar é essencial.**',
    imagem: {
      arquivo: 'sintomas.webp',
      alt: 'Homem caminhando em casa com a mão na lateral do quadril',
      foco: '50% 50%',
    },
  },

  condicoes: {
    introducao:
      'O quadril liga o tronco às pernas e suporta grandes cargas ao caminhar, subir escadas e praticar esportes. A dor na região pode vir da articulação, dos tendões ou até da coluna.',
    itens: [
      {
        nome: 'Artrose do quadril',
        descricao:
          'Desgaste da cartilagem que causa dor na virilha, rigidez e dificuldade para calçar sapatos ou cruzar as pernas.',
      },
      {
        nome: 'Bursite trocantérica',
        descricao:
          'Dor na lateral do quadril, que piora ao deitar sobre o lado afetado e ao subir escadas. Faz parte da chamada síndrome dolorosa do trocânter maior.',
      },
      {
        nome: 'Tendinopatias',
        descricao:
          'Alterações nos tendões dos glúteos, dos adutores e de outros músculos do quadril, frequentes em corredores e em mulheres acima dos 40 anos.',
      },
      {
        nome: 'Impacto femoroacetabular',
        descricao:
          'Alteração no formato do fêmur ou do acetábulo que gera atrito na articulação e dor ao dobrar o quadril, comum em adultos jovens e ativos.',
      },
      {
        nome: 'Lesões do labrum',
        descricao:
          'Lesões no anel de fibrocartilagem que contorna o acetábulo, que podem causar dor, estalos ou sensação de travamento.',
      },
      {
        nome: 'Outras alterações articulares',
        descricao:
          'Condições como a osteonecrose da cabeça do fêmur e alterações do desenvolvimento do quadril, que também exigem avaliação especializada.',
      },
    ],
  },

  avaliacao: {
    exame: 'Conversa sobre suas queixas e exame do quadril, com testes de mobilidade, de força e da forma como você caminha.',
    investigacao:
      'Onde a dor aparece, quando ela piora e se há relação com a coluna. Radiografia e ressonância são pedidas quando necessárias.',
  },

  tratamentos: {
    introducao:
      'O tratamento depende da causa da dor, da idade e do nível de atividade. Em muitos casos, o primeiro passo é conservador; em outros, a avaliação pode indicar procedimentos ou cirurgia.',
    itens: [
      {
        tipo: 'conservador',
        titulo: 'Tratamento conservador',
        texto:
          'Orientações sobre carga e atividades, controle do peso quando necessário e medicamentos quando indicados.',
      },
      {
        tipo: 'reabilitacao',
        titulo: 'Fisioterapia e reabilitação',
        texto: 'Fortalecimento dos músculos do quadril e do tronco, ganho de mobilidade e treino de marcha, na própria clínica.',
        recursos: ['fisioterapia'],
      },
      {
        tipo: 'procedimento',
        titulo: 'Terapia por ondas de choque',
        texto: 'Pode ser indicada em tendinopatias e na dor da lateral do quadril, conforme a avaliação.',
        recursos: ['ondas-de-choque'],
      },
      {
        tipo: 'procedimento',
        titulo: 'Infiltrações',
        texto: 'Podem ser indicadas em casos selecionados, como bursite e artrose, para o controle da dor.',
        recursos: ['infiltracoes'],
      },
      {
        tipo: 'cirurgico',
        titulo: 'Tratamento cirúrgico',
        texto:
          'Casos avançados de artrose e algumas alterações articulares podem ter indicação de cirurgia, como a artroplastia (prótese). A decisão é individual e discutida com o paciente.',
      },
    ],
  },

  instituicao: {
    introducao:
      'Para quem procura especialista em quadril em Salvador, a UORT oferece avaliação ortopédica e acompanhamento da reabilitação no mesmo endereço.',
  },

  faq: [
    {
      pergunta: 'Dor na virilha pode ser problema no quadril?',
      resposta:
        'Sim. A dor na virilha é uma das queixas mais típicas de alterações da articulação do quadril, como artrose e impacto femoroacetabular. Ela também pode ter outras origens, como hérnias ou problemas na coluna, por isso a avaliação é importante.',
    },
    {
      pergunta: 'Dor na lateral do quadril é bursite?',
      resposta:
        'Pode ser, mas nem sempre. A dor lateral costuma estar ligada aos tendões dos glúteos e à bursa trocantérica, e também pode ser referida da coluna. O exame clínico ajuda a diferenciar as causas.',
    },
    {
      pergunta: 'Artrose no quadril sempre leva à prótese?',
      resposta:
        'Não. Muitas pessoas controlam os sintomas por anos com fisioterapia, exercícios e outras medidas. A prótese é considerada quando a dor e a limitação comprometem a qualidade de vida apesar do tratamento.',
    },
    {
      pergunta: 'Quem corre tem mais problemas no quadril?',
      resposta:
        'A corrida, por si só, não causa problemas no quadril. Aumentos rápidos de volume, falta de fortalecimento e alterações no formato da articulação podem favorecer dor e lesões. A avaliação ajuda a ajustar o treino com segurança.',
    },
    {
      pergunta: 'Que exames podem ser pedidos para avaliar o quadril?',
      resposta:
        'A radiografia costuma ser o primeiro exame para avaliar a articulação. A ressonância magnética pode ser indicada para investigar labrum, tendões e cartilagem. O especialista define o que é necessário em cada caso.',
    },
  ],

  ctaFinal: {
    titulo: 'Seu quadril merece **atenção.**',
    texto: 'Conte com a UORT para avaliar a dor no quadril e encontrar o cuidado adequado para o seu caso.',
  },

  mensagemWhatsApp: 'Olá! Vim pela página de Quadril da UORT e gostaria de agendar uma consulta.',

  relacionadas: ['coluna', 'joelho'],
};
