/**
 * Professional experience data — work history and internships.
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
