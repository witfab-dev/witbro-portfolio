// WIT.FAB AI — an offline assistant.
//
// Every reply is assembled in the browser from the portfolio data that already
// ships with this site (src/data and src/i18n). There is no fetch(), no server
// endpoint and no external AI provider involved.

import en from '../i18n/en';
import fr from '../i18n/fr';
import {
  profile,
  projectMeta,
  skillGroupsMeta,
  experienceMeta,
  socials,
  whatsappUrl,
} from '../data/portfolio';

const dictionaries = { en, fr };

const normalize = (value) =>
  String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s+.#/-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const hasAny = (text, words) => words.some((word) => text.includes(word));

const projectAliases = {
  'market-kigali': ['market', 'kigali market', 'ecommerce', 'e-commerce', 'marketplace', 'vendor'],
  katss: ['katss', 'kirehe', 'school website', 'school site', 'adventist'],
  portfolio: ['portfolio 2025', 'this portfolio', 'portfolio project'],
  pssms: ['pssms', 'parking', 'slot management'],
  'rwanda-explorer': ['rwanda explorer', 'explorer game', 'educational game'],
  devconnect: ['devconnect', 'dev connect', 'networking platform', 'team formation'],
};

const copy = {
  en: {
    greeting:
      "Hello! I'm WIT.FAB AI, the assistant built into Witness Fabrice's portfolio. I run entirely in this page, using only the information published on the site. Ask me about projects, skills, experience, services or contact details.",
    thanks: "You're welcome! If there's anything else about the portfolio you'd like to know, just ask.",
    about: (c) =>
      `${profile.name} (${profile.brand}) is a software developer and technology innovator based in ${profile.location}.\n\n${c.about.who1}\n\n${c.about.missionText}\n\nHe builds web and mobile applications, backend services and interfaces — see the projects page for the work itself.`,
    projectsIntro: () => `This portfolio documents ${projectMeta.length} projects:\n`,
    askAboutProject:
      'Ask me about any of them by name — for example PSSMS or KATSS — and I will share the problem, the approach and the stack.',
    projectDetail: (c, p) => {
      const detail = c.projectCopy?.[p.id] || {};
      const lines = [
        `${p.title} (${p.year} · ${c.projectsPage.status[p.status] || p.status})`,
        detail.description || '',
        `${c.projectsPage.problem}: ${detail.problem || '—'}`,
        `${c.projectsPage.solution}: ${detail.solution || '—'}`,
        `${c.projectsPage.technologies}: ${p.technologies.join(', ')}`,
      ];
      const links = [];
      if (p.links?.demo) links.push(`Live: ${p.links.demo}`);
      if (p.links?.github) links.push(`GitHub: ${p.links.github}`);
      lines.push(links.length ? links.join('\n') : 'No public links are listed for this project yet.');
      return lines.filter(Boolean).join('\n\n');
    },
    skillsIntro: (c) => `${c.skillsPage.lead}\n\n`,
    skillDetail: (c, group, skill, projects) => {
      const note = c.skillCopy?.[group.id]?.notes?.[skill.name] || '';
      const used = projects.length
        ? `It appears in: ${projects.join(', ')}.`
        : 'It is listed in the toolkit but not tied to a specific project on the site.';
      return `${skill.name} — ${note} (${c.skillCopy?.[group.id]?.short || group.id}).\n${used}`;
    },
    experienceIntro: 'Development experience listed on the portfolio:\n',
    experienceAt: 'at',
    educationIntro: 'Education and learning:\n',
    contactIntro: 'You can reach Witness Fabrice directly:',
    contactTip:
      'For a project, a role or a collaboration, a short message about what you are building is the best start. He usually replies within 24 hours.',
    servicesIntro: 'Services offered:',
    servicesList: [
      'Web application development',
      'Mobile app development',
      'Backend and API development',
      'UI/UX and frontend engineering',
      'AI integration through secure backend endpoints',
      'Deployment and delivery (Git, Docker, CI/CD, Vercel)',
    ],
    cv: `A CV is available on this site: /Witness_Fabrice_CV.pdf\n\nYou can also ask directly by email at ${profile.email}.`,
    location: `${profile.name} is based in ${profile.location} and works remotely as well as on site.`,
    availability:
      'The portfolio does not list specific availability dates. The quickest way to check is to send a message by email or WhatsApp and ask.',
    how:
      'I am a local, rule-based assistant — not a connected AI model. Every answer is assembled in your browser from the project data, skills, experience, education and contact details already published on this site. Nothing is sent to an external service, and I will say when a question falls outside that information.',
    fallback:
      'I only answer from the information published on this portfolio, and I could not match that question to it. I can help with:\n• Projects — ask for one by name (Market-Kigali, KATSS, Portfolio 2025, PSSMS, Rwanda Explorer, DevConnect)\n• Technical skills and technologies\n• Experience and education\n• Services and contact details\n\nFor anything else, reach Witness directly by email or WhatsApp.',
    topics: 'Ask me about projects, skills, experience, services or contact.',
  },
  fr: {
    greeting:
      "Bonjour ! Je suis WIT.FAB AI, l’assistant intégré au portfolio de Witness Fabrice. Je fonctionne entièrement dans cette page, à partir des informations publiées sur le site. Posez-moi une question sur les projets, les compétences, le parcours, les services ou les contacts.",
    thanks:
      'Avec plaisir ! Si vous souhaitez autre chose sur le portfolio, n’hésitez pas à demander.',
    about: (c) =>
      `${profile.name} (${profile.brand}) est développeur logiciel et innovateur technologique basé à ${profile.location}.\n\n${c.about.who1}\n\n${c.about.missionText}\n\nIl conçoit des applications web et mobiles, des services backend et des interfaces — la page des projets présente le travail lui-même.`,
    projectsIntro: () => `Ce portfolio présente ${projectMeta.length} projets :\n`,
    askAboutProject:
      'Demandez-moi un projet par son nom — par exemple PSSMS ou KATSS — et je vous donnerai le problème, l’approche et la pile technique.',
    projectDetail: (c, p) => {
      const detail = c.projectCopy?.[p.id] || {};
      const lines = [
        `${p.title} (${p.year} · ${c.projectsPage.status[p.status] || p.status})`,
        detail.description || '',
        `${c.projectsPage.problem} : ${detail.problem || '—'}`,
        `${c.projectsPage.solution} : ${detail.solution || '—'}`,
        `${c.projectsPage.technologies} : ${p.technologies.join(', ')}`,
      ];
      const links = [];
      if (p.links?.demo) links.push(`En ligne : ${p.links.demo}`);
      if (p.links?.github) links.push(`GitHub : ${p.links.github}`);
      lines.push(links.length ? links.join('\n') : 'Aucun lien public n’est encore indiqué pour ce projet.');
      return lines.filter(Boolean).join('\n\n');
    },
    skillsIntro: (c) => `${c.skillsPage.lead}\n\n`,
    skillDetail: (c, group, skill, projects) => {
      const note = c.skillCopy?.[group.id]?.notes?.[skill.name] || '';
      const used = projects.length
        ? `On le retrouve dans : ${projects.join(', ')}.`
        : 'Il figure dans la boîte à outils sans être lié à un projet précis du site.';
      return `${skill.name} — ${note} (${c.skillCopy?.[group.id]?.short || group.id}).\n${used}`;
    },
    experienceIntro: 'Expérience de développement présentée sur le portfolio :\n',
    experienceAt: 'chez',
    educationIntro: 'Formation et apprentissage :\n',
    contactIntro: 'Vous pouvez joindre Witness Fabrice directement :',
    contactTip:
      'Pour un projet, un poste ou une collaboration, un court message sur ce que vous construisez est le meilleur point de départ. Il répond généralement sous 24 heures.',
    servicesIntro: 'Services proposés :',
    servicesList: [
      'Développement d’applications web',
      'Développement d’applications mobiles',
      'Développement backend et d’API',
      'UI/UX et ingénierie frontend',
      'Intégration d’IA via des endpoints backend sécurisés',
      'Déploiement et livraison (Git, Docker, CI/CD, Vercel)',
    ],
    cv: `Un CV est disponible sur ce site : /Witness_Fabrice_CV.pdf\n\nVous pouvez aussi écrire à ${profile.email}.`,
    location: `${profile.name} est basé à ${profile.location} et travaille aussi bien à distance que sur site.`,
    availability:
      'Le portfolio n’indique pas de dates de disponibilité précises. Le plus simple est de poser la question par e-mail ou WhatsApp.',
    how:
      'Je suis un assistant local, basé sur des règles — pas un modèle d’IA connecté. Chaque réponse est assemblée dans votre navigateur à partir des projets, compétences, expériences, formations et coordonnées déjà publiés sur ce site. Rien n’est envoyé à un service externe, et je le signale lorsqu’une question sort de ces informations.',
    fallback:
      'Je réponds uniquement à partir des informations publiées sur ce portfolio, et je n’ai pas trouvé de correspondance. Je peux vous aider sur :\n• Les projets — demandez-en un par son nom (Market-Kigali, KATSS, Portfolio 2025, PSSMS, Rwanda Explorer, DevConnect)\n• Les compétences et technologies\n• L’expérience et la formation\n• Les services et les contacts\n\nPour le reste, contactez Witness directement par e-mail ou WhatsApp.',
    topics:
      'Posez une question sur les projets, les compétences, l’expérience, les services ou les contacts.',
  },
};

