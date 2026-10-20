/**
 * Médicos exibidos nas landing pages. Cada especialidade escolhe quem aparece em `medicos`
 * (no arquivo da especialidade); aqui ficam os dados e as fotos de cada um.
 *
 * Fonte: página "Especialistas" do site oficial (uort.com.br/especialistas.html) e as páginas
 * individuais de cada médico. Fotos enviadas pela UORT (originais em imagens-originais/equipe/).
 *
 * Resolução CFM nº 2.336/2023: a publicidade que identifica um médico deve trazer o CRM e, ao
 * anunciar especialidade, o RQE. Nenhum nome aparece na página sem o CRM.
 * A CONFIRMAR: os números de RQE de todos os médicos (o site oficial informa só o CRM).
 *
 * Campos:
 *   nome      como aparece na página (com "Dr." / "Dra.")
 *   crm       número do CRM-BA
 *   rqe       número do RQE (vazio enquanto não confirmado; o lint avisa)
 *   area      área de atuação, como no site oficial
 *   formacao  2 a 4 itens factuais do currículo publicado (sem superlativos)
 *   fotos     arquivos em src/assets/img/, cada um com uma função fixa:
 *             retrato   cartão da equipe (4:5)
 *             avatar    círculo do hero e do CTA final (quadrado)
 *             destaque  slide em "Conheça os especialistas" (4:5); sem ela, o slide usa o retrato
 *             final     foto do CTA final, usada só quando o médico é o único da página
 *
 * Equilíbrio: numa página com mais de um médico, todos aparecem do mesmo jeito (cartão, avatar,
 * slide e CTA final). Por isso vale ter `destaque` para todos ou para nenhum; o lint avisa.
 *
 * @typedef {{ arquivo: string, alt: string, foco?: string }} FotoMedico
 * @typedef {{
 *   nome: string, crm: string, rqe: string, area: string, formacao: string[],
 *   fotos: { retrato: FotoMedico, avatar: FotoMedico, destaque?: FotoMedico, final?: FotoMedico },
 * }} Medico
 */

