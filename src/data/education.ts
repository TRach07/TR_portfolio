/**
 * Education data — academic background and degrees.
 * Each entry supports bilingual titles/descriptions and an optional school logo.
 */

export interface Education {
  id: string;
  school: { en: string; fr: string };
  degree: { en: string; fr: string };
  period: string;
  location: string;
  /** Path to the school logo in /public/icons/badges/ (PNG) */
  logo?: string;
}

export const EDUCATION: Education[] = [
  {
    id: "edu-1",
    school: {
      en: "EFREI Engineering School",
      fr: "École d'ingénieurs EFREI",
    },
    degree: {
      en: "Engineering Degree — Big Data & Machine Learning (Bac+4/5)",
      fr: "Diplôme d'ingénieur — Big Data & Machine Learning (Bac+4/5)",
    },
    period: "08/2024 – 10/2026",
    location: "Villejuif (94), France",
    logo: "/icons/badges/efrei.png",
  },
  {
    id: "edu-2",
    school: {
      en: "École d'Ingénieurs du Littoral - Côte d'Opale (EILCO)",
      fr: "École d'Ingénieurs du Littoral - Côte d'Opale (EILCO)",
    },
    degree: {
      en: "Engineering Degree — Computer Science (Bac+1/2/3)",
      fr: "Diplôme d'ingénieur - Informatique (Bac+1/2/3)",
    },
    period: "09/2021 – 07/2024",
    location: "Calais (62), France",
    logo: "/icons/badges/eilco.png",
  },
  {
    id: "edu-3",
    school: {
      en: "Lycée Technique Ibn Al Haitam",
      fr: "Lycée Technique Ibn Al Haitam",
    },
    degree: {
      en: "Baccalaureate — Mathematics Sciences B",
      fr: "Baccalauréat — Sciences mathématiques B",
    },
    period: "09/2020 – 07/2021",
    location: "Ouarzazate (45), Maroc",
    logo: "/icons/badges/ministere_educ_maroc.png",
  },
];