const contactKeywords = [
  'contact', 'email', 'e-mail', 'mail', 'whatsapp', 'phone', 'number', 'reach', 'hire',
  'recruit', 'work with', 'work together', 'collaborate', 'collaboration', 'freelance',
  'contacter', 'joindre', 'embaucher', 'travailler avec', 'collaborer', 'telephone',
];

const projectKeywords = ['project', 'projects', 'built', 'build', 'made', 'work', 'case study'];
const projectKeywordsFr = ['projet', 'projets', 'construit', 'realise', 'travail'];

function findProject(text) {
  return projectMeta.find((project) => {
    const aliases = projectAliases[project.id] || [];
    const title = normalize(project.title);
    return text.includes(title) || aliases.some((alias) => text.includes(normalize(alias)));
  });
}

function findSkill(text) {
  for (const group of skillGroupsMeta) {
    for (const skill of group.skills) {
      const name = normalize(skill.name);
      if (name.length >= 2 && text.includes(name)) return { group, skill };
    }
  }
  return null;
}

function projectsUsing(skillName) {
  return projectMeta
    .filter((project) =>
      project.technologies.some(
        (tech) => normalize(tech).includes(normalize(skillName)) || normalize(skillName).includes(normalize(tech)),
      ),
    )
    .map((project) => project.title);
}

