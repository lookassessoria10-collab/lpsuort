/**
 * Dados institucionais da UORT, compartilhados por todas as páginas de especialidade.
 *
 * Fontes: site oficial (uort.com.br), "[UORT] Briefing" e "[UORT] Onboarding - Marketing".
 * Itens marcados com "A CONFIRMAR" ainda dependem de validação da UORT antes da publicação.
 */

const enderecoCompleto =
  'Centro Empresarial Thomé de Souza, Av. Antônio Carlos Magalhães, 3244, salas 616 e 617, Caminho das Árvores, Salvador - BA';

export const site = {
  marca: 'UORT',
  nome: 'UORT Ortopedia e Traumatologia',
  razaoSocial: 'UORT Urgência Ortopédica Traumatológica Ltda.',
  cnpj: '02.411.199/0001-76',

  // A CONFIRMAR: domínio final das landing pages. Usado em canonical, Open Graph, sitemap e JSON-LD.
  baseUrl: 'https://www.uort.com.br',
  // Todas as rotas e arquivos ficam sob este prefixo, para conviver com o site institucional.
  basePath: '/especialidades',

  contato: {
    telefone: { exibicao: '(71) 3011-1719', e164: '+557130111719' },
    // Informado no briefing das landing pages. O site atual ainda aponta o WhatsApp para (71) 3011-1719.
    whatsapp: { exibicao: '(71) 99993-0498', numero: '5571999930498' },
    // Publicado no site oficial (o link de lá está quebrado: "maito:").
    email: 'contato@uort.com.br',
  },

  endereco: {
    edificio: 'Centro Empresarial Thomé de Souza',
    logradouro: 'Av. Antônio Carlos Magalhães, 3244',
    complemento: 'Salas 616 e 617',
    bairro: 'Caminho das Árvores',
    cidade: 'Salvador',
    uf: 'BA',
    pais: 'BR',
    cep: '', // A CONFIRMAR: o site oficial não informa o CEP.
    completo: enderecoCompleto,
    mapaUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoCompleto)}`,
  },

  // Horário informado pela agência. Não pode ser chamado de "emergência" (não é 24h nem tem suporte à vida).
  prontoAtendimento: {
    // Linhas do painel "Agendamento e contato".
    horarios: [
      { dias: 'Segunda a sexta', horario: 'das 07h às 19h' },
      { dias: 'Sábado', horario: 'das 07h às 13h' },
    ],
    // O mesmo horário dentro de frases ({prontoAtendimento} nos textos). Mantenha igual às linhas acima.
    frase: 'de segunda a sexta, das 07h às 19h, e aos sábados, das 07h às 13h',
  },

  links: {
    site: 'https://www.uort.com.br/',
    instagram: 'https://www.instagram.com/clinicauort/',
    facebook: 'https://www.facebook.com/clinicauort',
  },

  // Lista informada pela UORT no briefing das landing pages.
  // A CONFIRMAR: o briefing de marca cita também Bradesco Saúde, Unimed, Mediservice e Blue Saúde,
  // e o site oficial exibe o logo da Gama Saúde. Nenhuma dessas aparece na lista mais recente.
  // Logo oficial em src/assets/img/convenios/<id>.webp (original em imagens-originais/convenios/).
  // Sem o arquivo, o convênio aparece como um cartão com o nome, no mesmo formato das logos.
  convenios: [
    { id: 'asfeb-saude', nome: 'ASFEB Saúde' },
    { id: 'unimed-cnu', nome: 'Unimed CNU' },
    { id: 'sulamerica', nome: 'SulAmérica' },
    { id: 'proasa', nome: 'Proasa' },
    { id: 'saude-caixa', nome: 'Saúde Caixa' },
    { id: 'postal-saude', nome: 'Postal Saúde' },
    { id: 'seguros-unimed', nome: 'Seguros Unimed' },
    { id: 'geap', nome: 'GEAP' },
    { id: 'saude-para-todos', nome: 'Cartão Saúde Para Todos' },
    { id: 'planassiste', nome: 'PlanAssiste' },
    { id: 'petrobras', nome: 'Saúde Petrobras' },
    { id: 'prosocial', nome: 'ProSocial' },
    { id: 'nordeste-saude', nome: 'Nordeste Saúde' },
  ],
  conveniosObservacao:
    'A cobertura pode variar conforme o plano e o tipo de atendimento. Confirme no momento do agendamento.',

  // Canal do botão principal de cada bloco ("Agendar pelo WhatsApp").
  // "whatsapp" usa a mensagem de agendamento de cada especialidade; "url" usa agendamento.url
  // e o botão passa a se chamar "Agende sua consulta". O botão flutuante é sempre WhatsApp.
  agendamento: { canal: 'whatsapp', url: '' },

  // Monitoramento: nada é carregado enquanto os IDs estiverem vazios.
  // Com gtmId, o snippet do Google Tag Manager é incluído e os eventos seguem pelo dataLayer.
  // Com ga4Id (sem GTM), o gtag.js é incluído e os eventos são enviados com gtag('event').
  analytics: { gtmId: '', ga4Id: '' },

  // Resolução CFM nº 2.336/2023: anúncios de estabelecimentos médicos devem identificar o diretor técnico.
  // A CONFIRMAR com o jurídico da UORT. Ex.: 'Diretor técnico: Nome Sobrenome · CRM-BA 00000 · RQE 0000'.
  responsavelTecnico: '',

  privacidade: {
    texto:
      'Esta página não usa formulários e não coleta dados pessoais diretamente. Os botões de contato abrem o WhatsApp ou o telefone da UORT.',
    url: '', // Link para a política de privacidade oficial, quando houver.
  },

  // Foto real da estrutura da UORT para o bloco "Por que escolher a UORT?".
  // Sem o arquivo em src/assets/img/, o bloco mostra apenas o cartão de localização.
  fotoEstrutura: {
    arquivo: 'institucional/estrutura.webp',
    alt: 'Recepção da UORT no Centro Empresarial Thomé de Souza, em Salvador',
    foco: '50% 30%',
  },

  // Galeria "Conheça a clínica", abaixo do bloco institucional. Somente fotos reais da UORT,
  // sem pacientes identificáveis. A legenda nomeia a sala como está na sinalização da clínica.
  galeriaEstrutura: [
    {
      arquivo: 'institucional/consultorio.webp',
      legenda: 'Consultório',
      alt: 'Consultório da UORT com mesa de atendimento e maca',
      foco: '60% 50%',
    },
    {
      arquivo: 'institucional/raio-x.webp',
      legenda: 'Sala de raio X',
      alt: 'Sala de raio X da UORT com o equipamento de radiografia',
      foco: '40% 50%',
    },
    {
      arquivo: 'institucional/aplicacao-medicamentos.webp',
      legenda: 'Aplicação de medicamentos',
      alt: 'Sala de aplicação de medicamentos da UORT com poltronas reclináveis',
      foco: '60% 50%',
    },
  ],

  // Pontos institucionais do bloco "Por que escolher a UORT?". Sem números, certificações ou depoimentos.
  diferenciais: [
    {
      icone: 'team',
      titulo: 'Equipe organizada por região do corpo',
      texto:
        'Ortopedistas com atuação em coluna, ombro, quadril, joelho, pé e tornozelo, mão, ortopedia pediátrica e traumatologia esportiva.',
    },
    {
      icone: 'rehab',
      titulo: 'Consulta e reabilitação no mesmo endereço',
      texto: 'Fisioterapia, RPG e cinesioterapia na própria clínica, para dar continuidade ao cuidado quando indicado.',
    },
    {
      icone: 'clock',
      titulo: 'Pronto Atendimento ortopédico',
      texto: 'Atendimento para dores e lesões agudas, {prontoAtendimento}.',
    },
    {
      icone: 'pin',
      titulo: 'Localização central em Salvador',
      texto: 'No Centro Empresarial Thomé de Souza, no Caminho das Árvores.',
    },
  ],
};