/** @type {Record<string, Medico>} */
export const medicos = {
  'david-sadigursky': {
    nome: 'Dr. David Sadigursky',
    crm: '17.295',
    rqe: '',
    area: 'Cirurgia do joelho e traumatologia do esporte',
    formacao: [
      'Mestrado em cirurgia do joelho pela Universidade de São Paulo (USP)',
      'Fellowship em cirurgia do joelho na Harvard Medical School, em Boston (EUA)',
      'Membro titular da Sociedade Brasileira de Cirurgia do Joelho (SBCJ)',
    ],
    fotos: {
      retrato: { arquivo: 'equipe/david-sadigursky.webp', alt: 'Dr. David Sadigursky sentado à mesa do consultório' },
      avatar: { arquivo: 'equipe/david-sadigursky-avatar.webp', alt: '' },
      destaque: {
        arquivo: 'equipe/david-sadigursky-consultorio.webp',
        alt: 'Dr. David Sadigursky de blazer cinza, na porta de um consultório da UORT',
        foco: '50% 20%',
      },
    },
  },

  'luis-claudio-chagas': {
    nome: 'Dr. Luís Cláudio Chagas',
    crm: '15.714',
    rqe: '',
    area: 'Joelho e traumatologia do esporte',
    formacao: [
      'Fellowship em cirurgia do joelho em Lyon, na França',
      'Membro titular da Sociedade Brasileira de Cirurgia do Joelho (SBCJ)',
      'Membro titular da Sociedade Brasileira de Ortopedia e Traumatologia (SBOT)',
    ],
    fotos: {
      retrato: { arquivo: 'equipe/luis-claudio-chagas.webp', alt: 'Dr. Luís Cláudio Chagas de terno, em ambiente com painel de madeira' },
      avatar: { arquivo: 'equipe/luis-claudio-chagas-avatar.webp', alt: '' },
      destaque: { arquivo: 'equipe/luis-claudio-chagas-estudio.webp', alt: 'Dr. Luís Cláudio Chagas sorrindo, de blazer cinza', foco: '50% 20%' },
    },
  },

  'roney-santanna': {
    nome: 'Dr. Roney Sant’Anna',
    crm: '13.253',
    rqe: '',
    area: 'Joelho e traumatologia do esporte',
    formacao: [
      'Membro titular da Sociedade Brasileira de Cirurgia do Joelho (SBCJ)',
      'Membro titular da Sociedade Brasileira de Ortopedia e Traumatologia (SBOT)',
      'Membro da sociedade internacional de pesquisa da osteoartrite',
    ],
    fotos: {
      retrato: { arquivo: 'equipe/roney-santanna.webp', alt: 'Dr. Roney Sant’Anna de jaleco branco, sentado' },
      avatar: { arquivo: 'equipe/roney-santanna-avatar.webp', alt: '' },
      // A CONFIRMAR: original de só 365 px; pedir uma versão maior à UORT.
      destaque: { arquivo: 'equipe/roney-santanna-estudio.webp', alt: 'Dr. Roney Sant’Anna de jaleco, em retrato de estúdio', foco: '50% 20%' },
    },
  },

  'sergio-murilo-andrade': {
    nome: 'Dr. Sérgio Murilo Andrade',
    crm: '15.308',
    rqe: '',
    area: 'Ortopedia e traumatologia, com atuação em coluna',
    formacao: [],
    fotos: {
      retrato: { arquivo: 'equipe/sergio-murilo-andrade.webp', alt: 'Dr. Sérgio Murilo Andrade de jaleco da UORT, com os braços cruzados' },
      avatar: { arquivo: 'equipe/sergio-murilo-andrade-avatar.webp', alt: '' },
    },
  },

  'nivaldo-cardozo': {
    nome: 'Dr. Nivaldo Cardozo Filho',
    crm: '17.021',
    rqe: '',
    area: 'Ombro e cotovelo, traumatologia do esporte',
    formacao: [
      'Pós-graduação em cirurgia do ombro e cotovelo e videoartroscopia pela Unifesp',
      'Fellowship em cirurgia do ombro e cotovelo na Mayo Clinic (EUA)',
      'Título de especialista pela Sociedade Brasileira de Cirurgia do Ombro e Cotovelo (SBCOC)',
    ],
    fotos: {
      retrato: { arquivo: 'equipe/nivaldo-cardozo.webp', alt: 'Dr. Nivaldo Cardozo Filho de jaleco em um consultório da UORT' },
      avatar: { arquivo: 'equipe/nivaldo-cardozo-avatar.webp', alt: '' },
      destaque: {
        arquivo: 'equipe/nivaldo-cardozo-consulta.webp',
        alt: 'Dr. Nivaldo Cardozo Filho examinando o ombro de um paciente',
        foco: '40% 50%',
      },
      final: { arquivo: 'equipe/nivaldo-cardozo-consultorio.webp', alt: 'Dr. Nivaldo Cardozo Filho sentado à mesa do consultório' },
    },
  },

  'alexandre-meirelles': {
    nome: 'Dr. Alexandre Meirelles',
    crm: '15.268',
    rqe: '',
    area: 'Quadril e pelve, traumatologia do esporte e osteoporose',
    formacao: [
      'Especialização em cirurgia de quadril e pelve no IOT, em Passo Fundo (RS)',
      'Membro titular da Sociedade Brasileira de Quadril (SBQ)',
      'Membro titular da Sociedade Brasileira de Ortopedia e Traumatologia (SBOT)',
    ],
    fotos: {
      retrato: { arquivo: 'equipe/alexandre-meirelles.webp', alt: 'Dr. Alexandre Meirelles de jaleco em um consultório da UORT' },
      avatar: { arquivo: 'equipe/alexandre-meirelles-avatar.webp', alt: '' },
      destaque: {
        arquivo: 'equipe/alexandre-meirelles-consulta.webp',
        alt: 'Dr. Alexandre Meirelles em consulta, com um modelo anatômico do quadril sobre a mesa',
        foco: '45% 50%',
      },
    },
  },

  'alan-chagas': {
    nome: 'Dr. Alan Chagas Silva',
    crm: '15.778',
    rqe: '',
    area: 'Ortopedia e traumatologia, com especialidade em quadril',
    formacao: [
      'Residência em Ortopedia e Traumatologia no Hospital Universitário Professor Edgard Santos',
      'Fellowship em cirurgia de quadril e pelve no IOT, em Passo Fundo (RS)',
      'Título de especialista pela Sociedade Brasileira de Quadril (SBQ)',
    ],
    fotos: {
      retrato: { arquivo: 'equipe/alan-chagas.webp', alt: 'Dr. Alan Chagas Silva de jaleco, com os braços cruzados' },
      avatar: { arquivo: 'equipe/alan-chagas-avatar.webp', alt: '' },
      destaque: {
        arquivo: 'equipe/alan-chagas-consultorio.webp',
        alt: 'Dr. Alan Chagas Silva à mesa, ao lado de um modelo anatômico do quadril',
        foco: '50% 30%',
      },
    },
  },

  // Fonte: drcamilotavares.com.br (formação) e Doctoralia (CRM e RQE; o site dele não traz o registro).
  // Nome completo: Camilo Miranda de Pinho Tavares. Fotos enviadas pela agência.
  'camilo-tavares': {
    nome: 'Dr. Camilo Tavares',
    crm: '38.784',
    rqe: '22084',
    area: 'Medicina e cirurgia do pé e tornozelo',
    formacao: [
      'Residência em Ortopedia e Traumatologia no Hospital Mater Dei, em Belo Horizonte (MG)',
      'Membro da Associação Brasileira de Medicina e Cirurgia do Tornozelo e Pé (ABTPé)',
      'Membro da Sociedade Brasileira de Ortopedia e Traumatologia (SBOT)',
    ],
    fotos: {
      retrato: { arquivo: 'equipe/camilo-tavares.webp', alt: 'Dr. Camilo Tavares de jaleco, sentado em uma poltrona do consultório' },
      avatar: { arquivo: 'equipe/camilo-tavares-avatar.webp', alt: '' },
      destaque: {
        arquivo: 'equipe/camilo-tavares-blazer.webp',
        alt: 'Dr. Camilo Tavares de blazer azul, apoiado em uma poltrona',
        foco: '50% 20%',
      },
    },
  },
};

/** "CRM-BA 15.778 · RQE 1234" @param {Medico} m */
export const registro = (m) => [`CRM-BA ${m.crm}`, m.rqe && `RQE ${m.rqe}`].filter(Boolean).join(' · ');