function formatProjects(c) {
  return projectMeta
    .map((p) => `• ${p.title} (${p.year}) — ${c.projectCopy?.[p.id]?.description || p.technologies.join(', ')}`)
    .join('\n');
}

function formatSkills(c) {
  return skillGroupsMeta
    .map((group) => {
      const label = c.skillCopy?.[group.id]?.short || group.id;
      return `${label}: ${group.skills.map((skill) => skill.name).join(', ')}`;
    })
    .join('\n');
}

function formatExperience(c, t) {
  return c.roles
    .map((role, index) => {
      const meta = experienceMeta[index] || {};
      const place = meta.organization ? ` ${t.experienceAt} ${meta.organization}` : '';
      const period = meta.period ? ` (${meta.period})` : '';
      return `• ${role.role}${place}${period}\n${role.summary}`;
    })
    .join('\n\n');
}

function formatEducation(c) {
  return c.education
    .map((item) => `• ${item.title}\n${item.detail}`)
    .join('\n\n');
}

function formatContact(t) {
  const lines = [
    `• Email: ${profile.email}`,
    `• WhatsApp: ${profile.phoneDisplay} — ${whatsappUrl()}`,
    `• Location: ${profile.location}`,
  ];
  for (const social of socials) {
    if (social.href.startsWith('mailto')) continue;
    lines.push(`• ${social.label}: ${social.href}`);
  }
  return `${t.contactIntro}\n${lines.join('\n')}\n\n${t.contactTip}`;
}

