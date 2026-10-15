/** @type {import('./index.js').Especialidade} */
export default {
  slug: 'joelho',
  nome: 'Joelho',
  regiao: { nome: 'joelho', artigo: 'o joelho', em: 'no joelho' },

  seo: {
    title: 'Especialista em Joelho em Salvador | UORT Ortopedia',
    description:
      'Especialistas em joelho em Salvador: avaliação de dor, artrose e lesões de menisco e ligamentos na UORT, no Caminho das Árvores. Agende sua consulta.',
  },

  hero: {
    titulo: 'Sofrendo com\n**dor no joelho?**',
    subtitulo:
      'Avaliação com especialistas em joelho para descobrir a causa da dor e definir o tratamento adequado para o seu caso.',
    imagem: {
      arquivo: 'hero.webp',
      alt: 'Ortopedista da UORT avaliando o joelho de um paciente sentado',
      foco: '50% 30%',
    },
  },

  sintomas: {
    titulo: 'Conviver com a dor virou rotina...\n**mas não deveria.**',
    itens: [
      { icone: 'stairs', texto: 'Dor ao subir ou descer escadas' },
      { icone: 'sun', texto: 'Rigidez ao acordar' },
      { icone: 'run', texto: 'Dificuldade para praticar esportes' },
      { icone: 'calendar', texto: 'Limitação nas atividades do dia a dia' },
    ],
    destaque: 'Cuidar dos seus movimentos começa com **uma avaliação adequada.**',
    imagem: {
      arquivo: 'sintomas.webp',
      alt: 'Pessoa de bermuda segurando o joelho com as duas mãos',
      foco: '50% 50%',
    },
  },

  condicoes: {
    introducao:
      'O joelho sustenta o peso do corpo e participa de quase todos os movimentos do dia. Por isso, dores e lesões na região merecem investigação cuidadosa.',
    itens: [
      {
        nome: 'Artrose do joelho',
        descricao:
          'Desgaste da cartilagem que pode causar dor, rigidez e inchaço, principalmente após os 50 anos ou depois de lesões antigas.',
      },
      {
        nome: 'Lesões de menisco',
        descricao:
          'Podem surgir em torções durante o esporte ou por desgaste ao longo do tempo, com dor, travamento ou sensação de falseio.',
      },
      {
        nome: 'Lesões ligamentares',
        descricao:
          'Lesões do ligamento cruzado anterior (LCA), do ligamento colateral medial e de outros ligamentos, comuns em torções.',
      },
      {
        nome: 'Tendinopatias',
        descricao:
          'Alterações nos tendões patelar e quadricipital, associadas a sobrecarga, saltos e treinos repetitivos.',
      },
      {
        nome: 'Dor femoropatelar',
        descricao:
          'Dor na parte da frente do joelho, que costuma piorar ao subir escadas, agachar ou ficar muito tempo sentado.',
      },
      {
        nome: 'Lesões esportivas',
        descricao:
          'Entorses, contusões e lesões por sobrecarga em quem pratica corrida, futebol, beach tennis e outras modalidades.',
      },
    ],
  },

  avaliacao: {
    exame: 'Conversa sobre suas queixas e exame físico do joelho, com testes de movimento, força e estabilidade.',
    investigacao:
      'Como e quando a dor começou, que atividades você pratica e quais exames já fez. Radiografia ou ressonância são pedidas quando necessárias.',
  },

  tratamentos: {
    introducao:
      'O tratamento depende do diagnóstico, da idade, do nível de atividade e dos objetivos de cada paciente. Muitas condições do joelho respondem bem a medidas conservadoras; outras podem exigir procedimentos ou cirurgia.',
    itens: [
      {
        tipo: 'conservador',
        titulo: 'Tratamento conservador',
        texto:
          'Orientações sobre atividade física e controle de carga, medicamentos quando indicados e ajustes na rotina para aliviar os sintomas.',
      },
      {
        tipo: 'reabilitacao',
        titulo: 'Fisioterapia e reabilitação',
        texto: 'Fortalecimento muscular, ganho de mobilidade e treino de estabilidade, com acompanhamento na própria clínica.',
        recursos: ['fisioterapia'],
      },
      {
        tipo: 'procedimento',
        titulo: 'Infiltração com ácido hialurônico',
        texto: 'Pode ser indicada em casos selecionados de artrose do joelho, como parte do controle da dor e da função.',
        recursos: ['acido-hialuronico'],
      },
      {
        tipo: 'procedimento',
        titulo: 'Terapia por ondas de choque',
        texto: 'Recurso que pode ser indicado em algumas tendinopatias, como a do tendão patelar, conforme a avaliação.',
        recursos: ['ondas-de-choque'],
      },
      {
        tipo: 'cirurgico',
        titulo: 'Tratamento cirúrgico',
        texto:
          'Algumas lesões ligamentares e meniscais e casos avançados de artrose podem ter indicação cirúrgica. A equipe explica as opções, os riscos e as etapas da recuperação.',
      },
    ],
  },

  instituicao: {
    introducao:
      'Para quem procura especialista em joelho em Salvador, a UORT oferece avaliação dentro de uma clínica dedicada à Ortopedia e Traumatologia, com reabilitação no mesmo endereço.',
  },

  faq: [
    {
      pergunta: 'Quando devo procurar um especialista em joelho?',
      resposta:
        'Procure avaliação se a dor durar mais de algumas semanas ou vier com inchaço, travamento, sensação de falseio ou dificuldade para apoiar a perna. Depois de uma torção com estalo, dor forte ou inchaço rápido, o ideal é buscar atendimento logo.',
    },
    {
      pergunta: 'Dor no joelho ao subir escadas é sinal de artrose?',
      resposta:
        'Nem sempre. Essa dor pode estar ligada à articulação entre a patela e o fêmur, aos tendões, à musculatura ou ao desgaste da cartilagem. Só a avaliação clínica, às vezes com exames, permite identificar a causa.',
    },
    {
      pergunta: 'Toda lesão de menisco precisa de cirurgia?',
      resposta:
        'Não. Muitas lesões, principalmente as degenerativas, podem ser tratadas com fisioterapia e medidas conservadoras. A indicação cirúrgica depende do tipo de lesão, dos sintomas e do perfil de cada paciente.',
    },
    {
      pergunta: 'Posso continuar praticando esportes com dor no joelho?',
      resposta:
        'Depende da causa e da intensidade da dor. Insistir no esporte com dor pode agravar algumas lesões. A avaliação ajuda a definir o que pode ser mantido e como retomar as atividades com segurança.',
    },
    {
      pergunta: 'Preciso levar exames para a consulta?',
      resposta:
        'Se você já tiver radiografias, ressonâncias ou laudos do joelho, leve para a consulta. Caso não tenha, o especialista avalia se algum exame é necessário.',
    },
  ],

  ctaFinal: {
    titulo: 'Seu joelho merece **atenção.**',
    texto: 'Conte com a UORT para avaliar a dor no joelho e encontrar o cuidado adequado para o seu caso.',
  },

  // Equipe de joelho no site oficial, em ordem alfabética.
  medicos: ['david-sadigursky', 'luis-claudio-chagas', 'roney-santanna'],

  mensagemWhatsApp: 'Olá! Vim pela página de Joelho da UORT e gostaria de agendar uma consulta.',

  relacionadas: ['quadril', 'pe-e-tornozelo'],
};
