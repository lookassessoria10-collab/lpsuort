/** @type {import('./index.js').Especialidade} */
export default {
  slug: 'ombro',
  nome: 'Ombro',
  regiao: { nome: 'ombro', artigo: 'o ombro', em: 'no ombro' },

  seo: {
    title: 'Especialista em Ombro em Salvador | UORT Ortopedia',
    description:
      'Dor ao levantar o braço? Avaliação de manguito rotador, bursite, capsulite e instabilidade do ombro na UORT, em Salvador. Agende sua consulta.',
  },

  hero: {
    titulo: 'Especialistas\nem **Ombro**',
    subtitulo: 'Avaliação e tratamento para dores, lesões e dificuldades de movimento que afetam o ombro.',
    imagem: {
      arquivo: 'hero.webp',
      alt: 'Ortopedista da UORT conduzindo a elevação do braço de um paciente para avaliar o ombro',
      foco: '50% 30%',
      focoDesktop: '50% 10%', // tira o logo do jaleco de trás do botão do cabeçalho
    },
  },

  sintomas: {
    titulo: 'Levantar o braço não deveria\n**ser um desafio.**',
    itens: [
      { icone: 'arm', texto: 'Dor ao levantar o braço' },
      { icone: 'moon', texto: 'Desconforto durante o sono' },
      { icone: 'reach', texto: 'Dificuldade para alcançar objetos' },
      { icone: 'dumbbell', texto: 'Limitação para atividades físicas' },
    ],
    destaque: 'Movimentos simples também merecem **atenção especializada.**',
    imagem: {
      arquivo: 'sintomas.webp',
      alt: 'Mulher alcançando uma prateleira com a mão sobre o ombro',
      foco: '50% 40%',
    },
  },

  condicoes: {
    introducao:
      'O ombro é a articulação com maior amplitude de movimento do corpo. Essa mobilidade o torna mais vulnerável a sobrecargas, desgastes e lesões.',
    itens: [
      {
        nome: 'Lesões do manguito rotador',
        descricao: 'Lesões nos tendões que estabilizam e movimentam o ombro, causadas por desgaste, sobrecarga ou trauma.',
      },
      {
        nome: 'Tendinopatias',
        descricao:
          'Alterações dos tendões, incluindo a tendinite calcária, comuns em quem faz movimentos repetitivos com o braço elevado.',
      },
      {
        nome: 'Bursite',
        descricao:
          'Inflamação da bursa subacromial, que costuma causar dor ao elevar o braço e ao deitar sobre o ombro.',
      },
      {
        nome: 'Capsulite adesiva',
        descricao:
          'Conhecida como “ombro congelado”, provoca dor e perda progressiva dos movimentos. É mais frequente em pessoas com diabetes.',
      },
      {
        nome: 'Instabilidade do ombro',
        descricao: 'Sensação de que o ombro “sai do lugar”, geralmente após luxações ou em pessoas com frouxidão ligamentar.',
      },
      {
        nome: 'Artrose do ombro',
        descricao: 'Desgaste da cartilagem da articulação, com dor, rigidez e estalos, mais comum depois dos 60 anos.',
      },
    ],
  },

  avaliacao: {
    exame: 'Conversa sobre suas queixas e exame do ombro, com testes de amplitude de movimento, força e estabilidade.',
    investigacao:
      'Como a dor começou, que posições a pioram e quais atividades você faz. Ultrassonografia ou ressonância são pedidas quando necessárias.',
  },

  tratamentos: {
    introducao:
      'Muitas dores no ombro podem ser tratadas sem cirurgia. A escolha do tratamento considera o tipo de lesão, a idade, as atividades e as expectativas de cada paciente.',
    itens: [
      {
        tipo: 'conservador',
        titulo: 'Tratamento conservador',
        texto: 'Orientações sobre posturas e esforços, ajuste das atividades e medicamentos quando indicados.',
      },
      {
        tipo: 'reabilitacao',
        titulo: 'Fisioterapia e reabilitação',
        texto:
          'Exercícios para ganho de mobilidade e fortalecimento da musculatura que estabiliza o ombro, com acompanhamento na clínica.',
        recursos: ['fisioterapia'],
      },
      {
        tipo: 'procedimento',
        titulo: 'Terapia por ondas de choque',
        texto: 'Pode ser indicada em algumas tendinopatias, como a tendinite calcária, conforme a avaliação.',
        recursos: ['ondas-de-choque'],
      },
      {
        tipo: 'reabilitacao',
        titulo: 'SIS (Sistema Super Indutivo)',
        texto:
          'Recurso de estimulação eletromagnética que pode complementar a reabilitação no controle da dor, quando indicado.',
        recursos: ['sis'],
      },
      {
        tipo: 'procedimento',
        titulo: 'Infiltrações',
        texto: 'Podem ser indicadas em casos como bursite e capsulite adesiva, como parte do controle da dor e da reabilitação.',
        recursos: ['infiltracoes'],
      },
      {
        tipo: 'cirurgico',
        titulo: 'Tratamento cirúrgico',
        texto:
          'Pode ser indicado em situações como algumas roturas do manguito rotador e instabilidades recorrentes. A equipe explica as opções e as etapas da recuperação.',
      },
    ],
  },

  instituicao: {
    introducao:
      'Para quem procura especialista em ombro em Salvador, a UORT oferece avaliação ortopédica e recursos de reabilitação na mesma clínica.',
  },

  faq: [
    {
      pergunta: 'Dor no ombro ao dormir é sinal de lesão?',
      resposta:
        'A dor noturna é comum em problemas como bursite, tendinopatias e lesões do manguito rotador, mas pode ter outras causas. Se ela atrapalha o sono com frequência, vale procurar avaliação.',
    },
    {
      pergunta: 'Qual a diferença entre bursite e tendinite no ombro?',
      resposta:
        'A bursite é a inflamação da bursa, uma pequena bolsa que reduz o atrito entre estruturas do ombro. A tendinite, ou tendinopatia, afeta os tendões. As duas podem acontecer juntas e têm sintomas parecidos, por isso o exame clínico é importante.',
    },
    {
      pergunta: 'Lesão do manguito rotador sempre precisa de cirurgia?',
      resposta:
        'Não. Muitas lesões, principalmente as parciais e as ligadas ao desgaste, são tratadas com fisioterapia e medidas conservadoras. A cirurgia depende do tipo e do tamanho da lesão, dos sintomas e do perfil de cada paciente.',
    },
    {
      pergunta: 'O que é ombro congelado?',
      resposta:
        'É o nome popular da capsulite adesiva, condição em que a cápsula da articulação fica inflamada e rígida, limitando os movimentos. O tratamento costuma envolver controle da dor e reabilitação, e a evolução pode levar meses.',
    },
    {
      pergunta: 'Quando procurar atendimento depois de uma queda sobre o ombro?',
      resposta:
        'Se houver dor intensa, deformidade, dificuldade para mover o braço ou sensação de que o ombro saiu do lugar, procure atendimento o quanto antes. A UORT conta com Pronto Atendimento ortopédico {prontoAtendimento}.',
    },
  ],

  ctaFinal: {
    titulo: 'Seu ombro merece **atenção.**',
    texto: 'Conte com a UORT para avaliar a dor e a limitação no ombro e encontrar o cuidado adequado para o seu caso.',
  },

  mensagemWhatsApp: 'Olá! Vim pela página de Ombro da UORT e gostaria de agendar uma consulta.',

  relacionadas: ['coluna', 'joelho'],
};