export function answerQuestion(question, locale = 'en') {
  const t = copy[locale] || copy.en;
  const c = dictionaries[locale] || en;
  const q = normalize(question);

  if (!q) return t.greeting;

  if (hasAny(q, ['how do you work', 'how does this work', 'are you an ai', 'are you real', 'api', 'chatgpt', 'openai', 'model', 'fonctionne', 'es-tu une ia'])) {
    return t.how;
  }

  if (/^(hi|hello|hey|yo|bonjour|salut|bonsoir|good (morning|afternoon|evening))[\s!.,]*$/.test(q)) {
    return t.greeting;
  }

  if (hasAny(q, ['thank', 'thanks', 'merci', 'bye', 'goodbye', 'au revoir'])) {
    return t.thanks;
  }

  if (hasAny(q, ['cv', 'resume', 'curriculum'])) {
    return t.cv;
  }

  if (hasAny(q, ['available', 'availability', 'start date', 'disponib', 'disponibilite'])) {
    return t.availability;
  }

  if (hasAny(q, ['where', 'located', 'location', 'based', 'city', 'country', 'ou est', 'situe', 'localisation'])) {
    return t.location;
  }

  if (hasAny(q, contactKeywords)) {
    return formatContact(t);
  }

  const project = findProject(q);
  const mentionsProject = hasAny(q, [...projectKeywords, ...projectKeywordsFr, 'about', 'a propos', 'explique', 'explain', 'describe', 'details']);
  if (project && mentionsProject) {
    return t.projectDetail(c, project);
  }

  if (project && q.split(' ').length <= 4) {
    return t.projectDetail(c, project);
  }

  if (hasAny(q, projectKeywords) || hasAny(q, projectKeywordsFr)) {
    return `${t.projectsIntro(c)}${formatProjects(c)}\n\n${t.askAboutProject}`;
  }

  const skill = findSkill(q);
  if (skill) {
    return t.skillDetail(c, skill.group, skill.skill, projectsUsing(skill.skill.name));
  }

  if (hasAny(q, ['skill', 'skills', 'tech', 'technolog', 'stack', 'tools', 'competence', 'technologie', 'outils', 'framework', 'langage'])) {
    return `${t.skillsIntro(c)}${formatSkills(c)}\n\n${t.topics}`;
  }

  if (hasAny(q, ['experience', 'career', 'job', 'work history', 'role', 'employer', 'parcours', 'carriere', 'emploi', 'poste'])) {
    return `${t.experienceIntro}${formatExperience(c, t)}\n\n${t.educationIntro}${formatEducation(c)}`;
  }

  if (hasAny(q, ['education', 'study', 'studies', 'school', 'degree', 'level', 'formation', 'etude', 'ecole', 'diplome', 'niveau'])) {
    return `${t.educationIntro}${formatEducation(c)}`;
  }

  if (hasAny(q, ['service', 'offer', 'do for', 'build for me', 'what do you do', 'what does he do', 'offre', 'prestation'])) {
    return `${t.servicesIntro}\n${t.servicesList.map((item) => `• ${item}`).join('\n')}`;
  }

  if (hasAny(q, ['who', 'about', 'background', 'story', 'yourself', 'qui', 'propos', 'histoire', 'parle moi'])) {
    return t.about(c);
  }

  if (hasAny(q, ['help', 'what can you do', 'aide', 'que peux-tu'])) {
    return `${t.greeting}\n\n${t.topics}`;
  }

  return t.fallback;
}

export default answerQuestion;
