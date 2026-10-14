/**
 * Catálogo de recursos terapêuticos oferecidos na própria UORT.
 *
 * Uma especialidade só pode citar um recurso que esteja aqui com `disponivel: true`
 * (o lint bloqueia o contrário). Assim, nenhuma página promete algo que a clínica não oferece.
 * Antes de ligar um recurso a uma especialidade, confirme também a pertinência clínica.
 */
export const recursos = {
  fisioterapia: {
    nome: 'Fisioterapia',
    disponivel: true,
    fonte: 'Site oficial e briefing de marca',
  },
  rpg: {
    nome: 'RPG (Reeducação Postural Global)',
    disponivel: true,
    fonte: 'Site oficial e briefing de marca',
  },
  cinesioterapia: {
    nome: 'Cinesioterapia',
    disponivel: true,
    fonte: 'Site oficial e briefing de marca',
  },
  'ondas-de-choque': {
    nome: 'Terapia por ondas de choque',
    nomeCurto: 'ondas de choque',
    disponivel: true,
    fonte: 'Briefing das landing pages',
  },
  sis: {
    nome: 'SIS (Sistema Super Indutivo)',
    nomeCurto: 'SIS (Sistema Super Indutivo)',
    disponivel: true,
    fonte: 'Briefing das landing pages; citado como "CIS" no onboarding',
  },
  'acido-hialuronico': {
    nome: 'Infiltração com ácido hialurônico',
    nomeCurto: 'infiltração com ácido hialurônico',
    disponivel: true,
    fonte: 'Briefing das landing pages',
  },
  infiltracoes: {
    nome: 'Infiltrações e bloqueios',
    nomeCurto: 'infiltrações',
    disponivel: true,
    fonte: 'Questionário de onboarding',
  },
};
