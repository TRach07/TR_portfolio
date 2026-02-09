/**
 * Certificates and attestations data.
 * Each entry supports an optional PDF/image file for viewing.
 */

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: { en: string; fr: string };
  /** Path to the issuer badge/logo in /public/icons/badges/ (PNG) */
  badge?: string;
  /** Path to the certificate file in /public/certificates/ (PDF or image) */
  file?: string;
  /** External verification URL */
  verifyUrl?: string;
}

export const CERTIFICATES: Certificate[] = [
  {
    id: "cert-1",
    title: "Advanced Prompt Engineering with ChatGPT",
    issuer: "upGrad",
    date: "10/2025",
    description: {
      en: "Prompt engineering avancé · IA générative · Few-shot · Automatisation",
      fr: "Advanced Prompt Engineering · Generative AI · Few-shot · Automation",
    },
    badge: "/icons/badges/upGrad.png",
    file: "/certificates/Prompt_Engineering_Certificate.pdf",
    verifyUrl: "https://certificates.upgrad.com/19175115-be6c-49df-88de-f960602fc255-Free%20Course%20Completion-KrcuTTTWnr7Cs9dy.jpeg",
  },
  {
    id: "cert-2",
    title: "Microsoft Certified: Azure AI Fundamentals",
    issuer: "Microsoft",
    date: "05/2025",
    description: {
      en: "Core AI & ML Concepts · Azure Cognitive Services · Computer Vision · NLP · Responsible AI",
      fr: "Fondamentaux de l’IA & du ML · Services cognitifs Azure · Vision par ordinateur · NLP · IA responsable",
    },
    badge: "/icons/badges/ai900.png",
    file: "/certificates/ai900.pdf",
    verifyUrl: "https://www.credly.com/badges/61a3c0d3-292d-4769-a555-e8859cffd0ca",
  },
  {
    id: "cert-3",
    title: "L2 Administration Certification",
    issuer: "Ivalua Academy",
    date: "11/2024",
    description: {
      en: "Advanced skills in configuring and managing the Ivalua platform, with in-depth understanding of functionalities and processes",
      fr: "Compétences avancées en configuration et gestion de la plateforme Ivalua, avec une compréhension approfondie des fonctionnalités et des processus.",
    },
    badge: "/icons/badges/ivaluaAcademy.png",
    file: "/certificates/l2.pdf",
  },
  {
    id: "cert-4",
    title: "L1 Certification",
    issuer: "Ivalua Academy",
    date: "10/2024",
    description: {
      en: "Foundational knowledge of the Ivalua platform, covering core modules and standard usages.",
      fr: "Découverte et maîtrise des fonctionnalités de base de la plateforme Ivalua, gestion des modules clés et usages standards.",
    },
    badge: "/icons/badges/ivaluaAcademy.png",
    file: "/certificates/l1.pdf",
  },
  {
    id: "cert-5",
    title: "Certified C Language",
    issuer: "Sololearn",
    date: "02/2023",
    description: {
      en: "Fundamental understanding of C language basics and structured programming",
      fr: "Maîtrise des bases du langage C et de la programmation structurée",
    },
    badge: "/icons/badges/sololearn.png",
    file: "/certificates/cert-C.pdf",
    verifyUrl: "https://www.sololearn.com/en/certificates/CT-0RXIZS84",
  },
  {
    id: "cert-6",
    title: "Certified Python Language",
    issuer: "Sololearn",
    date: "02/2023",
    description: {
      en: "Fundamental understanding of Python programming basics",
      fr: "Maîtrise des bases du langage Python et des concepts fondamentaux de programmation",
    },
    badge: "/icons/badges/sololearn.png",
    file: "/certificates/cert-Python.pdf",
    verifyUrl: "https://www.sololearn.com/en/certificates/CT-N8QKPGIT",
  },
];
