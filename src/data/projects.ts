/**
 * Projects data displayed in the Projects application.
 * Each project has bilingual descriptions.
 */

export interface Project {
  id: string;
  title: string;
  description: { en: string; fr: string };
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "portfolio-os",
    title: "TahaOS Portfolio",
    description: {
      en: "An interactive OS-style portfolio built with Next.js, TypeScript, and Three.js. Features draggable windows, a terminal, and 3D particle backgrounds.",
      fr: "Un portfolio interactif style OS construit avec Next.js, TypeScript et Three.js. Avec des fenêtres déplaçables, un terminal et un fond 3D de particules.",
    },
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion"],
    githubUrl: "https://github.com/TRach07/portfolio",
    liveUrl: "https://TRach07.dev",
    image: "/images/projects/portfolio.png",
  },
  {
    id: "project-2",
    title: "Project Two",
    description: {
      en: "Project description",
      fr: "Description du projet.",
    },
    techStack: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/TRach07/project-2",
    image: "/images/projects/project2.png",
  },
  {
    id: "project-3",
    title: "Project Three",
    description: {
      en: "Project description",
      fr: "Description du projet.",
    },
    techStack: ["Python", "FastAPI", "PostgreSQL"],
    githubUrl: "https://github.com/TRach07/project-3",
    image: "/images/projects/project3.png",
  },
];
