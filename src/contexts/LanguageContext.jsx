import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const LanguageContext = createContext();

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────────────────────────────────────────
const translations = {

  // ───────────────────────── ENGLISH ─────────────────────────────────────────
  en: {
    // Navigation
    home:          "Home",
    about:         "About",
    welcome:       "Welcome",
    projects:      "Projects",
    skills:        "Skills",
    experience:    "Experience",
    contact:       "Contact",

    // UI Elements
    viewProjects:  "View Projects",
    exploreMore:   "Explore More",
    trySaying:     "Try saying",
    or:            "or",
    theme:         "Theme",
    language:      "Language",
    darkMode:      "Dark Mode",
    lightMode:     "Light Mode",
    downloadCV:    "Download CV",
    hireMe:        "Hire Me",
    portfolioViews:"Portfolio Views",
    satisfaction:  "Client Satisfaction",
    selectedWorks: "Selected Works",
    letsCreate:    "Let's Create",
    followMe:      "Follow Me",
    viewCaseStudy: "View Case Study",
    featured:      "Featured",
    liveWebsite:   "Live Website",
    liveDemo:      "Live Demo",
    sourceCode:    "Source Code",
    copyEmail:     "Copy Email",
    showLess:      "Show Less",
    readFullStory: "Read Full Story",
    personalInfo:  "Personal Info",
    focusAreas:    "Focus Areas",
    coreSkills:    "Core Skills",
    discoverSkills:"Discover Core Skills",
    allProjects:   "All Projects",

    // Contact
    contactHeading: "Let's create something great",
    contactSubtitle:"Whether you have a question or just want to say hi, my inbox is always open.",
    emailLabel:    "Email",
    phoneLabel:    "Phone",
    locationLabel: "Location",
    nameLabel:     "Name",
    messageLabel:  "Message",
    sendMessage:   "Send Message",
    yourName:      "Your Name",
    yourEmail:     "Your Email",
    message:       "Message",
    submit:        "Submit",
    sendSuccess:   "Sent Successfully!",
    sendError:     "Something went wrong. Try again.",

    // Navigation / misc
    backToRoot:    "Back to Root",
    scrollTop:     "Back to Top",
    loading:       "Loading...",
    success:       "Success!",
    error:         "Error!",
    online:        "System Online",
    offline:       "Connection Lost",
    close:         "Close",

    // Skills Section
    loadingSkills:     "Loading Skills...",
    skillsDescription: "Explore the full stack galaxy and select a skill to view details.",
    selectCategory:    "Select a category",
    skillGrowth:       "Skill Growth",
    designSystems:     "Design Systems",
    developmentFlow:   "Development Flow",
    performance:       "Performance",
    reliability:       "Reliability",
    loadingCoreModule: "Loading core module...",
    technicalSkills:   "Technical Skills",
    myTechStack:       "My Tech Stack",
    skillsSubtitle:    "Tools and technologies I use to build fast, scalable, and beautiful products.",
    grid:              "Grid",
    orbit:             "Orbit",
    years:             "yrs",
    yearsExperience:   "years experience",
    deepExpertise:     "Deep expertise in",
    buildingSolutions: "building high-performance, production-ready solutions with modern architectural patterns and best practices.",
    mastery:           "Mastery",

    // News Feed
    newsFeedTitle:    "The Pulse",
    newsFeedSubtitle: "Latest design and technology trends curated for 2026.",
    searchPlaceholder:"Search encrypted files...",
    trendingDossiers: "Trending Dossiers",
    subscribeTitle:   "Subscribe to the Core",
    subscribeText:    "Get weekly architectural insights directly in your terminal.",

    // Voice Assistant
    voiceAssistantOnline:             "Witbri AI Assistant online.",
    voiceAssistantListening:          "Listening...",
    voiceAssistantExecutePlaceholder: "Execute Command...",
    voiceAssistantProfile:            "Profile Bio",
    voiceAssistantWorkVault:          "Work Vault",
    voiceAssistantSendEmail:          "Send Email",
    voiceAssistantVoiceLink:          "Voice Link",
    voiceAssistantNotSupported:       "Voice recognition is not supported in this browser.",
    aiAssistant:   "Witness_OS Assistant",
    aiGreeting:    "Hello! I am Witness's digital assistant. How can I help you today?",
    witnessBio:    "Witness Fabrice is a Full-Stack Architect specialized in high-performance web experiences. He bridges the gap between cinematic design and robust backend engineering.",
    navigatingTo:  "Navigating to",

    // About Section
    aboutIdentity:      "Identity 2026",
    craftingNextGenWeb: "Crafting the Next-Gen Web.",
    aboutSubtitle:      "Based in Rwanda, building worldwide. Specialising in robust backend logic and immersive frontend motion.",
    storyTab:           "Story",
    philosophyTab:      "Philosophy",
    visionTab:          "Vision",
    storyContent1:      "I'm a Full-Stack Developer and Level 5 Software Student, bridging the gap between complex logic and fluid user interfaces. My journey started with a deep curiosity for systems — how things connect, communicate, and scale.",
    storyContent2:      "I mastered the React, Node.js & MySQL stack and have since expanded into cloud infrastructure, 3D web experiences, and AI integrations. Based in Kigali, Rwanda, building products used across six countries.",
    storyContent3:      "I believe in 'Project Archaeology' — digging into the root of a problem before writing a single line of code. Whether it's a marketplace or a school management system, my goal is software that feels genuinely human.",
    philosophyContent1: "Great software is invisible. It solves problems so naturally that users never have to think about the tool — only the outcome. That philosophy drives every decision I make, from API design to micro-animation timing.",
    philosophyContent2: "I build with performance as a constraint, not an afterthought. Sub-2.5s LCP, accessible markup, and offline-ready architectures are non-negotiable starting points, not bonus features.",
    philosophyContent3: "Collaboration > isolation. The best products emerge from honest feedback loops, clear documentation, and a team that challenges each other respectfully. I'd rather ship a well-considered v1 than a perfect idea that never ships.",
    visionContent1:     "My vision is to help East Africa produce world-class software talent and products. Rwanda's tech ecosystem is growing rapidly — I want to be part of the generation that puts it on the global map.",
    visionContent2:     "In the next three years I'm focused on AI-native product development, building tools that lower the barrier to entrepreneurship for local founders, and mentoring the next generation of developers in my community.",
    visionContent3:     "Long-term: a venture-backed product studio operating from Kigali — shipping software that solves real African problems with world-class execution.",
    performanceFirst:   "Performance First",
    performanceDesc:    "Optimising for sub-2.5s LCP. Speed is a feature and a first principle.",
    scalableArchitecture:"Scalable Architecture",
    scalableDesc:       "MERN + API-first design for systems that grow without breaking.",
    visualCraft:        "Visual Craft",
    visualDesc:         "Figma precision married to Three.js & Framer Motion storytelling.",
    proficiency:        "Proficiency",
    focus:              "Focus",
    location:           "Location",
    level5:             "Level 5",
    fullStack:          "Full-Stack",
    kigaliRw:           "Kigali, RW",
    architecture3d:     "3D Architecture",
    buildingNow:        "Building now",
    studentManager:     "Student Manager v2",
    moveCursor:         "move cursor to rotate",

    // Experience Section
    experienceTitle:           "Professional Journey",
    experienceSubtitle:        "Building scalable solutions and leading development teams across industries.",
    all:                       "All",
    current:                   "Current",
    past:                      "Past",
    performanceGain:           "Performance gain",
    uptime:                    "Uptime",
    teamSize:                  "Team size",
    navTimeSaved:              "Nav time saved",
    dashboardsShipped:         "Dashboards shipped",
    architectureMicroservices: "Architecting scalable microservices and leading the frontend migration to Next.js. Improved system performance by 40% through strategic caching layers and query optimization.",
    interactiveDashboards:     "Developed interactive data-visualization dashboards processing 100k+ daily records. Pioneered AI voice-command integration, cutting navigation time by 35%.",
    juniorDeveloper:           "Started as a Junior Developer, focusing on building responsive web applications and learning modern development practices.",
    fullTime:                  "Full-time",
    internship:                "Internship",
    keyMetrics:                "Key metrics",

    // Projects Section
    myCreativeProjects: "My Creative Projects",
    projectsSubtitle:   "A curated collection of digital experiences — from mobile apps to high-performance web platforms.",
    web:                "Web",
    mobile:             "Mobile",
    techStack:          "Tech Stack",
    year:               "Year",
  },

  // ───────────────────────── FRENCH ──────────────────────────────────────────
  fr: {
    // Navigation
    home:          "Accueil",
    about:         "À propos",
    welcome:       "Bienvenue",
    projects:      "Projets",
    skills:        "Compétences",
    experience:    "Expérience",
    contact:       "Contact",

    // UI Elements
    viewProjects:  "Voir les projets",
    exploreMore:   "Explorer plus",
    trySaying:     "Essayez de dire",
    or:            "ou",
    theme:         "Thème",
    language:      "Langue",
    darkMode:      "Mode sombre",
    lightMode:     "Mode clair",
    downloadCV:    "Télécharger le CV",
    hireMe:        "Engagez-moi",
    portfolioViews:"Vues du portfolio",
    satisfaction:  "Satisfaction client",
    selectedWorks: "Travaux sélectionnés",
    letsCreate:    "Créons quelque chose de grand",
    followMe:      "Suivez-moi",
    viewCaseStudy: "Voir le cas pratique",
    featured:      "En vedette",
    liveWebsite:   "Site en direct",
    liveDemo:      "Démo en direct",
    sourceCode:    "Code source",
    copyEmail:     "Copier l'e-mail",
    showLess:      "Voir moins",
    readFullStory: "Lire toute l'histoire",
    personalInfo:  "Informations personnelles",
    focusAreas:    "Domaines clés",
    coreSkills:    "Compétences clés",
    discoverSkills:"Découvrez les compétences clés",
    allProjects:   "Tous les projets",

    // Contact
    contactHeading: "Créons quelque chose de grand",
    contactSubtitle:"Que vous ayez une question ou que vous souhaitiez dire bonjour, ma boîte de réception est toujours ouverte.",
    emailLabel:    "E-mail",
    phoneLabel:    "Téléphone",
    locationLabel: "Emplacement",
    nameLabel:     "Nom",
    messageLabel:  "Message",
    sendMessage:   "Envoyer le message",
    yourName:      "Votre nom",
    yourEmail:     "Votre e-mail",
    message:       "Message",
    submit:        "Envoyer",
    sendSuccess:   "Envoyé avec succès !",
    sendError:     "Une erreur s'est produite. Réessayez.",

    // Navigation / misc
    backToRoot:    "Retour à la racine",
    scrollTop:     "Haut de page",
    loading:       "Chargement...",
    success:       "Succès !",
    error:         "Erreur !",
    online:        "Système en ligne",
    offline:       "Connexion perdue",
    close:         "Fermer",

    // Skills Section
    loadingSkills:     "Chargement des compétences...",
    skillsDescription: "Explorez la galaxie de la pile complète et sélectionnez une compétence pour afficher les détails.",
    selectCategory:    "Sélectionner une catégorie",
    skillGrowth:       "Croissance des compétences",
    designSystems:     "Systèmes de conception",
    developmentFlow:   "Flux de développement",
    performance:       "Performance",
    reliability:       "Fiabilité",
    loadingCoreModule: "Chargement du module principal...",
    technicalSkills:   "Compétences techniques",
    myTechStack:       "Ma pile technologique",
    skillsSubtitle:    "Outils et technologies que j'utilise pour construire des produits rapides, évolutifs et beaux.",
    grid:              "Grille",
    orbit:             "Orbite",
    years:             "ans",
    yearsExperience:   "années d'expérience",
    deepExpertise:     "Expertise approfondie en",
    buildingSolutions: "construction de solutions haute performance et prêtes pour la production avec des patterns architecturaux modernes et les meilleures pratiques.",
    mastery:           "Maîtrise",

    // News Feed
    newsFeedTitle:    "Le Pouls",
    newsFeedSubtitle: "Dernières tendances design et technologie sélectionnées pour 2026.",
    searchPlaceholder:"Rechercher des fichiers cryptés...",
    trendingDossiers: "Dossiers tendances",
    subscribeTitle:   "Abonnez-vous au Core",
    subscribeText:    "Recevez des informations architecturales hebdomadaires directement dans votre terminal.",

    // Voice Assistant
    voiceAssistantOnline:             "Assistant Witbri AI en ligne.",
    voiceAssistantListening:          "À l'écoute...",
    voiceAssistantExecutePlaceholder: "Exécuter une commande...",
    voiceAssistantProfile:            "Profil Bio",
    voiceAssistantWorkVault:          "Coffre de travail",
    voiceAssistantSendEmail:          "Envoyer un e-mail",
    voiceAssistantVoiceLink:          "Lien vocal",
    voiceAssistantNotSupported:       "La reconnaissance vocale n'est pas prise en charge dans ce navigateur.",
    aiAssistant:   "Assistant Witness_OS",
    aiGreeting:    "Bonjour ! Je suis l'assistant numérique de Witness. Comment puis-je vous aider ?",
    witnessBio:    "Witness Fabrice est un architecte Full-Stack spécialisé dans les expériences web haute performance. Il fait le pont entre le design cinématographique et l'ingénierie backend robuste.",
    navigatingTo:  "Navigation vers",

    // About Section
    aboutIdentity:      "Identité 2026",
    craftingNextGenWeb: "Façonner le Web de Nouvelle Génération.",
    aboutSubtitle:      "Basé au Rwanda, construction mondiale. Spécialisé dans la logique backend robuste et le mouvement frontend immersif.",
    storyTab:           "Histoire",
    philosophyTab:      "Philosophie",
    visionTab:          "Vision",
    storyContent1:      "Je suis un développeur Full-Stack et étudiant en logiciel de niveau 5, faisant le lien entre la logique complexe et les interfaces utilisateur fluides. Mon parcours a commencé par une profonde curiosité pour les systèmes — comment ils se connectent, communiquent et évoluent.",
    storyContent2:      "J'ai maîtrisé la pile React, Node.js & MySQL et j'ai depuis étendu mes compétences à l'infrastructure cloud, aux expériences web 3D et aux intégrations IA. Basé à Kigali, Rwanda, je construis des produits utilisés dans six pays.",
    storyContent3:      "Je crois en l'« Archéologie de Projet » — creuser à la racine d'un problème avant d'écrire une seule ligne de code. Qu'il s'agisse d'un marché ou d'un système de gestion scolaire, mon objectif est un logiciel qui se sent véritablement humain.",
    philosophyContent1: "Un excellent logiciel est invisible. Il résout les problèmes si naturellement que les utilisateurs n'ont jamais à penser à l'outil — seulement au résultat. Cette philosophie guide chaque décision que je prends, de la conception d'API au timing des micro-animations.",
    philosophyContent2: "Je construis avec la performance comme contrainte, pas comme réflexion après coup. LCP sous 2,5s, balisage accessible et architectures prêtes hors ligne sont des points de départ non négociables, pas des fonctionnalités bonus.",
    philosophyContent3: "Collaboration > isolation. Les meilleurs produits émergent de boucles de rétroaction honnêtes, de documentation claire et d'une équipe qui se défie respectueusement. Je préférerais expédier une v1 bien considérée qu'une idée parfaite qui ne part jamais.",
    visionContent1:     "Ma vision est d'aider l'Afrique de l'Est à produire des talents et produits logiciels de classe mondiale. L'écosystème tech du Rwanda croît rapidement — je veux faire partie de la génération qui le met sur la carte mondiale.",
    visionContent2:     "Dans les trois prochaines années, je me concentre sur le développement de produits natifs IA, en construisant des outils qui abaissent la barrière à l'entrepreneuriat pour les fondateurs locaux, et en mentorant la prochaine génération de développeurs dans ma communauté.",
    visionContent3:     "À long terme : un studio de produits soutenu par du capital-risque opérant depuis Kigali — expédiant des logiciels qui résolvent des problèmes africains réels avec une exécution de classe mondiale.",
    performanceFirst:   "Performance d'abord",
    performanceDesc:    "Optimisation pour LCP sous 2,5s. La vitesse est une fonctionnalité et un premier principe.",
    scalableArchitecture:"Architecture évolutive",
    scalableDesc:       "Design MERN + API-first pour des systèmes qui grandissent sans se casser.",
    visualCraft:        "Art visuel",
    visualDesc:         "Précision Figma mariée au storytelling Three.js & Framer Motion.",
    proficiency:        "Compétence",
    focus:              "Focus",
    location:           "Emplacement",
    level5:             "Niveau 5",
    fullStack:          "Full-Stack",
    kigaliRw:           "Kigali, RW",
    architecture3d:     "Architecture 3D",
    buildingNow:        "Construction en cours",
    studentManager:     "Gestionnaire Étudiant v2",
    moveCursor:         "déplacer le curseur pour faire pivoter",

    // Experience Section
    experienceTitle:           "Parcours Professionnel",
    experienceSubtitle:        "Construction de solutions évolutives et direction d'équipes de développement dans tous les secteurs.",
    all:                       "Tous",
    current:                   "Actuel",
    past:                      "Passé",
    performanceGain:           "Gain de performance",
    uptime:                    "Temps de fonctionnement",
    teamSize:                  "Taille de l'équipe",
    navTimeSaved:              "Temps de navigation économisé",
    dashboardsShipped:         "Tableaux de bord livrés",
    architectureMicroservices: "Architecture de microservices évolutifs et direction de la migration frontend vers Next.js. Amélioration des performances système de 40% grâce à des couches de cache stratégiques et à l'optimisation des requêtes.",
    interactiveDashboards:     "Développement de tableaux de bord de visualisation de données interactifs traitant 100k+ enregistrements quotidiens. Pionnier de l'intégration de commandes vocales IA, réduisant le temps de navigation de 35%.",
    juniorDeveloper:           "Commencé comme développeur junior, en se concentrant sur la construction d'applications web responsives et l'apprentissage des pratiques de développement modernes.",
    fullTime:                  "Temps plein",
    internship:                "Stage",
    keyMetrics:                "Métriques clés",

    // Projects Section
    myCreativeProjects: "Mes projets créatifs",
    projectsSubtitle:   "Une collection organisée d'expériences numériques — des applications mobiles aux plateformes web haute performance.",
    web:                "Web",
    mobile:             "Mobile",
    techStack:          "Pile technologique",
    year:               "Année",
  },

  // ───────────────────────── KINYARWANDA ─────────────────────────────────────
  rw: {
    // Navigation
    home:          "Ahabanza",
    about:         "Ibijyanye",
    welcome:       "Murakaza neza",
    projects:      "Imishinga",
    skills:        "Ubuhanga",
    experience:    "Ubunararibonye",
    contact:       "Twandikire",

    // UI Elements
    viewProjects:  "Reba imishinga",
    exploreMore:   "Shakisha byinshi",
    trySaying:     "Gerageza kuvuga",
    or:            "cyangwa",
    theme:         "Ishusho",
    language:      "Ururimi",
    darkMode:      "Umukara",
    lightMode:     "Umweru",
    downloadCV:    "Kuramo CV",
    hireMe:        "Mpe akazi",
    portfolioViews:"Urebye portfolio",
    satisfaction:  "Kwishimira umukiriya",
    selectedWorks: "Imirimo yahiswemo",
    letsCreate:    "Reka dukore ikintu kinini",
    followMe:      "Nkureba",
    viewCaseStudy: "Reba umushinga",
    featured:      "Byahishwe",
    liveWebsite:   "Urubuga rukora",
    liveDemo:      "Igereranya",
    sourceCode:    "Kode y'inkomoko",
    copyEmail:     "Koporora imeli",
    showLess:      "Erekana bike",
    readFullStory: "Soma inkuru yose",
    personalInfo:  "Amakuru yanjye",
    focusAreas:    "Ingingo z'ingenzi",
    coreSkills:    "Ubuhanga nyamukuru",
    discoverSkills:"Menya ubuhanga nyamukuru",
    allProjects:   "Imishinga yose",

    // Contact
    contactHeading: "Reka dukore ikintu cyiza",
    contactSubtitle:"Niba ufite ikibazo cyangwa ushaka kumva, inbox yanjye irahari.",
    emailLabel:    "Imeli",
    phoneLabel:    "Telefone",
    locationLabel: "Aho ndi",
    nameLabel:     "Izina",
    messageLabel:  "Ubutumwa",
    sendMessage:   "Ohereza ubutumwa",
    yourName:      "Izina ryawe",
    yourEmail:     "Imeli yawe",
    message:       "Ubutumwa",
    submit:        "Ohereza",
    sendSuccess:   "Byoherejwe neza!",
    sendError:     "Habaye ikosa. Ongera ugerageze.",

    // Navigation / misc
    backToRoot:    "Garuka kuri root",
    scrollTop:     "Subira hejuru",
    loading:       "Biratunganywa...",
    success:       "Byakunze!",
    error:         "Ikosa!",
    online:        "Birakora",
    offline:       "Murandasi yakatse",
    close:         "Funga",

    // Skills Section
    loadingSkills:     "Birimo gupakira ubumenyi...",
    skillsDescription: "Sobanukirwa galaxy y'ubuhanga kandi uhitemo ubuhanga urebe ibisobanuro.",
    selectCategory:    "Hitamo icyiciro",
    skillGrowth:       "Ubwiyongere bw'ubuhanga",
    designSystems:     "Sisitemu z'igishushanyo",
    developmentFlow:   "Uko bikorwa",
    performance:       "Umuvuduko",
    reliability:       "Kwizerwa",
    loadingCoreModule: "Birimo gupakira module nyamukuru...",
    technicalSkills:   "Ubuhanga bw'ikoranabuhanga",
    myTechStack:       "Ibikoresho byanjye",
    skillsSubtitle:    "Ibikoresho n'ikoranabuhanga nkoresha mu kubaka ibintu byihuta, bikura kandi byiza.",
    grid:              "Urusobetudirishya",
    orbit:             "Uruziga",
    years:             "imyaka",
    yearsExperience:   "imyaka y'uburambe",
    deepExpertise:     "Ubuhanga buke mu",
    buildingSolutions: "kubaka ibisubizo byihuta kandi biremewe hamwe n'imiterere n'imikorere myiza.",
    mastery:           "Ubuhanga",

    // News Feed
    newsFeedTitle:    "Umuvuduko",
    newsFeedSubtitle: "Imigendekere y'ibigezweho mu ikoranabuhanga na design ya 2026.",
    searchPlaceholder:"Shakisha mu mafayile yibitse...",
    trendingDossiers: "Imbonerahamwe zikurura",
    subscribeTitle:   "Iyandikishe muri Core",
    subscribeText:    "Fata amakuru y'icyumweru buri gihe mu terminal yawe.",

    // Voice Assistant
    voiceAssistantOnline:             "Witbri AI umufasha uri online.",
    voiceAssistantListening:          "Iri kumva...",
    voiceAssistantExecutePlaceholder: "Tanga itegeko...",
    voiceAssistantProfile:            "Bio y'umwirondoro",
    voiceAssistantWorkVault:          "Ikigega cy'imirimo",
    voiceAssistantSendEmail:          "Ohereza imeli",
    voiceAssistantVoiceLink:          "Umuyoboro w'ijwi",
    voiceAssistantNotSupported:       "Kumva ijwi ntibishyigikirwa muri uyu mucanga.",
    aiAssistant:   "Umuhamagazi wa Witness_OS",
    aiGreeting:    "Muraho! Ndi umufasha wa Witness mu buryo bw'ikoranabuhanga. Nagufasha iki uyu munsi?",
    witnessBio:    "Witness Fabrice ni umuhanga mu kubaka imbuga za internet (Full-Stack). Akora ibijyanye n'ishusho ndetse na kode zikomeye zicunga imbuga.",
    navigatingTo:  "Turajya kuri",

    // About Section
    aboutIdentity:      "Ikiranga 2026",
    craftingNextGenWeb: "Kubaka Urubuga rw'Iterambere.",
    aboutSubtitle:      "Tuvuye mu Rwanda, dukora ku isi yose. Tuzobereye mu gushyiraho kode zikomeye zicunga imbuga no kugira imbuga zishimisha.",
    storyTab:           "Inkuru",
    philosophyTab:      "Imyumvire",
    visionTab:          "Icyerekezo",
    storyContent1:      "Ndi umuhanga mu kubaka imbuga za internet (Full-Stack) kandi mfite urwego rwa 5 mu ishami ry'ikoranabuhanga. Nkora akazi ko guhuza ibintu bikomeye n'ibintu byoroshye. Uru rugendo rwanje rwatangiye n'ubwitonzi bwinshi ku bijyanye n'imbuga — uko bihuza, biganira kandi bikura.",
    storyContent2:      "Nize neza React, Node.js & MySQL kandi narongeyeho ubumenyi mu bijyanye n'ibyo mu ijuru, imbuga za 3D n'ubwenge bw'ubwenge. Ndi mu mujyi wa Kigali, Rwanda, nkora ibintu bikoreshwa mu bihugu 6.",
    storyContent3:      "Nizera mu 'Arkeoloji y'Umushinga' — gushakisha impamvu nyamukuru y'ikibazo mbere yo kwandika kode. Niba ari isoko cyangwa sisitemu yo kwita ku ishuri, intego yanjye ni kode ifite ubumuntu.",
    philosophyContent1: "Kode nziza ntiboneka. Ikemura ibibazo mu buryo busanzwe ku buryo abakoresha ntibatekereza ku gikoresho — ahubwo bakatekereza ku gisubizo. Iyo myumvire ituma nita ku byose, kuva ku gushyiraho API kugeza ku gihe cy'imyigaragambyo.",
    philosophyContent2: "Nkora n'igitekerezo cy'uko kode igomba kuba yihuta. LCP munsi ya 2.5s, kode yoroshye no kuba yitwara neza nta internet ni ibintu by'ibanze, atari ibyongeweho.",
    philosophyContent3: "Gufatanya > Gutandukana. Ibintu byiza biva mu biganiro byiza, inyandiko zisobanutse n'itsinda ryitanga ingamba. Nashaka gutanga v1 nziza kuruta igitekerezo cyuzuye kitatangwa.",
    visionContent1:     "Icyerekezo cyanjye ni ukufasha Afurika y'Iburasirazuba kubaka abahanga n'ibintu by'ikoranabuhanga byo ku rwego mpuzamahanga. Isysteme y'ikoranabuhanga mu Rwanda irakura vuba — ndashaka kuba mu rubyiruko ruzashyira u Rwanda ku ikarita mpuzamahanga.",
    visionContent2:     "Mu myaka 3 iri imbere ndashaka gukorana n'ibintu by'ubwenge bw'ubwenge, kubaka ibikoresho biborohera abashoramari bo mu Rwanda, no kwigisha urubyiruko rwiga ikoranabuhanga mu muryango wanjye.",
    visionContent3:     "Mu gihe kirekire: isosiyete y'ibintu yunganirwa n'abashoramari ikorera i Kigali — itanga kode ikemura ibibazo by'Afurika mu buryo bwiza.",
    performanceFirst:   "Umuvuduko Mbere",
    performanceDesc:    "Kunoza LCP munsi ya 2.5s. Umuvuduko ni ikintu cy'ibanze.",
    scalableArchitecture:"Imiterere Ikura",
    scalableDesc:       "Imiterere MERN + API-mbere ku bintu bikura bitavunika.",
    visualCraft:        "Ubuhanga bw'Ishusho",
    visualDesc:         "Ubusobanuro bwa Figma buhuje na Three.js & Framer Motion.",
    proficiency:        "Ubuhanga",
    focus:              "Icyerekezo",
    location:           "Aho",
    level5:             "Urwego 5",
    fullStack:          "Full-Stack",
    kigaliRw:           "Kigali, RW",
    architecture3d:     "Imiterere 3D",
    buildingNow:        "Irubakwa nonaha",
    studentManager:     "Umuyobozi w'Abanyeshuri v2",
    moveCursor:         "koresha mouse kugira ngo uhindure",

    // Experience Section
    experienceTitle:           "Urugendo rw'Umwuga",
    experienceSubtitle:        "Kubaka ibisubizo bikura no kuyobora amatsinda y'abahanga mu nzego zose.",
    all:                       "Byose",
    current:                   "Ubu",
    past:                      "Kera",
    performanceGain:           "Ubwiyongere bw'umuvuduko",
    uptime:                    "Igihe cyo gukora",
    teamSize:                  "Ingano y'itsinda",
    navTimeSaved:              "Igihe cy'urugendo cyakijijwe",
    dashboardsShipped:         "Ibipimo byoherejwe",
    architectureMicroservices: "Kubaka microservices bikura no kuyobora imyimura ya frontend kuri Next.js. Kwongera umuvuduko wa sisitemu ku 40% binyuze mu gushyira mu cache neza no kunoza ibisabwa.",
    interactiveDashboards:     "Gukora ibipimo by'ishusho ry'ibyatanzwe bigaragaza ibyabaye bigeze kuri 100k+ ku munsi. Kuba umushinga wa mbere mu guhuza amategeko y'ijwi ya AI, bigabanya igihe cyo kuyobora ku 35%.",
    juniorDeveloper:           "Gutangira nk'umuhanga w'urwego ruto, ndi kwita ku kubaka porogaramu z'urubuga zihindura uko zigaragara no kwiga imikorere y'ikoranabuhanga ry'iki gihe.",
    fullTime:                  "Akazi k'akazi",
    internship:                "Ubuhabwa",
    keyMetrics:                "Ibipimo by'ingenzi",

    // Projects Section
    myCreativeProjects: "Imishinga yanjye y'ubuhanzi",
    projectsSubtitle:   "Itoranya ry'imishinga y'ikoranabuhanga — kuva ku maporogaramu ya telefone kugeza ku mbuga zikora neza.",
    web:                "Urubuga",
    mobile:             "Telefone",
    techStack:          "Ibikoresho",
    year:               "Umwaka",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// PROVIDER
// ─────────────────────────────────────────────────────────────────────────────
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-language') || 'en';
    }
    return 'en';
  });

  /**
   * t(key) — looks up a translation key.
   * Priority: current language → English fallback → raw key (never throws).
   */
  const t = useCallback(
    (key) => translations[language]?.[key] ?? translations['en'][key] ?? key,
    [language]
  );

  const changeLanguage = useCallback((lang) => {
    if (!translations[lang]) {
      console.warn(`[LanguageContext] Unknown language: "${lang}". Falling back to "en".`);
      lang = 'en';
    }
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-language', lang);
    }
    document.documentElement.lang = lang;
  }, []);

  // Cancel any ongoing speech synthesis when language changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// HOOK
// ─────────────────────────────────────────────────────────────────────────────
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a <LanguageProvider>.');
  return context;
};

export default LanguageContext;
