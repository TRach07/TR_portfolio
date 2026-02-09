/**
 * Experience data — professional work history, internships, and other jobs.
 * Each entry supports bilingual titles/descriptions and an optional company logo.
 */

export interface Experience {
  id: string;
  role: { en: string; fr: string };
  company: string;
  type: { en: string; fr: string };
  period: string;
  location: string;
  description: { en: string; fr: string };
  /** Path to the company logo in /public/icons/badges/ (PNG) */
  logo?: string;
}

/** Professional experiences (engineering, internships) */
export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    role: {
      en: "Software Engineer Apprentice",
      fr: "Ingénieur Logiciel en Alternance",
    },
    company: "Ivalua",
    type: {
      en: "Apprenticeship",
      fr: "Contrat en alternance",
    },
    period: "10/2024 – 08/2026",
    location: "Massy, Île-de-France, France",
    description: {
      en: "Software Engineer Apprentice in the R&D Solutions team. Contributing to bug fixing and developing new features across backend and frontend. Working with Agile methodologies using C#, .NET, SQL Server, HTML, LESS, and TypeScript. Utilizing internal tools to streamline workflows and improve product quality.",
      fr: "Ingénieur logiciel en alternance dans l'équipe R&D Solutions. Contribution à la correction de bugs et au développement de nouvelles fonctionnalités backend et frontend. Travail en méthodologie Agile avec C#, .NET, SQL Server, HTML, LESS et TypeScript. Utilisation d'outils internes pour optimiser les workflows et améliorer la qualité produit.",
    },
    logo: "/icons/badges/ivalua.png",
  },
  {
    id: "exp-2",
    role: {
      en: "IT Intern — Systems & Networks",
      fr: "Stagiaire — Systèmes & Réseaux",
    },
    company: "Mairie de Calais",
    type: {
      en: "Internship",
      fr: "Stage · 2 mois",
    },
    period: "01/2023 – 02/2023",
    location: "Calais, Hauts-de-France, France",
    description: {
      en: "Systems & Networks department:\n- Network switch configuration\n- Hardware maintenance\n- OS configuration and installation",
      fr: "Services systèmes et réseaux :\n- Configuration des switchs réseau\n- Maintenance du matériel informatique\n- Configuration et installation des systèmes d'exploitation",
    },
    logo: "/icons/badges/mairie-calais.png",
  },
];

/** Other experiences (student jobs, seasonal work) */
export const OTHER_EXPERIENCES: Experience[] = [
  {
    id: "other-1",
    role: {
      en: "Delivery Driver & Team Member",
      fr: "Équipier Livreur Polyvalent",
    },
    company: "Domino's Pizza",
    type: {
      en: "Student Job",
      fr: "Job étudiant",
    },
    period: "04/2023 – 08/2024",
    location: "Calais (62), France",
    description: {
      en: "Production, order preparation, customer service, and home delivery.",
      fr: "Production, préparation des commandes, service client et livraison à domicile.",
    },
    logo: "/icons/badges/domino's.png",
  },
  {
    id: "other-2",
    role: {
      en: "Public Works Technician",
      fr: "Adjoint Technique Territorial",
    },
    company: "Mairie de Calais",
    type: {
      en: "Seasonal Contract",
      fr: "Contrat saisonnier",
    },
    period: "07/2023 – 08/2023",
    location: "Calais (62), France",
    description: {
      en: "Contribution to coastal preservation and improvement of public facilities.",
      fr: "Contribution à la préservation côtière et amélioration des installations publiques.",
    },
    logo: "/icons/badges/mairie-calais.png",
  },
  {
    id: "other-3",
    role: {
      en: "Youth & Inclusion Coordinator",
      fr: "Animateur",
    },
    company: "Cap Évasion",
    type: {
      en: "Seasonal Contract",
      fr: "Contrat saisonnier",
    },
    period: "07/2022 – 08/2022",
    location: "Jonzac (17), France",
    description: {
      en: "Leading and supervising inclusive activities for people with mental disabilities.",
      fr: "Animation et encadrement d'activités inclusives pour personnes en difficulté (handicap mental).",
    },
    logo: "/icons/badges/cap_evasion.png",
  },
];
