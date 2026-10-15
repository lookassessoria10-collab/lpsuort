/** @type {import('./index.js').Especialidade} */
export default {
  slug: 'pe-e-tornozelo',
  nome: 'Pé e Tornozelo',
  regiao: { nome: 'pé e tornozelo', artigo: 'o pé e o tornozelo', em: 'no pé e no tornozelo' },

  seo: {
    title: 'Especialista em Pé e Tornozelo em Salvador | UORT',
    description:
      'Avaliação de entorse, fascite plantar, joanete e instabilidade do tornozelo com a equipe de pé e tornozelo da UORT, em Salvador. Agende sua consulta.',
  },

  hero: {
    titulo: 'Dor no pé ou no tornozelo\n**a cada passo?**',
    subtitulo:
      'Avaliação e tratamento para dores, entorses e alterações que prejudicam o caminhar, com o cuidado indicado para cada caso.',
    imagem: {
      arquivo: 'hero.webp',
      alt: 'Ortopedista da UORT examinando o tornozelo de uma paciente sentada na maca',
      foco: '50% 50%',
    },
  },

  sintomas: {
    titulo: 'Cada passo conta.\n**E não deveria doer.**',
    itens: [
      { icone: 'foot', texto: 'Dor ao apoiar o pé' },
      { icone: 'drop', texto: 'Inchaço recorrente no tornozelo' },
      { icone: 'walk', texto: 'Desconforto ao caminhar' },
      { icone: 'run', texto: 'Dificuldade para praticar atividades físicas' },
    ],
    destaque: 'Cuidar dos pés é cuidar de **toda a sua rotina.**',
    imagem: {
      arquivo: 'sintomas.webp',
      alt: 'Corredor sentado em um banco segurando o tornozelo, com o tênis ao lado',
      foco: '20% 50%', // tornozelo à esquerda do cartão de destaque, inclusive no celular
    },
  },

  condicoes: {
    introducao:
      'Pés e tornozelos recebem o peso do corpo a cada passo. Dores, inchaços e deformidades na região interferem diretamente no caminhar e nas atividades do dia a dia.',
    itens: [
      {
        nome: 'Entorse de tornozelo',
        descricao:
          'Lesão dos ligamentos quando o pé vira, comum no esporte e em pisos irregulares. Merece avaliação, sobretudo com inchaço ou dor para apoiar.',
      },
      {
        nome: 'Fascite plantar',
        descricao: 'Dor na sola do pé, perto do calcanhar, que costuma ser mais forte nos primeiros passos da manhã.',
      },
      {
        nome: 'Joanete',
        descricao:
          'Desvio do dedão em direção aos outros dedos, chamado de hálux valgo, que pode causar dor e dificuldade com calçados.',
      },
      {
        nome: 'Tendinopatias',
        descricao:
          'Alterações no tendão de Aquiles, nos tendões fibulares e no tibial posterior, ligadas a sobrecarga e ao uso repetitivo.',
      },
      {
        nome: 'Instabilidade do tornozelo',
        descricao: 'Sensação de que o tornozelo “falseia” ou entorses que se repetem, muitas vezes depois de uma entorse anterior.',
      },
      {
        nome: 'Alterações estruturais do pé',
        descricao:
          'Pé plano, pé cavo e outras alterações do formato do pé, que podem gerar dor e sobrecarga em adultos e crianças.',
      },
    ],
  },

  avaliacao: {
    exame: 'Conversa sobre suas queixas e exame do pé e do tornozelo, com avaliação da pisada, da mobilidade e da estabilidade.',
    investigacao:
      'Calçados, atividades e histórico de entorses ou lesões. Radiografia com apoio, ultrassonografia ou ressonância são pedidas quando necessárias.',
  },

  tratamentos: {
    introducao:
      'Grande parte das dores no pé e no tornozelo pode ser tratada com medidas conservadoras. A conduta depende do diagnóstico, da rotina e das atividades de cada paciente.',
    itens: [
      {
        tipo: 'conservador',
        titulo: 'Tratamento conservador',
        texto: 'Orientações sobre calçados, palmilhas quando indicadas, ajuste de atividades e medicamentos, se necessário.',
      },
      {
        tipo: 'reabilitacao',
        titulo: 'Fisioterapia e reabilitação',
        texto:
          'Fortalecimento, alongamento e treino de equilíbrio, especialmente importantes após entorses e na instabilidade do tornozelo.',
        recursos: ['fisioterapia'],
      },
      {
        tipo: 'procedimento',
        titulo: 'Terapia por ondas de choque',
        texto: 'Pode ser indicada na fascite plantar e em tendinopatias, como a do tendão de Aquiles, conforme a avaliação.',
        recursos: ['ondas-de-choque'],
      },
      {
        tipo: 'cirurgico',
        titulo: 'Tratamento cirúrgico',
        texto:
          'Algumas deformidades, como joanetes mais avançados, e instabilidades que não melhoram com a reabilitação podem ter indicação cirúrgica. A decisão é individual.',
      },
    ],
  },

  instituicao: {
    introducao:
      'Para quem procura especialista em pé e tornozelo em Salvador, a UORT oferece avaliação ortopédica, fisioterapia e Pronto Atendimento para lesões agudas, como entorses.',
  },

  faq: [
    {
      pergunta: 'Entorse de tornozelo precisa de avaliação médica?',
      resposta:
        'Entorses leves podem melhorar em poucos dias, mas procure avaliação se houver dor forte para apoiar o pé, inchaço importante, hematoma ou entorses que se repetem. A UORT conta com Pronto Atendimento ortopédico {prontoAtendimento}.',
    },
    {
      pergunta: 'Por que a dor da fascite plantar é pior pela manhã?',
      resposta:
        'Durante o repouso, a fáscia plantar fica encurtada. Nos primeiros passos, ela é alongada de forma brusca, o que provoca dor. Com o movimento, o desconforto tende a diminuir, mas pode voltar depois de muito tempo em pé.',
    },
    {
      pergunta: 'Joanete só se resolve com cirurgia?',
      resposta:
        'O tratamento inicial costuma envolver calçados adequados, adaptações e controle da dor. A cirurgia é considerada quando a dor e a deformidade persistem e atrapalham a rotina, mesmo com essas medidas.',
    },
    {
      pergunta: 'O tipo de calçado influencia as dores nos pés?',
      resposta:
        'Sim. Calçados apertados, sem amortecimento ou com salto alto podem favorecer dor e agravar condições como joanete e fascite plantar. O especialista pode orientar sobre o calçado mais adequado para o seu caso.',
    },
    {
      pergunta: 'Quando posso voltar a correr depois de uma entorse?',
      resposta:
        'Depende da gravidade da lesão e da recuperação da força e do equilíbrio. Voltar cedo demais aumenta o risco de novas entorses. A reabilitação orientada ajuda a definir o momento certo.',
    },
  ],

  ctaFinal: {
    titulo: 'Seus passos merecem **atenção.**',
    texto: 'Conte com a UORT para avaliar dores e lesões no pé e no tornozelo e encontrar o cuidado adequado.',
  },

  mensagemWhatsApp: 'Olá! Vim pela página de Pé e Tornozelo da UORT e gostaria de agendar uma consulta.',

  relacionadas: ['joelho', 'quadril'],
};
