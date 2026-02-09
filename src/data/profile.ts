/**
 * Personal profile data used across the portfolio.
 * Update these values with your own information.
 */

export const PROFILE = {
  name: "Taha",
  fullName: "Taha RACHID",
  role: {
    en: "Software Engineer Student | Big Data & Machine Learning",
    fr: "Étudiant Ingénieur Logiciel | Big Data & Machine Learning",
  },
  email: "taha125rachid@gmail.com",
  github: "https://github.com/TRach07",
  linkedin: "https://www.linkedin.com/in/taha-rachid-/",
  location: {
    en: "Île-de-France",
    fr: "Île-de-France",
  },
  avatar: "/images/Photo.png",
  languages: [
    {
      name: { en: "French", fr: "Français" },
      level: { en: "Fluent / Bilingual", fr: "Courant / Bilingue" },
      flag: "🇫🇷",
    },
    {
      name: { en: "English", fr: "Anglais" },
      level: { en: "Professional Working", fr: "Capacité professionnelle" },
      flag: "🇬🇧",
    },
    {
      name: { en: "Arabic", fr: "Arabe" },
      level: { en: "Native / Bilingual", fr: "Bilingue ou langue natale" },
      flag: "🇲🇦",
    },
  ],
} as const;
