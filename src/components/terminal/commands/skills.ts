/**
 * Skills command — displays skill categories with visual bars.
 */

import { CommandDefinition } from "@/types/terminal";
import { SKILL_CATEGORIES } from "@/data/skills";

/** Generates an ASCII progress bar */
function progressBar(level: number, width: number = 20): string {
  const filled = Math.round((level / 100) * width);
  const empty = width - filled;
  return `[${"█".repeat(filled)}${"░".repeat(empty)}] ${level}%`;
}

export const skillsCommand: CommandDefinition = {
  name: "skills",
  description: "Show skill categories",
  execute: () => {
    const sections = SKILL_CATEGORIES.map((cat) => {
      const skillLines = cat.skills.map(
        (s) => `  ${s.name.padEnd(18)} ${progressBar(s.level)}`
      );
      return [`\n─── ${cat.id.toUpperCase()} ───`, ...skillLines].join("\n");
    });

    return ["My Skills:", ...sections].join("\n");
  },
};
