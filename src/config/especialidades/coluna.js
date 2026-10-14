/** @type {import('./index.js').Especialidade} */
export default {
  slug: 'coluna',
  nome: 'Coluna',
  regiao: { nome: 'coluna', artigo: 'a coluna', em: 'na coluna' },

  seo: {
    title: 'Especialista em Coluna em Salvador | UORT Ortopedia',
    description:
      'Dor lombar, dor no pescoço, hérnia de disco ou ciática? Avaliação com a equipe de coluna da UORT, em Salvador, com fisioterapia e RPG na clínica.',
  },

  hero: {
    titulo: 'Especialistas\nem **Coluna**',
    subtitulo:
      'Avaliação e tratamento para dores e alterações das regiões cervical e lombar que interferem na sua rotina.',
    imagem: {
      arquivo: 'hero.webp',
      alt: 'Ortopedista da UORT avaliando a região lombar de um paciente sentado na maca',
      foco: '50% 35%',
      focoDesktop: '50% 12%', // tira o logo do jaleco de trás do botão do cabeçalho
    },
  },

  sintomas: {
    titulo: 'A dor nas costas não precisa\n**fazer parte da rotina.**',
    itens: [
      { icone: 'spine', texto: 'Dor lombar recorrente' },
      { icone: 'radiate', texto: 'Dor que irradia para braços ou pernas' },
      { icone: 'stiff', texto: 'Rigidez na coluna' },
      { icone: 'bend', texto: 'Limitações para se movimentar' },
    ],
    destaque: 'Entender a origem da dor é **o primeiro passo do cuidado.**',
    imagem: {
      arquivo: 'sintomas.webp',
      alt: 'Mulher se levantando da cadeira do escritório com a mão na região lombar',
      foco: '50% 50%',
    },
  },

  condicoes: {
    introducao:
      'A coluna sustenta o tronco e protege a medula e as raízes nervosas. As dores na região têm causas diversas, e muitas delas podem ser controladas com tratamento conservador.',
    itens: [
      {
        nome: 'Hérnia de disco',
        descricao:
          'Deslocamento de parte do disco entre as vértebras, que pode comprimir nervos e causar dor, formigamento ou perda de força.',
      },
      {
        nome: 'Lombalgia',
        descricao:
          'Dor na parte baixa das costas, aguda ou recorrente, muitas vezes ligada a sobrecarga, postura ou alterações degenerativas.',
      },
      {
        nome: 'Cervicalgia',
        descricao: 'Dor no pescoço que pode vir com rigidez, dor de cabeça ou irradiação para os ombros e os braços.',
      },
      {
        nome: 'Dor ciática',
        descricao:
          'Dor que desce pela nádega e pela perna, causada pela irritação das raízes nervosas que formam o nervo ciático.',
      },
      {
        nome: 'Alterações degenerativas',
        descricao:
          'Desgaste de discos e articulações, como a artrose facetária e a estenose do canal vertebral, mais comuns com o passar dos anos.',
      },
      {
        nome: 'Desvios da coluna',
        descricao:
          'Escoliose e alterações das curvaturas, como hipercifose e hiperlordose, avaliadas em adolescentes e adultos.',
      },
    ],
  },

  avaliacao: {
    exame: 'Conversa sobre suas queixas e exame da coluna, com avaliação de postura, mobilidade, força e reflexos.',
    investigacao:
      'Quando a dor começou, se ela irradia, se há formigamento e o que piora ou alivia. Exames de imagem são pedidos quando trazem informação útil.',
  },

  tratamentos: {
    introducao:
      'Na maioria das dores da coluna, o tratamento começa por medidas conservadoras. A conduta depende da causa da dor, da intensidade dos sintomas e do impacto na sua rotina.',
    itens: [
      {
        tipo: 'conservador',
        titulo: 'Tratamento conservador',
        texto:
          'Orientações sobre atividade, postura e retorno gradual aos movimentos, além de medicamentos quando indicados.',
      },
      {
        tipo: 'reabilitacao',
        titulo: 'Fisioterapia e RPG',
        texto: 'Exercícios de fortalecimento, mobilidade e reeducação postural, realizados na própria clínica.',
        recursos: ['fisioterapia', 'rpg'],
      },
      {
        tipo: 'reabilitacao',
        titulo: 'SIS (Sistema Super Indutivo)',
        texto:
          'Recurso de estimulação eletromagnética que pode complementar a fisioterapia no controle da dor, quando indicado.',
        recursos: ['sis'],
      },
      {
        tipo: 'procedimento',
        titulo: 'Bloqueios e infiltrações',
        texto: 'Procedimentos que podem ser indicados em casos selecionados para o controle da dor, sempre após avaliação.',
        recursos: ['infiltracoes'],
      },
      {
        tipo: 'cirurgico',
        titulo: 'Tratamento cirúrgico',
        texto:
          'Reservado a situações específicas, como compressão nervosa com perda de força ou dor que não melhora com o tratamento conservador. A indicação é sempre individual.',
      },
    ],
  },

  instituicao: {
    introducao:
      'Para quem procura especialista em coluna em Salvador, a UORT reúne avaliação ortopédica, fisioterapia e RPG no mesmo endereço, o que facilita o acompanhamento.',
  },

  faq: [
    {
      pergunta: 'Quando a dor nas costas exige avaliação com especialista?',
      resposta:
        'Procure avaliação se a dor durar mais de algumas semanas, voltar com frequência ou irradiar para braços ou pernas. Perda de força, alteração no controle da urina ou das fezes, febre ou dor depois de uma queda exigem atendimento de urgência.',
    },
    {
      pergunta: 'Hérnia de disco sempre precisa de cirurgia?',
      resposta:
        'Não. Grande parte dos casos melhora com tratamento conservador, como fisioterapia, controle da dor e orientação de atividades. A cirurgia é considerada em situações específicas, definidas na avaliação.',
    },
    {
      pergunta: 'Ressonância é necessária para diagnosticar dor na coluna?',
      resposta:
        'Nem sempre. Muitas dores podem ser avaliadas pela história clínica e pelo exame físico. O especialista pede exames de imagem quando eles podem esclarecer o diagnóstico ou mudar a conduta.',
    },
    {
      pergunta: 'Repouso absoluto ajuda a melhorar a dor lombar?',
      resposta:
        'Na maioria dos casos, não. Manter-se ativo, dentro do que a dor permite, costuma ser melhor do que ficar muito tempo em repouso. O especialista orienta o nível de atividade adequado para o seu caso.',
    },
    {
      pergunta: 'RPG ajuda na dor nas costas?',
      resposta:
        'A RPG é um dos recursos de reabilitação usados em algumas dores da coluna e em alterações posturais. A indicação depende da avaliação e pode ser combinada com outras abordagens de fisioterapia.',
    },
  ],

  ctaFinal: {
    titulo: 'Sua coluna merece **atenção.**',
    texto: 'Conte com a UORT para investigar a origem da dor nas costas ou no pescoço e encontrar o cuidado adequado.',
  },

  mensagemWhatsApp: 'Olá! Vim pela página de Coluna da UORT e gostaria de agendar uma consulta.',

  relacionadas: ['quadril', 'ombro'],
};
